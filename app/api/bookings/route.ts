import { NextRequest, NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validation";
import { generateBookingRef } from "@/lib/utils";
import { saveBooking } from "@/lib/booking-store";
import type { Booking } from "@/types";

/**
 * POST /api/bookings
 *
 * Production checklist (not wired up here to avoid hardcoding secrets):
 * 1. Rate limit by IP (e.g. Upstash Redis + @upstash/ratelimit) — see RATE_LIMIT_REDIS_URL.
 * 2. Verify a CSRF token / same-origin header for non-GET requests behind a session.
 * 3. Swap lib/booking-store.ts's file-based persistence for a real database
 *    (Prisma/Postgres, PlanetScale, etc.) once deploying to serverless infra.
 * 4. Trigger email (Resend/SendGrid) + SMS (Twilio) confirmations.
 * 5. If prepaid, create a Razorpay/Stripe order and return the client secret / order id.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
        { status: 422 }
      );
    }

    // Honeypot / spam guard (defense in depth alongside client-side check)
    if (parsed.data.honeypot) {
      return NextResponse.json({ ok: false, error: "Spam detected" }, { status: 400 });
    }

    const bookingRef = generateBookingRef();
    const booking: Booking = {
      ...parsed.data,
      id: crypto.randomUUID(),
      bookingRef,
      status: "pending",
      // Server recomputes nothing here yet — the client-calculated fare is
      // trusted for this MVP. In production, recompute the fare server-side
      // from pickup/drop + vehicle so a tampered client request can't alter price.
      fare: (body as Booking).fare,
      createdAt: new Date().toISOString(),
    };

    await saveBooking(booking);

    // TODO: send email/SMS confirmations, create payment intent if prepaid.

    return NextResponse.json({ ok: true, bookingRef }, { status: 201 });
  } catch (err) {
  console.error("Booking API Error:", err);

  return NextResponse.json(
    {
      ok: false,
      error: "Unexpected server error",
    },
    { status: 500 }
  );
}
}

