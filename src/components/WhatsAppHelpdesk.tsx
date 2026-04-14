"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { ReactQRCode } from "@lglab/react-qr-code";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useLanguage } from "./language-provider";

// In a real implementation, this would be fetched from the global settings collection
const DEFAULT_WHATSAPP_NUMBER = "+358505633097"; 

export function WhatsAppHelpdesk() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const { t, lang } = useLanguage();

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const whatsappUrl = `https://wa.me/${DEFAULT_WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}`;

  const handleInteraction = () => {
    if (isMobile) {
      window.open(whatsappUrl, "_blank");
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {isOpen && !isMobile && (
        <Card className="shadow-2xl border-border/50 bg-background w-[320px] animate-in slide-in-from-bottom-5 overflow-hidden rounded-2xl flex flex-col">
          {/* Chat Header */}
          <div className="bg-[#25D366] p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-md leading-tight">
                  Eqilo Helpdesk
                </h3>
                <p className="text-xs text-white/80 font-medium flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  {lang === "FI" ? "Vastaamme tyypillisesti nopeasti" : lang === "SE" ? "Vi svarar oftast snabbt" : "Typically replies quickly"}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 rounded-full w-8 h-8">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Chat Content */}
          <div className="p-6 bg-slate-50/50 flex flex-col items-center border-b border-border/50">
            <div className="bg-white p-4 text-sm text-slate-700 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 self-start mb-6 max-w-[85%]">
              {lang === "FI" ? "Hei! Miten voimme auttaa sinua tänään?" : lang === "SE" ? "Hej! Hur kan vi hjälpa dig idag?" : "Hi there! How can we help you today?"}
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
              <ReactQRCode 
                value={whatsappUrl} 
                size={160}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center px-4 font-medium leading-relaxed">
              {lang === "FI" ? "Avaa WhatsApp skannaamalla koodi puhelimellasi." : lang === "SE" ? "Skanna koden med din telefon för att öppna WhatsApp." : "Scan with your phone to open WhatsApp."}
            </p>
          </div>

          {/* Chat Footer */}
          <div className="p-4 bg-background">
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noreferrer"
              className="w-full"
            >
              <Button className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-bold shadow-sm group">
                <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                {t("whatsapp.web_link") || (lang === "FI" ? "Avaa WhatsApp Web" : lang === "SE" ? "Öppna WhatsApp Web" : "Open WhatsApp Web")}
              </Button>
            </a>
          </div>
        </Card>
      )}

      <button
        onClick={handleInteraction}
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-white"
        aria-label="Open WhatsApp Helpdesk"
      >
        {isOpen && !isMobile ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
        
        {/* Always Online Indicator */}
        {(!isOpen || isMobile) && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
          </span>
        )}
        
        {/* Tooltip for desktop */}
        <span className="absolute right-full mr-4 bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity hidden md:block whitespace-nowrap pointer-events-none shadow-lg">
          {t("whatsapp.chat") || (lang === "FI" ? "Kysy asiantuntijalta" : lang === "SE" ? "Fråga en expert" : "Ask an expert")}
        </span>
      </button>
    </div>
  );
}
