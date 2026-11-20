"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  MenuIcon,
  Scissors,
  PhoneCall,
  Calendar,
  LogOut,
  ChevronDown,
  CalendarCheck,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "@/lib/auth-client";

/* ─────────────────────────────────────────────────────────────────────────────
   Navbar Component — Luxury Editorial Barbershop / Salon Aesthetic
   Includes session-aware user profile, dropdown menu, and sign-out integration.
   ───────────────────────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#why-us", label: "Why Choose Us" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#appointment", label: "Contact" },
] as const;

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

  // Scroll listener for translucent header blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sign out handler
  const handleSignOut = async () => {
    setIsSigningOut(true);
    setUserMenuOpen(false);
    setMobileOpen(false);
    try {
      await signOut();
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Sign out error:", err);
    } finally {
      setIsSigningOut(false);
    }
  };

  const userInitials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : session?.user?.email
    ? session.user.email[0].toUpperCase()
    : "U";

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
          {session?.user ? (
            /* Logged-In User Profile Pill & Dropdown */
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 py-1.5 pl-2 pr-3 text-xs font-medium text-stone-200 transition-colors hover:bg-white/10 hover:border-white/20 focus:outline-none"
              >
                {/* User Avatar */}
                <div className="flex size-7 items-center justify-center rounded-full bg-[#C4A265] text-[11px] font-bold text-stone-950 shadow-xs">
                  {userInitials}
                </div>

                <span className="max-w-[120px] truncate text-xs font-semibold text-white">
                  {session.user.name || session.user.email?.split("@")[0]}
                </span>

                <ChevronDown
                  className={cn(
                    "size-3.5 text-stone-400 transition-transform duration-200",
                    userMenuOpen && "rotate-180 text-white"
                  )}
                />
              </button>

              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl border border-white/10 bg-[#1A1815] p-2 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 z-50">
                  {/* User Info Header */}
                  <div className="p-3 border-b border-white/10">
                    <p className="text-xs font-bold text-white truncate">
                      {session.user.name || "Client"}
                    </p>
                    <p className="text-[11px] text-stone-400 truncate mt-0.5">
                      {session.user.email}
                    </p>
                    <div className="mt-2 inline-flex items-center gap-1 rounded bg-[#C4A265]/15 px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#C4A265] uppercase">
                      <span>{session.user.role === "admin" ? "Admin" : "Verified Client"}</span>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="py-1">
                    <Link
                      href="/my-appointments"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-stone-300 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <CalendarCheck className="size-4 text-[#C4A265]" />
                      <span>My Appointments</span>
                    </Link>

                    {session.user.role === "admin" && (
                      <Link
                        href="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-stone-300 transition-colors hover:bg-white/5 hover:text-white"
                      >
                        <ShieldCheck className="size-4 text-[#C4A265]" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                  </div>

                  <div className="border-t border-white/10 pt-1">
                    <button
                      type="button"
                      onClick={handleSignOut}
                      disabled={isSigningOut}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold tracking-wider text-red-400 uppercase transition-colors hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50"
                    >
                      {isSigningOut ? (
                        <>
                          <Loader2 className="size-4 animate-spin text-red-400" />
                          <span>SIGNING OUT...</span>
                        </>
                      ) : (
                        <>
                          <LogOut className="size-4 text-red-400" />
                          <span>SIGN OUT</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Guest Auth Buttons */
            <Link
              href="/signin"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "text-xs font-semibold tracking-wider text-stone-300 uppercase hover:bg-white/5 hover:text-white"
              )}
            >
              Sign In
            </Link>
          )}

          {/* Book Appointment CTA */}
          <Link
            href="/#appointment"
            className="inline-flex h-9 items-center gap-2 rounded-md bg-[#C4A265] px-4 py-2 text-xs font-bold tracking-wider text-stone-950 uppercase transition-colors hover:bg-[#B39154]"
          >
            <Calendar className="size-3.5" />
            <span>Book Appointment</span>
          </Link>
        </div>

        {/* ── Mobile Menu Trigger ── */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/#appointment"
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

                {/* Mobile User Header (If logged in) */}
                {session?.user && (
                  <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-full bg-[#C4A265] text-xs font-bold text-stone-950">
                        {userInitials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">
                          {session.user.name || "Client"}
                        </p>
                        <p className="text-[11px] text-stone-400 truncate">
                          {session.user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <Separator className="my-5 bg-stone-800" />

                {/* Mobile Navigation Links */}
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

                  {session?.user && (
                    <Link
                      href="/my-appointments"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-md px-3 py-2.5 text-xs font-semibold tracking-wider text-[#C4A265] uppercase transition-colors hover:bg-white/5"
                    >
                      My Appointments
                    </Link>
                  )}

                  {session?.user?.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-md px-3 py-2.5 text-xs font-semibold tracking-wider text-[#C4A265] uppercase transition-colors hover:bg-white/5"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                </nav>

                <Separator className="my-5 bg-stone-800" />

                {/* Mobile Action Buttons */}
                <div className="flex flex-col gap-2.5">
                  {session?.user ? (
                    <button
                      type="button"
                      onClick={handleSignOut}
                      disabled={isSigningOut}
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 text-xs font-semibold tracking-wider text-red-300 uppercase transition-colors hover:bg-red-500/20 disabled:opacity-50"
                    >
                      {isSigningOut ? (
                        <>
                          <Loader2 className="size-4 animate-spin text-red-400" />
                          <span>SIGNING OUT...</span>
                        </>
                      ) : (
                        <>
                          <LogOut className="size-4 text-red-400" />
                          <span>SIGN OUT</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <>
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
                    </>
                  )}
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
