"use client";

import { useLanguage } from "@/components/language-provider";

export default function TermsPage() {
  const { lang } = useLanguage();

  if (lang === "FI") {
    return (
      <div className="container py-10 md:py-16 max-w-4xl prose prose-sm md:prose-base dark:prose-invert mx-auto text-foreground">
        <h1 className="text-4xl font-extrabold tracking-tight mb-8">Käyttöehdot</h1>
        <p className="text-muted-foreground italic mb-10">Viimeksi päivitetty: 13. huhtikuuta 2026</p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold">1. Yleistä</h2>
          <p>Näitä sopimusehtoja sovelletaan Eqilo Oy:n (jäljempänä &quot;Eqilo&quot;) ja sen asiakkaiden välisessä kauppasuhteessa. Eqilo pidättää oikeuden muuttaa näitä ehtoja yksipuolisesti ilman ennakkoilmoitusta.</p>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-bold">2. Hinnat ja tuotteet</h2>
          <p>Tuotteiden hinnat sisältävät voimassa olevan arvonlisäveron (25,5 % yleinen kanta, ellei toisin mainita). Hinnat eivät sisällä toimituskuluja, ellei toisin mainita. Eqilo pidättää oikeuden peruuttaa tilauksen, mikäli tuotteen hinta on ollut verkkokaupassa selvästi virheellinen.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold">3. Toimitus</h2>
          <p>Toimitamme tuotteita pääsääntöisesti Suomeen. Vakiotoimitusaika FDS Timing -laitteille on 1-2 viikkoa. Toimitusmaksu on 20 € alle 200 € tilauksille, ja ilmainen yli 200 € tilauksille.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold">4. Maksutavat</h2>
          <p>Käytämme Stripe-maksunvälityspalvelua. Voit maksaa pankki- ja luottokorteilla, Apple Paylla, Google Paylla sekä MobilePaylla. Yritysasiakkaille on mahdollista tarjota laskutusvaihtoehto erillisen sopimuksen mukaan (Y-tunnus vaaditaan).</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold">5. Palautusoikeus</h2>
          <p>Kuluttaja-asiakkailla on Suomen kuluttajansuojalain mukainen 14 vuorokauden vaihto- ja palautusoikeus. Palautettavan tuotteen on oltava käyttämätön, myyntikuntoinen ja alkuperäisessä pakkauksessaan. Jos haluat palauttaa tuotteen, ota meihin ensin yhteyttä ohjeiden saamiseksi. Palautuksesta aiheutuvista toimituskuluista vastaa asiakas, ellei tuote ole ollut viallinen tai väärin toimitettu. Räätälöidyillä tai erikoistilatuilla tuotteilla (esim. ohjelmistolisenssit) ei ole palautusoikeutta.</p>
        </section>

        <div className="mt-20 p-8 bg-muted/30 rounded-2xl border border-border/50 text-center">
          <h3 className="text-lg font-bold mb-2">Onko kysyttävää?</h3>
          <p className="text-sm text-muted-foreground mb-4">Asiakaspalvelumme auttaa mielellään kaikissa sopimusasioissa.</p>
          <a href="tel:+358505633097" className="font-bold text-primary hover:underline">+358 50 5633097</a>
        </div>
      </div>
    );
  }

  if (lang === "SE") {
    return (
      <div className="container py-10 md:py-16 max-w-4xl prose prose-sm md:prose-base dark:prose-invert mx-auto text-foreground">
        <h1 className="text-4xl font-extrabold tracking-tight mb-8">Villkor</h1>
        <p className="text-muted-foreground italic mb-10">Senast uppdaterad: 13 april 2026</p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold">1. Allmänt</h2>
          <p>Dessa villkor gäller för det kommersiella förhållandet mellan Eqilo Oy (&quot;Eqilo&quot;) och dess kunder. Eqilo förbehåller sig rätten att ensidigt ändra dessa villkor utan föregående meddelande.</p>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-bold">2. Priser och produkter</h2>
          <p>Produktpriserna inkluderar tillämplig mervärdesskatt (25,5 % allmän sats om inget annat anges). Priserna inkluderar inte leveranskostnader om inget annat anges. Eqilo förbehåller sig rätten att annullera en beställning om priset på produkten i webbutiken har varit uppenbart felaktigt.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold">3. Leverans</h2>
          <p>Vi levererar i huvudsak produkter till Finland. Standardleveranstiden för FDS Timing-enheter är 1-2 veckor. Leveransavgiften är 20 € för beställningar under 200 €, och gratis för beställningar över 200 €.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold">4. Betalningsmetoder</h2>
          <p>Vi använder betaltjänsten Stripe. Du kan betala med bank- och kreditkort, Apple Pay, Google Pay och MobilePay. För företagskunder är det möjligt att erbjuda ett faktureringsalternativ enligt ett separat avtal (FO-nummer krävs).</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold">5. Ångerrätt och returpolicy</h2>
          <p>Konsumentkunder har 14 dagars bytes- och returrätt i enlighet med den finska konsumentskyddslagen. Den returnerade produkten måste vara oanvänd, i säljbart skick och i sin originalförpackning. Om du vill returnera en produkt, vänligen kontakta oss först för att få instruktioner. Kunden ansvarar för returfraktkostnaderna, såvida inte produkten var defekt eller felaktigt levererad. Skräddarsydda eller specialbeställda produkter (t.ex. programvarulicenser) har ingen returrätt.</p>
        </section>

        <div className="mt-20 p-8 bg-muted/30 rounded-2xl border border-border/50 text-center">
          <h3 className="text-lg font-bold mb-2">Har du frågor?</h3>
          <p className="text-sm text-muted-foreground mb-4">Vår kundtjänst hjälper gärna till med alla avtalsfrågor.</p>
          <a href="tel:+358505633097" className="font-bold text-primary hover:underline">+358 50 5633097</a>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10 md:py-16 max-w-4xl prose prose-sm md:prose-base dark:prose-invert mx-auto text-foreground">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">Terms & Conditions</h1>
      <p className="text-muted-foreground italic mb-10">Last updated: April 13, 2026</p>

      <section className="mb-12">
        <h2 className="text-2xl font-bold">1. General</h2>
        <p>These terms and conditions apply to the commercial relationship between Eqilo Oy (&quot;Eqilo&quot;) and its customers. Eqilo reserves the right to change these terms unilaterally without prior notice.</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold">2. Prices and Products</h2>
        <p>Product prices include the applicable VAT (25.5% general rate unless otherwise stated). Prices do not include delivery costs unless otherwise stated. Eqilo reserves the right to cancel an order if the price of the product in the online store has been clearly incorrect.</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold">3. Delivery</h2>
        <p>We primarily deliver products to Finland. The standard delivery time for FDS Timing devices is 1-2 weeks. The delivery fee is €20 for orders under €200, and free for orders over €200.</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold">4. Payment Methods</h2>
        <p>We use the Stripe payment service. You can pay with debit and credit cards, Apple Pay, Google Pay, and MobilePay. For business customers, it is possible to offer an invoicing option according to a separate agreement (Business ID required).</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold">5. Right of Return & Refund Policy</h2>
        <p>Consumer customers have a 14-day right of exchange and return in accordance with the Finnish Consumer Protection Act. The returned product must be unused, in salable condition, and in its original packaging. If you wish to return a product, please contact us first to receive instructions. The customer is responsible for the return shipping costs, unless the product was defective or incorrectly delivered. Customized or special-ordered products (e.g., software licenses) do not have a right of return.</p>
      </section>

      <div className="mt-20 p-8 bg-muted/30 rounded-2xl border border-border/50 text-center">
        <h3 className="text-lg font-bold mb-2">Any Questions?</h3>
        <p className="text-sm text-muted-foreground mb-4">Our customer service is happy to help with any contractual matters.</p>
        <a href="tel:+358505633097" className="font-bold text-primary hover:underline">+358 50 5633097</a>
      </div>
    </div>
  );
}
