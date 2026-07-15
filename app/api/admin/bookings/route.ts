import { NextRequest, NextResponse } from "next/server";
import { getAllBookings } from "@/lib/booking-store";
import { verifySessionToken } from "@/lib/admin-session";

export async function GET(req: NextRequest) {
  const authed = await verifySessionToken(req.cookies.get("admin_session")?.value);
  if (!authed) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const bookings = await getAllBookings();
  return NextResponse.json({ ok: true, bookings });
}
