"use client";

import { useLanguage } from "@/components/language-provider";
import Link from "next/link";
import sportsData from "@/data/sports.json";

export default function SportsPage() {
  const { lang, t } = useLanguage();

  return (
    <div className="container py-10 md:py-16 max-w-4xl mx-auto text-foreground">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">
        {lang === "FI" ? "Lajit" : lang === "SE" ? "Sporter" : "Sports"}
      </h1>
      <p className="text-lg text-muted-foreground mb-12">
        {lang === "FI" 
          ? "Tutustu ammattilaistason FDS Timing -ajanottoratkaisuihin eri urheilulajeille." 
          : lang === "SE" 
          ? "Utforska professionella FDS Timing-lösningar för olika sporter." 
          : "Explore professional FDS Timing solutions for various sports."}
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {sportsData.map((sport) => {
          const title = lang === "FI" ? sport.title_fi : lang === "SE" ? sport.title_se : sport.title_en;
          return (
            <Link 
              key={sport.slug} 
              href={`/sports/${sport.slug}`}
              className="group p-6 bg-card text-card-foreground border border-border/50 rounded-2xl hover:shadow-lg transition-all hover:border-primary/40 flex flex-col h-full"
            >
              <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{title}</h2>
              <div className="text-primary font-bold mt-auto pt-4 flex items-center gap-2">
                {t("home.advantage.more.title") || "Lue lisää"} &rarr;
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
