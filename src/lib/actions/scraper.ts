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

    let batch = adminDb.batch();
    let opCount = 0;

    for (const doc of products) {
      const data = doc.data();
      const sku = data.sku as string;
      
      if (!sku) continue;

      const searchUrl = `https://fdstiming.com/?s=${sku}&post_type=product`;
      
      const res = await fetch(searchUrl);
      if (!res.ok) continue;

      const html = await res.text();
      const $ = cheerio.load(html);
      
      let descriptionEN = $(".woocommerce-product-details__short-description").text().trim() 
                       || $(".product-details .description").text().trim()
                       || $('meta[property="og:description"]').attr("content")?.trim();

      if (!descriptionEN) {
        descriptionEN = $("#tab-description").text().trim() || data.description;
      }

      if (descriptionEN && descriptionEN !== data.description) {
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
