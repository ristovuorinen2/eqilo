import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Wrench, Trophy } from "lucide-react";
import Link from "next/link";

export default function TrainingAndResultsPage() {
  return (
    <div className="container py-10 md:py-16 max-w-4xl">
      <Link href="/services" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Services
      </Link>

      <div className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">Training & Results Service</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Comprehensive field operations, training, and consultation built on 20 years of expertise. We ensure your competition runs flawlessly with FDS Timing equipment.
        </p>

        <div className="grid gap-8 md:grid-cols-3 mt-12">
          <div className="p-6 border rounded-xl bg-card">
            <BookOpen className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-bold mb-2">On-Site Training</h3>
            <p className="text-muted-foreground text-sm">
              We provide hands-on training for your club's staff, ensuring everyone is confident using the wireless timing gates and result software.
            </p>
          </div>
          <div className="p-6 border rounded-xl bg-card">
            <Wrench className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-bold mb-2">Equipment Setup</h3>
            <p className="text-muted-foreground text-sm">
              From placing the wireless photocells to configuring the TBox-Radio, we handle the technical heavy lifting for optimal performance.
            </p>
          </div>
          <div className="p-6 border rounded-xl bg-card">
            <Trophy className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-bold mb-2">Live Results Management</h3>
            <p className="text-muted-foreground text-sm">
              Expert consultation and support for maintaining live, accurate scoreboards during agility and equestrian events.
            </p>
          </div>
        </div>

        <div className="mt-12 p-8 bg-muted/30 rounded-xl border border-primary/10 text-center">
          <h2 className="text-2xl font-bold mb-4">Book Our Consulting Services</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Get in touch with Johannes Hyrsky to discuss how we can support your next major competition or help your club transition to modern FDS Timing gear.
          </p>
          <Button size="lg">Contact Us</Button>
        </div>
      </div>
    </div>
  );
}
