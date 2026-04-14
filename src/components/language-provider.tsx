"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "FI" | "EN" | "SE";

interface TranslationDictionary {
  [key: string]: string;
}

const dictionaries: Record<Language, TranslationDictionary> = {
  FI: {
    "nav.products": "Tuotteet",
    "nav.services": "Palvelut",
    "nav.consulting": "Eqilo Konsultointi",
    "nav.training": "Koulutus & Tulospalvelu",
    "nav.equipe": "Equipe Ohjelmisto",
    "nav.cart": "Ostoskori",
    "nav.admin": "Hallintapaneeli",
    "home.hero.title": "Modernit ajanottoratkaisut ammattilaisille",
    "home.hero.subtitle": "Eqilo.fi tuo sveitsiläisen FDS Timing -teknologian suomalaisiin agility- ja ratsastusseuroihin. Langaton, säänkestävä ja saumattomasti integroituva.",
    "home.hero.shop": "Osta Laitteita",
    "home.hero.services": "Palvelumme",
    "shop.all_equipment": "Kaikki Laitteet",
    "shop.categories": "Kategoriat",
    "shop.view_details": "Katso Tiedot",
    "product.sku": "Tuotekoodi",
    "product.incl_vat": "sis. alv",
    "product.standard_shipping": "Vakiotoimitus: 1-2 viikkoa",
    "product.shipping_details": "Tuotteet toimitetaan suoraan Suomeen. Ilmainen toimitus yli 200 € tilauksiin.",
    "product.add_to_cart": "Lisää ostoskoriin",
    "product.description": "Kuvaus",
    "product.specs": "Tekniset tiedot",
    "product.guarantee": "Laatutakuu",
    "cart.title": "Ostoskori",
    "cart.empty": "Ostoskorisi on tyhjä",
    "cart.empty_sub": "Et ole vielä lisännyt FDS Timing -laitteita ostoskoriisi.",
    "cart.browse": "Selaa tuotteita",
    "cart.summary": "Tilausyhteenveto",
    "cart.subtotal": "Välisumma",
    "cart.shipping": "Toimitus (Suomi)",
    "cart.total": "Yhteensä",
    "cart.checkout": "Siirry kassalle",
    "footer.company": "Yritys",
    "footer.store": "Kauppa",
    "footer.partners": "Kumppanit",
    "footer.terms": "Käyttöehdot",
  },
  EN: {
    "nav.products": "Products",
    "nav.services": "Services",
    "nav.consulting": "Eqilo Consulting",
    "nav.training": "Training & Results",
    "nav.equipe": "Equipe Software",
    "nav.cart": "Cart",
    "nav.admin": "Admin Portal",
    "home.hero.title": "Modern Timekeeping Solutions for Professionals",
    "home.hero.subtitle": "Eqilo.fi brings Swiss-engineered FDS Timing technology to Finnish agility and equestrian clubs. Wireless, weatherproof, and seamlessly integrated.",
    "home.hero.shop": "Shop Equipment",
    "home.hero.services": "Our Services",
    "shop.all_equipment": "All Equipment",
    "shop.categories": "Categories",
    "shop.view_details": "View Details",
    "product.sku": "SKU",
    "product.incl_vat": "incl. VAT",
    "product.standard_shipping": "Standard Shipping: 1-2 Weeks",
    "product.shipping_details": "Products are shipped directly to Finland. Free shipping on orders over 200 €.",
    "product.add_to_cart": "Add to Cart",
    "product.description": "Description",
    "product.specs": "Specifications",
    "product.weight": "Weight",
    "product.category": "Category",
    "product.box_contents": "Box Contents",
    "product.downloads": "Downloads",
    "product.guarantee": "Quality Guarantee",
    "cart.title": "Shopping Cart",
    "cart.empty": "Your cart is empty",
    "cart.empty_sub": "Looks like you haven't added any FDS Timing equipment to your cart yet.",
    "cart.browse": "Browse Products",
    "cart.summary": "Order Summary",
    "cart.subtotal": "Subtotal",
    "cart.shipping": "Shipping (Finland)",
    "cart.total": "Total",
    "cart.checkout": "Proceed to Checkout",
    "footer.company": "Company",
    "footer.store": "Store",
    "footer.partners": "Partners",
    "footer.terms": "Terms & Conditions",
  },
  SE: {
    "nav.products": "Produkter",
    "nav.services": "Tjänster",
    "nav.consulting": "Eqilo Konsulting",
    "nav.training": "Utbildning & Resultat",
    "nav.equipe": "Equipe Programvara",
    "nav.cart": "Kundvagn",
    "nav.admin": "Administratörsportal",
    "home.hero.title": "Moderna tidtagningslösningar för proffs",
    "home.hero.subtitle": "Eqilo.fi tar schweizisk FDS Timing-teknik till finska agility- och ridklubbar. Trådlöst, väderbeständigt och sömlöst integrerat.",
    "home.hero.shop": "Köp Utrustning",
    "home.hero.services": "Våra Tjänster",
    "shop.all_equipment": "All Utrustning",
    "shop.categories": "Kategorier",
    "shop.view_details": "Visa Detaljer",
    "product.sku": "Artikelnr",
    "product.incl_vat": "inkl. moms",
    "product.standard_shipping": "Standardfrakt: 1-2 veckor",
    "product.shipping_details": "Produkter skickas direkt till Finland. Fri frakt på beställningar över 200 €.",
    "product.add_to_cart": "Lägg i varukorg",
    "product.description": "Beskrivning",
    "product.specs": "Specifikationer",
    "product.weight": "Vikt",
    "product.category": "Kategori",
    "product.box_contents": "Förpackningens innehåll",
    "product.downloads": "Nedladdningar",
    "product.guarantee": "Kvalitetsgaranti",
    "cart.title": "Kundvagn",
    "cart.empty": "Din kundvagn är tom",
    "cart.empty_sub": "Det ser ut som om du inte har lagt till någon FDS Timing-utrustning ännu.",
    "cart.browse": "Bläddra bland produkter",
    "cart.summary": "Beställningssammanfattning",
    "cart.subtotal": "Delsumma",
    "cart.shipping": "Frakt (Finland)",
    "cart.total": "Totalt",
    "cart.checkout": "Gå till kassan",
    "footer.company": "Företag",
    "footer.store": "Butik",
    "footer.partners": "Partners",
    "footer.terms": "Villkor",
  }
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "FI",
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("FI");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("eqilo_lang") as Language;
    if (savedLang && ["FI", "EN", "SE"].includes(savedLang)) {
      setLang(savedLang);
    }
    setMounted(true);
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("eqilo_lang", newLang);
  };

  const t = (key: string) => {
    return dictionaries[lang][key] || dictionaries["EN"][key] || key;
  };

  if (!mounted) return <>{children}</>;

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
