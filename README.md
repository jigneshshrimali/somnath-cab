# Somnath Cab — Cab Booking Platform

Production-grade Next.js 14 (App Router) website for Somnath Cab, a Rajkot-based premium taxi & car rental service.
Built with TypeScript, Tailwind CSS, Framer Motion-ready structure, shadcn/ui-style primitives,
React Hook Form + Zod, and TanStack Query.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router, React Server Components) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS + CVA + tailwind-merge |
| UI Primitives | shadcn/ui-style components on Radix UI |
| Forms | React Hook Form + Zod resolvers |
| Data fetching / caching | TanStack Query |
| Icons | Lucide React |
| Notifications | Sonner (toasts) |
| Animation | Framer Motion (ready to layer onto any component) |

## Getting Started

```bash
npm install
cp .env.example .env.local   # fill in real keys before going to production
npm run dev
```

Visit `http://localhost:3000`.

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # ESLint (next/core-web-vitals ruleset)
npm run typecheck
```

## Project Structure

```
app/                     Next.js App Router routes (one folder per page)
  api/                   Route handlers (bookings, contact, newsletter, distance proxy)
  booking/               Booking engine, success, and tracking pages
  [service pages]/       airport-transfer, outstation-taxi, local-taxi, corporate, wedding, tour-packages
  blog/[slug]/           Dynamic blog post routes
  layout.tsx             Root layout: fonts, metadata, analytics, schema.org, providers
  sitemap.ts / robots.ts Auto-generated SEO files
components/
  ui/                    Design-system primitives (Button, Input, Card, Accordion, Tabs, ...)
  layout/                Navbar, Footer, WhatsApp button, Call button
  booking/               BookingWidget (hero), BookingForm (multi-step engine), VehicleSelector, FareSummary
  home/                  Home page marketing sections
  shared/                Breadcrumbs, SectionHeading, PageHero, ServicePageTemplate, ContactForm
lib/
  constants.ts           Site config, nav links, vehicles, destinations, FAQs, testimonials
  validation.ts          Zod schemas for booking & contact forms
  fare-calculator.ts      Fare estimation engine
  schema-org.ts           JSON-LD generators (LocalBusiness, FAQPage, Review, Breadcrumb)
  utils.ts                cn(), formatters, spam/honeypot helper
providers/
  query-provider.tsx      TanStack Query client provider
types/
  index.ts                Domain types (Booking, Vehicle, FareBreakup, etc.)
middleware.ts             Request-id header + placeholder for rate limiting
```

## Booking Engine

`components/booking/booking-form.tsx` implements a 4-step, fully validated booking flow:

1. **Trip Details** — trip type, pickup/drop (Places-autocomplete ready), up to 5 stops, date/time.
2. **Vehicle & Passengers** — vehicle cards with live per-km fare estimate, passenger/luggage counts.
3. **Contact & Payment** — passenger details, coupon code, payment method, driver instructions.
4. **Review & Confirm** — summary before submission.

A live `FareSummary` sidebar recalculates on every field change using `lib/fare-calculator.ts`.
On submit, the form POSTs to `app/api/bookings/route.ts`, which validates server-side with the
same Zod schema (never trust the client) and returns a booking reference. The UI then redirects
to `/booking/success`.

**Spam protection:** every public form includes a honeypot field plus a minimum-time-to-submit
check (`lib/utils.ts#isLikelySpam`), checked both client- and server-side.

## Distance & Fare Estimation

`lib/fare-calculator.ts#estimateDistanceFallback` provides a deterministic placeholder distance
so the UI works without a Google Maps key. Replace it with a real call once you have credentials:

