import Image from "next/image";
import { Star, CheckCircle2 } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   Testimonials Component (Assignment Doc: Customer Testimonials & Reviews)
   Inspired by the reference image's social proof rating layout:
     - Left: Google Reviews rating badge (4.9 rating, 5 stars, 750 reviews)
     - Center: Featured Client Testimonial card with client photo & quote
     - Right: TripAdvisor rating badge (5.0 rating, 5 stars, 500 reviews)
     - Bottom: Additional verified client reviews
   ───────────────────────────────────────────────────────────────────────────── */

type ClientReview = {
  name: string;
  role: string;
  rating: number;
  title: string;
  comment: string;
  avatar: string;
};

const ADDITIONAL_REVIEWS: ClientReview[] = [
  {
    name: "Fatima Rahman",
    role: "Verified Client · Banani",
    rating: 5,
    title: "FLAWLESS BRIDAL STYLING",
    comment:
      "The concierge team arrived right on schedule for my bridal party. Calming demeanor, exquisite artistry, and zero stress on my big day.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&q=80",
  },
  {
    name: "Ahmed Hossain",
    role: "Executive Member · Gulshan",
    rating: 5,
    title: "THE ULTIMATE TIME SAVER",
    comment:
      "Having a master barber come directly to my office before an executive summit is an absolute game-changer. Impeccable hot towel shave.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80",
  },
  {
    name: "Nusrat Jahan",
    role: "Regular Client · Dhanmondi",
    rating: 5,
    title: "CONSISTENT ARTISTRY",
    comment:
      "I have booked my hair color and scalp treatments through SalonBook for over a year now. The stylist matching and ease of booking is unparalleled.",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&q=80",
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="bg-[#FAF7F2] py-20 sm:py-24 lg:py-28 dark:bg-[#151311] border-b border-stone-200/60 dark:border-stone-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-[#8F6E2E] dark:text-[#C4A265] uppercase">
            CLIENT SATISFACTION
          </span>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider text-stone-900 uppercase dark:text-stone-50">
            WHAT OUR CLIENTS SAY
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light max-w-xl mx-auto leading-relaxed">
            Rated 4.9+ across independent platforms. Discover why discerning clients trust SalonBook for their signature looks.
          </p>
        </div>

        {/* ── Triple Social Proof Row (Reference Layout) ── */}
        <div className="mt-16 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 max-w-5xl mx-auto">
          
          {/* Left: Google Rating Badge */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-stone-200/90 bg-white p-6 sm:p-8 shadow-xs text-center lg:col-span-3 dark:border-stone-800 dark:bg-[#1C1A17]">
            {/* Google Icon */}
            <div className="flex size-10 items-center justify-center">
              <svg className="size-8" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            </div>
            <span className="mt-2 text-xs font-bold tracking-widest text-stone-500 uppercase">
              GOOGLE
            </span>
            <span className="mt-2 font-heading text-4xl sm:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
              4.9
            </span>
            <div className="mt-2 flex items-center gap-1 text-[#C4A265]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-[#C4A265] text-[#C4A265]" />
              ))}
            </div>
            <span className="mt-2 text-xs text-stone-400 font-medium">
              750+ verified reviews
            </span>
          </div>

          {/* Center: Featured Client Testimonial Card */}
          <div className="relative rounded-2xl border-2 border-[#C4A265]/40 bg-white p-8 sm:p-10 shadow-xl text-center lg:col-span-6 dark:border-[#C4A265]/30 dark:bg-[#1E1B18]">
            {/* Client Avatar */}
            <div className="mx-auto size-16 overflow-hidden rounded-full border-2 border-[#C4A265] shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&q=80"
                alt="David Bentley - Executive Client"
                width={64}
                height={64}
                className="size-full object-cover"
              />
            </div>

            {/* Stars */}
            <div className="mt-4 flex items-center justify-center gap-1 text-[#C4A265]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4.5 fill-[#C4A265] text-[#C4A265]" />
              ))}
            </div>

            {/* Review Headline */}
            <h3 className="mt-3 font-heading text-lg sm:text-xl font-bold tracking-wider text-stone-900 uppercase dark:text-stone-50">
              THE BEST BARBER SERVICES
            </h3>

            {/* Quote */}
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-300 font-light italic">
              &ldquo;I booked the executive concierge package before my keynote address.
              The barber was exceptionally courteous, arrived equipped with clean sterilized tools,
              and delivered a master cut with razor-sharp edges. Truly unmatched service.&rdquo;
            </p>

            {/* Client signature */}
            <div className="mt-5 flex items-center justify-center gap-2">
              <span className="text-xs font-bold tracking-widest text-stone-900 uppercase dark:text-stone-100">
                DAVID BENTLEY
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                <CheckCircle2 className="size-3" />
                Verified
              </span>
            </div>
          </div>

          {/* Right: TripAdvisor / Trust Rating Badge */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-stone-200/90 bg-white p-6 sm:p-8 shadow-xs text-center lg:col-span-3 dark:border-stone-800 dark:bg-[#1C1A17]">
            {/* TripAdvisor Owl Icon */}
            <div className="flex size-10 items-center justify-center text-emerald-600 dark:text-emerald-400">
              <svg className="size-8" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="6.5" cy="14.5" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="6.5" cy="14.5" r="1.5" />
                <circle cx="17.5" cy="14.5" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="17.5" cy="14.5" r="1.5" />
                <path d="M12 5c-4.4 0-8 2.2-8 5 0 .6.2 1.2.5 1.8 1-1.1 2.4-1.8 4-1.8 2.4 0 4.4 1.5 5 3.6.6-2.1 2.6-3.6 5-3.6 1.6 0 3 .7 4 1.8.3-.6.5-1.2.5-1.8 0-2.8-3.6-5-8-5z" />
                <path d="M12 9l-2 3h4l-2-3z" />
              </svg>
            </div>
            <span className="mt-2 text-xs font-bold tracking-widest text-stone-500 uppercase">
              TRIPADVISOR
            </span>
            <span className="mt-2 font-heading text-4xl sm:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
              5.0
            </span>
            <div className="mt-2 flex items-center gap-1 text-[#C4A265]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-[#C4A265] text-[#C4A265]" />
              ))}
            </div>
            <span className="mt-2 text-xs text-stone-400 font-medium">
              500+ top ratings
            </span>
          </div>

        </div>

        {/* ── Additional Client Testimonials Grid ── */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-5xl mx-auto">
          {ADDITIONAL_REVIEWS.map((review) => (
            <div
              key={review.name}
              className="rounded-xl border border-stone-200/80 bg-white p-6 shadow-2xs dark:border-stone-800 dark:bg-[#1A1815] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#C4A265]">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-[#C4A265] text-[#C4A265]" />
                  ))}
                </div>
                <h4 className="mt-3 font-heading text-sm font-bold tracking-wider text-stone-900 dark:text-stone-100 uppercase">
                  {review.title}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
                <Image
                  src={review.avatar}
                  alt={review.name}
                  width={36}
                  height={36}
                  className="size-9 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs font-bold text-stone-900 dark:text-stone-100">{review.name}</p>
                  <p className="text-[10px] text-stone-400">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
