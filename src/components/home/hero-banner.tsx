import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  ArrowRight,
  CalendarPlus,
  CalendarCheck,
  Star,
  Sparkles,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   HeroBanner Component
   Architectural Luxury & Apple-Inspired Editorial Design for SalonBook.
   Inspired by high-end boutique barbershops and salons.
   Features:
     - Warm porcelain canvas with soft ambient glow
     - Editorial serif typography with cursive italic accent
     - Dynamic status pill with live opening hours & location
     - Signature architectural arch window with modern salon imagery
     - Floating picture-in-picture detail vignette & live "Next Opening" card
     - Clean 3-column trust statistics
   ───────────────────────────────────────────────────────────────────────────── */

export default function HeroBanner() {
  return (
    <section className="relative overflow-x-clip bg-[#FAF7F2] dark:bg-[#121110] text-stone-900 dark:text-stone-100 transition-colors duration-300">
      {/* ── Ambient Apple-Style Lighting / Soft Diffuse Glows ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 size-[32rem] rounded-full bg-gradient-to-br from-rose-200/35 to-amber-100/20 blur-3xl dark:from-rose-950/20 dark:to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -right-32 size-[30rem] rounded-full bg-gradient-to-bl from-orange-100/30 via-rose-100/20 to-transparent blur-3xl dark:from-stone-900/40 dark:to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-20 sm:px-6 sm:pt-16 sm:pb-24 lg:px-8 lg:pt-20 lg:pb-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          
          {/* ───────────────────────────────────────────────────────────────
             LEFT COLUMN: Editorial Brand Narrative, Actions & Stats
             ─────────────────────────────────────────────────────────────── */}
          <div className="flex flex-col items-start lg:col-span-6 xl:col-span-7">
            
            {/* ── Live Status & Location Pill ── */}
            <div className="inline-flex flex-wrap items-center gap-2.5 rounded-full border border-stone-200/80 bg-white/80 px-4 py-1.5 text-xs font-medium text-stone-700 shadow-2xs backdrop-blur-md dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-300 transition-all hover:border-stone-300 dark:hover:border-stone-700">
              <span className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <span className="tracking-tight">Open today until 8:00 PM</span>
              </span>

              <span className="hidden h-3 w-px bg-stone-300 dark:bg-stone-700 sm:inline-block" />

              <span className="flex items-center gap-1 text-stone-500 dark:text-stone-400">
                <MapPin className="size-3 text-stone-400 dark:text-stone-500" />
                <span>Madison Avenue, NYC</span>
              </span>
            </div>

            {/* ── Editorial Headline ── */}
            <h1 className="mt-8 font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-medium tracking-tight text-stone-950 dark:text-stone-50 leading-[1.08]">
              Grooming, <br />
              <span className="italic font-normal text-[#3E1F29] dark:text-[#E8A598]">
                done properly.
              </span>
            </h1>

            {/* ── Descriptive Copy ── */}
            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-stone-600 dark:text-stone-400 font-normal">
              A neighbourhood sanctuary for hair, skin, nails and spa rituals.
              Browse our menu, request a time that suits you, and let our master
              barbers and stylists take care of the rest.
            </p>

            {/* ── Call To Action Buttons ── */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
              {/* Primary Plum Button */}
              <Button
                size="lg"
                render={<Link href="/services" />}
                className="group h-12 rounded-full bg-[#3D1E28] hover:bg-[#2C141C] text-white px-7 text-sm font-medium shadow-sm transition-all duration-300 hover:shadow-md active:scale-[0.98] border border-[#3D1E28]"
              >
                <span>Explore services</span>
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

              {/* Secondary Clean Outline Pill */}
              <Button
                variant="outline"
                size="lg"
                render={<Link href="/signup" />}
                className="h-12 rounded-full border-stone-300/80 bg-white/70 px-6 text-sm font-medium text-stone-800 shadow-2xs backdrop-blur-sm transition-all duration-300 hover:border-stone-400 hover:bg-white dark:border-stone-700 dark:bg-stone-900/70 dark:text-stone-200 dark:hover:bg-stone-900 active:scale-[0.98]"
              >
                <CalendarPlus className="size-4 text-stone-500 dark:text-stone-400" />
                <span>Create an account</span>
              </Button>
            </div>

            {/* ── Client Metrics / Proof Numbers ── */}
            <div className="mt-12 w-full max-w-lg border-t border-stone-200/80 pt-8 dark:border-stone-800/80">
              <div className="grid grid-cols-3 gap-6 sm:gap-8">
                {/* Metric 1 */}
                <div>
                  <div className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 flex items-baseline gap-1">
                    4.9<span className="text-sm font-normal text-stone-400">/5</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                    <Star className="size-3 fill-amber-400 text-amber-400 inline sm:hidden" />
                    <span>Client rating</span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div>
                  <div className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
                    8k+
                  </div>
                  <div className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                    Appointments
                  </div>
                </div>

                {/* Metric 3 */}
                <div>
                  <div className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
                    12
                  </div>
                  <div className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                    Salon barbers
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ───────────────────────────────────────────────────────────────
             RIGHT COLUMN: Architectural Arch & Floating Interactive Badges
             ─────────────────────────────────────────────────────────────── */}
          <div className="relative mx-auto w-full max-w-md sm:max-w-lg lg:col-span-6 lg:max-w-none xl:col-span-5">
            
            {/* Ambient Backlight Halo around the Arch */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-t-[180px] lg:rounded-t-[260px] rounded-b-[48px] bg-gradient-to-b from-[#EAE2D5]/70 via-stone-200/30 to-transparent blur-2xl dark:from-stone-800/30 -z-10"
            />

            {/* ── Main Architectural Arch Frame ── */}
            <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-t-[140px] sm:rounded-t-[200px] lg:rounded-t-[240px] rounded-b-[36px] sm:rounded-b-[44px] bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950 shadow-2xl ring-1 ring-black/10 dark:ring-white/10">
              <Image
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=85&w=1200&auto=format&fit=crop"
                alt="Headshot Lifestyle Salon interior view with styling stations and leather chairs"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 550px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Subtle cinematic gradient overlay for depth */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"
              />

              {/* Discreet interior badge tag */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="size-3 text-amber-300" />
                  Premium Salon Sanctuary
                </span>
              </div>
            </div>

            {/* ── Floating Badge 1: Picture-in-Picture Detail Vignette (Bottom-Left) ── */}
            <div className="absolute -bottom-5 -left-3 sm:-bottom-8 sm:-left-6 z-20 rounded-2xl sm:rounded-3xl bg-white/95 p-1.5 sm:p-2 shadow-2xl ring-1 ring-black/10 backdrop-blur-md transition-transform duration-300 hover:scale-105 dark:bg-stone-900/95 dark:ring-white/10">
              <div className="relative h-24 w-24 sm:h-32 sm:w-32 overflow-hidden rounded-xl sm:rounded-2xl bg-stone-900">
                <Image
                  src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=85&w=400&auto=format&fit=crop"
                  alt="Precision Barber Tools & Styling Detail"
                  fill
                  sizes="(max-width: 640px) 96px, 128px"
                  className="object-cover object-center"
                />
                {/* Gloss hairline border */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl ring-1 ring-inset ring-white/20"
                />
              </div>
            </div>

            {/* ── Floating Badge 2: Live "Next Opening" Slot Card (Bottom-Right) ── */}
            <div className="absolute -bottom-4 right-2 sm:-bottom-6 sm:right-4 z-20 flex items-center gap-3.5 rounded-2xl bg-white/95 px-4 py-3 sm:px-5 sm:py-3.5 shadow-2xl ring-1 ring-black/10 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] dark:bg-stone-900/95 dark:ring-white/10 border border-white/60 dark:border-stone-800">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                <CalendarCheck className="size-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold tracking-wider text-stone-400 uppercase">
                  Next Opening
                </span>
                <span className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  Today · 2:30 PM
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
