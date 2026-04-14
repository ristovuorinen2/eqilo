import { getProductsServer } from "@/lib/actions/products-server";
import ShopContent from "./ShopContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tuotteet ja Laitteet",
  description: "Selaa Eqilon kattavaa valikoimaa FDS Timing -ajanottolaitteita, näyttötauluja, valokennoja ja oheislaitteita.",
};

export default async function ShopPage() {
  const products = await getProductsServer();

  return <ShopContent initialProducts={JSON.parse(JSON.stringify(products))} />;
}
