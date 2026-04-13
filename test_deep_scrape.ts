import * as cheerio from 'cheerio';

function generateProductUrlFromName(name: string) {
  // Convert "Kit Jumping" to "kit-jumping"
  // Keep in mind name might have extra parts
  let slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return `https://fdstiming.com/product/${slug}/`;
}

async function testDeepScrape(name: string) {
  const url = generateProductUrlFromName(name);
  console.log("Trying URL:", url);
  const res = await fetch(url);
  if (!res.ok) {
    console.log("Failed to fetch", res.status);
    return;
  }
  let html = await res.text();
  let $ = cheerio.load(html);

  const fullDesc = $("#tab-description").text().trim() || $(".woocommerce-Tabs-panel--description").text().trim();
  console.log("Found:", fullDesc.substring(0, 100));
}

testDeepScrape("Kit Jumping").catch(console.error);
