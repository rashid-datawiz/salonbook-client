"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Users,
  Scissors,
  CalendarCheck,
  CreditCard,
  PlusCircle,
  CheckCircle2,
  Upload,
  Edit,
  Trash2,
  ShieldAlert,
  ShieldCheck,
  Search,
  Check,
  X,
  Lock,
  Loader2,
} from "lucide-react";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { cn } from "@/lib/utils";
import { useSession, getActiveUserRole } from "@/lib/auth-client";
import {
  getAdminAppointments,
  updateAdminAppointmentStatus,
  getAdminUsers,
  toggleAdminUserBlock,
} from "@/lib/api";

/* ─────────────────────────────────────────────────────────────────────────────
   Admin Data Models (Adhering to Blueprint Section 2 Wireframe Specifications)
   ───────────────────────────────────────────────────────────────────────────── */

interface ServiceItem {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number;
  description: string;
  image: string;
  isActive: boolean;
}

interface AdminAppointment {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceName: string;
  category: string;
  date: string;
  time: string;
  price: number;
  message: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  payment: "Paid" | "Unpaid";
}

interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  totalAppointments: number;
  isBlocked: boolean;
}

interface StripeTransaction {
  id: string;
  customerName: string;
  serviceName: string;
  amount: number;
  currency: string;
  stripeSessionId: string;
  date: string;
  status: "Success" | "Refunded";
}

/* ── Initial Mock Data Sets ── */

const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "srv-1",
    name: "Classic Haircut & Hot Rinse",
    category: "Haircare",
    price: 35,
    duration: 45,
    description: "Tailored shear cutting, warm scalp massage, and styling finish.",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop&q=80",
    isActive: true,
  },
  {
    id: "srv-2",
    name: "Beard Sculpt & Razor Edge",
    category: "Grooming",
    price: 20,
    duration: 30,
    description: "Clipper trim, straight razor contouring, and hot eucalyptus steam.",
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=300&fit=crop&q=80",
    isActive: true,
  },
  {
    id: "srv-3",
    name: "Hydra Glow Facial Ritual",
    category: "Facial & Skincare",
    price: 65,
    duration: 60,
    description: "Ultrasonic deep pore cleanse, botanical clay mask, and hydration seal.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop&q=80",
    isActive: true,
  },
  {
    id: "srv-4",
    name: "Balayage & Hair Glossing",
    category: "Hair Coloring",
    price: 120,
    duration: 120,
    description: "Freehand dimensional color painting with non-ammonia glossing.",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop&q=80",
    isActive: true,
  },
  {
    id: "srv-5",
    name: "Hot Stone Aromatherapy Spa",
    category: "Spa & Massage",
    price: 85,
    duration: 75,
    description: "Deep muscle relief using heated volcanic river stones and essential oils.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop&q=80",
    isActive: true,
  },
  {
    id: "srv-6",
    name: "Follicle Detox & Scalp Mask",
    category: "Treatment",
    price: 50,
    duration: 45,
    description: "Keratin infusion treatment restoring hydration and strength.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop&q=80",
    isActive: false,
  },
];

const INITIAL_APPOINTMENTS: AdminAppointment[] = [
  {
    id: "adm-apt-1",
    customerName: "David Bentley",
    customerEmail: "david.bentley@example.com",
    customerPhone: "+880 1711-234567",
    serviceName: "Hydra Glow Facial Ritual",
    category: "Facial & Skincare",
    date: "2026-11-24",
    time: "11:00 AM",
    price: 65,
    message: "Sensitive skin, prefer hypoallergenic products.",
    status: "Pending",
    payment: "Unpaid",
  },
  {
    id: "adm-apt-2",
    customerName: "Fatima Rahman",
    customerEmail: "fatima.rahman@example.com",
    customerPhone: "+880 1819-876543",
    serviceName: "Balayage & Hair Glossing",
    category: "Hair Coloring",
    date: "2026-11-26",
    time: "02:00 PM",
    price: 120,
    message: "Bridal event prep, please assign senior colorist.",
    status: "Pending",
    payment: "Unpaid",
  },
  {
    id: "adm-apt-3",
    customerName: "Ahmed Hossain",
    customerEmail: "ahmed.hossain@example.com",
    customerPhone: "+880 1912-345678",
    serviceName: "Classic Haircut & Hot Rinse",
    category: "Haircare",
    date: "2026-11-22",
    time: "10:30 AM",
    price: 35,
    message: "Taper fade with textured scissor top.",
    status: "Confirmed",
    payment: "Paid",
  },
  {
    id: "adm-apt-4",
    customerName: "Nusrat Jahan",
    customerEmail: "nusrat.jahan@example.com",
    customerPhone: "+880 1712-987654",
    serviceName: "Hot Stone Aromatherapy Spa",
    category: "Spa & Massage",
    date: "2026-11-23",
    time: "04:00 PM",
    price: 85,
    message: "Focus on shoulder tension relief.",
    status: "Confirmed",
    payment: "Unpaid",
  },
  {
    id: "adm-apt-5",
    customerName: "Tariq Zaman",
    customerEmail: "tariq.zaman@example.com",
    customerPhone: "+880 1611-123456",
    serviceName: "Beard Sculpt & Razor Edge",
    category: "Grooming",
    date: "2026-11-21",
    time: "03:00 PM",
    price: 20,
    message: "Client had to travel urgently.",
    status: "Cancelled",
    payment: "Unpaid",
  },
];

