import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/service-page-template";

export const metadata: Metadata = {
  title: "Local Taxi & Hourly Rentals in Rajkot",
  description: "Book Somnath Cab for local city rides and hourly rentals in Rajkot — ideal for shopping, errands, meetings and city tours.",
  alternates: { canonical: "/local-taxi" },
};

export default function LocalTaxiPage() {
  return (
    <ServicePageTemplate
      breadcrumb={{ name: "Local Taxi", href: "/local-taxi" }}
      heroTitle="Local Taxi & Hourly Rental"
      heroDescription="City rides and hourly packages for shopping, meetings, errands and more — all within Rajkot."
      image="/images/fleet-city.jpg"
      imageAlt="Somnath Cab sedan available for local Rajkot city rides"
      intro={{
        heading: "Your City Ride, On Demand",
        body: [
          "Need a cab for a few hours to run errands, attend meetings or explore Rajkot? Our hourly rental packages give you a dedicated car and driver for as long as you need, with a fixed inclusive kilometer allowance.",
        ],
      }}
      highlights={[
        "Hourly packages from 4 hours / 40 km",
        "Ideal for shopping, meetings & city tours",
        "No waiting charges within package hours",
        "Instant booking confirmation",
      ]}
      bookingQuery="?tripType=local"
      faqs={[
        { question: "What happens if I exceed the package hours or km?", answer: "Additional hours and kilometers are billed at standard local rates, shown transparently before confirmation." },
        { question: "Can I use the local package for multiple stops?", answer: "Yes, local rentals are ideal for multi-stop trips like shopping runs or city sightseeing." },
      ]}
    />
  );
}
