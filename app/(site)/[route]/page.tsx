import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { RouteFareCards } from "@/components/shared/route-fare-cards";
import { ROUTE_PAGES, getRoutePageByUrlSlug } from "@/lib/routes";
import { faqSchema } from "@/lib/schema-org";

interface Props {
  params: { route: string };
}

export function generateStaticParams() {
  return ROUTE_PAGES.map((p) => ({ route: p.urlSlug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = getRoutePageByUrlSlug(params.route);
  if (!page) return {};
  return {
    title: page.route.metaTitle,
    description: page.route.metaDescription,
    alternates: { canonical: `/${page.urlSlug}` },
    openGraph: { title: page.route.metaTitle, description: page.route.metaDescription },
  };
}

export default function RouteLandingPage({ params }: Props) {
  const page = getRoutePageByUrlSlug(params.route);
  if (!page) notFound();

  const { route, isAirport } = page;

  const faqs = isAirport
    ? [
        { question: `What is the fare from Rajkot to ${route.destination}?`, answer: `The fare is a flat ${route.sedanFare === route.suvFare ? `₹${route.sedanFare}` : `₹${route.sedanFare} (Sedan) / ₹${route.suvFare} (SUV)`}, all-inclusive.` },
        { question: "Is this fare fixed, or does it change with traffic/time of day?", answer: "It's a fixed flat fare regardless of traffic or time of day — the only thing that matters is the pickup/drop points." },
        { question: "Can I book for an early morning or late-night flight?", answer: "Yes, Somnath Cab is available 24x7 for airport transfers, including early morning departures and late-night arrivals." },
      ]
    : [
        { question: `How much does a one-way taxi from Rajkot to ${route.destination} cost?`, answer: `A one-way trip costs ₹${route.sedanFare} in a Sedan (Swift Dzire) or ₹${route.suvFare} in an SUV (Ertiga) — a fixed fare agreed before you travel.` },
        { question: "Is the fare negotiable or does it change during the trip?", answer: "The fare is fixed at the time of booking and does not change during the journey." },
        { question: "Do you also offer a round trip option for this route?", answer: "Yes — round trips are available at ₹10/km, calculated on the total distance for both legs of the journey." },
      ];

  const schema = faqSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        title={`Rajkot to ${route.destination} Taxi`}
        description={`Fixed fare · ${route.distanceKm} km (approx.) · Sedan & SUV available`}
      />
      <Breadcrumbs items={[{ name: `Rajkot to ${route.destination} Taxi`, href: `/${page.urlSlug}` }]} />

      <section className="section-padding container-page grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative h-72 overflow-hidden rounded-3xl lg:h-[380px]">
          {/* PLACEHOLDER — swap for a real route/destination photo */}
          <Image src="/images/fleet-city.jpg" alt={`Somnath Cab taxi for Rajkot to ${route.destination}`} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div>
          <SectionHeading align="left" title={`Rajkot → ${route.destination}, Fixed Fare`} />
          <p className="mt-4 text-gray-600">{route.intro}</p>
          <ul className="mt-6 space-y-3">
            {route.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                <span className="text-gray-700">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding bg-brand-light">
        <div className="container-page">
          <SectionHeading eyebrow="Fixed Pricing" title={`Rajkot to ${route.destination} Fare`} />
          <div className="mt-10 max-w-3xl mx-auto">
            <RouteFareCards route={route} tripType={isAirport ? "airport" : "one-way"} />
          </div>
        </div>
      </section>

      <section className="section-padding container-page max-w-3xl">
        <SectionHeading eyebrow="FAQs" title="Frequently Asked Questions" />
        <dl className="mt-8 space-y-6">
          {faqs.map((f) => (
            <div key={f.question}>
              <dt className="font-semibold text-brand-black">{f.question}</dt>
              <dd className="mt-1 text-sm text-gray-600">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
