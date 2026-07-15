import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { OUTSTATION_DESTINATIONS } from "@/lib/constants";

export function Destinations() {
  return (
    <section className="section-padding container-page">
      <SectionHeading eyebrow="Outstation Destinations" title="Explore Gujarat With Us" description="Popular pilgrimage & leisure routes from Rajkot, comfortable and on schedule." />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {OUTSTATION_DESTINATIONS.map((d) => (
          <Link key={d.slug} href={`/outstation-taxi?to=${d.slug}`} className="group relative block h-64 overflow-hidden rounded-2xl">
            <Image src={d.image} alt={`Rajkot to ${d.name} taxi`} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 p-5 text-white">
              <p className="flex items-center gap-1 text-xs font-medium text-brand"><MapPin className="h-3.5 w-3.5" /> {d.distanceKm} km from Rajkot</p>
              <h3 className="mt-1 text-xl font-bold">{d.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
