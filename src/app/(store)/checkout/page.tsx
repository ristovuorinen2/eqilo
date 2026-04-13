import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Truck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CheckoutPage() {
  return (
    <div className="container py-10 md:py-16 max-w-4xl">
      <div className="space-y-4 mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Secure Checkout</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Complete your purchase securely via Stripe. Shipping is available exclusively within Finland.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_400px]">
        {/* Account Creation / Contact Info */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Contact Information</CardTitle>
              <CardDescription>
                An account will be automatically created for you upon checkout to track your order.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" placeholder="johndoe@example.fi" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" placeholder="+358 50 123 4567" />
                <p className="text-xs text-muted-foreground">Required by couriers for delivery updates.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Business Information (Optional)</CardTitle>
              <CardDescription>
                If you are purchasing on behalf of a club or business, provide your details for B2B invoicing.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="business_id">Business ID (Y-tunnus)</Label>
                <Input id="business_id" type="text" placeholder="1234567-8" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Payment & Shipping</CardTitle>
              <CardDescription>
                You will be securely redirected to Stripe to provide your shipping address and complete payment via MobilePay, Apple Pay, Google Pay, or Credit Card.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 border rounded-lg bg-muted/20">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Secure Payment Processing</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      We use Stripe. Your payment details are never stored on our servers.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 border rounded-lg bg-muted/20">
                  <Truck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Shipping to Finland</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Free shipping on orders over 200 €. Flat 20 € rate otherwise. Standard delivery 1-2 weeks.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Placeholder for cart items */}
              <div className="flex justify-between text-sm">
                <span>FDS-K10011 (x1)</span>
                <span>€1419.00</span>
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>€1419.00</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-primary font-medium">Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                  <span>Total</span>
                  <span>€1419.00</span>
                </div>
              </div>
              <div className="pt-6">
                <p className="text-xs text-muted-foreground text-center mb-4">
                  By proceeding to payment, you agree to our <Link href="/terms" className="text-primary hover:underline">E-store Terms & Conditions</Link>.
                </p>
                <form action={async () => { 
                  "use server"; 
                  // In reality, this calls createCheckoutSession
                  console.log("Redirecting to stripe..."); 
                }}>
                  <Button className="w-full" size="lg" type="submit">
                    Proceed to Payment
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
