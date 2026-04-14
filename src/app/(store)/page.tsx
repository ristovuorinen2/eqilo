import { getProductsServer } from "@/lib/actions/products-server";
import HomeContent from "./HomeContent";

export default async function HomePage() {
  const all = await getProductsServer();
  const featuredProducts = all
    .filter(p => p.image_urls && p.image_urls.length > 0)
    .slice(0, 6);

  return <HomeContent featuredProducts={JSON.parse(JSON.stringify(featuredProducts))} />;
}
