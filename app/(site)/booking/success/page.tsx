import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle2, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Booking Confirmed",
  robots: { index: false, follow: false },
};

export default function BookingSuccessPage({
  searchParams,
}: {
  searchParams: { ref?: string };
}) {
  return (
    <Suspense>
      <section className="section-padding container-page flex flex-col items-center py-24 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="h-10 w-10 text-success" />
        </div>
        <h1 className="mt-6 text-h1 font-semibold text-brand-black">Booking Confirmed!</h1>
        <p className="mt-3 max-w-md text-gray-600">
          Thank you for booking with Somnath Cab. Your booking reference is:
        </p>
        <p className="mt-2 rounded-lg bg-brand-light px-6 py-3 text-xl font-bold tracking-wide text-brand-dark">
          {searchParams.ref ?? "N/A"}
        </p>
        <p className="mt-4 max-w-md text-sm text-gray-500">
          A confirmation SMS and email have been sent. Our team will assign a driver shortly and
          share their details before pickup.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href={`/booking/track?ref=${searchParams.ref ?? ""}`}>Track Booking</Link>
          </Button>
          <Button asChild variant="outline">
            <a href={`tel:${SITE.phone}`}><Phone className="h-4 w-4" /> Call Support</a>
          </Button>
          <Button asChild variant="secondary">
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
          </Button>
        </div>
      </section>
    </Suspense>
  );
}
