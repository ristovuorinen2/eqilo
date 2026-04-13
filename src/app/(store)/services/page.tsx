import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Wrench, Trophy, Activity } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="container py-10 md:py-16 max-w-5xl">
      <div className="space-y-4 mb-12 text-center">
        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Eqilo Consulting</div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Our Expertise & Services</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Over 20 years of experience managing competitions, providing technical support, and integrating top-tier timekeeping systems.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        
        {/* Training & Results Service */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Training & Results Service</CardTitle>
            <CardDescription className="text-base">
              Comprehensive field operations, training, and consultation.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-muted-foreground mb-6">
              We provide deep, hands-on support for your events. Whether you are setting up a local club match or a massive international tournament, our field training ensures your staff is confident and your results are flawless.
            </p>
            <ul className="space-y-2 text-sm font-medium">
              <li className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-primary" /> On-site staff training</li>
              <li className="flex items-center gap-2"><Wrench className="w-4 h-4 text-primary" /> Equipment setup & tear-down</li>
              <li className="flex items-center gap-2"><Trophy className="w-4 h-4 text-primary" /> Live results management</li>
            </ul>
          </CardContent>
          <div className="p-6 pt-0 mt-auto">
            <Link href="/services/training-and-results">
              <Button className="w-full" variant="outline">Learn More <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </Link>
          </div>
        </Card>

        {/* Equipe Software */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Equipe Software Integration</CardTitle>
            <CardDescription className="text-base">
              The premier equestrian show management solution.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-muted-foreground mb-6">
              As experts in equestrian events, we provide full integration, setup, and support for the Equipe software ecosystem. We connect your FDS Timing hardware directly to the digital scoreboard.
            </p>
            <ul className="space-y-2 text-sm font-medium">
              <li className="flex items-center gap-2"><Wrench className="w-4 h-4 text-primary" /> Software-hardware bridging</li>
              <li className="flex items-center gap-2"><Activity className="w-4 h-4 text-primary" /> Automated timing inputs</li>
              <li className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-primary" /> Custom show configurations</li>
            </ul>
          </CardContent>
          <div className="p-6 pt-0 mt-auto">
            <Link href="/services/equipe-software">
              <Button className="w-full" variant="outline">Learn More <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </Link>
          </div>
        </Card>

      </div>
    </div>
  );
}
