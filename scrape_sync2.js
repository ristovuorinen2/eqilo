const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: "new"
  });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('https://ln5.sync.com/dl/3c9d42920?sync_id=27179438230006#vhujbg66-7zv6u2yz-4szca9b8-zsandki3', { waitUntil: 'networkidle2' });

  // Wait extra time for crypto to finish and files to render
  await new Promise(r => setTimeout(r, 10000));

  const text = await page.evaluate(() => document.body.innerText);
  console.log("Body text preview:", text.substring(0, 500));

  const buttons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button, a.btn, .download')).map(b => ({ text: b.innerText, id: b.id, className: b.className }));
  });
  console.log("Action buttons:", buttons);

  await browser.close();
})();