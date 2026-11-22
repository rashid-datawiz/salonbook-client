"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { XCircle, ArrowLeft, RefreshCw, ShieldAlert } from "lucide-react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

function PaymentCancelContent() {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("appointment_id");

  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:py-16">
      <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl dark:border-stone-800 dark:bg-[#1A1815]">
        {/* Header */}
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-8 text-center text-amber-800 dark:text-amber-200">
          <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400">
            <XCircle className="size-8 stroke-[2.5]" />
          </div>
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase">
            CHECKOUT CANCELLED
          </span>
          <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wider text-stone-900 dark:text-white">
            Payment Not Completed
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-light">
            No funds have been debited from your payment card.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4 text-xs leading-relaxed text-stone-600 dark:border-stone-800 dark:bg-stone-900/60 dark:text-stone-300 space-y-2">
            <div className="flex items-center gap-2 font-bold text-stone-900 dark:text-stone-100">
              <ShieldAlert className="size-4 text-amber-500 shrink-0" />
              <span>Your Appointment Slot is Still Reserved</span>
            </div>
            <p className="font-light">
              Your confirmed salon reservation has NOT been lost. It remains active in your customer dashboard with an{" "}
              <strong className="text-stone-900 dark:text-stone-100">Unpaid</strong> status.
            </p>
            {appointmentId && (
              <p className="font-mono text-[11px] text-stone-500">
                Reservation Reference: <span className="font-bold">{appointmentId}</span>
              </p>
            )}
          </div>

          <p className="text-[11px] text-stone-400 text-center font-light leading-relaxed">
            You may re-attempt Stripe Checkout at any time prior to your scheduled grooming slot.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/dashboard/customer?tab=appointments"
              className="flex-1 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#C4A265] text-xs font-bold tracking-widest text-stone-950 uppercase shadow-md transition-all hover:bg-[#B39154]"
            >
              <RefreshCw className="size-3.5" />
              <span>Retry in My Appointments</span>
            </Link>

            <Link
              href="/services"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-5 text-xs font-semibold tracking-wider text-stone-700 uppercase hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700 transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              <span>Back to Services</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[75vh] flex items-center justify-center bg-[#FDFBF7] dark:bg-[#12100E] px-4">
        <Suspense fallback={null}>
          <PaymentCancelContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
