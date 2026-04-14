"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onIdTokenChanged, User, signInAnonymously } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { createSession, removeSession } from "@/lib/actions/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (!user) {
        // If no user is logged in (even anonymously), trigger anonymous sign in
        try {
          await signInAnonymously(auth);
          return; // Let the next onIdTokenChanged handle the new user
        } catch (e) {
          console.error("Anonymous sign-in failed:", e);
        }
      }

      setUser(user);
      
      if (user) {
        try {
          const token = await user.getIdToken();
          await createSession(token);
        } catch (e) {
          console.error("Failed to sync session cookie:", e);
        }
      } else {
        await removeSession();
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
