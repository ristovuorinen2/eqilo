"use client";

import { useLanguage } from "@/components/language-provider";

export default function TermsPage() {
  const { lang } = useLanguage();

  if (lang === "FI") {
    return (
      <div className="container py-10 md:py-16 max-w-4xl prose prose-sm md:prose-base dark:prose-invert mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight mb-8">Käyttöehdot</h1>
        <p className="text-muted-foreground italic mb-10">Viimeksi päivitetty: 13. huhtikuuta 2026</p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold">1. Yleistä</h2>
          <p>Näitä sopimusehtoja sovelletaan Eqilo Oy:n (jäljempänä "Eqilo") ja sen asiakkaiden välisessä kauppasuhteessa. Eqilo pidättää oikeuden muuttaa näitä ehtoja yksipuolisesti ilman ennakkoilmoitusta.</p>
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
          <p>Kuluttaja-asiakkailla on Suomen kuluttajansuojalain mukainen 14 vuorokauden vaihto- ja palautusoikeus. Palautettavan tuotteen on oltava käyttämätön ja alkuperäisessä pakkauksessaan.</p>
        </section>

        <div className="mt-20 p-8 bg-muted/30 rounded-2xl border border-border/50 text-center">
          <h3 className="text-lg font-bold mb-2">Onko kysyttävää?</h3>
          <p className="text-sm text-muted-foreground mb-4">Asiakaspalvelumme auttaa mielellään kaikissa sopimusasioissa.</p>
          <p className="font-bold text-primary">+358 50 5633097</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10 md:py-16 max-w-4xl prose prose-sm md:prose-base dark:prose-invert mx-auto">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">Terms & Conditions</h1>
      <p className="text-muted-foreground italic mb-10">Last updated: April 13, 2026</p>

      <section className="mb-12">
        <h2 className="text-2xl font-bold">1. General</h2>
        <p>These terms and conditions apply to the commercial relationship between Eqilo Oy ("Eqilo") and its customers. Eqilo reserves the right to change these terms unilaterally without prior notice.</p>
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
        <h2 className="text-2xl font-bold">5. Right of Return</h2>
        <p>Consumer customers have a 14-day right of exchange and return in accordance with the Finnish Consumer Protection Act. The returned product must be unused and in its original packaging.</p>
      </section>

      <div className="mt-20 p-8 bg-muted/30 rounded-2xl border border-border/50 text-center">
        <h3 className="text-lg font-bold mb-2">Any Questions?</h3>
        <p className="text-sm text-muted-foreground mb-4">Our customer service is happy to help with any contractual matters.</p>
        <p className="font-bold text-primary">+358 50 5633097</p>
      </div>
    </div>
  );
}