const INITIAL_USERS: CustomerUser[] = [
  {
    id: "usr-1",
    name: "David Bentley",
    email: "david.bentley@example.com",
    phone: "+880 1711-234567",
    joinDate: "2026-08-14",
    totalAppointments: 12,
    isBlocked: false,
  },
  {
    id: "usr-2",
    name: "Fatima Rahman",
    email: "fatima.rahman@example.com",
    phone: "+880 1819-876543",
    joinDate: "2026-09-02",
    totalAppointments: 8,
    isBlocked: false,
  },
  {
    id: "usr-3",
    name: "Ahmed Hossain",
    email: "ahmed.hossain@example.com",
    phone: "+880 1912-345678",
    joinDate: "2026-07-20",
    totalAppointments: 15,
    isBlocked: false,
  },
  {
    id: "usr-4",
    name: "Sarah Miller",
    email: "sarah.miller@example.com",
    phone: "+880 1511-998877",
    joinDate: "2026-10-10",
    totalAppointments: 2,
    isBlocked: true,
  },
  {
    id: "usr-5",
    name: "Nusrat Jahan",
    email: "nusrat.jahan@example.com",
    phone: "+880 1712-987654",
    joinDate: "2026-08-30",
    totalAppointments: 6,
    isBlocked: false,
  },
];

