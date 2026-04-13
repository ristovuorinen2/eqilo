"use client";

import { useLanguage } from "@/components/language-provider";
import { Product } from "@/lib/types/firestore";

export function LocalizedDescription({ product }: { product: Product }) {
  const { lang, t } = useLanguage();
  
  const description = lang === 'FI' ? (product.description_fi || product.description) : 
                      lang === 'SE' ? (product.description_se || product.description) : 
                      product.description;

  return (
    <div className="text-muted-foreground leading-relaxed prose prose-sm dark:prose-invert">
       <p>{description}</p>
    </div>
  );
}
