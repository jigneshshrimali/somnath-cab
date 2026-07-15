import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Users, Briefcase, Check } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VEHICLES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Our Fleet — Sedan & SUV",
  description: "Explore Somnath Cab's fleet: Swift Dzire (Sedan) and Ertiga (SUV) — clean, well-maintained vehicles driven by verified professionals.",
  alternates: { canonical: "/fleet" },
};

export default function FleetPage() {
  return (
    <>
      <PageHero title="Our Premium Fleet" description="Pick the right vehicle for your trip — from solo city rides to large group tours." />
      <Breadcrumbs items={[{ name: "Fleet", href: "/fleet" }]} />

      <section className="section-padding container-page">
        <div className="grid gap-8 md:grid-cols-2">
          {VEHICLES.map((v) => (
            <div key={v.id} className="overflow-hidden rounded-2xl border border-gray-100 shadow-card">
              <div className="relative h-56">
                <Image src={v.image} alt={`${v.name} rental in Rajkot`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                {v.badge && <Badge className="absolute left-4 top-4">{v.badge}</Badge>}
              </div>
              <div className="p-6">
                <h2 className="text-h3 font-semibold text-brand-black">{v.name}</h2>
                <p className="text-sm text-gray-500">{v.model}</p>
                <div className="mt-3 flex gap-5 text-sm text-gray-600">
                  <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {v.seats} Seats</span>
                  <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {v.luggage} Luggage</span>
                </div>
                <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-700">
                  {v.features.map((f) => (
                    <li key={f} className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-success" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center justify-between">
                  <p className="text-xl font-bold text-brand-dark">
                    {formatCurrency(v.ratePerKm)}<span className="text-sm font-normal text-gray-500">/km round trip</span>
                  </p>
                  <Button asChild>
                    <Link href={`/booking?vehicle=${v.id}`}>Book This Cab</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
