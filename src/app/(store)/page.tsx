import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Battery, Wifi, ShieldCheck, MonitorPlay } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full bg-primary text-primary-foreground py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
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
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Shop Equipment
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    Our Services
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Visual Carousel for the hero */}
            <div className="mx-auto w-full max-w-lg aspect-video lg:aspect-square flex items-center justify-center">
              <Carousel className="w-full h-full" opts={{ loop: true }}>
                <CarouselContent className="h-full">
                  {[1, 2, 3].map((index) => (
                    <CarouselItem key={index} className="h-full">
                      <div className="w-full h-full bg-muted/20 rounded-xl border border-primary-foreground/10 flex items-center justify-center">
                        <span className="text-primary-foreground/50 font-medium">Hero Slide {index}</span>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="hidden sm:block">
                  <CarouselPrevious className="left-4 bg-background/20 text-primary-foreground hover:bg-background/40 hover:text-primary-foreground border-none" />
                  <CarouselNext className="right-4 bg-background/20 text-primary-foreground hover:bg-background/40 hover:text-primary-foreground border-none" />
                </div>
              </Carousel>
            </div>
            
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
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            
            <div className="flex flex-col items-center space-y-4 text-center p-6 border rounded-xl bg-background shadow-sm">
              <div className="p-3 rounded-full bg-primary/10">
                <Wifi className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">100% Wireless</h3>
              <p className="text-muted-foreground">Easy to use and quick to deploy. No external cables required on the field.</p>
            </div>

            <div className="flex flex-col items-center space-y-4 text-center p-6 border rounded-xl bg-background shadow-sm">
              <div className="p-3 rounded-full bg-primary/10">
                <Battery className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Built-in Battery</h3>
              <p className="text-muted-foreground">Modern and compact technology. No clunky external battery packs to manage.</p>
            </div>

            <div className="flex flex-col items-center space-y-4 text-center p-6 border rounded-xl bg-background shadow-sm">
              <div className="p-3 rounded-full bg-primary/10">
                <MonitorPlay className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Software Compatible</h3>
              <p className="text-muted-foreground">Direct integration with popular results services like Equipe and SmarterAgility.</p>
            </div>

            <div className="flex flex-col items-center space-y-4 text-center p-6 border rounded-xl bg-background shadow-sm">
              <div className="p-3 rounded-full bg-primary/10">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Weatherproof</h3>
              <p className="text-muted-foreground">Robust construction ensuring reliable performance in demanding environments.</p>
            </div>

            <div className="flex flex-col items-center space-y-4 text-center p-6 border rounded-xl bg-background shadow-sm">
              <div className="p-3 rounded-full bg-primary/10">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Cost-Effective</h3>
              <p className="text-muted-foreground">Reasonable cost compared to legacy, heavy traditional systems.</p>
            </div>

            <div className="flex flex-col items-center space-y-4 text-center p-6 border rounded-xl bg-background shadow-sm">
              <div className="p-3 rounded-full bg-primary/10">
                <ArrowRight className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Explore More</h3>
              <p className="text-muted-foreground">Suitable for all event levels from club competitions to international events.</p>
              <Link href="/shop" className="mt-4 text-primary font-medium hover:underline inline-flex items-center">
                Browse Catalog
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Services CTA */}
      <section className="w-full py-16 md:py-24 border-t">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 sm:px-10 md:gap-16 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Eqilo Consulting</div>
              <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                20 Years of Expertise.
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Beyond equipment sales, we provide competition consultation, technical support, equipment service, and dedicated training for timekeeping and results systems.
              </p>
              <Link href="/services">
                <Button className="mt-4">Discover Our Services</Button>
              </Link>
            </div>
            <div className="flex flex-col items-start space-y-4 border rounded-xl p-8 bg-card shadow-sm">
              <p className="text-muted-foreground">
                "Our goal is to significantly improve accessibility to modern timekeeping solutions in Finland, lowering the barrier for clubs to adopt professional-level technology."
              </p>
              <div className="flex items-center gap-4 pt-4 border-t w-full">
                <div className="rounded-full w-12 h-12 bg-primary/20 flex items-center justify-center text-primary font-bold">JH</div>
                <div>
                  <h4 className="font-semibold">Johannes Hyrsky</h4>
                  <p className="text-sm text-muted-foreground">Store Owner & Expert</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
