"use client";

import { useLanguage } from "@/components/language-provider";
import sportsData from "@/data/sports.json";
import { notFound } from "next/navigation";
import { use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function SportPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { lang, t } = useLanguage();
  
  const sport = sportsData.find(s => s.slug === resolvedParams.slug);

  if (!sport) {
    notFound();
  }

  const title = lang === "FI" ? sport.title_fi : lang === "SE" ? sport.title_se : sport.title_en;
  const content = lang === "FI" ? sport.content_fi : lang === "SE" ? sport.content_se : sport.content_en;

  return (
    <div className="container py-10 md:py-16 max-w-4xl mx-auto text-foreground">
      <Link href="/sports" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        {lang === "FI" ? "Kaikki lajit" : lang === "SE" ? "Alla sporter" : "All sports"}
      </Link>
      
      <h1 className="text-4xl font-extrabold tracking-tight mb-12">{title}</h1>
      
      <div 
        className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: content }} 
      />

      <div className="mt-20 p-8 bg-muted/30 rounded-2xl border border-border/50 text-center flex flex-col items-center">
        <h3 className="text-xl font-bold mb-4">{t("home.services.expert_cta")}</h3>
        <p className="text-muted-foreground mb-8 max-w-lg">{t("home.services.expert_desc")}</p>
        <Link href="/shop">
          <Button size="lg" className="h-14 px-8 font-bold text-lg shadow-md hover:scale-105 transition-transform">
             {t("home.advantage.more.button")} <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}