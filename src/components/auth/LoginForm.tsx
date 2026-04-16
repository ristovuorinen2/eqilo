"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase/client";
import { 
  sendSignInLinkToEmail,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult
} from "firebase/auth";
import { ShieldCheck, Mail, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/components/language-provider";

export function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [linkSent, setLinkSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [step, setStep] = useState<"input" | "otp">("input");

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const actionCodeSettings = {
        url: window.location.origin + window.location.pathname,
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      setLinkSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const handlePhoneSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      let formattedPhone = phone.trim();
      if (!formattedPhone.startsWith("+")) {
        // Default to Finnish prefix if missing (for convenience)
        formattedPhone = formattedPhone.startsWith("0") 
          ? `+358${formattedPhone.substring(1)}` 
          : `+${formattedPhone}`;
      }

      if (typeof window !== "undefined") {
        if (window.recaptchaVerifier) {
          try { window.recaptchaVerifier.clear(); } catch(e) { console.error(e) }
          // @ts-expect-error Resetting
          window.recaptchaVerifier = undefined;
        }
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container-login", {
          size: "invisible",
        });
      }
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(result);
      setStep("otp");
    } catch (err) {
      console.error("Phone Auth Error:", err);
      // Clean up the verifier if it fails so they can try again
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        // @ts-expect-error Resetting the verifier for retry
        window.recaptchaVerifier = undefined;
      }
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!confirmationResult) return;
    try {
      await confirmationResult.confirm(otp);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-background rounded-xl overflow-hidden shadow-2xl border border-border/50">
      <div className="bg-primary p-6 text-primary-foreground text-center">
         <ShieldCheck className="w-12 h-12 mx-auto mb-4 opacity-80" />
         <h2 className="text-2xl font-bold mb-2">
           {t("auth.login_title")}
         </h2>
         <p className="text-primary-foreground/80 text-sm">
           {t("auth.login_desc")}
         </p>
      </div>
      
      <div className="p-6">
        {error && <p className="text-sm text-destructive font-bold mb-4 bg-destructive/10 p-3 rounded-md border border-destructive/20">{error}</p>}
        
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="phone" className="font-bold"><Phone className="w-4 h-4 mr-2" /> {t("auth.phone")}</TabsTrigger>
            <TabsTrigger value="email" className="font-bold"><Mail className="w-4 h-4 mr-2" /> {t("auth.email")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="phone">
            {step === "input" ? (
              <form onSubmit={handlePhoneSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("auth.phone")}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+358 50 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="h-12 text-lg font-medium"
                  />
                  <p className="text-xs text-muted-foreground mt-1">{t("auth.phone_note")}</p>
                </div>
                <div id="recaptcha-container"></div>
                <Button type="submit" className="w-full h-12 text-lg font-bold shadow-md">
                  {t("auth.send_code")}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">{t("auth.sms_code")}</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="h-12 text-lg font-mono tracking-widest text-center"
                    maxLength={6}
                  />
                </div>
                <Button type="submit" className="w-full h-12 text-lg font-bold shadow-md">
                  {t("auth.verify")}
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => setStep("input")}>
                  {t("auth.back")}
                </Button>
              </form>
            )}
          </TabsContent>
          
          <TabsContent value="email">
            {linkSent ? (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <h3 className="text-lg font-bold">Check your email</h3>
                <p className="text-muted-foreground">
                  We&apos;ve sent a magic link to <strong className="break-all">{email}</strong>. Click the link in the email to sign in.
                </p>
                <Button variant="outline" className="w-full mt-4" onClick={() => setLinkSent(false)}>
                  Try another email
                </Button>
              </div>
            ) : (
              <form onSubmit={handleEmailAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t("auth.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.fi"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <Button type="submit" className="w-full h-12 text-lg font-bold shadow-md">
                  Send Magic Link
                </Button>
              </form>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
