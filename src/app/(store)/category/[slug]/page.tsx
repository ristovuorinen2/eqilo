"use client";

import { adminDb } from "@/lib/firebase/admin";
import { Product } from "@/lib/types/firestore";
import { LocalizedDescription } from "@/components/LocalizedDescription";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PackageOpen, Clock, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/components/cart-provider";
import { useLanguage } from "@/components/language-provider";
import { useEffect, useState, use } from "react";
import { getProducts } from "@/lib/actions/admin";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const { addItem } = useCart();
  const { t, lang } = useLanguage();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setProducts(data.filter(p => p.is_active && p.category_id === slug));
      setLoading(false);
    }
    fetchProducts();
  }, [slug]);

  if (loading) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground animate-pulse font-medium">
          {lang === "FI" ? "Ladataan..." : lang === "SE" ? "Laddar..." : "Loading..."}
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground font-medium">
          {lang === "FI" ? "Tästä kategoriasta ei löytynyt tuotteita." : lang === "SE" ? "Inga produkter hittades i denna kategori." : "No products found in this category."}
        </p>
      </div>
    );
  }

  const categoryName = t(`category.${slug}`) !== `category.${slug}` ? t(`category.${slug}`) : slug.replace(/-/g, ' ');

  return (
    <div className="container py-10 md:py-16">
      
      <div className="mb-10 space-y-4 max-w-4xl border-b pb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight capitalize">{categoryName}</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {lang === "FI" ? "Ammattimaiset FDS Timing -ratkaisut kategoriaan" : lang === "SE" ? "Professionella FDS Timing-lösningar för" : "Professional FDS Timing solutions for"} {categoryName.toLowerCase()}.
        </p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <span className="text-muted-foreground font-medium bg-muted px-3 py-1 rounded-full text-sm border">{products.length} {t("shop.items_found")}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="flex flex-col overflow-hidden transition-all hover:shadow-lg border-border/50 hover:border-primary/30 group">
                <Link href={`/product/${product.id}`} className="flex-1 flex flex-col">
                  <div className="aspect-square bg-muted/30 flex flex-col items-center justify-center p-6 relative group-hover:bg-muted/50 transition-colors bg-white">
                    {product.image_urls && product.image_urls.length > 0 ? (
                      <Image 
                        src={product.image_urls[0]} 
                        alt={product.name} 
                        fill 
                        className="object-contain p-4 mix-blend-multiply" 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <>
                        <PackageOpen className="w-16 h-16 text-primary/30 group-hover:text-primary/50 transition-colors mb-4" />
                        <span className="text-muted-foreground text-xs font-mono bg-background/50 px-2 py-1 rounded border">{t("product.sku")}: {product.sku}</span>
                      </>
                    )}
                  </div>
                  <CardHeader className="p-5 pb-2 flex-1">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-primary">{categoryName}</p>
                    </div>
                    <CardTitle className="text-lg leading-snug font-bold group-hover:text-primary transition-colors">{product.name}</CardTitle>
                    <div className="text-xs text-muted-foreground line-clamp-2 mt-2 leading-relaxed">
                      <LocalizedDescription product={product} />
                    </div>
                  </CardHeader>
                </Link>
                <CardFooter className="p-5 pt-0 mt-auto flex flex-col items-start gap-4">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 w-fit">
                    <Clock className="w-3.5 h-3.5" /> {t("product.standard_shipping")}
                  </div>
                  <div className="w-full flex items-center justify-between mt-1">
                    <div className="font-extrabold text-2xl tracking-tight text-foreground">€{product.price.toFixed(2)}</div>
                    <Badge variant="outline" className="font-semibold border-primary/20 bg-primary/5 text-primary">{t("shop.in_stock")}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 w-full mt-2">
                    <Link href={`/product/${product.id}`} className="w-full">
                      <Button variant="outline" className="w-full font-semibold">{t("shop.view_details")}</Button>
                    </Link>
                    <Button 
                      className="w-full font-bold" 
                      onClick={(e) => {
                        e.preventDefault();
                        addItem(product.id);
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {t("shop.add")}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
      </div>
      
    </div>
  );
}
