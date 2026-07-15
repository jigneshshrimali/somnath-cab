import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 422 });
  }
  // TODO: add to mailing list provider (Mailchimp/Resend Audiences/etc.)
  return NextResponse.json({ ok: true }, { status: 200 });
}
