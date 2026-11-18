import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import HeroBanner from "@/components/home/hero-banner";
import FeaturedServices from "@/components/home/featured-services";
import HowItWorks from "@/components/home/how-it-works";
import WhyChooseUs from "@/components/home/why-choose-us";
import Testimonials from "@/components/home/testimonials";
import BookingCta from "@/components/home/booking-cta";

/* ───────────────────────────────────────────────
   Home Page — Public landing page for SalonBook.
   Sections are ordered to guide the visitor:
     1. Hero Banner       → First impression & CTA
     2. Featured Services → What we offer
     3. How It Works      → Booking flow
     4. Why Choose Us     → Value propositions
     5. Testimonials      → Social proof
     6. Booking CTA       → Final conversion push
   ─────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroBanner />
        <FeaturedServices />
        <HowItWorks />
        <WhyChooseUs />
        <Testimonials />
        <BookingCta />
      </main>
      <Footer />
    </>
  );
}
