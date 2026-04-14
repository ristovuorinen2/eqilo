"use client";

import { useCart } from "@/components/cart-provider";
import { Product } from "@/lib/types/firestore";

import { useLanguage } from "@/components/language-provider";
import { QuoteDialog } from "@/components/QuoteDialog";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight, Minus, Plus, Trash2, PackageOpen, Truck } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";

interface CartContentProps {
  products: Product[];
}

export default function CartContent({ products }: CartContentProps) {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const { t, lang } = useLanguage();

  const cartItems = items.map(item => {
    const product = products.find(p => p.id === item.product_id);
    return { ...item, product };
  }).filter(item => item.product !== undefined);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product!.price * item.quantity), 0);
  const hasTestProduct = cartItems.some(item => item.product!.sku === "TEST-1EUR");
  const shipping = (subtotal >= 200 || hasTestProduct) ? 0 : 20;
  const total = subtotal + shipping;

  return (
    <div className="container py-6 md:py-16 max-w-6xl">
      <div className="flex justify-between items-end mb-8 md:mb-10 pb-6 border-b border-border/50">
        <div className="space-y-1">
          <h1 className="text-3xl xs:text-4xl md:text-5xl font-black tracking-tighter text-foreground leading-tight">{t("cart.title")}</h1>
          {cartItems.length > 0 && <p className="text-muted-foreground text-sm xs:text-base font-medium">{cartItems.length} {t("cart.items_in_cart")}</p>}
        </div>
        {cartItems.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearCart} className="text-muted-foreground hover:text-destructive font-bold text-xs uppercase tracking-widest">
            {t("cart.clear_all")}
          </Button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 xs:py-24 px-4 text-center border border-border/50 rounded-3xl bg-muted/10 shadow-sm overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
          <div className="p-6 bg-primary/10 rounded-full mb-6 border border-primary/10 shadow-inner relative z-10">
            <ShoppingCart className="w-12 h-12 xs:w-16 xs:h-16 text-primary" />
          </div>
          <h2 className="text-2xl xs:text-3xl font-black mb-3 tracking-tighter relative z-10">{t("cart.empty")}</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8 text-sm xs:text-lg font-medium relative z-10 leading-relaxed">
            {t("cart.empty_sub")}
          </p>
          <Link href="/shop" className="relative z-10">
            <Button size="lg" className="h-14 xs:h-16 px-8 xs:px-10 text-md xs:text-lg font-black shadow-xl hover:shadow-2xl transition-all group rounded-2xl uppercase tracking-wider">
              {t("cart.browse")}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="border border-border/50 rounded-3xl bg-card shadow-sm overflow-hidden">
              <div className="divide-y divide-border/50">
                {cartItems.map((item) => (
                  <div key={item.product_id} className="p-4 xs:p-6 flex gap-4 xs:gap-6 items-start">
                    <div className="w-20 h-20 xs:w-24 xs:h-24 bg-white rounded-2xl flex items-center justify-center shrink-0 border border-border/50 relative overflow-hidden shadow-sm">
                      {item.product!.image_urls && item.product!.image_urls.length > 0 ? (
                         <img src={item.product!.image_urls[0]} alt={item.product!.name} className="object-contain w-full h-full p-2 mix-blend-multiply" />
                      ) : (
                        <PackageOpen className="w-8 h-8 text-primary/30" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col xs:flex-row justify-between items-start gap-2 xs:gap-4">
                        <div className="flex-1 min-w-0">
                          <Link href={`/product/${item.product_id}`} className="font-black text-md xs:text-lg hover:text-primary transition-colors line-clamp-1 leading-tight tracking-tight uppercase">
                            {item.product!.name}
                          </Link>
                          <p className="text-[10px] xs:text-xs text-muted-foreground font-mono mt-1 font-bold bg-muted/50 w-fit px-1.5 py-0.5 rounded">{t("product.sku")}: {item.product!.sku}</p>
                        </div>
                        <div className="text-left xs:text-right shrink-0">
                          <p className="font-black text-lg xs:text-xl text-primary leading-none tracking-tighter">{formatPrice(item.product!.price * item.quantity)} €</p>
                          <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-1">{formatPrice(item.product!.price)} € / {t("cart.unit")}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 xs:mt-6">
                        <div className="flex items-center border border-border/50 rounded-xl bg-background shadow-sm overflow-hidden">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 xs:h-10 xs:w-10 rounded-none hover:bg-muted"
                            onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 xs:w-10 text-center font-black text-sm">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 xs:h-10 xs:w-10 rounded-none hover:bg-muted"
                            onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-muted-foreground/60 hover:text-destructive hover:bg-destructive/5 font-black gap-2 text-[10px] uppercase tracking-widest"
                          onClick={() => removeItem(item.product_id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          {t("cart.remove")}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Trust Signals */}
            <div className={`flex items-start gap-4 p-5 border rounded-2xl shadow-sm ${subtotal >= 200 ? 'border-emerald-200/50 bg-emerald-50/50' : 'border-primary/20 bg-primary/5'}`}>
              <div className={`p-2 rounded-full shrink-0 ${subtotal >= 200 ? 'bg-emerald-500' : 'bg-primary'}`}>
                <Truck className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className={`font-black text-sm uppercase tracking-tight ${subtotal >= 200 ? 'text-emerald-900' : 'text-primary'}`}>{t("product.standard_shipping")}</h4>
                <p className={`text-xs xs:text-sm mt-1 font-semibold leading-relaxed ${subtotal >= 200 ? 'text-emerald-800/70' : 'text-primary/70'}`}>
                  {t("product.shipping_details")}
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24">
            <Card className="border-border/50 shadow-xl rounded-3xl overflow-hidden text-card-foreground">
              <CardHeader className="bg-muted/30 border-b border-border/50 pb-4">
                <CardTitle className="text-lg font-black uppercase tracking-tight">{t("cart.summary")}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex justify-between text-muted-foreground font-bold text-sm uppercase tracking-widest">
                  <span>{t("cart.subtotal")}</span>
                  <span className="text-foreground">{formatPrice(subtotal)} €</span>
                </div>
                <div className="flex justify-between text-muted-foreground font-bold text-sm uppercase tracking-widest">
                  <span>{t("cart.shipping")}</span>
                  <span className={shipping === 0 ? "text-emerald-600 font-black" : "text-foreground"}>
                    {shipping === 0 ? (t("cart.free") || "ILMAINEN") : `${formatPrice(shipping)} €`}
                  </span>
                </div>
                <Separator className="my-4 border-border/50" />
                <div className="flex justify-between font-black text-2xl xs:text-3xl tracking-tighter text-foreground">
                  <span>{t("cart.total")}</span>
                  <span className="text-primary">{formatPrice(total)} €</span>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 border-t border-border/50 pt-6 flex flex-col gap-3">
                <Link href="/checkout" className="w-full">
                  <Button size="lg" className="w-full text-md xs:text-lg h-14 xs:h-16 font-black shadow-xl hover:shadow-2xl transition-all group rounded-2xl uppercase tracking-wider">
                    {t("cart.checkout")}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <div className="w-full flex items-center gap-3 my-2">
                  <Separator className="flex-1 bg-border/50" />
                  <span className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest">{t("cart.or")}</span>
                  <Separator className="flex-1 bg-border/50" />
                </div>
                <QuoteDialog />
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
