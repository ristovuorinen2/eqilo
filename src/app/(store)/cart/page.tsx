import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, ArrowRight, Truck, PackageOpen } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  // In a real implementation, this would read from Context/Cookie and fetch from Firestore
  const isCartEmpty = true;

  return (
    <div className="container py-10 md:py-16 max-w-6xl">
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-10 text-foreground">Shopping Cart</h1>

      {isCartEmpty ? (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-border/50 rounded-2xl bg-muted/10 shadow-sm">
          <div className="p-6 bg-primary/5 rounded-full mb-6 border border-primary/10 shadow-sm">
            <ShoppingCart className="w-16 h-16 text-primary/60" />
          </div>
          <h2 className="text-3xl font-extrabold mb-3 tracking-tight">Your cart is empty</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
            Looks like you haven't added any FDS Timing equipment to your cart yet.
          </p>
          <Link href="/shop">
            <Button size="lg" className="h-14 px-8 text-lg font-bold shadow-md hover:shadow-lg transition-all group">
              Browse Equipment
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-3 items-start">
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items Placeholder */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="bg-muted/30 border-b border-border/50 pb-4">
                <CardTitle className="text-xl font-bold">Equipment List</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center py-10 opacity-60">
                  <PackageOpen className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="font-medium text-muted-foreground">Placeholder for active cart items...</p>
                </div>
              </CardContent>
            </Card>

            {/* Cart Trust Signals */}
            <div className="flex items-start gap-4 p-5 border border-emerald-200 rounded-xl bg-emerald-50 shadow-sm">
              <Truck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-800">Standard Shipping: 1-2 Weeks</p>
                <p className="text-sm text-emerald-700/80 mt-1 leading-relaxed font-medium">
                  Products are shipped directly to Finland. Free shipping automatically applied to all orders over 200 €.
                </p>
              </div>
            </div>
          </div>

          <div>
            <Card className="sticky top-24 border-primary/20 shadow-lg overflow-hidden">
              <div className="h-2 w-full bg-primary"></div>
              <CardHeader className="bg-muted/10 pb-4">
                <CardTitle className="text-2xl font-bold">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="flex justify-between text-muted-foreground">
                  <span className="font-medium">Subtotal</span>
                  <span className="text-foreground">€0.00</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span className="font-medium">Shipping (Finland)</span>
                  <span className="text-sm">Calculated at checkout</span>
                </div>
                <div className="flex justify-between font-extrabold text-3xl pt-4 border-t border-border/50 mt-4 text-foreground">
                  <span>Total</span>
                  <span>€0.00</span>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 pt-6 border-t border-border/50">
                <Link href="/checkout" className="w-full">
                  <Button className="w-full h-14 text-lg font-bold shadow-md hover:shadow-lg transition-all group">
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
