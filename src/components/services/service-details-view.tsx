"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  Sparkles,
  Star,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Scissors,
  User,
  Check,
  Loader2,
  ChevronRight,
  ShieldAlert,
  Lock,
} from "lucide-react";
import { Service } from "@/data/services";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { createBackendAppointment } from "@/lib/api";

/* ─────────────────────────────────────────────────────────────────────────────
   Predefined Salon Time Slots (Assignment Doc Specification)
   ───────────────────────────────────────────────────────────────────────────── */
const TIME_SLOTS = [
  "09:30 AM",
  "10:30 AM",
  "11:30 AM",
  "01:00 PM",
  "02:30 PM",
  "04:00 PM",
  "05:30 PM",
  "07:00 PM",
] as const;

/**
 * Safely computes local ISO date (YYYY-MM-DD) avoiding SSR timezone offset mismatches.
 */
function getLocalISODate(offsetDays = 0): string {
  try {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  } catch {
    return "";
  }
}

// React 19 external store helpers for hydration-safe client date resolution
const emptySubscribe = () => () => {};
let cachedToday = "";
let cachedTomorrow = "";

function getClientToday(): string {
  if (!cachedToday) {
    cachedToday = getLocalISODate(0);
  }
  return cachedToday;
}

function getClientTomorrow(): string {
  if (!cachedTomorrow) {
    cachedTomorrow = getLocalISODate(1);
  }
  return cachedTomorrow;
}

const getServerDateSnapshot = () => "";

interface ServiceDetailsViewProps {
  service: Service;
}

