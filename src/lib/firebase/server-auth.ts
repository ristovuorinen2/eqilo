import { cookies } from "next/headers";
import { adminAuth, adminDb } from "./admin";

export async function verifyAdmin() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
      return { isAdmin: false, error: "No session found" };
    }

    // Verify the session cookie
    const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);
    
    // Check role in Firestore
    const userDoc = await adminDb.collection("customers").doc(decodedToken.uid).get();
    
    if (!userDoc.exists || userDoc.data()?.role !== "admin") {
      return { isAdmin: false, error: "Unauthorized role" };
    }

    return { isAdmin: true, uid: decodedToken.uid };
  } catch (error) {
    console.error("verifyAdmin Error:", error);
    return { isAdmin: false, error: "Session verification failed" };
  }
}
