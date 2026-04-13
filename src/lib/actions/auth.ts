"use server";

import { adminAuth } from "../firebase/admin";

export async function verifyUserSession(token: string) {
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return { uid: decodedToken.uid, email: decodedToken.email, phone_number: decodedToken.phone_number };
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}
