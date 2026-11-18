import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

/* ───────────────────────────────────────────────
   Testimonials — Social proof section showing
   real customer reviews in a responsive grid.
   ─────────────────────────────────────────────── */

type Testimonial = {
  name: string;
  avatar: string;
  role: string;
  rating: number;
  text: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Fatima Rahman",
    avatar: "",
    role: "Regular Client",
    rating: 5,
    text: "The booking process is so smooth! I love being able to pick my time slot and stylist. The service quality is always top-notch.",
  },
  {
    name: "Ahmed Hossain",
    avatar: "",
    role: "New Client",
    rating: 5,
    text: "Best haircut I've had in years. The online booking saved me from waiting in line. Highly recommend SalonBook!",
  },
  {
    name: "Nusrat Jahan",
    avatar: "",
    role: "Regular Client",
    rating: 4,
    text: "I booked a bridal package and the team went above and beyond. Professional, friendly, and incredibly talented.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">
            Testimonials
          </span>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Don&apos;t just take our word for it — hear from people who trust us
            with their style.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Card
              key={t.name}
              className="border-transparent shadow-none bg-secondary/40"
            >
              <CardContent className="space-y-4 pt-6">
                {/* Star rating */}
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${
                        i < t.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Reviewer info */}
                <div className="flex items-center gap-3 pt-2">
                  <Avatar size="default">
                    {t.avatar ? (
                      <AvatarImage src={t.avatar} alt={t.name} />
                    ) : null}
                    <AvatarFallback>
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
