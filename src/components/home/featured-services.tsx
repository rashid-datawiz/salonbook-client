import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ───────────────────────────────────────────────
   Featured Services — Displays a curated grid
   of salon services with price, duration, and
   category badges. Static placeholder data
   until the API is wired up.
   ─────────────────────────────────────────────── */

type Service = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: number; // minutes
  image: string;
};

/* Placeholder services — replace with API data later */
const FEATURED_SERVICES: Service[] = [
  {
    id: "1",
    name: "Classic Haircut & Styling",
    category: "Hair",
    description:
      "Expert cut and style tailored to your face shape and preferences. Includes wash and blow-dry.",
    price: 35,
    duration: 45,
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop&q=80",
  },
  {
    id: "2",
    name: "Bridal Makeup Package",
    category: "Makeup",
    description:
      "Complete bridal look with premium products. Includes trial session and touch-up kit.",
    price: 120,
    duration: 90,
    image:
      "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=600&h=400&fit=crop&q=80",
  },
  {
    id: "3",
    name: "Deep Conditioning Treatment",
    category: "Hair Care",
    description:
      "Intensive repair treatment for damaged hair. Restores moisture, shine, and strength.",
    price: 50,
    duration: 60,
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop&q=80",
  },
  {
    id: "4",
    name: "Luxury Facial Spa",
    category: "Skin Care",
    description:
      "Rejuvenating facial with cleansing, exfoliation, mask, and massage for glowing skin.",
    price: 65,
    duration: 75,
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop&q=80",
  },
  {
    id: "5",
    name: "Manicure & Pedicure Combo",
    category: "Nails",
    description:
      "Complete nail care package with shaping, cuticle care, polish, and relaxing hand/foot massage.",
    price: 45,
    duration: 60,
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=400&fit=crop&q=80",
  },
  {
    id: "6",
    name: "Hair Color & Highlights",
    category: "Hair",
    description:
      "Professional color application with premium dyes. Balayage, ombre, or full color available.",
    price: 80,
    duration: 120,
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=400&fit=crop&q=80",
  },
];

export default function FeaturedServices() {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">
            What We Offer
          </span>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Our Popular Services
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            From classic cuts to luxury spa treatments — explore our most booked
            services and find the perfect one for you.
          </p>
        </div>

        {/* Service cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_SERVICES.map((service) => (
            <Card
              key={service.id}
              className="group overflow-hidden transition-shadow hover:shadow-md"
            >
              {/* Service image */}
              <div className="relative aspect-[3/2] overflow-hidden bg-stone-100 dark:bg-stone-800">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <Badge className="absolute top-3 left-3 z-10" variant="secondary">
                  {service.category}
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="line-clamp-1">{service.name}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {service.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-primary">
                    ${service.price}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="size-3.5" />
                    {service.duration} min
                  </span>
                </div>
              </CardContent>

              <CardFooter>
                <Link
                  href={`/services/${service.id}`}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "ml-auto gap-1 text-primary hover:text-primary"
                  )}
                >
                  View Details
                  <ArrowRight className="size-3.5" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View all CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            View All Services
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
