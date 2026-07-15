"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, MapPin, Car, CheckCircle2, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STAGES = [
  { key: "confirmed", label: "Booking Confirmed", icon: CheckCircle2 },
  { key: "driver-assigned", label: "Driver Assigned", icon: Car },
  { key: "ongoing", label: "Trip Ongoing", icon: MapPin },
  { key: "completed", label: "Completed", icon: Clock },
];

function TrackBookingInner() {
  const params = useSearchParams();
  const [ref, setRef] = useState(params.get("ref") ?? "");
  const [searched, setSearched] = useState(!!params.get("ref"));

  // Demo stage — wire this up to a real booking-status API/websocket in production.
  const currentStageIndex = 1;

  return (
    <section className="section-padding container-page max-w-2xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearched(true);
        }}
        className="flex gap-3"
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            placeholder="Enter your booking reference (e.g. AC1234ABCDE)"
            className="pl-9"
            aria-label="Booking reference"
          />
        </div>
        <Button type="submit">Track</Button>
      </form>

      {searched && ref && (
        <div className="mt-10 rounded-2xl border border-gray-100 p-6 shadow-card">
          <p className="text-sm text-gray-500">Booking Reference</p>
          <p className="text-lg font-bold text-brand-black">{ref}</p>

          <ol className="mt-8 space-y-6 border-l-2 border-gray-100 pl-6">
            {STAGES.map((stage, i) => {
              const done = i <= currentStageIndex;
              return (
                <li key={stage.key} className="relative">
                  <span
                    className={cn(
                      "absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full",
                      done ? "bg-brand text-brand-black" : "bg-gray-100 text-gray-400"
                    )}
                  >
                    <stage.icon className="h-3.5 w-3.5" />
                  </span>
                  <p className={cn("font-medium", done ? "text-brand-black" : "text-gray-400")}>{stage.label}</p>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </section>
  );
}

export default function TrackBookingPage() {
  return (
    <>
      <section className="bg-brand-black py-14 text-center text-white">
        <div className="container-page">
          <h1 className="text-h1 font-semibold">Track Your Booking</h1>
          <p className="mt-3 text-gray-300">Enter your booking reference to see live status.</p>
        </div>
      </section>
      <Suspense>
        <TrackBookingInner />
      </Suspense>
    </>
  );
}
