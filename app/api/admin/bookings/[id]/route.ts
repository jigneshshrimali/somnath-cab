import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { updateBookingStatus } from "@/lib/booking-store";
import { verifySessionToken } from "@/lib/admin-session";

const statusSchema = z.object({
  status: z.enum(["pending", "confirmed", "driver-assigned", "ongoing", "completed", "cancelled"]),
});

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const authed = await verifySessionToken(req.cookies.get("admin_session")?.value);
  if (!authed) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = statusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid status value" }, { status: 422 });
  }

  const updated = await updateBookingStatus(params.id, parsed.data.status);
  if (!updated) {
    return NextResponse.json({ ok: false, error: "Booking not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, booking: updated });
}
