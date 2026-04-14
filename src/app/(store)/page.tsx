"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Battery, Wifi, ShieldCheck, MonitorPlay, Timer, ShoppingCart } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useLanguage } from "@/components/language-provider";

import { getProducts } from "@/lib/actions/admin";
import { Product } from "@/lib/types/firestore";
import { useEffect, useState } from "react";
import { LocalizedDescription } from "@/components/LocalizedDescription";

export default function HomePage() {
  const { t } = useLanguage();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchFeatured() {
      const all = await getProducts();
      setFeaturedProducts(all.filter(p => p.is_active && p.image_urls && p.image_urls.length > 0).slice(0, 6));
    }
    fetchFeatured();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full bg-primary text-primary-foreground py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  {t("home.hero.title")}
                </h1>
                <p className="max-w-[600px] text-primary-foreground/80 md:text-xl">
                  {t("home.hero.subtitle")}
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row mt-4">
                <Link href="/shop">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto font-semibold">
                    {t("home.hero.shop")}
                  </Button>
                </Link>
                <Link href="/services" prefetch={false}>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold">
                    {t("home.hero.services")}
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Visual Carousel for the hero */}
            <div className="mx-auto w-full max-w-lg aspect-video lg:aspect-square flex items-center justify-center">
              <Carousel className="w-full h-full" opts={{ loop: true }}>
                <CarouselContent className="h-full">
                  {featuredProducts.length > 0 ? featuredProducts.map((product) => (
                    <CarouselItem key={product.id} className="h-full">
                      <div className="w-full h-full bg-white rounded-xl flex flex-col items-center justify-center p-6 text-center shadow-lg relative overflow-hidden border">
                         <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{t("shop.in_stock")}</div>
                         <div className="w-full aspect-square max-h-48 md:max-h-56 bg-gradient-to-tr from-muted/30 to-muted/10 rounded-2xl mb-8 md:mb-10 mt-2 flex items-center justify-center border border-border/50 relative overflow-hidden shrink-0 group-hover:shadow-md transition-all duration-500">
                            {product.image_urls?.[0] ? (
                              <Image src={product.image_urls[0]} alt={product.name} fill className="object-contain p-4 mix-blend-multiply drop-shadow-sm group-hover:scale-105 transition-transform duration-500" sizes="256px" />
                            ) : (
                              <Timer className="w-16 h-16 text-primary/60" />
                            )}
                         </div>
                         <h3 className="text-xl font-bold text-foreground mb-1 truncate w-full px-4">{product.name}</h3>
                         <div className="text-muted-foreground mb-6 max-w-xs text-xs line-clamp-2 h-8">
                            <LocalizedDescription product={product} />
                         </div>
                         <div className="flex-1 flex flex-col w-full px-4 mt-auto border-t border-border/50 pt-4 gap-3">
                           <div className="flex items-center justify-between w-full">
                             <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t("shop.price")}</p>
                             <div className="font-extrabold text-2xl tracking-tight text-foreground">{product.price.toFixed(2).replace('.', ',')} €</div>
                           </div>
                           <Link href={`/product/${product.id}`} className="w-full">
                              <Button variant="default" className="w-full font-bold h-12 shadow-sm text-md group-hover:bg-primary/90 transition-colors">
                                 <ShoppingCart className="w-5 h-5 mr-2" />
                                 {t("shop.view_details")}
                              </Button>
                           </Link>
                         </div>
                      </div>
                    </CarouselItem>
                  )) : (
                    <CarouselItem className="h-full">
                      <div className="w-full h-full bg-white rounded-xl flex flex-col items-center justify-center p-6 text-center shadow-lg relative overflow-hidden border">
                        <div className="w-32 h-32 md:w-48 md:h-48 bg-muted rounded-full mb-6 flex items-center justify-center animate-pulse" />
                        <div className="h-6 w-48 bg-muted rounded mb-2 animate-pulse mx-auto" />
                        <div className="h-4 w-32 bg-muted rounded animate-pulse mx-auto" />
                      </div>
                    </CarouselItem>
                  )}
                </CarouselContent>
                <div className="hidden md:block">
                  <CarouselPrevious className="left-4 bg-background/80 text-foreground hover:bg-background hover:text-primary border-none shadow-md h-10 w-10" />
                  <CarouselNext className="right-4 bg-background/80 text-foreground hover:bg-background hover:text-primary border-none shadow-md h-10 w-10" />
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* Partners & Trust Signals */}
      <section className="w-full py-8 md:py-12 border-b bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.2em]">{t("home.partners.title")}</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-24 opacity-60 hover:opacity-100 transition-opacity duration-300">
            <Link href="https://fdstiming.com/" target="_blank" className="flex items-center text-2xl md:text-3xl font-extrabold tracking-tight text-foreground hover:text-primary transition-colors">
              FDS Timing
            </Link>
            <Link href="https://equipe.com/" target="_blank" className="flex items-center text-2xl md:text-3xl font-extrabold tracking-tight text-foreground hover:text-primary transition-colors">
              Equipe
            </Link>
            <Link href="https://awc2026.fi/" target="_blank" className="flex items-center text-2xl md:text-3xl font-extrabold tracking-tight text-foreground hover:text-primary transition-colors">
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{t("home.advantages.title")}</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("home.advantages.subtitle")}
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-8">
            
            <div className="flex flex-col items-center space-y-4 text-center p-8 border rounded-2xl bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 rounded-full bg-primary/10">
                <Wifi className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{t("home.advantage.wireless.title")}</h3>
              <p className="text-muted-foreground">{t("home.advantage.wireless.desc")}</p>
            </div>

            <div className="flex flex-col items-center space-y-4 text-center p-8 border rounded-2xl bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 rounded-full bg-primary/10">
                <Battery className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{t("home.advantage.battery.title")}</h3>
              <p className="text-muted-foreground">{t("home.advantage.battery.desc")}</p>
            </div>

            <div className="flex flex-col items-center space-y-4 text-center p-8 border rounded-2xl bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 rounded-full bg-primary/10">
                <MonitorPlay className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{t("home.advantage.software.title")}</h3>
              <p className="text-muted-foreground">{t("home.advantage.software.desc")}</p>
            </div>

            <div className="flex flex-col items-center space-y-4 text-center p-8 border rounded-2xl bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 rounded-full bg-primary/10">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{t("home.advantage.weather.title")}</h3>
              <p className="text-muted-foreground">{t("home.advantage.weather.desc")}</p>
            </div>

            <div className="flex flex-col items-center space-y-4 text-center p-8 border rounded-2xl bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 rounded-full bg-primary/10">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{t("home.advantage.cost.title")}</h3>
              <p className="text-muted-foreground">{t("home.advantage.cost.desc")}</p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-4 text-center p-8 border border-primary/20 rounded-2xl bg-primary/5 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 rounded-full bg-primary/10">
                <ArrowRight className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary">{t("home.advantage.more.title")}</h3>
              <p className="text-muted-foreground">{t("home.advantage.more.desc")}</p>
              <Link href="/shop">
                <Button variant="link" className="text-primary font-bold mt-2">{t("home.advantage.more.button")}</Button>
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
                <div className="rounded-full w-14 h-14 bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-inner">JH</div>
                <div>
                  <h4 className="font-bold text-lg">{t("home.quote.author")}</h4>
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
