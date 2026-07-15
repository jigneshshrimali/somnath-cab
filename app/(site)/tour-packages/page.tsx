import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/service-page-template";

export const metadata: Metadata = {
  title: "Gujarat Tour Packages — Multi-Day Cab Itineraries",
  description: "Explore curated multi-day Gujarat & Saurashtra tour packages with Somnath Cab, with a dedicated Sedan or SUV throughout your trip.",
  alternates: { canonical: "/tour-packages" },
};

export default function TourPackagesPage() {
  return (
    <ServicePageTemplate
      breadcrumb={{ name: "Tour Packages", href: "/tour-packages" }}
      heroTitle="Gujarat Tour Packages"
      heroDescription="Multi-day itineraries across Gujarat & Saurashtra, with a dedicated vehicle throughout."
      image="/images/somnath.png"
      imageAlt="Somnath Temple coastline, a popular Gujarat tour destination"
      intro={{
        heading: "Curated Journeys, Zero Hassle",
        body: [
          "Let us plan your Gujarat trip end-to-end. Whether it's a Junagadh & Girnar pilgrimage circuit or a custom multi-city itinerary, we provide one dedicated vehicle and driver for the entire journey — no switching cars, no juggling multiple bookings.",
        ],
      }}
      highlights={[
        "Custom multi-day itineraries on request",
        "Same vehicle & driver throughout the tour",
        "Covers Junagadh/Girnar and other Gujarat destinations",
        "Flexible packages for families & groups",
      ]}
      bookingQuery="?tripType=round-trip"
      faqs={[
        { question: "Can you customize the tour itinerary?", answer: "Yes, our team can tailor the route, duration and stops to match your preferences and budget." },
        { question: "Is accommodation included in the package?", answer: "Tour packages cover transportation. We can recommend partner hotels, but accommodation is booked separately unless specified." },
        { question: "Which destinations can be included in a custom tour?", answer: "Our standard routes cover Ahmedabad, Surat, Vadodara, Mumbai, Jamnagar, Junagadh and Morbi — additional Gujarat destinations can be discussed when you call to plan your itinerary." },
      ]}
    />
  );
}
