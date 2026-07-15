import { AIRPORT_FLAT_FARE } from "./constants";

export interface RouteInfo {
  slug: string; // used in the URL: /rajkot-to-{slug}-taxi
  destination: string;
  distanceKm: number; // approximate road distance — public knowledge, not brochure-sourced
  sedanFare: number;
  suvFare: number;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  highlights: string[];
}

/**
 * One-way fixed fares, sourced directly from the Somnath Cab brochure.
 * These are FIXED prices, not computed from distance × rate — the brochure
 * explicitly lists a fare per destination per vehicle class.
 */
export const ROUTES: RouteInfo[] = [
  {
    slug: "ahmedabad",
    destination: "Ahmedabad",
    distanceKm: 216,
    sedanFare: 2199,
    suvFare: 2699,
    metaTitle: "Rajkot to Ahmedabad Taxi — Fixed Fare One Way Cab",
    metaDescription: "Book a one-way taxi from Rajkot to Ahmedabad with Somnath Cab. Fixed fare, Sedan ₹2,199 / SUV ₹2,699, clean cars, verified drivers.",
    intro: "Traveling from Rajkot to Ahmedabad for business or a family visit? Somnath Cab offers a fixed, transparent one-way fare with no last-minute surprises — book a Sedan or SUV and travel in comfort.",
    highlights: ["Fixed one-way fare — no metering surprises", "Experienced drivers on the Rajkot–Ahmedabad highway", "Sedan or SUV options", "Available for early morning or late-night pickup"],
  },
  {
    slug: "surat",
    destination: "Surat",
    distanceKm: 430,
    sedanFare: 5499,
    suvFare: 6199,
    metaTitle: "Rajkot to Surat Taxi — Fixed Fare One Way Cab",
    metaDescription: "Book a one-way taxi from Rajkot to Surat with Somnath Cab. Fixed fare, Sedan ₹5,499 / SUV ₹6,199, comfortable long-distance travel.",
    intro: "A comfortable, fixed-fare one-way ride from Rajkot to Surat — ideal for business travel or visiting family, with an experienced driver for the full distance.",
    highlights: ["Fixed one-way fare for the full Rajkot–Surat distance", "Comfortable Sedan or SUV for long-distance travel", "Professional, verified drivers", "24x7 booking availability"],
  },
  {
    slug: "vadodara",
    destination: "Vadodara",
    distanceKm: 330,
    sedanFare: 3199,
    suvFare: 3799,
    metaTitle: "Rajkot to Vadodara Taxi — Fixed Fare One Way Cab",
    metaDescription: "Book a one-way taxi from Rajkot to Vadodara with Somnath Cab. Fixed fare, Sedan ₹3,199 / SUV ₹3,799.",
    intro: "Travel from Rajkot to Vadodara with a fixed one-way fare — no meter, no surprises, just a comfortable ride from pickup to drop.",
    highlights: ["Fixed one-way fare", "Sedan or SUV options", "Verified, experienced drivers", "24x7 availability"],
  },
  {
    slug: "mumbai",
    destination: "Mumbai",
    distanceKm: 600,
    sedanFare: 8999,
    suvFare: 9999,
    metaTitle: "Rajkot to Mumbai Taxi — Fixed Fare One Way Cab",
    metaDescription: "Book a one-way taxi from Rajkot to Mumbai with Somnath Cab. Fixed fare, Sedan ₹8,999 / SUV ₹9,999, ideal for long-distance travel.",
    intro: "A dedicated one-way cab for the full Rajkot to Mumbai journey — fixed fare agreed upfront, with an experienced long-distance driver.",
    highlights: ["Fixed one-way fare for the complete journey", "Experienced long-distance drivers", "Sedan or SUV options", "Best for early departures to beat traffic"],
  },
  {
    slug: "jamnagar",
    destination: "Jamnagar",
    distanceKm: 90,
    sedanFare: 1499,
    suvFare: 1999,
    metaTitle: "Rajkot to Jamnagar Taxi — Fixed Fare One Way Cab",
    metaDescription: "Book a one-way taxi from Rajkot to Jamnagar with Somnath Cab. Fixed fare, Sedan ₹1,499 / SUV ₹1,999.",
    intro: "Quick, affordable one-way rides from Rajkot to Jamnagar — a fixed fare agreed before you travel.",
    highlights: ["Fixed one-way fare", "Quick regional connection", "Sedan or SUV options", "Same-day booking available"],
  },
  {
    slug: "junagadh",
    destination: "Junagadh",
    distanceKm: 100,
    sedanFare: 1699,
    suvFare: 2199,
    metaTitle: "Rajkot to Junagadh Taxi — Fixed Fare One Way Cab",
    metaDescription: "Book a one-way taxi from Rajkot to Junagadh with Somnath Cab. Fixed fare, Sedan ₹1,699 / SUV ₹2,199.",
    intro: "Heading to Junagadh or Girnar? Somnath Cab offers a fixed one-way fare from Rajkot with comfortable Sedan and SUV options.",
    highlights: ["Fixed one-way fare", "Popular route for Girnar visitors", "Sedan or SUV options", "Experienced regional drivers"],
  },
  {
    slug: "morbi",
    destination: "Morbi",
    distanceKm: 65,
    sedanFare: 1399,
    suvFare: 1899,
    metaTitle: "Rajkot to Morbi Taxi — Fixed Fare One Way Cab",
    metaDescription: "Book a one-way taxi from Rajkot to Morbi with Somnath Cab. Fixed fare, Sedan ₹1,399 / SUV ₹1,899.",
    intro: "A quick, affordable one-way ride from Rajkot to Morbi — fixed fare, no meter running.",
    highlights: ["Fixed one-way fare", "Fast regional connection", "Sedan or SUV options", "Ideal for day trips"],
  },
];

