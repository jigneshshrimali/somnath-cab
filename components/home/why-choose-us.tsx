import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { WHY_CHOOSE_US, STATS } from "@/lib/constants";

export function WhyChooseUs() {
  return (
    <section className="section-padding container-page grid items-center gap-10 lg:grid-cols-2">
      <div className="relative h-80 overflow-hidden rounded-3xl lg:h-[420px]">
        {/* PLACEHOLDER — swap for a real Somnath Cab Swift Dzire / Ertiga photo */}
        <Image src="/images/fleet-city.jpg" alt="Somnath Cab vehicle ready for a Rajkot outstation trip" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </div>
      <div>
        <span className="mb-2 inline-block rounded-full bg-brand/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-dark">Why Choose Us</span>
        <h2 className="text-h2 font-semibold text-brand-black">A Cab Service You Can Rely On</h2>
        <ul className="mt-6 space-y-3">
          {WHY_CHOOSE_US.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-xl bg-brand-light p-4 text-center">
              <p className="text-xl font-bold text-brand-black">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

