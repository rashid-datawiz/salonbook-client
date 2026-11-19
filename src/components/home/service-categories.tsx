import Link from "next/link";
import Image from "next/image";
import {
  Scissors,
  Sparkles,
  Droplets,
  Smile,
  Heart,
  Flower2,
  Crown,
  Layers,
  ArrowRight,
  Award,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   ServiceCategories Component (Assignment Doc: Dynamic Section 2)
   Inspired by the reference image's split layout:
     - Left: Bold uppercase heading "YOUR PERSONAL SALON SERVICE AT YOUR HOME",
             descriptive copy, 99% Satisfaction & 10+ Years Experience stats,
             and category browsing pills
     - Right: Large master stylist portrait photograph with luxury frame
     - Bottom: Curated category grid for direct service filtering
   ───────────────────────────────────────────────────────────────────────────── */

type CategoryItem = {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  servicesCount: number;
};

const CATEGORIES: CategoryItem[] = [
  {
    id: "haircut",
    name: "Haircut & Styling",
    description: "Precision shear cuts, modern fades, blowouts & styling.",
    icon: Scissors,
    servicesCount: 14,
  },
  {
    id: "beard",
    name: "Beard & Hot Shave",
    description: "Straight-razor shaves, beard sculpting & conditioning oils.",
    icon: Crown,
    servicesCount: 8,
  },
  {
    id: "treatment",
    name: "Hair & Scalp Care",
    description: "Keratin therapy, deep moisture masks & follicle detox.",
    icon: Droplets,
    servicesCount: 7,
  },
  {
    id: "color",
    name: "Hair Coloring",
    description: "Balayage, rich glosses, grey blending & full highlights.",
    icon: Sparkles,
    servicesCount: 9,
  },
  {
    id: "facial",
    name: "Facial & Skincare",
    description: "Purifying clay masks, exfoliation & organic hydration glow.",
    icon: Smile,
    servicesCount: 11,
  },
  {
    id: "spa",
    name: "Spa & Massage",
    description: "Aromatherapy head massages & relaxing neck treatments.",
    icon: Flower2,
    servicesCount: 6,
  },
  {
    id: "nails",
    name: "Manicure & Nails",
    description: "Executive nail grooming, cuticle care & hand massage.",
    icon: Layers,
    servicesCount: 10,
  },
  {
    id: "bridal",
    name: "Bridal & Events",
    description: "Red-carpet styling, photography prep & group packages.",
    icon: Heart,
    servicesCount: 8,
  },
];

export default function ServiceCategories() {
  return (
    <section id="about" className="relative bg-[#FAF7F2] py-20 sm:py-24 lg:py-28 dark:bg-[#151311] border-b border-stone-200/60 dark:border-stone-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ── Top Split Section: Reference Layout (Heading + Stats vs Master Portrait) ── */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Brand Story & Statistics */}
          <div className="flex flex-col items-start lg:col-span-6 xl:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-300/80 bg-white px-3.5 py-1 text-xs font-bold tracking-[0.2em] text-[#8F6E2E] uppercase shadow-2xs dark:border-stone-800 dark:bg-stone-900 dark:text-[#E0C58E]">
              <Award className="size-3.5 text-[#C4A265]" />
              <span>Bespoke Concierge Care</span>
            </div>

            <h2 className="mt-6 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider text-stone-900 uppercase leading-[1.15] dark:text-stone-50">
              YOUR PERSONAL SALON SERVICE <br />
              <span className="text-[#8F6E2E] dark:text-[#C4A265]">AT YOUR HOME</span>
            </h2>

            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-stone-600 dark:text-stone-400 font-light">
              We bridge the world between luxury salon artistry and effortless modern convenience.
              Whether visiting our private flagship suites or welcoming our master artisans to your residence,
              experience grooming tailored specifically to your signature aesthetic.
            </p>

            {/* Two Key Proof Metrics (As shown in Reference Image) */}
            <div className="mt-10 flex items-center gap-10 sm:gap-14 border-t border-b border-stone-200/90 py-6 dark:border-stone-800/90 w-full max-w-lg">
              <div>
                <span className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-stone-950 dark:text-stone-50">
                  99<span className="text-[#8F6E2E] dark:text-[#C4A265]">%</span>
                </span>
                <p className="mt-1 text-xs sm:text-sm font-semibold tracking-wider text-stone-500 uppercase dark:text-stone-400">
                  Customer <br />Satisfaction
                </p>
              </div>

              <div className="h-12 w-px bg-stone-300 dark:bg-stone-800" />

              <div>
                <span className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-stone-950 dark:text-stone-50">
                  10<span className="text-[#8F6E2E] dark:text-[#C4A265]">+</span>
                </span>
                <p className="mt-1 text-xs sm:text-sm font-semibold tracking-wider text-stone-500 uppercase dark:text-stone-400">
                  Years of <br />Experience
                </p>
              </div>

              <div className="h-12 w-px bg-stone-300 dark:bg-stone-800" />

              <div>
                <span className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-stone-950 dark:text-stone-50">
                  15k<span className="text-[#8F6E2E] dark:text-[#C4A265]">+</span>
                </span>
                <p className="mt-1 text-xs sm:text-sm font-semibold tracking-wider text-stone-500 uppercase dark:text-stone-400">
                  Completed <br />Appointments
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#8F6E2E] uppercase hover:text-stone-950 dark:text-[#C4A265] dark:hover:text-white transition-colors"
              >
                <span>Explore all specialized categories</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Master Stylist Portrait (Reference Image Style) */}
          <div className="relative mx-auto w-full max-w-md lg:col-span-6 xl:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-stone-900 shadow-2xl ring-1 ring-black/10 dark:ring-white/10">
              <Image
                src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=85&w=800&auto=format&fit=crop"
                alt="Master Barber providing precision hair and beard grooming"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Floating aesthetic stamp */}
              <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/20 bg-stone-950/70 p-4 backdrop-blur-md text-white">
                <p className="text-xs font-bold tracking-wider uppercase text-[#C4A265]">
                  MASTER ARTISAN STANDARDS
                </p>
                <p className="mt-1 text-xs text-stone-300">
                  Every service is performed using sterilized instruments and luxury apothecary products.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ── Category Navigation Grid (Dynamic Section 2) ── */}
        <div className="mt-20 pt-16 border-t border-stone-200/80 dark:border-stone-800/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#8F6E2E] dark:text-[#C4A265] uppercase">
                CURATED DISCIPLINES
              </span>
              <h3 className="mt-1 font-heading text-2xl sm:text-3xl font-bold tracking-wider text-stone-900 dark:text-stone-50 uppercase">
                Browse Services by Category
              </h3>
            </div>
            <Link
              href="/services"
              className="text-xs font-bold tracking-widest text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 uppercase"
            >
              View Full Menu →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-2 md:grid-cols-4 sm:gap-4">
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.id}
                  href={`/services?category=${encodeURIComponent(category.name)}`}
                  className="group relative flex flex-col justify-between rounded-xl border border-stone-200/80 bg-white p-4 sm:p-5 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-[#C4A265]/60 hover:shadow-md dark:border-stone-800 dark:bg-[#1A1815]"
                >
                  <div>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-stone-100 text-stone-800 transition-colors group-hover:bg-[#C4A265] group-hover:text-stone-950 dark:bg-stone-800 dark:text-stone-200">
                      <Icon className="size-5" />
                    </div>
                    <h4 className="mt-3.5 font-heading text-sm sm:text-base font-bold tracking-wide text-stone-900 dark:text-stone-100 uppercase group-hover:text-[#8F6E2E] dark:group-hover:text-[#C4A265] transition-colors">
                      {category.name}
                    </h4>
                    <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-[11px] font-semibold text-stone-400 group-hover:text-[#8F6E2E] dark:group-hover:text-[#C4A265]">
                    <span>{category.servicesCount} services</span>
                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
