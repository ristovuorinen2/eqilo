import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Battery, Wifi, ShieldCheck, MonitorPlay, Timer } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full bg-primary text-primary-foreground py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Modern Timekeeping Solutions for Professionals
                </h1>
                <p className="max-w-[600px] text-primary-foreground/80 md:text-xl">
                  Eqilo.fi brings Swiss-engineered FDS Timing technology to Finnish agility and equestrian clubs. Wireless, weatherproof, and seamlessly integrated.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row mt-4">
                <Link href="/shop">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto font-semibold">
                    Shop Equipment
                  </Button>
                </Link>
                <Link href="/services" prefetch={false}>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold">
                    Our Services
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Visual Carousel for the hero */}
            <div className="mx-auto w-full max-w-lg aspect-video lg:aspect-square flex items-center justify-center">
              <Carousel className="w-full h-full" opts={{ loop: true }}>
                <CarouselContent className="h-full">
                  <CarouselItem className="h-full">
                    <div className="w-full h-full bg-white rounded-xl flex flex-col items-center justify-center p-6 text-center shadow-lg relative overflow-hidden">
                       <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Top Choice</div>
                       <div className="w-32 h-32 md:w-48 md:h-48 bg-muted rounded-full mb-6 flex items-center justify-center border-4 border-primary/10">
                          <Timer className="w-16 h-16 text-primary/60" />
                       </div>
                       <h3 className="text-2xl font-bold text-foreground mb-2">TBOX - Wireless Timing</h3>
                       <p className="text-muted-foreground mb-6 max-w-xs">Complete precision for agility and equestrian sports.</p>
                       <Link href="/shop"><Button variant="default" className="w-full">View Equipment</Button></Link>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="h-full">
                    <div className="w-full h-full bg-white rounded-xl flex flex-col items-center justify-center p-6 text-center shadow-lg relative overflow-hidden">
                       <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Pro Setup</div>
                       <div className="w-32 h-32 md:w-48 md:h-48 bg-muted rounded-full mb-6 flex items-center justify-center border-4 border-primary/10">
                          <Wifi className="w-16 h-16 text-primary/60" />
                       </div>
                       <h3 className="text-2xl font-bold text-foreground mb-2">Wireless Photocells</h3>
                       <p className="text-muted-foreground mb-6 max-w-xs">Zero cables on the field. 100% reliable wireless connection.</p>
                       <Link href="/shop"><Button variant="default" className="w-full">View Equipment</Button></Link>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <div className="hidden sm:block">
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
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.2em]">Trusted By & Official Partner Of</h2>
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">The FDS Timing Advantage</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Why clubs across Finland are upgrading to modern FDS Timing equipment.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-8">
            
            <div className="flex flex-col items-center space-y-4 text-center p-8 border rounded-2xl bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 rounded-full bg-primary/10">
                <Wifi className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">100% Wireless</h3>
              <p className="text-muted-foreground">Easy to use and quick to deploy. No external cables required on the field.</p>
            </div>

            <div className="flex flex-col items-center space-y-4 text-center p-8 border rounded-2xl bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 rounded-full bg-primary/10">
                <Battery className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Built-in Battery</h3>
              <p className="text-muted-foreground">Modern and compact technology. No clunky external battery packs to manage.</p>
            </div>

            <div className="flex flex-col items-center space-y-4 text-center p-8 border rounded-2xl bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 rounded-full bg-primary/10">
                <MonitorPlay className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Software Compatible</h3>
              <p className="text-muted-foreground">Direct integration with popular results services like Equipe and SmarterAgility.</p>
            </div>

            <div className="flex flex-col items-center space-y-4 text-center p-8 border rounded-2xl bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 rounded-full bg-primary/10">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Weatherproof</h3>
              <p className="text-muted-foreground">Robust construction ensuring reliable performance in demanding environments.</p>
            </div>

            <div className="flex flex-col items-center space-y-4 text-center p-8 border rounded-2xl bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 rounded-full bg-primary/10">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Cost-Effective</h3>
              <p className="text-muted-foreground">Reasonable cost compared to legacy, heavy traditional systems.</p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-4 text-center p-8 border border-primary/20 rounded-2xl bg-primary/5 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 rounded-full bg-primary/10">
                <ArrowRight className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary">Explore More</h3>
              <p className="text-muted-foreground">Suitable for all event levels from club competitions to international events.</p>
              <Link href="/shop">
                <Button variant="link" className="text-primary font-bold mt-2">Browse Catalog</Button>
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
              <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">Eqilo Consulting</div>
              <h2 className="lg:leading-tighter text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.5rem]">
                20 Years of Expertise.
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Beyond equipment sales, we provide competition consultation, technical support, equipment service, and dedicated training for timekeeping and results systems.
              </p>
              <Link href="/services">
                <Button size="lg" className="mt-2 font-semibold">Discover Our Services <ArrowRight className="ml-2 w-4 h-4"/></Button>
              </Link>
            </div>
            <div className="flex flex-col items-start space-y-6 border border-primary/10 rounded-2xl p-8 md:p-10 bg-card shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
              <p className="text-muted-foreground md:text-lg italic leading-relaxed">
                "Our goal is to significantly improve accessibility to modern timekeeping solutions in Finland, lowering the barrier for clubs to adopt professional-level technology."
              </p>
              <div className="flex items-center gap-4 pt-6 border-t w-full">
                <div className="rounded-full w-14 h-14 bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-inner">JH</div>
                <div>
                  <h4 className="font-bold text-lg">Johannes Hyrsky</h4>
                  <p className="text-sm font-medium text-primary">Store Owner & Expert</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
