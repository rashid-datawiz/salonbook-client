"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Scissors,
  LayoutDashboard,
  CalendarCheck,
  User,
  PlusCircle,
  Users,
  CreditCard,
  LogOut,
  ArrowLeft,
  Menu,
  X,
  Shield,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "@/lib/auth-client";

/* ─────────────────────────────────────────────────────────────────────────────
   DashboardShell Component
   Unified responsive shell adhering to the SalonBook Layout Blueprint:
     - Fixed/persistent role-aware Sidebar on Desktop (≥1024px)
     - Slide-over mobile drawer on Tablet/Mobile (<1024px)
     - Role context banner (Customer vs Admin)
     - Session identity display with instant sign-out
   ───────────────────────────────────────────────────────────────────────────── */

export type DashboardRole = "customer" | "admin";

export type NavItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
};

interface DashboardShellProps {
  role: DashboardRole;
  currentTab: string;
  onTabChange: (tabId: string) => void;
  children: React.ReactNode;
}

export default function DashboardShell({
  role,
  currentTab,
  onTabChange,
  children,
}: DashboardShellProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Customer Navigation Items (Blueprint section 1)
  const customerNavItems: NavItem[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "appointments", label: "My Appointments", icon: CalendarCheck, badge: "3 Pending" },
    { id: "profile", label: "My Profile", icon: User },
  ];

  // Admin Navigation Items (Blueprint section 2 - 7 routes)
  const adminNavItems: NavItem[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "services", label: "Manage Services", icon: Scissors },
    { id: "add-service", label: "Add / Update Service", icon: PlusCircle },
    { id: "appointments", label: "Manage Appointments", icon: CalendarCheck, badge: "9 Pending" },
    { id: "users", label: "Manage Users", icon: Users },
    { id: "transactions", label: "Transactions", icon: CreditCard },
    { id: "profile", label: "My Profile", icon: User },
  ];

  const navItems = role === "admin" ? adminNavItems : customerNavItems;

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      router.push("/signin");
      router.refresh();
    } catch (err) {
      console.error("Sign out failed", err);
      setIsSigningOut(false);
    }
  };

  const userName = session?.user?.name || (role === "admin" ? "Master Admin" : "Client User");
  const userEmail = session?.user?.email || (role === "admin" ? "admin@salonbook.com" : "customer@domain.com");
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F8] dark:bg-[#12100E] text-[#0F172A] dark:text-stone-100">
      
      {/* ──────────────────────────────────────────────────────────────────────
         TOP BAR (Blueprint specification)
         ────────────────────────────────────────────────────────────────────── */}
      <header
        className={cn(
          "sticky top-0 z-40 h-16 border-b transition-colors flex items-center justify-between px-4 sm:px-6 lg:px-8",
          role === "admin"
            ? "bg-[#0F172A] text-white border-stone-800"
            : "bg-white dark:bg-[#1A1815] text-[#0F172A] dark:text-white border-stone-200 dark:border-stone-800"
        )}
      >
        {/* Brand & Mobile Hamburger */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            className="lg:hidden p-2 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Open sidebar menu"
          >
            <Menu className="size-5" />
          </button>

          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#C4A265]/20 text-[#C4A265] border border-[#C4A265]/40">
              <Scissors className="size-4" />
            </div>
            <span className="font-heading font-bold text-base sm:text-lg tracking-wider uppercase">
              SALON<span className="text-[#C4A265]">BOOK</span>
            </span>
          </Link>

          <span
            className={cn(
              "hidden sm:inline-block h-4 w-px",
              role === "admin" ? "bg-stone-700" : "bg-stone-300 dark:bg-stone-700"
            )}
          />

          <span
            className={cn(
              "hidden sm:inline-block font-mono text-[11px] font-semibold tracking-wider uppercase",
              role === "admin"
                ? "text-[#C4A265]"
                : "text-stone-500 dark:text-stone-400"
            )}
          >
            {role === "admin" ? "ADMIN CONTROL PANEL" : "CUSTOMER DASHBOARD"}
          </span>
        </div>

        {/* User Context & Sign Out */}
        <div className="flex items-center gap-3">
          {/* Quick role-switch link for tester convenience */}
          <Link
            href={role === "admin" ? "/dashboard/customer" : "/dashboard/admin"}
            className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-[#C4A265]/40 bg-[#C4A265]/10 px-3 py-1 text-[10px] font-bold tracking-wider text-[#C4A265] uppercase hover:bg-[#C4A265]/20 transition-colors"
          >
            <Shield className="size-3" />
            <span>Switch to {role === "admin" ? "Customer" : "Admin"} View</span>
          </Link>

          {/* User profile capsule */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-full bg-[#C4A265] text-xs font-bold text-stone-950 shadow-xs">
              {userInitials}
            </div>

            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold leading-tight truncate max-w-[120px]">
                {userName}
              </span>
              <span className="text-[10px] text-stone-400 font-mono leading-tight truncate max-w-[120px]">
                {userEmail}
              </span>
            </div>
          </div>

          {/* Logout Action */}
          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            title="Sign out"
            className="flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors disabled:opacity-50"
          >
            {isSigningOut ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <LogOut className="size-3.5" />
            )}
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────────────────
         MAIN WRAPPER: Fixed Sidebar + Fluid Content Area
         ────────────────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* ── Desktop Persistent Sidebar (≥1024px) ── */}
        <aside
          className={cn(
            "hidden lg:flex w-64 flex-col justify-between border-r shrink-0 transition-colors",
            role === "admin"
              ? "bg-[#F8FAFC] dark:bg-[#161412] border-stone-200 dark:border-stone-800"
              : "bg-[#F1F5F9] dark:bg-[#181614] border-stone-200 dark:border-stone-800"
          )}
        >
          {/* Top navigation block */}
          <div className="p-4">
            <p className="px-3 text-[11px] font-mono font-bold tracking-wider text-stone-400 dark:text-stone-500 uppercase mb-3">
              {role === "admin" ? "ADMIN NAVIGATION" : "SIDEBAR NAVIGATION"}
            </p>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onTabChange(item.id)}
                    className={cn(
                      "w-full flex items-center justify-between rounded-lg px-3.5 py-2.5 text-xs font-semibold tracking-wide transition-all text-left",
                      isActive
                        ? role === "admin"
                          ? "bg-[#1D4ED8] text-white shadow-sm"
                          : "bg-[#1D4ED8] text-white shadow-sm"
                        : "text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-white/5 hover:text-stone-950 dark:hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={cn("size-4", isActive ? "text-white" : "text-stone-500 dark:text-stone-400")} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-mono font-bold",
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-[#C4A265]/20 text-[#8F6E2E] dark:text-[#C4A265]"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom navigation links */}
          <div className="p-4 border-t border-stone-200 dark:border-stone-800 space-y-1 text-xs">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              <span>{role === "admin" ? "Back to Public Site" : "Back to Home"}</span>
            </Link>

            <Link
              href="/services"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors"
            >
              <Scissors className="size-3.5 text-[#C4A265]" />
              <span>Browse Services</span>
            </Link>
          </div>
        </aside>

        {/* ── Mobile Slide-Over Drawer (<1024px) ── */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileDrawerOpen(false)}
            />

            {/* Drawer Body */}
            <div className="relative w-72 max-w-[80vw] bg-[#141210] text-stone-100 p-5 flex flex-col justify-between shadow-2xl z-10">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <Scissors className="size-5 text-[#C4A265]" />
                    <span className="font-heading font-bold text-base tracking-wider uppercase">
                      SALON<span className="text-[#C4A265]">BOOK</span>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-1 rounded-md text-stone-400 hover:text-white"
                  >
                    <X className="size-5" />
                  </button>
                </div>

                <p className="mt-4 px-2 text-[10px] font-mono font-bold tracking-wider text-[#C4A265] uppercase">
                  {role === "admin" ? "ADMIN NAVIGATION" : "SIDEBAR NAVIGATION"}
                </p>

                <nav className="mt-2 space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentTab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          onTabChange(item.id);
                          setMobileDrawerOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-semibold tracking-wide text-left",
                          isActive
                            ? "bg-[#1D4ED8] text-white"
                            : "text-stone-300 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="size-4" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[10px] rounded-full bg-white/20 px-2 py-0.5 font-mono">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-stone-800 space-y-2 text-xs">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-stone-400 hover:text-white px-2 py-1.5"
                >
                  <ArrowLeft className="size-3.5" />
                  <span>Return to Homepage</span>
                </Link>

                <Link
                  href={role === "admin" ? "/dashboard/customer" : "/dashboard/admin"}
                  className="flex items-center gap-2 text-[#C4A265] font-semibold px-2 py-1.5"
                >
                  <Shield className="size-3.5" />
                  <span>Switch to {role === "admin" ? "Customer" : "Admin"}</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ── Fluid Main Content Area (Scrollable viewport) ── */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}