export const AIRPORT_ROUTES: RouteInfo[] = [
  {
    slug: "rajkot-airport",
    destination: "Rajkot Airport (Hirasar)",
    distanceKm: 25,
    sedanFare: AIRPORT_FLAT_FARE,
    suvFare: AIRPORT_FLAT_FARE,
    metaTitle: "Rajkot Airport Taxi — Hirasar Airport Transfer ₹799",
    metaDescription: "Book a Rajkot Airport (Hirasar) taxi transfer with Somnath Cab. Flat ₹799 fare, on-time pickup and drop, 24x7 availability.",
    intro: "Flying in or out of Hirasar Airport? Somnath Cab offers a flat ₹799 transfer between Rajkot and Hirasar Airport — no surge pricing, no meter, just one fixed fare.",
    highlights: ["Flat ₹799 fare, any time of day", "On-time pickup for early flights", "Meet & greet at arrivals available", "Sedan or SUV on request"],
  },
  {
    slug: "hirasar-airport",
    destination: "Hirasar Airport",
    distanceKm: 25,
    sedanFare: AIRPORT_FLAT_FARE,
    suvFare: AIRPORT_FLAT_FARE,
    metaTitle: "Hirasar Airport Taxi — Rajkot Transfer ₹799",
    metaDescription: "Reliable Hirasar Airport taxi service by Somnath Cab. Flat ₹799 fare between Rajkot and Hirasar International Airport.",
    intro: "Somnath Cab provides dependable transfers to and from Hirasar Airport at a flat ₹799 fare — book ahead for a stress-free arrival or departure.",
    highlights: ["Flat ₹799 fare between Rajkot and Hirasar Airport", "24x7 availability for any flight time", "Clean, comfortable vehicles", "Fixed pricing, no surge"],
  },
];

export const ALL_ROUTE_PAGES = [...ROUTES, ...AIRPORT_ROUTES];

export function getRouteBySlug(slug: string): RouteInfo | undefined {
  return ALL_ROUTE_PAGES.find((r) => r.slug === slug);
}

/** Fuzzy-matches a free-text drop location against known fixed-fare routes. */
export function findRouteByDestinationText(text: string): RouteInfo | undefined {
  const normalized = text.trim().toLowerCase();
  if (!normalized) return undefined;
  return ROUTES.find((r) => normalized.includes(r.destination.toLowerCase()));
}

/**
 * Maps each route to the exact URL slug it should live at, so the dynamic
 * `app/(site)/[route]/page.tsx` catch-all can generate all 9 SEO landing
 * pages from one template + this data, matching the requested URL pattern:
 *   /rajkot-to-ahmedabad-taxi, /rajkot-to-surat-taxi, ... /rajkot-airport-taxi, /hirasar-airport-taxi
 */
export interface RoutePage {
  urlSlug: string;
  route: RouteInfo;
  isAirport: boolean;
}

export const ROUTE_PAGES: RoutePage[] = [
  ...ROUTES.map((r) => ({ urlSlug: `rajkot-to-${r.slug}-taxi`, route: r, isAirport: false })),
  ...AIRPORT_ROUTES.map((r) => ({ urlSlug: `${r.slug}-taxi`, route: r, isAirport: true })),
];

export function getRoutePageByUrlSlug(urlSlug: string): RoutePage | undefined {
  return ROUTE_PAGES.find((p) => p.urlSlug === urlSlug);
}
