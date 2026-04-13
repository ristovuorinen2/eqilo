import { adminDb } from "@/lib/firebase/admin";
import { Product } from "@/lib/types/firestore";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Truck, ShieldCheck, ChevronRight, PackageOpen, ImageIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getProduct(id: string): Promise<Product | null> {
  const doc = await adminDb.collection("products").doc(id).get();
  if (!doc.exists) return null;
  return { ...doc.data(), id: doc.id } as Product;
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

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
          <div className="aspect-square bg-muted/30 rounded-2xl flex flex-col items-center justify-center border border-border/50 shadow-sm relative overflow-hidden">
             <PackageOpen className="w-24 h-24 text-primary/20 mb-4" />
             <span className="text-muted-foreground font-medium text-sm">Product Image Pending</span>
             <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-mono border">SKU: {product.sku}</div>
          </div>
          {/* Carousel placeholder for thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-20 h-20 shrink-0 bg-muted/20 rounded-xl border border-border/50 flex items-center justify-center hover:border-primary/50 cursor-pointer transition-colors">
                <ImageIcon className="w-6 h-6 text-muted-foreground/50" />
              </div>
            ))}
          </div>
        </div>

        {/* Details Column */}
        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-foreground">{product.name}</h1>
          <p className="text-muted-foreground mb-6 font-mono text-sm bg-muted/50 w-fit px-2 py-1 rounded">SKU: {product.sku}</p>
          
          <div className="text-4xl font-extrabold mb-8 tracking-tight">€{product.price.toFixed(2)} <span className="text-sm font-medium text-muted-foreground ml-2">incl. {product.tax_rate}% VAT</span></div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8 flex items-start gap-4 shadow-sm">
            <Truck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-emerald-800">Standard Shipping: 1-2 Weeks</h4>
              <p className="text-sm text-emerald-700/80 mt-1 font-medium">
                Products are shipped directly to Finland. Free shipping on orders over 200 €.
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-10">
            <Button size="lg" className="w-full text-lg h-14 font-bold shadow-md hover:shadow-lg transition-all">
              <ShoppingCart className="mr-2 w-5 h-5" />
              Add to Cart
            </Button>
          </div>

          <Accordion defaultValue="description" className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger className="text-lg font-bold">Description</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed prose prose-sm dark:prose-invert">
                {product.description_fi ? (
                  <div className="space-y-4">
                    <p className="border-l-2 border-primary/20 pl-4">{product.description_fi}</p>
                    <p className="text-sm opacity-80">{product.description}</p>
                  </div>
                ) : (
                  <p>{product.description}</p>
                )}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="specs">
              <AccordionTrigger className="text-lg font-bold">Specifications</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <div className="flex justify-between py-3 border-b border-border/50">
                  <span className="font-medium text-foreground">Weight</span>
                  <span>{product.weight ? `${product.weight} kg` : "N/A"}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border/50">
                  <span className="font-medium text-foreground">Category</span>
                  <span className="capitalize">{product.category_id.replace(/-/g, ' ')}</span>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="guarantee">
              <AccordionTrigger className="text-lg font-bold">Quality Guarantee</AccordionTrigger>
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
