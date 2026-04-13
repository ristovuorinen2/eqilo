"use client";

import { getProducts } from "@/lib/actions/admin";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PackageOpen, Clock, Tag, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/components/cart-provider";
import { useEffect, useState } from "react";
import { Product } from "@/lib/types/firestore";

export default function ShopPage() {
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const activeProducts = products.filter(p => {
    const isActive = p.is_active;
    const matchesCategory = selectedCategory === "all" || p.category_id === selectedCategory;
    return isActive && matchesCategory;
  });

  // Group by category to build basic filters from ALL active products
  const categories = Array.from(new Set(products.filter(p => p.is_active).map(p => p.category_id)));

  if (loading) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground animate-pulse font-medium">Loading professional equipment...</p>
      </div>
    );
  }

  return (
    <div className="container py-10 md:py-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0 space-y-8 sticky top-24">
          <div className="border border-border/50 rounded-xl p-6 bg-card/50 shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-primary">
              <Tag className="w-5 h-5" /> Categories
            </h3>
            <RadioGroup 
              defaultValue="all" 
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="all" id="all" className="border-primary/50 text-primary" />
                <Label htmlFor="all" className="cursor-pointer font-medium">All Equipment</Label>
              </div>
              {categories.map((cat) => (
                <div key={cat} className="flex items-center space-x-3">
                  <RadioGroupItem value={cat} id={cat} className="border-primary/50 text-primary" />
                  <Label htmlFor={cat} className="capitalize cursor-pointer hover:text-primary transition-colors">{cat.replace(/-/g, ' ')}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">All Equipment</h1>
              <p className="text-muted-foreground mt-2">Professional timekeeping solutions for clubs.</p>
            </div>
            <div className="mt-4 md:mt-0 text-sm font-medium bg-muted px-3 py-1 rounded-full border border-border">
              {activeProducts.length} items found
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {activeProducts.map((product) => (
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
                        <span className="text-muted-foreground text-xs font-mono bg-background/50 px-2 py-1 rounded border">SKU: {product.sku}</span>
                      </>
                    )}
                  </div>
                  <CardHeader className="p-5 pb-2 flex-1">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-primary">{product.category_id.replace(/-/g, ' ')}</p>
                    </div>
                    <CardTitle className="text-lg leading-snug font-bold group-hover:text-primary transition-colors">{product.name}</CardTitle>
                  </CardHeader>
                </Link>
                <CardFooter className="p-5 pt-0 mt-auto flex flex-col items-start gap-4">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 w-fit">
                    <Clock className="w-3.5 h-3.5" /> Standard Shipping: 1-2 Weeks
                  </div>
                  <div className="w-full flex items-center justify-between mt-1">
                    <div className="font-extrabold text-2xl tracking-tight text-foreground">€{product.price.toFixed(2)}</div>
                    <Badge variant="outline" className="font-semibold border-primary/20 bg-primary/5 text-primary">In Stock</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 w-full mt-2">
                    <Link href={`/product/${product.id}`} className="w-full">
                      <Button variant="outline" className="w-full font-semibold">Details</Button>
                    </Link>
                    <Button 
                      className="w-full font-bold" 
                      onClick={(e) => {
                        e.preventDefault();
                        addItem(product.id);
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
