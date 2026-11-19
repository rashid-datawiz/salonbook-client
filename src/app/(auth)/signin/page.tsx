"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   SignInPage Component
   Modern luxury authentication UI for SalonBook.
   Static frontend implementation ready for Better Auth / NextAuth integration.
   ───────────────────────────────────────────────────────────────────────────── */

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  /* ── Form Submission Handler ── */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmittedStatus(null);

    // ─────────────────────────────────────────────────────────────────────────
    // TODO: Connect Better Auth / NextAuth credential sign-in here:
    // await authClient.signIn.email({ email, password, rememberMe });
    // ─────────────────────────────────────────────────────────────────────────

    // Simulating authentication response for frontend demonstration
    setTimeout(() => {
      setIsLoading(false);
      setSubmittedStatus(`Demo sign-in submitted for ${email}`);
    }, 1000);
  };

  /* ── Social Login Handler ── */
  const handleSocialLogin = (provider: "google" | "github") => {
    setIsLoading(true);
    // ─────────────────────────────────────────────────────────────────────────
    // TODO: Connect Better Auth social provider here:
    // await authClient.signIn.social({ provider });
    // ─────────────────────────────────────────────────────────────────────────
    setTimeout(() => {
      setIsLoading(false);
      setSubmittedStatus(`Redirecting to ${provider} authentication...`);
    }, 600);
  };

  return (
    <div className="w-full max-w-md">
      {/* ── Main Card Container ── */}
      <div className="rounded-2xl border border-white/10 bg-[#181614]/95 p-7 sm:p-9 shadow-2xl backdrop-blur-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#C4A265] uppercase">
            CLIENT PORTAL
          </span>
          <h1 className="mt-2 font-heading text-2xl sm:text-3xl font-bold tracking-wider text-white uppercase">
            WELCOME BACK
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
            Enter your credentials to manage appointments, stylist preferences, and private bookings.
          </p>
        </div>

        {/* Demo Status Banner */}
        {submittedStatus && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300">
            <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
            <span>{submittedStatus}</span>
          </div>
        )}

        {/* ── Social Login Buttons ── */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Google Button */}
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            disabled={isLoading}
            className="flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 text-xs font-semibold tracking-wider text-stone-200 uppercase transition-all duration-200 hover:bg-white/10 hover:border-white/20 active:scale-[0.98] disabled:opacity-50"
          >
            <svg className="size-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Google</span>
          </button>

          {/* GitHub Button */}
          <button
            type="button"
            onClick={() => handleSocialLogin("github")}
            disabled={isLoading}
            className="flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 text-xs font-semibold tracking-wider text-stone-200 uppercase transition-all duration-200 hover:bg-white/10 hover:border-white/20 active:scale-[0.98] disabled:opacity-50"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </button>
        </div>

        {/* Separator */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-[#181614] px-3 font-semibold tracking-widest text-stone-400">
              OR CONTINUE WITH EMAIL
            </span>
          </div>
        </div>

        {/* ── Email & Password Form ── */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-[11px] font-bold tracking-wider text-stone-300 uppercase mb-1.5"
            >
              EMAIL ADDRESS <span className="text-[#C4A265]">*</span>
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-500" />
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-stone-500 transition-colors focus:border-[#C4A265] focus:bg-black/20 focus:outline-none"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="block text-[11px] font-bold tracking-wider text-stone-300 uppercase"
              >
                PASSWORD <span className="text-[#C4A265]">*</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-[11px] font-medium text-stone-400 hover:text-[#C4A265] transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-500" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-stone-500 transition-colors focus:border-[#C4A265] focus:bg-black/20 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 transition-colors"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="size-4 rounded border-stone-700 bg-white/5 text-[#C4A265] focus:ring-[#C4A265] focus:ring-offset-0 focus:outline-none cursor-pointer accent-[#C4A265]"
            />
            <label
              htmlFor="remember"
              className="text-xs text-stone-400 select-none cursor-pointer hover:text-stone-300"
            >
              Remember this device for 30 days
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#C4A265] px-6 text-xs font-bold tracking-widest text-stone-950 uppercase shadow-md transition-all duration-300 hover:bg-[#B39154] hover:shadow-lg active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>AUTHENTICATING...</span>
                </>
              ) : (
                <>
                  <span>SIGN IN TO ACCOUNT</span>
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* ── Sign Up Redirect Footer ── */}
        <div className="mt-8 text-center pt-6 border-t border-white/10">
          <p className="text-xs text-stone-400">
            Don&apos;t have a SalonBook account yet?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#C4A265] hover:text-[#d7b67a] hover:underline transition-colors"
            >
              Create Account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
