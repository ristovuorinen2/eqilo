import { getProductsServer } from "@/lib/actions/products-server";
import ShopContent from "./ShopContent";

export default async function ShopPage() {
  const products = await getProductsServer();

  return <ShopContent initialProducts={JSON.parse(JSON.stringify(products))} />;
}
