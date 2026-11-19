import { ShieldCheck, Award, Star } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   WhyChooseUs Component (Assignment Doc: Value Proposition)
   Inspired by the reference image's "WHY CHOOSE US" section:
     - Centered uppercase heading with refined subtitle
     - 3 prominent circular icon badge columns:
         1. LICENSED — Hygiene, insurance, certified standards
         2. MASTERS  — 10+ years craft mastery and continuous training
         3. TRUSTED  — 4.9-star reputation with 15k+ satisfied clients
   ───────────────────────────────────────────────────────────────────────────── */

const REASONS = [
  {
    icon: ShieldCheck,
    title: "LICENSED",
    description:
      "Our team of licensed and insured barbers follow strict sterilization and hygiene protocols for a safe, comfortable, and immaculate grooming experience.",
  },
  {
    icon: Award,
    title: "MASTERS",
    description:
      "Our barbers and stylists boast 10+ years of dedicated craft experience, trained in both heritage barbering techniques and contemporary editorial trends.",
  },
  {
    icon: Star,
    title: "TRUSTED",
    description:
      "We hold an esteemed 4.9-star rating with over 15,000 satisfied clients who trust our punctual concierge appointments and meticulous attention to detail.",
  },
] as const;

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-[#FAF7F2] py-20 sm:py-24 lg:py-28 dark:bg-[#151311] border-b border-stone-200/60 dark:border-stone-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-[#8F6E2E] dark:text-[#C4A265] uppercase">
            UNCOMPROMISING STANDARDS
          </span>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider text-stone-900 uppercase dark:text-stone-50">
            WHY CHOOSE US
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light max-w-xl mx-auto leading-relaxed">
            From the quality of our blade edges to the warmth of our hot towels, every detail is considered for your absolute comfort.
          </p>
        </div>

        {/* ── 3 Circular Feature Cards (Reference Layout) ── */}
        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3 max-w-5xl mx-auto text-center">
          {REASONS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group flex flex-col items-center rounded-2xl border border-stone-200/80 bg-white p-8 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#C4A265]/50 hover:shadow-lg dark:border-stone-800 dark:bg-[#1C1A17]"
              >
                {/* Circular Icon Container */}
                <div className="flex size-16 items-center justify-center rounded-full bg-stone-900 text-[#C4A265] shadow-md transition-transform duration-300 group-hover:scale-110 dark:bg-[#12100E] dark:border dark:border-[#C4A265]/30">
                  <Icon className="size-7" />
                </div>

                {/* Title */}
                <h3 className="mt-6 font-heading text-lg font-bold tracking-widest text-stone-900 uppercase dark:text-stone-100">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-stone-500 dark:text-stone-400 font-light">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
