"use server";

import { adminDb } from "../firebase/admin";
import { Product } from "../types/firestore";

export async function getProductsServer(): Promise<Product[]> {
  try {
    const snapshot = await adminDb.collection("products").where("is_active", "==", true).get();
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Product);
  } catch (error) {
    console.error("Error fetching products from server:", error);
    return [];
  }
}

export async function getProductServer(id: string): Promise<Product | null> {
  try {
    const doc = await adminDb.collection("products").doc(id).get();
    if (!doc.exists) return null;
    const data = doc.data();
    if (!data?.is_active) return null;
    return { ...data, id: doc.id } as Product;
  } catch (error) {
    console.error("Error fetching product from server:", error);
    return null;
  }
}
