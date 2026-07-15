import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/service-page-template";

export const metadata: Metadata = {
  title: "Corporate Travel Solutions — Rajkot",
  description: "Reliable corporate cab service in Rajkot for employee transport, client visits and business travel with monthly billing and dedicated account support.",
  alternates: { canonical: "/corporate" },
};

export default function CorporatePage() {
  return (
    <ServicePageTemplate
      breadcrumb={{ name: "Corporate Travel", href: "/corporate" }}
      heroTitle="Corporate Travel Solutions"
      heroDescription="Dependable transport for teams, executives and client visits — with simplified monthly billing."
      image="/images/airport-1.png"
      imageAlt="Business traveler with Somnath Cab sedan at Rajkot airport"
      intro={{
        heading: "Business Travel, Simplified",
        body: [
          "Somnath Cab partners with businesses across Rajkot for employee commutes, executive transport and client pickups. Get a dedicated account manager, consolidated monthly invoicing and priority booking.",
        ],
      }}
      highlights={[
        "Dedicated account manager & priority support",
        "Monthly consolidated billing & GST invoices",
        "Trained, professionally dressed chauffeurs",
        "Flexible contracts for daily, weekly or on-demand needs",
      ]}
      bookingQuery="?tripType=airport"
      faqs={[
        { question: "Do you offer monthly billing for companies?", answer: "Yes, we offer consolidated monthly invoicing with GST-compliant billing for registered businesses." },
        { question: "Can we set up recurring employee pickups?", answer: "Yes, we support recurring scheduled rides for daily employee commutes — contact our team to set this up." },
      ]}
    />
  );
}
