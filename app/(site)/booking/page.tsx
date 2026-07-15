import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { BookingForm } from "@/components/booking/booking-form";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Book a Cab Online",
  description: "Book your Somnath Cab ride in minutes — choose your trip type, vehicle, and get an instant fare estimate before you confirm.",
  alternates: { canonical: "/booking" },
  robots: { index: false, follow: true },
};

export default function BookingPage() {
  return (
    <>
      <PageHero title="Book Your Ride" description="Complete the steps below to confirm your booking in under a minute." />
      <Breadcrumbs items={[{ name: "Book a Cab", href: "/booking" }]} />
      <section className="section-padding container-page">
        <Suspense fallback={<BookingFormSkeleton />}>
          <BookingForm />
        </Suspense>
      </section>
    </>
  );
}

function BookingFormSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-11 w-full" />
      </div>
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
