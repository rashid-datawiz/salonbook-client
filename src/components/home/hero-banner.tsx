import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, ArrowRight, Calendar } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   HeroBanner Component
   Inspired by the reference luxury dark salon/barber design:
     - Full-width dark moody background with high-fashion salon photography
     - Centered uppercase editorial headline: "THE ULTIMATE CONVENIENCE FOR BUSY PEOPLE"
     - Dual CTA buttons: Gold solid button + White outline button
     - Floating 3-column Info Bar (Address | Phone | Hours)
   ───────────────────────────────────────────────────────────────────────────── */

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-[#12100E] text-white">
      {/* ── Hero Image Background with Cinematic Ambient Lighting ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=85&w=1920&auto=format&fit=crop"
          alt="Luxury salon barber crafting a tailored haircut with master precision"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45"
        />
        {/* Subtle dark gradient scrim for exceptional typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#12100E]/70 via-[#12100E]/50 to-[#12100E]" />
        <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-[#12100E]/40 to-[#12100E]" />
      </div>

      {/* ── Hero Content Container ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-28 sm:px-6 sm:pt-28 sm:pb-36 lg:px-8 lg:pt-32 lg:pb-40 text-center">
        {/* Subtle decorative gold badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#C4A265]/40 bg-[#C4A265]/10 px-4 py-1.5 text-xs font-semibold tracking-[0.25em] text-[#E5C98F] uppercase backdrop-blur-md mb-8">
          <span>PREMIUM CONCIERGE GROOMING</span>
        </div>

        {/* Large bold uppercase serif headline */}
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider text-white uppercase leading-[1.1] max-w-5xl mx-auto">
          THE ULTIMATE CONVENIENCE <br />
          <span className="text-[#C4A265]">FOR BUSY PEOPLE</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-stone-300 font-light tracking-wide leading-relaxed">
          Experience the effortless luxury of bespoke salon &amp; barber rituals.
          Tailored styling, private studio appointments, and master care.
        </p>

        {/* Dual Call To Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          {/* Primary Gold Button */}
          <Link
            href="#appointment"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#C4A265] px-8 text-xs font-bold tracking-widest text-stone-950 uppercase shadow-md transition-all duration-300 hover:bg-[#B39154] hover:shadow-lg active:scale-[0.98]"
          >
            <Calendar className="size-4" />
            <span>BOOK AN APPOINTMENT</span>
          </Link>

          {/* Secondary Outlined Button */}
          <Link
            href="/services"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/80 bg-white/5 px-8 text-xs font-semibold tracking-widest text-white uppercase backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-stone-950 active:scale-[0.98]"
          >
            <span>BROWSE SERVICES</span>
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* ── Floating 3-Column Info Bar (Address | Phone | Hours) ── */}
      <div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16">
        <div className="rounded-xl border border-stone-200/90 bg-white p-6 shadow-2xl dark:border-stone-800 dark:bg-[#1E1B18] text-stone-900 dark:text-stone-100">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-200 dark:divide-stone-800">
            
            {/* Column 1: Address */}
            <div className="flex items-center gap-4 py-3 md:py-1 px-4 first:pt-0 md:first:pt-1 last:pb-0 md:last:pb-1">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#C4A265]/15 text-[#A38043] dark:text-[#C4A265]">
                <MapPin className="size-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-widest text-stone-900 dark:text-stone-100 uppercase">
                  ADDRESS
                </h3>
                <p className="mt-0.5 text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-medium">
                  1801 Convention Blvd, Banani, Dhaka
                </p>
              </div>
            </div>

            {/* Column 2: Phone */}
            <div className="flex items-center gap-4 py-3 md:py-1 px-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#C4A265]/15 text-[#A38043] dark:text-[#C4A265]">
                <Phone className="size-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-widest text-stone-900 dark:text-stone-100 uppercase">
                  PHONE
                </h3>
                <p className="mt-0.5 text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-medium">
                  +880 1234-567890 / +880 1987-654321
                </p>
              </div>
            </div>

            {/* Column 3: Hours */}
            <div className="flex items-center gap-4 py-3 md:py-1 px-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#C4A265]/15 text-[#A38043] dark:text-[#C4A265]">
                <Clock className="size-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-widest text-stone-900 dark:text-stone-100 uppercase">
                  HOURS
                </h3>
                <p className="mt-0.5 text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-medium">
                  Mon – Sat: 9:00 AM – 8:00 PM
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
