import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://eqilo.fi';
  const productsSnap = await adminDb.collection("products").where("is_active", "==", true).get();

  let itemsXml = '';

  for (const doc of productsSnap.docs) {
    const product = doc.data();
    
    itemsXml += `
      <item>
        <g:id>${product.sku || doc.id}</g:id>
        <g:title>${encodeURIComponent(product.name)}</g:title>
        <g:description>${encodeURIComponent(product.description)}</g:description>
        <g:link>${baseUrl}/product/${doc.id}</g:link>
        ${product.image_urls?.[0] ? `<g:image_link>${product.image_urls[0]}</g:image_link>` : ''}
        <g:condition>new</g:condition>
        <g:availability>${(product.inventory_count || 0) > 0 ? 'in_stock' : 'out_of_stock'}</g:availability>
        <g:price>${product.price.toFixed(2)} EUR</g:price>
        <g:shipping>
          <g:country>FI</g:country>
          <g:service>Standard</g:service>
          <g:price>${product.price >= 200 ? '0.00' : '20.00'} EUR</g:price>
        </g:shipping>
        <g:brand>FDS Timing</g:brand>
        <g:google_product_category>Sporting Goods > Sports Equipment</g:google_product_category>
      </item>
    `;
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Eqilo.fi Product Feed</title>
    <link>${baseUrl}</link>
    <description>Modern timekeeping devices from Swiss manufacturer FDS Timing.</description>
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
