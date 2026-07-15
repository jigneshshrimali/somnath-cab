"use client";

import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

export function WhatsAppButton() {
  const message = encodeURIComponent("Hi Somnath Cab, I'd like to book a cab.");
  return (
    <a
      href={`https://wa.me/${SITE.whatsapp}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Somnath Cab on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
    >
      <MessageCircle className="h-7 w-7" fill="white" />
      <span className="sr-only">Chat on WhatsApp</span>
    </a>
  );
}
