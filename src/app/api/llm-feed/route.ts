import { adminDb } from '@/lib/firebase/admin';
import { Product } from '@/lib/types/firestore';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const productsSnap = await adminDb
    .collection('products')
    .where('is_active', '==', true)
    .get();

  let markdown = `# Eqilo.fi Product Catalog\n\n`;
  markdown += `Eqilo provides modern, 100% wireless timekeeping devices from Swiss manufacturer FDS Timing, targeting agility and equestrian clubs in Finland.\n\n`;
  markdown += `## Available Products\n\n`;

  productsSnap.docs.forEach((doc) => {
    const p = doc.data() as Product;
    markdown += `### ${p.name}\n`;
    markdown += `- **SKU:** ${p.sku}\n`;
    markdown += `- **Price:** ${p.price} EUR (incl. 25.5% VAT)\n`;
    markdown += `- **Availability:** ${p.inventory_count > 0 ? 'In Stock (1-2 weeks delivery)' : 'Out of Stock'}\n`;
    markdown += `- **Weight:** ${p.weight} kg\n`;
    markdown += `- **URL:** https://eqilo.fi/product/${doc.id}\n`;
    markdown += `- **Description:** ${p.description.replace(/\n/g, ' ')}\n\n`;
  });

  markdown += `\n## Customer Service\n`;
  markdown += `For support, contact Johannes Hyrsky at +358 50 5633097.`;

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Access-Control-Allow-Origin': '*', // Allow AI agents to fetch this cross-origin
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
