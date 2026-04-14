"use server";

import { adminAuth } from "../firebase/admin";
import { cookies } from "next/headers";

/**
 * Validates a Firebase ID Token and sets it securely in an HttpOnly cookie.
 */
export async function createSession(idToken: string) {
  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    
    // Cookie expires in 7 days to match a typical session, though ID tokens expire in 1 hour.
    // For a robust system, you'd use Firebase Session Cookies, but for this scale, 
    // keeping the ID token refreshed by the client and synced via this action works.
    const expiresIn = 60 * 60 * 24 * 7 * 1000; 
    
    const cookieStore = await cookies();
    cookieStore.set("idToken", idToken, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return { success: true };
  } catch (error) {
    console.error("Session creation failed:", error);
    return { success: false };
  }
}

/**
 * Removes the secure session cookie.
 */
export async function removeSession() {
  const cookieStore = await cookies();
  cookieStore.delete("idToken");
}

/**
 * Verifies the current session securely from the HttpOnly cookie.
 */
export async function verifySession() {
  const cookieStore = await cookies();
  const idToken = cookieStore.get("idToken")?.value;

  if (!idToken) return null;

  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    return { 
      uid: decodedToken.uid, 
      email: decodedToken.email, 
      phone_number: decodedToken.phone_number 
    };
  } catch (error) {
    return null;
  }
}
