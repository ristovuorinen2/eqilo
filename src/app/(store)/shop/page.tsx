import { getProducts } from "@/lib/actions/admin";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await getProducts();
  const activeProducts = products.filter(p => p.is_active);

  // Group by category to build basic filters
  const categories = Array.from(new Set(activeProducts.map(p => p.category_id)));

  return (
    <div className="container py-10 md:py-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">All Products</Label>
              </div>
              {categories.map((cat) => (
                <div key={cat} className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value={cat} id={cat} />
                  <Label htmlFor={cat} className="capitalize">{cat.replace(/-/g, ' ')}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold tracking-tight">All Equipment</h1>
            <span className="text-muted-foreground">{activeProducts.length} items</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeProducts.map((product) => (
              <Card key={product.id} className="flex flex-col overflow-hidden transition-all hover:shadow-md">
                <Link href={`/product/${product.id}`} className="flex-1">
                  <div className="aspect-square bg-muted/20 flex items-center justify-center p-6 relative">
                    {/* Placeholder for image */}
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

      </div>
    </div>
  );
}
