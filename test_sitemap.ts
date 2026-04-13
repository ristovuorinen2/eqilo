import * as cheerio from 'cheerio';

async function checkProductPage() {
  const url = 'https://fdstiming.com/product/kit-jumping/';
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  const sku = $('.sku').text().trim();
  console.log("SKU found on page:", sku);
}

checkProductPage().catch(console.error);