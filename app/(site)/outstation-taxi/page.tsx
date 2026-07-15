import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ServicePageTemplate } from "@/components/shared/service-page-template";
import { SectionHeading } from "@/components/shared/section-heading";
import { OUTSTATION_DESTINATIONS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Outstation Taxi — Rajkot to Ahmedabad, Surat, Vadodara, Mumbai & More",
  description: "Book fixed-fare one-way or round trip outstation taxis from Rajkot to Ahmedabad, Surat, Vadodara, Mumbai, Jamnagar, Junagadh and Morbi with Somnath Cab.",
  alternates: { canonical: "/outstation-taxi" },
};

export default function OutstationTaxiPage() {
  return (
    <>
      <ServicePageTemplate
        breadcrumb={{ name: "Outstation Taxi", href: "/outstation-taxi" }}
        heroTitle="Outstation Taxi Service"
        heroDescription="Fixed-fare one-way & transparent round trip journeys — Ahmedabad, Surat, Vadodara, Mumbai and more."
        image="/images/fleet-city.jpg"
        imageAlt="Somnath Cab vehicle ready for an outstation trip from Rajkot"
        intro={{
          heading: "Travel Gujarat, Worry-Free",
          body: [
            "Whether it's business travel to Ahmedabad and Surat or a family trip to Vadodara or Mumbai, our outstation taxis are built for long-distance comfort — well-maintained vehicles, experienced drivers, and a fixed, transparent one-way fare agreed before you travel.",
            "Choose one-way for a fixed brochure fare to major destinations, or round trip at ₹10/km for return journeys.",
          ],
        }}
        highlights={[
          "Fixed one-way fares — no meter, no surprises",
          "Round trip at a transparent ₹10/km",
          "Experienced drivers familiar with highway routes",
          "24x7 support during your journey",
        ]}
        bookingQuery="?tripType=one-way"
        faqs={[
          { question: "Are one-way fares fixed or metered?", answer: "Fixed. Our one-way fares to Ahmedabad, Surat, Vadodara, Mumbai, Jamnagar, Junagadh and Morbi are set in advance — see the Pricing page for exact amounts by vehicle." },
          { question: "Can I make multiple stops on an outstation trip?", answer: "Yes, you can add up to 5 stops when booking. Additional waiting time may apply." },
          { question: "How is round trip pricing calculated?", answer: "Round trips start at ₹10/km, calculated on the total distance covered across both legs of the journey." },
        ]}
      />

      <section className="section-padding container-page">
        <SectionHeading eyebrow="Popular Routes" title="Rajkot Outstation Destinations" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {OUTSTATION_DESTINATIONS.map((d) => (
            <Link key={d.slug} href={`/rajkot-to-${d.slug}-taxi`} className="group relative block h-52 overflow-hidden rounded-2xl">
              <Image src={d.image} alt={`Rajkot to ${d.name} taxi service`} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 p-4 text-white">
                <h3 className="text-lg font-bold">Rajkot → {d.name}</h3>
                <p className="text-xs text-gray-300">{d.distanceKm} km · {d.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