1. Add `GOOGLE_MAPS_SERVER_KEY` (server-only) and `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (client, HTTP-referrer restricted) to `.env.local`.
2. Load the Places Autocomplete script client-side (or use `@react-google-maps/api`) on the pickup/drop inputs in `booking-widget.tsx` and `booking-form.tsx`.
3. Call `GET /api/distance?origin=...&destination=...` (already implemented as a secret-safe proxy to the Distance Matrix API) instead of the fallback estimator.

## Integrations (architecture-ready, not wired to live keys)

All integration points are scaffolded with clear `TODO` comments and environment variables in
`.env.example`, so a developer can wire up real credentials without changing the surrounding code:

- **Google Maps / Places** — `app/api/distance/route.ts`, `.env` keys.
- **Razorpay / Stripe** — `paymentMethod` field in the booking schema; add a
  `POST /api/payments/create-order` route once a gateway key is available, and call it from
  `booking-form.tsx` before final confirmation for prepaid methods.
- **WhatsApp** — floating button (`components/layout/whatsapp-button.tsx`) using `wa.me` deep
  links; upgrade to the WhatsApp Business API for automated confirmations if needed.
- **Email/SMS notifications** — `app/api/bookings/route.ts` has TODOs for Resend/SendGrid (email)
  and Twilio (SMS).
- **Analytics** — GTM, GA4, and Meta Pixel are loaded in `app/layout.tsx` behind env vars, so
  they're inert until you set `NEXT_PUBLIC_GTM_ID` / `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_META_PIXEL_ID`.

## Admin Dashboard

A password-protected admin dashboard at `/admin` lets the business owner see every incoming
booking and manage it end-to-end — no separate backend service required.

### What it does

- **`/admin/login`** — single-password login (no username; this is a single-operator tool).
- **`/admin`** — the dashboard: every booking, newest first, auto-refreshing every 30 seconds so
  new bookings show up without a manual reload. Each booking card shows the customer's name,
  phone, pickup/drop, date/time, vehicle, fare, and any driver instructions.
- **One-tap contact** — a call icon (`tel:`) and a WhatsApp icon (`wa.me`, pre-filled with the
  booking reference) sit on every booking so the owner can reach the customer immediately.
- **Status workflow** — a dropdown on each card moves the booking through
  `pending → confirmed → driver-assigned → ongoing → completed` (or `cancelled`), calling
  `PATCH /api/admin/bookings/[id]`.
- **Search & filter** — by customer name, phone, or booking reference, and by status.

### Setting up admin access

1. Generate a password hash:
   ```powershell
   node scripts/hash-password.js "YourStrongPassword"
   ```
2. Copy the printed `ADMIN_PASSWORD_HASH=...` line into `.env.local`.
3. Also set `ADMIN_SESSION_SECRET` in `.env.local` to any long random string (used to sign the
   login session cookie — e.g. generate one with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`).
4. Restart `npm run dev`, then visit `http://localhost:3000/admin` — you'll be redirected to
   `/admin/login` until you sign in.

The session is a signed, httpOnly cookie (`admin_session`) valid for 7 days. `middleware.ts`
verifies it (via Web Crypto, so it works at the Edge) before allowing any `/admin/*` route to
render, and independently again inside each `/api/admin/*` route handler.

### How bookings get there

Every submission through the public `/booking` flow POSTs to `/api/bookings`, which validates the
payload server-side and calls `saveBooking()` in `lib/booking-store.ts`. That store currently
persists to a local `data/bookings.json` file — see the important note below before deploying.

### ⚠️ Important: swap the storage backend before deploying to serverless hosting

`lib/booking-store.ts` uses the filesystem (`data/bookings.json`) so the whole booking → admin
flow works immediately with zero setup in local development. **This will not work correctly if
deployed to Vercel or any serverless platform**, because serverless filesystems are read-only /
ephemeral at request time and each function invocation may run on a different instance with no
shared state.

Before going live, replace the four function bodies in `lib/booking-store.ts`
(`getAllBookings`, `getBookingById`, `saveBooking`, `updateBookingStatus`) with real database
calls — nothing else in the app needs to change, since every call site only depends on those four
function signatures. Recommended: Postgres + Prisma (Vercel Postgres, Supabase, Neon, or
PlanetScale all work well with Next.js on Vercel).

## SEO

- Per-page `generateMetadata`/`metadata` exports with title templates, canonical URLs, Open Graph
  and Twitter Card tags.
