"use server";

import { adminDb } from "../firebase/admin";
import * as cheerio from "cheerio";
import { v2 } from "@google-cloud/translate";

const translate = new v2.Translate({
  projectId: process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
});

export async function scrapeAndTranslateDescriptions() {
  try {
    const productsSnapshot = await adminDb.collection("products").get();
    const products = productsSnapshot.docs;
    let successCount = 0;

    const batch = adminDb.batch();

    for (const doc of products) {
      const data = doc.data();
      const sku = data.sku as string;
      
      if (!sku) continue;

      // Clean SKU for URL if necessary. Assuming FDS-K10011 -> k10011 or similar.
      // Usually FDS timing shop URLs are like fdstiming.com/product/kit-name/
      // We will perform a simple search query or guess the URL.
      // For simplicity in a headless script, let's search via their search endpoint if possible, 
      // or try to fetch the shop main page and find the product link by SKU.
      
      // Since we don't know the exact URL structure, a robust approach is to query their search endpoint
      const searchUrl = `https://fdstiming.com/?s=${sku}&post_type=product`;
      
      const res = await fetch(searchUrl);
      if (!res.ok) continue;

      const html = await res.text();
      const $ = cheerio.load(html);
      
      // Attempt to find the product description. 
      // WooCommerce default often uses .woocommerce-product-details__short-description or similar.
      let descriptionEN = $(".woocommerce-product-details__short-description").text().trim() 
                       || $(".product-details .description").text().trim()
                       || $('meta[property="og:description"]').attr("content")?.trim();

      if (!descriptionEN) {
        // Fallback: If search redirected to the product page
        descriptionEN = $("#tab-description").text().trim() || data.description;
      }

      if (descriptionEN && descriptionEN !== data.description) {
        // Translate to FI and SE
        let descriptionFI = descriptionEN;
        let descriptionSE = descriptionEN;

        try {
          if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
             const [fiTranslation] = await translate.translate(descriptionEN, 'fi');
             const [seTranslation] = await translate.translate(descriptionEN, 'sv');
             descriptionFI = fiTranslation;
             descriptionSE = seTranslation;
          }
        } catch (e) {
          console.error(`Translation failed for ${sku}:`, e);
        }

        batch.update(doc.ref, {
          description: descriptionEN,
          description_fi: descriptionFI,
          description_se: descriptionSE,
        });

        successCount++;
      }
    }

    if (successCount > 0) {
      await batch.commit();
    }

    return { success: true, count: successCount };
  } catch (error: any) {
    console.error("Scraping failed:", error);
    return { success: false, error: error.message };
  }
}
