import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { WHY_CHOOSE_US, STATS, SITE } from "@/lib/constants";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${SITE.name}, a Rajkot-based taxi and car rental service led by ${SITE.owner}, offering safe, reliable one-way, round trip and airport taxi services across Gujarat.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Somnath Cab" description="Rajkot's premium travel partner, driven by safety and reliability." />
      <Breadcrumbs items={[{ name: "About", href: "/about" }]} />

      <section className="section-padding container-page grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative h-80 overflow-hidden rounded-3xl lg:h-[420px]">
          {/* PLACEHOLDER — swap for a real Somnath Cab Sedan/SUV photo */}
          <Image src="/images/fleet-city.jpg" alt="Somnath Cab Sedan and SUV fleet" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div>
          <SectionHeading align="left" eyebrow="Our Story" title="Safe Travel, Trusted Service" />
          <p className="mt-4 text-gray-600">
            Somnath Cab is led by {SITE.owner}, offering safe, comfortable and transparent taxi
            service from Rajkot — one-way and round trip outstation travel, Rajkot ⇄ Hirasar
            Airport transfers, and local rides, all with fixed, upfront pricing.
          </p>
          <p className="mt-4 text-gray-600">
            &ldquo;{SITE.tagline}&rdquo; isn&apos;t just our tagline — it&apos;s how we train every
            driver and maintain every vehicle in our fleet.
          </p>
          <ul className="mt-6 space-y-3">
            {WHY_CHOOSE_US.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-brand-light section-padding">
        <div className="container-page grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl bg-white p-6 text-center shadow-card">
              <p className="text-3xl font-bold text-brand-dark">{s.value}</p>
              <p className="mt-1 text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding container-page">
        <SectionHeading eyebrow="Our Mission" title="Comfortable, Transparent, On-Time Travel" description="We believe every journey — whether a short ride across Rajkot or a fixed-fare trip to Ahmedabad, Surat or Mumbai — deserves the same standard of care, safety and punctuality." />
      </section>
    </>
  );
}
