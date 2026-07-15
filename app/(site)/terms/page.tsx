import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Somnath Cab terms and conditions covering bookings, cancellations, payments and liability.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms & Conditions" description={`Last updated: ${new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}`} />
      <Breadcrumbs items={[{ name: "Terms & Conditions", href: "/terms" }]} />
      <article className="section-padding container-page prose max-w-3xl text-gray-700">
        <h2>1. Booking & Confirmation</h2>
        <p>
          A booking is confirmed once you receive a booking reference via SMS/email from{" "}
          {SITE.name}. Fare estimates shown at the time of booking are subject to change based on
          actual distance, waiting time, and toll/parking charges.
        </p>
        <h2>2. Cancellation Policy</h2>
        <p>
          Cancellations made more than 2 hours before the scheduled pickup are free of charge.
          Cancellations within 2 hours of pickup may attract a cancellation fee.
        </p>
        <h2>3. Payment</h2>
        <p>
          We accept cash, UPI, credit/debit cards and popular wallets. Online payments are
          processed through secure, PCI-DSS compliant gateways.
        </p>
        <h2>4. Passenger Conduct</h2>
        <p>
          Passengers are expected to treat drivers and vehicles with respect. {SITE.name} reserves
          the right to refuse service in cases of misconduct, safety concerns, or violation of
          these terms.
        </p>
        <h2>5. Liability</h2>
        <p>
          {SITE.name} maintains commercial insurance for all vehicles in its fleet. Liability for
          delays due to weather, traffic, or events beyond our control is limited as per applicable
          law.
        </p>
        <h2>6. Changes to Terms</h2>
        <p>
          We may update these terms periodically. Continued use of our services constitutes
          acceptance of the updated terms.
        </p>
        <h2>7. Governing Law</h2>
        <p>These terms are governed by the laws of India, with jurisdiction in Rajkot, Gujarat.</p>
      </article>
    </>
  );
}
