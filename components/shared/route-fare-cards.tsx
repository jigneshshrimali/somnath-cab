import Link from "next/link";
import { Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import type { RouteInfo } from "@/lib/routes";
import { VEHICLES } from "@/lib/constants";

export function RouteFareCards({ route, tripType = "one-way" }: { route: RouteInfo; tripType?: "one-way" | "airport" }) {
  const sedan = VEHICLES.find((v) => v.vehicleClass === "sedan");
  const suv = VEHICLES.find((v) => v.vehicleClass === "suv");

  const cards = [
    { vehicle: sedan, fare: route.sedanFare },
    { vehicle: suv, fare: route.suvFare },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {cards.map(({ vehicle, fare }) =>
        vehicle ? (
          <div key={vehicle.id} className="rounded-2xl border-2 border-gray-100 p-6 transition-colors hover:border-brand">
            {vehicle.badge && <Badge className="mb-3">{vehicle.badge}</Badge>}
            <p className="text-sm text-gray-500">{vehicle.model}</p>
            <h3 className="text-h4 font-semibold text-brand-black">{vehicle.name}</h3>
            <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {vehicle.seats} Seats</span>
              <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {vehicle.luggage} Bags</span>
            </div>
            <p className="mt-4 text-3xl font-bold text-brand-dark">{formatCurrency(fare)}</p>
            <p className="text-xs text-gray-400">Fixed fare, all-inclusive</p>
            <Button asChild className="mt-5 w-full">
              <Link href={`/booking?tripType=${tripType}&drop=${encodeURIComponent(route.destination)}&vehicle=${vehicle.id}`}>
                Book {vehicle.name}
              </Link>
            </Button>
          </div>
        ) : null
      )}
    </div>
  );
}
