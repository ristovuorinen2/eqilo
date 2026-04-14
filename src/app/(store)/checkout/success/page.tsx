import { Stripe } from "stripe";
import { notFound } from "next/navigation";
import { adminDb } from "@/lib/firebase/admin";
import { Order } from "@/lib/types/firestore";
import { CheckoutSuccess } from "@/components/CheckoutSuccess";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, {
  apiVersion: "2025-02-24.acacia" as any,
}) : null;

async function getSession(sessionId: string) {
  try {
    if (!stripe) {
      console.warn("Stripe is not initialized.");
      return null;
    }
    return await stripe.checkout.sessions.retrieve(sessionId);
  } catch (e) {
    return null;
  }
}

async function getOrder(orderId: string): Promise<Order | null> {
  const doc = await adminDb.collection("orders").doc(orderId).get();
  if (doc.exists) return { ...doc.data(), id: doc.id } as Order;
  return null;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    notFound();
  }

  const session = await getSession(session_id);

  if (!session) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-destructive">Invalid Session</h1>
        <p className="mt-2 text-muted-foreground">We couldn't verify your order. Please contact support.</p>
      </div>
    );
  }

  const orderId = session.metadata?.orderId;
  const order = orderId ? await getOrder(orderId) : null;

  return (
    <CheckoutSuccess 
      orderId={orderId || null}
      order={order}
      amountTotal={session.amount_total || 0}
      paymentStatus={session.payment_status}
      email={session.customer_details?.email || null}
    />
  );
}
