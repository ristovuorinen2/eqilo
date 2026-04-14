"use server";

import { adminDb } from "../firebase/admin";
import { CartItem } from "../types/firestore";
import { verifySession } from "./auth";

export async function syncUserCart(userId: string, items: CartItem[]) {
  try {
    const session = await verifySession();
    if (!session || session.uid !== userId) {
      throw new Error("Unauthorized: Invalid session");
    }

    const cartRef = adminDb.collection("carts").doc(userId);
    
    // Check if cart exists to preserve fields like is_public_link
    const doc = await cartRef.get();
    
    if (doc.exists) {
      await cartRef.update({
        items,
        updated_at: new Date()
      });
    } else {
      await cartRef.set({
        id: userId,
        user_id: userId,
        items,
        is_public_link: false,
        abandoned_recovery_sent: false,
        created_at: new Date(),
        updated_at: new Date()
      });
    }
    
    return { success: true };
  } catch (error: any) {
    console.error("Failed to sync cart:", error);
    return { success: false, error: error.message };
  }
}

export async function fetchUserCart(userId: string) {
  try {
    const session = await verifySession();
    if (!session || session.uid !== userId) {
      throw new Error("Unauthorized: Invalid session");
    }

    const doc = await adminDb.collection("carts").doc(userId).get();
    if (doc.exists) {
      return { success: true, items: doc.data()?.items as CartItem[] };
    }
    return { success: true, items: [] };
  } catch (error: any) {
    console.error("Failed to fetch cart:", error);
    return { success: false, error: error.message };
  }
}

// Ensure the caller is an admin
async function requireAdmin() {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");
  const userDoc = await adminDb.collection("customers").doc(session.uid).get();
  if (!userDoc.exists || userDoc.data()?.role !== "admin") {
    throw new Error("Forbidden: Admin access required");
  }
}

export async function generateShareableCartLink(cartId: string) {
  try {
    await requireAdmin();

    const cartRef = adminDb.collection("carts").doc(cartId);
    await cartRef.update({
      is_public_link: true,
      updated_at: new Date()
    });
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://eqilo.fi';
    return { success: true, url: `${baseUrl}/cart/${cartId}` };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCartItemPrice(cartId: string, productId: string, newPrice: number) {
  try {
    await requireAdmin();

    const cartRef = adminDb.collection("carts").doc(cartId);
    const doc = await cartRef.get();
    if (!doc.exists) throw new Error("Cart not found");

    const data = doc.data();
    const items = data?.items || [];
    
    const updatedItems = items.map((item: CartItem) => {
      if (item.product_id === productId) {
        return { ...item, custom_price_override: newPrice };
      }
      return item;
    });

    await cartRef.update({
      items: updatedItems,
      updated_at: new Date()
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
