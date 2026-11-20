"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";

/* ─────────────────────────────────────────────────────────────────────────────
   SignOutPage Component
   Dedicated confirmation and sign-out route (/signout).
   Enables direct navigation or action triggers to safely terminate active sessions.
   ───────────────────────────────────────────────────────────────────────────── */

export default function SignOutPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signedOut, setSignedOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      setSignedOut(true);
      setTimeout(() => {
        router.push("/signin");
        router.refresh();
      }, 700);
    } catch (err) {
      console.error("Sign out error:", err);
      setIsSigningOut(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-white/10 bg-[#181614]/95 p-7 sm:p-9 shadow-2xl backdrop-blur-md text-center">
        
        {/* Sign Out Icon */}
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-red-500/10 text-red-400 border border-red-500/20 mb-5">
          <LogOut className="size-6" />
        </div>

        <span className="text-[11px] font-bold tracking-[0.25em] text-[#C4A265] uppercase">
          ACCOUNT SESSION
        </span>

        {signedOut ? (
          <div className="mt-3 space-y-4">
            <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm font-semibold">
              <CheckCircle2 className="size-5" />
              <span>Signed out successfully!</span>
            </div>
            <p className="text-xs text-stone-400">Redirecting to sign-in page...</p>
          </div>
        ) : (
          <>
            <h1 className="mt-2 font-heading text-2xl font-bold tracking-wider text-white uppercase">
              SIGN OUT OF SALONBOOK?
            </h1>

            <p className="mt-3 text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
              {isPending
                ? "Checking active credentials..."
                : session?.user
                ? `You are currently signed in as ${session.user.name || session.user.email}. Are you sure you wish to terminate your session?`
                : "You are not currently logged into any active account."}
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3">
              {session?.user && (
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-red-600/90 px-6 text-xs font-bold tracking-widest text-white uppercase shadow-md transition-all hover:bg-red-600 active:scale-[0.98] disabled:opacity-50"
                >
                  {isSigningOut ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>SIGNING OUT...</span>
                    </>
                  ) : (
                    <>
                      <LogOut className="size-4" />
                      <span>CONFIRM SIGN OUT</span>
                    </>
                  )}
                </button>
              )}

              <Link
                href="/"
                className="flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 text-xs font-semibold tracking-wider text-stone-300 uppercase transition-colors hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft className="size-3.5" />
                <span>Return to Homepage</span>
              </Link>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
