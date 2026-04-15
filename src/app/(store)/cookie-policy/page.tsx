"use client";

import { useLanguage } from "@/components/language-provider";

export default function CookiePolicyPage() {
  const { lang } = useLanguage();

  if (lang === "FI") {
    return (
      <div className="container py-10 md:py-16 max-w-4xl prose prose-sm md:prose-base dark:prose-invert mx-auto text-foreground">
        <h1 className="text-4xl font-extrabold tracking-tight mb-8">Evästekäytäntö</h1>
        <p className="text-muted-foreground italic mb-10">Viimeksi päivitetty: 14. huhtikuuta 2026</p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold">Mitä evästeet ovat?</h2>
          <p>Evästeet ovat pieniä tekstitiedostoja, jotka tallentuvat selaimeesi vieraillessasi verkkosivustollamme. Ne auttavat sivustoa toimimaan oikein ja parantavat käyttökokemustasi.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold">Kuinka käytämme evästeitä?</h2>
          <p>Käytämme evästeitä verkkokaupan perustoimintojen (kuten ostoskorin ja kirjautumisen) ylläpitämiseen sekä analytiikkaan (kuten kävijämäärien seurantaan), jotta voimme kehittää palveluamme.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold">Evästeiden hallinta</h2>
          <p>Voit hallita tai poistaa evästeitä selaimesi asetuksista. Huomaathan, että joidenkin evästeiden estäminen voi vaikuttaa sivuston toimivuuteen (esim. ostoskori ei välttämättä toimi).</p>
        </section>
      </div>
    );
  }

  if (lang === "SE") {
    return (
      <div className="container py-10 md:py-16 max-w-4xl prose prose-sm md:prose-base dark:prose-invert mx-auto text-foreground">
        <h1 className="text-4xl font-extrabold tracking-tight mb-8">Cookiepolicy</h1>
        <p className="text-muted-foreground italic mb-10">Senast uppdaterad: 14 april 2026</p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold">Vad är cookies?</h2>
          <p>Cookies är små textfiler som sparas i din webbläsare när du besöker vår webbplats. De hjälper webbplatsen att fungera korrekt och förbättrar din användarupplevelse.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold">Hur använder vi cookies?</h2>
          <p>Vi använder cookies för att upprätthålla onlinebutikens grundläggande funktioner (som kundvagn och inloggning) och för analys (som att spåra antalet besökare) så att vi kan utveckla vår tjänst.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold">Hantera cookies</h2>
          <p>Du kan hantera eller ta bort cookies i din webbläsares inställningar. Observera att blockering av vissa cookies kan påverka webbplatsens funktionalitet (t.ex. kanske kundvagnen inte fungerar).</p>
        </section>
      </div>
    );
  }

  return (
    <div className="container py-10 md:py-16 max-w-4xl prose prose-sm md:prose-base dark:prose-invert mx-auto text-foreground">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">Cookie Policy</h1>
      <p className="text-muted-foreground italic mb-10">Last updated: April 14, 2026</p>

      <section className="mb-12">
        <h2 className="text-2xl font-bold">What Are Cookies?</h2>
        <p>Cookies are small text files stored in your browser when you visit our website. They help the site function correctly and improve your user experience.</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold">How Do We Use Cookies?</h2>
        <p>We use cookies to maintain basic online store functions (such as the shopping cart and login) and for analytics (such as tracking visitor numbers) so we can improve our service.</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold">Managing Cookies</h2>
        <p>You can manage or delete cookies in your browser settings. Please note that blocking some cookies may affect the functionality of the site (e.g., the shopping cart may not work).</p>
      </section>
    </div>
  );
}
