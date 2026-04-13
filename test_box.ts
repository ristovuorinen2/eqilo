import * as cheerio from 'cheerio';

async function testBoxAndDownloads() {
  const res = await fetch('https://fdstiming.com/product/dog-agility-full-kit/');
  const html = await res.text();
  const $ = cheerio.load(html);

  console.log("=== ALL TABS ===");
  $('.wc-tabs li a').each((i, el) => {
    console.log($(el).text().trim(), $(el).attr('href'));
  });

  console.log("=== DESCRIPTION TAB ===");
  console.log($('#tab-description').text().substring(0, 200));

  console.log("=== ADDITIONAL INFO TAB ===");
  console.log($('#tab-additional_information').text().substring(0, 200));

  // Let's look for "Box content" or similar
  console.log("=== ANY 'Box' TEXT ===");
  $('*:contains("Box content")').last().each((i, el) => {
      console.log($(el).text().substring(0, 300));
  });
  
  console.log("=== DOWNLOADS ===");
  $('a').each((i, el) => {
      const href = $(el).attr('href');
      const text = $(el).text().trim();
      if (href && (href.toLowerCase().includes('pdf') || href.toLowerCase().includes('download') || text.toLowerCase().includes('download'))) {
          console.log(text, href);
      }
  });

}

testBoxAndDownloads().catch(console.error);