import Link from "next/link";
import {
  Scissors,
  Crown,
  Droplets,
  Layers,
  Sparkles,
  Smile,
  Clock,
  ArrowRight,
  Calendar,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   FeaturedServices Component (Assignment Doc: Dynamic Section 1)
   Inspired by the reference image's "BROWSE OUR SERVICES" 2×3 card section:
     - Centered uppercase heading with clean decorative separator rules
     - Minimalist luxury card container holding 6 popular services
     - Clear icons, titles, descriptive blurbs, duration, and prices in USD
     - Direct "Book Slot" / "View Details" links
     - Centered "BOOK AN APPOINTMENT" call-to-action button
   ───────────────────────────────────────────────────────────────────────────── */

type Service = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: number; // minutes
  icon: React.ComponentType<{ className?: string }>;
};

const FEATURED_SERVICES: Service[] = [
  {
    id: "1",
    name: "ADULT HAIRCUT",
    category: "Haircare",
    description:
      "Precision shear cutting tailored to your face shape, followed by warm hair rinse and bespoke styling.",
    price: 35,
    duration: 45,
    icon: Scissors,
  },
  {
    id: "2",
    name: "KIDS & YOUTH HAIRCUT",
    category: "Haircare",
    description:
      "Gentle, patient scissor styling and modern tapers designed specifically for younger gentlemen and ladies.",
    price: 15,
    duration: 30,
    icon: Sparkles,
  },
  {
    id: "3",
    name: "BEARD TRIM & SCULPT",
    category: "Grooming",
    description:
      "Clipper fading, razor-sharp edge detailing, warm towel compress, and organic cedarwood conditioning oils.",
    price: 20,
    duration: 30,
    icon: Crown,
  },
  {
    id: "4",
    name: "HOT TOWEL NECK SHAVE",
    category: "Shave",
    description:
      "Classic straight razor hot lather shave with steamed eucalyptus towel and soothing cooling balm.",
    price: 18,
    duration: 25,
    icon: Layers,
  },
  {
    id: "5",
    name: "SCALP MOISTURIZING RITUAL",
    category: "Treatment",
    description:
      "Intensive keratin hair mask, follicle exfoliation treatment, and revitalizing acupressure head massage.",
    price: 40,
    duration: 45,
    icon: Droplets,
  },
  {
    id: "6",
    name: "EXECUTIVE GLOW FACIAL",
    category: "Skincare",
    description:
      "Botanical deep pore cleansing, ultrasound scrubber exfoliation, clay mask, and hydrating peptide serum.",
    price: 45,
    duration: 60,
    icon: Smile,
  },
];

export default function FeaturedServices() {
  return (
    <section className="bg-[#FAF7F2] py-20 sm:py-24 lg:py-28 dark:bg-[#151311]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header with Ornamental Separator Lines ── */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 sm:w-16 bg-[#C4A265]/50" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#8F6E2E] dark:text-[#C4A265] uppercase">
              POPULAR MENUS
            </span>
            <span className="h-px w-10 sm:w-16 bg-[#C4A265]/50" />
          </div>

          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider text-stone-900 uppercase dark:text-stone-50">
            BROWSE OUR SERVICES
          </h2>

          <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light max-w-xl mx-auto">
            Choose from our most requested salon rituals, each delivered with artisanal precision and premium apothecary formulations.
          </p>
        </div>

        {/* ── 2x3 Services Grid Container (Reference Layout) ── */}
        <div className="mt-14 mx-auto max-w-5xl rounded-2xl border border-stone-200/90 bg-white p-6 sm:p-10 lg:p-12 shadow-xl dark:border-stone-800 dark:bg-[#1C1A17]">
          <div className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
            {FEATURED_SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="group relative flex flex-col justify-between border-b border-stone-100 pb-8 last:border-b-0 sm:last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0 dark:border-stone-800/80"
                >
                  <div>
                    {/* Top row: Icon + Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-stone-100 text-stone-800 transition-colors duration-300 group-hover:bg-[#C4A265] group-hover:text-stone-950 dark:bg-stone-800 dark:text-stone-200">
                        <Icon className="size-5" />
                      </div>
                      <span className="font-heading text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100">
                        ${service.price} <span className="text-xs font-normal text-stone-400">USD</span>
                      </span>
                    </div>

                    {/* Service Name */}
                    <h3 className="mt-4 font-heading text-base sm:text-lg font-bold tracking-wider text-stone-900 uppercase dark:text-stone-50 group-hover:text-[#8F6E2E] dark:group-hover:text-[#C4A265] transition-colors">
                      {service.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom row: Duration & Action link */}
                  <div className="mt-5 flex items-center justify-between pt-2">
                    <span className="flex items-center gap-1.5 text-xs text-stone-400">
                      <Clock className="size-3.5 text-[#C4A265]" />
                      <span>{service.duration} mins</span>
                    </span>

                    <Link
                      href={`/services/${service.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold tracking-wider text-stone-600 hover:text-[#8F6E2E] dark:text-stone-300 dark:hover:text-[#C4A265] uppercase transition-colors"
                    >
                      <span>Details</span>
                      <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Centered CTA inside or below the container */}
          <div className="mt-12 text-center pt-8 border-t border-stone-200/80 dark:border-stone-800/80">
            <Link
              href="#appointment"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#C4A265] px-8 text-xs font-bold tracking-widest text-stone-950 uppercase shadow-md transition-all duration-300 hover:bg-[#B39154] hover:shadow-lg active:scale-[0.98]"
            >
              <Calendar className="size-4" />
              <span>BOOK AN APPOINTMENT</span>
            </Link>
          </div>
        </div>

        {/* View full catalog footer link */}
        <div className="mt-8 text-center">
          <Link
            href="/services"
            className="text-xs font-semibold tracking-widest text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 uppercase"
          >
            Explore all 20+ specialized salon services →
          </Link>
        </div>

      </div>
    </section>
  );
}
