import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import * as path from "path";

async function main() {
  if (!process.env.GEMINI_API_KEY) {
    console.error("No GEMINI_API_KEY set.");
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const sports = [
    { slug: "equestrian", name: "Equestrian & Show Jumping" },
    { slug: "agility", name: "Dog Agility" },
    { slug: "athletics", name: "Athletics & Track" },
    { slug: "skiing", name: "Skiing & Winter Sports" },
    { slug: "motorsports", name: "Motor Sports" },
    { slug: "cycling", name: "Cycling" }
  ];

  const sportsData: any[] = [];

  for (const sport of sports) {
    console.log(`Generating SEO content for ${sport.name}...`);
    try {
      const prompt = `You are a professional copywriter and technical specialist for Eqilo.fi, a Finnish sports timing equipment retailer representing FDS Timing.
Your task is to write a highly comprehensive, SEO-optimized article (at least 700 words) about how Eqilo provides the perfect FDS Timing solutions for the sport category "${sport.name}".
Discuss the specific challenges of timing this sport, why FDS Timing's Swiss engineering, wireless photocells, and LED displays are the perfect solution, and how Eqilo provides local support and integration (like the Equipe APP or SmarterAgility).
Write the article natively in English, Finnish, and Swedish. Use clean HTML tags (<p>, <h2>, <ul>, <li>, <strong>) but NO markdown wrappers (like \`\`\`html). DO NOT use newlines inside the HTML strings, make them single-line JSON values.

Return the response strictly as a JSON object (no markdown formatting, just raw JSON) with the following structure:
{
  "slug": "${sport.slug}",
  "title_en": "Title in English",
  "title_fi": "Title in Finnish",
  "title_se": "Title in Swedish",
  "content_en": "HTML string (700+ words)",
  "content_fi": "HTML string (700+ words)",
  "content_se": "HTML string (700+ words)"
}`;

      const result = await model.generateContent([{ text: prompt }]);
      const responseText = result.response.text();
      const cleanJsonStr = responseText.replace(/```json/gi, '').replace(/```html/gi, '').replace(/```/gi, '').trim();
      
      let parsed;
      try {
        parsed = JSON.parse(cleanJsonStr);
      } catch(e) {
        parsed = JSON.parse(cleanJsonStr.replace(/,\s*([\]}])/g, '$1'));
      }

      sportsData.push(parsed);
      console.log(` ✅ Generated ${sport.name}`);
    } catch (e: any) {
      console.error(` ❌ Failed on ${sport.name}:`, e.message);
    }
  }

  const outputPath = path.join(process.cwd(), "src", "data", "sports.json");
  fs.writeFileSync(outputPath, JSON.stringify(sportsData, null, 2));
  console.log(`\nSuccessfully saved ${sportsData.length} sports categories to ${outputPath}`);
}

main().catch(console.error).finally(() => process.exit(0));
