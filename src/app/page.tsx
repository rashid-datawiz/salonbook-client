import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import HeroBanner from "@/components/home/hero-banner";
import ServiceCategories from "@/components/home/service-categories";
import FeaturedServices from "@/components/home/featured-services";
import HowItWorks from "@/components/home/how-it-works";
import WhyChooseUs from "@/components/home/why-choose-us";
import Testimonials from "@/components/home/testimonials";
import BookingCta from "@/components/home/booking-cta";

/* ───────────────────────────────────────────────
   Home Page — Public landing page for SalonBook.
   Sections are ordered to guide the visitor:
     1. Hero Banner        → First impression & CTA (Apple & ThemeForest inspired)
     2. Service Categories → Dynamic category navigation
     3. Featured Services  → Popular services from database
     4. How It Works       → Booking flow
     5. Why Choose Us      → Value propositions
     6. Testimonials       → Social proof
     7. Booking CTA        → Final conversion push
   ─────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroBanner />
        <ServiceCategories />
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
