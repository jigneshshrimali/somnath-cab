import { NextRequest, NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validation";
import { generateBookingRef } from "@/lib/utils";
import { saveBooking } from "@/lib/booking-store";
import type { Booking } from "@/types";

/**
 * POST /api/bookings
 *
 * Production checklist:
 * 1. Replace JSON file storage with a real database.
 * 2. Add Rate Limiting.
 * 3. Add Email/SMS notifications.
 * 4. Add Payment Gateway.
 * 5. Recalculate fare on the server.
 */

export async function POST(req: NextRequest) {
  console.log("========== BOOKING API START ==========");

  try {
    console.log("Reading request body...");
    const body = await req.json();

    console.log("Validating request...");
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      console.error("Validation Failed:", parsed.error.flatten());

      return NextResponse.json(
        {
          ok: false,
          error: "Validation failed",
          issues: parsed.error.flatten(),
        },
        { status: 422 }
      );
    }

    // Honeypot spam protection
    if (parsed.data.honeypot) {
      console.warn("Spam detected (honeypot triggered)");

      return NextResponse.json(
        {
          ok: false,
          error: "Spam detected",
        },
        { status: 400 }
      );
    }

    console.log("Generating Booking Reference...");

    const bookingRef = generateBookingRef();

    const booking: Booking = {
      ...parsed.data,
      id: crypto.randomUUID(),
      bookingRef,
      status: "pending",

      // TODO:
      // Recalculate this on the server in production.
      // fare: parsed.data.fare,
      fare: typeof body.fare === "number" ? body.fare : 0,
      createdAt: new Date().toISOString(),
    };

    console.log("Booking object created.");
    console.log("Saving booking...");

    await saveBooking(booking);

    console.log("Booking saved successfully.");
    console.log("========== BOOKING API SUCCESS ==========");

    return NextResponse.json(
      {
        ok: true,
        bookingRef,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("========== BOOKING API ERROR ==========");
    console.error(err);

    return NextResponse.json(
      {
        ok: false,
        error:
          err instanceof Error
            ? err.message
            : "Unexpected server error",
      },
      { status: 500 }
    );
  }
}