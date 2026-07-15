import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQS } from "@/lib/constants";
import { faqSchema } from "@/lib/schema-org";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about Somnath Cab booking, cancellation, pricing and payment policies.",
  alternates: { canonical: "/faqs" },
};

export default function FaqsPage() {
  const schema = faqSchema(FAQS);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero title="Frequently Asked Questions" description="Everything you need to know about booking with Somnath Cab." />
      <Breadcrumbs items={[{ name: "FAQs", href: "/faqs" }]} />
      <section className="section-padding container-page max-w-3xl">
        <Accordion type="single" collapsible>
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} id={f.category}>
              <AccordionTrigger>{f.question}</AccordionTrigger>
              <AccordionContent>{f.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
