const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: "new"
  });
  const page = await browser.newPage();
  
  console.log("Navigating to Sync.com...");
  await page.goto('https://ln5.sync.com/dl/3c9d42920?sync_id=27179438230006#vhujbg66-7zv6u2yz-4szca9b8-zsandki3', { waitUntil: 'networkidle2' });

  console.log("Waiting for file list to render...");
  await new Promise(r => setTimeout(r, 5000));

  const files = await page.evaluate(() => {
     const items = Array.from(document.querySelectorAll('.file-row, .item, tr, .filename'));
     return items.map(item => item.innerText).filter(text => text.includes('.jpg') || text.includes('.png'));
  });
  
  console.log("Files found on page:", files);

  // If it's a gallery, let's look for img src
  const images = await page.evaluate(() => {
     return Array.from(document.querySelectorAll('img')).map(img => img.src);
  });
  
  console.log("Images found:", images);

  await browser.close();
})();