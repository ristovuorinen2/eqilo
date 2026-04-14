"use client";

import { useCart } from "@/components/cart-provider";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/actions/admin";
import { Product } from "@/lib/types/firestore";

import { useLanguage } from "@/components/language-provider";
import { QuoteDialog } from "@/components/QuoteDialog";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight, Minus, Plus, Trash2, PackageOpen, Truck } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const { t, lang } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground animate-pulse font-medium">
          {t("cart.updating")}
        </p>
      </div>
    );
  }

  return (
    <div className="container py-10 md:py-16 max-w-6xl">
      <div className="flex justify-between items-end mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">{t("cart.title")}</h1>
        {cartItems.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearCart} className="text-muted-foreground hover:text-destructive">
            {t("cart.clear_all")}
          </Button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-border/50 rounded-2xl bg-muted/10 shadow-sm">
          <div className="p-6 bg-primary/5 rounded-full mb-6 border border-primary/10 shadow-sm">
            <ShoppingCart className="w-16 h-16 text-primary/60" />
          </div>
          <h2 className="text-3xl font-extrabold mb-3 tracking-tight">{t("cart.empty")}</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
            {t("cart.empty_sub")}
          </p>
          <Link href="/shop">
            <Button size="lg" className="h-14 px-8 text-lg font-bold shadow-md hover:shadow-lg transition-all group">
              {t("cart.browse")}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-3 items-start">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50 shadow-sm overflow-hidden">
              <CardHeader className="bg-muted/30 border-b border-border/50 pb-4">
                <CardTitle className="text-xl font-bold">{t("cart.title")} ({cartItems.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                  {cartItems.map((item) => (
                    <div key={item.product_id} className="p-6 flex gap-6 items-start">
                      <div className="w-20 h-20 bg-muted rounded-xl flex items-center justify-center shrink-0 border border-border/50 relative overflow-hidden">
                        {item.product!.image_urls && item.product!.image_urls.length > 0 ? (
                           <img src={item.product!.image_urls[0]} alt={item.product!.name} className="object-contain w-full h-full p-2 mix-blend-multiply" />
                        ) : (
                          <PackageOpen className="w-8 h-8 text-primary/30" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <Link href={`/product/${item.product_id}`} className="font-bold text-lg hover:text-primary transition-colors line-clamp-1">
                              {item.product!.name}
                            </Link>
                            <p className="text-xs text-muted-foreground font-mono mt-1">{t("product.sku")}: {item.product!.sku}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">€{(item.product!.price * item.quantity).toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">€{item.product!.price.toFixed(2)} / {t("cart.unit")}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-6">
                          <div className="flex items-center border rounded-lg bg-background shadow-sm">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-9 w-9 rounded-r-none hover:bg-muted"
                              onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-9 w-9 rounded-l-none hover:bg-muted"
                              onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-muted-foreground hover:text-destructive hover:bg-destructive/5 font-bold gap-2"
                            onClick={() => removeItem(item.product_id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            {t("cart.remove")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cart Trust Signals */}
            <div className={`flex items-start gap-4 p-5 border rounded-xl shadow-sm ${subtotal >= 200 ? 'border-emerald-200 bg-emerald-50' : 'border-primary/20 bg-primary/5'}`}>
              <Truck className={`w-6 h-6 shrink-0 mt-0.5 ${subtotal >= 200 ? 'text-emerald-600' : 'text-primary'}`} />
              <div>
                <h4 className={`font-bold ${subtotal >= 200 ? 'text-emerald-800' : 'text-primary'}`}>{t("product.standard_shipping")}</h4>
                <p className={`text-sm mt-1 font-medium ${subtotal >= 200 ? 'text-emerald-700/80' : 'text-muted-foreground'}`}>
                  {t("product.shipping_details")}
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <Card className="sticky top-24 border-border/50 shadow-sm">
            <CardHeader className="bg-muted/30 border-b border-border/50 pb-4">
              <CardTitle className="text-xl font-bold">{t("cart.summary")}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between text-muted-foreground font-medium">
                <span>{t("cart.subtotal")}</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground font-medium">
                <span>{t("cart.shipping")}</span>
                <span>{shipping === 0 ? t("cart.free") : `€${shipping.toFixed(2)}`}</span>
              </div>
              <Separator className="my-4 border-border/50" />
              <div className="flex justify-between font-extrabold text-2xl tracking-tight text-foreground">
                <span>{t("cart.total")}</span>
                <span>€{total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 border-t border-border/50 pt-6 flex flex-col gap-3">
              <Link href="/checkout" className="w-full">
                <Button size="lg" className="w-full text-lg h-14 font-bold shadow-md hover:shadow-lg transition-all group">
                  {t("cart.checkout")}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <QuoteDialog />
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
