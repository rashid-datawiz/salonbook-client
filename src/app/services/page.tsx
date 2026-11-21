import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import ServicesCatalog from "@/components/services/services-catalog";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Browse Services — SalonBook Luxury Hair & Ritual Catalog",
  description:
    "Explore our full curated menu of precision haircuts, beard sculpting, balayage coloring, ultrasonic facials, and hot stone massage rituals.",
};

function ServicesLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#12100E] flex flex-col items-center justify-center p-8 text-center">
      <Loader2 className="size-8 animate-spin text-[#C4A265]" />
      <p className="mt-3 font-mono text-xs uppercase tracking-wider text-stone-500">
        Loading SalonBook Services Catalog...
      </p>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<ServicesLoadingSkeleton />}>
          <ServicesCatalog />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
