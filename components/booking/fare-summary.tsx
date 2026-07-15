"use client";

import { formatCurrency } from "@/lib/utils";
import type { FareBreakup } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FareSummary({ fare }: { fare: FareBreakup }) {
  const rows: { label: string; value: number; hide?: boolean }[] = [
    { label: "Base Fare", value: fare.baseFare },
    { label: `Distance Fare (${fare.distanceKm} km)`, value: fare.distanceFare },
    { label: "Driver Allowance", value: fare.driverAllowance, hide: fare.driverAllowance === 0 },
    { label: "Toll & Parking (est.)", value: fare.tollAndParking, hide: fare.tollAndParking === 0 },
    { label: "GST (5%)", value: fare.gst },
  ];

  return (
    <Card aria-live="polite">
      <CardHeader>
        <CardTitle>Fare Estimate</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {rows
          .filter((r) => !r.hide)
          .map((r) => (
            <div key={r.label} className="flex justify-between text-sm text-gray-600">
              <span>{r.label}</span>
              <span>{formatCurrency(r.value)}</span>
            </div>
          ))}
        {fare.discount > 0 && (
          <div className="flex justify-between text-sm font-medium text-success">
            <span>Coupon Discount</span>
            <span>-{formatCurrency(fare.discount)}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-dashed border-gray-200 pt-3 text-base font-bold text-brand-black">
          <span>Total Estimated Fare</span>
          <span>{formatCurrency(fare.total)}</span>
        </div>
        <p className="text-xs text-gray-400">
          Final fare may vary based on actual distance travelled, waiting time and toll charges.
        </p>
      </CardContent>
    </Card>
  );
}
