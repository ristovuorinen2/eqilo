"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowRight, BookOpen, Wrench, Trophy, Activity, Medal } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export default function ServicesPage() {
  const { t, lang } = useLanguage();

  return (
    <div className="container py-10 md:py-16 max-w-6xl">
      <div className="space-y-6 mb-16 text-center">
        <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary tracking-wide uppercase">
          {t("nav.consulting")}
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
          {lang === "FI" ? "Asiantuntemus & Palvelut" : lang === "SE" ? "Vår Expertis & Tjänster" : "Our Expertise & Services"}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {lang === "FI" ? (
            <>Yli <span className="font-bold text-foreground">20 vuoden</span> kokemus kilpailujen järjestämisestä, teknisestä tuesta ja huipputason ajanottojärjestelmien integroinnista Suomessa.</>
          ) : lang === "SE" ? (
            <>Över <span className="font-bold text-foreground">20 års</span> erfarenhet av att hantera tävlingar, ge teknisk support och integrera toppmoderna tidtagningssystem i Finland.</>
          ) : (
            <>Over <span className="font-bold text-foreground">20 years</span> of experience managing competitions, providing technical support, and integrating top-tier timekeeping systems across Finland.</>
          )}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        
        {/* Training & Results Service */}
        <Card className="flex flex-col border-border/50 shadow-sm hover:shadow-lg transition-all group overflow-hidden">
          <div className="h-2 w-full bg-primary"></div>
          <CardHeader className="pt-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Medal className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-extrabold tracking-tight">{t("nav.training")}</CardTitle>
            <CardDescription className="text-lg font-medium mt-2">
              {lang === "FI" ? "Kattava kenttätoiminta, koulutus ja konsultointi." : lang === "SE" ? "Omfattande fältoperationer, utbildning och konsultation." : "Comprehensive field operations, training, and consultation."}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-6">
            <p className="text-muted-foreground leading-relaxed text-base">
              {lang === "FI" 
                ? "Tarjoamme syvällistä ja käytännönläheistä tukea tapahtumillesi. Olipa kyseessä paikallinen seuran kilpailu tai massiivinen kansainvälinen turnaus, kenttäkoulutuksemme varmistaa, että henkilökuntasi on itsevarma ja tulokset virheettömiä." 
                : lang === "SE" 
                ? "Vi erbjuder djupgående, praktiskt stöd för dina evenemang. Oavsett om du förbereder en lokal klubbtävling eller en stor internationell turnering säkerställer vår fältutbildning att din personal är trygg och dina resultat felfria." 
                : "We provide deep, hands-on support for your events. Whether you are setting up a local club match or a massive international tournament, our field training ensures your staff is confident and your results are flawless."}
            </p>
            <div className="bg-muted/30 p-5 rounded-xl border border-border/50">
              <ul className="space-y-3 text-sm font-semibold text-foreground">
                <li className="flex items-center gap-3"><BookOpen className="w-5 h-5 text-primary" /> {lang === "FI" ? "Henkilökunnan koulutus paikan päällä" : lang === "SE" ? "Personalutbildning på plats" : "On-site staff training"}</li>
                <li className="flex items-center gap-3"><Wrench className="w-5 h-5 text-primary" /> {lang === "FI" ? "Laitteiston asennus ja purku" : lang === "SE" ? "Utrustningens upp- och nedmontering" : "Equipment setup & tear-down"}</li>
                <li className="flex items-center gap-3"><Trophy className="w-5 h-5 text-primary" /> {lang === "FI" ? "Live-tulospalvelun hallinta" : lang === "SE" ? "Hantering av liveresultat" : "Live results management"}</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="p-6 pt-0 mt-auto">
            <Link href="/services/training-and-results" className="w-full">
              <Button className="w-full h-14 text-lg font-bold shadow-md group-hover:bg-primary/90 transition-colors">
                {lang === "FI" ? "Tutustu koulutuspalveluun" : lang === "SE" ? "Utforska utbildningstjänsten" : "Explore Training Service"} <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Equipe Software */}
        <Card className="flex flex-col border-border/50 shadow-sm hover:shadow-lg transition-all group overflow-hidden">
          <div className="h-2 w-full bg-secondary"></div>
          <CardHeader className="pt-8">
            <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Activity className="w-8 h-8 text-secondary-foreground" />
            </div>
            <CardTitle className="text-3xl font-extrabold tracking-tight">{t("nav.equipe")}</CardTitle>
            <CardDescription className="text-lg font-medium mt-2">
              {lang === "FI" ? "Equestrian kilpailujen hallinnan asiantuntijat." : lang === "SE" ? "Experter på hantering av ridsportstävlingar." : "Equestrian show management experts."}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-6">
            <p className="text-muted-foreground leading-relaxed text-base">
              {lang === "FI" 
                ? "Hevosurheilutapahtumien asiantuntijoina tarjoamme täydellisen integraation, asennuksen ja tuen Equipe-ohjelmistoekosysteemille. Yhdistämme FDS Timing -laitteistosi suoraan digitaaliseen tulostauluun." 
                : lang === "SE" 
                ? "Som experter på ridsportsevenemang erbjuder vi fullständig integration, installation och support för Equipe-programvarans ekosystem. Vi ansluter din FDS Timing-maskinvara direkt till den digitala resultattavlan." 
                : "As experts in equestrian events, we provide full integration, setup, and support for the Equipe software ecosystem. We connect your FDS Timing hardware directly to the digital scoreboard."}
            </p>
            <div className="bg-muted/30 p-5 rounded-xl border border-border/50">
              <ul className="space-y-3 text-sm font-semibold text-foreground">
                <li className="flex items-center gap-3"><Wrench className="w-5 h-5 text-secondary-foreground" /> {lang === "FI" ? "Ohjelmisto-laitteisto -silta" : lang === "SE" ? "Programvara-hårdvara brygga" : "Software-hardware bridging"}</li>
                <li className="flex items-center gap-3"><Activity className="w-5 h-5 text-secondary-foreground" /> {lang === "FI" ? "Automatisoidut ajanottosyötteet" : lang === "SE" ? "Automatiserade tidtagningsinmatningar" : "Automated timing inputs"}</li>
                <li className="flex items-center gap-3"><BookOpen className="w-5 h-5 text-secondary-foreground" /> {lang === "FI" ? "Mukautetut kilpailuasetukset" : lang === "SE" ? "Anpassade tävlingskonfigurationer" : "Custom show configurations"}</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="p-6 pt-0 mt-auto">
            <Link href="/services/equipe-software" className="w-full">
              <Button className="w-full h-14 text-lg font-bold shadow-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
                {lang === "FI" ? "Tutustu Equipe-asetuksiin" : lang === "SE" ? "Utforska Equipe-konfiguration" : "Explore Equipe Setup"} <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

      </div>
    </div>
  );
}