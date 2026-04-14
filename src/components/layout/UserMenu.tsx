"use client";

import React, { useState, useEffect } from "react";
import { User, LogOut, Settings, LayoutDashboard, Mail, Phone, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { auth } from "@/lib/firebase/client";
import { 
  signOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult
} from "firebase/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useLanguage } from "@/components/language-provider";

export function UserMenu() {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [step, setStep] = useState<"input" | "otp">("input");

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setIsLoginOpen(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handlePhoneSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (typeof window !== "undefined" && !window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
        });
      }
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      setStep("otp");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (confirmationResult) {
        await confirmationResult.confirm(otp);
        setIsLoginOpen(false);
      }
    } catch (err: any) {
      setError("Invalid code. Please try again.");
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  if (loading) return <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />;

  if (!user) {
    return (
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/5 hover:text-primary h-9 w-9">
            <User className="h-5 w-5" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div id="recaptcha-container"></div>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{isRegister ? t("auth.register") : t("auth.login")}</DialogTitle>
            <DialogDescription className="text-base">
              {isRegister 
                ? "Join Eqilo.fi to manage your professional equipment." 
                : "Sign in to access your orders and saved carts."}
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="email" className="w-full mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> {t("auth.email")}
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> {t("auth.phone")}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="email">
              <form onSubmit={handleEmailAuth} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t("auth.email")}</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.fi" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{t("auth.password")}</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-sm text-destructive font-medium bg-destructive/10 p-2 rounded">{error}</p>}
                <Button type="submit" className="w-full font-bold h-11">
                  {isRegister ? t("auth.register") : t("auth.login")}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="phone">
              {step === "input" ? (
                <form onSubmit={handlePhoneSignIn} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("auth.phone")}</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+358 40 123 4567" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">We'll send you a secure login code via SMS.</p>
                  </div>
                  {error && <p className="text-sm text-destructive font-medium bg-destructive/10 p-2 rounded">{error}</p>}
                  <Button type="submit" className="w-full font-bold h-11">
                    {t("auth.send_code")}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Verification Code</Label>
                    <Input 
                      id="otp" 
                      type="text" 
                      placeholder="123456" 
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>
                  {error && <p className="text-sm text-destructive font-medium bg-destructive/10 p-2 rounded">{error}</p>}
                  <Button type="submit" className="w-full font-bold h-11">
                    {t("auth.verify")}
                  </Button>
                  <button 
                    type="button" 
                    onClick={() => setStep("input")}
                    className="text-sm text-muted-foreground hover:text-primary w-full text-center"
                  >
                    Back to phone number
                  </button>
                </form>
              )}
            </TabsContent>
          </Tabs>

          <div className="text-center mt-6 pt-6 border-t">
            <button 
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError("");
              }}
              className="text-sm font-medium text-primary hover:underline"
            >
              {isRegister ? "Already have an account? Sign in" : "Don't have an account? Create one"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative h-9 w-9 rounded-full border border-primary/10 hover:bg-primary/5 transition-colors flex items-center justify-center">
          <div className="flex items-center justify-center w-full h-full bg-primary/10 text-primary rounded-full font-extrabold text-xs">
            {user.email?.charAt(0).toUpperCase() || user.phoneNumber?.slice(-2) || <User className="h-4 w-4" />}
          </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-2 shadow-lg border border-primary/10" align="end">
        <DropdownMenuLabel className="font-normal p-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-bold leading-none text-foreground flex items-center gap-2">
              {t("nav.profile")} <ShieldCheck className="w-3 h-3 text-primary" />
            </p>
            <p className="text-xs leading-none text-muted-foreground truncate">
              {user.email || user.phoneNumber}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="opacity-50" />
        <DropdownMenuItem className="p-0 focus:bg-primary/5">
          <Link href="/admin" className="flex items-center w-full font-medium p-2 cursor-pointer">
            <LayoutDashboard className="mr-3 h-4 w-4 text-muted-foreground" />
            <span>{t("nav.admin")}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0 focus:bg-primary/5">
          <Link href="/orders" className="flex items-center w-full font-medium p-2 cursor-pointer">
            <Settings className="mr-3 h-4 w-4 text-muted-foreground" />
            <span>{t("nav.my_orders")}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="opacity-50" />
        <DropdownMenuItem onClick={handleSignOut} className="p-2 text-destructive focus:text-destructive focus:bg-destructive/5 cursor-pointer font-bold">
          <LogOut className="mr-3 h-4 w-4" />
          <span>{t("nav.logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}
