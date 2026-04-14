"use client";

import { useLanguage } from "@/components/language-provider";
import { Product } from "@/lib/types/firestore";

export function LocalizedSpecifications({ product }: { product: Product }) {
  const { lang } = useLanguage();
  
  let specsHtml = product.specifications;
  if (lang === "FI" && product.specifications_fi) {
    specsHtml = product.specifications_fi;
  } else if (lang === "SE" && product.specifications_se) {
    specsHtml = product.specifications_se;
  }

  if (!specsHtml) return null;

  return (
    <div 
      className="prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-ul:my-2"
      dangerouslySetInnerHTML={{ __html: specsHtml }} 
    />
  );
}
