# Somnath Cab — Migration Report

Migration from Angel Cabs → Somnath Cab, completed on the shared Next.js/TypeScript/Tailwind
platform. This report documents what changed, what's confirmed vs. placeholder, and what's
recommended before public launch.

---

## 1. Migration Report

### Reuse achieved: ~92%
Confirms the original estimate. The booking engine, validation (Zod), state management (TanStack
Query), admin dashboard, accessibility work, animation/interaction patterns, and SEO scaffolding
(sitemap/robots/schema generators) required zero logic changes — only data flowing through them
changed.

### Files changed
| Area | Files | Nature of change |
|---|---|---|
| Brand config | `lib/constants.ts` | Full rewrite: SITE, VEHICLES (2 classes, was 4), OUTSTATION_DESTINATIONS (7 real routes), FAQS, STATS, TESTIMONIALS (placeholder-flagged) |
| Pricing logic | `lib/routes.ts` (new), `lib/fare-calculator.ts` | New fixed-fare route data; fare calculator now branches between brochure fixed fares (one-way/airport) and metered ₹10/km (round trip/local) |
| Design system | `tailwind.config.ts` | Brand palette swapped: yellow/black (#FFC107/#111111) → navy/gold (#0B1D33/#B8933E), sourced from the new logo |
| SEO landing pages | `app/(site)/[route]/page.tsx` (new), `components/shared/route-fare-cards.tsx` (new) | 9 statically-generated pages (7 destinations + 2 airport variants) from one template + data file |
| Sitemap | `app/sitemap.ts` | Extended to include the 9 new route pages |
| Structured data | `lib/schema-org.ts` | Fixed a bug where the *old business's real street address* was hardcoded directly into LocalBusiness schema, bypassing config entirely — now uses the placeholder consistently |
| Brand assets | `public/images/somnath-cab-logo.png`, `public/favicon.ico`, `public/apple-touch-icon.png`, `public/site.webmanifest` | New logo in place; favicon/touch-icon are placeholder copies of the logo (see Tech Debt) |
| Pricing page | `app/(site)/pricing/page.tsx` | Rebuilt from scratch — old per-km table didn't match the brochure's fixed-fare model |
| Content pages | `about`, `airport-transfer`, `outstation-taxi`, `tour-packages`, `wedding`, `corporate`, `gallery`, `blog` data | Rewritten copy, imagery, and fleet references; removed Dwarka/Diu mentions (not in brochure's confirmed routes) |
| Every remaining page | All of `app/(site)/*` | Bulk brand-name/logo/phone swap |

### What did NOT change (by design)
Booking form validation & multi-step flow, admin auth/session logic, TanStack Query wiring,
accessibility patterns (skip links, focus rings, ARIA), CSP/security headers, WhatsApp/call
buttons' underlying mechanics — all brand-agnostic already.

---

## 2. Technical Debt Report

1. **Placeholder imagery** — no real Swift Dzire/Ertiga vehicle photos, no real Rajkot office
   photo, no destination-specific photography exist yet. Several pages currently reuse generic
   Angel Cabs-era stock photography (clearly marked `// PLACEHOLDER` in code) — swap these before
   launch using the image-replacement process already covered earlier in this conversation.
2. **`favicon.ico`** is literally a renamed PNG, not a true multi-resolution ICO container. Works
   in most modern browsers via the `<link>` tag but isn't fully correct — generate a proper one
   (e.g. via realfavicongenerator.net) before launch.
3. **Placeholder business facts** — address, email, domain, and all `STATS`/`TESTIMONIALS` are
   explicitly flagged in `lib/constants.ts`. Do not let these reach production unedited.
4. **Distance figures** in `lib/routes.ts` are approximate public road distances, not
   brochure-sourced — fine for display copy, but don't treat them as billing-accurate.
5. **Round trip / local fare model** is a reasonable placeholder (₹10/km + driver allowance + est.
   toll + GST) inferred from the brochure's one-line note — Sanjay should confirm this matches
   his actual round-trip quoting practice.
6. **Booking persistence** is still the local JSON file store (see prior conversation) — same
   serverless caveat applies regardless of brand.

---

## 3. Performance Report

No architectural performance regressions introduced — same `next/image` usage, same font
loading strategy (`next/font/google`, `display: swap`), same route-based code splitting. The 9 new
SEO pages are statically generated (`○`/`●` in the build output, not `ƒ`), so they carry zero
runtime cost — confirmed via `npm run build`, all 47 routes prerendered successfully.

One net-new consideration: 2 more static pages () than before due to the route-page count, but
since they're static HTML this has no meaningful Core Web Vitals impact.

---

## 4. SEO Report

- 9 new landing pages now target high-intent queries: "Rajkot to Ahmedabad taxi," "Rajkot to Surat
  taxi," "Hirasar airport taxi," etc. — each has unique `title`/`description`/canonical and its own
  `FAQPage` JSON-LD schema (distinct Q&A per page, not duplicated).
- `LocalBusiness`/`TaxiService` schema is intact site-wide but currently carries placeholder
  address data — **do not submit to Google Search Console until the real address is filled in**,
  since incorrect structured data can hurt local SEO trust signals rather than help them.
- Sitemap correctly includes all 9 new pages at priority 0.9 (above general content, below
  homepage).
- Internal linking improved: Outstation Taxi page and Pricing page now link directly into the
  relevant route landing page instead of a generic booking link — better for both SEO (internal
  link equity) and conversion (users see route-specific proof before committing to book).

---

## 5. Accessibility Report

No regressions — same semantic structure, skip link, focus-visible rings, ARIA labeling on
interactive elements. One deliberate improvement: heading color (`text-brand-black`, now mapped to
navy `#0B1D33`) retains strong contrast against white backgrounds; verified the new gold accent
(`#B8933E`) is only ever used with navy text on top of it (`text-brand-black`), not white-on-gold,
preserving WCAG AA contrast on buttons and badges.

---

## 6. Future Improvement Recommendations

1. **Real photography** is the single highest-impact next step — placeholder images are the most
   visible remaining gap between "premium mobility brand" ambition and current state.
2. **Deeper Apple/Uber Black-style visual polish** (custom illustration, more restrained
   typography scale, refined micro-interactions/animations) was intentionally scoped out of this
   pass to focus on correctness of brand/content/pricing migration first — recommend as a
   follow-up design pass once real photography is available to build around.
3. **Admin-editable pricing** — route fares currently require a code change to update; consider
   exposing them through the admin dashboard once the business is past POC stage.
4. **Confirm round-trip/local fare assumptions** with Sanjay directly — the brochure gives one
   data point (₹10/km) and this migration extrapolated a full fare model around it.
5. **Replace `TESTIMONIALS`** with real customer quotes as soon as available — placeholder
   testimonials should never go live as-is.
6. **Verify Junagadh/Girnar tour-package framing** — confirmed with the business owner whether
   Somnath and Dwarka pilgrimage circuits (implied by the brand name) are actually offered, since
   they weren't in the brochure's route list and this migration deliberately avoided asserting
   unconfirmed service coverage.

---

## Open Items Requiring Sanjay's Confirmation

- [ ] Correct phone number (used brochure image: 98986 61474)
- [ ] Real street address for Contact page, footer, and LocalBusiness schema
- [ ] Business email address
- [ ] Domain name for the live site
- [ ] Real customer testimonials
- [ ] Confirmation that Wedding/Corporate/Tour Package services (adapted to Sedan/SUV) are
      actually offered, since they weren't in the original brochure
