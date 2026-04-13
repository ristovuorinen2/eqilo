import { adminDb } from "@/lib/firebase/admin";
import { Category, Product } from "@/lib/types/firestore";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

async function getCategoryData(slug: string) {
  const [categoryDoc, productsSnap] = await Promise.all([
    adminDb.collection("categories").where("slug", "==", slug).limit(1).get(),
    adminDb.collection("products").where("category_id", "==", slug).where("is_active", "==", true).get()
  ]);

  const category = categoryDoc.empty ? null : { ...categoryDoc.docs[0].data(), id: categoryDoc.docs[0].id } as Category;
  const products = productsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Product);

  return { category, products };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { category, products } = await getCategoryData(resolvedParams.slug);

  if (!category && products.length === 0) {
    notFound();
  }

  const title = category?.name || resolvedParams.slug.replace(/-/g, ' ');

  return (
    <div className="container py-10 md:py-16">
      
      <div className="mb-10 space-y-4 max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight capitalize">{title}</h1>
        {category?.seo_text ? (
          <p className="text-muted-foreground text-lg leading-relaxed">{category.seo_text}</p>
        ) : (
          <p className="text-muted-foreground text-lg leading-relaxed">
            Browse our selection of {title.toLowerCase()} from FDS Timing. Designed for professional sports, agility, and equestrian events in Finland.
          </p>
        )}
      </div>

      <div className="flex items-center justify-between mb-6">
        <span className="text-muted-foreground font-medium">{products.length} products found</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col overflow-hidden transition-all hover:shadow-md">
            <Link href={`/product/${product.id}`} className="flex-1">
              <div className="aspect-square bg-muted/20 flex items-center justify-center p-6 relative">
                <span className="text-muted-foreground text-sm font-medium">Image: {product.sku}</span>
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg leading-tight line-clamp-2">{product.name}</CardTitle>
                <p className="text-sm text-muted-foreground capitalize mt-1">{product.category_id.replace(/-/g, ' ')}</p>
              </CardHeader>
            </Link>
            <CardFooter className="p-4 pt-0 mt-auto flex flex-col items-start gap-4">
              <div className="font-bold text-xl">€{product.price.toFixed(2)}</div>
              <Button className="w-full">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
    </div>
  );
}
