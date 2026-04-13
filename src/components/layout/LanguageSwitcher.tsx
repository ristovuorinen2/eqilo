"use client";

import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "../language-provider";

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-10 h-10 hover:bg-primary/5 hover:text-primary transition-colors flex items-center justify-center relative rounded-md outline-none">
          <Globe className="h-5 w-5" />
          <span className="absolute -bottom-1 -right-1 text-[9px] font-extrabold bg-background px-1 rounded border shadow-sm">
            {lang}
          </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem onClick={() => setLang("FI" as any)} className={`font-bold cursor-pointer ${lang === "FI" ? "bg-primary/10 text-primary" : ""}`}>
          Suomi (FI)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLang("EN" as any)} className={`font-bold cursor-pointer ${lang === "EN" ? "bg-primary/10 text-primary" : ""}`}>
          English (EN)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLang("SE" as any)} className={`font-bold cursor-pointer ${lang === "SE" ? "bg-primary/10 text-primary" : ""}`}>
          Svenska (SE)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
