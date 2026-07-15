export type TripType = "one-way" | "round-trip" | "local" | "airport" | "hourly";

export type VehicleClass = "hatchback" | "sedan" | "suv" | "tempo-traveller";

export interface Vehicle {
  id: string;
  name: string;
  model: string;
  vehicleClass: VehicleClass;
  seats: number;
  luggage: number;
  ratePerKm: number;
  baseFare: number;
  image: string;
  features: string[];
  badge?: "Popular" | "New" | "Best Price" | "Limited";
}

export interface Location {
  address: string;
  lat?: number;
  lng?: number;
  placeId?: string;
}

export interface FareBreakup {
  baseFare: number;
  distanceFare: number;
  driverAllowance: number;
  gst: number;
  tollAndParking: number;
  discount: number;
  total: number;
  distanceKm: number;
  estimatedDurationMin: number;
}

export interface Passenger {
  name: string;
  phone: string;
  email: string;
}

export type PaymentMethod = "pay-later-cash" | "upi" | "card" | "wallet";

export interface BookingFormValues {
  tripType: TripType;
  pickup: Location;
  drop: Location;
  stops: Location[];
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  vehicleId: string;
  passengerCount: number;
  luggageCount: number;
  couponCode?: string;
  driverInstructions?: string;
  passenger: Passenger;
  paymentMethod: PaymentMethod;
}

export interface Booking extends BookingFormValues {
  id: string;
  bookingRef: string;
  status: "pending" | "confirmed" | "driver-assigned" | "ongoing" | "completed" | "cancelled";
  fare: FareBreakup;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
  avatar?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface Destination {
  name: string;
  slug: string;
  image: string;
  distanceKm: number;
  description: string;
}
