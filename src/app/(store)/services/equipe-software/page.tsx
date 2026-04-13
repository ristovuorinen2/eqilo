import { Button } from "@/components/ui/button";
import { ArrowLeft, MonitorPlay, Activity, ServerCog } from "lucide-react";
import Link from "next/link";

export default function EquipeSoftwarePage() {
  return (
    <div className="container py-10 md:py-16 max-w-4xl">
      <Link href="/services" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Services
      </Link>

      <div className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">Equipe Software Integration</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          The premier equestrian show management solution, perfectly bridged with FDS Timing hardware for real-time accuracy and professional broadcasting.
        </p>

        <div className="grid gap-8 md:grid-cols-3 mt-12">
          <div className="p-6 border rounded-xl bg-card">
            <ServerCog className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-bold mb-2">Hardware Bridging</h3>
            <p className="text-muted-foreground text-sm">
              Seamlessly connect FDS Timing photocells and TBox-Radio directly to the Equipe ecosystem without complex wiring.
            </p>
          </div>
          <div className="p-6 border rounded-xl bg-card">
            <Activity className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-bold mb-2">Automated Timing</h3>
            <p className="text-muted-foreground text-sm">
              Eliminate manual data entry. Times are instantly beamed from the field to the judge's tower and the public scoreboard.
            </p>
          </div>
          <div className="p-6 border rounded-xl bg-card">
            <MonitorPlay className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-bold mb-2">Custom Configurations</h3>
            <p className="text-muted-foreground text-sm">
              Tailored software setups for specific show jumping, dressage, and multi-day international event formats.
            </p>
          </div>
        </div>

        <div className="mt-12 p-8 bg-muted/30 rounded-xl border border-primary/10 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to upgrade your show management?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Eqilo provides end-to-end setup and support for Equipe. Contact us to learn how we can modernize your equestrian events.
          </p>
          <Button size="lg">Contact Us</Button>
        </div>
      </div>
    </div>
  );
}