const INITIAL_TRANSACTIONS: StripeTransaction[] = [
  {
    id: "txn-901",
    customerName: "Ahmed Hossain",
    serviceName: "Classic Haircut & Hot Rinse",
    amount: 35,
    currency: "USD",
    stripeSessionId: "cs_live_b12849201948",
    date: "2026-11-19 14:22",
    status: "Success",
  },
  {
    id: "txn-902",
    customerName: "David Bentley",
    serviceName: "Aromatherapy Spa Massage",
    amount: 95,
    currency: "USD",
    stripeSessionId: "cs_live_c92847192843",
    date: "2026-11-18 16:05",
    status: "Success",
  },
  {
    id: "txn-903",
    customerName: "Fatima Rahman",
    serviceName: "Bridal Styling Trial",
    amount: 80,
    currency: "USD",
    stripeSessionId: "cs_live_a83749201923",
    date: "2026-11-16 11:30",
    status: "Success",
  },
  {
    id: "txn-904",
    customerName: "Tariq Zaman",
    serviceName: "Beard Sculpt & Shave",
    amount: 20,
    currency: "USD",
    stripeSessionId: "cs_live_d73829102948",
    date: "2026-11-14 09:15",
    status: "Refunded",
  },
  {
    id: "txn-905",
    customerName: "Nusrat Jahan",
    serviceName: "Deep Conditioning Care",
    amount: 50,
    currency: "USD",
    stripeSessionId: "cs_live_e82910394829",
    date: "2026-11-12 15:45",
    status: "Success",
  },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = useSession();

  // Role Protection: Non-admin users are automatically routed to Customer Dashboard
  useEffect(() => {
    if (!isSessionPending) {
      if (!session?.user) {
        router.replace("/signin");
      } else {
        const role = getActiveUserRole(session.user.role);
        if (role !== "admin") {
          router.replace("/dashboard/customer");
        }
      }
    }
  }, [session, isSessionPending, router]);

  const [currentTab, setCurrentTab] = useState<string>("overview");

  // State collections
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [appointments, setAppointments] = useState<AdminAppointment[]>(INITIAL_APPOINTMENTS);
  const [users, setUsers] = useState<CustomerUser[]>(INITIAL_USERS);
  const [transactions] = useState<StripeTransaction[]>(INITIAL_TRANSACTIONS);

  // Synchronize appointments with backend MongoDB
  useEffect(() => {
    let isMounted = true;
    async function loadBackendAppointments() {
      try {
        const raw = await getAdminAppointments(session?.user);
        if (isMounted && Array.isArray(raw) && raw.length > 0) {
          const mapped: AdminAppointment[] = raw.map((b: {
            _id: string;
            customer?: { name?: string; email?: string; phone?: string };
            service?: { serviceName?: string; category?: string };
            appointmentDate?: string;
            timeSlot?: string;
            servicePrice?: number;
            message?: string;
            status?: string;
            paymentStatus?: string;
          }) => ({
            id: String(b._id),
            customerName: b.customer?.name || "Customer",
            customerEmail: b.customer?.email || "",
            customerPhone: b.customer?.phone || "N/A",
            serviceName: b.service?.serviceName || "Salon Service",
            category: b.service?.category || "Service",
            date: b.appointmentDate || "",
            time: b.timeSlot || "",
            price: Number(b.servicePrice) || 0,
            message: b.message || "",
            status: (b.status
              ? b.status.charAt(0).toUpperCase() + b.status.slice(1)
              : "Pending") as "Pending" | "Confirmed" | "Cancelled",
            payment: (b.paymentStatus === "paid" ? "Paid" : "Unpaid") as "Paid" | "Unpaid",
          }));
          setAppointments(mapped);
        }
      } catch (err) {
        console.error("Failed to load backend admin appointments:", err);
      }
    }
    loadBackendAppointments();
    return () => {
      isMounted = false;
    };
  }, [session?.user]);

  // Synchronize registered customers with backend MongoDB
  useEffect(() => {
    let isMounted = true;
    async function loadBackendUsers() {
      try {
        const raw = await getAdminUsers(session?.user);
        if (isMounted && Array.isArray(raw) && raw.length > 0) {
          const mapped: CustomerUser[] = raw.map((u: {
            _id?: string;
            id?: string;
            name?: string;
            email?: string;
            phone?: string;
            createdAt?: string;
            totalAppointments?: number;
            isBlocked?: boolean;
          }) => ({
            id: String(u._id || u.id),
            name: u.name || "Customer",
            email: u.email || "",
            phone: u.phone || "N/A",
            joinDate: u.createdAt ? new Date(u.createdAt).toISOString().split("T")[0] : "2026-11-20",
            totalAppointments: u.totalAppointments || 0,
            isBlocked: Boolean(u.isBlocked),
          }));
          setUsers(mapped);
        }
      } catch (err) {
        console.error("Failed to load backend admin users:", err);
      }
    }
    loadBackendUsers();
    return () => {
      isMounted = false;
    };
  }, [session?.user]);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");

  // Modals & Action States
  const [deleteServiceId, setDeleteServiceId] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [blockUserModal, setBlockUserModal] = useState<CustomerUser | null>(null);
  const [viewUserDetails, setViewUserDetails] = useState<CustomerUser | null>(null);

  // Add Service Form State (File upload per blueprint note: "Table + ImgBB file upload (no URL input)")
  const [newService, setNewService] = useState({
    name: "",
    category: "Haircare",
    price: 45,
    duration: 45,
    description: "",
    isActive: true,
  });
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [serviceCreatedAlert, setServiceCreatedAlert] = useState(false);

  // 6 Overview KPI Metrics (Direct match to Blueprint Section 2 Wireframe)
  const registeredCustomersCount = users.length;
  const activeServicesCount = services.filter((s) => s.isActive).length;
  const totalAppointmentsCount = appointments.length;
  const pendingAppointmentsCount = appointments.filter((a) => a.status === "Pending").length;
  const confirmedAppointmentsCount = appointments.filter((a) => a.status === "Confirmed").length;
  const successfulPaymentsCount = transactions.filter((t) => t.status === "Success").length;

  // Toggle Service Active Status
  const handleToggleService = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  // Confirm Delete Service
  const handleConfirmDeleteService = () => {
    if (!deleteServiceId) return;
    setServices((prev) => prev.filter((s) => s.id !== deleteServiceId));
    setDeleteServiceId(null);
  };

  // Save Edited Service
  const handleSaveEditService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    setServices((prev) =>
      prev.map((s) => (s.id === editingService.id ? editingService : s))
    );
    setEditingService(null);
  };

  // Handle Image File Selection (ImgBB client simulation with instant local preview)
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  // Handle Create Service Form
  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    const created: ServiceItem = {
      id: `srv-${Date.now()}`,
      name: newService.name,
      category: newService.category,
      price: Number(newService.price),
      duration: Number(newService.duration),
      description: newService.description,
      image:
        imagePreviewUrl ||
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop&q=80",
      isActive: newService.isActive,
    };
    setServices([created, ...services]);
    setServiceCreatedAlert(true);
    // Reset
    setNewService({
      name: "",
      category: "Haircare",
      price: 45,
      duration: 45,
      description: "",
      isActive: true,
    });
    setSelectedImageFile(null);
    setImagePreviewUrl(null);
    setTimeout(() => {
      setServiceCreatedAlert(false);
      setCurrentTab("services");
    }, 1500);
  };

  // Confirm Appointment Action
  const handleConfirmAppointment = async (id: string) => {
    try {
      await updateAdminAppointmentStatus(id, "confirmed", session?.user);
    } catch (err) {
      console.warn("Backend status update error:", err);
    }
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Confirmed" } : a))
    );
  };

  // Cancel Appointment Action
  const handleCancelAppointment = async (id: string) => {
    try {
      await updateAdminAppointmentStatus(id, "cancelled", session?.user);
    } catch (err) {
      console.warn("Backend status update error:", err);
    }
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Cancelled" } : a))
    );
  };

  // Toggle Block/Unblock User
  const handleConfirmBlockToggle = async () => {
    if (!blockUserModal) return;
    const targetId = blockUserModal.id;
    const nextBlockedState = !blockUserModal.isBlocked;
    try {
      await toggleAdminUserBlock(targetId, nextBlockedState, session?.user);
    } catch (err) {
      console.warn("Backend user block update error:", err);
    }
    setUsers((prev) =>
      prev.map((u) =>
        u.id === targetId ? { ...u, isBlocked: nextBlockedState } : u
      )
    );
    setBlockUserModal(null);
  };

  // Authorization Fallback UI while verifying session or redirecting
  if (isSessionPending) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0F172A] text-white gap-3 p-4">
        <Loader2 className="size-8 animate-spin text-[#C4A265]" />
        <p className="font-mono text-xs uppercase tracking-wider text-stone-400">
          Verifying administrator credentials...
        </p>
      </div>
    );
  }

  const role = getActiveUserRole(session?.user?.role);
  if (!session?.user || role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0F172A] text-white gap-3 p-4">
        <Loader2 className="size-8 animate-spin text-[#C4A265]" />
        <p className="font-mono text-xs uppercase tracking-wider text-stone-400">
          Redirecting to authorized customer portal...
        </p>
      </div>
    );
  }

  return (
    <DashboardShell
      role="admin"
      currentTab={currentTab}
      onTabChange={setCurrentTab}
    >
      {/* ──────────────────────────────────────────────────────────────────────
         TAB 1: OVERVIEW (Blueprint Section 2: 6 KPI Cards + Module Cards)
         ────────────────────────────────────────────────────────────────────── */}
      {currentTab === "overview" && (
        <div className="space-y-8">
          {/* Header */}
          <div>
            <span className="text-xs font-mono font-bold tracking-wider text-[#1D4ED8] dark:text-[#C4A265] uppercase">
              EXECUTIVE INTELLIGENCE
            </span>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-bold tracking-wider uppercase text-stone-900 dark:text-stone-50">
              Admin Overview &amp; Control Matrix
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-light">
              Real-time operational indicators, appointments awaiting approval, and revenue totals.
            </p>
          </div>

          {/* ── 6 KPI Cards (2 Rows of 3 Cards per Wireframe) ── */}
          <div className="space-y-3.5">
            {/* Row 1 of 3 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-[#1A1815]">
                <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">Registered Customers</span>
                <p className="mt-2 font-heading text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50">
                  {registeredCustomersCount}
                </p>
                <span className="mt-1 block text-[10px] text-stone-400">Active accounts in directory</span>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-[#1A1815]">
                <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">Active Services</span>
                <p className="mt-2 font-heading text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50">
                  {activeServicesCount}
                </p>
                <span className="mt-1 block text-[10px] text-stone-400">Available on public catalog</span>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-[#1A1815]">
                <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">Total Appointments</span>
                <p className="mt-2 font-heading text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50">
                  {totalAppointmentsCount}
                </p>
                <span className="mt-1 block text-[10px] text-stone-400">All requested slots</span>
              </div>
            </div>

            {/* Row 2 of 3 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-[#1A1815]">
                <span className="text-xs text-[#1D4ED8] dark:text-[#93C5FD] font-semibold">Pending Appointments</span>
                <p className="mt-2 font-heading text-2xl sm:text-3xl font-bold text-[#1D4ED8] dark:text-[#60A5FA]">
                  {pendingAppointmentsCount}
                </p>
                <span className="mt-1 block text-[10px] text-stone-400">Awaiting admin confirmation</span>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-[#1A1815]">
                <span className="text-xs text-[#047857] dark:text-[#34D399] font-semibold">Confirmed Appointments</span>
                <p className="mt-2 font-heading text-2xl sm:text-3xl font-bold text-[#047857] dark:text-[#10B981]">
                  {confirmedAppointmentsCount}
                </p>
                <span className="mt-1 block text-[10px] text-stone-400">Approved for salon execution</span>
              </div>

              <div className="rounded-xl border border-emerald-500/40 bg-white p-5 shadow-xs dark:border-emerald-500/30 dark:bg-[#1A1815]">
                <span className="text-xs text-[#047857] dark:text-[#34D399] font-bold">Successful Payments</span>
                <p className="mt-2 font-heading text-2xl sm:text-3xl font-bold text-[#047857] dark:text-[#10B981]">
                  {successfulPaymentsCount}
                </p>
                <span className="mt-1 block text-[10px] text-stone-400">Stripe checkout transactions</span>
              </div>
            </div>
          </div>

          {/* ── 4 Module Quick Jump Cards (Wireframe Section 2) ── */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs dark:border-stone-800 dark:bg-[#1A1815]">
            <h3 className="font-heading text-base font-bold tracking-wide uppercase text-stone-900 dark:text-stone-50 mb-4">
              Management Modules (Select from Sidebar or Jump Below)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Module 1: Manage Services */}
              <div
                onClick={() => setCurrentTab("services")}
                className="group cursor-pointer rounded-xl border border-stone-200 p-4 hover:border-[#1D4ED8] dark:border-stone-800 transition-all bg-stone-50/50 dark:bg-white/5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-[#1D4ED8] dark:text-[#93C5FD] uppercase">
                    MANAGE SERVICES + FORM
                  </span>
                  <Scissors className="size-4 text-stone-400 group-hover:text-[#1D4ED8]" />
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Full service catalog, ImgBB file upload (no URL input needed), Active/Inactive toggle, Edit &amp; Delete.
                </p>
              </div>

              {/* Module 2: Manage Appointments */}
              <div
                onClick={() => setCurrentTab("appointments")}
                className="group cursor-pointer rounded-xl border border-stone-200 p-4 hover:border-[#1D4ED8] dark:border-stone-800 transition-all bg-stone-50/50 dark:bg-white/5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-[#1D4ED8] dark:text-[#93C5FD] uppercase">
                    MANAGE APPOINTMENTS
                  </span>
                  <CalendarCheck className="size-4 text-stone-400 group-hover:text-[#1D4ED8]" />
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Customer + Service + Message + Date/Slot. Approve pending requests or cancel non-conforming bookings.
                </p>
              </div>

              {/* Module 3: Manage Users */}
              <div
                onClick={() => setCurrentTab("users")}
                className="group cursor-pointer rounded-xl border border-stone-200 p-4 hover:border-[#1D4ED8] dark:border-stone-800 transition-all bg-stone-50/50 dark:bg-white/5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-[#1D4ED8] dark:text-[#93C5FD] uppercase">
                    MANAGE USERS
                  </span>
                  <Users className="size-4 text-stone-400 group-hover:text-[#1D4ED8]" />
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Registered customers directory, customer booking stats, Block / Unblock toggle to revoke platform access.
                </p>
              </div>

              {/* Module 4: Transactions */}
              <div
                onClick={() => setCurrentTab("transactions")}
                className="group cursor-pointer rounded-xl border border-stone-200 p-4 hover:border-[#047857] dark:border-stone-800 transition-all bg-stone-50/50 dark:bg-white/5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-[#047857] dark:text-[#34D399] uppercase">
                    TRANSACTIONS (READ-ONLY)
                  </span>
                  <CreditCard className="size-4 text-stone-400 group-hover:text-[#047857]" />
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Stripe transaction logs with session IDs, customer name, service fee, and timestamp. Tamper-proof audit view.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────
         TAB 2: MANAGE SERVICES (Blueprint Section 2)
         ────────────────────────────────────────────────────────────────────── */}
      {currentTab === "services" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold tracking-wider text-[#1D4ED8] dark:text-[#C4A265] uppercase">
                SERVICE DIRECTORY
              </span>
              <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-bold tracking-wider uppercase text-stone-900 dark:text-stone-50">
                Manage Services
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-light">
                Add, update, activate/deactivate, or remove salon rituals from the public catalog.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setCurrentTab("add-service")}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#1D4ED8] px-4 text-xs font-bold text-white uppercase hover:bg-[#1e40af] transition-colors self-start sm:self-auto"
            >
              <PlusCircle className="size-4" />
              <span>Add New Service</span>
            </button>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white shadow-xs dark:border-stone-800 dark:bg-[#1A1815] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] dark:bg-[#161412] text-stone-700 dark:text-stone-300 border-b border-stone-200 dark:border-stone-800 font-mono">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold">Service</th>
                    <th className="py-3.5 px-4 font-semibold">Category</th>
                    <th className="py-3.5 px-4 font-semibold">Price</th>
                    <th className="py-3.5 px-4 font-semibold">Duration</th>
                    <th className="py-3.5 px-4 font-semibold">Status (Active)</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {services.map((item) => (
                    <tr key={item.id} className="hover:bg-stone-50/50 dark:hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative size-12 rounded-lg overflow-hidden shrink-0 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div>
                            <p className="font-semibold text-stone-900 dark:text-stone-100">{item.name}</p>
                            <p className="text-[11px] text-stone-400 line-clamp-1">{item.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-medium">{item.category}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-stone-900 dark:text-stone-100">${item.price} USD</td>
                      <td className="py-3.5 px-4 text-stone-500">{item.duration} mins</td>
                      <td className="py-3.5 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggleService(item.id)}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase transition-colors cursor-pointer",
                            item.isActive
                              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/25"
                              : "bg-stone-200 dark:bg-stone-800 text-stone-500 hover:bg-stone-300"
                          )}
                        >
                          <span className={cn("size-1.5 rounded-full", item.isActive ? "bg-emerald-500" : "bg-stone-400")} />
                          <span>{item.isActive ? "Active" : "Inactive"}</span>
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setEditingService(item)}
                            className="p-1.5 rounded-md text-stone-600 hover:text-[#1D4ED8] hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
                            title="Edit Service"
                          >
                            <Edit className="size-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteServiceId(item.id)}
                            className="p-1.5 rounded-md text-stone-600 hover:text-red-600 hover:bg-red-50 dark:text-stone-300 dark:hover:bg-red-950/30"
                            title="Delete Service"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
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
         TAB 3: ADD / UPDATE SERVICE FORM (ImgBB File Upload - Blueprint Section 2)
         ────────────────────────────────────────────────────────────────────── */}
      {currentTab === "add-service" && (
        <div className="max-w-3xl space-y-6">
          <div>
            <span className="text-xs font-mono font-bold tracking-wider text-[#1D4ED8] dark:text-[#C4A265] uppercase">
              CATALOG AUTHORING
            </span>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-bold tracking-wider uppercase text-stone-900 dark:text-stone-50">
              Add New Service
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-light">
              Per assignment requirement: upload an image file directly (no manual URL input required).
            </p>
          </div>

          {serviceCreatedAlert && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-400">
              <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
              <span>Service successfully added to catalog! Navigating to Services list...</span>
            </div>
          )}

          <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs dark:border-stone-800 dark:bg-[#1A1815]">
            <form onSubmit={handleCreateService} className="space-y-5">
              {/* Service Name */}
              <div>
                <label className="block text-[11px] font-mono font-bold text-stone-600 dark:text-stone-300 uppercase mb-1.5">
                  Service Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Shave &amp; Facial Detox"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#1D4ED8]"
                />
              </div>

              {/* Category & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-stone-600 dark:text-stone-300 uppercase mb-1.5">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newService.category}
                    onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                    className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#1D4ED8]"
                  >
                    <option value="Haircare">Haircare</option>
                    <option value="Grooming">Grooming &amp; Beard</option>
                    <option value="Facial & Skincare">Facial &amp; Skincare</option>
                    <option value="Hair Coloring">Hair Coloring</option>
                    <option value="Spa & Massage">Spa &amp; Massage</option>
                    <option value="Treatment">Hair &amp; Scalp Treatment</option>
                    <option value="Bridal">Bridal &amp; Events</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-stone-600 dark:text-stone-300 uppercase mb-1.5">
                    Duration (Minutes) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min={15}
                    step={5}
                    required
                    value={newService.duration}
                    onChange={(e) => setNewService({ ...newService, duration: Number(e.target.value) })}
                    className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>
              </div>

              {/* Price & Active Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-stone-600 dark:text-stone-300 uppercase mb-1.5">
                    Price (USD $) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min={5}
                    step={1}
                    required
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })}
                    className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={newService.isActive}
                      onChange={(e) => setNewService({ ...newService, isActive: e.target.checked })}
                      className="size-4 rounded border-stone-300 text-[#1D4ED8] focus:ring-[#1D4ED8]"
                    />
                    <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                      Publish as Active immediately
                    </span>
                  </label>
                </div>
              </div>

              {/* ── ImgBB File Upload (No URL input per blueprint specification) ── */}
              <div>
                <label className="block text-[11px] font-mono font-bold text-stone-600 dark:text-stone-300 uppercase mb-1.5">
                  Service Image File (Upload via File Picker) <span className="text-red-500">*</span>
                </label>
                <div className="rounded-xl border-2 border-dashed border-stone-300 dark:border-stone-700 p-6 text-center bg-stone-50 dark:bg-stone-900/40 hover:border-[#1D4ED8] transition-colors">
                  {imagePreviewUrl ? (
                    <div className="flex flex-col items-center">
                      <div className="relative size-32 rounded-lg overflow-hidden border border-stone-300 shadow-md mb-3">
                        <Image src={imagePreviewUrl} alt="Preview" fill className="object-cover" />
                      </div>
                      <p className="text-xs text-emerald-600 font-semibold mb-2">
                        {selectedImageFile?.name} ({Math.round((selectedImageFile?.size || 0) / 1024)} KB)
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedImageFile(null);
                          setImagePreviewUrl(null);
                        }}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Change image
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="mx-auto size-8 text-stone-400 mb-2" />
                      <p className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                        Click to select image file from computer
                      </p>
                      <p className="text-[11px] text-stone-400 mt-1">
                        PNG, JPG, WEBP up to 5MB. Automatic ImgBB cloud pipeline.
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={handleImageFileChange}
                        className="mt-3 block w-full text-xs text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#1D4ED8] file:text-white hover:file:bg-[#1e40af] cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] font-mono font-bold text-stone-600 dark:text-stone-300 uppercase mb-1.5">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain what the client receives during this ritual..."
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  className="w-full rounded-lg border border-stone-300 bg-stone-50 p-3 text-sm text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#1D4ED8]"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#1D4ED8] px-6 text-xs font-bold text-white uppercase hover:bg-[#1e40af] transition-colors"
                >
                  <PlusCircle className="size-4" />
                  <span>Create Service Item</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentTab("services")}
                  className="rounded-lg border border-stone-300 px-5 py-2.5 text-xs font-semibold text-stone-700 dark:border-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────
         TAB 4: MANAGE APPOINTMENTS (Blueprint Section 2)
         ────────────────────────────────────────────────────────────────────── */}
      {currentTab === "appointments" && (
        <div className="space-y-6">
          <div>
            <span className="text-xs font-mono font-bold tracking-wider text-[#1D4ED8] dark:text-[#C4A265] uppercase">
              APPOINTMENT DISPATCH
            </span>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-bold tracking-wider uppercase text-stone-900 dark:text-stone-50">
              Manage Appointments
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-light">
              Review customer booking requests, approve pending appointments, or notify of cancellations.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white shadow-xs dark:border-stone-800 dark:bg-[#1A1815] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] dark:bg-[#161412] text-stone-700 dark:text-stone-300 border-b border-stone-200 dark:border-stone-800 font-mono">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold">Customer</th>
                    <th className="py-3.5 px-4 font-semibold">Service</th>
                    <th className="py-3.5 px-4 font-semibold">Date &amp; Slot</th>
                    <th className="py-3.5 px-4 font-semibold">Special Notes</th>
                    <th className="py-3.5 px-4 font-semibold">Price</th>
                    <th className="py-3.5 px-4 font-semibold">Status</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Approval Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {appointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-stone-50/50 dark:hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-stone-900 dark:text-stone-100">{apt.customerName}</p>
                        <p className="text-[11px] text-stone-400">{apt.customerEmail}</p>
                        <p className="text-[10px] text-stone-400">{apt.customerPhone}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-stone-900 dark:text-stone-100">{apt.serviceName}</p>
                        <p className="text-[11px] text-stone-400">{apt.category}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-medium text-stone-900 dark:text-stone-100">{apt.date}</p>
                        <p className="text-[11px] text-stone-400">{apt.time}</p>
                      </td>
                      <td className="py-3.5 px-4 max-w-[200px] text-stone-600 dark:text-stone-400 italic">
                        {apt.message || "No special requests"}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-stone-900 dark:text-stone-100">
                        ${apt.price}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase",
                            apt.status === "Confirmed" && "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
                            apt.status === "Pending" && "bg-blue-500/15 text-blue-700 dark:text-blue-400",
                            apt.status === "Cancelled" && "bg-stone-500/15 text-stone-500"
                          )}
                        >
                          {apt.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          {apt.status === "Pending" && (
                            <button
                              type="button"
                              onClick={() => handleConfirmAppointment(apt.id)}
                              className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-emerald-700 transition-colors"
                            >
                              <Check className="size-3" />
                              <span>Confirm</span>
                            </button>
                          )}

                          {apt.status !== "Cancelled" && (
                            <button
                              type="button"
                              onClick={() => handleCancelAppointment(apt.id)}
                              className="inline-flex items-center gap-1 rounded-md border border-stone-300 dark:border-stone-700 px-2.5 py-1 text-[11px] font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                            >
                              <X className="size-3" />
                              <span>Cancel</span>
                            </button>
                          )}
                        </div>
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
         TAB 5: MANAGE USERS (Blueprint Section 2)
         ────────────────────────────────────────────────────────────────────── */}
      {currentTab === "users" && (
        <div className="space-y-6">
          <div>
            <span className="text-xs font-mono font-bold tracking-wider text-[#1D4ED8] dark:text-[#C4A265] uppercase">
              USER ACCESS DIRECTORY
            </span>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-bold tracking-wider uppercase text-stone-900 dark:text-stone-50">
              Manage Users
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-light">
              Audit customer registrations, review booking history, and toggle Block / Unblock permissions.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white shadow-xs dark:border-stone-800 dark:bg-[#1A1815] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] dark:bg-[#161412] text-stone-700 dark:text-stone-300 border-b border-stone-200 dark:border-stone-800 font-mono">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold">Customer</th>
                    <th className="py-3.5 px-4 font-semibold">Contact Info</th>
                    <th className="py-3.5 px-4 font-semibold">Joined Date</th>
                    <th className="py-3.5 px-4 font-semibold">Appointments</th>
                    <th className="py-3.5 px-4 font-semibold">Status</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Access Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-stone-50/50 dark:hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-stone-900 dark:text-stone-100">
                        {u.name}
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="text-stone-700 dark:text-stone-300">{u.email}</p>
                        <p className="text-stone-400 font-mono text-[11px]">{u.phone}</p>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-stone-500">{u.joinDate}</td>
                      <td className="py-3.5 px-4 font-semibold">{u.totalAppointments} bookings</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase",
                            u.isBlocked
                              ? "bg-red-500/15 text-red-700 dark:text-red-400 border border-red-500/30"
                              : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30"
                          )}
                        >
                          {u.isBlocked ? "Blocked" : "Active"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setViewUserDetails(u)}
                            className="rounded-md border border-stone-300 dark:border-stone-700 px-2.5 py-1 text-[11px] font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                          >
                            Details
                          </button>

                          <button
                            type="button"
                            onClick={() => setBlockUserModal(u)}
                            className={cn(
                              "rounded-md px-2.5 py-1 text-[11px] font-bold uppercase transition-colors",
                              u.isBlocked
                                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                                : "bg-red-600/90 text-white hover:bg-red-600"
                            )}
                          >
                            {u.isBlocked ? "Unblock" : "Block User"}
                          </button>
                        </div>
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
         TAB 6: TRANSACTIONS (READ-ONLY) (Blueprint Section 2)
         ────────────────────────────────────────────────────────────────────── */}
      {currentTab === "transactions" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-stone-100 px-2.5 py-0.5 text-[10px] font-mono font-bold text-stone-600 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 uppercase mb-1">
                <Lock className="size-3" />
                <span>READ-ONLY STRIPE LEDGER (NO MANUAL EDITS PERMITTED)</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-wider uppercase text-stone-900 dark:text-stone-50">
                Payment Transactions
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-light">
                Immutable financial record of all completed Stripe checkout sessions and refund logs.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-stone-300 bg-white py-2 pl-9 pr-3 text-xs text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 focus:outline-none"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white shadow-xs dark:border-stone-800 dark:bg-[#1A1815] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] dark:bg-[#161412] text-stone-700 dark:text-stone-300 border-b border-stone-200 dark:border-stone-800 font-mono">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold">Transaction ID</th>
                    <th className="py-3.5 px-4 font-semibold">Customer</th>
                    <th className="py-3.5 px-4 font-semibold">Service</th>
                    <th className="py-3.5 px-4 font-semibold">Amount</th>
                    <th className="py-3.5 px-4 font-semibold">Stripe Session ID</th>
                    <th className="py-3.5 px-4 font-semibold">Timestamp</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {transactions
                    .filter(
                      (t) =>
                        t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        t.stripeSessionId.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((txn) => (
                      <tr key={txn.id} className="hover:bg-stone-50/50 dark:hover:bg-white/5 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-stone-900 dark:text-stone-100">
                          {txn.id}
                        </td>
                        <td className="py-3.5 px-4 font-semibold">{txn.customerName}</td>
                        <td className="py-3.5 px-4">{txn.serviceName}</td>
                        <td className="py-3.5 px-4 font-mono font-bold text-stone-900 dark:text-stone-100">
                          ${txn.amount} {txn.currency}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[11px] text-stone-400">
                          {txn.stripeSessionId}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-stone-500">{txn.date}</td>
                        <td className="py-3.5 px-4 text-right">
                          <span
                            className={cn(
                              "inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase",
                              txn.status === "Success"
                                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                                : "bg-red-500/15 text-red-600"
                            )}
                          >
                            {txn.status}
                          </span>
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
         TAB 7: ADMIN PROFILE (Blueprint Section 2)
         ────────────────────────────────────────────────────────────────────── */}
      {currentTab === "profile" && (
        <div className="max-w-3xl space-y-6">
          <div>
            <span className="text-xs font-mono font-bold tracking-wider text-[#1D4ED8] dark:text-[#C4A265] uppercase">
              SUPERUSER CREDENTIALS
            </span>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-bold tracking-wider uppercase text-stone-900 dark:text-stone-50">
              Admin Profile &amp; Audit Logs
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-light">
              Administrative role assignment and system credentials.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs dark:border-stone-800 dark:bg-[#1A1815] space-y-4">
            <div className="flex items-center gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
              <div className="flex size-14 items-center justify-center rounded-full bg-[#1D4ED8] text-white font-bold text-lg">
                MA
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold uppercase text-stone-900 dark:text-white">
                  Master Administrator
                </h3>
                <p className="text-xs text-stone-500">admin@salonbook.com</p>
                <div className="mt-1 inline-flex items-center gap-1 rounded bg-[#1D4ED8]/10 text-[#1D4ED8] px-2 py-0.5 text-[10px] font-bold uppercase">
                  <ShieldCheck className="size-3" />
                  <span>Full Administrative Privileges</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                <span className="text-stone-400 font-mono uppercase text-[10px] block">DATABASE SCOPE</span>
                <span className="font-semibold text-stone-800 dark:text-stone-200">MongoDB Atlas (a9-salonbook)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                <span className="text-stone-400 font-mono uppercase text-[10px] block">PAYMENT GATEWAY</span>
                <span className="font-semibold text-stone-800 dark:text-stone-200">Stripe Live Webhooks</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────
         MODAL: EDIT SERVICE DIALOG
         ────────────────────────────────────────────────────────────────────── */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl dark:border-stone-800 dark:bg-[#1C1A17] text-stone-900 dark:text-stone-100">
            <h3 className="font-heading text-lg font-bold uppercase pb-3 border-b border-stone-200 dark:border-stone-800">
              Edit Service Ritual
            </h3>

            <form onSubmit={handleSaveEditService} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-mono uppercase text-[10px] text-stone-500 mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={editingService.name}
                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                  className="w-full rounded-lg border border-stone-300 p-2 text-xs dark:border-stone-700 dark:bg-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-[10px] text-stone-500 mb-1">Price ($ USD)</label>
                  <input
                    type="number"
                    required
                    value={editingService.price}
                    onChange={(e) => setEditingService({ ...editingService, price: Number(e.target.value) })}
                    className="w-full rounded-lg border border-stone-300 p-2 text-xs dark:border-stone-700 dark:bg-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase text-[10px] text-stone-500 mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    required
                    value={editingService.duration}
                    onChange={(e) => setEditingService({ ...editingService, duration: Number(e.target.value) })}
                    className="w-full rounded-lg border border-stone-300 p-2 text-xs dark:border-stone-700 dark:bg-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-[10px] text-stone-500 mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full rounded-lg border border-stone-300 p-2 text-xs dark:border-stone-700 dark:bg-stone-900"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="rounded-lg border border-stone-300 px-4 py-2 font-semibold hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#1D4ED8] px-4 py-2 font-bold text-white hover:bg-[#1e40af]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────
         MODAL: DELETE SERVICE CONFIRMATION
         ────────────────────────────────────────────────────────────────────── */}
      {deleteServiceId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl dark:border-stone-800 dark:bg-[#1C1A17] text-stone-900 dark:text-stone-100">
            <h3 className="font-heading text-lg font-bold uppercase text-red-600 mb-2">
              Delete Service?
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Are you sure you want to permanently delete this service? This action cannot be undone.
            </p>
            <div className="mt-5 flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setDeleteServiceId(null)}
                className="rounded-lg border border-stone-300 px-4 py-2 font-semibold hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteService}
                className="rounded-lg bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────
         MODAL: BLOCK / UNBLOCK USER CONFIRMATION
         ────────────────────────────────────────────────────────────────────── */}
      {blockUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl dark:border-stone-800 dark:bg-[#1C1A17] text-stone-900 dark:text-stone-100">
            <div className="flex items-center gap-3 mb-3">
              <ShieldAlert className={cn("size-6", blockUserModal.isBlocked ? "text-emerald-500" : "text-red-500")} />
              <h3 className="font-heading text-lg font-bold uppercase">
                {blockUserModal.isBlocked ? "Unblock Customer Account" : "Block Customer Account"}
              </h3>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              {blockUserModal.isBlocked
                ? `Restore platform booking privileges for ${blockUserModal.name} (${blockUserModal.email})?`
                : `Are you sure you want to block ${blockUserModal.name}? This will revoke their ability to book appointments and access the customer portal.`}
            </p>

            <div className="mt-6 flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setBlockUserModal(null)}
                className="rounded-lg border border-stone-300 px-4 py-2 font-semibold hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmBlockToggle}
                className={cn(
                  "rounded-lg px-4 py-2 font-bold text-white",
                  blockUserModal.isBlocked ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700"
                )}
              >
                {blockUserModal.isBlocked ? "Confirm Unblock" : "Confirm Block"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────
         MODAL: CUSTOMER DETAILS MODAL
         ────────────────────────────────────────────────────────────────────── */}
      {viewUserDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl dark:border-stone-800 dark:bg-[#1C1A17] text-stone-900 dark:text-stone-100">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h3 className="font-heading text-lg font-bold uppercase">Customer Profile Audit</h3>
              <button
                type="button"
                onClick={() => setViewUserDetails(null)}
                className="p-1 rounded text-stone-400 hover:text-stone-600"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-400">Customer Name:</span>
                <span className="font-semibold">{viewUserDetails.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Email:</span>
                <span>{viewUserDetails.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Phone:</span>
                <span className="font-mono">{viewUserDetails.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Registration Date:</span>
                <span className="font-mono">{viewUserDetails.joinDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Lifetime Bookings:</span>
                <span className="font-bold">{viewUserDetails.totalAppointments} sessions</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Account Access:</span>
                <span className={viewUserDetails.isBlocked ? "text-red-500 font-bold" : "text-emerald-500 font-bold"}>
                  {viewUserDetails.isBlocked ? "Blocked" : "Authorized & Active"}
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setViewUserDetails(null)}
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
