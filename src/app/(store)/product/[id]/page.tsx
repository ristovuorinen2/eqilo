import { getProductServer } from "@/lib/actions/products-server";
import { notFound } from "next/navigation";
import ProductContent from "./ProductContent";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await getProductServer(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return <ProductContent product={JSON.parse(JSON.stringify(product))} />;
}
