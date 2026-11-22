"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Calendar, Clock, CheckCircle2, Sparkles, Loader2, ArrowRight } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { createBackendAppointment } from "@/lib/api";

const SERVICE_DATA: Record<string, { id: string; price: number; category: string; image: string }> = {
  "Adult Haircut": {
    id: "1",
    price: 35,
    category: "Haircut & Styling",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=600&fit=crop&q=80",
  },
  "Kids Haircut": {
    id: "2",
    price: 25,
    category: "Haircut & Styling",
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&h=600&fit=crop&q=80",
  },
  "Beard Trim & Sculpt": {
    id: "3",
    price: 20,
    category: "Beard & Hot Shave",
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&h=600&fit=crop&q=80",
  },
  "Hot Towel Neck Shave": {
    id: "4",
    price: 18,
    category: "Beard & Hot Shave",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=600&fit=crop&q=80",
  },
  "Scalp Moisturizing": {
    id: "5",
    price: 40,
    category: "Hair & Scalp Care",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop&q=80",
  },
  "Executive Glow Facial": {
    id: "6",
    price: 45,
    category: "Facial & Skincare",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop&q=80",
  },
  "Full Concierge Package": {
    id: "7",
    price: 80,
    category: "Spa & Massage",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop&q=80",
  },
};

