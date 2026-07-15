"use client";

import Image from "next/image";
import { Users, Briefcase, Check } from "lucide-react";
import { VEHICLES } from "@/lib/constants";
import { formatCurrency, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface VehicleSelectorProps {
  value: string;
  onChange: (vehicleId: string) => void;
  distanceKm?: number;
}

export function VehicleSelector({ value, onChange, distanceKm = 0 }: VehicleSelectorProps) {
  return (
    <div role="radiogroup" aria-label="Select a vehicle" className="grid gap-4 sm:grid-cols-2">
      {VEHICLES.map((vehicle) => {
        const estimated = vehicle.baseFare + distanceKm * vehicle.ratePerKm;
        const selected = value === vehicle.id;
        return (
          <button
            key={vehicle.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(vehicle.id)}
            className={cn(
              "relative flex gap-4 rounded-2xl border-2 p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
              selected ? "border-brand bg-brand/5 shadow-card" : "border-gray-100 hover:border-gray-200"
            )}
          >
            {vehicle.badge && (
              <Badge className="absolute right-3 top-3" variant={vehicle.badge === "Best Price" ? "success" : "default"}>
                {vehicle.badge}
              </Badge>
            )}
            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-brand-light">
              <Image src={vehicle.image} alt={vehicle.name} fill sizes="96px" className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-brand-black">{vehicle.name}</p>
              <p className="text-xs text-gray-500">{vehicle.model}</p>
              <div className="mt-2 flex items-center gap-3 text-xs text-gray-600">
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" /> {vehicle.seats}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5" /> {vehicle.luggage}
                </span>
              </div>
              <p className="mt-2 text-sm font-bold text-brand-dark">
                {distanceKm > 0 ? `Est. ${formatCurrency(estimated)}` : `${formatCurrency(vehicle.ratePerKm)}/km`}
              </p>
            </div>
            {selected && (
              <span className="absolute left-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-brand-black">
                <Check className="h-3.5 w-3.5" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
