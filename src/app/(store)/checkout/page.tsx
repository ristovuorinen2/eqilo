import { getProductsServer } from "@/lib/actions/products-server";
import CheckoutContent from "./CheckoutContent";

export default async function CheckoutPage() {
  const products = await getProductsServer();

  return <CheckoutContent products={JSON.parse(JSON.stringify(products))} />;
}
