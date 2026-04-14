"use server";

import { adminDb } from "../firebase/admin";
import { Stripe } from "stripe";
import { CartItem, Product, Order } from "../types/firestore";
import { verifySession } from "./auth";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, {
  apiVersion: "2025-02-24.acacia" as any,
}) : null;

export async function createCheckoutSession(
  userId: string, 
  cartItems: CartItem[], 
  customerDetails?: { email: string; phone: string; businessId?: string },
  lang: string = "FI"
) {
  try {
    const session = await verifySession();
    if (!session || session.uid !== userId) {
      throw new Error("Unauthorized: Invalid session");
    }

    if (!stripe) {
      throw new Error("Stripe is not configured. Missing STRIPE_SECRET_KEY in environment variables.");
    }

    if (!cartItems.length) {
      throw new Error("Cart is empty");
    }

    // 0. Ensure Customer exists in Firestore and has latest contact info
    const customerRef = adminDb.collection("customers").doc(userId);
    const customerDoc = await customerRef.get();
    
    const customerData = {
      id: userId,
      email: customerDetails?.email || (customerDoc.exists ? customerDoc.data()?.email : null),
      phone_number: customerDetails?.phone || (customerDoc.exists ? customerDoc.data()?.phone_number : null),
      business_id: customerDetails?.businessId || (customerDoc.exists ? customerDoc.data()?.business_id : ""),
      role: (customerDetails?.businessId || (customerDoc.exists && customerDoc.data()?.business_id)) ? "b2b_customer" : "customer",
      updated_at: new Date(),
    };

    if (!customerDoc.exists) {
      await customerRef.set({
        ...customerData,
        created_at: new Date(),
      });
    } else {
      await customerRef.update(customerData);
    }

    // Fetch products
    let subtotal = 0;
    let tax_total = 0;
    const tax_map: Record<number, number> = {};
    const line_items: any[] = [];
    const orderItems: any[] = [];

    for (const item of cartItems) {
      const productDoc = await adminDb.collection("products").doc(item.product_id).get();
      if (!productDoc.exists) {
        throw new Error(`Product ${item.product_id} not found`);
      }
      
      const product = productDoc.data() as Product;
      const unitPrice = item.custom_price_override ?? product.price;
      const itemTax = (unitPrice * item.quantity) * (product.tax_rate / 100);
      
      subtotal += unitPrice * item.quantity;
      tax_total += itemTax;

      // Accumulate tax by rate
      tax_map[product.tax_rate] = (tax_map[product.tax_rate] || 0) + itemTax;

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
            images: product.image_urls?.length > 0 ? [product.image_urls[0]] : undefined,
          },
          unit_amount: Math.round(unitPrice * 100), // Stripe expects cents
        },
        quantity: item.quantity,
      });
    }

    const tax_breakdown = Object.entries(tax_map).map(([rate, amount]) => ({
      rate: Number(rate),
      amount: amount,
      label: `VAT ${rate}%`,
    }));

    // 20 € shipping if < 200 €, otherwise free
    const shippingCost = subtotal < 200 ? 2000 : 0; // In cents
    
    // Create pending order in Firestore
    const orderRef = adminDb.collection("orders").doc();
    const newOrder: Partial<Order> = {
      id: orderRef.id,
      user_id: userId,
      items: orderItems,
      subtotal: subtotal,
      tax_total: tax_total, 
      tax_breakdown: tax_breakdown,
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
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ['card', 'mobilepay'],
      line_items,
      client_reference_id: userId,
      metadata: {
        orderId: orderRef.id,
        lang: lang,
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

    if (!stripeSession.url) {
      throw new Error("Failed to create Stripe session URL");
    }

    // Link intent to order if available
    if (stripeSession.payment_intent) {
      await orderRef.update({ stripe_payment_intent: stripeSession.payment_intent as string });
    }

    return { success: true, url: stripeSession.url };
  } catch (error: any) {
    console.error("Checkout Session Error:", error);
    return { success: false, error: error.message };
  }
}
