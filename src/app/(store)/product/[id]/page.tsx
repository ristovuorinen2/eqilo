import { adminDb } from "@/lib/firebase/admin";
import { Product } from "@/lib/types/firestore";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Truck, ShieldCheck, ChevronRight } from "lucide-react";
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
      <nav className="flex items-center text-sm text-muted-foreground mb-8">
        <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
        <ChevronRight className="w-4 h-4 mx-1" />
        <span className="capitalize">{product.category_id.replace(/-/g, ' ')}</span>
        <ChevronRight className="w-4 h-4 mx-1" />
        <span className="text-foreground truncate max-w-[200px] sm:max-w-none">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
        {/* Images Column */}
        <div className="space-y-4">
          <div className="aspect-square bg-muted/20 rounded-xl flex items-center justify-center border">
             <span className="text-muted-foreground font-medium">Main Product Image</span>
          </div>
          {/* Carousel placeholder for thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-20 h-20 shrink-0 bg-muted/20 rounded-md border flex items-center justify-center">
                <span className="text-xs text-muted-foreground">{i}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Details Column */}
        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">{product.name}</h1>
          <p className="text-muted-foreground mb-6">SKU: {product.sku}</p>
          
          <div className="text-3xl font-bold mb-6">€{product.price.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">incl. {product.tax_rate}% VAT</span></div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8 flex items-start gap-4">
            <Truck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-primary">Standard Shipping: 1-2 Weeks</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Products are shipped directly to Finland. Free shipping on orders over 200 €.
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <Button size="lg" className="w-full text-lg h-14">
              <ShoppingCart className="mr-2 w-5 h-5" />
              Add to Cart
            </Button>
          </div>

          <Accordion className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger className="text-lg font-medium">Description</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed prose prose-sm dark:prose-invert">
                {product.description_fi ? (
                  <>
                    <p><strong>FI:</strong> {product.description_fi}</p>
                    <p className="mt-4"><strong>EN:</strong> {product.description}</p>
                  </>
                ) : (
                  <p>{product.description}</p>
                )}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="specs">
              <AccordionTrigger className="text-lg font-medium">Specifications</AccordionTrigger>
              <AccordionContent className="space-y-2 text-muted-foreground">
                <div className="flex justify-between py-1 border-b">
                  <span className="font-medium">Weight</span>
                  <span>{product.weight ? `${product.weight} kg` : "N/A"}</span>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span className="font-medium">Category</span>
                  <span className="capitalize">{product.category_id.replace(/-/g, ' ')}</span>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="guarantee">
              <AccordionTrigger className="text-lg font-medium">Quality Guarantee</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                  <p>
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
