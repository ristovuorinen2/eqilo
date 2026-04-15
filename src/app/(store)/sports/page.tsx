"use client";

import { useLanguage } from "@/components/language-provider";
import Link from "next/link";
import sportsData from "@/data/sports.json";
import { Timer, Trophy, Snowflake, Bike, Car, Activity } from "lucide-react";

export default function SportsPage() {
  const { lang, t } = useLanguage();

  const getSportIcon = (slug: string) => {
    switch (slug) {
      case 'equestrian': return <Trophy className="w-12 h-12 text-primary mb-6 opacity-80 group-hover:scale-110 transition-transform duration-300" />;
      case 'agility': return <Activity className="w-12 h-12 text-primary mb-6 opacity-80 group-hover:scale-110 transition-transform duration-300" />;
      case 'athletics': return <Timer className="w-12 h-12 text-primary mb-6 opacity-80 group-hover:scale-110 transition-transform duration-300" />;
      case 'skiing': return <Snowflake className="w-12 h-12 text-primary mb-6 opacity-80 group-hover:scale-110 transition-transform duration-300" />;
      case 'motorsports': return <Car className="w-12 h-12 text-primary mb-6 opacity-80 group-hover:scale-110 transition-transform duration-300" />;
      case 'cycling': return <Bike className="w-12 h-12 text-primary mb-6 opacity-80 group-hover:scale-110 transition-transform duration-300" />;
      default: return <Trophy className="w-12 h-12 text-primary mb-6 opacity-80 group-hover:scale-110 transition-transform duration-300" />;
    }
  };

  return (
    <div className="container py-10 md:py-16 max-w-5xl mx-auto text-foreground">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          {lang === "FI" ? "Lajit" : lang === "SE" ? "Sporter" : "Sports"}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {lang === "FI" 
            ? "Tutustu ammattilaistason FDS Timing -ajanottoratkaisuihin eri urheilulajeille. Valitse lajisi nähdäksesi tarkemmat ratkaisut." 
            : lang === "SE" 
            ? "Utforska professionella FDS Timing-lösningar för olika sporter. Välj din sport för att se specifika lösningar." 
            : "Explore professional FDS Timing solutions for various sports. Select your sport to see specific solutions."}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sportsData.map((sport) => {
          const title = lang === "FI" ? sport.title_fi : lang === "SE" ? sport.title_se : sport.title_en;
          return (
            <Link 
              key={sport.slug} 
              href={`/sports/${sport.slug}`}
              className="group p-8 bg-card text-card-foreground border border-border/50 rounded-3xl hover:shadow-xl transition-all hover:border-primary/40 flex flex-col h-full relative overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
              {getSportIcon(sport.slug)}
              <h2 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">{title}</h2>
              <div className="text-primary font-bold mt-auto pt-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                {t("home.advantage.more.title") || "Lue lisää"} &rarr;
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
