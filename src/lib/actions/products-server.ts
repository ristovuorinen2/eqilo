"use server";

import { unstable_cache } from 'next/cache';
import { adminDb } from "../firebase/admin";
import { Product } from "../types/firestore";

export const getProductsServer = unstable_cache(
  async (): Promise<Product[]> => {
    try {
      const snapshot = await adminDb.collection("products").where("is_active", "==", true).get();
      return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Product);
    } catch (error) {
      console.error("Error fetching products from server:", error);
      return [];
    }
  },
  ['all-products'], // Cache key
  { tags: ['products'], revalidate: 3600 } // Revalidate every hour or on-demand
);

export const getProductServer = unstable_cache(
  async (id: string): Promise<Product | null> => {
    try {
      const doc = await adminDb.collection("products").doc(id).get();
      if (!doc.exists) return null;
      const data = doc.data();
      if (!data?.is_active) return null;
      return { ...data, id: doc.id } as Product;
    } catch (error) {
      console.error(`Error fetching product ${id} from server:`, error);
      return null;
    }
  },
  ['single-product'], // Base cache key
  { tags: ['products'], revalidate: 3600 }
);
