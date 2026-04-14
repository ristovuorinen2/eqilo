
"use client";
import { useLanguage } from "@/components/language-provider";

export function SEOContent() {
  const { lang } = useLanguage();
  
  if (lang === "FI") {
    return (
      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none mt-20 pt-10 border-t border-border/50 text-muted-foreground">
        <p className="mb-4">Eqilo Oy sitoutuu tarjoamaan asiakkailleen selkeät ja läpinäkyvät käyttöehdot. Näissä ehdoissa määritellään verkkokaupan käyttöön, tilaamiseen, maksamiseen ja palautuksiin liittyvät säännöt. Ammattitason laitteistomme, kuten FDS Timing -järjestelmät, ovat arvokkaita investointeja, joten haluamme varmistaa, että asiakkaamme tietävät tarkalleen oikeutensa ja velvollisuutensa.</p>
        <p className="mb-4">Tilausprosessimme on suunniteltu mahdollisimman turvalliseksi ja saumattomaksi. Tarjoamme monipuoliset maksutavat turvallisten maksunvälittäjien kautta. Lisäksi yritysasiakkaiden on mahdollista valita laskutusvaihtoehto, jolloin maksuehdot sovitaan erikseen. Kaikki tilaukset käsitellään luottamuksellisesti ja henkilötietoja käsitellään voimassa olevan tietosuojalainsäädännön mukaisesti.</p>
        <p className="mb-4">Tuotteillamme on normaali laitteistotakuu, ja laitteiden mahdollisissa vikatilanteissa Eqilo Oy tarjoaa teknistä tukea ja huoltopalveluita. Ymmärrämme, että laitteiden toimintavarmuus on urheilutapahtumissa ensiarvoisen tärkeää. Suosittelemme tutustumaan myös takuuehtoihin huolellisesti ennen hankintaa. Olemme täällä varmistamassa, että saat parasta mahdollista palvelua ennen ja jälkeen ostopäätöksen.</p>
      </div>
    );
  }
  
  if (lang === "SE") {
    return (
      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none mt-20 pt-10 border-t border-border/50 text-muted-foreground">
        <p className="mb-4">Eqilo Oy åtar sig att erbjuda sina kunder tydliga och transparenta användarvillkor. Dessa villkor definierar reglerna relaterade till användningen av onlinebutiken, beställning, betalning och returer. Vår utrustning på professionell nivå, såsom FDS Timing-system, är värdefulla investeringar, så vi vill se till att våra kunder känner till exakt sina rättigheter och skyldigheter.</p>
        <p className="mb-4">Vår beställningsprocess är utformad för att vara så säker och smidig som möjligt. Vi erbjuder mångsidiga betalningsmetoder via säkra betalningsleverantörer. Dessutom har företagskunder möjlighet att välja fakturering, där betalningsvillkoren avtalas separat. Alla beställningar hanteras konfidentiellt, och personuppgifter behandlas i enlighet med gällande dataskyddslagstiftning.</p>
        <p className="mb-4">Våra produkter levereras med en standardgaranti för hårdvara, och i händelse av potentiella enhetsfel erbjuder Eqilo Oy teknisk support och underhållstjänster. Vi förstår att utrustningens driftsäkerhet är av största vikt vid idrottsevenemang. Vi rekommenderar också att du noggrant läser garantivillkoren innan du köper. Vi finns här för att säkerställa att du får bästa möjliga service före och efter ditt köpbeslut.</p>
      </div>
    );
  }

  return (
    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none mt-20 pt-10 border-t border-border/50 text-muted-foreground">
      <p className="mb-4">Eqilo Oy is committed to providing clear and transparent terms of use to its customers. These terms define the rules related to the use of the online store, ordering, payment, and returns. Our professional-grade equipment, such as FDS Timing systems, are valuable investments, so we want to ensure that our customers know exactly their rights and obligations.</p>
      <p className="mb-4">Our ordering process is designed to be as secure and seamless as possible. We offer versatile payment methods through secure payment gateways. Additionally, corporate customers have the option to choose invoicing, where payment terms are agreed upon separately. All orders are handled confidentially, and personal data is processed in accordance with current data protection legislation.</p>
      <p className="mb-4">Our products come with a standard hardware warranty, and in the event of potential device failures, Eqilo Oy provides technical support and maintenance services. We understand that the operational reliability of the equipment is paramount in sports events. We also recommend carefully reading the warranty terms before purchasing. We are here to ensure you receive the best possible service before and after your purchasing decision.</p>
    </div>
  );
}
