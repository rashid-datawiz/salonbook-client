import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import ServiceDetailsView from "@/components/services/service-details-view";
import { ALL_SERVICES, getServiceById } from "@/data/services";
import { ArrowLeft, Search } from "lucide-react";

interface ServicePageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return ALL_SERVICES.map((service) => ({
    id: service.id,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { id } = await params;
  const service = getServiceById(id);

  if (!service) {
    return {
      title: "Service Not Found — SalonBook",
      description: "The requested salon service could not be located in our catalog.",
    };
  }

  return {
    title: `${service.name} — SalonBook Luxury Hair & Rituals`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailsPage({
  params,
}: ServicePageProps) {
  const { id } = await params;
  const service = getServiceById(id);

  if (!service) {
    return (
      <>
        <Navbar />
        <main className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-[#FDFBF7] dark:bg-[#12100E]">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-red-500/10 text-red-500 border border-red-500/20 mb-4">
            <Search className="size-6" />
          </div>
          <h1 className="font-heading text-2xl font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
            Service Not Found
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-md">
            The service reference &ldquo;{id}&rdquo; was not found in our catalog or may have been retired.
          </p>
          <Link
            href="/services"
            className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#C4A265] px-6 text-xs font-bold tracking-wider text-stone-950 uppercase transition-all hover:bg-[#B39154]"
          >
            <ArrowLeft className="size-3.5" />
            <span>Browse All Available Services</span>
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ServiceDetailsView service={service} />
      </main>
      <Footer />
    </>
  );
}
