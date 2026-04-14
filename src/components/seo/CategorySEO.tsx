
"use client";
import { useLanguage } from "@/components/language-provider";

export function SEOContent() {
  const { lang } = useLanguage();
  
  if (lang === "FI") {
    return (
      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none mt-20 pt-10 border-t border-border/50 text-muted-foreground">
        <p className="mb-4">Ammattimainen urheiluteknologia vaatii oikeat välineet toimiakseen saumattomasti. Tässä kategoriassa tarjoamme tarkkaan valikoidun valikoiman FDS Timingin huippulaatuisia tuotteita, jotka täyttävät vaativimpienkin lajien, kuten ratsastuksen ja agilityn, tiukat kriteerit. Laatu, kestävyys ja millisekunnin tarkkuus ovat näiden laitteiden peruspilareita.</p>
        <p className="mb-4">Modulaarinen suunnittelu mahdollistaa järjestelmien räätälöinnin ja laajentamisen. Valitsemalla juuri teidän seurallenne sopivat komponentit varmistatte laitteiston pitkäikäisyyden ja toimivuuden tulevissakin tapahtumissa. Tutustu tuotteisiin tarkemmin ja rakenna voittava ajanottokokonaisuus.</p>
      </div>
    );
  }
  
  if (lang === "SE") {
    return (
      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none mt-20 pt-10 border-t border-border/50 text-muted-foreground">
        <p className="mb-4">Professionell sportteknik kräver rätt verktyg för att fungera sömlöst. I denna kategori erbjuder vi ett noggrant utvalt sortiment av FDS Timings högkvalitativa produkter som uppfyller de stränga kriterierna för även de mest krävande sporter, såsom ridsport och agility. Kvalitet, hållbarhet och millisekundsprecision är hörnstenarna i dessa enheter.</p>
        <p className="mb-4">Modulär design möjliggör systemanpassning och expansion. Genom att välja rätt komponenter för din klubb säkerställer du utrustningens livslängd och funktionalitet även i framtida evenemang. Utforska produkterna närmare och bygg en vinnande tidtagningsuppsättning.</p>
      </div>
    );
  }

  return (
    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none mt-20 pt-10 border-t border-border/50 text-muted-foreground">
      <p className="mb-4">Professional sports technology requires the right tools to function seamlessly. In this category, we offer a carefully selected range of top-quality FDS Timing products that meet the strict criteria of even the most demanding sports, such as equestrian and agility. Quality, durability, and millisecond precision are the cornerstones of these devices.</p>
      <p className="mb-4">Modular design allows for system customization and expansion. By choosing the right components for your club, you ensure the longevity and functionality of the equipment in future events as well. Explore the products in more detail and build a winning timekeeping setup.</p>
    </div>
  );
}
