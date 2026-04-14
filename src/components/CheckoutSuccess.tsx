"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { Order } from "@/lib/types/firestore";
import { formatPrice } from "@/lib/utils";

interface CheckoutSuccessProps {
  orderId: string | null;
  order: Order | null;
  amountTotal: number;
  paymentStatus: string;
  email: string | null;
}

export function CheckoutSuccess({ orderId, order, amountTotal, paymentStatus, email }: CheckoutSuccessProps) {
  const { t } = useLanguage();

  return (
    <div className="container py-20 max-w-2xl mx-auto">
      <Card className="border-emerald-100 bg-emerald-50/30 overflow-hidden">
        <div className="h-2 w-full bg-emerald-500"></div>
        <CardHeader className="text-center pb-8 pt-10">
          <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6 border border-emerald-200 shadow-sm">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <CardTitle className="text-3xl md:text-4xl font-extrabold text-emerald-900 tracking-tight">
            {t("checkout.success_title")}
          </CardTitle>
          <p className="text-emerald-700 mt-2 font-medium">
            {t("checkout.success_desc")}
          </p>
        </CardHeader>
        <CardContent className="space-y-6 px-8">
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <div className="flex justify-between text-sm text-muted-foreground mb-4 pb-4 border-b">
              <span>{t("checkout.order_ref")}</span>
              <span className="font-mono text-foreground font-bold">{orderId || "N/A"}</span>
            </div>
            
            {order && order.tax_breakdown && order.tax_breakdown.length > 0 && (
              <div className="space-y-2 mb-4 pb-4 border-b">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t("orders.tax_breakdown")}</p>
                {order.tax_breakdown.map((tax, idx) => (
                  <div key={idx} className="flex justify-between text-xs font-medium">
                    <span className="text-muted-foreground">{tax.label}</span>
                    <span>{formatPrice(tax.amount)} €</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{t("checkout.status")}</span>
              <span className="text-emerald-600 font-bold uppercase tracking-wider">{paymentStatus === 'paid' ? t("orders.paid") : t("orders.processing")}</span>
            </div>
            <div className="flex justify-between font-bold text-xl pt-4 mt-4 border-t">
              <span>{t("checkout.total_paid")}</span>
              <span>{formatPrice(amountTotal / 100)} €</span>
            </div>
          </div>

          <div className="text-sm text-muted-foreground leading-relaxed text-center italic">
            {t("checkout.email_sent")} <span className="font-bold text-foreground">{email}</span>.
            {t("checkout.shipping_note")}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center pb-12 pt-6 px-8">
          <Link href="/shop" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto border-emerald-200 hover:bg-emerald-100 text-emerald-800 font-bold">
              <ShoppingBag className="mr-2 h-4 w-4" />
              {t("checkout.continue_shopping")}
            </Button>
          </Link>
          <Link href="/services" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md">
              {t("checkout.explore_services")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
