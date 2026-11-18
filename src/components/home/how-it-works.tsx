import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Scissors, Calendar, Star } from "lucide-react";

/* ───────────────────────────────────────────────
   How It Works — Three-step visual guide showing
   the booking flow: Browse → Book → Enjoy.
   ─────────────────────────────────────────────── */

const STEPS = [
  {
    icon: Scissors,
    step: "01",
    title: "Choose a Service",
    description:
      "Browse our full catalog of salon services. Filter by category, compare prices, and pick what suits you best.",
  },
  {
    icon: Calendar,
    step: "02",
    title: "Book Your Slot",
    description:
      "Select your preferred date and time slot. Submit your appointment request — we'll confirm it quickly.",
  },
  {
    icon: Star,
    step: "03",
    title: "Enjoy & Pay",
    description:
      "Visit the salon, enjoy premium service, and pay securely online through Stripe after your appointment is confirmed.",
  },
] as const;

export default function HowItWorks() {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14 text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">
            Simple Process
          </span>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Getting your next appointment is as easy as 1-2-3.
          </p>
        </div>

        {/* Steps row */}
        <div className="grid gap-10 sm:grid-cols-3">
          {STEPS.map((item, index) => (
            <div key={item.step} className="relative text-center">
              {/* Connector line (hidden on first card and mobile) */}
              {index > 0 && (
                <div
                  aria-hidden="true"
                  className="absolute top-8 right-full hidden h-px w-10 bg-border sm:block lg:w-full lg:right-1/2 lg:-translate-x-6"
                />
              )}

              {/* Step number badge + icon */}
              <div className="relative mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <item.icon className="size-7" />
                <span className="absolute -top-2 -right-2 flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {item.step}
                </span>
              </div>

              <h3 className="font-heading text-lg font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button size="lg" render={<Link href="/services" />} className="gap-2">
            Get Started Now
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
