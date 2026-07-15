import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ContactForm } from "@/components/shared/contact-form";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Somnath Cab for bookings, corporate accounts, or support — call, WhatsApp or send us a message.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Somnath Cab" description="We're available 24x7 for bookings and support." />
      <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />

      <section className="section-padding container-page grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <ContactCard icon={Phone} title="Call Us" value={SITE.phoneDisplay} href={`tel:${SITE.phone}`} />
          <ContactCard icon={Mail} title="Email Us" value={SITE.email} href={`mailto:${SITE.email}`} />
          <ContactCard icon={MapPin} title="Visit Us" value={SITE.address} />
          <ContactCard icon={Clock} title="Working Hours" value="24x7, all days of the week" />

          <div className="overflow-hidden rounded-2xl border border-gray-100">
            {/* PLACEHOLDER — replace with an embed centered on the real office once the address is confirmed */}
            <iframe
              title="Somnath Cab location map"
              src="https://www.google.com/maps?q=Rajkot,Gujarat&output=embed"
              width="100%"
              height="260"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 p-6 shadow-card md:p-8">
          <h2 className="text-h3 font-semibold text-brand-black">Send Us a Message</h2>
          <p className="mt-1 text-sm text-gray-500">We typically respond within a few hours.</p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  icon: Icon,
  title,
  value,
  href,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4 rounded-2xl border border-gray-100 p-5 shadow-card">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand-dark">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm font-semibold text-brand-black">{title}</p>
        <p className="text-sm text-gray-600">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
}
