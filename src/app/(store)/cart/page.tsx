import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  // In a real implementation, this would read from Context/Cookie and fetch from Firestore
  const isCartEmpty = true;

  return (
    <div className="container py-10 md:py-16 max-w-5xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart</h1>

      {isCartEmpty ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border rounded-xl bg-muted/10">
          <div className="p-4 bg-muted rounded-full mb-4">
            <ShoppingCart className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground max-w-sm mb-8">
            Looks like you haven't added any FDS Timing equipment to your cart yet.
          </p>
          <Link href="/shop">
            <Button size="lg">Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {/* Cart Items Placeholder */}
            <Card>
              <CardContent className="p-6">
                <p>Items will appear here...</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>€0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping (Finland)</span>
                  <span>Calculated at checkout</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>€0.00</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/checkout" className="w-full">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4 ml-2" />
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
