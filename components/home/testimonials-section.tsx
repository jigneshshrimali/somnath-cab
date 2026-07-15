import { Star } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { TESTIMONIALS } from "@/lib/constants";

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-brand-light">
      <div className="container-page">
        <SectionHeading eyebrow="Testimonials" title="What Our Customers Say" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
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
        </div>
      </div>
    </section>
  );
}
