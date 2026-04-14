"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowRight, 
  MonitorPlay, 
  Wifi, 
  Database, 
  Cloud, 
  Settings, 
  Smartphone,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export default function EquipeSoftwarePage() {
  const { lang, t } = useLanguage();

  if (lang === "FI") {
    return (
      <div className="container py-10 md:py-16 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-sm font-bold text-secondary-foreground border border-secondary/20">
              Hevosurheilun Standardi
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              Equipe Ohjelmisto & Integraatio
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Olemme hevosurheilun kilpailunhallinnan asiantuntijoita. Eqilo tarjoaa täyden tuen maailman johtavalle kilpailunhallintajärjestelmälle.
            </p>
            <div className="flex gap-4 pt-4">
               <a href="https://equipe.com" target="_blank" rel="noreferrer">
                 <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold h-14 px-8 shadow-lg">
                   Vieraile Equipe.comissa
                 </Button>
               </a>
            </div>
          </div>
          <div className="flex-1 w-full max-w-md aspect-square bg-gradient-to-br from-secondary/20 to-primary/10 rounded-3xl flex items-center justify-center border-4 border-white shadow-2xl relative overflow-hidden group">
             <MonitorPlay className="w-32 h-32 text-secondary-foreground opacity-80 group-hover:scale-110 transition-transform duration-500" />
             <div className="absolute inset-x-0 bottom-0 bg-secondary/80 backdrop-blur-md p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-bold">Livetulokset & Lähtölistat</p>
                <p className="text-xs opacity-90">Täydellinen reaaliaikainen näkyvyys yleisölle.</p>
             </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
           {[
             { title: "Laitteistointegraatio", desc: "Yhdistämme FDS Timing -laitteesi suoraan Equipeen automaattisia aikapäivityksiä varten.", icon: Wifi },
             { title: "Verkkopalvelut", desc: "Lähtölistojen, tulosten ja live-lähetysten hallinta pilvipalveluna.", icon: Cloud },
             { title: "Räätälöinti", desc: "Kilpailujen sääntöjen ja asetusten konfigurointi suomalaisiin tarpeisiin.", icon: Settings }
           ].map((f, i) => (
             <Card key={i} className="border-border/50 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                   <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                      <f.icon className="w-6 h-6 text-secondary-foreground" />
                   </div>
                   <CardTitle className="text-xl font-bold">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </CardContent>
             </Card>
           ))}
        </div>

        <section className="bg-primary rounded-[2rem] p-8 md:p-16 text-primary-foreground relative overflow-hidden">
           <div className="relative z-10 max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Valmiina modernisoimaan kilpailusi?</h2>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 leading-relaxed">
                 Olemme auttaneet kymmeniä seuroja ottamaan digitaalisen harppauksen. Ota yhteyttä ja suunnitellaan teille sopiva kokonaisuus.
              </p>
              <Link href="/shop">
                <Button variant="secondary" size="lg" className="h-14 px-10 font-bold text-lg shadow-xl">
                   Tutustu laitteistoon <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
           </div>
           <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </section>
      </div>
    );
  }

  return (
    <div className="container py-10 md:py-16 max-w-6xl">
      <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-sm font-bold text-secondary-foreground border border-secondary/20">
            Equestrian Standard
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
            Equipe Software & Integration
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We are experts in equestrian show management. Eqilo provides full support for the world's leading competition management system.
          </p>
          <div className="flex gap-4 pt-4">
             <a href="https://equipe.com" target="_blank" rel="noreferrer">
               <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold h-14 px-8 shadow-lg">
                 Visit Equipe.com
               </Button>
             </a>
          </div>
        </div>
        <div className="flex-1 w-full max-w-md aspect-square bg-gradient-to-br from-secondary/20 to-primary/10 rounded-3xl flex items-center justify-center border-4 border-white shadow-2xl relative overflow-hidden group">
           <MonitorPlay className="w-32 h-32 text-secondary-foreground opacity-80 group-hover:scale-110 transition-transform duration-500" />
           <div className="absolute inset-x-0 bottom-0 bg-secondary/80 backdrop-blur-md p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="font-bold">Live Results & Start Lists</p>
              <p className="text-xs opacity-90">Seamless real-time visibility for your audience.</p>
           </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-24">
         {[
           { title: "Hardware Integration", desc: "Connect your FDS Timing devices directly to Equipe for automatic time updates.", icon: Wifi },
           { title: "Cloud Services", desc: "Manage start lists, results, and live broadcasts as a centralized cloud service.", icon: Cloud },
           { title: "Show Customization", desc: "Configure rules, classes, and show-specific settings for the Finnish market.", icon: Settings }
         ].map((f, i) => (
           <Card key={i} className="border-border/50 shadow-sm hover:shadow-md transition-all">
              <CardHeader>
                 <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                    <f.icon className="w-6 h-6 text-secondary-foreground" />
                 </div>
                 <CardTitle className="text-xl font-bold">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                 <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </CardContent>
           </Card>
         ))}
      </div>

      <section className="bg-primary rounded-[2rem] p-8 md:p-16 text-primary-foreground relative overflow-hidden">
         <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Ready to Modernize Your Show?</h2>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 leading-relaxed">
               We have helped dozens of clubs take the digital leap. Contact us and let's design the perfect package for your association.
            </p>
            <Link href="/shop">
              <Button variant="secondary" size="lg" className="h-14 px-10 font-bold text-lg shadow-xl">
                 Browse Hardware <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
         </div>
         <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </section>
    </div>
  );
}
