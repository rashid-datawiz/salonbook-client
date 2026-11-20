"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useSession, getActiveUserRole } from "@/lib/auth-client";

/* ─────────────────────────────────────────────────────────────────────────────
   DashboardIndexPage (/dashboard)
   Evaluates authenticated role and automatically routes to the proper portal:
     - Admin  -> /dashboard/admin
     - Client -> /dashboard/customer
   ───────────────────────────────────────────────────────────────────────────── */

export default function DashboardIndexPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending) {
      if (!session?.user) {
        // If unauthenticated, redirect to signin
        router.replace("/signin");
      } else {
        const role = getActiveUserRole(session.user.role);
        if (role === "admin") {
          router.replace("/dashboard/admin");
        } else {
          router.replace("/dashboard/customer");
        }
      }
    }
  }, [session, isPending, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#F4F6F8] dark:bg-[#12100E]">
      <div className="flex flex-col items-center gap-3 text-center">
        <Loader2 className="size-8 animate-spin text-[#1D4ED8] dark:text-[#C4A265]" />
        <p className="font-mono text-xs uppercase tracking-wider text-stone-500">
          Routing to authorized role dashboard...
        </p>
      </div>
    </div>
  );
}
