import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Stripe } from "stripe";
import { adminDb } from "@/lib/firebase/admin";
import { Resend } from "resend";
import { getOrderConfirmationEmailHtml, getAdminNotificationEmailHtml } from "@/lib/emails";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {
  apiVersion: "2025-02-24.acacia" as any,
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_to_pass_build");
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    if (endpointSecret) {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } else {
      throw new Error("Webhook secret is missing");
    }
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      // 1. Update order status in Firestore
      const orderRef = adminDb.collection("orders").doc(orderId);
      
      const shippingDetails = (session as any).shipping_details?.address;
      
      await orderRef.update({
        status: "paid",
        stripe_payment_intent: session.payment_intent as string,
        shipping_address: shippingDetails ? {
          line1: shippingDetails.line1 || "",
          line2: shippingDetails.line2 || "",
          city: shippingDetails.city || "",
          postal_code: shippingDetails.postal_code || "",
          country: shippingDetails.country || "FI",
        } : null,
      });

      // 2. Fetch customer details and order to send email
      try {
        const orderSnap = await orderRef.get();
        const orderData = orderSnap.data();
        
        if (orderData) {
          const userSnap = await adminDb.collection("customers").doc(orderData.user_id).get();
          const customerEmail = userSnap.data()?.email || session.customer_details?.email;
          
          // 3. Trigger Holvi Invoice Integration
          if (customerEmail) {
            await resend.emails.send({
              from: 'Eqilo.fi <orders@eqilo.fi>',
              to: [customerEmail],
              subject: `Order Confirmation - ${orderId}`,
              html: getOrderConfirmationEmailHtml(orderId, orderData.total_amount),
            });
          }

          // Admin notification
          await resend.emails.send({
             from: 'Eqilo.fi System <system@eqilo.fi>',
             to: ['johannes@hyrsky.fi'],
             subject: `NEW ORDER - ${orderId}`,
             html: getAdminNotificationEmailHtml(orderId, orderData.total_amount, orderData.user_id),
          });
        }
      } catch (err) {
        console.error("Error in post-checkout webhook actions:", err);
      }
    }
  }

  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
