import { createClient } from "@supabase/supabase-js";
import { promises as fs } from "fs";
import path from "path";
import type { Booking } from "@/types";

/**
 * Booking persistence, with automatic backend selection:
 *
 * - If SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set (e.g. after
 *   creating a Supabase project and running supabase/schema.sql — see
 *   README.md "Setting up Supabase"), bookings persist to a real Postgres
 *   table. This works correctly on serverless infrastructure like Vercel.
 * - Otherwise, falls back to a local data/bookings.json file, which is fine
 *   for local development but NOT for serverless deployment (ephemeral
 *   filesystem, no shared state between function instances).
 *
 * Every call site in the app only depends on the four exported function
 * signatures at the bottom of this file — the backend swap above doesn't
 * touch any UI or API route code.
 */

const hasSupabase = Boolean(
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Uses the SERVICE ROLE key (server-only, never exposed to the browser) so
// this can read/write regardless of Row Level Security policies. Only ever
// import this module from server code (API routes) — never from a
// "use client" component.
const supabase = hasSupabase
  ? createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_SERVICE_ROLE_KEY as string, {
      auth: { persistSession: false },
    })
  : null;

const TABLE = "bookings";

// ---------------------------------------------------------------------------
// Supabase-backed implementation (production / Vercel, once configured)
// ---------------------------------------------------------------------------

async function supabaseGetAllBookings(): Promise<Booking[]> {
  const { data, error } = await supabase!
    .from(TABLE)
    .select("data")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`Supabase getAllBookings failed: ${error.message}`);
  return (data ?? []).map((row) => row.data as Booking);
}

async function supabaseGetBookingById(id: string): Promise<Booking | null> {
  const { data, error } = await supabase!
    .from(TABLE)
    .select("data")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`Supabase getBookingById failed: ${error.message}`);
  return data ? (data.data as Booking) : null;
}

async function supabaseSaveBooking(booking: Booking): Promise<void> {
  const { error } = await supabase!.from(TABLE).insert({
    id: booking.id,
    booking_ref: booking.bookingRef,
    status: booking.status,
    created_at: booking.createdAt,
    data: booking,
  });
  if (error) throw new Error(`Supabase saveBooking failed: ${error.message}`);
}

async function supabaseUpdateBookingStatus(
  id: string,
  status: Booking["status"]
): Promise<Booking | null> {
  const existing = await supabaseGetBookingById(id);
  if (!existing) return null;
  const updated: Booking = { ...existing, status };
  const { error } = await supabase!
    .from(TABLE)
    .update({ status, data: updated })
    .eq("id", id);
  if (error) throw new Error(`Supabase updateBookingStatus failed: ${error.message}`);
  return updated;
}

// ---------------------------------------------------------------------------
// File-based implementation (local dev fallback ONLY — see module docstring)
// ---------------------------------------------------------------------------

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "bookings.json");

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(DATA_FILE);
    } catch {
      await fs.writeFile(DATA_FILE, "[]", "utf-8");
    }
  } catch (err) {
    console.error("Booking store error:", err);
    throw err; // let the API route handle the error
  }
}

async function fileGetAllBookings(): Promise<Booking[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  const bookings: Booking[] = raw.trim() ? JSON.parse(raw) : [];
  return bookings.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

async function fileGetBookingById(id: string): Promise<Booking | null> {
  const bookings = await fileGetAllBookings();
  return bookings.find((b) => b.id === id) ?? null;
}

async function fileSaveBooking(booking: Booking): Promise<void> {
  await ensureDataFile();
  const bookings = await fileGetAllBookings();
  bookings.unshift(booking);
  await fs.writeFile(DATA_FILE, JSON.stringify(bookings, null, 2), "utf-8");
}

async function fileUpdateBookingStatus(
  id: string,
  status: Booking["status"]
): Promise<Booking | null> {
  await ensureDataFile();
  const bookings = await fileGetAllBookings();
  const idx = bookings.findIndex((b) => b.id === id);
  const existing = bookings[idx];
  if (idx === -1 || !existing) return null;
  const updated: Booking = { ...existing, status };
  bookings[idx] = updated;
  await fs.writeFile(DATA_FILE, JSON.stringify(bookings, null, 2), "utf-8");
  return updated;
}

// ---------------------------------------------------------------------------
// Public API — stable signatures, backend chosen automatically at runtime
// ---------------------------------------------------------------------------

export async function getAllBookings(): Promise<Booking[]> {
  return hasSupabase ? supabaseGetAllBookings() : fileGetAllBookings();
}

export async function getBookingById(id: string): Promise<Booking | null> {
  return hasSupabase ? supabaseGetBookingById(id) : fileGetBookingById(id);
}

export async function saveBooking(booking: Booking): Promise<void> {
  return hasSupabase ? supabaseSaveBooking(booking) : fileSaveBooking(booking);
}

export async function updateBookingStatus(
  id: string,
  status: Booking["status"]
): Promise<Booking | null> {
  return hasSupabase ? supabaseUpdateBookingStatus(id, status) : fileUpdateBookingStatus(id, status);
}
