import { Button } from "@/components/ui/button";
import { ArrowLeft, MonitorPlay, Activity, ServerCog, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function EquipeSoftwarePage() {
  return (
    <div className="container py-10 md:py-16 max-w-5xl">
      <Link href="/services" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Services Overview
      </Link>

      <div className="grid lg:grid-cols-[1fr_350px] gap-12 items-start">
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center justify-center rounded-full bg-secondary/20 px-3 py-1 mb-4 text-sm font-bold text-secondary-foreground tracking-wide uppercase">Software Solutions</div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">Equipe Software Integration</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mt-6">
              The premier equestrian show management solution, perfectly bridged with FDS Timing hardware for real-time accuracy and professional broadcasting.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 mt-8">
            <div className="p-6 border border-border/50 rounded-2xl bg-card shadow-sm hover:border-secondary/30 transition-colors">
              <ServerCog className="w-10 h-10 text-secondary-foreground mb-4" />
              <h3 className="text-xl font-bold mb-3 text-foreground">Hardware Bridging</h3>
              <p className="text-muted-foreground leading-relaxed">
                Seamlessly connect FDS Timing photocells and TBox-Radio directly to the Equipe ecosystem. We eliminate complex wiring and ensure solid data transmission.
              </p>
            </div>
            <div className="p-6 border border-border/50 rounded-2xl bg-card shadow-sm hover:border-secondary/30 transition-colors">
              <Activity className="w-10 h-10 text-secondary-foreground mb-4" />
              <h3 className="text-xl font-bold mb-3 text-foreground">Automated Timing</h3>
              <p className="text-muted-foreground leading-relaxed">
                Eliminate manual data entry. Times are instantly beamed from the field to the judge's tower and the public scoreboard with zero latency.
              </p>
            </div>
            <div className="p-6 border border-border/50 rounded-2xl bg-card shadow-sm hover:border-secondary/30 transition-colors sm:col-span-2">
              <MonitorPlay className="w-10 h-10 text-secondary-foreground mb-4" />
              <h3 className="text-xl font-bold mb-3 text-foreground">Custom Configurations</h3>
              <p className="text-muted-foreground leading-relaxed">
                Tailored software setups for specific show jumping, dressage, and multi-day international event formats. We configure the system to perfectly match your competition rules and scoring requirements.
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Sidebar CTA */}
        <div className="sticky top-24 space-y-6">
          <div className="p-8 bg-secondary text-secondary-foreground rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>
            <h2 className="text-2xl font-extrabold mb-4">Upgrade Your Show</h2>
            <p className="text-secondary-foreground/90 mb-8 leading-relaxed font-medium">
              Eqilo provides end-to-end setup and support for Equipe. Contact us to learn how we can modernize your equestrian events.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 font-semibold"><CheckCircle2 className="w-5 h-5 text-secondary-foreground" /> Direct Integration</li>
              <li className="flex items-center gap-3 font-semibold"><CheckCircle2 className="w-5 h-5 text-secondary-foreground" /> Custom Scoring Rules</li>
              <li className="flex items-center gap-3 font-semibold"><CheckCircle2 className="w-5 h-5 text-secondary-foreground" /> Full Technical Support</li>
            </ul>
            <Button size="lg" className="w-full h-14 text-lg font-bold shadow-sm bg-primary text-primary-foreground hover:bg-primary/90">
              Contact Johannes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
