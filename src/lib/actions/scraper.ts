"use server";

import { adminDb } from "../firebase/admin";
import * as cheerio from "cheerio";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function translateText(text: string, lang: 'fi' | 'sv') {
  if (!process.env.GEMINI_API_KEY) return text;
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const language = lang === 'fi' ? "Finnish" : "Swedish";
    const prompt = `Translate the following product description into professional ${language}. Keep formatting and technical terms intact where appropriate. Do not add any conversational filler. Only output the translation:\n\n${text}`;
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (e) {
    console.error(`Gemini translation error for ${lang}:`, e);
    return text;
  }
}

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
      const needsTranslation = !data.description_fi || !data.description_se || data.description_fi === data.description || data.description_se === data.description;
      const needsImage = imageUrl && (!data.image_urls || data.image_urls.length === 0 || data.image_urls[0] !== imageUrl);
      const needsBox = boxContents && data.box_contents !== boxContents;
      const needsDownloads = downloads.length > 0 && JSON.stringify(data.downloads) !== JSON.stringify(downloads);

      if ((sData && sData.desc !== data.description) || needsTranslation || needsImage || needsBox || needsDownloads) {
        console.log(`Updating product data for ${sku}...`);
        
        let descriptionFI = data.description_fi;
        let descriptionSE = data.description_se;

        // Run Gemini translation only if we haven't successfully translated it before, 
        // or if the English description fundamentally changed.
        if (process.env.GEMINI_API_KEY && descriptionEN && descriptionEN.length > 0 && (!descriptionFI || descriptionFI === data.description || (sData && sData.desc !== data.description))) {
           descriptionFI = await translateText(descriptionEN, 'fi');
           console.log(`  -> Gemini translated ${sku} to FI`);
        }
        
        if (process.env.GEMINI_API_KEY && descriptionEN && descriptionEN.length > 0 && (!descriptionSE || descriptionSE === data.description || (sData && sData.desc !== data.description))) {
           descriptionSE = await translateText(descriptionEN, 'sv');
           console.log(`  -> Gemini translated ${sku} to SE`);
        }

        const updateData: any = {
          description: descriptionEN,
          description_fi: descriptionFI || descriptionEN,
          description_se: descriptionSE || descriptionEN,
        };

        if (imageUrl) updateData.image_urls = [imageUrl];
        if (boxContents) updateData.box_contents = boxContents;
        if (downloads.length > 0) updateData.downloads = downloads;

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
