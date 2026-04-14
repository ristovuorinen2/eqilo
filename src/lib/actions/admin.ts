"use server";
import { adminDb, adminAuth } from "../firebase/admin";
import * as xlsx from "xlsx";
import { Product } from "../types/firestore";
import { cookies } from "next/headers";

async function checkAdmin() {
  try {
    const cookieStore = await cookies();
    const idToken = cookieStore.get("idToken")?.value;

    if (!idToken) return false;

    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const userDoc = await adminDb.collection("customers").doc(decodedToken.uid).get();

    return userDoc.exists && userDoc.data()?.role === "admin";
  } catch (error) {
    console.error("Auth Check Failed:", error);
    return false;
  }
}

export async function importProducts(formData: FormData) {
  try {
    // 1. Authorization Check
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return { success: false, error: "Access Denied: Administrative privileges required." };
    }

    const file = formData.get("file") as File;
...
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

    const startIdx = rawData.findIndex(r => r[1] && String(r[1]).startsWith('FDS-'));
    const safeStartIdx = startIdx !== -1 ? startIdx : 3;

    for (let i = safeStartIdx; i < rawData.length; i++) {
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
    // Basic auth check can be added here if catalog should be private
    // For Eqilo, the catalog is public but the admin view uses this for management.
    // We'll leave it public for the storefront but could restrict it if needed.
    const snapshot = await adminDb.collection("products").get();
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Product);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
