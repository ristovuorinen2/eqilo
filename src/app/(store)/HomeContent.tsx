"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Battery, Wifi, ShieldCheck, MonitorPlay, Timer, ShoppingCart } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useLanguage } from "@/components/language-provider";
import { Product } from "@/lib/types/firestore";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { formatPrice } from "@/lib/utils";

interface HomeContentProps {
  featuredProducts: Product[];
}

import { SEOContent as HomeSEO } from "@/components/seo/HomeSEO";

export default function HomeContent({ featuredProducts }: HomeContentProps) {
  const { t } = useLanguage();
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full bg-primary text-primary-foreground py-12 xs:py-16 md:py-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
            <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
              <div className="space-y-3">
                <h1 className="text-3xl font-extrabold tracking-tighter xs:text-4xl sm:text-5xl xl:text-6xl/none break-words hyphens-auto max-w-full overflow-hidden">
                  {t("home.hero.title")}
                </h1>
                <p className="max-w-[600px] mx-auto lg:mx-0 text-primary-foreground/90 text-sm xs:text-base md:text-xl">
                  {t("home.hero.subtitle")}
                </p>
              </div>
              <div className="flex flex-col gap-3 min-[400px]:flex-row mt-6 justify-center lg:justify-start">
                <Link href="/shop" className="w-full sm:w-auto">
                  <Button size="lg" variant="secondary" className="w-full font-bold h-12 xs:h-14 px-8 shadow-lg">
                    {t("home.hero.shop")}
                  </Button>
                </Link>
                <Link href="/services" prefetch={false} className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-bold h-12 xs:h-14 px-8">
                    {t("home.hero.services")}
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Visual Carousel for the hero */}
            <div className="mx-auto w-full max-w-lg aspect-square xs:aspect-video lg:aspect-square flex items-center justify-center relative">
               {/* Decorative background for mobile */}
               <div className="absolute inset-0 bg-primary-foreground/5 rounded-full blur-3xl lg:hidden"></div>
              
              <Carousel 
                className="w-full h-full relative z-10" 
                opts={{ loop: true, align: "center" }}
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
              >
                <CarouselContent className="h-full">
                  {featuredProducts.length > 0 ? featuredProducts.map((product, index) => (
                    <CarouselItem key={product.id} className="h-full">
                      <div className="w-full h-full bg-white rounded-2xl flex flex-col items-center justify-center p-3 xs:p-8 md:p-10 text-center shadow-2xl relative overflow-hidden border">
                         <div className="absolute top-4 right-4 bg-emerald-700 text-white text-[10px] md:text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">{t("shop.in_stock")}</div>
                         
                         <div className="w-24 h-24 xs:w-44 xs:h-44 md:w-64 md:h-64 bg-muted/10 rounded-full mb-4 xs:mb-6 mt-4 flex items-center justify-center border-4 border-muted/30 relative overflow-hidden shrink-0 group hover:scale-105 transition-transform duration-500 shadow-inner">
                            {product.image_urls?.[0] ? (
                              <div className="absolute -inset-8 md:-inset-12">
                                <Image src={product.image_urls[0]} alt={product.name} fill className="object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 p-4 md:p-8" sizes="(max-width: 768px) 256px, 512px" priority={index === 0} />
                              </div>
                            ) : (
                              <Timer className="w-16 h-16 text-primary/60" />
                            )}
                         </div>
                         
                         <h2 className="text-lg xs:text-xl md:text-3xl font-black tracking-tight text-foreground mb-2 truncate w-full px-4 leading-none">{product.name}</h2>
                         
                         <div className="flex-1 flex flex-col w-full px-2 xs:px-4 md:px-6 mt-auto border-t border-border/50 pt-4 gap-3 md:gap-4">
                           <div className="flex items-center justify-between w-full">
                             <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground">{t("shop.price")}</p>
                             <PriceDisplay price={product.price} taxRate={product.tax_rate} size="md" align="right" hideDetails />                           </div>
                           <Link href={`/product/${product.id}`} className="w-full">
                              <Button variant="default" className="w-full font-black h-10 xs:h-12 md:h-14 shadow-md text-sm xs:text-md md:text-lg hover:bg-primary/90 hover:scale-[1.02] transition-all uppercase tracking-wider">
                                 <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                                 {t("shop.view_details")}
                              </Button>
                           </Link>
                         </div>
                      </div>
                    </CarouselItem>
                  )) : (
                    <CarouselItem className="h-full">
                      <div className="w-full h-full bg-white rounded-2xl flex flex-col items-center justify-center p-6 text-center shadow-lg relative overflow-hidden border">
                        <div className="w-32 h-32 md:w-64 md:h-64 bg-muted rounded-full mb-6 flex items-center justify-center animate-pulse" />
                        <div className="h-8 w-48 md:w-64 bg-muted rounded mb-4 animate-pulse mx-auto" />
                        <div className="h-4 w-32 md:w-48 bg-muted rounded animate-pulse mx-auto" />
                      </div>
                    </CarouselItem>
                  )}
                </CarouselContent>
                
                <div className="hidden sm:block">
                  <CarouselPrevious className="left-2 md:-left-8 bg-background shadow-xl text-foreground hover:bg-background hover:text-primary border hover:border-primary/50 h-12 w-12 md:h-14 md:w-14" />
                  <CarouselNext className="right-2 md:-right-8 bg-background shadow-xl text-foreground hover:bg-background hover:text-primary border hover:border-primary/50 h-12 w-12 md:h-14 md:w-14" />
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* Partners & Trust Signals */}
      <section className="w-full py-10 md:py-12 border-b bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <h2 className="text-[10px] xs:text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-[0.3em]">{t("home.partners.title")}</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-24 opacity-60 hover:opacity-100 transition-opacity duration-300">
            <Link href="https://fdstiming.com/" target="_blank" className="flex items-center text-xl xs:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground hover:text-primary transition-colors">
              FDS Timing
            </Link>
            <Link href="https://equipe.com/" target="_blank" className="flex items-center text-xl xs:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground hover:text-primary transition-colors">
              Equipe
            </Link>
            <Link href="https://awc2026.fi/" target="_blank" className="flex items-center text-xl xs:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground hover:text-primary transition-colors">
              AWC 2026
            </Link>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="w-full py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter xs:text-3xl sm:text-4xl">{t("home.advantages.title")}</h2>
              <p className="max-w-[900px] text-foreground/80 font-medium text-sm xs:text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("home.advantages.subtitle")}
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            
            <div className="flex flex-col items-center space-y-4 text-center p-8 border rounded-2xl bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 rounded-full bg-primary/10">
                <Wifi className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{t("home.advantage.wireless.title")}</h3>
              <p className="text-foreground/80 font-medium">{t("home.advantage.wireless.desc")}</p>
            </div>

            <div className="flex flex-col items-center space-y-4 text-center p-8 border rounded-2xl bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 rounded-full bg-primary/10">
                <Battery className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{t("home.advantage.battery.title")}</h3>
              <p className="text-foreground/80 font-medium">{t("home.advantage.battery.desc")}</p>
            </div>

            <div className="flex flex-col items-center space-y-4 text-center p-8 border rounded-2xl bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 rounded-full bg-primary/10">
                <MonitorPlay className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{t("home.advantage.software.title")}</h3>
              <p className="text-foreground/80 font-medium">{t("home.advantage.software.desc")}</p>
            </div>

            <div className="flex flex-col items-center space-y-4 text-center p-8 border rounded-2xl bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 rounded-full bg-primary/10">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{t("home.advantage.weather.title")}</h3>
              <p className="text-foreground/80 font-medium">{t("home.advantage.weather.desc")}</p>
            </div>

            <div className="flex flex-col items-center space-y-4 text-center p-8 border rounded-2xl bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 rounded-full bg-primary/10">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{t("home.advantage.cost.title")}</h3>
              <p className="text-foreground/80 font-medium">{t("home.advantage.cost.desc")}</p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-4 text-center p-8 border border-primary/20 rounded-2xl bg-primary/5 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 rounded-full bg-primary/10">
                <ArrowRight className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary">{t("home.advantage.more.title")}</h3>
              <p className="text-foreground/80 font-medium">{t("home.advantage.more.desc")}</p>
              <Link href="/shop" className="mt-4 block w-full">
                <Button variant="default" className="w-full font-bold shadow-md min-h-[44px]">{t("home.advantage.more.button")}</Button>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Services CTA */}
      <section className="w-full py-16 md:py-24 border-t bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 sm:px-10 md:gap-16 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">{t("nav.consulting")}</div>
              <h2 className="lg:leading-tighter text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.5rem]">
                {t("home.services.title")}
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                {t("home.services.desc")}
              </p>
              <Link href="/services">
                <Button size="lg" className="mt-2 font-semibold">{t("home.services.button")} <ArrowRight className="ml-2 w-4 h-4"/></Button>
              </Link>
            </div>
            <div className="flex flex-col items-start space-y-6 border border-primary/10 rounded-2xl p-8 md:p-10 bg-card shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
              <p className="text-muted-foreground md:text-lg italic leading-relaxed">
                {t("home.quote.text")}
              </p>
              <div className="flex items-center gap-4 pt-6 border-t w-full">
                <div className="rounded-full w-14 h-14 bg-primary/10 flex items-center justify-center shadow-inner relative overflow-hidden shrink-0 border-2 border-primary/20">
                  <Image src="/johannes.webp" alt={t("home.quote.author")} fill className="object-cover" sizes="56px" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{t("home.quote.author")}</h3>
                  <p className="text-sm font-medium text-primary">{t("home.quote.role")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
