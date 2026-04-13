import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Wrench, Trophy, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function TrainingAndResultsPage() {
  return (
    <div className="container py-10 md:py-16 max-w-5xl">
      <Link href="/services" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Services Overview
      </Link>

      <div className="grid lg:grid-cols-[1fr_350px] gap-12 items-start">
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 mb-4 text-sm font-bold text-primary tracking-wide uppercase">Eqilo Consulting</div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">Training & Results Service</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mt-6">
              Comprehensive field operations, training, and consultation built on 20 years of expertise. We ensure your competition runs flawlessly with FDS Timing equipment.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 mt-8">
            <div className="p-6 border border-border/50 rounded-2xl bg-card shadow-sm hover:border-primary/30 transition-colors">
              <BookOpen className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3 text-foreground">On-Site Training</h3>
              <p className="text-muted-foreground leading-relaxed">
                We provide hands-on training for your club's staff, ensuring everyone is confident using the wireless timing gates and result software under pressure.
              </p>
            </div>
            <div className="p-6 border border-border/50 rounded-2xl bg-card shadow-sm hover:border-primary/30 transition-colors">
              <Wrench className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3 text-foreground">Equipment Setup</h3>
              <p className="text-muted-foreground leading-relaxed">
                From strategically placing wireless photocells to configuring the TBox-Radio networks, we handle the technical heavy lifting for optimal performance.
              </p>
            </div>
            <div className="p-6 border border-border/50 rounded-2xl bg-card shadow-sm hover:border-primary/30 transition-colors sm:col-span-2">
              <Trophy className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3 text-foreground">Live Results Management</h3>
              <p className="text-muted-foreground leading-relaxed">
                Expert consultation and active support for maintaining live, accurate, and highly visible scoreboards during demanding agility and equestrian events. We bridge the gap between field hardware and software outputs.
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Sidebar CTA */}
        <div className="sticky top-24 space-y-6">
          <div className="p-8 bg-primary text-primary-foreground rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>
            <h2 className="text-2xl font-extrabold mb-4">Book Our Experts</h2>
            <p className="text-primary-foreground/90 mb-8 leading-relaxed font-medium">
              Discuss how we can support your next major competition or help your club transition smoothly to modern FDS Timing gear.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 font-semibold"><CheckCircle2 className="w-5 h-5 text-white" /> Dedicated Support</li>
              <li className="flex items-center gap-3 font-semibold"><CheckCircle2 className="w-5 h-5 text-white" /> Field Training</li>
              <li className="flex items-center gap-3 font-semibold"><CheckCircle2 className="w-5 h-5 text-white" /> Setup Guarantee</li>
            </ul>
            <Button size="lg" variant="secondary" className="w-full h-14 text-lg font-bold shadow-sm">
              Contact Johannes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
