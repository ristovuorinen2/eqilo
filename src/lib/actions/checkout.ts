"use server";

import { adminDb } from "../firebase/admin";
import { Stripe } from "stripe";
import { CartItem, Product, Order } from "../types/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {
  apiVersion: "2025-02-24.acacia" as any,
});

export async function createCheckoutSession(userId: string, cartItems: CartItem[]) {
  try {
    if (!cartItems.length) {
      throw new Error("Cart is empty");
    }

    // Fetch products
    let subtotal = 0;
    const line_items: any[] = [];
    const orderItems: any[] = [];

    for (const item of cartItems) {
      const productDoc = await adminDb.collection("products").doc(item.product_id).get();
      if (!productDoc.exists) {
        throw new Error(`Product ${item.product_id} not found`);
      }
      
      const product = productDoc.data() as Product;
      const unitPrice = item.custom_price_override ?? product.price;
      
      subtotal += unitPrice * item.quantity;
      orderItems.push({
        product_id: product.id,
        quantity: item.quantity,
        price: unitPrice,
      });

      line_items.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: product.name,
            description: product.description,
            images: product.image_urls.length > 0 ? [product.image_urls[0]] : undefined,
          },
          unit_amount: Math.round(unitPrice * 100), // Stripe expects cents
        },
        quantity: item.quantity,
      });
    }

    // 20 € shipping if < 200 €, otherwise free
    const shippingCost = subtotal < 200 ? 2000 : 0; // In cents
    
    // Create pending order in Firestore
    const orderRef = adminDb.collection("orders").doc();
    const newOrder: Partial<Order> = {
      id: orderRef.id,
      user_id: userId,
      items: orderItems,
      subtotal: subtotal,
      tax_total: subtotal * 0.255, // Approximating 25.5% VAT 
      total_amount: subtotal + (shippingCost / 100),
      status: "pending",
      created_at: new Date(),
      shipping_address: {
        line1: "",
        city: "",
        postal_code: "",
        country: "FI", // Defaulting to FI
      }
    };
    
    await orderRef.set(newOrder);

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ['card', 'mobilepay'],
      line_items,
      client_reference_id: userId,
      metadata: {
        orderId: orderRef.id,
      },
      shipping_address_collection: {
        allowed_countries: ["FI"], // Restrict shipping to Finland
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: shippingCost,
              currency: "eur",
            },
            display_name: shippingCost === 0 ? "Free Standard Shipping" : "Standard Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 14 }, // 1-2 weeks
            },
          },
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/cart`,
    });

    if (!session.url) {
      throw new Error("Failed to create Stripe session URL");
    }

    // Link intent to order if available
    if (session.payment_intent) {
      await orderRef.update({ stripe_payment_intent: session.payment_intent as string });
    }

    return { success: true, url: session.url };
  } catch (error: any) {
    console.error("Checkout Session Error:", error);
    return { success: false, error: error.message };
  }
}
