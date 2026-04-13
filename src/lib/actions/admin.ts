"use server";

import { adminDb } from "../firebase/admin";
import * as xlsx from "xlsx";
import { Product } from "../types/firestore";

export async function importProducts(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { success: false, error: "No file provided" };
    }

    const buffer = await file.arrayBuffer();
    const workbook = xlsx.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rawData: any[][] = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    let currentCategory = "Uncategorized";
    const products: Partial<Product>[] = [];

    for (let i = 3; i < rawData.length; i++) {
      const row = rawData[i];
      if (!row || row.length === 0) continue;

      if (row[0] && typeof row[0] === 'string' && row[0].trim() !== '') {
        currentCategory = row[0].trim();
      }

      const sku = row[1];
      const descriptionEN = row[2];
      const priceStr = row[3];

      if (!sku || typeof sku !== 'string' || !sku.startsWith('FDS-')) continue;
      
      const price = parseFloat(String(priceStr).replace(',', '.'));
      if (isNaN(price)) continue;

      const name = String(descriptionEN).split(' - ')[0] || String(descriptionEN);
      const description = String(descriptionEN);

      products.push({
        id: sku.trim(),
        name: name.trim(),
        description: description.trim(),
        category_id: currentCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        price: price,
        tax_rate: 25.5,
        sku: sku.trim(),
        excel_ref_id: sku.trim(),
        inventory_count: 10,
        is_active: true,
        image_urls: [],
      });
    }

    const batch = adminDb.batch();
    const productsRef = adminDb.collection("products");
    
    products.forEach((product) => {
      const docRef = productsRef.doc(product.id as string);
      batch.set(docRef, product, { merge: true });
    });

    await batch.commit();

    return { success: true, count: products.length };
  } catch (error: any) {
    console.error("Failed to import products:", error);
    return { success: false, error: error.message || "Failed to parse file" };
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const snapshot = await adminDb.collection("products").get();
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Product);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
