"use server";

import { adminDb, adminStorage } from "../firebase/admin";
import * as cheerio from "cheerio";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function translateText(text: string, lang: 'fi' | 'sv') {
  if (!process.env.GEMINI_API_KEY) return text;
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-3.1-pro-preview" });
    const language = lang === 'fi' ? "Finnish" : "Swedish";
    
    // Improved prompt for technical accuracy
    const prompt = `You are a professional technical translator for Eqilo.fi, a Finnish timing systems expert. 
    Translate the following FDS Timing product technical description into natural, professional ${language}. 
    Ensure all technical specifications (like ranges, frequencies, and kit components) are accurately translated but kept in their standard units.
    Do not add any conversational text. ONLY provide the translated content.
    
    Product Description to Translate:
    ${text}`;

    const result = await model.generateContent(prompt);
    const translation = result.response.text().trim();
    
    // Simple sanity check: if translation is too short compared to original, something might have failed
    if (translation.length < text.length * 0.3 && text.length > 100) {
      console.warn("Translation seems suspiciously short, returning original.");
      return text;
    }

    return translation;
  } catch (e) {
    console.error(`Gemini translation error for ${lang}:`, e);
    return text;
  }
}

async function uploadFileFromUrl(url: string, sku: string, folder: "images" | "downloads"): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buffer = Buffer.from(await res.arrayBuffer());
    const baseName = path.basename(new URL(url).pathname);
    const fileName = `products/${sku}/${folder}/${baseName}`;
    const bucket = adminStorage.bucket();
    const file = bucket.file(fileName);
    
    await file.save(buffer, {
      metadata: { contentType: res.headers.get("content-type") || "application/octet-stream" },
      public: true,
    });

    return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
  } catch (e) {
    console.error(`Failed to upload ${folder} for ${sku}:`, e);
    return null;
  }
}

async function uploadImageFromUrl(url: string, sku: string): Promise<string | null> {
  return uploadFileFromUrl(url, sku, "images");
}

import path from "path";

