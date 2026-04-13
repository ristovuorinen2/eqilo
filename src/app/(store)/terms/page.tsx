"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, FileText, Scale, Globe } from "lucide-react";

export default function TermsPage() {
  const sections = [
    {
      title: "1. Scope of Application",
      icon: Globe,
      content: "These terms and conditions apply to all purchases made by customers from Eqilo Oy (Business ID: 3530342-3) via the eqilo.fi webstore. By placing an order, you agree to these terms in their entirety."
    },
    {
      title: "2. Pricing & Payments",
      icon: Scale,
      content: "All prices are displayed in Euros (€) and include Finnish Value Added Tax (VAT) at the current general rate (25.5%). We reserve the right to adjust prices due to manufacturer changes or currency fluctuations. Payments are processed securely via Stripe. We accept major credit cards, MobilePay, Apple Pay, and Google Pay."
    },
    {
      title: "3. Shipping & Delivery",
      icon: ShieldCheck,
      content: "We ship exclusively within Finland. Standard delivery time for FDS Timing equipment is 1-2 weeks, as products are often shipped directly from Swiss manufacturing or specialized local stock. Shipping is free for orders exceeding 200 €. For smaller orders, a flat fee of 20 € applies."
    },
    {
      title: "4. Returns & Refunds",
      icon: FileText,
      content: "Under the Finnish Consumer Protection Act, private customers have a 14-day right of withdrawal. The returned product must be unused, in its original packaging, and in the same condition as received. Return shipping costs are the responsibility of the customer unless the product is defective. Professional timing equipment and custom-configured systems may have restricted return rights."
    }
  ];

  return (
    <div className="container py-12 md:py-24 max-w-4xl">
      <div className="space-y-6 mb-16 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-2">
          <FileText className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">Terms & Conditions</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          The legal framework for your professional timekeeping equipment purchases.
        </p>
      </div>

      <div className="grid gap-12">
        <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-full -mr-32 -mt-32 pointer-events-none"></div>
           
           <ScrollArea className="h-full pr-4">
              <div className="space-y-12">
                {sections.map((section, index) => (
                  <section key={index} className="space-y-4">
                    <div className="flex items-center gap-4 text-primary">
                      <section.icon className="w-6 h-6" />
                      <h2 className="text-2xl font-bold tracking-tight text-foreground">{section.title}</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg pl-10">
                      {section.content}
                    </p>
                    {index < sections.length - 1 && <Separator className="mt-12 opacity-50" />}
                  </section>
                ))}
              </div>

              <div className="mt-20 p-8 bg-muted/30 rounded-2xl border border-primary/10">
                 <h3 className="text-xl font-bold mb-4">Contact for Legal Inquiries</h3>
                 <p className="text-muted-foreground leading-relaxed">
                   If you have questions regarding our terms or require B2B contract documentation, please contact our support team or Johannes Hyrsky directly at <span className="font-bold text-foreground">+358 50 5633097</span>.
                 </p>
              </div>
           </ScrollArea>
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          Last updated: April 13, 2026 • Eqilo Oy, Lohja, Finland
        </div>
      </div>
    </div>
  );
}
