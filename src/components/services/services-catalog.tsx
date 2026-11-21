"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  Clock,
  Sparkles,
  Star,
  X,
  ArrowRight,
  RotateCcw,
  Scissors,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { getActiveServices, CATEGORIES, Service } from "@/data/services";
import { cn } from "@/lib/utils";

type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "duration-asc"
  | "duration-desc";

export default function ServicesCatalog() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read initial query params from URL
  const initialCategory = searchParams.get("category") || "All";
  const initialQuery = searchParams.get("search") || "";
  const initialSort = (searchParams.get("sort") as SortOption) || "featured";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    const queryString = params.toString();
    router.replace(queryString ? `/services?${queryString}` : "/services", {
      scroll: false,
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim() === "") {
      params.delete("search");
    } else {
      params.set("search", value.trim());
    }
    const queryString = params.toString();
    router.replace(queryString ? `/services?${queryString}` : "/services", {
      scroll: false,
    });
  };

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value === "featured") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    const queryString = params.toString();
    router.replace(queryString ? `/services?${queryString}` : "/services", {
      scroll: false,
    });
  };

  // All active services from dataset (only active services are visible publicly!)
  const allActiveServices = useMemo(() => getActiveServices(), []);

  // Filter and sort services
  const filteredServices = useMemo(() => {
    return allActiveServices
      .filter((service) => {
        // Category filter
        const matchesCategory =
          selectedCategory === "All" ||
          service.category.toLowerCase() === selectedCategory.toLowerCase();

        // Search query filter (search by service name and category)
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          q === "" ||
          service.name.toLowerCase().includes(q) ||
          service.shortDescription.toLowerCase().includes(q) ||
          service.category.toLowerCase().includes(q);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "duration-asc":
            return a.duration - b.duration;
          case "duration-desc":
            return b.duration - a.duration;
          case "featured":
          default:
            // Popular services first, then by ID
            if (a.isPopular && !b.isPopular) return -1;
            if (!a.isPopular && b.isPopular) return 1;
            return 0;
        }
      });
  }, [allActiveServices, selectedCategory, searchQuery, sortBy]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("featured");
    router.replace("/services", { scroll: false });
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "All" ||
    sortBy !== "featured";

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#12100E] text-stone-900 dark:text-stone-100 transition-colors">
      {/* ── Editorial Hero Header ── */}
      <section className="relative overflow-hidden border-b border-stone-200/80 bg-[#161412] text-white py-16 sm:py-20 lg:py-24">
        {/* Subtle decorative background glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C4A265]/15 via-transparent to-transparent" />
        <div className="pointer-events-none absolute -right-20 -top-20 size-96 rounded-full bg-[#C4A265]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Context Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C4A265]/40 bg-[#C4A265]/10 px-3.5 py-1 text-xs font-bold tracking-widest text-[#C4A265] uppercase">
              <Scissors className="size-3.5" />
              <span>THE SALONBOOK MENU</span>
            </div>

            <h1 className="mt-4 font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider uppercase text-white">
              HAIR &amp; WELLNESS <span className="text-[#C4A265]">RITUALS</span>
            </h1>

            <p className="mt-4 text-xs sm:text-sm md:text-base text-stone-300 font-light leading-relaxed max-w-2xl">
              Immerse yourself in our bespoke salon disciplines. From precision scissor artistry and hot towel straight-razor contouring to clinical skin revitalization and deep aromatherapy massage.
            </p>

            {/* Quick Feature Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-stone-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-[#C4A265]" />
                <span>Verified Master Stylists</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-[#C4A265]" />
                <span>Apothecary Organic Products</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-[#C4A265]" />
                <span>Instant Online Scheduling</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Catalog Workspace ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Search, Category Filter & Sorting Bar */}
        <div className="space-y-6">
          {/* Top Row: Search Input + Sorting Selector */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search services by ritual name or keyword..."
                className="w-full rounded-xl border border-stone-200 bg-white py-3 pl-11 pr-10 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 shadow-xs transition-colors focus:border-[#C4A265] focus:outline-none dark:border-stone-800 dark:bg-[#1A1815] dark:text-stone-100"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Sort Selector & Reset button */}
            <div className="flex items-center gap-3 self-end md:self-auto w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="size-4 text-stone-400 shrink-0" />
                <label
                  htmlFor="sort-select"
                  className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 whitespace-nowrap"
                >
                  Sort By:
                </label>
              </div>

              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="h-10 rounded-xl border border-stone-200 bg-white px-3.5 text-xs font-semibold text-stone-800 shadow-xs transition-colors focus:border-[#C4A265] focus:outline-none dark:border-stone-800 dark:bg-[#1A1815] dark:text-stone-200"
              >
                <option value="featured">Featured / Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="duration-asc">Duration: Short to Long</option>
                <option value="duration-desc">Duration: Long to Short</option>
              </select>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  title="Reset all filters"
                  className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-100 px-3 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-200 transition-colors dark:border-stone-800 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700"
                >
                  <RotateCcw className="size-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Bottom Row: Category Filtering Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              const count =
                category === "All"
                  ? allActiveServices.length
                  : allActiveServices.filter((s) => s.category.toLowerCase() === category.toLowerCase()).length;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategorySelect(category)}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200",
                    isSelected
                      ? "bg-[#C4A265] text-stone-950 shadow-sm font-bold"
                      : "bg-white border border-stone-200 text-stone-600 hover:border-stone-300 hover:text-stone-900 dark:bg-[#1A1815] dark:border-stone-800 dark:text-stone-300 dark:hover:border-stone-700 dark:hover:text-white"
                  )}
                >
                  <span>{category}</span>
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.2 text-[10px] font-mono",
                      isSelected
                        ? "bg-stone-950/20 text-stone-950 font-bold"
                        : "bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Active Filters & Results Summary ── */}
        <div className="mt-8 flex items-center justify-between border-t border-stone-200/80 pt-6 dark:border-stone-800">
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Showing <strong className="text-stone-900 dark:text-stone-100 font-semibold">{filteredServices.length}</strong> of {allActiveServices.length} active salon rituals
            {selectedCategory !== "All" && (
              <span> in <strong className="text-[#8F6E2E] dark:text-[#C4A265]">{selectedCategory}</strong></span>
            )}
            {searchQuery && (
              <span> matching &ldquo;<strong className="text-stone-900 dark:text-white">{searchQuery}</strong>&rdquo;</span>
            )}
          </p>

          <span className="hidden sm:inline-flex text-[11px] font-mono uppercase tracking-wider text-stone-400">
            Curated Artisanal Menu
          </span>
        </div>

        {/* ── Services Grid ── */}
        {filteredServices.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="mt-12 rounded-2xl border border-stone-200 bg-white p-12 text-center shadow-xs dark:border-stone-800 dark:bg-[#1A1815]">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#C4A265]/15 text-[#C4A265] border border-[#C4A265]/30">
              <Search className="size-6" />
            </div>
            <h3 className="mt-4 font-heading text-lg font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
              No matching rituals found
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto">
              We couldn&apos;t find any active services matching your query &ldquo;{searchQuery}&rdquo; in category &ldquo;{selectedCategory}&rdquo;. Try adjusting your keywords or clearing your active filters.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#C4A265] px-6 text-xs font-bold tracking-wider text-stone-950 uppercase transition-colors hover:bg-[#B39154]"
            >
              <RotateCcw className="size-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </section>

      {/* ── Bottom VIP Concierge Booking CTA ── */}
      <section className="border-t border-stone-200/80 bg-stone-100 py-16 dark:border-stone-800 dark:bg-[#161412]">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#8F6E2E] dark:text-[#C4A265] uppercase">
            CAN&apos;T FIND YOUR DESIRED SERVICE?
          </span>
          <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-bold tracking-wider uppercase text-stone-900 dark:text-white">
            CUSTOM CONCIERGE &amp; PRIVATE GROOMING SESSIONS
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light max-w-xl mx-auto">
            Our master stylists are available for bridal parties, private estate calls, and specialized color consultations. Contact our concierge desk directly.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/#appointment"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#C4A265] px-6 text-xs font-bold tracking-widest text-stone-950 uppercase shadow-md transition-all hover:bg-[#B39154]"
            >
              <Calendar className="size-3.5" />
              <span>Book Appointment Desk</span>
            </Link>
            <Link
              href="/#about"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-stone-300 bg-white px-6 text-xs font-semibold tracking-wider text-stone-700 uppercase transition-colors hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
            >
              <span>Learn About Our Artisans</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ServiceCard Component
   Renders card data matching assignment specifications:
     - Service Image
     - Service Name
     - Category
     - Price ($ USD)
     - Duration (minutes)
     - Short Description
     - View Details Button (linking to /services/[id])
   ───────────────────────────────────────────────────────────────────────────── */
function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C4A265]/70 hover:shadow-xl dark:border-stone-800/90 dark:bg-[#1A1815]">
      {/* Top Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
        <Image
          src={service.image}
          alt={service.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* Category Pill Tag */}
        <span className="absolute top-3.5 left-3.5 rounded-full bg-stone-950/80 px-3 py-1 text-[10px] font-bold tracking-wider text-[#C4A265] uppercase backdrop-blur-md border border-white/10">
          {service.category}
        </span>

        {/* Popular Badge */}
        {service.isPopular && (
          <span className="absolute top-3.5 right-3.5 flex items-center gap-1 rounded-full bg-[#C4A265] px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-stone-950 uppercase shadow-xs">
            <Sparkles className="size-3" />
            <span>Popular</span>
          </span>
        )}

        {/* Price Tag positioned over image bottom */}
        <div className="absolute bottom-3 right-3 rounded-lg bg-stone-950/85 px-3 py-1.5 backdrop-blur-md border border-white/10">
          <span className="font-heading text-lg font-bold text-white tracking-tight">
            ${service.price}
          </span>
          <span className="text-[10px] text-stone-300 font-mono ml-1 uppercase">USD</span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          {/* Rating and Duration header row */}
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-2">
            <div className="flex items-center gap-1">
              <Star className="size-3.5 fill-[#C4A265] text-[#C4A265]" />
              <span className="font-semibold text-stone-800 dark:text-stone-200">
                {service.rating}
              </span>
              <span className="text-stone-400">({service.reviewsCount})</span>
            </div>

            <div className="flex items-center gap-1 font-mono text-[11px] text-stone-500 dark:text-stone-400">
              <Clock className="size-3 text-[#C4A265]" />
              <span>{service.duration} mins</span>
            </div>
          </div>

          {/* Service Title */}
          <h3 className="font-heading text-base sm:text-lg font-bold tracking-wide text-stone-900 uppercase dark:text-stone-50 group-hover:text-[#8F6E2E] dark:group-hover:text-[#C4A265] transition-colors line-clamp-1">
            <Link href={`/services/${service.id}`}>
              {service.name}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed line-clamp-2">
            {service.shortDescription}
          </p>
        </div>

        {/* Action Row */}
        <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
            Available Slot Today
          </span>

          <Link
            href={`/services/${service.id}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#C4A265]/15 border border-[#C4A265]/40 px-3.5 py-1.5 text-xs font-bold tracking-wider text-[#8F6E2E] dark:text-[#C4A265] uppercase transition-all duration-200 hover:bg-[#C4A265] hover:text-stone-950 hover:border-[#C4A265]"
          >
            <span>View Details</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
