"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";

interface PriceDisplayProps {
  price: number;
  taxRate?: number;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  align?: "left" | "right" | "center";
  hideDetails?: boolean;
}

export function PriceDisplay({ price, taxRate = 25.5, className = "", size = "md", align = "left", hideDetails = false }: PriceDisplayProps) {
  const { t } = useLanguage();
  const [showNet, setShowNet] = useState(false);
  
  // Calculate VAT based on inclusive price
  const netPrice = price / (1 + (taxRate / 100));
  const vatAmount = price - netPrice;

  const displayPrice = showNet ? netPrice : price;

  let priceClass = "font-extrabold tracking-tighter text-foreground flex items-baseline gap-1.5 flex-wrap";
  let detailClass = "text-[10px] text-muted-foreground flex flex-col uppercase tracking-widest mt-1.5 font-medium gap-0.5";

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
        <span className="whitespace-nowrap">{formatPrice(displayPrice)} €</span>
        <span 
          className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest whitespace-nowrap cursor-pointer hover:text-primary transition-colors select-none"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowNet(!showNet);
          }}
          title="Toggle Net/Gross price"
        >
          {showNet ? t("product.net_price") : `${t("product.incl_vat")} ${String(taxRate).replace('.', ',')}%`}
        </span>
      </div>
      {!hideDetails && (
        <div className={detailClass}>
          {!showNet && <span>{t("product.net_price")}: {formatPrice(netPrice)} €</span>}
          <span>{t("product.vat_amount")} ({String(taxRate).replace('.', ',')}%): {formatPrice(vatAmount)} €</span>
        </div>
      )}
    </div>
  );
}
