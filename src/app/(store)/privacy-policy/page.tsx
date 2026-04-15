"use client";

import { useLanguage } from "@/components/language-provider";
import { Metadata } from "next";

export default function PrivacyPolicyPage() {
  const { lang } = useLanguage();

  if (lang === "FI") {
    return (
      <div className="container py-10 md:py-16 max-w-4xl prose prose-sm md:prose-base dark:prose-invert mx-auto text-foreground">
        <h1 className="text-4xl font-extrabold tracking-tight mb-8">Tietosuojaseloste</h1>
        <p className="text-muted-foreground italic mb-10">Viimeksi päivitetty: 14. huhtikuuta 2026</p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold">1. Rekisterinpitäjä</h2>
          <p>Eqilo Oy<br/>Hakkapeliitantie 4, 08350 LOHJA<br/>Y-tunnus: 3530342-3<br/>Sähköposti: privacy@eqilo.fi</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold">2. Mitä tietoja keräämme?</h2>
          <p>Keräämme asiakkuuden hoitamisen kannalta tarpeellisia tietoja, kuten: nimi, sähköpostiosoite, puhelinnumero, toimitus- ja laskutusosoite sekä IP-osoite.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold">3. Tietojen käyttötarkoitus</h2>
          <p>Henkilötietoja käsitellään tilausten toimittamiseksi, asiakassuhteen hoitamiseksi, palveluiden kehittämiseksi ja lakisääteisten velvoitteiden (esim. kirjanpito) täyttämiseksi.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold">4. Tietojen luovuttaminen</h2>
          <p>Tietoja ei säännönmukaisesti luovuteta kolmansille osapuolille, paitsi tilausten toimittamiseen osallistuville kumppaneille (kuten kuljetusyhtiöt ja maksunvälittäjät) ja viranomaisille lain niin vaatiessa.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold">5. Oikeutesi</h2>
          <p>Sinulla on oikeus tarkastaa sinusta tallennetut tiedot, vaatia niiden korjaamista tai poistamista sekä kieltää tietojesi käyttö suoramarkkinointiin.</p>
        </section>
      </div>
    );
  }

  if (lang === "SE") {
    return (
      <div className="container py-10 md:py-16 max-w-4xl prose prose-sm md:prose-base dark:prose-invert mx-auto text-foreground">
        <h1 className="text-4xl font-extrabold tracking-tight mb-8">Integritetspolicy</h1>
        <p className="text-muted-foreground italic mb-10">Senast uppdaterad: 14 april 2026</p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold">1. Personuppgiftsansvarig</h2>
          <p>Eqilo Oy<br/>Hakkapeliitantie 4, 08350 LOJO<br/>FO-nummer: 3530342-3<br/>E-post: privacy@eqilo.fi</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold">2. Vilka uppgifter samlar vi in?</h2>
          <p>Vi samlar in information som är nödvändig för att hantera kundrelationer, såsom: namn, e-postadress, telefonnummer, leverans- och faktureringsadress samt IP-adress.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold">3. Ändamål med uppgiftsbehandlingen</h2>
          <p>Personuppgifter behandlas för att leverera beställningar, hantera kundrelationer, utveckla tjänster och uppfylla lagstadgade skyldigheter (t.ex. bokföring).</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold">4. Utlämnande av uppgifter</h2>
          <p>Uppgifter lämnas i regel inte ut till tredje part, förutom till partners som är involverade i leveransen av beställningar (t.ex. fraktbolag och betalningsförmedlare) och till myndigheter om lagen så kräver.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold">5. Dina rättigheter</h2>
          <p>Du har rätt att granska de uppgifter som sparats om dig, kräva rättelse eller radering av dem samt förbjuda användningen av dina uppgifter för direktmarknadsföring.</p>
        </section>
      </div>
    );
  }

  return (
    <div className="container py-10 md:py-16 max-w-4xl prose prose-sm md:prose-base dark:prose-invert mx-auto text-foreground">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">Privacy Policy</h1>
      <p className="text-muted-foreground italic mb-10">Last updated: April 14, 2026</p>

      <section className="mb-12">
        <h2 className="text-2xl font-bold">1. Data Controller</h2>
        <p>Eqilo Oy<br/>Hakkapeliitantie 4, 08350 LOHJA, Finland<br/>Business ID: 3530342-3<br/>Email: privacy@eqilo.fi</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold">2. What Information Do We Collect?</h2>
        <p>We collect information necessary for managing the customer relationship, such as: name, email address, phone number, shipping and billing addresses, and IP address.</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold">3. Purpose of Processing</h2>
        <p>Personal data is processed to deliver orders, manage customer relationships, develop services, and fulfill legal obligations (e.g., accounting).</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold">4. Data Disclosure</h2>
        <p>Data is not generally disclosed to third parties, except to partners involved in order delivery (such as shipping companies and payment processors) and to authorities when required by law.</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold">5. Your Rights</h2>
        <p>You have the right to inspect the data stored about you, request its correction or deletion, and prohibit the use of your data for direct marketing.</p>
      </section>
    </div>
  );
}
