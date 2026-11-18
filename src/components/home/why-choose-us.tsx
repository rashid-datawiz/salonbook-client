import {
  ShieldCheck,
  CalendarCheck,
  Sparkles,
  CreditCard,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/* ───────────────────────────────────────────────
   Why Choose Us — Value proposition section.
   Four benefit cards in a clean grid layout.
   ─────────────────────────────────────────────── */

const BENEFITS = [
  {
    icon: CalendarCheck,
    title: "Easy Online Booking",
    description:
      "Browse available time slots and book your appointment in just a few clicks — no calls needed.",
  },
  {
    icon: Sparkles,
    title: "Expert Stylists",
    description:
      "Our certified professionals stay up-to-date with the latest trends and techniques.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Products",
    description:
      "We use only premium, salon-grade products to ensure the best results for every client.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description:
      "Pay confidently with Stripe-powered checkout. Your payment data is always safe.",
  },
] as const;

export default function WhyChooseUs() {
  return (
    <section className="bg-secondary/30 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">
            Why SalonBook
          </span>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Why Choose Us
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            We combine convenience, expertise, and care to deliver an
            exceptional salon experience — every single visit.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit) => (
            <Card
              key={benefit.title}
              className="border-transparent bg-background text-center shadow-none transition-shadow hover:shadow-sm"
            >
              <CardContent className="flex flex-col items-center gap-4 pt-8 pb-6">
                {/* Icon circle */}
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <benefit.icon className="size-6" />
                </div>
                <h3 className="font-heading text-base font-semibold">
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
