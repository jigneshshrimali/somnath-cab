import { z } from "zod";

export const locationSchema = z.object({
  address: z.string().min(3, "Please enter a valid location"),
  lat: z.number().optional(),
  lng: z.number().optional(),
  placeId: z.string().optional(),
});

export const passengerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(80),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Enter a valid email address"),
});

export const bookingSchema = z
  .object({
    tripType: z.enum(["one-way", "round-trip", "local", "airport", "hourly"]),
    pickup: locationSchema,
    drop: locationSchema,
    stops: z.array(locationSchema).max(5, "Maximum 5 stops allowed").default([]),
    pickupDate: z.string().min(1, "Pickup date is required"),
    pickupTime: z.string().min(1, "Pickup time is required"),
    returnDate: z.string().optional(),
    vehicleId: z.string().min(1, "Please select a vehicle"),
    passengerCount: z.number().min(1).max(20),
    luggageCount: z.number().min(0).max(20),
    couponCode: z.string().max(20).optional().or(z.literal("")),
    driverInstructions: z.string().max(300).optional().or(z.literal("")),
    passenger: passengerSchema,
    paymentMethod: z.enum(["pay-later-cash", "upi", "card", "wallet"]),
    honeypot: z.string().max(0, "Spam detected").optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (data.tripType === "round-trip" && !data.returnDate) {
      ctx.addIssue({
        code: "custom",
        path: ["returnDate"],
        message: "Return date is required for round trips",
      });
    }
    const pickupDateTime = new Date(`${data.pickupDate}T${data.pickupTime}`);
    if (pickupDateTime.getTime() < Date.now() - 5 * 60 * 1000) {
      ctx.addIssue({
        code: "custom",
        path: ["pickupDate"],
        message: "Pickup date/time must be in the future",
      });
    }
  });

export type BookingInput = z.infer<typeof bookingSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required").max(80),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().email("Enter a valid email address"),
  subject: z.string().min(3, "Subject is required").max(120),
  message: z.string().min(10, "Message should be at least 10 characters").max(1000),
  honeypot: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});
