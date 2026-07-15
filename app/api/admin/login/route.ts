import { NextRequest, NextResponse } from "next/server";
import { verifyPassword } from "@/lib/admin-password";
import { createSessionToken } from "@/lib/admin-session";

/**
 * POST /api/admin/login
 *
 * TODO before production: add rate limiting on this endpoint (e.g. Upstash
 * Redis sliding window keyed by IP) to slow down password-guessing attempts.
 * See middleware.ts for the recommended approach.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const password = body?.password;

  const storedHash = process.env.ADMIN_PASSWORD_HASH;
  if (!storedHash) {
    return NextResponse.json(
      { ok: false, error: "Admin password is not configured. Set ADMIN_PASSWORD_HASH in .env.local." },
      { status: 500 }
    );
  }

  if (typeof password !== "string" || !verifyPassword(password, storedHash)) {
    return NextResponse.json({ ok: false, error: "Incorrect password" }, { status: 401 });
  }

  const token = await createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}
