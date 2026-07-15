import Image from "next/image";
import Link from "next/link";
import { Users, Briefcase } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VEHICLES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

export function FleetPreview() {
  return (
    <section className="section-padding bg-brand-light">
      <div className="container-page">
        <SectionHeading eyebrow="Our Fleet" title="Choose Your Ride" description="A well-maintained fleet for every trip — from solo city rides to group tours." />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VEHICLES.map((v) => (
            <Card key={v.id} className="overflow-hidden">
              <div className="relative h-40 bg-white">
                <Image src={v.image} alt={v.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                {v.badge && <Badge className="absolute left-3 top-3">{v.badge}</Badge>}
              </div>
              <CardContent className="p-5">
                <h3 className="font-semibold text-brand-black">{v.name}</h3>
                <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {v.seats} Seats</span>
                  <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {v.luggage} Bags</span>
                </div>
                <p className="mt-3 text-lg font-bold text-brand-dark">{formatCurrency(v.ratePerKm)}<span className="text-xs font-normal text-gray-500">/km round trip</span></p>
                <Button asChild className="mt-4 w-full" size="sm">
                  <Link href={`/booking?vehicle=${v.id}`}>Book Now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
