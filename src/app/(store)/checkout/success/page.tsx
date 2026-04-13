import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Stripe } from "stripe";
import { notFound } from "next/navigation";

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
        <Link href="/shop">
          <Button className="mt-8">Return to Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-20 max-w-2xl mx-auto">
      <Card className="border-emerald-100 bg-emerald-50/30 overflow-hidden">
        <div className="h-2 w-full bg-emerald-500"></div>
        <CardHeader className="text-center pb-8 pt-10">
          <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6 border border-emerald-200 shadow-sm">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <CardTitle className="text-3xl md:text-4xl font-extrabold text-emerald-900 tracking-tight">
            Order Confirmed!
          </CardTitle>
          <p className="text-emerald-700 mt-2 font-medium">
            Thank you for your purchase. Your order is now being processed.
          </p>
        </CardHeader>
        <CardContent className="space-y-6 px-8">
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <div className="flex justify-between text-sm text-muted-foreground mb-4 pb-4 border-b">
              <span>Order Reference</span>
              <span className="font-mono text-foreground font-bold">{session.metadata?.orderId || "N/A"}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Status</span>
              <span className="text-emerald-600 font-bold uppercase tracking-wider">{session.payment_status === 'paid' ? 'Paid' : 'Pending'}</span>
            </div>
            <div className="flex justify-between font-bold text-xl pt-4 mt-4 border-t">
              <span>Total Paid</span>
              <span>€{(session.amount_total! / 100).toFixed(2)}</span>
            </div>
          </div>

          <div className="text-sm text-muted-foreground leading-relaxed text-center italic">
            A confirmation email has been sent to <span className="font-bold text-foreground">{session.customer_details?.email}</span>.
            Standard delivery for FDS Timing equipment is 1-2 weeks.
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center pb-12 pt-6 px-8">
          <Link href="/shop" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto border-emerald-200 hover:bg-emerald-100 text-emerald-800 font-bold">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
          <Link href="/services" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md">
              Explore Our Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
