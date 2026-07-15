import type { Metadata } from "next";
import { Star } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { TESTIMONIALS } from "@/lib/constants";
import { reviewSchema } from "@/lib/schema-org";

export const metadata: Metadata = {
  title: "Customer Testimonials & Reviews",
  description: "Read what Somnath Cab customers say about our Rajkot taxi, outstation and airport transfer services.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  const schema = reviewSchema(TESTIMONIALS);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero title="What Our Customers Say" description="Real feedback from riders across Rajkot & Gujarat." />
      <Breadcrumbs items={[{ name: "Testimonials", href: "/testimonials" }]} />
      <section className="section-padding container-page grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <Card key={t.id}>
            <CardContent className="p-6">
              <div className="flex gap-0.5 text-brand" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4" fill={i < t.rating ? "currentColor" : "none"} />
                ))}
              </div>
              <p className="mt-4 text-sm italic text-gray-700">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-4 font-semibold text-brand-black">{t.name}</p>
              <p className="text-xs text-gray-500">{t.role}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
