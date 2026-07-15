import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/service-page-template";
import { AIRPORT_FLAT_FARE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Airport Transfer — Rajkot ⇄ Hirasar Airport Taxi, ₹799",
  description: "Flat ₹799 fare for Rajkot ⇄ Hirasar Airport transfers with Somnath Cab. On-time pickup, meet & greet, and clean, professional cabs available 24x7.",
  alternates: { canonical: "/airport-transfer" },
};

export default function AirportTransferPage() {
  return (
    <ServicePageTemplate
      breadcrumb={{ name: "Airport Transfer", href: "/airport-transfer" }}
      heroTitle="Airport Pickup & Drop"
      heroDescription={`Rajkot ⇄ Hirasar Airport, flat ₹${AIRPORT_FLAT_FARE} fare, any time of day.`}
      image="/images/airport-2.png"
      imageAlt="Somnath Cab driver greeting a passenger at the airport"
      intro={{
        heading: "On-Time, Every Time",
        body: [
          "Flights don't wait, and neither should you. Book ahead so your driver is there when you land — holding a name placard and ready to help with luggage.",
          `Whether it's an early morning departure or a late-night arrival, Somnath Cab offers 24x7 airport transfers at a flat ₹${AIRPORT_FLAT_FARE} fare — no surge pricing, ever.`,
        ],
      }}
      highlights={[
        `Flat ₹${AIRPORT_FLAT_FARE} fare, Rajkot ⇄ Hirasar Airport`,
        "Meet & greet with name placard at arrivals",
        "24x7 availability for any flight time",
        "No surge pricing, regardless of time or demand",
      ]}
      bookingQuery="?tripType=airport"
      faqs={[
        { question: "What is the fare for Hirasar Airport transfers?", answer: `A flat ₹${AIRPORT_FLAT_FARE}, regardless of time of day.` },
        { question: "Where will the driver wait for arrivals?", answer: "Your driver will wait at the arrivals area holding a placard with your name and the Somnath Cab logo." },
        { question: "Can I book for an early morning flight?", answer: "Yes, Somnath Cab is available 24x7, including early morning and late-night airport transfers." },
      ]}
    />
  );
}
