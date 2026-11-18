"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { MenuIcon, Scissors } from "lucide-react";

/* ───────────────────────────────────────────────
   Navigation links — single source of truth
   ─────────────────────────────────────────────── */
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
] as const;

/* ───────────────────────────────────────────────
   Navbar — sticky top bar with mobile sheet menu.
   Renders public links + auth buttons.
   ─────────────────────────────────────────────── */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2">
          <Scissors className="size-6 text-primary" />
          <span className="font-heading text-xl font-bold tracking-tight">
            Salon<span className="text-primary">Book</span>
          </span>
        </Link>

        {/* ── Desktop nav links ── */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Desktop auth buttons ── */}
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" render={<Link href="/signin" />}>
            Sign In
          </Button>
          <Button size="sm" render={<Link href="/signup" />}>
            Sign Up
          </Button>
        </div>

        {/* ── Mobile menu trigger ── */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="md:hidden" />
            }
          >
            <MenuIcon className="size-5" />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>

          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Scissors className="size-5 text-primary" />
                SalonBook
              </SheetTitle>
            </SheetHeader>

            <Separator />

            {/* ── Mobile nav links ── */}
            <nav className="flex flex-col gap-1 px-2 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Separator />

            {/* ── Mobile auth buttons ── */}
            <div className="flex flex-col gap-2 px-2 py-4">
              <Button
                variant="outline"
                className="w-full"
                render={<Link href="/signin" />}
                onClick={() => setMobileOpen(false)}
              >
                Sign In
              </Button>
              <Button
                className="w-full"
                render={<Link href="/signup" />}
                onClick={() => setMobileOpen(false)}
              >
                Sign Up
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
