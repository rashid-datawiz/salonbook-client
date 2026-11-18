import Link from "next/link";
import { Scissors, MapPin, Clock, Phone, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

/* ───────────────────────────────────────────────
   Footer — Logo, nav links, contact info,
   opening hours, social links, and copyright.
   ─────────────────────────────────────────────── */

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Browse Services" },
  { href: "/signin", label: "Sign In" },
  { href: "/signup", label: "Sign Up" },
] as const;

const SOCIAL_LINKS = [
  {
    href: "https://facebook.com",
    label: "Facebook",
    /* Inline SVG keeps the bundle small — no extra icon lib needed */
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.08 4.08 0 011.47.957c.456.456.75.91.957 1.47.163.46.35 1.26.403 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.08 4.08 0 01-.957 1.47 4.08 4.08 0 01-1.47.957c-.46.163-1.26.35-2.43.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.08 4.08 0 01-1.47-.957 4.08 4.08 0 01-.957-1.47c-.163-.46-.35-1.26-.403-2.43C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43a4.08 4.08 0 01.957-1.47A4.08 4.08 0 015.063 2.3c.46-.163 1.26-.35 2.43-.403C8.759 1.84 9.139 1.828 12 1.828V2.163zM12 0C8.741 0 8.333.014 7.053.072 5.775.13 4.902.333 4.14.63a5.88 5.88 0 00-2.126 1.384A5.88 5.88 0 00.63 4.14C.333 4.902.13 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.058 1.278.26 2.15.558 2.913a5.88 5.88 0 001.384 2.126A5.88 5.88 0 004.14 23.37c.763.297 1.635.5 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.278-.058 2.15-.26 2.913-.558a5.88 5.88 0 002.126-1.384 5.88 5.88 0 001.384-2.126c.297-.763.5-1.635.558-2.913.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.058-1.278-.26-2.15-.558-2.913a5.88 5.88 0 00-1.384-2.126A5.88 5.88 0 0019.86.63C19.097.333 18.225.13 16.947.072 15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
      </svg>
    ),
  },
  {
    href: "https://twitter.com",
    label: "Twitter / X",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
] as const;

export default function Footer() {
  return (
    <footer className="border-t bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* ── Brand column ── */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <Scissors className="size-6 text-primary" />
              <span className="font-heading text-xl font-bold tracking-tight">
                Salon<span className="text-primary">Book</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Your go-to destination for premium salon services. Book
              appointments effortlessly and experience the best care for your
              hair, skin, and style.
            </p>
          </div>

          {/* ── Quick links ── */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact info ── */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>Dhaka 1205, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-primary" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-primary" />
                <span>hello@salonbook.com</span>
              </li>
            </ul>
          </div>

          {/* ── Opening hours ── */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
              Opening Hours
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2.5">
                <Clock className="size-4 shrink-0 text-primary" />
                <span>Mon – Fri: 9:00 AM – 8:00 PM</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="size-4 shrink-0 text-primary" />
                <span>Saturday: 10:00 AM – 6:00 PM</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="size-4 shrink-0 text-primary" />
                <span>Sunday: Closed</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* ── Bottom row: social + copyright ── */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} SalonBook. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
