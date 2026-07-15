import Image from "next/image";
import { BookingWidget } from "@/components/booking/booking-widget";
import { FEATURE_ICONS } from "@/lib/constants";
import { ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-black">
      <div className="absolute inset-0">
        <Image
          src="/images/somnath.png"
          alt="Somnath Cab vehicle at Somnath Temple at sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/70 to-brand-black/40" />
      </div>

      <div className="container-page relative py-16 md:py-24">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-brand backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5" /> Rajkot&apos;s Premium Taxi & Car Rental Service
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-h1">
            Safe Journey,{" "}
            <span className="text-brand">Divine Destination</span>
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            Fixed, transparent fares for airport transfers, outstation trips and local rides —
            Rajkot to Ahmedabad, Surat, Vadodara, Mumbai and beyond.
          </p>
        </div>

        <div className="mt-8 max-w-4xl">
          <BookingWidget />
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {FEATURE_ICONS.map((f) => (
            <li key={f} className="rounded-xl bg-white/10 px-3 py-3 text-center text-xs font-medium text-white backdrop-blur">
              {f}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

