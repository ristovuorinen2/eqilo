import { getProducts } from './src/lib/actions/admin';

async function test() {
  const products = await getProducts();
  console.log(`Fetched ${products.length} products`);
}

test();
