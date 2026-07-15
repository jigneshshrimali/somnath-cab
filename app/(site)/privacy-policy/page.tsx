import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Somnath Cab privacy policy — how we collect, use and protect your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" description={`Last updated: ${new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}`} />
      <Breadcrumbs items={[{ name: "Privacy Policy", href: "/privacy-policy" }]} />
      <article className="section-padding container-page prose max-w-3xl text-gray-700">
        <h2>1. Information We Collect</h2>
        <p>
          When you book a ride or contact us through {SITE.name}, we collect information such as
          your name, phone number, email address, pickup/drop locations and payment preference to
          process your booking.
        </p>
        <h2>2. How We Use Your Information</h2>
        <p>
          We use your information solely to fulfil bookings, provide customer support, send
          booking confirmations via SMS/email, and improve our services. We do not sell your
          personal data to third parties.
        </p>
        <h2>3. Data Sharing</h2>
        <p>
          Information may be shared with assigned drivers (name, phone, pickup/drop location only)
          to facilitate your ride, and with payment processors when you choose online payment.
        </p>
        <h2>4. Data Security</h2>
        <p>
          We use industry-standard encryption and access controls to protect your information.
          Payment details are handled by PCI-DSS compliant gateways (Razorpay/Stripe) and never
          stored on our servers.
        </p>
        <h2>5. Cookies & Analytics</h2>
        <p>
          We use cookies and analytics tools (Google Analytics, Google Tag Manager) to understand
          site usage and improve our services. You can control cookie preferences via your browser
          settings.
        </p>
        <h2>6. Your Rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal data by
          contacting us at {SITE.email}.
        </p>
        <h2>7. Contact Us</h2>
        <p>
          For privacy-related questions, reach us at {SITE.email} or {SITE.phoneDisplay}.
        </p>
      </article>
    </>
  );
}
