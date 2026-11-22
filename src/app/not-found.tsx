import Link from "next/link";
import { Search, Home, Scissors } from "lucide-react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center bg-[#FDFBF7] dark:bg-[#12100E]">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-[#C4A265]/15 text-[#8F6E2E] dark:text-[#C4A265] border border-[#C4A265]/30 mb-5 shadow-lg">
          <Scissors className="size-8 stroke-[1.75]" />
        </div>

        <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#8F6E2E] dark:text-[#C4A265]">
          404 ERROR • PAGE NOT FOUND
        </span>

        <h1 className="mt-2 font-heading text-3xl sm:text-4xl font-bold uppercase tracking-wider text-stone-900 dark:text-stone-50">
          Looking for a Different Ritual?
        </h1>

        <p className="mt-3 text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light max-w-md leading-relaxed">
          The requested salon route or service reference could not be located in our directory. It may have been retired or rescheduled.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#C4A265] px-6 text-xs font-bold tracking-widest text-stone-950 uppercase shadow-md transition-all hover:bg-[#B39154]"
          >
            <Home className="size-3.5" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/services"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-6 text-xs font-semibold tracking-wider text-stone-700 uppercase hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700 transition-colors"
          >
            <Search className="size-3.5" />
            <span>Browse All Services</span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
