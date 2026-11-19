import Link from "next/link";
import { Scissors, MapPin, Clock, Phone, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

/* ─────────────────────────────────────────────────────────────────────────────
   Footer Component — Luxury Dark Editorial Salon Aesthetic
   Includes brand identity with gold crest, navigation links,
   contact desk, opening hours, social links, and 2026 copyright.
   ───────────────────────────────────────────────────────────────────────────── */

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Browse Services" },
  { href: "#about", label: "Bespoke Concierge" },
  { href: "#why-us", label: "Why Choose Us" },
  { href: "#reviews", label: "Verified Reviews" },
  { href: "#appointment", label: "Book Appointment" },
] as const;

const POPULAR_SERVICES = [
  { href: "/services", label: "Adult Haircut & Styling" },
  { href: "/services", label: "Kids Precision Cut" },
  { href: "/services", label: "Beard Sculpting & Shave" },
  { href: "/services", label: "Scalp Moisturizing Ritual" },
  { href: "/services", label: "Executive Glow Facial" },
  { href: "/services", label: "Bridal & Red-Carpet Prep" },
] as const;

const SOCIAL_LINKS = [
  {
    href: "https://facebook.com",
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4.5">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4.5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.08 4.08 0 011.47.957c.456.456.75.91.957 1.47.163.46.35 1.26.403 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.08 4.08 0 01-.957 1.47 4.08 4.08 0 01-1.47.957c-.46.163-1.26.35-2.43.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.08 4.08 0 01-1.47-.957 4.08 4.08 0 01-.957-1.47c-.163-.46-.35-1.26-.403-2.43C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43a4.08 4.08 0 01.957-1.47A4.08 4.08 0 015.063 2.3c.46-.163 1.26-.35 2.43-.403C8.759 1.84 9.139 1.828 12 1.828V2.163zM12 0C8.741 0 8.333.014 7.053.072 5.775.13 4.902.333 4.14.63a5.88 5.88 0 00-2.126 1.384A5.88 5.88 0 00.63 4.14C.333 4.902.13 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.058 1.278.26 2.15.558 2.913a5.88 5.88 0 001.384 2.126A5.88 5.88 0 004.14 23.37c.763.297 1.635.5 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.278-.058 2.15-.26 2.913-.558a5.88 5.88 0 002.126-1.384 5.88 5.88 0 001.384-2.126c.297-.763.5-1.635.558-2.913.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.058-1.278-.26-2.15-.558-2.913a5.88 5.88 0 00-1.384-2.126A5.88 5.88 0 0019.86.63C19.097.333 18.225.13 16.947.072 15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
      </svg>
    ),
  },
  {
    href: "https://twitter.com",
    label: "Twitter / X",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4.5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: "https://pinterest.com",
    label: "Pinterest",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4.5">
        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.357-.053.211-.174.256-.402.155-1.499-.696-2.435-2.88-2.435-4.637 0-3.775 2.743-7.243 7.906-7.243 4.15 0 7.374 2.957 7.374 6.908 0 4.123-2.599 7.44-6.207 7.44-1.212 0-2.352-.63-2.743-1.377l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4.5">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0E0C0B] text-stone-300">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        
        {/* ── Top 4-Column Grid ── */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          
          {/* Brand Info */}
          <div className="space-y-4 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-[#C4A265]/20 text-[#C4A265] border border-[#C4A265]/40">
                <Scissors className="size-4.5" />
              </div>
              <span className="font-heading text-xl font-bold tracking-widest text-white uppercase">
                SALON<span className="text-[#C4A265]">BOOK</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed max-w-sm">
              The premier destination for bespoke salon rituals and concierge grooming services.
              Elevating personal care with certified master artisans, private suites, and seamless online scheduling.
            </p>

            <div className="pt-2">
              <span className="inline-block rounded-full border border-[#C4A265]/30 bg-[#C4A265]/10 px-3 py-1 text-[11px] font-semibold tracking-wider text-[#E5C98F] uppercase">
                Dhaka Flagship Sanctuary
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="mb-4 font-heading text-xs font-bold tracking-[0.2em] uppercase text-white">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-stone-400 transition-colors hover:text-[#C4A265]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Services */}
          <div className="lg:col-span-3">
            <h4 className="mb-4 font-heading text-xs font-bold tracking-[0.2em] uppercase text-white">
              POPULAR RITUALS
            </h4>
            <ul className="space-y-2.5">
              {POPULAR_SERVICES.map((service, idx) => (
                <li key={idx}>
                  <Link
                    href={service.href}
                    className="text-xs text-stone-400 transition-colors hover:text-[#C4A265]"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-4 lg:col-span-3">
            <h4 className="font-heading text-xs font-bold tracking-[0.2em] uppercase text-white">
              CONCIERGE DESK
            </h4>
            
            <ul className="space-y-3 text-xs text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="size-4 shrink-0 text-[#C4A265] mt-0.5" />
                <span>1801 Convention Blvd, Banani, Dhaka</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-[#C4A265]" />
                <span className="font-mono text-stone-300">+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-[#C4A265]" />
                <span>concierge@salonbook.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="size-4 shrink-0 text-[#C4A265]" />
                <span>Mon – Sat: 9:00 AM – 8:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        <Separator className="my-10 bg-white/10" />

        {/* ── Bottom Bar: Copyright & Social Links (Reference Layout) ── */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-stone-500 font-light">
            &copy; 2026 SalonBook. All rights reserved. Premium Salon &amp; Concierge Grooming.
          </p>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex size-8 items-center justify-center rounded-full bg-white/5 text-stone-400 transition-colors hover:bg-[#C4A265] hover:text-stone-950"
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
