"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t bg-muted/20">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold tracking-tight text-primary">EQILO.FI</h3>
            <p className="text-sm text-muted-foreground">
              {t("footer.company_desc") || "Modern timekeeping devices from Swiss manufacturer FDS Timing. Eqilo provides over 20 years of expertise to Finnish agility and equestrian clubs."}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">{t("footer.company")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Eqilo Oy</li>
              <li>Y-Tunnus: 3530342-3</li>
              <li>Hakkapeliitantie 4</li>
              <li>08350 LOHJA</li>
              <li>+358 50 5633097</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">{t("footer.store")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="text-muted-foreground hover:text-foreground">{t("shop.all_equipment")}</Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-foreground">{t("nav.services")}</Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">{t("footer.terms")}</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">{t("footer.partners")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://fdstiming.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">FDS Timing</a>
              </li>
              <li>
                <a href="https://equipe.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">Equipe</a>
              </li>
              <li>
                <a href="https://awc2026.fi/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">AWC 2026</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Eqilo Oy. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="font-medium text-primary">{t("product.standard_shipping")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
