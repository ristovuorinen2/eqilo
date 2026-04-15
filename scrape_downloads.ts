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

  console.log("Fetching downloads page...");
  const res = await fetch("https://fdstiming.com/download/");
  if (!res.ok) throw new Error("Failed to fetch downloads page");
  const html = await res.text();
  const $ = cheerio.load(html);

  const files: { name: string, url: string }[] = [];

  $("a").each((_, el) => {
    const href = $(el).attr("href");
    const text = $(el).text().trim() || $(el).attr("title") || "";
    
    if (href && (href.endsWith(".pdf") || href.endsWith(".zip") || href.endsWith(".exe") || href.includes("/download/"))) {
      if (text && !files.find(f => f.url === href)) {
         files.push({ name: text.replace(/\n/g, ' ').trim(), url: href });
      }
    }
  });

  console.log(`Found ${files.length} downloadable files.`);
  if (files.length === 0) return;

  const snapshot = await adminDb.collection("products").get();
  const products = snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name, sku: doc.data().sku }));

  console.log("Asking Gemini to map files to products...");

  const prompt = `You are a data mapper. You are given a list of sports timing products and a list of downloadable files (manuals, firmwares, datasheets).
Your job is to match each file to the most relevant product(s) based on the file name. A file can apply to multiple products if relevant (e.g. MLED firmware applies to MLED products).
Return ONLY a JSON array of objects with the structure: [{ "product_id": "FDS-A10023", "file_name": "MLED User Manual", "file_url": "https://fdstiming.com/..." }]
Do not include markdown wrappers.

Products:
${JSON.stringify(products, null, 2)}

Files:
${JSON.stringify(files, null, 2)}
`;

  try {
    const result = await model.generateContent([{ text: prompt }]);
    const responseText = result.response.text();
    const cleanJsonStr = responseText.replace(/```json/gi, '').replace(/```html/gi, '').replace(/```/gi, '').trim();
    
    let mappings;
    try {
        mappings = JSON.parse(cleanJsonStr);
    } catch(e) {
        console.log("Failed to parse JSON. Attempting to fix trailing commas.");
        const fixedJson = cleanJsonStr.replace(/,\s*([\]}])/g, '$1');
        mappings = JSON.parse(fixedJson);
    }

    console.log(`Gemini suggested ${mappings.length} file mappings.`);

    const batch = adminDb.batch();
    const productUpdates: Record<string, any[]> = {};

    for (const mapping of mappings) {
       if (!productUpdates[mapping.product_id]) {
         productUpdates[mapping.product_id] = [];
       }
       if (!productUpdates[mapping.product_id].find(f => f.url === mapping.file_url)) {
           productUpdates[mapping.product_id].push({ name: mapping.file_name, url: mapping.file_url });
       }
    }

    for (const [productId, productFiles] of Object.entries(productUpdates)) {
       const docRef = adminDb.collection("products").doc(productId);
       const docSnap = await docRef.get();
       const existingDownloads = docSnap.data()?.downloads || [];
       
       // Merge new downloads with existing ones, avoiding duplicates by URL
       const merged = [...existingDownloads];
       for (const newFile of productFiles) {
         if (!merged.find(e => e.url === newFile.url)) {
           merged.push(newFile);
         }
       }

       batch.update(docRef, { downloads: merged });
       console.log(`Updating ${productId} with ${merged.length} downloads (added ${productFiles.length} new).`);
    }

    if (Object.keys(productUpdates).length > 0) {
      await batch.commit();
      console.log("Successfully updated products with downloads.");
    }
  } catch (e) {
    console.error("Error processing downloads:", e);
  }
}

main().catch(console.error).finally(() => process.exit(0));
