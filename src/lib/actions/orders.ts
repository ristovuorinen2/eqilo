"use server";

import { adminDb } from "../firebase/admin";
import { Order } from "../types/firestore";
import { verifySession } from "./auth";

export async function getUserOrders(): Promise<Order[]> {
  try {
    const session = await verifySession();
    if (!session) return [];

    const snapshot = await adminDb.collection("orders")
      .where("user_id", "==", session.uid)
      .orderBy("created_at", "desc")
      .get();

    return snapshot.docs.map(doc => ({ 
      ...doc.data(), 
      id: doc.id,
      created_at: doc.data().created_at.toDate() // Convert Firestore Timestamp
    }) as Order);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
}

export async function getOrderById(id: string): Promise<Order | null> {
  try {
    const session = await verifySession();
    if (!session) return null;

    const doc = await adminDb.collection("orders").doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data() as Order;
    
    // Security check: only the owner or an admin can view the order
    const userDoc = await adminDb.collection("customers").doc(session.uid).get();
    const isAdmin = userDoc.exists && userDoc.data()?.role === "admin";
    
    if (data.user_id !== session.uid && !isAdmin) {
      throw new Error("Unauthorized");
    }

    return { 
      ...data, 
      id: doc.id,
      created_at: (data.created_at as any).toDate()
    } as Order;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
}
