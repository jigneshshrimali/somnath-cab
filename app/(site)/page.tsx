import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ServicesGrid } from "@/components/home/services-grid";
import { FleetPreview } from "@/components/home/fleet-preview";
import { Destinations } from "@/components/home/destinations";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CtaBanner } from "@/components/home/cta-banner";
import { reviewSchema } from "@/lib/schema-org";
import { TESTIMONIALS, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE.name} | Rajkot Based Cab Service — Local, Outstation & Airport Taxi`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const schema = reviewSchema(TESTIMONIALS);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Hero />
      <ServicesGrid />
      <FleetPreview />
      <Destinations />
      <WhyChooseUs />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
