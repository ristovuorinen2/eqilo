import { scrapeAndTranslateDescriptions } from './src/lib/actions/scraper';

async function run() {
  console.log('Starting sitemap scraper with Gemini translations...');
  const result = await scrapeAndTranslateDescriptions();
  console.log('Scraper finished:', result);
}

run().catch(console.error);