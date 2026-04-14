import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "../firebase/client";
import { Product } from "../types/firestore";

export async function getPublicProducts(): Promise<Product[]> {
  try {
    const q = query(collection(db, "products"), where("is_active", "==", true));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Product);
  } catch (error) {
    console.error("Error fetching public products:", error);
    return [];
  }
}

export async function getPublicProduct(id: string): Promise<Product | null> {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    const data = docSnap.data();
    if (!data.is_active) return null;
    return { ...data, id: docSnap.id } as Product;
  } catch (error) {
    console.error("Error fetching public product:", error);
    return null;
  }
}