export default function ServiceDetailsView({ service }: ServiceDetailsViewProps) {
  const router = useRouter();
  const { data: session } = useSession();

  // Booking Form State — React 19 hydration-safe store sync for local client dates
  const clientToday = useSyncExternalStore(emptySubscribe, getClientToday, getServerDateSnapshot);
  const clientTomorrow = useSyncExternalStore(emptySubscribe, getClientTomorrow, getServerDateSnapshot);

  const [userPickedDate, setUserPickedDate] = useState<string>("");
  const appointmentDate = userPickedDate || clientTomorrow;

  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("11:30 AM");
  const [additionalMessage, setAdditionalMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<{
    appointmentId: string;
    date: string;
    time: string;
  } | null>(null);

  const isAuthenticated = Boolean(session?.user);
  const isAdmin = session?.user?.role === "admin";

  /* ── Submit Appointment Request Handler ── */
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Rule: Guests must be authenticated
    if (!isAuthenticated) {
      router.push(`/signin?callbackUrl=/services/${service.id}`);
      return;
    }

    // Rule: Admins cannot submit customer appointments
    if (isAdmin) {
      setErrorMessage(
        "Administrators cannot book customer appointments. Please use a customer account."
      );
      return;
    }

    // Rule: Prevent booking inactive services
    if (!service.isActive) {
      setErrorMessage("This service is currently inactive and unavailable for booking.");
      return;
    }

    // Validation: Date & Time required
    const targetDate = appointmentDate || getLocalISODate(1);
    if (!targetDate) {
      setErrorMessage("Please select a valid appointment date.");
      return;
    }

    if (!selectedTimeSlot) {
      setErrorMessage("Please choose a preferred time slot.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Call backend to store in MongoDB
      const res = await createBackendAppointment(
        {
          serviceId: service.id,
          serviceName: service.name,
          servicePrice: service.price,
          category: service.category,
          image: service.image,
          appointmentDate: targetDate,
          timeSlot: selectedTimeSlot,
          message: additionalMessage.trim(),
        },
        session?.user
      );

      const newAppointmentId = res.appointment?._id || `apt-${Date.now().toString().slice(-4)}`;

      // Save appointment to client storage for persistence across customer dashboard
      if (typeof window !== "undefined") {
        const existingRaw = localStorage.getItem("salonbook_saved_appointments");
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
        const newRecord = {
          id: newAppointmentId,
          serviceId: service.id,
          serviceName: service.name,
          category: service.category,
          image: service.image,
          date: targetDate,
          time: selectedTimeSlot,
          requestDate: getLocalISODate(0),
          price: service.price,
          status: "Pending", // Default status per doc
          payment: "Unpaid", // Default payment status per doc
          stylist: "Master Artisan",
          notes: additionalMessage.trim() || undefined,
        };
        localStorage.setItem(
          "salonbook_saved_appointments",
          JSON.stringify([newRecord, ...existing])
        );
      }

      setBookingSuccess({
        appointmentId: newAppointmentId,
        date: targetDate,
        time: selectedTimeSlot,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unable to submit appointment request. Please try again.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#12100E] text-stone-900 dark:text-stone-100 transition-colors">
      
      {/* ── Breadcrumb Navigation ── */}
      <nav aria-label="Breadcrumb" className="border-b border-stone-200/80 bg-white/80 dark:border-stone-800 dark:bg-[#161412]/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-xs font-medium text-stone-500 dark:text-stone-400 overflow-x-auto">
          <Link href="/" className="hover:text-stone-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="size-3.5 text-stone-400 shrink-0" />
          <Link href="/services" className="hover:text-stone-900 dark:hover:text-white transition-colors">
            Services
          </Link>
          <ChevronRight className="size-3.5 text-stone-400 shrink-0" />
          <Link
            href={`/services?category=${encodeURIComponent(service.category)}`}
            className="hover:text-stone-900 dark:hover:text-white transition-colors"
          >
            {service.category}
          </Link>
          <ChevronRight className="size-3.5 text-stone-400 shrink-0" />
          <span className="text-stone-900 dark:text-stone-200 font-semibold truncate max-w-[200px]">
            {service.name}
          </span>
        </div>
      </nav>

      {/* ── Main Content Container (2-Column Luxury Editorial Grid) ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white uppercase transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to All Services</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ──────────────────────────────────────────────────────────────────
             LEFT COLUMN (7 cols): Image, Category, Specs & Full Ritual Narrative
             ────────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Service Header Info */}
            <div>
              <div className="flex flex-wrap items-center gap-3">
                {/* Category Badge */}
                <span className="rounded-full bg-[#C4A265]/15 border border-[#C4A265]/30 px-3.5 py-1 text-xs font-bold tracking-wider text-[#8F6E2E] dark:text-[#C4A265] uppercase">
                  {service.category}
                </span>

                {/* Active / Inactive Status Badge */}
                {service.isActive ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Active Ritual</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                    <AlertCircle className="size-3" />
                    <span>Currently Inactive</span>
                  </span>
                )}

                {service.isPopular && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 px-3 py-0.5 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="size-3 text-[#C4A265]" />
                    <span>Guest Favorite</span>
                  </span>
                )}
              </div>

              <h1 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 uppercase dark:text-stone-50">
                {service.name}
              </h1>

              {/* Rating and Duration Subtitle */}
              <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-stone-500 dark:text-stone-400 pb-6 border-b border-stone-200/80 dark:border-stone-800">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center text-[#C4A265]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>
                  <strong className="text-stone-900 dark:text-stone-100 font-bold ml-1">
                    {service.rating}
                  </strong>
                  <span>({service.reviewsCount} verified reviews)</span>
                </div>

                <span className="hidden sm:inline text-stone-300 dark:text-stone-700">•</span>

                <div className="flex items-center gap-1.5 font-medium text-stone-700 dark:text-stone-300">
                  <Clock className="size-4 text-[#C4A265]" />
                  <span>Estimated Duration: {service.duration} Minutes</span>
                </div>
              </div>
            </div>

            {/* High-Resolution Hero Visual */}
            <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-lg dark:border-stone-800 dark:bg-stone-900">
              <Image
                src={service.image}
                alt={service.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <span className="text-xs font-mono tracking-wider uppercase text-stone-200 backdrop-blur-md bg-stone-950/60 px-3 py-1 rounded-md border border-white/10">
                  SalonBook Signature Session
                </span>
                <span className="text-xs font-mono font-bold text-[#C4A265] backdrop-blur-md bg-stone-950/60 px-3 py-1 rounded-md border border-white/10">
                  ${service.price} USD
                </span>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="rounded-2xl border border-stone-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-stone-800 dark:bg-[#1A1815]">
              <h2 className="font-heading text-xl font-bold uppercase tracking-wider text-stone-900 dark:text-white">
                The Ritual Experience
              </h2>
              <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light leading-relaxed">
                {service.description}
              </p>
              <p className="mt-3 text-sm text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                {service.shortDescription}
              </p>

              {/* What's Included / Checklist */}
              {service.features && service.features.length > 0 && (
                <div className="mt-8 pt-6 border-t border-stone-100 dark:border-stone-800/80">
                  <h3 className="text-xs font-bold tracking-widest text-[#8F6E2E] dark:text-[#C4A265] uppercase mb-4">
                    WHAT IS INCLUDED IN THIS SESSION
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                        <CheckCircle2 className="size-4 shrink-0 text-[#C4A265] mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sanitation & Master Quality Seal */}
            <div className="rounded-2xl border border-stone-200/80 bg-stone-50 p-6 dark:border-stone-800 dark:bg-[#161412] flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#C4A265]/15 text-[#C4A265] border border-[#C4A265]/30">
                <Scissors className="size-6" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-stone-900 dark:text-white uppercase tracking-wider">
                  Guaranteed Clean Instruments &amp; Certified Artisans
                </p>
                <p className="mt-0.5 text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                  Every ritual uses autoclave-sterilized shears, single-use fresh blades, and organic certified apothecary skin products.
                </p>
              </div>
            </div>

          </div>

          {/* ──────────────────────────────────────────────────────────────────
             RIGHT COLUMN (5 cols): Sticky Appointment Booking Panel
             ────────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 sticky top-24">
            
            <div className="rounded-2xl border border-stone-200/90 bg-white p-6 sm:p-8 shadow-xl dark:border-stone-800 dark:bg-[#1A1815]">
              
              {/* Top Pricing Summary */}
              <div className="flex items-baseline justify-between pb-6 border-b border-stone-200/80 dark:border-stone-800">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400">
                    Service Fee
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-white">
                      ${service.price}
                    </span>
                    <span className="text-xs font-mono text-stone-500 uppercase">USD</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400">
                    Duration
                  </span>
                  <p className="mt-0.5 font-mono text-sm font-bold text-stone-800 dark:text-stone-200">
                    {service.duration} mins
                  </p>
                </div>
              </div>

              {/* Status Notice if Inactive */}
              {!service.isActive && (
                <div
                  role="alert"
                  className="mt-6 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-700 dark:text-amber-300"
                >
                  <ShieldAlert className="size-5 shrink-0 text-amber-500 mt-0.5" />
                  <div>
                    <strong className="block font-bold uppercase tracking-wider">
                      Currently Unavailable
                    </strong>
                    <span className="mt-0.5 block leading-relaxed font-light">
                      This service is currently marked inactive by salon management. New appointment requests cannot be accepted at this time.
                    </span>
                  </div>
                </div>
              )}

              {/* Error Notice */}
              {errorMessage && (
                <div
                  role="alert"
                  className="mt-6 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-600 dark:text-red-300"
                >
                  <AlertCircle className="size-4 shrink-0 text-red-500 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Success Confirmation Card */}
              {bookingSuccess ? (
                <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500 mb-3">
                    <Check className="size-6 stroke-[3]" />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
                    REQUEST SUBMITTED
                  </span>
                  <h3 className="mt-1 font-heading text-lg font-bold uppercase tracking-wider text-stone-900 dark:text-white">
                    Appointment Requested
                  </h3>
                  <p className="mt-1 font-mono text-xs text-stone-500 dark:text-stone-400">
                    Reference ID: <strong className="text-stone-900 dark:text-white font-bold">{bookingSuccess.appointmentId}</strong>
                  </p>
                  
                  <div className="mt-4 rounded-lg bg-black/5 dark:bg-white/5 p-3 text-xs text-stone-700 dark:text-stone-300 space-y-1">
                    <p><strong>Scheduled:</strong> {bookingSuccess.date} at {bookingSuccess.time}</p>
                    <p><strong>Status:</strong> <span className="text-[#1D4ED8] dark:text-[#93C5FD] font-semibold">Pending Salon Confirmation</span></p>
                    <p><strong>Payment:</strong> <span className="text-amber-600 dark:text-amber-400 font-semibold">Unpaid ($ {service.price} USD)</span></p>
                  </div>

                  <p className="mt-3 text-[11px] text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                    Once salon administration confirms your appointment, you will receive a notification and can complete payment via Stripe.
                  </p>

                  <div className="mt-6 flex flex-col gap-2.5">
                    <Link
                      href="/dashboard/customer?tab=appointments"
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#C4A265] text-xs font-bold tracking-wider text-stone-950 uppercase transition-all hover:bg-[#B39154]"
                    >
                      <Calendar className="size-3.5" />
                      <span>View in My Appointments</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setBookingSuccess(null);
                        setUserPickedDate("");
                      }}
                      className="text-xs font-semibold text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition-colors py-1"
                    >
                      Book Another Slot
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Booking Form Section */
                <div className="mt-6">
                  
                  {/* Case 1: Guest (Unauthenticated) */}
                  {!isAuthenticated ? (
                    <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-6 text-center dark:border-stone-800 dark:bg-stone-900/50">
                      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#C4A265]/15 text-[#C4A265] mb-3">
                        <Lock className="size-5" />
                      </div>
                      <h3 className="font-heading text-base font-bold uppercase tracking-wider text-stone-900 dark:text-white">
                        Sign In to Request Appointment
                      </h3>
                      <p className="mt-1.5 text-xs text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                        Per platform policy, appointment reservations require an authenticated customer account to track your schedule and secure online checkout.
                      </p>
                      
                      <div className="mt-6 flex flex-col gap-2.5">
                        <Link
                          href={`/signin?callbackUrl=/services/${service.id}`}
                          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#C4A265] text-xs font-bold tracking-widest text-stone-950 uppercase shadow-md transition-all hover:bg-[#B39154]"
                        >
                          <User className="size-3.5" />
                          <span>Sign In as Customer</span>
                        </Link>
                        
                        <Link
                          href="/signup"
                          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white text-xs font-semibold tracking-wider text-stone-700 uppercase transition-colors hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
                        >
                          <span>Create New Account</span>
                        </Link>
                      </div>
                    </div>
                  ) : isAdmin ? (
                    /* Case 2: Administrator Logged In */
                    <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-6 text-center dark:border-stone-800 dark:bg-stone-900/50">
                      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#C4A265]/15 text-[#C4A265] mb-3">
                        <ShieldCheck className="size-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-[#C4A265] uppercase">
                        ADMINISTRATOR CONTEXT
                      </span>
                      <h3 className="mt-1 font-heading text-base font-bold uppercase tracking-wider text-stone-900 dark:text-white">
                        Admin Account Active
                      </h3>
                      <p className="mt-1.5 text-xs text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                        Administrators manage the salon catalog and review incoming client bookings from the control panel. Customer appointment submissions are reserved for client accounts.
                      </p>
                      <Link
                        href="/dashboard/admin"
                        className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#C4A265] text-xs font-bold tracking-widest text-stone-950 uppercase shadow-md transition-all hover:bg-[#B39154]"
                      >
                        <ShieldCheck className="size-3.5" />
                        <span>Go to Admin Dashboard</span>
                      </Link>
                    </div>
                  ) : (
                    /* Case 3: Customer Logged In — Full Appointment Form */
                    <form onSubmit={handleBookingSubmit} className="space-y-5">
                      
                      {/* Field 1: Appointment Date */}
                      <div>
                        <label
                          htmlFor="appointmentDate"
                          className="block text-[11px] font-bold tracking-wider text-stone-700 dark:text-stone-300 uppercase mb-2"
                        >
                          1. SELECT APPOINTMENT DATE <span className="text-[#C4A265]">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="appointmentDate"
                            type="date"
                            min={clientToday || undefined}
                            required
                            suppressHydrationWarning
                            disabled={!service.isActive || isSubmitting}
                            value={appointmentDate}
                            onChange={(e) => setUserPickedDate(e.target.value)}
                            className="w-full rounded-xl border border-stone-200 bg-stone-50/60 py-2.5 px-3.5 text-xs sm:text-sm text-stone-900 shadow-xs transition-colors focus:border-[#C4A265] focus:bg-white focus:outline-none dark:border-stone-800 dark:bg-stone-900/60 dark:text-stone-100 disabled:opacity-50"
                          />
                        </div>
                        <span className="mt-1 block text-[10px] text-stone-400">
                          Salon hours: Monday – Saturday, 9:00 AM – 8:00 PM
                        </span>
                      </div>

                      {/* Field 2: Available Time Slot Selector */}
                      <div>
                        <label className="block text-[11px] font-bold tracking-wider text-stone-700 dark:text-stone-300 uppercase mb-2">
                          2. CHOOSE AVAILABLE TIME SLOT <span className="text-[#C4A265]">*</span>
                        </label>
                        
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                          {TIME_SLOTS.map((slot) => {
                            const isSelected = selectedTimeSlot === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                disabled={!service.isActive || isSubmitting}
                                onClick={() => setSelectedTimeSlot(slot)}
                                className={cn(
                                  "rounded-lg py-2 px-1 text-center font-mono text-xs font-semibold transition-all duration-200 border disabled:opacity-50",
                                  isSelected
                                    ? "bg-[#C4A265] text-stone-950 border-[#C4A265] font-bold shadow-xs"
                                    : "border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300 hover:bg-white dark:border-stone-800 dark:bg-stone-900/60 dark:text-stone-300 dark:hover:border-stone-700"
                                )}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Field 3: Additional Message (Optional per doc) */}
                      <div>
                        <label
                          htmlFor="additionalMessage"
                          className="block text-[11px] font-bold tracking-wider text-stone-700 dark:text-stone-300 uppercase mb-2"
                        >
                          3. ADDITIONAL MESSAGE / STYLIST PREFERENCES <span className="text-stone-400 font-normal">(OPTIONAL)</span>
                        </label>
                        <textarea
                          id="additionalMessage"
                          rows={3}
                          disabled={!service.isActive || isSubmitting}
                          value={additionalMessage}
                          onChange={(e) => setAdditionalMessage(e.target.value)}
                          placeholder="e.g. Sensitive scalp, prefer lavender steam, trimming only 1/2 inch..."
                          className="w-full rounded-xl border border-stone-200 bg-stone-50/60 p-3 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 shadow-xs transition-colors focus:border-[#C4A265] focus:bg-white focus:outline-none dark:border-stone-800 dark:bg-stone-900/60 dark:text-stone-100 disabled:opacity-50"
                        />
                      </div>

                      {/* Summary Banner */}
                      <div className="rounded-xl border border-stone-200/80 bg-stone-50 p-4 text-xs dark:border-stone-800 dark:bg-stone-900/50 space-y-1.5">
                        <div className="flex justify-between">
                          <span className="text-stone-500">Service:</span>
                          <span className="font-semibold text-stone-900 dark:text-white truncate max-w-[200px]">{service.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-500">Date &amp; Slot:</span>
                          <span className="font-mono text-stone-800 dark:text-stone-200 font-semibold">{appointmentDate} at {selectedTimeSlot}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-500">Initial Booking Status:</span>
                          <span className="font-semibold text-[#1D4ED8] dark:text-[#93C5FD]">Pending Confirmation</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-stone-200 dark:border-stone-800 font-bold">
                          <span className="text-stone-900 dark:text-white">Amount Due Upon Approval:</span>
                          <span className="text-[#8F6E2E] dark:text-[#C4A265]">${service.price} USD</span>
                        </div>
                      </div>

                      {/* Submit CTA */}
                      <button
                        type="submit"
                        disabled={!service.isActive || isSubmitting}
                        className="w-full flex h-12 items-center justify-center gap-2 rounded-xl bg-[#C4A265] text-xs font-bold tracking-widest text-stone-950 uppercase shadow-md transition-all duration-200 hover:bg-[#B39154] hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none active:scale-[0.99]"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="size-4 animate-spin" />
                            <span>SUBMITTING REQUEST...</span>
                          </>
                        ) : (
                          <>
                            <Calendar className="size-4" />
                            <span>REQUEST APPOINTMENT NOW</span>
                          </>
                        )}
                      </button>

                      <p className="text-center text-[10px] text-stone-400 font-light">
                        🔒 Safe &amp; verified appointment request. Free cancellation while pending.
                      </p>
                    </form>
                  )}

                </div>
              )}

            </div>

            {/* Concierge Hotline Card */}
            <div className="mt-4 rounded-xl border border-stone-200/80 bg-white p-4 dark:border-stone-800 dark:bg-[#1A1815] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-[#C4A265]/15 text-[#C4A265]">
                  <Scissors className="size-4" />
                </div>
                <div>
                  <span className="font-semibold text-stone-900 dark:text-white">Need a custom time?</span>
                  <p className="text-[11px] text-stone-400">Call Concierge: +880 1234-567890</p>
                </div>
              </div>
              <Link
                href="/#appointment"
                className="text-[11px] font-bold text-[#8F6E2E] dark:text-[#C4A265] uppercase hover:underline"
              >
                Inquire →
              </Link>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
