"use server";

import { adminDb } from "../firebase/admin";
import * as cheerio from "cheerio";
import { v2 } from "@google-cloud/translate";

const translate = new v2.Translate({
  projectId: process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "eqilo-store",
  key: process.env.GOOGLE_TRANSLATE_API_KEY || process.env.GEMINI_API_KEY,
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

      // Extract product image URL
      let imageUrl = $(".woocommerce-product-gallery__image img").first().attr("src")
                  || $('meta[property="og:image"]').attr("content")?.trim();

      const needsTranslation = !data.description_fi || !data.description_se || data.description_fi === data.description || data.description_se === data.description;
      const needsImage = imageUrl && (!data.image_urls || data.image_urls.length === 0 || data.image_urls[0] !== imageUrl);

      if ((descriptionEN && descriptionEN !== data.description) || needsTranslation || needsImage) {
        console.log(`Updating product data for ${sku}`);
        let descriptionFI = data.description_fi;
        let descriptionSE = data.description_se;

        try {
          if (!data.description_fi || data.description_fi === data.description) {
             const fiRes: any = await translate.translate(descriptionEN || "", 'fi');
             descriptionFI = fiRes[0];
          }
          if (!data.description_se || data.description_se === data.description) {
             const seRes: any = await translate.translate(descriptionEN || "", 'sv');
             descriptionSE = seRes[0];
          }
          console.log(`Translated ${sku}`);
        } catch (e) {
          console.error(`Translation failed for ${sku}:`, e);
        }

        const updateData: any = {
          description: descriptionEN,
          description_fi: descriptionFI,
          description_se: descriptionSE,
        };

        if (imageUrl) {
           updateData.image_urls = [imageUrl];
        }

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
