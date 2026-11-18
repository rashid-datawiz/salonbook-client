import Link from "next/link";
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
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   Service Categories Component (Dynamic Section 2 as per Assignment Requirements)
   Allows users to explore services by category.
   Clean, Apple-inspired card grid with icons, descriptions, and active states.
   ───────────────────────────────────────────────────────────────────────────── */

type CategoryItem = {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  servicesCount: number;
  featuredTag?: string;
};

const CATEGORIES: CategoryItem[] = [
  {
    id: "haircut-styling",
    name: "Haircut & Styling",
    description: "Tailored precision cuts, blowouts, and signature styling.",
    icon: Scissors,
    servicesCount: 14,
    featuredTag: "Popular",
  },
  {
    id: "hair-coloring",
    name: "Hair Coloring",
    description: "Balayage, rich highlights, glosses, and full-color transformations.",
    icon: Sparkles,
    servicesCount: 9,
  },
  {
    id: "hair-treatment",
    name: "Hair Treatment",
    description: "Keratin infusions, deep hydration masks, and scalp therapies.",
    icon: Droplets,
    servicesCount: 7,
  },
  {
    id: "facial-skincare",
    name: "Facial & Skincare",
    description: "Organic cleanses, hydration peels, and radiant glow facials.",
    icon: Smile,
    servicesCount: 11,
    featuredTag: "Trending",
  },
  {
    id: "makeup-bridal",
    name: "Makeup & Bridal",
    description: "Glamour looks, bridal packages, and photography-ready finishes.",
    icon: Heart,
    servicesCount: 8,
  },
  {
    id: "manicure-pedicure",
    name: "Manicure & Pedicure",
    description: "Nail sculpting, gel polish, cuticle care, and soothing massage.",
    icon: Layers,
    servicesCount: 10,
  },
  {
    id: "spa-massage",
    name: "Spa & Massage",
    description: "Aromatherapy, hot stone rituals, and deep tissue stress relief.",
    icon: Flower2,
    servicesCount: 6,
  },
  {
    id: "beard-grooming",
    name: "Beard & Shave",
    description: "Hot towel shaves, beard shaping, and conditioning rituals.",
    icon: Crown,
    servicesCount: 5,
  },
];

export default function ServiceCategories() {
  return (
    <section className="bg-[#F8F5F0]/70 dark:bg-[#151413] py-16 sm:py-20 lg:py-24 border-b border-stone-200/60 dark:border-stone-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end mb-12">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#3E1F29] dark:text-[#E8A598]">
              Curated Menu
            </span>
            <h2 className="mt-2 font-heading font-serif text-3xl sm:text-4xl font-medium tracking-tight text-stone-900 dark:text-stone-100">
              Explore by Category
            </h2>
            <p className="mt-2 max-w-xl text-sm sm:text-base text-stone-600 dark:text-stone-400">
              Browse through our specialized care disciplines and discover treatments designed for your personal aesthetic.
            </p>
          </div>

          <Link
            href="/services"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#3E1F29] hover:text-[#2C141C] dark:text-[#E8A598] dark:hover:text-[#F3B8AA] transition-colors"
          >
            <span>View all categories</span>
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                href={`/services?category=${encodeURIComponent(category.name)}`}
                className="group relative flex flex-col justify-between rounded-2xl border border-stone-200/80 bg-white/90 p-5 shadow-2xs backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-md dark:border-stone-800 dark:bg-stone-900/90 dark:hover:border-stone-700"
              >
                <div>
                  <div className="flex items-center justify-between">
                    {/* Category Icon */}
                    <div className="flex size-11 items-center justify-center rounded-xl bg-stone-100 text-[#3E1F29] transition-colors duration-300 group-hover:bg-[#3E1F29] group-hover:text-white dark:bg-stone-800 dark:text-[#E8A598] dark:group-hover:bg-[#E8A598] dark:group-hover:text-stone-950">
                      <Icon className="size-5" />
                    </div>

                    {/* Optional Tag or Service Count */}
                    {category.featuredTag ? (
                      <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-[11px] font-medium text-[#3E1F29] dark:bg-rose-950/40 dark:text-[#E8A598]">
                        {category.featuredTag}
                      </span>
                    ) : (
                      <span className="text-xs font-normal text-stone-400">
                        {category.servicesCount} services
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 font-heading text-lg font-medium tracking-tight text-stone-900 dark:text-stone-100 transition-colors group-hover:text-[#3E1F29] dark:group-hover:text-[#E8A598]">
                    {category.name}
                  </h3>

                  <p className="mt-1.5 text-xs sm:text-sm text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-1 text-xs font-medium text-stone-500 transition-colors group-hover:text-[#3E1F29] dark:group-hover:text-[#E8A598]">
                  <span>Explore services</span>
                  <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
