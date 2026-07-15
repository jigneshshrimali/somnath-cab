import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, issues: parsed.error.flatten() }, { status: 422 });
  }
  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: false, error: "Spam detected" }, { status: 400 });
  }

  // TODO: send email via Resend/SendGrid and/or persist to a CRM/table.
  return NextResponse.json({ ok: true }, { status: 200 });
}
