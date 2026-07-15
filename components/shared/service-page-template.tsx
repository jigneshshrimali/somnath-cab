import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs, type Crumb } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQItem } from "@/types";
import { faqSchema } from "@/lib/schema-org";

interface ServicePageTemplateProps {
  breadcrumb: Crumb;
  heroTitle: string;
  heroDescription: string;
  image: string;
  imageAlt: string;
  intro: { heading: string; body: string[] };
  highlights: string[];
  faqs: FAQItem[];
  bookingQuery?: string;
}

export function ServicePageTemplate({
  breadcrumb,
  heroTitle,
  heroDescription,
  image,
  imageAlt,
  intro,
  highlights,
  faqs,
  bookingQuery = "",
}: ServicePageTemplateProps) {
  const schema = faqSchema(faqs);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero title={heroTitle} description={heroDescription} />
      <Breadcrumbs items={[breadcrumb]} />

      <section className="section-padding container-page grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative h-72 overflow-hidden rounded-3xl lg:h-[420px]">
          <Image src={image} alt={imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div>
          <SectionHeading align="left" title={intro.heading} />
          <div className="mt-4 space-y-3 text-gray-600">
            {intro.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <ul className="mt-6 space-y-3">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                <span className="text-gray-700">{h}</span>
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-6">
            <Link href={`/booking${bookingQuery}`}>Book Now</Link>
          </Button>
        </div>
      </section>

      <section className="section-padding bg-brand-light">
        <div className="container-page max-w-3xl">
          <SectionHeading eyebrow="FAQs" title="Frequently Asked Questions" />
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{f.question}</AccordionTrigger>
                <AccordionContent>{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
