import { adminDb } from "./src/lib/firebase/admin";
import * as cheerio from "cheerio";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function main() {
  if (!process.env.GEMINI_API_KEY) {
    console.error("No GEMINI_API_KEY set.");
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  console.log("Fetching tutorials page...");
  const res = await fetch("https://fdstiming.com/tutorials/");
  if (!res.ok) throw new Error("Failed to fetch tutorials page");
  const html = await res.text();
  const $ = cheerio.load(html);

  const videos: { title: string, url: string }[] = [];

  // Assuming videos might be in iframes or youtube links, and have some preceding text/titles
  // We'll just grab all iframes containing youtube or vimeo
  $("iframe").each((_, el) => {
    const src = $(el).attr("data-src") || $(el).attr("src");
    const title = $(el).attr("title") || $(el).closest('.col-inner, .video').prev('h1, h2, h3, h4, h5, p, span').text().trim() || "Tutorial Video";
    
    if (src && (src.includes("youtube.com") || src.includes("youtu.be") || src.includes("vimeo.com"))) {
      videos.push({ title: title.replace(/\n/g, ' ').trim(), url: src });
    }
  });

  // We can also check a tags linking to youtube
  $("a").each((_, el) => {
    const href = $(el).attr("href");
    const text = $(el).text().trim() || $(el).parent().text().trim() || "Tutorial Video";
    
    if (href && (href.includes("youtube.com/watch") || href.includes("youtu.be"))) {
      // Avoid duplicates
      if (!videos.find(v => v.url === href || v.url.includes(href.split('v=')[1] || href.split('youtu.be/')[1]))) {
        videos.push({ title: text.replace(/\n/g, ' ').trim(), url: href });
      }
    }
  });

  console.log(`Found ${videos.length} videos.`);
  if (videos.length === 0) {
     console.log("No videos found. Check HTML structure.");
     return;
  }

  const snapshot = await adminDb.collection("products").get();
  const products = snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name, sku: doc.data().sku }));

  console.log("Asking Gemini to map videos to products...");

  const prompt = `You are a data mapper. You are given a list of sports timing products and a list of tutorial videos.
Your job is to match each video to the most relevant product(s) based on the video title. A video can apply to multiple products if relevant (e.g. TBox video applies to TBox products).
Return ONLY a JSON array of objects with the structure: [{ "product_id": "FDS-A10023", "video_title": "MLED Assembly", "video_url": "https://youtube.com/..." }]
Do not include markdown wrappers.

Products:
${JSON.stringify(products, null, 2)}

Videos:
${JSON.stringify(videos, null, 2)}
`;

  try {
    const result = await model.generateContent([{ text: prompt }]);
    const responseText = result.response.text();
    const cleanJsonStr = responseText.replace(/```json/gi, '').replace(/```html/gi, '').replace(/```/gi, '').trim();
    const mappings = JSON.parse(cleanJsonStr);

    console.log(`Gemini suggested ${mappings.length} mappings.`);

    const batch = adminDb.batch();
    const productUpdates: Record<string, any[]> = {};

    for (const mapping of mappings) {
       if (!productUpdates[mapping.product_id]) {
         productUpdates[mapping.product_id] = [];
       }
       // Deduplicate
       if (!productUpdates[mapping.product_id].find(v => v.url === mapping.video_url)) {
           productUpdates[mapping.product_id].push({ name: mapping.video_title, url: mapping.video_url });
       }
    }

    for (const [productId, productVideos] of Object.entries(productUpdates)) {
       const docRef = adminDb.collection("products").doc(productId);
       // We'll store them in a "video_urls" field as array of objects { name, url }
       batch.update(docRef, { videos: productVideos });
       console.log(`Updating ${productId} with ${productVideos.length} videos.`);
    }

    if (Object.keys(productUpdates).length > 0) {
      await batch.commit();
      console.log("Successfully updated products with videos.");
    }
  } catch (e) {
    console.error("Error processing videos:", e);
  }
}

main().catch(console.error).finally(() => process.exit(0));
