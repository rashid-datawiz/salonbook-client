"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  CreditCard,
  XCircle,
  CheckCircle2,
  Eye,
  Check,
  Sparkles,
  Loader2,
} from "lucide-react";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { cn } from "@/lib/utils";
import { useSession, getActiveUserRole } from "@/lib/auth-client";

/* ─────────────────────────────────────────────────────────────────────────────
   Customer Appointment Type
   Matches the Blueprint Wireframe specification:
     Service & Image | Date & Time | Price | Status | Payment | Request Date | Actions
   ───────────────────────────────────────────────────────────────────────────── */

type AppointmentStatus = "Pending" | "Confirmed" | "Cancelled";
type PaymentStatus = "Unpaid" | "Paid";

interface CustomerAppointment {
  id: string;
  serviceName: string;
  category: string;
  image: string;
  date: string;
  time: string;
  requestDate: string;
  price: number;
  status: AppointmentStatus;
  payment: PaymentStatus;
  stylist: string;
  notes?: string;
  stripeSessionId?: string;
}

const INITIAL_APPOINTMENTS: CustomerAppointment[] = [
  {
    id: "apt-101",
    serviceName: "Hydra Facial Glow",
    category: "Facial & Skincare",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop&q=80",
    date: "2026-11-24",
    time: "11:00 AM",
    requestDate: "2026-11-18",
    price: 85,
    status: "Pending",
    payment: "Unpaid",
    stylist: "Elena Rostova",
    notes: "Sensitive skin, prefer hypoallergenic botanical cleanse.",
  },
  {
    id: "apt-102",
    serviceName: "Balayage Color & Gloss",
    category: "Hair Coloring",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop&q=80",
    date: "2026-11-26",
    time: "02:00 PM",
    requestDate: "2026-11-17",
    price: 140,
    status: "Confirmed",
    payment: "Unpaid",
    stylist: "Marcus Vance",
    notes: "Warm caramel highlights blend with root shadow.",
  },
  {
    id: "apt-103",
    serviceName: "Aromatherapy Spa Massage",
    category: "Spa & Massage",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop&q=80",
    date: "2026-11-28",
    time: "04:00 PM",
    requestDate: "2026-11-15",
    price: 95,
    status: "Confirmed",
    payment: "Paid",
    stylist: "Sarah Chen",
    stripeSessionId: "cs_live_9482937502_salon",
    notes: "Deep tissue focus on neck and shoulder areas.",
  },
  {
    id: "apt-104",
    serviceName: "Executive Scissor Haircut",
    category: "Haircare",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop&q=80",
    date: "2026-11-20",
    time: "01:30 PM",
    requestDate: "2026-11-12",
    price: 45,
    status: "Cancelled",
    payment: "Unpaid",
    stylist: "Marcus Vance",
    notes: "Cancelled due to emergency travel.",
  },
  {
    id: "apt-105",
    serviceName: "Beard Sculpt & Razor Shave",
    category: "Grooming",
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=300&fit=crop&q=80",
    date: "2026-11-30",
    time: "10:00 AM",
    requestDate: "2026-11-19",
    price: 35,
    status: "Pending",
    payment: "Unpaid",
    stylist: "Alexander King",
    notes: "Straight razor outline with eucalyptus steam.",
  },
];

