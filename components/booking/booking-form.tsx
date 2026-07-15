"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { MapPin, Plus, Trash2, Loader2, ShieldCheck } from "lucide-react";

import { bookingSchema, type BookingInput } from "@/lib/validation";
import { calculateFare, estimateDistanceFallback } from "@/lib/fare-calculator";
import { generateBookingRef, isLikelySpam, cn } from "@/lib/utils";
import { VEHICLES } from "@/lib/constants";
import type { Booking } from "@/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SelectNative } from "@/components/ui/select-native";
import { VehicleSelector } from "@/components/booking/vehicle-selector";
import { FareSummary } from "@/components/booking/fare-summary";

const STEPS = ["Trip Details", "Vehicle & Passengers", "Contact & Payment", "Review"] as const;

async function submitBooking(payload: Booking): Promise<{ ok: boolean; bookingRef: string }> {
  // POSTs to the architecture-ready API route (see app/api/bookings/route.ts).
  const res = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create booking");
  return res.json();
}

export function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [formOpenedAt] = useState(Date.now());

  const {
    register,
    control,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    mode: "onBlur",
    defaultValues: {
      tripType: (searchParams.get("tripType") as BookingInput["tripType"]) || "one-way",
      pickup: { address: searchParams.get("pickup") || "" },
      drop: { address: searchParams.get("drop") || "" },
      stops: [],
      pickupDate: searchParams.get("date") || "",
      pickupTime: searchParams.get("time") || "",
      vehicleId: "sedan",
      passengerCount: Number(searchParams.get("passengers")) || 1,
      luggageCount: 1,
      couponCode: "",
      driverInstructions: "",
      passenger: { name: "", phone: "", email: "" },
      paymentMethod: "pay-later-cash",
      honeypot: "",
    },
  });

  const values = watch();
  const stops = values.stops ?? [];

  const distanceEstimate = useMemo(
    () => estimateDistanceFallback(values.pickup?.address ?? "", values.drop?.address ?? ""),
    [values.pickup?.address, values.drop?.address]
  );

  const fare = useMemo(
    () =>
      calculateFare({
        vehicleId: values.vehicleId || "sedan",
        tripType: values.tripType,
        distanceKm: distanceEstimate.distanceKm,
        durationMin: distanceEstimate.durationMin,
        couponDiscountPercent: values.couponCode?.toUpperCase() === "SOMNATH10" ? 10 : 0,
        dropText: values.drop?.address,
      }),
    [values.vehicleId, values.tripType, values.couponCode, values.drop?.address, distanceEstimate]
  );

  const mutation = useMutation({
    mutationFn: submitBooking,
    onSuccess: (data) => {
      toast.success("Booking confirmed! Redirecting...");
      router.push(`/booking/success?ref=${data.bookingRef}`);
    },
    onError: () => {
      toast.error("Something went wrong. Please try again or call us.");
    },
  });

  const stepFields: Record<number, (keyof BookingInput)[]> = {
    0: ["tripType", "pickup", "drop", "pickupDate", "pickupTime"],
    1: ["vehicleId", "passengerCount", "luggageCount"],
    2: ["passenger", "paymentMethod"],
    3: [],
  };

  async function nextStep() {
    const fieldsToValidate = stepFields[step] ?? [];
    const valid = await trigger(fieldsToValidate as (keyof BookingInput)[]);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function prevStep() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function onSubmit(data: BookingInput) {
    if (isLikelySpam(formOpenedAt, data.honeypot ?? "")) {
      toast.error("Submission blocked. Please try again.");
      return;
    }
    const booking: Booking = {
      ...data,
      id: crypto.randomUUID(),
      bookingRef: generateBookingRef(),
      status: "pending",
      fare,
      createdAt: new Date().toISOString(),
    };
    mutation.mutate(booking);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Honeypot field — hidden from real users, bots often fill it */}
        <input
          type="text"
          {...register("honeypot")}
          tabIndex={-1}
          autoComplete="off"
          className="absolute left-[-9999px]"
          aria-hidden="true"
        />

        <ol className="mb-8 flex flex-wrap gap-2" aria-label="Booking progress">
          {STEPS.map((label, i) => (
            <li key={label} className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                  i === step ? "bg-brand text-brand-black" : i < step ? "bg-success text-white" : "bg-gray-100 text-gray-400"
                )}
                aria-current={i === step ? "step" : undefined}
              >
                {i + 1}
              </span>
              <span className={cn("hidden text-sm sm:inline", i === step ? "font-semibold text-brand-black" : "text-gray-400")}>
                {label}
              </span>
            </li>
          ))}
        </ol>

        {step === 0 && (
          <fieldset className="space-y-5">
            <legend className="sr-only">Trip Details</legend>
            <div>
              <Label htmlFor="tripType">Trip Type</Label>
              <SelectNative id="tripType" {...register("tripType")}>
                <option value="one-way">One Way</option>
                <option value="round-trip">Round Trip</option>
                <option value="local">Local / Hourly Rental</option>
                <option value="airport">Airport Transfer</option>
              </SelectNative>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="pickup">Pickup Location</Label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-dark" />
                  <Input id="pickup" className="pl-9" error={!!errors.pickup?.address} {...register("pickup.address")} placeholder="e.g. Rajkot Railway Station" />
                </div>
                {errors.pickup?.address && <p className="mt-1 text-xs text-danger">{errors.pickup.address.message}</p>}
              </div>
              <div>
                <Label htmlFor="drop">Drop Location</Label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-danger" />
                  <Input id="drop" className="pl-9" error={!!errors.drop?.address} {...register("drop.address")} placeholder="e.g. Dwarkadhish Temple" />
                </div>
                {errors.drop?.address && <p className="mt-1 text-xs text-danger">{errors.drop.address.message}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label>Additional Stops (optional)</Label>
                {stops.length < 5 && (
                  <button
                    type="button"
                    onClick={() => setValue("stops", [...stops, { address: "" }])}
                    className="flex items-center gap-1 text-xs font-semibold text-brand-dark"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Stop
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {stops.map((stop, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      value={stop.address}
                      onChange={(e) => {
                        const next = [...stops];
                        next[i] = { ...next[i], address: e.target.value };
                        setValue("stops", next);
                      }}
                      placeholder={`Stop ${i + 1}`}
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => setValue("stops", stops.filter((_, idx) => idx !== i))} aria-label="Remove stop">
                      <Trash2 className="h-4 w-4 text-danger" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="pickupDate">Pickup Date</Label>
                <Input id="pickupDate" type="date" error={!!errors.pickupDate} {...register("pickupDate")} min={new Date().toISOString().split("T")[0]} />
                {errors.pickupDate && <p className="mt-1 text-xs text-danger">{errors.pickupDate.message}</p>}
              </div>
              <div>
                <Label htmlFor="pickupTime">Pickup Time</Label>
                <Input id="pickupTime" type="time" error={!!errors.pickupTime} {...register("pickupTime")} />
                {errors.pickupTime && <p className="mt-1 text-xs text-danger">{errors.pickupTime.message}</p>}
              </div>
              {values.tripType === "round-trip" && (
                <div>
                  <Label htmlFor="returnDate">Return Date</Label>
                  <Input id="returnDate" type="date" error={!!errors.returnDate} {...register("returnDate")} min={values.pickupDate} />
                  {errors.returnDate && <p className="mt-1 text-xs text-danger">{errors.returnDate.message}</p>}
                </div>
              )}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset className="space-y-6">
            <legend className="sr-only">Vehicle & Passengers</legend>
            <div>
              <Label>Select Vehicle</Label>
              <Controller
                control={control}
                name="vehicleId"
                render={({ field }) => (
                  <VehicleSelector value={field.value} onChange={field.onChange} distanceKm={distanceEstimate.distanceKm} />
                )}
              />
              {errors.vehicleId && <p className="mt-1 text-xs text-danger">{errors.vehicleId.message}</p>}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="passengerCount">Passengers</Label>
                <Input id="passengerCount" type="number" min={1} max={20} {...register("passengerCount", { valueAsNumber: true })} />
              </div>
              <div>
                <Label htmlFor="luggageCount">Luggage (bags)</Label>
                <Input id="luggageCount" type="number" min={0} max={20} {...register("luggageCount", { valueAsNumber: true })} />
              </div>
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset className="space-y-5">
            <legend className="sr-only">Contact & Payment</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" error={!!errors.passenger?.name} {...register("passenger.name")} placeholder="Your full name" />
                {errors.passenger?.name && <p className="mt-1 text-xs text-danger">{errors.passenger.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Mobile Number</Label>
                <Input id="phone" type="tel" error={!!errors.passenger?.phone} {...register("passenger.phone")} placeholder="98765 43210" />
                {errors.passenger?.phone && <p className="mt-1 text-xs text-danger">{errors.passenger.phone.message}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" error={!!errors.passenger?.email} {...register("passenger.email")} placeholder="you@example.com" />
              {errors.passenger?.email && <p className="mt-1 text-xs text-danger">{errors.passenger.email.message}</p>}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="couponCode">Coupon Code (optional)</Label>
                <Input id="couponCode" {...register("couponCode")} placeholder="Try SOMNATH10" />
              </div>
              <div>
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <SelectNative id="paymentMethod" {...register("paymentMethod")}>
                  <option value="pay-later-cash">Pay Driver (Cash)</option>
                  <option value="upi">UPI</option>
                  <option value="card">Credit / Debit Card</option>
                  <option value="wallet">Wallet</option>
                </SelectNative>
              </div>
            </div>
            <div>
              <Label htmlFor="driverInstructions">Instructions for Driver (optional)</Label>
              <Textarea id="driverInstructions" {...register("driverInstructions")} placeholder="e.g. Call on arrival, gate number, etc." />
            </div>
            <p className="flex items-center gap-2 text-xs text-gray-500">
              <ShieldCheck className="h-4 w-4 text-success" /> Your details are encrypted and never shared with third parties.
            </p>
          </fieldset>
        )}

        {step === 3 && (
          <div className="space-y-4 rounded-2xl border border-gray-100 p-5">
            <h3 className="text-h4 font-semibold">Review Your Booking</h3>
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <Detail label="Trip Type" value={values.tripType.replace("-", " ")} />
              <Detail label="Vehicle" value={VEHICLES.find((v) => v.id === values.vehicleId)?.name ?? ""} />
              <Detail label="Pickup" value={values.pickup?.address} />
              <Detail label="Drop" value={values.drop?.address} />
              <Detail label="Date & Time" value={`${values.pickupDate} at ${values.pickupTime}`} />
              <Detail label="Passengers / Luggage" value={`${values.passengerCount} / ${values.luggageCount}`} />
              <Detail label="Passenger" value={values.passenger?.name} />
              <Detail label="Phone" value={values.passenger?.phone} />
              <Detail label="Payment" value={values.paymentMethod.replace(/-/g, " ")} />
            </dl>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          {step > 0 ? (
            <Button type="button" variant="outline" onClick={prevStep}>
              Back
            </Button>
          ) : (
            <span />
          )}
          {step < STEPS.length - 1 ? (
            <Button type="button" onClick={nextStep}>
              Continue
            </Button>
          ) : (
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Confirming...
                </>
              ) : (
                "Confirm Booking"
              )}
            </Button>
          )}
        </div>
      </form>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <FareSummary fare={fare} />
      </aside>
    </div>
  );
}

function Detail({ label, value }: { label?: string; value?: string }) {
  return (
    <div>
      <dt className="text-gray-400">{label}</dt>
      <dd className="font-medium capitalize text-brand-black">{value || "—"}</dd>
    </div>
  );
}
