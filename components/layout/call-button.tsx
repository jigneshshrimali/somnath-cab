"use client";

import { Phone } from "lucide-react";
import { SITE } from "@/lib/constants";

/** Floating click-to-call button, shown on mobile alongside WhatsApp */
export function CallButton() {
  return (
    <a
      href={`tel:${SITE.phone}`}
      aria-label={`Call Somnath Cab at ${SITE.phoneDisplay}`}
      className="fixed bottom-6 left-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-black shadow-lg transition-transform hover:scale-110 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
    >
      <Phone className="h-6 w-6" />
      <span className="sr-only">Call now</span>
    </a>
  );
}
