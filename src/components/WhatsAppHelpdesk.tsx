"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { ReactQRCode } from "@lglab/react-qr-code";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

// In a real implementation, this would be fetched from the global settings collection
const DEFAULT_WHATSAPP_NUMBER = "+358505633097"; 

export function WhatsAppHelpdesk() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

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
        <Card className="p-6 shadow-xl border-primary/20 bg-background w-80 animate-in slide-in-from-bottom-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold text-lg text-foreground">Scan to Chat</h3>
              <p className="text-sm text-muted-foreground">Scan with your phone to open WhatsApp.</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="-mt-2 -mr-2">
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex justify-center bg-white p-4 rounded-xl">
            <ReactQRCode 
              value={whatsappUrl} 
              size={200}
            />
          </div>
          <div className="mt-4 text-center">
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noreferrer"
              className="text-sm text-primary hover:underline font-medium"
            >
              Or click here for WhatsApp Web
            </a>
          </div>
        </Card>
      )}

      <button
        onClick={handleInteraction}
        className="group relative flex items-center justify-center w-14 h-14 bg-[#0055A4] text-white rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
        aria-label="Open WhatsApp Helpdesk"
      >
        <MessageCircle className="w-6 h-6" />
        
        {/* Always Online Indicator */}
        <span className="absolute top-0 right-0 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-[#0055A4]"></span>
        </span>
        
        {/* Tooltip for desktop */}
        <span className="absolute right-full mr-4 bg-foreground text-background px-3 py-1.5 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity hidden md:block whitespace-nowrap pointer-events-none">
          Need help? Chat with us!
        </span>
      </button>
    </div>
  );
}
