import Link from "next/link";
import { Scissors, ArrowLeft } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   AuthLayout Component
   Shared wrapper for authentication pages (/signin, /signup).
   Provides luxury dark atmosphere, brand header, and return-to-home navigation.
   ───────────────────────────────────────────────────────────────────────────── */

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen bg-[#12100E] text-stone-100 flex flex-col justify-between selection:bg-[#C4A265] selection:text-stone-950">
      {/* ── Ambient Radial Lighting Blooms ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 size-[40rem] rounded-full bg-radial-[ellipse_at_center] from-[#C4A265]/10 via-transparent to-transparent blur-3xl -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-10 size-[30rem] rounded-full bg-[#1F1C18]/40 blur-3xl -z-10"
      />

      {/* ── Top Header Bar ── */}
      <header className="w-full border-b border-white/5 bg-[#12100E]/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#C4A265]/15 text-[#C4A265] border border-[#C4A265]/30 transition-transform duration-300 group-hover:scale-105">
              <Scissors className="size-4" />
            </div>
            <span className="font-heading text-lg font-bold tracking-widest text-white uppercase">
              SALON<span className="text-[#C4A265]">BOOK</span>
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-stone-400 uppercase transition-colors hover:text-white"
          >
            <ArrowLeft className="size-3.5" />
            <span>Return to Home</span>
          </Link>
        </div>
      </header>

      {/* ── Main Content Area ── */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* ── Minimal Bottom Footer ── */}
      <footer className="w-full border-t border-white/5 py-4 text-center text-xs text-stone-500 font-light">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>&copy; 2026 SalonBook. All rights reserved.</p>
          <div className="flex items-center gap-4 text-stone-500">
            <Link href="/" className="hover:text-stone-300 transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-stone-300 transition-colors">Terms of Service</Link>
            <Link href="/#appointment" className="hover:text-stone-300 transition-colors">Concierge Desk</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
