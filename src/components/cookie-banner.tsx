"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./language-provider";
import { Button } from "./ui/button";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("eqilo_cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("eqilo_cookie_consent", "accepted");
    // We could set a document.cookie here if we want the server to see it immediately
    document.cookie = "eqilo_cookie_consent=accepted; max-age=31536000; path=/";
    setIsVisible(false);
    // Since GoogleTagManager reads from the server or client, 
    // reloading the page will allow layout.tsx to inject it properly.
    window.location.reload();
  };

  const handleDecline = () => {
    localStorage.setItem("eqilo_cookie_consent", "declined");
    document.cookie = "eqilo_cookie_consent=declined; max-age=31536000; path=/";
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-sm w-full z-[100] p-4">
      <div className="bg-background border shadow-2xl rounded-2xl p-5 md:p-6 flex flex-col gap-4">
        <div className="space-y-2">
          <h3 className="font-extrabold text-lg text-foreground leading-tight">
            {t("cookie.title")}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t("cookie.desc")}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 w-full">
          <Button onClick={handleDecline} variant="outline" className="w-full text-xs sm:text-sm order-2 sm:order-1 font-bold">
            {t("cookie.decline")}
          </Button>
          <Button onClick={handleAccept} className="w-full text-xs sm:text-sm order-1 sm:order-2 font-bold shadow-md">
            {t("cookie.accept")}
          </Button>
        </div>
      </div>
    </div>
  );
}
