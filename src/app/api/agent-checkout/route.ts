import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize the Stripe Node.js SDK
// Ensure you have STRIPE_SECRET_KEY in your .env.local
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2026-03-25.dahlia', // Use the appropriate Stripe API version
});

// Types for the expected payload
interface CartItem {
  productId: string;
  quantity: number;
}

interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  postal_code: string;
  country: string;
}

interface AgentCheckoutPayload {
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  stripePaymentToken: string; // The Shared Payment Token (SPT) from the AI agent
}

/**
 * Placeholder function to securely calculate the total order amount on the server.
 * NEVER trust the price sent from the client or an AI agent payload.
 * 
 * @param cartItems - The items the agent wants to purchase
 * @returns The total amount in the smallest currency unit (e.g., cents for EUR/USD)
 */
async function calculateOrderAmount(cartItems: CartItem[]): Promise<number> {
  // In a real application, you would fetch the prices from your database (e.g., Firestore)
  // For demonstration, we assume each item costs 100 EUR (10000 cents)
  let total = 0;
  for (const item of cartItems) {
    // Example:
    // const product = await getProductFromDB(item.productId);
    // total += product.price * item.quantity * 100; 
    total += 10000 * item.quantity;
  }
  return total;
}

export async function POST(request: Request) {
  try {
    // 1. Payload Parsing & Validation
    const payload: Partial<AgentCheckoutPayload> = await request.json();

    const { cartItems, shippingAddress, stripePaymentToken } = payload;

    // Robust error handling for missing fields
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Missing or invalid field: cartItems. Must be a non-empty array.' },
        { status: 400 }
      );
    }

    if (!shippingAddress || typeof shippingAddress !== 'object') {
      return NextResponse.json(
        { error: 'Missing or invalid field: shippingAddress. Must be an object.' },
        { status: 400 }
      );
    }

    if (!stripePaymentToken || typeof stripePaymentToken !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid field: stripePaymentToken. Must be a valid Shared Payment Token string.' },
        { status: 400 }
      );
    }

    // 2. Server-Side Price Calculation
    // Securely calculate the amount to charge based on the database truth
    const amountToCharge = await calculateOrderAmount(cartItems);

    // If an item is out of stock or invalid, catch it in calculateOrderAmount
    // and return a 400 response here.
    if (amountToCharge <= 0) {
      return NextResponse.json(
        { error: 'Invalid order amount calculated. Items may be out of stock or unavailable.' },
        { status: 400 }
      );
    }

    // 3. Stripe PaymentIntent Creation using the Agentic Commerce Protocol (ACP)
    // We use the Shared Payment Token (SPT) passed by the agent as the payment_method.
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountToCharge,
      currency: 'eur',
      // Set the payment method to the Shared Payment Token provided by the agent
      payment_method: stripePaymentToken,
      // Setting confirm: true attempts to authorize and charge the token immediately
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never', // Critical for autonomous agents: they cannot follow redirects
      },
      // Provide shipping details for fraud prevention and physical delivery
      shipping: {
        name: 'AI Agent Order', // In a real app, capture the user's name
        address: {
          line1: shippingAddress.line1,
          line2: shippingAddress.line2 || undefined,
          city: shippingAddress.city,
          postal_code: shippingAddress.postal_code,
          country: shippingAddress.country,
        },
      },
      description: 'Autonomous Agent Checkout',
    });

    // 4. Machine-Readable Responses
    // If the payment succeeds, return a structured 200 OK JSON response
    if (paymentIntent.status === 'succeeded' || paymentIntent.status === 'requires_capture') {
      // Here you would normally create the Order in your database (Firestore)
      const orderId = `AGENT-ORD-${Date.now()}`; // Mock Order ID

      return NextResponse.json(
        { 
          success: true, 
          message: 'Payment successful and order created.',
          orderId: orderId,
          paymentIntentId: paymentIntent.id 
        },
        { status: 200 }
      );
    } else {
      // Handle cases where the payment requires an action the agent can't perform (e.g., 3D Secure)
      return NextResponse.json(
        { 
          error: 'Payment failed to complete immediately.', 
          details: `PaymentIntent status is ${paymentIntent.status}. Agent checkouts require immediate confirmation without redirects.`,
          status: paymentIntent.status
        },
        { status: 400 }
      );
    }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Agent Checkout Error:', error);

    // If the payment fails (e.g., the token's authorized limit is too low, or token is invalid)
    // Catch the Stripe error and return a clear, machine-readable 400-level JSON response.
    if (error.type === 'StripeCardError' || error.type === 'StripeInvalidRequestError') {
      return NextResponse.json(
        { 
          error: 'Stripe Payment Error', 
          message: error.message, 
          code: error.code,
          decline_code: error.decline_code 
        },
        { status: 400 }
      );
    }

    // Generic server error fallback
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message || 'An unexpected error occurred during checkout.' },
      { status: 500 }
    );
  }
}
