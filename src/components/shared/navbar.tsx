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

/* ─────────────────────────────────────────────────────────────────────────────
   Navbar Component — Luxury Editorial Barbershop / Salon Aesthetic
   Dark translucent header with warm champagne-gold accents.
   Smooth scroll listener, accessible mobile drawer, zero hydration warnings.
   ───────────────────────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#why-us", label: "Why Choose Us" },
  { href: "#reviews", label: "Reviews" },
  { href: "#appointment", label: "Contact" },
] as const;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-[#141210]/95 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-[#141210]/80 backdrop-blur-sm border-b border-white/5"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ── Brand Logo ── */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-[#C4A265]/15 text-[#C4A265] border border-[#C4A265]/30 transition-transform duration-300 group-hover:scale-105">
            <Scissors className="size-4.5" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg sm:text-xl font-bold tracking-widest text-white uppercase leading-none">
              SALON<span className="text-[#C4A265]">BOOK</span>
            </span>
            <span className="text-[9px] tracking-[0.25em] text-stone-400 uppercase font-medium mt-0.5">
              EST. 2024 · LUXURY GROOMING
            </span>
          </div>
        </Link>

        {/* ── Desktop Navigation Links ── */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3.5 py-2 text-xs font-semibold tracking-wider text-stone-300 uppercase transition-colors hover:text-[#C4A265]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Desktop Auth & Quick Book Actions ── */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/signin"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "text-xs font-semibold tracking-wider text-stone-300 uppercase hover:bg-white/5 hover:text-white"
            )}
          >
            Sign In
          </Link>
          <Link
            href="#appointment"
            className="inline-flex h-9 items-center gap-2 rounded-md bg-[#C4A265] px-4 py-2 text-xs font-bold tracking-wider text-stone-950 uppercase transition-colors hover:bg-[#B39154]"
          >
            <Calendar className="size-3.5" />
            <span>Book Appointment</span>
          </Link>
        </div>

        {/* ── Mobile Menu Trigger ── */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="#appointment"
            className="inline-flex h-8 items-center rounded bg-[#C4A265] px-2.5 text-[11px] font-bold tracking-wider text-stone-950 uppercase"
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
              className="w-80 border-stone-800 bg-[#141210] text-stone-100 p-6 flex flex-col justify-between"
            >
              <div>
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2.5 text-white">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-[#C4A265]/15 text-[#C4A265] border border-[#C4A265]/30">
                      <Scissors className="size-4" />
                    </div>
                    <span className="font-heading tracking-widest text-lg font-bold uppercase">
                      SALON<span className="text-[#C4A265]">BOOK</span>
                    </span>
                  </SheetTitle>
                </SheetHeader>

                <Separator className="my-5 bg-stone-800" />

                {/* Mobile Links */}
                <nav className="flex flex-col gap-1.5">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-md px-3 py-2.5 text-xs font-semibold tracking-wider text-stone-300 uppercase transition-colors hover:bg-white/5 hover:text-[#C4A265]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <Separator className="my-5 bg-stone-800" />

                {/* Mobile Action Buttons */}
                <div className="flex flex-col gap-2.5">
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
                    className="flex h-10 w-full items-center justify-center rounded-md bg-[#C4A265] text-xs font-bold tracking-wider text-stone-950 uppercase transition-colors hover:bg-[#B39154]"
                  >
                    Create Account
                  </Link>
                </div>
              </div>

              {/* Mobile Quick Contact Desk Info */}
              <div className="rounded-lg border border-stone-800/80 bg-stone-900/60 p-4 text-xs text-stone-400">
                <div className="flex items-center gap-2 text-stone-300 font-semibold mb-1">
                  <PhoneCall className="size-3.5 text-[#C4A265]" />
                  <span>Concierge Hotline</span>
                </div>
                <p className="font-mono text-stone-200 text-xs">+880 1234-567890</p>
                <p className="text-[11px] text-stone-400 mt-1">Mon – Sat: 9:00 AM – 8:00 PM</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
