import { getProductsServer } from "@/lib/actions/products-server";
import CartContent from "./CartContent";

export default async function CartPage() {
  const products = await getProductsServer();

  return <CartContent products={JSON.parse(JSON.stringify(products))} />;
}
