import { GST_RATE, DRIVER_ALLOWANCE_OUTSTATION, DRIVER_ALLOWANCE_LOCAL, VEHICLES } from "./constants";
import { findRouteByDestinationText, getRouteBySlug } from "./routes";
import type { FareBreakup, TripType } from "@/types";

interface FareInput {
  vehicleId: string;
  tripType: TripType;
  distanceKm: number;
  durationMin: number;
  couponDiscountPercent?: number;
  /** Free-text drop location — used to detect a known fixed-fare route (e.g. "Ahmedabad"). */
  dropText?: string;
  /** Explicit route slug, e.g. from an SEO landing page's "Book Now" link (?route=ahmedabad). */
  routeSlug?: string;
}

/**
 * Fare estimator for Somnath Cab.
 *
 * Two pricing modes, matching the brochure:
 * 1. FIXED fare — one-way trips to a known destination (Ahmedabad, Surat,
 *    Vadodara, Mumbai, Jamnagar, Junagadh, Morbi) or the Rajkot <-> Hirasar
 *    Airport route use a flat, brochure-sourced price. These fares are
 *    treated as all-inclusive (no additional GST/toll layered on top),
 *    matching how the brochure presents them.
 * 2. METERED fare — round trips, local/hourly rentals, or one-way trips to
 *    an unlisted destination fall back to the Rs.10/km round-trip rate with
 *    driver allowance, estimated toll, and GST added transparently.
 */
export function calculateFare({
  vehicleId,
  tripType,
  distanceKm,
  durationMin,
  couponDiscountPercent = 0,
  dropText,
  routeSlug,
}: FareInput): FareBreakup {
  const vehicle = VEHICLES.find((v) => v.id === vehicleId) ?? VEHICLES[0]!;

  const matchedRoute = routeSlug
    ? getRouteBySlug(routeSlug)
    : dropText
      ? findRouteByDestinationText(dropText)
      : undefined;

  const usesFixedFare = tripType === "airport" || (tripType === "one-way" && !!matchedRoute);

  if (usesFixedFare) {
    const flatFare =
      tripType === "airport"
        ? getRouteBySlug("rajkot-airport")?.sedanFare ?? 799
        : vehicle.vehicleClass === "suv"
          ? matchedRoute!.suvFare
          : matchedRoute!.sedanFare;

    const discount = Math.round((flatFare * couponDiscountPercent) / 100);
    const total = flatFare - discount;

    return {
      baseFare: flatFare,
      distanceFare: 0,
      driverAllowance: 0,
      tollAndParking: 0,
      discount,
      gst: 0, // brochure fares are presented as all-inclusive
      total,
      distanceKm: matchedRoute?.distanceKm ?? distanceKm,
      estimatedDurationMin: durationMin,
    };
  }

  // Metered fallback: round trips, local rentals, or unlisted one-way destinations.
  const isOutstation = tripType === "one-way" || tripType === "round-trip";
  const effectiveDistance = tripType === "round-trip" ? distanceKm * 2 : distanceKm;

  const baseFare = vehicle.baseFare;
  const distanceFare = Math.round(effectiveDistance * vehicle.ratePerKm);
  const driverAllowance = isOutstation ? DRIVER_ALLOWANCE_OUTSTATION : DRIVER_ALLOWANCE_LOCAL;
  const tollAndParking = isOutstation ? Math.round(effectiveDistance * 1.5) : 0;

  const subtotal = baseFare + distanceFare + driverAllowance + tollAndParking;
  const discount = Math.round((subtotal * couponDiscountPercent) / 100);
  const taxable = subtotal - discount;
  const gst = Math.round(taxable * GST_RATE);
  const total = taxable + gst;

  return {
    baseFare,
    distanceFare,
    driverAllowance,
    tollAndParking,
    discount,
    gst,
    total,
    distanceKm: effectiveDistance,
    estimatedDurationMin: durationMin,
  };
}

/**
 * Placeholder distance estimator for demo purposes when Google Distance Matrix
 * is not yet wired up. Replace with a real API call in production:
 *   const res = await fetch(`/api/distance?origin=...&destination=...`)
 *
 * Note: for known fixed-fare routes, calculateFare() ignores this estimate
 * entirely and uses the brochure distance/fare instead -- this fallback only
 * matters for round trips, local rentals, and unlisted destinations.
 */
export function estimateDistanceFallback(pickup: string, drop: string): { distanceKm: number; durationMin: number } {
  if (!pickup || !drop) return { distanceKm: 0, durationMin: 0 };
  const matchedRoute = findRouteByDestinationText(drop);
  if (matchedRoute) {
    return { distanceKm: matchedRoute.distanceKm, durationMin: Math.round(matchedRoute.distanceKm * 1.2) };
  }
  // Simple deterministic pseudo-estimate based on string hash so the UI has
  // stable, non-random numbers during development without a live Maps key.
  const hash = (pickup + drop).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const distanceKm = 15 + (hash % 220);
  const durationMin = Math.round(distanceKm * 1.4);
  return { distanceKm, durationMin };
}
