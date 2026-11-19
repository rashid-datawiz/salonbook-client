import Link from "next/link";
import Image from "next/image";
import { Scissors, Calendar, Sparkles, ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   HowItWorks Component (Assignment Doc: Booking Process)
   Inspired by the reference image's full-width luxury banner:
     "EXPERIENCE THE LUXURY OF CONCIERGE BARBER SERVICES AT YOUR HOME"
   Combines full-width moody cinematic salon background with
   the required 3-step booking process:
     01. Choose Service → 02. Select Slot → 03. Enjoy & Relax
   ───────────────────────────────────────────────────────────────────────────── */

const STEPS = [
  {
    step: "01",
    icon: Scissors,
    title: "SELECT YOUR RITUAL",
    description:
      "Browse our curated catalog of haircuts, beard sculpting, facials, and hair therapies.",
  },
  {
    step: "02",
    icon: Calendar,
    title: "RESERVE YOUR TIME",
    description:
      "Pick your desired date and private time slot. Choose your preferred master stylist.",
  },
  {
    step: "03",
    icon: Sparkles,
    title: "INDULGE IN PERFECTION",
    description:
      "Relax in our private studio or at your residence. Pay seamlessly online or post-ritual.",
  },
] as const;

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#12100E] py-24 sm:py-32 lg:py-36 text-white">
      {/* ── Cinematic Dark Photo Background ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=85&w=1920&auto=format&fit=crop"
          alt="Master barber performing straight razor grooming"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-[#12100E]/70 to-[#12100E]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle gold badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#C4A265]/40 bg-[#C4A265]/10 px-4 py-1 text-xs font-semibold tracking-[0.25em] text-[#E5C98F] uppercase backdrop-blur-md mb-6">
          <span>THE CONCIERGE EXPERIENCE</span>
        </div>

        {/* Large uppercase headline from reference */}
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wider text-white uppercase leading-[1.15] max-w-4xl mx-auto">
          EXPERIENCE THE LUXURY OF CONCIERGE <br />
          <span className="text-[#C4A265]">SALON SERVICES AT YOUR HOME</span>
        </h2>

        <p className="mt-5 max-w-2xl mx-auto text-sm sm:text-base text-stone-300 font-light leading-relaxed">
          Effortless scheduling, punctual master artisans, and bespoke styling equipment delivered directly to you.
        </p>

        {/* ── 3-Step Visual Process ── */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-5xl mx-auto">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-[#C4A265]/50 hover:bg-white/10"
              >
                {/* Step number watermark */}
                <span className="absolute top-4 right-5 font-heading text-3xl font-bold text-white/10">
                  {item.step}
                </span>

                <div className="flex size-12 items-center justify-center rounded-xl bg-[#C4A265]/20 text-[#C4A265] border border-[#C4A265]/30 mb-5">
                  <Icon className="size-6" />
                </div>

                <h3 className="font-heading text-base font-bold tracking-wider text-white uppercase">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
                  {item.description}
                </p>

                {/* Arrow connector between steps on desktop */}
                {idx < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-20 text-[#C4A265]">
                    <ArrowRight className="size-5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── CTA Action ── */}
        <div className="mt-12">
          <Link
            href="#appointment"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#C4A265] px-8 text-xs font-bold tracking-widest text-stone-950 uppercase shadow-lg transition-all duration-300 hover:bg-[#B39154] hover:shadow-xl active:scale-[0.98]"
          >
            <span>BOOK AN APPOINTMENT</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
