import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Button } from "@/components/ui/button";
import { ROUTES, AIRPORT_ROUTES } from "@/lib/routes";
import { ROUND_TRIP_RATE_PER_KM } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing — Fixed One-Way Fares & Airport Transfer",
  description: "Somnath Cab fixed one-way taxi fares from Rajkot to Ahmedabad, Surat, Vadodara, Mumbai and more, plus Hirasar Airport transfer pricing. No hidden charges.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageHero title="Simple, Transparent Pricing" description="Fixed one-way fares, no meter, no surprises." />
      <Breadcrumbs items={[{ name: "Pricing", href: "/pricing" }]} />

      <section className="section-padding container-page">
        <h2 className="text-h3 font-semibold text-brand-black">One Way Taxi — Rajkot To</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-100 shadow-card">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-brand-black text-white">
              <tr>
                <th className="px-6 py-4">Destination</th>
                <th className="px-6 py-4">Sedan (Swift Dzire)</th>
                <th className="px-6 py-4">SUV (Ertiga)</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {ROUTES.map((r, i) => (
                <tr key={r.slug} className={i % 2 === 0 ? "bg-white" : "bg-brand-light"}>
                  <td className="px-6 py-4 font-semibold text-brand-black">{r.destination}</td>
                  <td className="px-6 py-4">{formatCurrency(r.sedanFare)}</td>
                  <td className="px-6 py-4">{formatCurrency(r.suvFare)}</td>
                  <td className="px-6 py-4">
                    <Button asChild size="sm">
                      <Link href={`/booking?tripType=one-way&drop=${encodeURIComponent(r.destination)}`}>Book</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-brand-light p-6">
            <h3 className="text-h4 font-semibold text-brand-black">Round Trip</h3>
            <p className="mt-2 text-2xl font-bold text-brand-dark">
              {formatCurrency(ROUND_TRIP_RATE_PER_KM)}<span className="text-sm font-normal text-gray-500">/km (starting)</span>
            </p>
            <p className="mt-2 text-sm text-gray-600">Calculated on total distance for both legs of the journey.</p>
            <Button asChild className="mt-4" size="sm">
              <Link href="/booking?tripType=round-trip">Book Round Trip</Link>
            </Button>
          </div>
          <div className="rounded-2xl bg-brand-light p-6">
            <h3 className="text-h4 font-semibold text-brand-black">Airport Transfer</h3>
            <p className="mt-2 text-2xl font-bold text-brand-dark">{formatCurrency(AIRPORT_ROUTES[0]?.sedanFare ?? 799)}</p>
            <p className="mt-2 text-sm text-gray-600">Flat fare, Rajkot ⇄ Hirasar Airport, any time of day.</p>
            <Button asChild className="mt-4" size="sm">
              <Link href="/booking?tripType=airport">Book Airport Transfer</Link>
            </Button>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-brand-light p-6 text-sm text-gray-600">
          <h2 className="mb-2 text-h4 font-semibold text-brand-black">What&apos;s included</h2>
          <ul className="list-inside list-disc space-y-1">
            <li>One-way and airport fares above are fixed — no meter, no last-minute additions.</li>
            <li>Round trip pricing is calculated transparently on total distance, with toll/parking billed as per actuals.</li>
            <li>Local/hourly rentals are quoted at the time of booking based on duration and distance.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
