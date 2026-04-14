import { getProductServer, getProductsServer } from "@/lib/actions/products-server";
import { notFound } from "next/navigation";
import ProductContent from "./ProductContent";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await getProductServer(resolvedParams.id);
  const allProducts = await getProductsServer();

  if (!product) {
    notFound();
  }

  // Get 3 random related products in the same category
  const relatedProducts = allProducts
    .filter(p => p.category_id === product.category_id && p.id !== product.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return <ProductContent 
    product={JSON.parse(JSON.stringify(product))} 
    relatedProducts={JSON.parse(JSON.stringify(relatedProducts))} 
  />;
}
