import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/distance?origin=...&destination=...
 * Server-side proxy to Google Distance Matrix API so the API key stays secret.
 * Wire this up once NEXT_PUBLIC_GOOGLE_MAPS_API_KEY / a server-side key is configured.
 */
export async function GET(req: NextRequest) {
  const origin = req.nextUrl.searchParams.get("origin");
  const destination = req.nextUrl.searchParams.get("destination");
  const apiKey = process.env.GOOGLE_MAPS_SERVER_KEY;

  if (!origin || !destination) {
    return NextResponse.json({ ok: false, error: "origin and destination are required" }, { status: 400 });
  }
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "GOOGLE_MAPS_SERVER_KEY not configured; using client-side fallback estimate." },
      { status: 501 }
    );
  }

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();
  return NextResponse.json(data);
}
