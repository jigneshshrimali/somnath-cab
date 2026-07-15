import { SITE } from "./constants";
import type { FAQItem, Testimonial } from "@/types";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TaxiService"],
    name: SITE.name,
    image: `${SITE.url}/images/somnath-cab-logo.png`,
    "@id": SITE.url,
    url: SITE.url,
    telephone: SITE.phone,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      // PLACEHOLDER — SITE.address is a placeholder until the real Somnath Cab
      // street address is provided; do not publish this schema to production
      // search engines until it's replaced with accurate details.
      streetAddress: SITE.address,
      addressLocality: "Rajkot",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    areaServed: [
      { "@type": "City", name: "Rajkot" },
      { "@type": "State", name: "Gujarat" },
    ],
    sameAs: [SITE.social.facebook, SITE.social.instagram, SITE.social.twitter],
  };
}

export function faqSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function reviewSchema(testimonials: Testimonial[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${SITE.name} Taxi Service`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: (
        testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
      ).toFixed(1),
      reviewCount: testimonials.length,
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: 5 },
      reviewBody: t.quote,
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