export async function scrapeAndTranslateDescriptions() {
  try {
    const sitemapRes = await fetch("https://fdstiming.com/product-sitemap.xml");
    if (!sitemapRes.ok) throw new Error("Could not fetch sitemap");
    const sitemapXml = await sitemapRes.text();
    const sitemap$ = cheerio.load(sitemapXml, { xmlMode: true });
    
    const urls = sitemap$("url loc").map((i, el) => sitemap$(el).text()).get();
    console.log(`Found ${urls.length} product URLs in sitemap`);

    const scrapedData: Record<string, { desc: string, img: string, boxContents: string, downloads: {name: string, url: string}[] }> = {};

    // Scrape all product pages from sitemap concurrently in small batches
    const BATCH_SIZE = 10;
    for (let i = 0; i < urls.length; i += BATCH_SIZE) {
      const batchUrls = urls.slice(i, i + BATCH_SIZE);
      await Promise.all(batchUrls.map(async (url) => {
        try {
          const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
          if (!res.ok) return;
          const html = await res.text();
          const $ = cheerio.load(html);

          const pageSku = $(".sku").text().trim();
          if (!pageSku || !pageSku.startsWith("FDS-")) return;

          const shortDesc = $(".woocommerce-product-details__short-description").text().trim() 
                         || $(".product-details .description").text().trim()
                         || $('meta[property="og:description"]').attr("content")?.trim() || "";

          const fullDesc = $("#tab-description").text().trim() || $(".woocommerce-Tabs-panel--description").text().trim() || "";
          const specs = $("#tab-additional_information").text().trim() || $(".shop_attributes").text().trim() || "";
          
          let descriptionEN = fullDesc || shortDesc;
          if (specs) {
            descriptionEN += "\n\nSpecifications:\n" + specs.replace(/\n\s*\n/g, '\n').trim();
          }

          let imageUrl = $(".woocommerce-product-gallery__image img").first().attr("src")
                      || $('meta[property="og:image"]').attr("content")?.trim() || "";

          // Extract Box Contents
          const boxContents = $("#tab-box-contents").text().trim() || "";

          // Extract Downloads
          const downloads: {name: string, url: string}[] = [];
          $("#tab-downloads a").each((_, el) => {
            const href = $(el).attr("href");
            const text = $(el).text().trim();
            if (href && text) {
              downloads.push({ name: text, url: href });
            }
          });

          scrapedData[pageSku] = { desc: descriptionEN.trim(), img: imageUrl, boxContents, downloads };
        } catch (e) {
          console.error(`Failed to scrape ${url}`);
        }
      }));
      console.log(`Scraped batch ${i / BATCH_SIZE + 1} / ${Math.ceil(urls.length / BATCH_SIZE)}`);
    }

    const productsSnapshot = await adminDb.collection("products").get();
    const products = productsSnapshot.docs;
    let successCount = 0;

    let batch = adminDb.batch();
    let opCount = 0;

    for (const doc of products) {
      const data = doc.data();
      const sku = data.sku as string;
      if (!sku) continue;

      const sData = scrapedData[sku];
      let descriptionEN = sData?.desc || data.description;
      let imageUrl = sData?.img || (data.image_urls && data.image_urls[0]) || null;
      let boxContents = sData?.boxContents || data.box_contents || "";
      let downloads = sData?.downloads || data.downloads || [];

      // Check if translation is missing or needs updating (if we scraped a new English description)
      const needsBox = boxContents && data.box_contents !== boxContents;
      const needsDownloads = downloads.length > 0 && JSON.stringify(data.downloads) !== JSON.stringify(downloads);
      const needsTranslation = !data.description_fi || !data.description_se || data.description_fi === data.description || data.description_se === data.description || (data.description.length > 200 && (data.description_fi?.length || 0) < 100);
      const needsImage = imageUrl && (!data.image_urls || data.image_urls.length === 0 || data.image_urls[0].includes("fdstiming.com"));
      const needsDownloadsMigration = downloads.some(d => d.url.includes("fdstiming.com"));

      if ((sData && sData.desc !== data.description) || needsTranslation || needsImage || needsBox || needsDownloads || needsDownloadsMigration) {
        console.log(`Updating product data for ${sku}...`);
        
        let descriptionFI = data.description_fi;
        let descriptionSE = data.description_se;

        // Run Gemini translation only if we haven't successfully translated it before, 
        // or if the technical description needs to be re-translated.
        if (process.env.GEMINI_API_KEY && descriptionEN && descriptionEN.length > 0 && needsTranslation) {
           descriptionFI = await translateText(descriptionEN, 'fi');
           console.log(`  -> Gemini translated ${sku} to FI`);
        }
        
        if (process.env.GEMINI_API_KEY && descriptionEN && descriptionEN.length > 0 && needsTranslation) {
           descriptionSE = await translateText(descriptionEN, 'sv');
           console.log(`  -> Gemini translated ${sku} to SE`);
        }

        let finalImageUrls = data.image_urls || [];
        if (imageUrl && imageUrl.includes("fdstiming.com")) {
           console.log(`  -> Downloading image for ${sku} to Firebase Storage...`);
           const storageUrl = await uploadImageFromUrl(imageUrl, sku);
           if (storageUrl) {
             finalImageUrls = [storageUrl];
           }
        }

        let finalDownloads = data.downloads || [];
        if (downloads.length > 0) {
           const internalDownloads: { name: string; url: string }[] = [];
           for (const d of downloads) {
             if (d.url.includes("fdstiming.com")) {
               console.log(`  -> Downloading file ${d.name} for ${sku}...`);
               const internalUrl = await uploadFileFromUrl(d.url, sku, "downloads");
               if (internalUrl) {
                 internalDownloads.push({ name: d.name, url: internalUrl });
               } else {
                 internalDownloads.push(d);
               }
             } else {
               internalDownloads.push(d);
             }
           }
           finalDownloads = internalDownloads;
        }

        const updateData: any = {
          description: descriptionEN,
          description_fi: descriptionFI || descriptionEN,
          description_se: descriptionSE || descriptionEN,
          image_urls: finalImageUrls,
          downloads: finalDownloads,
        };

        if (boxContents) updateData.box_contents = boxContents;

        batch.update(doc.ref, updateData);

        successCount++;
        if (++opCount === 500) {
          await batch.commit();
          batch = adminDb.batch();
          opCount = 0;
        }
      }
    }

    if (opCount > 0) {
      await batch.commit();
    }
    return { success: true, count: successCount };
  } catch (error: any) {
    console.error("Scraping failed:", error);
    return { success: false, error: error.message };
  }
}