export default function CustomerDashboardPage() {
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = useSession();

  // Strict Role Protection: Admins are redirected to /dashboard/admin, guests to /signin
  useEffect(() => {
    if (!isSessionPending) {
      if (!session?.user) {
        router.replace("/signin");
      } else {
        const role = getActiveUserRole(session.user.role);
        if (role === "admin") {
          router.replace("/dashboard/admin");
        }
      }
    }
  }, [session, isSessionPending, router]);

  const [currentTab, setCurrentTab] = useState<string>("overview");
  const [appointments, setAppointments] = useState<CustomerAppointment[]>(INITIAL_APPOINTMENTS);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Interactive Modal States
  const [cancelModalAppointment, setCancelModalAppointment] = useState<CustomerAppointment | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [payModalAppointment, setPayModalAppointment] = useState<CustomerAppointment | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [detailsModalAppointment, setDetailsModalAppointment] = useState<CustomerAppointment | null>(null);

  // Profile Form State
  const [profileData, setProfileData] = useState({
    name: "David Bentley",
    email: "david.bentley@example.com",
    phone: "+880 1711-234567",
    address: "Road 11, Banani, Dhaka",
    preferredStylist: "Marcus Vance",
  });
  const [profileSaved, setProfileSaved] = useState(false);

  // 4 KPI Metrics (Directly matching wireframe)
  const totalRequests = appointments.length;
  const pendingCount = appointments.filter((a) => a.status === "Pending").length;
  const confirmedCount = appointments.filter((a) => a.status === "Confirmed").length;
  const cancelledCount = appointments.filter((a) => a.status === "Cancelled").length;

  // Filtered Appointments
  const filteredAppointments = appointments.filter((item) => {
    if (statusFilter === "all") return true;
    if (statusFilter === "pending") return item.status === "Pending";
    if (statusFilter === "confirmed") return item.status === "Confirmed";
    if (statusFilter === "cancelled") return item.status === "Cancelled";
    if (statusFilter === "unpaid") return item.payment === "Unpaid";
    if (statusFilter === "paid") return item.payment === "Paid";
    return true;
  });

  // Action: Confirm Cancellation
  const handleConfirmCancel = () => {
    if (!cancelModalAppointment) return;
    setAppointments((prev) =>
      prev.map((item) =>
        item.id === cancelModalAppointment.id
          ? { ...item, status: "Cancelled", notes: cancelReason ? `Cancelled: ${cancelReason}` : item.notes }
          : item
      )
    );
    setCancelModalAppointment(null);
    setCancelReason("");
  };

  // Action: Confirm Stripe Payment Simulation
  const handleConfirmPayment = () => {
    if (!payModalAppointment) return;
    setIsProcessingPayment(true);
    setTimeout(() => {
      setAppointments((prev) =>
        prev.map((item) =>
          item.id === payModalAppointment.id
            ? { ...item, payment: "Paid", stripeSessionId: `cs_test_${Date.now()}` }
            : item
        )
      );
      setIsProcessingPayment(false);
      setPayModalAppointment(null);
    }, 1200);
  };

  // Profile Save
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  // Authentication loading or redirecting fallback
  if (isSessionPending) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4F6F8] dark:bg-[#12100E] text-stone-900 dark:text-stone-100 gap-3 p-4">
        <Loader2 className="size-8 animate-spin text-[#C4A265]" />
        <p className="font-mono text-xs uppercase tracking-wider text-stone-500">
          Loading client dashboard...
        </p>
      </div>
    );
  }

  const activeRole = getActiveUserRole(session?.user?.role);
  if (!session?.user || activeRole === "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4F6F8] dark:bg-[#12100E] text-stone-900 dark:text-stone-100 gap-3 p-4">
        <Loader2 className="size-8 animate-spin text-[#C4A265]" />
        <p className="font-mono text-xs uppercase tracking-wider text-stone-500">
          {activeRole === "admin"
            ? "Redirecting administrator to Admin Control Panel..."
            : "Redirecting to sign in..."}
        </p>
      </div>
    );
  }

  return (
    <DashboardShell
      role="customer"
      currentTab={currentTab}
      onTabChange={setCurrentTab}
    >
      {/* ──────────────────────────────────────────────────────────────────────
         TAB 1: OVERVIEW (Wireframe Blueprint Section 1)
         ────────────────────────────────────────────────────────────────────── */}
      {currentTab === "overview" && (
        <div className="space-y-8">
          {/* Header */}
          <div>
            <span className="text-xs font-mono font-bold tracking-wider text-[#1D4ED8] dark:text-[#C4A265] uppercase">
              CLIENT PORTAL
            </span>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-bold tracking-wider uppercase text-stone-900 dark:text-stone-50">
              Overview &amp; Appointment Snapshot
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-light">
              Monitor your reservation requests, approved slots, and private stylist concierge sessions.
            </p>
          </div>

          {/* ── 4 KPI Statistics Cards (Exact match to Blueprint Wireframe) ── */}
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4 sm:gap-4">
            {/* KPI 1: Total Requests */}
            <div className="rounded-xl border border-stone-200 bg-white p-4 sm:p-5 shadow-xs dark:border-stone-800 dark:bg-[#1A1815]">
              <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">Total Requests</span>
              <p className="mt-2 font-heading text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50">
                {totalRequests}
              </p>
              <span className="mt-1 block text-[10px] text-stone-400">All-time bookings</span>
            </div>

            {/* KPI 2: Pending */}
            <div className="rounded-xl border border-stone-200 bg-white p-4 sm:p-5 shadow-xs dark:border-stone-800 dark:bg-[#1A1815]">
              <span className="text-xs text-[#1D4ED8] dark:text-[#93C5FD] font-semibold">Pending</span>
              <p className="mt-2 font-heading text-2xl sm:text-3xl font-bold text-[#1D4ED8] dark:text-[#60A5FA]">
                {pendingCount}
              </p>
              <span className="mt-1 block text-[10px] text-stone-400">Awaiting salon review</span>
            </div>

            {/* KPI 3: Confirmed */}
            <div className="rounded-xl border border-stone-200 bg-white p-4 sm:p-5 shadow-xs dark:border-stone-800 dark:bg-[#1A1815]">
              <span className="text-xs text-[#047857] dark:text-[#34D399] font-semibold">Confirmed</span>
              <p className="mt-2 font-heading text-2xl sm:text-3xl font-bold text-[#047857] dark:text-[#10B981]">
                {confirmedCount}
              </p>
              <span className="mt-1 block text-[10px] text-stone-400">Scheduled rituals</span>
            </div>

            {/* KPI 4: Cancelled */}
            <div className="rounded-xl border border-stone-200 bg-white p-4 sm:p-5 shadow-xs dark:border-stone-800 dark:bg-[#1A1815]">
              <span className="text-xs text-stone-400 font-medium">Cancelled</span>
              <p className="mt-2 font-heading text-2xl sm:text-3xl font-bold text-stone-500 dark:text-stone-400">
                {cancelledCount}
              </p>
              <span className="mt-1 block text-[10px] text-stone-400">Archived slots</span>
            </div>
          </div>

          {/* ── Quick Table Snapshot (Recent 3) ── */}
          <div className="rounded-2xl border border-stone-200 bg-white shadow-xs dark:border-stone-800 dark:bg-[#1A1815] overflow-hidden">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800">
              <div>
                <h3 className="font-heading text-base font-bold tracking-wide uppercase text-stone-900 dark:text-stone-50">
                  Upcoming Appointments
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Quick actions for your pending approval and confirmed booking slots.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCurrentTab("appointments")}
                className="text-xs font-semibold text-[#1D4ED8] dark:text-[#C4A265] hover:underline"
              >
                View All Appointments &rarr;
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] dark:bg-[#161412] text-stone-600 dark:text-stone-400 border-b border-stone-200 dark:border-stone-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Service</th>
                    <th className="py-3 px-4 font-semibold">Date &amp; Time</th>
                    <th className="py-3 px-4 font-semibold">Price</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold">Payment</th>
                    <th className="py-3 px-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {appointments.slice(0, 3).map((apt) => (
                    <tr key={apt.id} className="hover:bg-stone-50/50 dark:hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative size-10 rounded-lg overflow-hidden shrink-0 bg-stone-100 dark:bg-stone-800">
                            <Image src={apt.image} alt={apt.serviceName} fill className="object-cover" />
                          </div>
                          <div>
                            <p className="font-semibold text-stone-900 dark:text-stone-100">{apt.serviceName}</p>
                            <p className="text-[11px] text-stone-400">{apt.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-medium text-stone-800 dark:text-stone-200">{apt.date}</p>
                        <p className="text-[11px] text-stone-400">{apt.time}</p>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-stone-900 dark:text-stone-100">
                        ${apt.price}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                            apt.status === "Confirmed" && "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
                            apt.status === "Pending" && "bg-blue-500/15 text-blue-700 dark:text-blue-400",
                            apt.status === "Cancelled" && "bg-stone-500/15 text-stone-500 dark:text-stone-400"
                          )}
                        >
                          {apt.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase",
                            apt.payment === "Paid"
                              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                              : "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                          )}
                        >
                          {apt.payment}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {/* Wireframe rules:
                            Pending + Unpaid -> Cancel Request
                            Confirmed + Unpaid -> Pay Now
                            Confirmed + Paid -> View Details */}
                        {apt.status === "Pending" && apt.payment === "Unpaid" && (
                          <button
                            type="button"
                            onClick={() => setCancelModalAppointment(apt)}
                            className="inline-flex h-8 items-center justify-center rounded-md border border-stone-300 dark:border-stone-700 px-3 text-[11px] font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-white/10"
                          >
                            Cancel Request
                          </button>
                        )}

                        {apt.status === "Confirmed" && apt.payment === "Unpaid" && (
                          <button
                            type="button"
                            onClick={() => setPayModalAppointment(apt)}
                            className="inline-flex h-8 items-center justify-center rounded-md bg-[#1D4ED8] px-3 text-[11px] font-bold text-white shadow-xs hover:bg-[#1e40af]"
                          >
                            Pay Now
                          </button>
                        )}

                        {apt.status === "Confirmed" && apt.payment === "Paid" && (
                          <button
                            type="button"
                            onClick={() => setDetailsModalAppointment(apt)}
                            className="inline-flex h-8 items-center justify-center rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20"
                          >
                            View Details
                          </button>
                        )}

                        {apt.status === "Cancelled" && (
                          <span className="text-[11px] text-stone-400 italic">No actions</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────
         TAB 2: MY APPOINTMENTS TABLE (Wireframe Blueprint Section 1)
         ────────────────────────────────────────────────────────────────────── */}
      {currentTab === "appointments" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold tracking-wider text-[#1D4ED8] dark:text-[#C4A265] uppercase">
                RESERVATION LEDGER
              </span>
              <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-bold tracking-wider uppercase text-stone-900 dark:text-stone-50">
                My Appointments
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-light">
                Complete list of your requested, confirmed, and past appointment slots.
              </p>
            </div>

            <Link
              href="/#appointment"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#C4A265] px-4 text-xs font-bold tracking-wider text-stone-950 uppercase hover:bg-[#B39154] transition-colors self-start sm:self-auto"
            >
              <Sparkles className="size-3.5" />
              <span>Book New Slot</span>
            </Link>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
            {[
              { id: "all", label: "All Bookings" },
              { id: "pending", label: "Pending Approval" },
              { id: "confirmed", label: "Confirmed" },
              { id: "unpaid", label: "Unpaid" },
              { id: "paid", label: "Paid" },
              { id: "cancelled", label: "Cancelled" },
            ].map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setStatusFilter(filter.id)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                  statusFilter === filter.id
                    ? "bg-[#1D4ED8] text-white"
                    : "bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-stone-300"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* ── Full Interactive Appointments Table ── */}
          <div className="rounded-2xl border border-stone-200 bg-white shadow-xs dark:border-stone-800 dark:bg-[#1A1815] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] dark:bg-[#161412] text-stone-700 dark:text-stone-300 border-b border-stone-200 dark:border-stone-800 font-mono">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold">Service &amp; Image</th>
                    <th className="py-3.5 px-4 font-semibold">Date &amp; Time</th>
                    <th className="py-3.5 px-4 font-semibold">Price</th>
                    <th className="py-3.5 px-4 font-semibold">Status</th>
                    <th className="py-3.5 px-4 font-semibold">Payment</th>
                    <th className="py-3.5 px-4 font-semibold">Request Date</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-stone-400">
                        No appointments found matching this filter.
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-stone-50/50 dark:hover:bg-white/5 transition-colors">
                        {/* Service & Image */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative size-12 rounded-lg overflow-hidden shrink-0 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                              <Image src={apt.image} alt={apt.serviceName} fill className="object-cover" />
                            </div>
                            <div>
                              <p className="font-semibold text-stone-900 dark:text-stone-100">{apt.serviceName}</p>
                              <p className="text-[11px] text-stone-400">{apt.category}</p>
                              <p className="text-[10px] text-stone-400 mt-0.5">Stylist: {apt.stylist}</p>
                            </div>
                          </div>
                        </td>

                        {/* Date & Time */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1.5 font-medium text-stone-900 dark:text-stone-100">
                            <Calendar className="size-3.5 text-stone-400" />
                            <span>{apt.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                            <Clock className="size-3 text-stone-400" />
                            <span>{apt.time}</span>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="py-4 px-4 font-mono font-bold text-stone-900 dark:text-stone-100 text-sm">
                          ${apt.price}
                        </td>

                        {/* Status Badge */}
                        <td className="py-4 px-4">
                          <span
                            className={cn(
                              "inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                              apt.status === "Confirmed" && "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20",
                              apt.status === "Pending" && "bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-500/20",
                              apt.status === "Cancelled" && "bg-stone-500/15 text-stone-500 dark:text-stone-400 border border-stone-500/20"
                            )}
                          >
                            {apt.status}
                          </span>
                        </td>

                        {/* Payment Status */}
                        <td className="py-4 px-4">
                          <span
                            className={cn(
                              "inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase",
                              apt.payment === "Paid"
                                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                                : "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                            )}
                          >
                            {apt.payment}
                          </span>
                        </td>

                        {/* Request Date */}
                        <td className="py-4 px-4 font-mono text-stone-500 dark:text-stone-400">
                          {apt.requestDate}
                        </td>

                        {/* Actions (Strictly following Blueprint Wireframe Rules) */}
                        <td className="py-4 px-4 text-right">
                          {apt.status === "Pending" && apt.payment === "Unpaid" && (
                            <button
                              type="button"
                              onClick={() => setCancelModalAppointment(apt)}
                              className="inline-flex h-8 items-center justify-center rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 px-3 text-[11px] font-semibold text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors shadow-2xs"
                            >
                              Cancel Request
                            </button>
                          )}

                          {apt.status === "Confirmed" && apt.payment === "Unpaid" && (
                            <button
                              type="button"
                              onClick={() => setPayModalAppointment(apt)}
                              className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md bg-[#1D4ED8] px-3.5 text-[11px] font-bold text-white shadow-xs hover:bg-[#1e40af] transition-colors"
                            >
                              <CreditCard className="size-3" />
                              <span>Pay Now</span>
                            </button>
                          )}

                          {apt.status === "Confirmed" && apt.payment === "Paid" && (
                            <button
                              type="button"
                              onClick={() => setDetailsModalAppointment(apt)}
                              className="inline-flex h-8 items-center justify-center gap-1 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                            >
                              <Eye className="size-3" />
                              <span>View Details</span>
                            </button>
                          )}

                          {apt.status === "Cancelled" && (
                            <span className="text-[11px] text-stone-400 italic">Non-modifiable</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-[#F8FAFC] dark:bg-[#161412] text-xs text-stone-500 dark:text-stone-400">
              <span className="font-semibold text-stone-700 dark:text-stone-300">Policy Rules:</span> Customers can cancel pending requests only. Once an appointment is approved, pay securely online via Stripe.
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────
         TAB 3: MY PROFILE (Blueprint Section 1)
         ────────────────────────────────────────────────────────────────────── */}
      {currentTab === "profile" && (
        <div className="max-w-3xl space-y-6">
          <div>
            <span className="text-xs font-mono font-bold tracking-wider text-[#1D4ED8] dark:text-[#C4A265] uppercase">
              CLIENT RECORD
            </span>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-bold tracking-wider uppercase text-stone-900 dark:text-stone-50">
              My Profile &amp; Preferences
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-light">
              Manage your personal contact details, styling preferences, and notification channels.
            </p>
          </div>

          {profileSaved && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-400">
              <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
              <span>Your profile preferences have been successfully updated.</span>
            </div>
          )}

          <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs dark:border-stone-800 dark:bg-[#1A1815]">
            <form onSubmit={handleProfileSave} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-stone-600 dark:text-stone-300 uppercase mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2 text-sm text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-stone-600 dark:text-stone-300 uppercase mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2 text-sm text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-stone-600 dark:text-stone-300 uppercase mb-1.5">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2 text-sm text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-stone-600 dark:text-stone-300 uppercase mb-1.5">
                    Preferred Master Stylist
                  </label>
                  <select
                    value={profileData.preferredStylist}
                    onChange={(e) => setProfileData({ ...profileData, preferredStylist: e.target.value })}
                    className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2 text-sm text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#1D4ED8]"
                  >
                    <option value="Marcus Vance">Marcus Vance (Master Barber)</option>
                    <option value="Elena Rostova">Elena Rostova (Lead Aesthetician)</option>
                    <option value="Sarah Chen">Sarah Chen (Color &amp; Spa Specialist)</option>
                    <option value="Alexander King">Alexander King (Senior Stylist)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-stone-600 dark:text-stone-300 uppercase mb-1.5">
                  Concierge Delivery / Home Address
                </label>
                <input
                  type="text"
                  value={profileData.address}
                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2 text-sm text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#1D4ED8]"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#1D4ED8] px-6 text-xs font-bold text-white uppercase hover:bg-[#1e40af] transition-colors"
                >
                  <Check className="size-4" />
                  <span>Save Profile Updates</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────
         MODAL 1: CANCEL APPOINTMENT CONFIRMATION (Per Blueprint Specification)
         ────────────────────────────────────────────────────────────────────── */}
      {cancelModalAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl dark:border-stone-800 dark:bg-[#1C1A17] text-stone-900 dark:text-stone-100">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
                <XCircle className="size-6" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold uppercase">Cancel Appointment</h3>
                <p className="text-xs text-stone-500">Confirm slot release</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Are you sure you want to cancel your request for{" "}
              <strong className="text-stone-900 dark:text-white">{cancelModalAppointment.serviceName}</strong> scheduled on{" "}
              <span className="font-mono">{cancelModalAppointment.date}</span> at <span className="font-mono">{cancelModalAppointment.time}</span>?
            </p>

            <div className="mt-4">
              <label className="block text-[11px] font-mono font-bold text-stone-600 dark:text-stone-400 uppercase mb-1">
                Reason for Cancellation (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Schedule conflict, need to reschedule..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full rounded-lg border border-stone-300 bg-stone-50 p-2.5 text-xs dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 focus:outline-none"
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setCancelModalAppointment(null)}
                className="rounded-lg border border-stone-300 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800 transition-colors"
              >
                Keep Booking
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700 transition-colors"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────
         MODAL 2: STRIPE PAY NOW CHECKOUT (Per Blueprint Specification)
         ────────────────────────────────────────────────────────────────────── */}
      {payModalAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl dark:border-stone-800 dark:bg-[#1C1A17] text-stone-900 dark:text-stone-100">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2.5">
                <CreditCard className="size-5 text-[#1D4ED8]" />
                <h3 className="font-heading text-lg font-bold uppercase">Stripe Checkout</h3>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                SECURE SSL
              </span>
            </div>

            <div className="mt-4 rounded-xl bg-stone-50 dark:bg-stone-900/60 p-4 space-y-2 border border-stone-200 dark:border-stone-800">
              <div className="flex justify-between text-xs">
                <span className="text-stone-500">Service:</span>
                <span className="font-semibold">{payModalAppointment.serviceName}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-stone-500">Scheduled Date:</span>
                <span>{payModalAppointment.date} at {payModalAppointment.time}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-stone-500">Stylist Artisan:</span>
                <span>{payModalAppointment.stylist}</span>
              </div>
              <div className="pt-2 border-t border-stone-200 dark:border-stone-700 flex justify-between text-sm font-bold">
                <span>Total Due:</span>
                <span className="font-mono text-[#1D4ED8] dark:text-[#60A5FA]">${payModalAppointment.price} USD</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <label className="block text-[11px] font-mono text-stone-500 uppercase">
                Payment Method (Stripe Simulation)
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-stone-300 dark:border-stone-700 p-2.5 bg-white dark:bg-stone-900 text-xs">
                <CreditCard className="size-4 text-stone-400" />
                <span className="font-mono">•••• •••• •••• 4242</span>
                <span className="ml-auto text-stone-400">12/28</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setPayModalAppointment(null)}
                className="rounded-lg border border-stone-300 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmPayment}
                disabled={isProcessingPayment}
                className="rounded-lg bg-[#1D4ED8] px-5 py-2 text-xs font-bold text-white hover:bg-[#1e40af] disabled:opacity-50 transition-colors"
              >
                {isProcessingPayment ? "Authorizing Stripe..." : `Pay $${payModalAppointment.price} USD`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────
         MODAL 3: VIEW DETAILS & RECEIPT (Per Blueprint Specification)
         ────────────────────────────────────────────────────────────────────── */}
      {detailsModalAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl dark:border-stone-800 dark:bg-[#1C1A17] text-stone-900 dark:text-stone-100">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h3 className="font-heading text-lg font-bold uppercase">Appointment Receipt</h3>
              <span className="rounded-full bg-emerald-500/15 text-emerald-600 px-2.5 py-0.5 text-[10px] font-bold uppercase">
                Paid &amp; Confirmed
              </span>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500">Service:</span>
                <span className="font-semibold">{detailsModalAppointment.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Date &amp; Time:</span>
                <span>{detailsModalAppointment.date} ({detailsModalAppointment.time})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Stylist:</span>
                <span>{detailsModalAppointment.stylist}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Amount Paid:</span>
                <span className="font-mono font-bold text-emerald-600">${detailsModalAppointment.price} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Stripe Reference:</span>
                <span className="font-mono text-[10px] text-stone-400">{detailsModalAppointment.stripeSessionId || "cs_9284019284"}</span>
              </div>
              {detailsModalAppointment.notes && (
                <div className="pt-2 border-t border-stone-200 dark:border-stone-800 text-stone-500">
                  <span className="font-semibold block mb-0.5">Special Instructions:</span>
                  <p className="italic">{detailsModalAppointment.notes}</p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setDetailsModalAppointment(null)}
                className="rounded-lg bg-stone-900 dark:bg-white text-white dark:text-stone-950 px-4 py-2 text-xs font-bold uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
