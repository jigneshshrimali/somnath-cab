import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/service-page-template";

export const metadata: Metadata = {
  title: "Wedding Car Rental & Transportation — Rajkot",
  description: "Decorated wedding cars and guest transportation in Rajkot. Book Somnath Cab for the bride, groom and family with punctual, well-presented chauffeurs.",
  alternates: { canonical: "/wedding" },
};

export default function WeddingPage() {
  return (
    <ServicePageTemplate
      breadcrumb={{ name: "Wedding Transportation", href: "/wedding" }}
      heroTitle="Wedding Transportation"
      heroDescription="Make your big day seamless with decorated cars and coordinated guest transport."
      image="/images/somnath.png"
      imageAlt="Somnath Cab vehicle available for wedding transportation"
      intro={{
        heading: "Every Detail, Taken Care Of",
        body: [
          "From the baraat to guest pickups, Somnath Cab offers coordinated wedding transportation across Rajkot using our Sedan and SUV fleet. Punctual chauffeurs in formal attire, and multi-vehicle coordination for large guest lists.",
        ],
      }}
      highlights={[
        "Decorated cars available on request",
        "Multi-vehicle coordination for guest transport",
        "Formally dressed, punctual chauffeurs",
        "Dedicated wedding-day coordinator",
      ]}
      bookingQuery="?tripType=local"
      faqs={[
        { question: "Can you arrange multiple cars for wedding guests?", answer: "Yes, we coordinate fleets of multiple vehicles for guest transport with a single point of contact." },
        { question: "Do you provide decorated cars?", answer: "Yes, decoration packages are available on request — let us know your requirements while booking." },
      ]}
    />
  );
}
