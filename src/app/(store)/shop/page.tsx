"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PackageOpen, Clock, Tag, ShoppingCart, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/components/cart-provider";
import { useEffect, useState } from "react";
import { Product } from "@/lib/types/firestore";
import { LocalizedDescription } from "@/components/LocalizedDescription";
import { useLanguage } from "@/components/language-provider";
import { getProducts } from "@/lib/actions/admin";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ShopPage() {
  const { addItem } = useCart();
  const { t, lang } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, []);

  const activeProducts = products.filter(p => {
    const isActive = p.is_active;
    const matchesCategory = selectedCategory === "all" || p.category_id === selectedCategory;
    return isActive && matchesCategory;
  });

  const categories = Array.from(new Set(products.filter(p => p.is_active).map(p => p.category_id)));

  if (loading) {
    return (
      <div className="container py-20 text-center flex flex-col items-center justify-center min-h-[50vh]">
        <PackageOpen className="w-12 h-12 text-muted-foreground/30 animate-pulse mb-4" />
        <p className="text-muted-foreground animate-pulse font-bold tracking-tight">
          {lang === "FI" ? "Ladataan ammattilaitteita..." : lang === "SE" ? "Laddar professionell utrustning..." : "Loading professional equipment..."}
        </p>
      </div>
    );
  }

  return (
    <div className="container py-10 md:py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-72 shrink-0 space-y-8 sticky top-24">
          <div className="border border-border/50 rounded-2xl p-6 bg-card shadow-sm">
            <h3 className="text-xl font-extrabold mb-6 flex items-center gap-2 text-foreground tracking-tight">
              <Tag className="w-5 h-5 text-primary" /> {t("shop.categories")}
            </h3>
            <RadioGroup 
              defaultValue="all" 
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="space-y-2.5"
            >
              <div 
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer",
                  selectedCategory === "all" ? "bg-primary/5 border-primary/30" : "border-transparent hover:bg-muted/50"
                )}
                onClick={() => setSelectedCategory("all")}
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="all" id="all" className="sr-only" />
                  <Label htmlFor="all" className="cursor-pointer font-bold w-full">{t("shop.all_equipment")}</Label>
                </div>
                {selectedCategory === "all" && <Check className="w-4 h-4 text-primary" />}
              </div>
              
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <div 
                    key={cat} 
                    className={cn(
                      "flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer",
                      isSelected ? "bg-primary/5 border-primary/30" : "border-transparent hover:bg-muted/50"
                    )}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value={cat} id={cat} className="sr-only" />
                      <Label htmlFor={cat} className="capitalize cursor-pointer font-semibold text-muted-foreground w-full">
                        {t(`category.${cat}`) !== `category.${cat}` ? t(`category.${cat}`) : cat.replace(/-/g, ' ')}
                      </Label>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-primary" />}
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-border/50">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">{t("shop.all_equipment")}</h1>
              <p className="text-muted-foreground mt-3 text-lg font-medium">Professional timekeeping solutions for clubs.</p>
            </div>
            <div className="mt-4 md:mt-0 text-sm font-bold bg-primary/10 text-primary px-4 py-1.5 rounded-full border border-primary/20">
              {activeProducts.length} {t("shop.items_found")}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8">
            {activeProducts.map((product) => (
              <Card key={product.id} className="flex flex-col overflow-hidden transition-all hover:shadow-xl border-border/50 hover:border-primary/40 group bg-card">
                <Link href={`/product/${product.id}`} className="flex-1 flex flex-col">
                  <div className="aspect-square bg-muted/10 flex flex-col items-center justify-center p-6 relative group-hover:bg-muted/30 transition-colors bg-white border-b border-border/50">
                    {product.image_urls && product.image_urls.length > 0 ? (
                      <Image 
                        src={product.image_urls[0]} 
                        alt={product.name} 
                        fill 
                        className="object-contain p-6 mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <>
                        <Image 
                          src="/eqilologo.jpeg" 
                          alt="Eqilo Logo Placeholder" 
                          fill 
                          className="object-contain p-12 opacity-20 grayscale group-hover:opacity-40 transition-opacity duration-500" 
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <span className="text-muted-foreground text-xs font-mono bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border shadow-sm absolute bottom-4">{t("product.sku")}: {product.sku}</span>
                      </>
                    )}
                  </div>
                  <CardHeader className="p-6 pb-2 flex-1">
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/5 px-2 py-1 rounded-md border border-primary/10">
                        {t(`category.${product.category_id}`) !== `category.${product.category_id}` ? t(`category.${product.category_id}`) : product.category_id.replace(/-/g, ' ')}
                      </p>
                    </div>
                    <CardTitle className="text-xl leading-tight font-extrabold group-hover:text-primary transition-colors line-clamp-2">{product.name}</CardTitle>
                    <div className="text-sm text-muted-foreground line-clamp-2 mt-3 leading-relaxed font-medium">
                      <LocalizedDescription product={product} />
                    </div>
                  </CardHeader>
                </Link>
                <CardFooter className="p-6 pt-4 mt-auto flex flex-col items-start gap-5">
                  <div className="w-full h-[1px] bg-border/50 mb-1"></div>
                  <div className="w-full flex items-end justify-between mt-1 mb-2">
                    <div>
                      <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Price</p>
                      <div className="font-extrabold text-3xl tracking-tight text-foreground">€{product.price.toFixed(2)}</div>
                    </div>
                    <Badge variant="outline" className="font-bold border-emerald-200 bg-emerald-50 text-emerald-700 px-3 py-1">{t("shop.in_stock")}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-700 bg-emerald-50/50 px-2 py-1.5 rounded-md w-full mb-3">
                    <Clock className="w-3.5 h-3.5 shrink-0" /> {t("product.standard_shipping")}
                  </div>
                  <Button 
                    className="w-full h-12 font-bold shadow-sm text-md" 
                    onClick={(e) => {
                      e.preventDefault();
                      addItem(product.id);
                    }}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {t("shop.add")}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
