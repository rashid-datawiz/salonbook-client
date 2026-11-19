"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, Phone, Image as ImageIcon, Lock, Eye, EyeOff, ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { signUp } from "@/lib/auth-client";

/* ─────────────────────────────────────────────────────────────────────────────
   SignUpPage Component
   Modern luxury client registration UI for SalonBook.
   Static frontend implementation ready for Better Auth / NextAuth integration.
   ───────────────────────────────────────────────────────────────────────────── */

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
    password: "",
    confirmPassword: "",
    agreeTerms: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  /* ── Form Field Change Handler ── */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errorMessage) setErrorMessage(null);
  };

  /* ── Form Submission Handler ── */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmittedStatus(null);

    // Validation: Passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter.");
      return;
    }

    // Validation: Password length
    if (formData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    // Validation: Terms
    if (!formData.agreeTerms) {
      setErrorMessage("Please accept the terms and privacy policy to continue.");
      return;
    }

    setIsLoading(true);

    // ─────────────────────────────────────────────────────────────────────────
    // TODO: Connect Better Auth / NextAuth registration here:
    const { error } = await signUp.email({
       name: formData.name,
       email: formData.email,
       password: formData.password,
       image: formData.image || undefined,
       callbackURL: "/",
    });
    if (error) {
      setIsLoading(false);
      setErrorMessage(error.message || "Unable to create your account.");
      return;
    }
    // ─────────────────────────────────────────────────────────────────────────

    // Simulating authentication response for frontend demonstration
    setTimeout(() => {
      setIsLoading(false);
      setSubmittedStatus(
        `Welcome, ${formData.name}! Your SalonBook account has been initialized.`
      );
    }, 1000);
  };

  /* ── Social Login Handler ── */
  const handleSocialSignUp = (provider: "google" | "github") => {
    setIsLoading(true);
    // ─────────────────────────────────────────────────────────────────────────
    // TODO: Connect Better Auth social provider here:
    // await authClient.signIn.social({ provider });
    // ─────────────────────────────────────────────────────────────────────────
    setTimeout(() => {
      setIsLoading(false);
      setSubmittedStatus(`Redirecting to ${provider} registration...`);
    }, 600);
  };

  return (
    <div className="w-full max-w-lg">
      {/* ── Main Card Container ── */}
      <div className="rounded-2xl border border-white/10 bg-[#181614]/95 p-7 sm:p-9 shadow-2xl backdrop-blur-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#C4A265] uppercase">
            MEMBERSHIP PRIVILEGES
          </span>
          <h1 className="mt-2 font-heading text-2xl sm:text-3xl font-bold tracking-wider text-white uppercase">
            CREATE AN ACCOUNT
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
            Join SalonBook to unlock instant scheduling, preferred stylist bookings, and private concierge rituals.
          </p>
        </div>

        {/* Success Status Banner */}
        {submittedStatus && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-300">
            <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
            <span>{submittedStatus}</span>
          </div>
        )}

        {/* Error Banner */}
        {errorMessage && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-300">
            <AlertCircle className="size-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* ── Social Login Buttons ── */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Google Button */}
          <button
            type="button"
            onClick={() => handleSocialSignUp("google")}
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
            onClick={() => handleSocialSignUp("github")}
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
              OR REGISTER WITH EMAIL
            </span>
          </div>
        </div>

        {/* ── Registration Form ── */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-[11px] font-bold tracking-wider text-stone-300 uppercase mb-1.5"
            >
              FULL NAME <span className="text-[#C4A265]">*</span>
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-500" />
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="e.g. David Bentley"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-stone-500 transition-colors focus:border-[#C4A265] focus:bg-black/20 focus:outline-none"
              />
            </div>
          </div>

          {/* Email Address */}
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
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="name@domain.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-stone-500 transition-colors focus:border-[#C4A265] focus:bg-black/20 focus:outline-none"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-[11px] font-bold tracking-wider text-stone-300 uppercase mb-1.5"
            >
              PHONE NUMBER
            </label>
            <div className="relative">
              <Phone className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-500" />
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+880 1234-567890"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-stone-500 transition-colors focus:border-[#C4A265] focus:bg-black/20 focus:outline-none"
              />
            </div>
          </div>

          {/* Profile Image */}
          <div>
            <label
              htmlFor="image"
              className="block text-[11px] font-bold tracking-wider text-stone-300 uppercase mb-1.5"
            >
              PROFILE IMAGE URL
            </label>
            <div className="relative">
              <ImageIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-500" />
              <input
                id="image"
                name="image"
                type="url"
                autoComplete="url"
                placeholder="https://example.com/profile.jpg"
                value={formData.image}
                onChange={handleChange}
                className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-stone-500 transition-colors focus:border-[#C4A265] focus:bg-black/20 focus:outline-none"
              />
            </div>
          </div>

          {/* Password & Confirm Password side by side on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-[11px] font-bold tracking-wider text-stone-300 uppercase mb-1.5"
              >
                PASSWORD <span className="text-[#C4A265]">*</span>
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-500" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  placeholder="Min. 8 chars"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-stone-500 transition-colors focus:border-[#C4A265] focus:bg-black/20 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-[11px] font-bold tracking-wider text-stone-300 uppercase mb-1.5"
              >
                CONFIRM <span className="text-[#C4A265]">*</span>
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-500" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-stone-500 transition-colors focus:border-[#C4A265] focus:bg-black/20 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-start gap-2 pt-1">
            <input
              id="agreeTerms"
              name="agreeTerms"
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="mt-0.5 size-4 rounded border-stone-700 bg-white/5 text-[#C4A265] focus:ring-[#C4A265] focus:ring-offset-0 focus:outline-none cursor-pointer accent-[#C4A265]"
            />
            <label
              htmlFor="agreeTerms"
              className="text-xs text-stone-400 select-none cursor-pointer leading-normal"
            >
              I agree to the{" "}
              <Link href="/" className="text-stone-300 underline hover:text-[#C4A265]">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/" className="text-stone-300 underline hover:text-[#C4A265]">
                Privacy Policy
              </Link>
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
                  <span>CREATING ACCOUNT...</span>
                </>
              ) : (
                <>
                  <span>CREATE SALONBOOK ACCOUNT</span>
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* ── Sign In Redirect Footer ── */}
        <div className="mt-8 text-center pt-6 border-t border-white/10">
          <p className="text-xs text-stone-400">
            Already have a SalonBook account?{" "}
            <Link
              href="/signin"
              className="font-semibold text-[#C4A265] hover:text-[#d7b67a] hover:underline transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
