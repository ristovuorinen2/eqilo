"use client";

import { adminDb } from "@/lib/firebase/admin";
import { Product } from "@/lib/types/firestore";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Truck, ShieldCheck, ChevronRight, PackageOpen, ImageIcon } from "lucide-react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { useEffect, useState, use } from "react";
import { getProducts } from "@/lib/actions/admin";

import { LocalizedDescription } from "@/components/LocalizedDescription";

import { useLanguage } from "@/components/language-provider";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { addItem } = useCart();
  const { t } = useLanguage();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      // In a real client context, we'd use a client-safe fetcher, 
      // but since we already have getProducts in admin actions, 
      // let's use that or a specific getProduct action.
      const products = await getProducts();
      const p = products.find(prod => prod.id === resolvedParams.id);
      setProduct(p || null);
      setLoading(false);
    }
    fetchProduct();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground animate-pulse font-medium">Loading equipment details...</p>
      </div>
    );
  }

  if (!product || !product.is_active) {
    notFound();
  }

  return (
    <div className="container py-10 md:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm font-medium text-muted-foreground mb-8">
        <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
        <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
        <span className="capitalize">{product.category_id.replace(/-/g, ' ')}</span>
        <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
        <span className="text-foreground truncate max-w-[200px] sm:max-w-none">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2 lg:gap-16 items-start">
        {/* Images Column */}
        <div className="space-y-4 sticky top-24">
          <div className="aspect-square bg-muted/30 rounded-2xl flex flex-col items-center justify-center border border-border/50 shadow-sm relative overflow-hidden bg-white">
             {product.image_urls && product.image_urls.length > 0 ? (
               <Image 
                 src={product.image_urls[0]} 
                 alt={product.name} 
                 fill 
                 className="object-contain p-8 mix-blend-multiply" 
                 priority
                 sizes="(max-width: 768px) 100vw, 50vw"
               />
             ) : (
               <>
                 <PackageOpen className="w-24 h-24 text-primary/20 mb-4" />
                 <span className="text-muted-foreground font-medium text-sm">Product Image Pending</span>
               </>
             )}
             <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-mono border">SKU: {product.sku}</div>
          </div>
          {/* Thumbnails */}
          {product.image_urls && product.image_urls.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.image_urls.map((url, i) => (
                <div key={i} className="w-20 h-20 shrink-0 bg-white rounded-xl border border-border/50 flex items-center justify-center hover:border-primary/50 cursor-pointer transition-colors relative overflow-hidden">
                  <Image src={url} alt={`${product.name} thumbnail ${i + 1}`} fill className="object-cover p-2 mix-blend-multiply" sizes="80px" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details Column */}
        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-foreground">{product.name}</h1>
          <p className="text-muted-foreground mb-6 font-mono text-sm bg-muted/50 w-fit px-2 py-1 rounded">{t("product.sku")}: {product.sku}</p>
          
          <div className="text-4xl font-extrabold mb-8 tracking-tight">€{product.price.toFixed(2)} <span className="text-sm font-medium text-muted-foreground ml-2">{t("product.incl_vat")} {product.tax_rate}%</span></div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8 flex items-start gap-4 shadow-sm">
            <Truck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-emerald-800">{t("product.standard_shipping")}</h4>
              <p className="text-sm text-emerald-700/80 mt-1 font-medium">
                {t("product.shipping_details")}
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-10">
            <Button 
              size="lg" 
              className="w-full text-lg h-14 font-bold shadow-md hover:shadow-lg transition-all"
              onClick={() => addItem(product.id)}
            >
              <ShoppingCart className="mr-2 w-5 h-5" />
              {t("product.add_to_cart")}
            </Button>
          </div>

          <Accordion className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger className="text-lg font-bold">{t("product.description")}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed prose prose-sm dark:prose-invert">
                <LocalizedDescription product={product} />
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="specs">
              <AccordionTrigger className="text-lg font-bold">{t("product.specs")}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <div className="flex justify-between py-3 border-b border-border/50">
                  <span className="font-medium text-foreground">{t("product.weight")}</span>
                  <span>{product.weight ? `${product.weight} kg` : "N/A"}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border/50">
                  <span className="font-medium text-foreground">{t("product.category")}</span>
                  <span className="capitalize">{product.category_id.replace(/-/g, ' ')}</span>
                </div>
              </AccordionContent>
            </AccordionItem>

            {product.box_contents && (
              <AccordionItem value="box_contents">
                <AccordionTrigger className="text-lg font-bold">{t("product.box_contents")}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                   <p className="whitespace-pre-line">{product.box_contents}</p>
                </AccordionContent>
              </AccordionItem>
            )}

            {product.downloads && product.downloads.length > 0 && (
              <AccordionItem value="downloads">
                <AccordionTrigger className="text-lg font-bold">{t("product.downloads")}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                   <ul className="space-y-2">
                     {product.downloads.map((d, idx) => (
                       <li key={idx}>
                         <a href={d.url} target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium flex items-center gap-2">
                           <ChevronRight className="w-4 h-4" /> {d.name}
                         </a>
                       </li>
                     ))}
                   </ul>
                </AccordionContent>
              </AccordionItem>
            )}

            <AccordionItem value="guarantee">
              <AccordionTrigger className="text-lg font-bold">{t("product.guarantee")}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <div className="flex items-start gap-4 bg-muted/30 p-4 rounded-lg">
                  <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                  <p className="font-medium text-sm leading-relaxed">
                    All FDS Timing devices are backed by Swiss-engineered reliability and supported locally by Eqilo's 20 years of expertise.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </div>
      </div>
    </div>
  );
}
