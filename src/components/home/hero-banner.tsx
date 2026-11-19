import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, ArrowRight, Calendar } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   HeroBanner Component
   Inspired by the reference luxury dark barber & salon website.
   Features:
     - Full-width dark moody salon hero backdrop with cinematic overlay
     - Centered uppercase serif headline: "THE ULTIMATE CONVENIENCE FOR BUSY PEOPLE"
     - Subtitle emphasizing concierge & in-studio premium services
     - Two high-contrast CTA buttons: Gold solid + Outline
     - Responsive 3-column Info Bar: Address | Phone | Hours
   ───────────────────────────────────────────────────────────────────────────── */

export default function HeroBanner() {
  return (
    <div className="relative bg-[#12100E] text-stone-100">
      {/* ── Main Hero Section ── */}
      <section className="relative flex min-h-[82vh] sm:min-h-[88vh] items-center justify-center overflow-hidden">
        {/* Cinematic Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=85&w=1920&auto=format&fit=crop"
            alt="Luxury Barbershop & Salon Interior with classic styling stations"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.38] contrast-[1.1]"
          />
          {/* Subtle gradient vignette overlays for luxury depth */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#12100E] via-black/40 to-[#12100E]/70"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-radial-[circle_at_center] from-transparent via-black/30 to-black/80"
          />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 pt-16 pb-28 text-center sm:px-6 sm:pt-20 sm:pb-36 lg:px-8">
          {/* Decorative Top Accent Tag */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C4A265]/40 bg-[#C4A265]/10 px-4 py-1.5 text-xs font-semibold tracking-[0.25em] text-[#E0C58E] uppercase backdrop-blur-md">
            <span>Bespoke Grooming & Concierge Salon</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="mt-8 font-heading text-3xl font-extrabold tracking-wider text-white uppercase sm:text-5xl md:text-6xl lg:text-7xl leading-[1.12]">
            The Ultimate Convenience <br className="hidden sm:inline" />
            <span className="text-[#C4A265]">For Busy People</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg lg:text-xl text-stone-300 font-light tracking-wide leading-relaxed">
            Experience the convenience of elite at-home &amp; private studio barber services.
            Tailored precision cuts, beard sculpting, and rejuvenating skin rituals.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Primary Gold CTA */}
            <Link
              href="/#appointment"
              className="group inline-flex h-13 w-full sm:w-auto items-center justify-center gap-2.5 rounded-md bg-[#C4A265] px-8 text-xs sm:text-sm font-bold tracking-widest text-stone-950 uppercase shadow-lg transition-all duration-300 hover:bg-[#d8b87d] hover:shadow-[#C4A265]/20 active:scale-98"
            >
              <Calendar className="size-4" />
              <span>Make An Appointment</span>
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Secondary Outline CTA */}
            <Link
              href="/services"
              className="inline-flex h-13 w-full sm:w-auto items-center justify-center gap-2 rounded-md border border-white/60 bg-white/5 px-8 text-xs sm:text-sm font-bold tracking-widest text-white uppercase backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/15 active:scale-98"
            >
              <span>Browse Services</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3-Column Floating Info Bar ── */}
      <div className="relative z-20 mx-auto -mt-16 sm:-mt-20 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 divide-y divide-stone-200/80 rounded-xl bg-white p-6 shadow-2xl md:grid-cols-3 md:divide-x md:divide-y-0 md:p-8 dark:divide-stone-800 dark:bg-[#1A1815] dark:border dark:border-white/10">
          {/* Column 1: Address */}
          <div className="flex items-start gap-4 py-4 md:py-0 md:px-6 first:pl-0">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#C4A265]/15 text-[#8F6E2E] dark:text-[#E0C58E]">
              <MapPin className="size-6" />
            </div>
            <div>
              <h3 className="font-heading text-xs font-bold tracking-[0.2em] text-stone-900 uppercase dark:text-stone-100">
                Address
              </h3>
              <p className="mt-1 text-sm font-medium text-stone-600 dark:text-stone-300">
                1801 London Road, LE19 1PF
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Gulshan-2, Dhaka 1212
              </p>
            </div>
          </div>

          {/* Column 2: Phone */}
          <div className="flex items-start gap-4 py-4 md:py-0 md:px-6">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#C4A265]/15 text-[#8F6E2E] dark:text-[#E0C58E]">
              <Phone className="size-6" />
            </div>
            <div>
              <h3 className="font-heading text-xs font-bold tracking-[0.2em] text-stone-900 uppercase dark:text-stone-100">
                Phone
              </h3>
              <p className="mt-1 font-mono text-sm font-semibold text-stone-800 dark:text-stone-200">
                +880 1234-567890
              </p>
              <p className="font-mono text-xs text-stone-500 dark:text-stone-400">
                +880 1987-654321
              </p>
            </div>
          </div>

          {/* Column 3: Hours */}
          <div className="flex items-start gap-4 py-4 md:py-0 md:px-6 last:pr-0">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#C4A265]/15 text-[#8F6E2E] dark:text-[#E0C58E]">
              <Clock className="size-6" />
            </div>
            <div>
              <h3 className="font-heading text-xs font-bold tracking-[0.2em] text-stone-900 uppercase dark:text-stone-100">
                Hours
              </h3>
              <p className="mt-1 text-sm font-medium text-stone-600 dark:text-stone-300">
                Mon – Sat: 9:00 AM – 8:00 PM
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Sunday: 10:00 AM – 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
