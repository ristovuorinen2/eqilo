"use server";

import { adminDb } from "../firebase/admin";
import { Stripe } from "stripe";
import { verifySession } from "./auth";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, {
  apiVersion: "2026-03-25.dahlia",
}) : null;

export async function createCustomerPortalSession(userId: string) {
  try {
    const session = await verifySession();
    if (!session || session.uid !== userId) {
      throw new Error("Unauthorized: Invalid session");
    }

    if (!stripe) {
      throw new Error("Stripe is not configured. Missing STRIPE_SECRET_KEY.");
    }

    // Fetch user from Firestore to get stripe_customer_id
    const customerDoc = await adminDb.collection("customers").doc(userId).get();
    const customerData = customerDoc.data();

    if (!customerDoc.exists || !customerData?.stripe_customer_id) {
      throw new Error("No Stripe Customer ID found for this user. You must complete a purchase first.");
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://eqilo.fi';

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerData.stripe_customer_id,
      return_url: `${baseUrl}/orders`,
    });

    return { success: true, url: portalSession.url };
  } catch (error) {
    console.error("Billing Portal Session Error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
