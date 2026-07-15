import type { Metadata } from "next";
import { Tag, Percent } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Offers & Discounts",
  description: "Latest Somnath Cab offers and discount codes for local, outstation and airport taxi bookings in Rajkot.",
  alternates: { canonical: "/offers" },
};

const OFFERS = [
  { code: "SOMNATH10", title: "10% Off All Rides", desc: "Get 10% off on your total fare for any local or outstation booking.", icon: Percent },
  { code: "FIRSTRIDE", title: "New Customer Special", desc: "First-time customers get flat ₹100 off on rides above ₹1000.", icon: Tag },
  { code: "AIRPORT50", title: "Airport Transfer Deal", desc: "Flat ₹50 off on all airport pickup and drop bookings.", icon: Tag },
];

export default function OffersPage() {
  return (
    <>
      <PageHero title="Offers & Discounts" description="Save more on your next ride with Somnath Cab." />
      <Breadcrumbs items={[{ name: "Offers", href: "/offers" }]} />
      <section className="section-padding container-page grid gap-6 md:grid-cols-3">
        {OFFERS.map((o) => (
          <Card key={o.code}>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/15 text-brand-dark">
                <o.icon className="h-6 w-6" />
              </div>
              <h3 className="text-h4 font-semibold text-brand-black">{o.title}</h3>
              <p className="mt-1.5 text-sm text-gray-600">{o.desc}</p>
              <Badge className="mt-4" variant="outline">Code: {o.code}</Badge>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
