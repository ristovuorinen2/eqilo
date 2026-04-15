"use client";

import { formatPrice } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";

interface PriceDisplayProps {
  price: number;
  taxRate?: number;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  align?: "left" | "right" | "center";
}

export function PriceDisplay({ price, taxRate = 25.5, className = "", size = "md", align = "left" }: PriceDisplayProps) {
  const { t } = useLanguage();
  
  // Calculate VAT based on inclusive price
  const netPrice = price / (1 + (taxRate / 100));
  const vatAmount = price - netPrice;

  let priceClass = "font-extrabold tracking-tighter text-foreground flex items-baseline gap-1";
  let detailClass = "text-[10px] text-muted-foreground flex flex-col uppercase tracking-widest mt-1 font-medium";

  if (size === "sm") {
    priceClass += " text-lg";
  } else if (size === "md") {
    priceClass += " text-xl xs:text-2xl";
  } else if (size === "lg") {
    priceClass += " text-2xl md:text-3xl";
  } else if (size === "xl") {
    priceClass += " text-3xl md:text-4xl";
  }

  if (align === "right") {
    detailClass += " items-end text-right";
    priceClass += " justify-end";
  } else if (align === "center") {
    detailClass += " items-center text-center";
    priceClass += " justify-center";
  } else {
    detailClass += " items-start text-left";
    priceClass += " justify-start";
  }

  return (
    <div className={`flex flex-col ${align === 'right' ? 'items-end' : align === 'center' ? 'items-center' : 'items-start'} ${className}`}>
      <div className={priceClass}>
        {formatPrice(price)} €
      </div>
      <div className={detailClass}>
        <span>{t("product.net_price")}: {formatPrice(netPrice)} €</span>
        <span>{t("product.vat_amount")} ({taxRate}%): {formatPrice(vatAmount)} €</span>
      </div>
    </div>
  );
}
