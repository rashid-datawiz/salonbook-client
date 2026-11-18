import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarDays, ArrowRight } from "lucide-react";

/* ───────────────────────────────────────────────
   Hero Banner — Full-width header with a warm
   gradient overlay, headline, tagline, and CTA.
   Inspired by Headshot Lifestyle Salon aesthetics.
   ─────────────────────────────────────────────── */
export default function HeroBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[oklch(0.25_0.02_40)] via-[oklch(0.20_0.015_30)] to-[oklch(0.15_0.01_50)]">
      {/* Decorative pattern overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.55_0.12_15/0.12),transparent_50%),radial-gradient(circle_at_80%_80%,oklch(0.55_0.12_15/0.08),transparent_50%)]"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32 lg:py-40">
        {/* Eyebrow tag */}
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/80 backdrop-blur-sm">
          <CalendarDays className="size-3.5" />
          Book Your Appointment Online
        </span>

        {/* Main headline */}
        <h1 className="max-w-3xl font-heading text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Where Style Meets{" "}
          <span className="bg-gradient-to-r from-[oklch(0.75_0.14_15)] to-[oklch(0.80_0.10_40)] bg-clip-text text-transparent">
            Confidence
          </span>
        </h1>

        {/* Tagline */}
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
          Premium hair, skin, and beauty services tailored just for you.
          Discover top-rated stylists and book your next look in seconds.
        </p>

        {/* CTA buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            render={<Link href="/services" />}
            className="gap-2 px-6 text-sm"
          >
            Browse Services
            <ArrowRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            render={<Link href="/signup" />}
            className="border-white/20 bg-white/5 px-6 text-sm text-white hover:bg-white/10 hover:text-white"
          >
            Create Account
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-white/50">
          <span className="flex items-center gap-1.5">
            <span className="inline-block size-1.5 rounded-full bg-green-400" />
            500+ Appointments Completed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block size-1.5 rounded-full bg-green-400" />
            4.9 ★ Customer Rating
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block size-1.5 rounded-full bg-green-400" />
            Professional Stylists
          </span>
        </div>
      </div>
    </section>
  );
}
