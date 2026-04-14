"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onIdTokenChanged, User, signInAnonymously, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
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
    // Handle Magic Link sign-in
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again.
        email = window.prompt('Please provide your email for confirmation');
      }
      if (email) {
        signInWithEmailLink(auth, email, window.location.href)
          .then(() => {
            window.localStorage.removeItem('emailForSignIn');
            window.history.replaceState(null, '', window.location.pathname);
          })
          .catch((err) => {
            console.error("Error signing in with email link", err);
          });
      }
    }

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
