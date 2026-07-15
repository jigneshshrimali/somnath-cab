import { NextResponse, type NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/admin-session";

/**
 * Middleware responsibilities:
 * 1. Gate every /admin/* route (except /admin/login) behind a valid signed
 *    session cookie — unauthenticated visitors are redirected to the login page.
 * 2. Attach a request id header for tracing.
 *
 * TODO before production: add real rate limiting here for /api/admin/login
 * and the public booking/contact endpoints once RATE_LIMIT_REDIS_URL is set, e.g.:
 *
 *   import { Ratelimit } from "@upstash/ratelimit";
 *   import { Redis } from "@upstash/redis";
 *   const ratelimit = new Ratelimit({ redis: Redis.fromEnv(), limiter: Ratelimit.slidingWindow(10, "60 s") });
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("admin_session")?.value;
    const authed = await verifySessionToken(token);
    if (!authed) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = NextResponse.next();
  response.headers.set("X-Request-Id", crypto.randomUUID());
  return response;
}

export const config = {
  matcher: ["/api/:path*", "/admin/:path*"],
};
