import type { Vehicle, Destination, FAQItem, Testimonial } from "@/types";

/**
 * ⚠️ PLACEHOLDER VALUES — REPLACE BEFORE LAUNCH
 * address and email were not in the source brochure. Update these two fields
 * (and NEXT_PUBLIC_SITE_URL in .env.local) with real details before going live.
 */
export const SITE = {
  name: "Somnath Cab",
  tagline: "Safe Journey, Divine Destination",
  description:
    "Somnath Cab is a premium Rajkot-based taxi and car rental service offering airport transfers, one-way and round trip outstation travel, and local rides across Gujarat.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.somnathcab.in",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+919898661474",
  phoneDisplay: "+91 98986 61474",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "919898661474",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "info@somnathcab.in", // PLACEHOLDER — not in brochure
  address: "Rajkot, Gujarat, India", // PLACEHOLDER — brochure has no street address
  addressShort: "Rajkot, Gujarat",
  geo: { lat: 22.3039, lng: 70.8022 }, // approx Rajkot city center — update once exact address is known
  founded: "", // PLACEHOLDER — not in brochure; leave blank until confirmed, don't guess a year
  owner: "Sanjay Prajapati",
  social: {
    facebook: "https://facebook.com/somnathcab", // PLACEHOLDER
    instagram: "https://instagram.com/somnathcab", // PLACEHOLDER
    twitter: "https://twitter.com/somnathcab", // PLACEHOLDER
  },
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Fleet", href: "/fleet" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Airport Transfer", href: "/airport-transfer" },
      { label: "Outstation Taxi", href: "/outstation-taxi" },
      { label: "Local Taxi", href: "/local-taxi" },
      { label: "Corporate Travel", href: "/corporate" },
      { label: "Wedding Transportation", href: "/wedding" },
      { label: "Tour Packages", href: "/tour-packages" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Fleet", href: "/fleet" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact Us", href: "/contact" },
  ],
  services: [
    { label: "Airport Transfer", href: "/airport-transfer" },
    { label: "Outstation Taxi", href: "/outstation-taxi" },
    { label: "Local Taxi", href: "/local-taxi" },
    { label: "Round Trip", href: "/outstation-taxi#round-trip" },
    { label: "Corporate Travel", href: "/corporate" },
    { label: "Tour Packages", href: "/tour-packages" },
  ],
  support: [
    { label: "FAQs", href: "/faqs" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Booking Policy", href: "/faqs#booking-policy" },
    { label: "Cancellation Policy", href: "/faqs#cancellation" },
  ],
};

/**
 * Fleet per the brochure: two vehicle classes only (Sedan / SUV).
 * ratePerKm below reflects the brochure's round-trip rate (₹10/km, same for
 * both classes since the brochure doesn't differentiate). One-way fares to
 * known destinations use the FIXED fares in lib/routes.ts instead — see
 * lib/fare-calculator.ts for how the two are reconciled.
 */
export const VEHICLES: Vehicle[] = [
  {
    id: "sedan",
    name: "Swift Dzire",
    model: "Sedan",
    vehicleClass: "sedan",
    seats: 4,
    luggage: 2,
    ratePerKm: 10,
    baseFare: 0,
    image: "/images/fleet-city.jpg", // PLACEHOLDER — swap for a real Swift Dzire photo
    features: ["AC", "4 Seater", "Comfortable Sedan", "Ideal for 1-3 Passengers"],
    badge: "Popular",
  },
  {
    id: "suv",
    name: "Maruti Ertiga",
    model: "SUV / MUV",
    vehicleClass: "suv",
    seats: 6,
    luggage: 3,
    ratePerKm: 10,
    baseFare: 0,
    image: "/images/airport-1.png", // PLACEHOLDER — swap for a real Ertiga photo
    features: ["AC", "6-7 Seater", "Extra Luggage Space", "Ideal for Families & Groups"],
    badge: "Best Price",
  },
];

/**
 * Outstation destinations shown on the home page & Outstation Taxi page.
 * Distances are approximate publicly-known road distances from Rajkot —
 * fares come from lib/routes.ts (brochure-sourced fixed fares).
 */