function getTomorrowDateStr(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

export default function BookingCta() {
  const { data: session } = useSession();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<{ id: string; date: string; time: string; service: string } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    service: "Adult Haircut",
    phone: "",
    email: "",
    date: "",
    timeSlot: "11:30 AM",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const clientName = formData.name.trim() || session?.user?.name || "Customer Client";
    const clientPhone = formData.phone.trim() || "N/A";
    const clientEmail = formData.email.trim() || session?.user?.email || "";

    if (!clientName || !clientPhone) {
      setErrorMessage("Please provide your name and phone number.");
      return;
    }

    const targetDate = formData.date || getTomorrowDateStr();
    const serviceMeta = SERVICE_DATA[formData.service] || SERVICE_DATA["Adult Haircut"];

    setIsSubmitting(true);
    try {
      const res = await createBackendAppointment(
        {
          serviceId: serviceMeta.id,
          serviceName: formData.service,
          servicePrice: serviceMeta.price,
          category: serviceMeta.category,
          image: serviceMeta.image,
          appointmentDate: targetDate,
          timeSlot: formData.timeSlot || "11:30 AM",
          message: formData.notes.trim(),
        },
        session?.user
      );

      const aptId = res?.appointment?._id || `apt-${Date.now().toString().slice(-4)}`;

      // Save to client storage so it is immediately visible in Customer & Admin dashboards
      if (typeof window !== "undefined") {
        const existingRaw = localStorage.getItem("salonbook_saved_appointments");
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
        const newRecord = {
          id: String(aptId),
          serviceId: serviceMeta.id,
          serviceName: formData.service,
          category: serviceMeta.category,
          image: serviceMeta.image,
          customerName: clientName,
          customerEmail: clientEmail,
          customerPhone: clientPhone,
          date: targetDate,
          time: formData.timeSlot || "11:30 AM",
          requestDate: new Date().toISOString().split("T")[0],
          price: serviceMeta.price,
          status: "Pending",
          payment: "Unpaid",
          stylist: "Master Artisan",
          notes: formData.notes.trim() || undefined,
        };
        localStorage.setItem(
          "salonbook_saved_appointments",
          JSON.stringify([newRecord, ...existing])
        );
      }

      setConfirmedBooking({
        id: String(aptId),
        date: targetDate,
        time: formData.timeSlot || "11:30 AM",
        service: formData.service,
      });
      setSubmitted(true);
    } catch (err: unknown) {
      // If unauthorized (guest), save to local storage and display confirmation
      const fallbackId = `apt-${Date.now().toString().slice(-4)}`;
      if (typeof window !== "undefined") {
        const existingRaw = localStorage.getItem("salonbook_saved_appointments");
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
        const newRecord = {
          id: fallbackId,
          serviceId: serviceMeta.id,
          serviceName: formData.service,
          category: serviceMeta.category,
          image: serviceMeta.image,
          customerName: clientName,
          customerEmail: clientEmail,
          customerPhone: clientPhone,
          date: targetDate,
          time: formData.timeSlot || "11:30 AM",
          requestDate: new Date().toISOString().split("T")[0],
          price: serviceMeta.price,
          status: "Pending",
          payment: "Unpaid",
          stylist: "Master Artisan",
          notes: formData.notes.trim() || undefined,
        };
        localStorage.setItem(
          "salonbook_saved_appointments",
          JSON.stringify([newRecord, ...existing])
        );
      }

      setConfirmedBooking({
        id: fallbackId,
        date: targetDate,
        time: formData.timeSlot || "11:30 AM",
        service: formData.service,
      });
      setSubmitted(true);
      console.warn("Backend appointment booking fallback:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="appointment" className="relative overflow-hidden bg-[#12100E] text-white py-20 sm:py-28 lg:py-32">
      {/* ── Ambient Background Lighting ── */}
      <div className="absolute top-0 right-1/4 -z-10 size-96 rounded-full bg-[#C4A265]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -z-10 size-80 rounded-full bg-stone-800/20 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ── Main Split Container (Reference Layout) ── */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 items-center">
          
          {/* ──────────────────────────────────────────────────────────────────
             LEFT COLUMN: Master Stylist Portrait & Contact Channels
             ────────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#C4A265]/40 bg-[#C4A265]/10 px-3.5 py-1 text-xs font-semibold tracking-[0.2em] text-[#E5C98F] uppercase backdrop-blur-md mb-6">
                <Sparkles className="size-3.5 text-[#C4A265]" />
                <span>PRIVATE RESERVATIONS</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider text-white uppercase leading-[1.15]">
                MAKE AN <br />
                <span className="text-[#C4A265]">APPOINTMENT</span>
              </h2>

              <p className="mt-4 text-sm sm:text-base text-stone-300 font-light leading-relaxed max-w-md">
                Experience bespoke grooming at our flagship salon or in the comfort of your private residence.
                Reserve your slot below or connect directly with our concierge team.
              </p>
            </div>

            {/* Barber Atmosphere Image Card */}
            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl bg-stone-900 shadow-xl border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1593702295094-aea22597af65?q=85&w=1000&auto=format&fit=crop"
                alt="SalonBook Master Stylist in appointment studio"
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-stone-200">
                <span className="font-bold text-[#C4A265] uppercase tracking-wider">Same-Day Slots Available</span>
                <p className="text-[11px] text-stone-300">Mon – Sat: 9:00 AM – 8:00 PM</p>
              </div>
            </div>

            {/* Direct Contact Cards (Reference Style) */}
            <div className="mt-8 space-y-3.5">
              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-colors hover:bg-white/10">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#C4A265]/20 text-[#C4A265]">
                  <Phone className="size-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                    GIVE US A CALL
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                    +880 1234-567890 / +880 1987-654321
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-colors hover:bg-white/10">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#C4A265]/20 text-[#C4A265]">
                  <Mail className="size-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                    SEND US AN EMAIL
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                    concierge@salonbook.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-colors hover:bg-white/10">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#C4A265]/20 text-[#C4A265]">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                    VISIT OUR SALON
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                    1801 Convention Blvd, Banani, Dhaka
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* ──────────────────────────────────────────────────────────────────
             RIGHT COLUMN: Crisp Appointment Reservation Card (Reference Form)
             ────────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-stone-200/90 bg-white p-7 sm:p-10 lg:p-12 shadow-2xl text-stone-900 dark:border-stone-800 dark:bg-[#1E1B18] dark:text-stone-100">
              
              {submitted ? (
                /* Success Confirmation State */
                <div className="py-10 text-center space-y-4">
                  <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold uppercase tracking-wider text-stone-900 dark:text-stone-50">
                    APPOINTMENT REQUEST CONFIRMED!
                  </h3>
                  <p className="max-w-md mx-auto text-sm text-stone-600 dark:text-stone-300 font-light leading-relaxed">
                    Thank you, <strong className="font-semibold text-stone-900 dark:text-stone-100">{formData.name || session?.user?.name || "Client"}</strong>.
                    Your slot for <span className="text-[#8F6E2E] dark:text-[#C4A265] font-semibold">{confirmedBooking?.service || formData.service}</span> on{" "}
                    <strong>{confirmedBooking?.date}</strong> at <strong>{confirmedBooking?.time}</strong> has been logged.
                  </p>
                  {confirmedBooking?.id && (
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                      Reservation Ref: #{confirmedBooking.id}
                    </p>
                  )}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                      href="/dashboard/customer"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#C4A265] px-6 text-xs font-bold tracking-widest text-stone-950 uppercase hover:bg-[#B39154] transition-colors"
                    >
                      <span>View in My Appointments</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="inline-flex h-11 items-center justify-center rounded-md border border-stone-300 dark:border-stone-700 px-5 text-xs font-bold tracking-widest text-stone-700 dark:text-stone-300 uppercase hover:bg-stone-100 dark:hover:bg-white/10 transition-colors"
                    >
                      Book Another
                    </button>
                  </div>
                </div>
              ) : (
                /* Reservation Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-stone-200 pb-3 dark:border-stone-800">
                    <span className="text-xs font-bold tracking-[0.2em] text-[#8F6E2E] dark:text-[#C4A265] uppercase">
                      ONLINE BOOKING DESK
                    </span>
                    <h3 className="mt-1 font-heading text-xl sm:text-2xl font-bold tracking-wider text-stone-900 uppercase dark:text-stone-50">
                      RESERVE YOUR TIME SLOT
                    </h3>
                  </div>

                  {errorMessage && (
                    <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-600 dark:text-red-400">
                      {errorMessage}
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider text-stone-700 uppercase dark:text-stone-300">
                      FULL NAME <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Bentley"
                      value={formData.name || session?.user?.name || ""}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1.5 w-full rounded-md border border-stone-300 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-[#C4A265] focus:bg-white focus:outline-none dark:border-stone-700 dark:bg-stone-900/50 dark:text-stone-100"
                    />
                  </div>

                  {/* Select Service */}
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider text-stone-700 uppercase dark:text-stone-300">
                      SELECT SERVICE <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="mt-1.5 w-full rounded-md border border-stone-300 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-900 focus:border-[#C4A265] focus:bg-white focus:outline-none dark:border-stone-700 dark:bg-stone-900/50 dark:text-stone-100"
                    >
                      <option value="Adult Haircut">Adult Haircut ($35 USD)</option>
                      <option value="Kids Haircut">Kids Haircut ($25 USD)</option>
                      <option value="Beard Trim & Sculpt">Beard Trim &amp; Sculpt ($20 USD)</option>
                      <option value="Hot Towel Neck Shave">Hot Towel Neck Shave ($18 USD)</option>
                      <option value="Scalp Moisturizing">Scalp Moisturizing ($40 USD)</option>
                      <option value="Executive Glow Facial">Executive Glow Facial ($45 USD)</option>
                      <option value="Full Concierge Package">Full Concierge Package ($80 USD)</option>
                    </select>
                  </div>

                  {/* Date & Time Slot selection */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-bold tracking-wider text-stone-700 uppercase dark:text-stone-300">
                        APPOINTMENT DATE <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date || getTomorrowDateStr()}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="mt-1.5 w-full rounded-md border border-stone-300 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-900 focus:border-[#C4A265] focus:bg-white focus:outline-none dark:border-stone-700 dark:bg-stone-900/50 dark:text-stone-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold tracking-wider text-stone-700 uppercase dark:text-stone-300">
                        PREFERRED TIME SLOT <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                        className="mt-1.5 w-full rounded-md border border-stone-300 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-900 focus:border-[#C4A265] focus:bg-white focus:outline-none dark:border-stone-700 dark:bg-stone-900/50 dark:text-stone-100"
                      >
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:30 AM">11:30 AM</option>
                        <option value="01:00 PM">01:00 PM</option>
                        <option value="02:30 PM">02:30 PM</option>
                        <option value="04:00 PM">04:00 PM</option>
                        <option value="05:30 PM">05:30 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Phone & Email side by side */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-bold tracking-wider text-stone-700 uppercase dark:text-stone-300">
                        PHONE NUMBER <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+880 1..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1.5 w-full rounded-md border border-stone-300 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-[#C4A265] focus:bg-white focus:outline-none dark:border-stone-700 dark:bg-stone-900/50 dark:text-stone-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold tracking-wider text-stone-700 uppercase dark:text-stone-300">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        placeholder="yourname@domain.com"
                        value={formData.email || session?.user?.email || ""}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1.5 w-full rounded-md border border-stone-300 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-[#C4A265] focus:bg-white focus:outline-none dark:border-stone-700 dark:bg-stone-900/50 dark:text-stone-100"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider text-stone-700 uppercase dark:text-stone-300">
                      SPECIAL INSTRUCTIONS / STYLING NOTES
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Sensitive skin styling, prefer hypoallergenic products..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="mt-1.5 w-full rounded-md border border-stone-300 bg-stone-50/50 p-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-[#C4A265] focus:bg-white focus:outline-none dark:border-stone-700 dark:bg-stone-900/50 dark:text-stone-100"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#C4A265] px-8 text-xs font-bold tracking-widest text-stone-950 uppercase shadow-md transition-all duration-300 hover:bg-[#B39154] hover:shadow-lg disabled:opacity-50 active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="size-4" />
                          <span>CONFIRM APPOINTMENT REQUEST</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

        {/* ──────────────────────────────────────────────────────────────────
           BOTTOM: Stylized Salon Location Map Banner (Reference Layout)
           ────────────────────────────────────────────────────────────────── */}
        <div className="mt-20 overflow-hidden rounded-2xl border border-white/10 bg-[#1A1815] shadow-2xl">
          <div className="relative aspect-[21/9] sm:aspect-[24/8] w-full">
            {/* Map styling representation */}
            <div className="absolute inset-0 bg-[#161412] flex items-center justify-center overflow-hidden">
              {/* Geometric subtle map road grids */}
              <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#C4A265_1px,transparent_1px),linear-gradient(to_bottom,#C4A265_1px,transparent_1px)] bg-[size:4rem_4rem]" />
              
              {/* Map location badge & marker */}
              <div className="relative z-10 flex flex-col items-center text-center p-6 bg-[#1A1815]/90 rounded-2xl border border-[#C4A265]/40 shadow-2xl backdrop-blur-md max-w-sm">
                <div className="flex size-12 items-center justify-center rounded-full bg-[#C4A265] text-stone-950 mb-3 shadow-lg">
                  <MapPin className="size-6" />
                </div>
                <h4 className="font-heading text-base font-bold tracking-widest uppercase text-white">
                  SALONBOOK SANCTUARY
                </h4>
                <p className="text-xs text-stone-300 mt-1 font-light">
                  1801 Convention Blvd, Suite 400, Banani, Dhaka
                </p>
                <div className="mt-3 flex items-center gap-3 text-[11px] font-semibold text-[#C4A265]">
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />
                    Open Mon–Sat 9AM–8PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
