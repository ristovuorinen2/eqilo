"use client";

import { useAuth } from "@/components/auth-provider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase/client";
import { doc, getDoc } from "firebase/firestore";
import { ShieldAlert, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkAdmin() {
      if (loading) return;

      if (!user) {
        setIsAdmin(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "customers", user.uid));
        if (userDoc.exists() && userDoc.data().role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (e) {
        console.error("Failed to verify admin status", e);
        setIsAdmin(false);
      }
    }

    checkAdmin();
  }, [user, loading]);

  if (loading || isAdmin === null) {
    return (
      <div className="h-full w-full flex items-center justify-center p-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center p-20 text-center">
        <div className="p-4 bg-destructive/10 rounded-full mb-4">
          <ShieldAlert className="w-12 h-12 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-muted-foreground mb-6">
          You do not have the required administrative privileges to view this page.
        </p>
        <Button onClick={() => router.push("/")}>Return to Store</Button>
      </div>
    );
  }

  return <>{children}</>;
}