export const OUTSTATION_DESTINATIONS: Destination[] = [
  { name: "Ahmedabad", slug: "ahmedabad", image: "/images/fleet-city.jpg", distanceKm: 216, description: "Business & leisure trips to Gujarat's largest city." },
  { name: "Surat", slug: "surat", image: "/images/fleet-city.jpg", distanceKm: 430, description: "Comfortable long-distance rides to Surat." },
  { name: "Vadodara", slug: "vadodara", image: "/images/fleet-city.jpg", distanceKm: 330, description: "Direct rides to Vadodara, day or night." },
  { name: "Mumbai", slug: "mumbai", image: "/images/fleet-city.jpg", distanceKm: 600, description: "Long-distance comfort for Mumbai road trips." },
  { name: "Jamnagar", slug: "jamnagar", image: "/images/fleet-city.jpg", distanceKm: 90, description: "Quick, affordable rides to Jamnagar." },
  { name: "Junagadh", slug: "junagadh", image: "/images/somnath.png", distanceKm: 100, description: "Gateway to Girnar — comfortable rides to Junagadh." },
  { name: "Morbi", slug: "morbi", image: "/images/fleet-city.jpg", distanceKm: 65, description: "Fast, affordable local-region trips to Morbi." },
];

export const WHY_CHOOSE_US = [
  "Professional & Verified Drivers",
  "Clean, Well-Maintained Vehicles",
  "Transparent, Fixed Pricing — No Hidden Charges",
  "24x7 Availability",
  "On-Time Pickup & Drop, Every Time",
];

export const FEATURE_ICONS = [
  "Rajkot Based Cab Service",
  "One Way & Round Trip Taxi",
  "Rajkot ⇄ Hirasar Airport",
  "Fixed, Transparent Fares",
  "Safe & Comfortable Journeys",
];

/**
 * Only confirmed facts go here — the brochure didn't include customer/fleet
 * counts, so rather than show placeholder dashes to real visitors, this list
 * is intentionally short. Add real figures back in once Sanjay provides them.
 */
export const STATS = [
  { label: "Routes Covered", value: "7+" },
  { label: "Airport Transfer Fare", value: "₹799" },
  { label: "Availability", value: "24x7" },
];

/**
 * ⚠️ PLACEHOLDER TESTIMONIALS — the brochure did not include customer
 * reviews. Replace with real Somnath Cab customer feedback before launch;
 * do not present these as real quotes to site visitors.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Customer Name (placeholder)",
    role: "Rajkot → Ahmedabad",
    rating: 5,
    quote: "[Replace with a real customer review] — smooth, on-time one-way trip with clear pricing upfront.",
  },
  {
    id: "t2",
    name: "Customer Name (placeholder)",
    role: "Airport Transfer",
    rating: 5,
    quote: "[Replace with a real customer review] — driver was on time for our Hirasar Airport pickup, comfortable ride.",
  },
  {
    id: "t3",
    name: "Customer Name (placeholder)",
    role: "Round Trip",
    rating: 4,
    quote: "[Replace with a real customer review] — fair per-km rate for our round trip, no surprises at the end.",
  },
];

export const FAQS: FAQItem[] = [
  { question: "What is the cancellation policy?", answer: "You can cancel free of charge up to 2 hours before pickup. Cancellations within 2 hours may attract a nominal fee.", category: "booking-policy" },
  { question: "Do you provide Rajkot ⇄ Hirasar Airport transfers?", answer: "Yes — a flat ₹799 fare covers Rajkot to Hirasar Airport transfers, any time of day.", category: "airport" },
  { question: "Are your one-way fares fixed or metered?", answer: "One-way fares to major destinations (Ahmedabad, Surat, Vadodara, Mumbai, Jamnagar, Junagadh, Morbi) are fixed, as shown on our Pricing page — no surprises at drop-off.", category: "pricing" },
  { question: "How is round trip pricing calculated?", answer: "Round trips start at ₹10 per kilometer, calculated on the total distance covered for both legs of the journey.", category: "cancellation" },
  { question: "What payment methods do you accept?", answer: "We accept cash, UPI, credit/debit cards and popular wallets through our secure payment gateway." },
  { question: "Are your drivers verified?", answer: "All Somnath Cab drivers undergo background verification and are trained for safety and courtesy." },
];

export const GST_RATE = 0.05; // 5% GST — applied only where fares aren't already fixed/all-inclusive
export const DRIVER_ALLOWANCE_OUTSTATION = 300;
export const DRIVER_ALLOWANCE_LOCAL = 0;
export const ROUND_TRIP_RATE_PER_KM = 10; // per brochure: "Round Trip Start Only ₹10/km"
export const AIRPORT_FLAT_FARE = 799; // per brochure: Rajkot ⇄ Hirasar Airport
