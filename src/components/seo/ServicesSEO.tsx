
"use client";
import { useLanguage } from "@/components/language-provider";

export function SEOContent() {
  const { lang } = useLanguage();
  
  if (lang === "FI") {
    return (
      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none mt-20 pt-10 border-t border-border/50 text-muted-foreground">
        <p className="mb-4">Ammattimainen urheilutapahtuma edellyttää teknologian lisäksi syvällistä ymmärrystä sen soveltamisesta. Eqilo Oy tarjoaa laitteistojen lisäksi asiantuntevaa palvelua ja konsultointia suomalaisille urheiluseuroille. Olipa kyseessä laitteiston päivitys, ohjelmistokoulutus tai ongelmatilanteiden ratkaisu, asiantuntijamme ovat valmiina auttamaan.</p>
        <p className="mb-4">Ratsastuksen ja agilityn tulospalvelu on oma taiteenlajinsa. Siksi palveluvalikoimaamme kuuluu asennus- ja koulutustukemme, joka kattaa muun muassa Equipe APP -ohjelmiston tehokkaan hyödyntämisen. Yli 20 vuoden kokemuksemme alalta takaa, että pystymme ratkaisemaan monimutkaisimmatkin tekniset haasteet ja auttamaan järjestäjiä onnistumaan tapahtumissaan.</p>
        <p className="mb-4">Panostamalla osaamiseen ja palveluiden laatuun haluamme madaltaa urheiluseurojen kynnystä investoida uusiin teknologioihin. Konsultointipalvelumme on suunniteltu räätälöidysti kunkin seuran tarpeisiin. Tarjoamme tukea laitteiden käyttöiän pidentämisestä koko ajanottojärjestelmän optimointiin.</p>
      </div>
    );
  }
  
  if (lang === "SE") {
    return (
      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none mt-20 pt-10 border-t border-border/50 text-muted-foreground">
        <p className="mb-4">Ett professionellt idrottsevenemang kräver inte bara teknik utan också en djup förståelse för dess tillämpning. Förutom utrustning erbjuder Eqilo Oy experttjänster och konsultation till finska idrottsklubbar. Oavsett om det handlar om utrustningsuppgraderingar, programvaruutbildning eller felsökning är våra experter redo att hjälpa till.</p>
        <p className="mb-4">Tidtagning och resultattjänster för ridsport och agility är en egen konstform. Därför inkluderar vår tjänsteportfölj installations- och utbildningssupport, som täcker den effektiva användningen av programvara som Equipe APP. Våra över 20 års erfarenhet inom området garanterar att vi kan lösa även de mest komplexa tekniska utmaningarna och hjälpa arrangörer att lyckas med sina evenemang.</p>
        <p className="mb-4">Genom att investera i expertis och tjänstekvalitet strävar vi efter att sänka tröskeln för idrottsklubbar att investera i ny teknik. Våra konsulttjänster är skräddarsydda för varje klubbs specifika behov. Vi erbjuder support från att förlänga utrustningens livslängd till att optimera hela tidtagningssystemet.</p>
      </div>
    );
  }

  return (
    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none mt-20 pt-10 border-t border-border/50 text-muted-foreground">
      <p className="mb-4">A professional sports event requires not only technology but also a deep understanding of its application. In addition to equipment, Eqilo Oy offers expert service and consulting to Finnish sports clubs. Whether it's equipment upgrades, software training, or troubleshooting, our experts are ready to assist.</p>
      <p className="mb-4">Timekeeping and results services for equestrian and agility events are their own form of art. That is why our service portfolio includes installation and training support, covering the efficient use of software like the Equipe APP. Our 20+ years of experience in the field ensures that we can solve even the most complex technical challenges and help organizers succeed in their events.</p>
      <p className="mb-4">By investing in expertise and service quality, we aim to lower the barrier for sports clubs to invest in new technologies. Our consulting services are tailored to the specific needs of each club. We offer support ranging from extending equipment lifespan to optimizing the entire timekeeping system.</p>
    </div>
  );
}
