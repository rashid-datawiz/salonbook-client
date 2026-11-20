import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — SalonBook",
  description: "Role-based management portal for SalonBook customers and administrators.",
};

/* ─────────────────────────────────────────────────────────────────────────────
   DashboardLayout Component
   Wraps all role-based dashboards (/dashboard/customer, /dashboard/admin).
   Provides an isolated shell separate from the public public Navbar and Footer.
   ───────────────────────────────────────────────────────────────────────────── */

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#F4F6F8] dark:bg-[#12100E] text-[#0F172A] dark:text-stone-100 flex flex-col font-sans selection:bg-[#C4A265] selection:text-stone-950">
      {children}
    </div>
  );
}
