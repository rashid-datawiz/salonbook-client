import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Scissors, CheckCircle2 } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   AboutConcierge Component
   Inspired by the reference image's split layout:
     - Left: Bold uppercase heading, personal service copy, satisfaction & experience stats
     - Right: Large master barber / stylist portrait with refined luxury styling
   ───────────────────────────────────────────────────────────────────────────── */

export default function AboutConcierge() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#FAF8F5] py-20 sm:py-28 lg:py-32 dark:bg-[#151311]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* ── Left Column: Editorial & Stats ── */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-300/80 bg-white px-3.5 py-1 text-xs font-bold tracking-[0.2em] text-[#8F6E2E] uppercase shadow-2xs dark:border-stone-800 dark:bg-stone-900 dark:text-[#E0C58E]">
              <Scissors className="size-3.5 text-[#C4A265]" />
              <span>Bespoke Concierge Care</span>
            </div>

            <h2 className="mt-6 font-heading text-3xl font-bold tracking-wider text-stone-900 uppercase sm:text-4xl lg:text-5xl leading-[1.15] dark:text-stone-50">
              Your Personal Barber Service <br />
              <span className="text-[#8F6E2E] dark:text-[#C4A265]">At Your Home</span>
            </h2>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-stone-600 dark:text-stone-400 font-light">
              We bring the timeless ritual of luxury barbershop grooming directly to your sanctuary.
              Whether before a boardroom presentation, wedding ceremony, or a quiet weekend refresh,
              our master artisans arrive with sterilized precision tools, premium organic elixirs,
              and undivided personal attention.
            </p>

            {/* Value checklist bullets */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm text-stone-700 dark:text-stone-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[#8F6E2E] dark:text-[#C4A265]" />
                <span>Private studio or home visit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[#8F6E2E] dark:text-[#C4A265]" />
                <span>Single-use sterilized blades</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[#8F6E2E] dark:text-[#C4A265]" />
                <span>Tailored consultation & finish</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[#8F6E2E] dark:text-[#C4A265]" />
                <span>Zero wait time guarantee</span>
              </div>
            </div>

            {/* Two Prominent Proof Numbers */}
            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-stone-300/80 pt-8 dark:border-stone-800">
              <div>
                <div className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-stone-950 dark:text-stone-100">
                  99<span className="text-[#8F6E2E] dark:text-[#C4A265]">%</span>
                </div>
                <p className="mt-1 font-heading text-xs sm:text-sm font-bold tracking-[0.15em] text-stone-600 uppercase dark:text-stone-400">
                  Customer Satisfaction
                </p>
                <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-500">
                  Rated by over 2,400+ discerning clients
                </p>
              </div>

              <div>
                <div className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-stone-950 dark:text-stone-100">
                  10<span className="text-[#8F6E2E] dark:text-[#C4A265]">+</span>
                </div>
                <p className="mt-1 font-heading text-xs sm:text-sm font-bold tracking-[0.15em] text-stone-600 uppercase dark:text-stone-400">
                  Years of Experience
                </p>
                <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-500">
                  Master craftsmanship in modern grooming
                </p>
              </div>
            </div>

            {/* CTA Link */}
            <div className="mt-10">
              <Link
                href="/#appointment"
                className="group inline-flex items-center gap-2 rounded-md bg-stone-900 px-6 py-3.5 text-xs font-bold tracking-widest text-white uppercase shadow-md transition-all duration-300 hover:bg-[#8F6E2E] dark:bg-white dark:text-stone-950 dark:hover:bg-[#C4A265]"
              >
                <span>Reserve An Appointment</span>
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* ── Right Column: Master Barber Portrait ── */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative gold offset frame */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-2xl border-2 border-[#C4A265]/30 -z-10 translate-x-3 translate-y-3 hidden sm:block"
              />

              {/* Main Image Frame */}
              <div className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-stone-900 shadow-2xl ring-1 ring-black/10">
                <Image
                  src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=85&w=900&auto=format&fit=crop"
                  alt="Master Barber precision cutting and styling client with care"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle dark gradient overlay */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                />

                {/* Bottom Overlay Badge */}
                <div className="absolute bottom-6 left-6 right-6 rounded-lg bg-black/75 p-4 backdrop-blur-md border border-white/10 text-white">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#C4A265] text-stone-950">
                      <Award className="size-5" />
                    </div>
                    <div>
                      <p className="font-heading text-xs font-bold tracking-wider uppercase text-[#E0C58E]">
                        Certified Master Stylists
                      </p>
                      <p className="text-xs text-stone-300">
                        Rigorous safety &amp; precision styling standards
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