- JSON-LD structured data: `LocalBusiness` + `TaxiService` (site-wide, in `layout.tsx`), `FAQPage`
  on FAQ/service pages, `Review`/`AggregateRating` on home & testimonials, `BreadcrumbList` on
  every interior page via the shared `Breadcrumbs` component.
- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt` automatically from
  the same route list (extend as you add pages).
- Semantic HTML throughout (`<nav>`, `<main>`, `<article>`, `<section>`, heading hierarchy).

## Performance

- `next/image` everywhere with explicit `sizes` for responsive loading and no CLS.
- `next/font/google` (Poppins) with `display: swap` — no render-blocking font requests.
- Route-based code splitting is automatic with the App Router; heavy client components (forms,
  widgets) are isolated behind `"use client"` boundaries so server components stay lean.
- `loading.tsx` + `Suspense` boundaries around the booking form (which uses `useSearchParams`)
  provide skeleton states instead of blank screens.
- Security headers (CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy) are set in
  `next.config.mjs`.

## Accessibility

- Semantic landmarks, skip-to-content link, visible focus rings (`:focus-visible`).
- All interactive controls have `aria-label`/`aria-live` where appropriate (fare summary, mobile
  menu, breadcrumbs, vehicle radio group).
- Native `<select>`, `<label>`, and Radix primitives (Accordion, Tabs) ship keyboard support and
  correct ARIA roles out of the box.
- Color contrast follows the approved brand palette against white/black backgrounds.

## Security

- All form input is validated with Zod **both** client-side (immediate feedback) and server-side
  (`app/api/*/route.ts`, never trusts the client).
- Honeypot + timing-based spam guard on booking and contact forms.
- `middleware.ts` is a ready hook point for rate limiting (Upstash Redis example included in
  comments) — add real limits before launch.
- CSP and standard security headers configured in `next.config.mjs`.
- No secrets are hardcoded; every integration reads from `process.env` (see `.env.example`).

## Deployment

### Vercel (recommended)

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import the repo in Vercel → it auto-detects Next.js.
3. Add all variables from `.env.example` under Project Settings → Environment Variables.
4. Deploy. Vercel handles image optimization, edge caching and automatic HTTPS.

### Self-hosted (Node server / Docker)

```bash
npm run build
npm run start   # serves on port 3000 by default
```

Put this behind a reverse proxy (Nginx/Caddy) that terminates TLS and forwards to port 3000.
For containerized deployment, use the official `node:20-alpine` base image, copy the repo, run
`npm ci && npm run build`, and `CMD ["npm", "start"]`.

### Pre-launch checklist

- [ ] Fill in every variable in `.env.example` with production values.
- [ ] Generate `ADMIN_PASSWORD_HASH` and `ADMIN_SESSION_SECRET` for the admin dashboard (see "Admin Dashboard" above) — don't ship the defaults.
- [ ] Replace `lib/booking-store.ts`'s file-based storage with a real database before deploying to serverless hosting.
- [ ] Point `NEXT_PUBLIC_SITE_URL` to the real production domain (used by sitemap/canonicals/OG).
- [ ] Restrict the Google Maps API key by HTTP referrer.
- [ ] Wire up real database persistence for bookings (Postgres/Prisma recommended).
- [ ] Connect Resend/SendGrid + Twilio for confirmation emails/SMS.
- [ ] Enable real rate limiting in `middleware.ts` (Upstash Redis or similar).
- [ ] Verify Lighthouse scores (target 95+) on the deployed URL — recheck image sizes and fonts.
- [ ] Submit `sitemap.xml` to Google Search Console.

## Notes on Scope

This codebase implements the full architecture, design system, and every page specified in the
brief (Home, About, Fleet, Airport Transfer, Outstation Taxi, Local Taxi, Corporate, Wedding, Tour
Packages, Pricing, Booking, Booking Success, Booking Tracking, Offers, Testimonials, Blog, FAQs,
Gallery, Contact, Privacy Policy, Terms, 404). Payment gateways, SMS/email delivery, and the
Google Maps/Places integration are wired up architecturally (typed, documented, TODO-marked) but
intentionally not connected to live third-party credentials, since those require secrets only the
business owner can provide safely.
