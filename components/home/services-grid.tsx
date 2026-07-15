import Link from "next/link";
import { Plane, Route, MapPinned, Building2, Heart, Compass } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";

const SERVICES = [
  { icon: Plane, title: "Airport Transfer", desc: "On-time pickup & drop with flight tracking.", href: "/airport-transfer" },
  { icon: Route, title: "Outstation Taxi", desc: "One-way & round trips across Gujarat.", href: "/outstation-taxi" },
  { icon: MapPinned, title: "Local Taxi", desc: "Hourly rentals for city rides & errands.", href: "/local-taxi" },
  { icon: Building2, title: "Corporate Travel", desc: "Reliable transport for business needs.", href: "/corporate" },
  { icon: Heart, title: "Wedding Transportation", desc: "Decorated cars for your big day.", href: "/wedding" },
  { icon: Compass, title: "Tour Packages", desc: "Curated multi-day Gujarat tour plans.", href: "/tour-packages" },
];

export function ServicesGrid() {
  return (
    <section className="section-padding container-page">
      <SectionHeading eyebrow="What We Offer" title="Our Services" description="Everything you need for a comfortable journey, all in one place." />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <Link key={s.title} href={s.href} className="group">
            <Card className="h-full transition-all group-hover:-translate-y-1 group-hover:shadow-card-hover">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/15 text-brand-dark">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="text-h4 font-semibold text-brand-black">{s.title}</h3>
                <p className="mt-1.5 text-sm text-gray-600">{s.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
