"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { ShieldCheck, Truck, LockKeyhole, ArrowRight, PackageOpen, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/components/cart-provider";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/actions/admin";
import { Product } from "@/lib/types/firestore";
import { createCheckoutSession } from "@/lib/actions/checkout";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessId, setBusinessId] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const cartItems = items.map(item => {
    const product = products.find(p => p.id === item.product_id);
    return { ...item, product };
  }).filter(item => item.product !== undefined);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product!.price * item.quantity), 0);
  const shipping = subtotal >= 200 ? 0 : 20;
  const total = subtotal + shipping;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    if (!email || !phone) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // In a production app, we would handle Auth here.
      // Passing email, phone, and businessId to create/link the customer account.
      const res = await createCheckoutSession(email, items, {
        email,
        phone,
        businessId
      });
      
      if (res.success && res.url) {
        window.location.href = res.url;
      } else {
        alert("Error creating checkout session: " + res.error);
        setIsSubmitting(false);
      }
    } catch (err: any) {
      alert("An unexpected error occurred: " + err.message);
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground animate-pulse font-medium">Preparing secure checkout...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link href="/shop">
          <Button>Return to Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-10 md:py-16 max-w-5xl">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-2">
          <LockKeyhole className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">Secure Checkout</h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-lg">
          Complete your purchase securely via Stripe. Shipping is available exclusively within Finland.
        </p>
      </div>

      <form onSubmit={handleCheckout} className="grid gap-10 md:grid-cols-[1fr_400px] lg:grid-cols-[1fr_450px]">
        {/* Account Creation / Contact Info */}
        <div className="space-y-8">
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="bg-muted/30 border-b border-border/50 pb-6 rounded-t-xl">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs">1</span> 
                Contact Information
              </CardTitle>
              <CardDescription className="text-base">
                An account will be automatically created for you upon checkout to track your order.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="font-semibold text-foreground">Email Address <span className="text-destructive">*</span></Label>
                <Input 
                  id="email" 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="johndoe@example.fi" 
                  className="h-12 bg-background" 
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="phone" className="font-semibold text-foreground">Phone Number <span className="text-destructive">*</span></Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+358 50 123 4567" 
                  className="h-12 bg-background" 
                />
                <p className="text-xs text-muted-foreground font-medium">Required by couriers for delivery updates.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader className="bg-muted/30 border-b border-border/50 pb-6 rounded-t-xl">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-muted-foreground/30 text-foreground text-xs">2</span> 
                Business Information <span className="font-normal text-muted-foreground text-sm ml-2">(Optional)</span>
              </CardTitle>
              <CardDescription className="text-base">
                If you are purchasing on behalf of a club or business, provide your details for B2B invoicing.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-3">
                <Label htmlFor="business_id" className="font-semibold text-foreground">Business ID (Y-tunnus)</Label>
                <Input 
                  id="business_id" 
                  type="text" 
                  value={businessId}
                  onChange={(e) => setBusinessId(e.target.value)}
                  placeholder="1234567-8" 
                  className="h-12 bg-background" 
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-4 p-5 border border-primary/20 rounded-xl bg-primary/5 shadow-sm">
              <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-primary">Secure Payment Processing</p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  You will be securely redirected to Stripe to provide your shipping address and complete payment via MobilePay, Apple Pay, Google Pay, or Credit Card.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-24 border-primary/20 shadow-lg overflow-hidden">
            <div className="h-2 w-full bg-primary"></div>
            <CardHeader className="bg-muted/10 pb-4">
              <CardTitle className="text-2xl font-bold">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6 max-h-[400px] overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.product_id} className="flex justify-between items-start">
                  <div className="min-w-0 pr-4">
                    <p className="font-bold text-foreground line-clamp-1">{item.product!.name}</p>
                    <p className="text-xs text-muted-foreground">SKU: {item.product!.sku}</p>
                    <p className="text-sm font-medium mt-1 text-primary">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold whitespace-nowrap">€{(item.product!.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              
              <div className="border-t border-border/50 pt-6 space-y-3">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-medium text-foreground">€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className={`font-bold ${shipping === 0 ? 'text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100' : 'text-foreground'}`}>
                    {shipping === 0 ? 'Free' : `€${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between font-extrabold text-3xl pt-4 border-t border-border/50 mt-4 text-foreground">
                  <span>Total</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground text-right">Includes 25.5% VAT</p>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 flex flex-col items-start pt-6 border-t border-border/50 gap-6">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="terms" 
                  required
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                  className="mt-1 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" 
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-relaxed cursor-pointer"
                  >
                    I agree to the Eqilo <Link href="/terms" target="_blank" className="text-primary font-bold hover:underline">E-store Terms & Conditions</Link>. <span className="text-destructive">*</span>
                  </label>
                </div>
              </div>

              <Button 
                className="w-full h-14 text-lg font-bold shadow-md hover:shadow-lg transition-all group" 
                type="submit"
                disabled={!agreed || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Connecting to Stripe...
                  </>
                ) : (
                  <>
                    Proceed to Payment
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}
