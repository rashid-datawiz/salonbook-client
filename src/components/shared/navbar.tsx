"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { MenuIcon, Scissors, PhoneCall, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

/* ───────────────────────────────────────────────
   Navigation links — single source of truth
   ─────────────────────────────────────────────── */
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#why-us", label: "Why Choose Us" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#appointment", label: "Appointment" },
] as const;

/* ───────────────────────────────────────────────
   Navbar — Sticky luxury bar with dark aesthetic
   and gold accents inspired by high-end salons.
   ─────────────────────────────────────────────── */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-[#141210]/95 backdrop-blur-md shadow-lg border-b border-white/10 py-0"
          : "bg-[#141210]/90 backdrop-blur-sm border-b border-white/5 py-1"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ── Brand Logo ── */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-[#C4A265]/15 text-[#C4A265] ring-1 ring-[#C4A265]/30 transition-all duration-300 group-hover:bg-[#C4A265] group-hover:text-stone-950">
            <Scissors className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-xl font-bold tracking-wider text-white uppercase">
              Salon<span className="text-[#C4A265]">Book</span>
            </span>
            <span className="text-[9px] tracking-[0.2em] uppercase text-stone-400">
              Luxury Grooming & Spa
            </span>
          </div>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3.5 py-2 text-xs font-semibold tracking-wider text-stone-300 uppercase transition-colors hover:text-[#C4A265] hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Desktop Actions & Contact ── */}
        <div className="hidden items-center gap-3 sm:flex">
          {/* Quick Phone Call Pill */}
          <a
            href="tel:+8801234567890"
            className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-stone-300 transition-colors hover:border-[#C4A265]/50 hover:text-white xl:flex"
          >
            <PhoneCall className="size-3.5 text-[#C4A265]" />
            <span className="font-mono text-[11px]">+880 1234-567890</span>
          </a>

          <Link
            href="/signin"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "text-xs font-semibold tracking-wider uppercase text-stone-300 hover:text-white hover:bg-white/10"
            )}
          >
            Sign In
          </Link>

          {/* Luxury Gold CTA */}
          <Link
            href="/services"
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[#C4A265] px-4 text-xs font-bold tracking-wider text-stone-950 uppercase shadow-sm transition-all duration-200 hover:bg-[#d5b579] hover:shadow-md active:scale-95"
          >
            <Calendar className="size-3.5" />
            <span>Book Now</span>
          </Link>
        </div>

        {/* ── Mobile Menu Trigger ── */}
        <div className="flex items-center gap-2 sm:hidden">
          <Link
            href="/services"
            className="inline-flex h-8 items-center rounded bg-[#C4A265] px-2.5 text-[11px] font-bold uppercase text-stone-950"
          >
            Book
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-stone-300 hover:text-white hover:bg-white/10"
                />
              }
            >
              <MenuIcon className="size-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-72 border-stone-800 bg-[#161412] text-stone-100"
            >
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-white">
                  <Scissors className="size-5 text-[#C4A265]" />
                  <span className="font-heading tracking-wider uppercase">
                    Salon<span className="text-[#C4A265]">Book</span>
                  </span>
                </SheetTitle>
              </SheetHeader>

              <Separator className="my-4 bg-stone-800" />

              {/* ── Mobile Nav Links ── */}
              <nav className="flex flex-col gap-1 px-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-2.5 text-xs font-semibold tracking-wider uppercase text-stone-300 transition-colors hover:bg-white/5 hover:text-[#C4A265]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <Separator className="my-4 bg-stone-800" />

              {/* ── Mobile Auth Buttons ── */}
              <div className="flex flex-col gap-2.5 px-1">
                <Link
                  href="/signin"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full border-stone-700 bg-transparent text-xs font-semibold tracking-wider text-stone-200 uppercase hover:bg-white/10 hover:text-white"
                  )}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-full items-center justify-center rounded-md bg-[#C4A265] text-xs font-bold tracking-wider text-stone-950 uppercase transition-colors hover:bg-[#d5b579]"
                >
                  Create Account
                </Link>
              </div>

              {/* Mobile Quick Contact */}
              <div className="mt-8 rounded-lg border border-stone-800 bg-stone-900/60 p-3.5 text-xs text-stone-400">
                <p className="font-semibold text-stone-300">Concierge Desk</p>
                <p className="mt-1 font-mono text-[11px]">+880 1234-567890</p>
                <p className="mt-0.5 text-[11px]">Mon – Sat: 9AM – 8PM</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
