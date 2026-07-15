import { promises as fs } from "fs";
import path from "path";
import type { Booking } from "@/types";
/**
 * Local JSON-file booking store.
 *
 * This works out of the box for local development and single-server/VPS
 * deployments with a persistent filesystem. It will NOT work correctly on
 * serverless platforms (Vercel, AWS Lambda, etc.) because:
 *   1. The filesystem is read-only (or ephemeral) at request time.
 *   2. Multiple function instances do not share state.
 *
 * Before going to production on serverless infrastructure, replace the
 * function bodies below with real database calls (Postgres + Prisma,
 * Supabase, PlanetScale, etc.) — every call site in the app only depends on
 * these four function signatures, so the swap does not touch any UI code.
 */

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
    console.error("Booking Store Error:", err);
    throw err; // Let the API route handle the error
  }
}

export async function getAllBookings(): Promise<Booking[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  const bookings: Booking[] = raw.trim() ? JSON.parse(raw) : [];
  return bookings.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const bookings = await getAllBookings();
  return bookings.find((b) => b.id === id) ?? null;
}

export async function saveBooking(booking: Booking): Promise<void> {
  await ensureDataFile();
  const bookings = await getAllBookings();
  bookings.unshift(booking);
  await fs.writeFile(DATA_FILE, JSON.stringify(bookings, null, 2), "utf-8");
}

export async function updateBookingStatus(
  id: string,
  status: Booking["status"]
): Promise<Booking | null> {
  await ensureDataFile();
  const bookings = await getAllBookings();
  const idx = bookings.findIndex((b) => b.id === id);
  const existing = bookings[idx];
  if (idx === -1 || !existing) return null;
  const updated: Booking = { ...existing, status };
  bookings[idx] = updated;
  await fs.writeFile(DATA_FILE, JSON.stringify(bookings, null, 2), "utf-8");
  return updated;
}
