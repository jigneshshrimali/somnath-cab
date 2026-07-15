"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Clock, Users, ArrowRightLeft } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { TripType } from "@/types";

const TRIP_TYPES: { value: TripType; label: string }[] = [
  { value: "one-way", label: "One Way" },
  { value: "round-trip", label: "Round Trip" },
  { value: "local", label: "Local / Hourly" },
  { value: "airport", label: "Airport" },
];

export function BookingWidget() {
  const router = useRouter();
  const [tripType, setTripType] = useState<TripType>("one-way");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState(1);

  function swapLocations() {
    setPickup(drop);
    setDrop(pickup);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({
      tripType,
      pickup,
      drop,
      date,
      time,
      passengers: String(passengers),
    });
    router.push(`/booking?${params.toString()}`);
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="rounded-2xl bg-white p-5 shadow-card-hover md:p-6">
      <Tabs value={tripType} onValueChange={(v) => setTripType(v as TripType)}>
        <TabsList>
          {TRIP_TYPES.map((t) => (
            <TabsTrigger key={t.value} value={t.value}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <form onSubmit={handleSearch} className="mt-5 grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto]">
        <div className="grid gap-3 sm:grid-cols-2 lg:contents">
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-dark" />
            <Input
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Enter pickup location"
              className="pl-9"
              required
              aria-label="Pickup location"
            />
          </div>

          <button
            type="button"
            onClick={swapLocations}
            aria-label="Swap pickup and drop locations"
            className="hidden h-11 w-11 items-center justify-center rounded-full border border-gray-200 hover:bg-brand-light lg:flex"
          >
            <ArrowRightLeft className="h-4 w-4" />
          </button>

          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-danger" />
            <Input
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
              placeholder="Enter drop location"
              className="pl-9"
              required
              aria-label="Drop location"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-4">
          <div className="relative">
            <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="pl-9"
              required
              aria-label="Pickup date"
            />
          </div>
          <div className="relative">
            <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="pl-9"
              required
              aria-label="Pickup time"
            />
          </div>
          <div className="relative">
            <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="number"
              min={1}
              max={20}
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              className="pl-9"
              aria-label="Number of passengers"
            />
          </div>
          <Button type="submit" size="lg" className="w-full">
            Search Cabs
          </Button>
        </div>
      </form>
    </div>
  );
}
