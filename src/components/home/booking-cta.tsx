import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarDays, ArrowRight } from "lucide-react";

/* ───────────────────────────────────────────────
   Booking CTA — A warm, inviting call-to-action
   encouraging visitors to book their first
   appointment or create an account.
   ─────────────────────────────────────────────── */
export default function BookingCta() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[oklch(0.35_0.06_15)] to-[oklch(0.25_0.04_30)]">
      {/* Subtle decorative circles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-32 size-80 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:py-24">
        <CalendarDays className="mx-auto mb-4 size-10 text-white/60" />

        <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready for Your New Look?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
          Join hundreds of happy clients who book with SalonBook every week.
          Pick your service, choose a time, and let us handle the rest.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            render={<Link href="/services" />}
            className="gap-2 px-6 text-sm"
          >
            Book an Appointment
            <ArrowRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            render={<Link href="/signup" />}
            className="border-white/20 bg-white/5 px-6 text-sm text-white hover:bg-white/10 hover:text-white"
          >
            Sign Up Free
          </Button>
        </div>
      </div>
    </section>
  );
}
