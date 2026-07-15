"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Phone, MessageCircle, RefreshCw, LogOut, Search, Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectNative } from "@/components/ui/select-native";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Booking } from "@/types";

const STATUS_OPTIONS: Booking["status"][] = [
  "pending",
  "confirmed",
  "driver-assigned",
  "ongoing",
  "completed",
  "cancelled",
];

async function fetchBookings(): Promise<Booking[]> {
  const res = await fetch("/api/admin/bookings");
  if (res.status === 401) {
    window.location.href = "/admin/login";
    throw new Error("unauthorized");
  }
  if (!res.ok) throw new Error("Failed to load bookings");
  const data = await res.json();
  return data.bookings as Booking[];
}

async function updateStatus({ id, status }: { id: string; status: Booking["status"] }) {
  const res = await fetch(`/api/admin/bookings/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update status");
  return res.json();
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const {
    data: bookings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: fetchBookings,
    refetchInterval: 30000, // poll every 30s so new bookings show up without a manual refresh
  });

  const mutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      toast.success("Booking status updated");
      queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
    },
    onError: () => toast.error("Couldn't update status. Please try again."),
  });

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const filtered = (bookings ?? []).filter((b) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      b.bookingRef.toLowerCase().includes(q) ||
      b.passenger.name.toLowerCase().includes(q) ||
      b.passenger.phone.includes(search);
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = (bookings ?? []).filter((b) => b.status === "pending").length;

  return (
    <div className="min-h-screen bg-brand-light">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 sm:px-6">
        <div>
          <h1 className="text-lg font-bold text-brand-black sm:text-xl">Somnath Cab — Admin</h1>
          <p className="text-xs text-gray-500">
            {pendingCount > 0 ? `${pendingCount} new booking${pendingCount === 1 ? "" : "s"} awaiting confirmation` : "All caught up"}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4" /> Logout
        </Button>
      </header>

      <main className="container-page py-8">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone, or booking ref"
              className="pl-9"
              aria-label="Search bookings"
            />
          </div>
          <SelectNative
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-auto"
            aria-label="Filter by status"
          >
            <option value="all">All Statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s.replace("-", " ")}
              </option>
            ))}
          </SelectNative>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => queryClient.invalidateQueries({ queryKey: ["admin-bookings"] })}
          >
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
        </div>

        {isLoading && (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-40 w-full rounded-2xl" />
            ))}
          </div>
        )}

        {isError && (
          <p className="rounded-xl bg-danger/10 p-6 text-center text-sm text-danger">
            Couldn&apos;t load bookings. Check your connection and try refreshing.
          </p>
        )}

        {!isLoading && !isError && filtered.length === 0 && (
          <div className="flex flex-col items-center rounded-2xl bg-white p-12 text-center shadow-card">
            <Inbox className="h-10 w-10 text-gray-300" />
            <p className="mt-3 text-gray-500">No bookings match your filters yet.</p>
          </div>
        )}

        <div className="grid gap-4">
          {filtered.map((b) => (
            <BookingCard key={b.id} booking={b} onStatusChange={(status) => mutation.mutate({ id: b.id, status })} />
          ))}
        </div>
      </main>
    </div>
  );
}

function BookingCard({
  booking: b,
  onStatusChange,
}: {
  booking: Booking;
  onStatusChange: (status: Booking["status"]) => void;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-bold text-brand-black">{b.bookingRef}</p>
            <StatusBadge status={b.status} />
          </div>
          <p className="mt-1 text-sm text-gray-600">
            {b.passenger.name} · {b.passenger.phone}
          </p>
          <p className="text-xs text-gray-400">Booked {formatDate(b.createdAt)}</p>
        </div>
        <div className="flex gap-2">
          <a
            href={`tel:${b.passenger.phone}`}
            aria-label={`Call ${b.passenger.name}`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-light text-brand-dark hover:bg-brand/20"
          >
            <Phone className="h-4 w-4" />
          </a>
          <a
            href={`https://wa.me/91${b.passenger.phone}?text=${encodeURIComponent(
              `Hi ${b.passenger.name}, this is Somnath Cab regarding your booking ${b.bookingRef}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${b.passenger.name}`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <Detail label="Trip Type" value={b.tripType.replace("-", " ")} />
        <Detail label="Pickup" value={b.pickup.address} />
        <Detail label="Drop" value={b.drop.address} />
        <Detail label="Date & Time" value={`${b.pickupDate} · ${b.pickupTime}`} />
        <Detail label="Vehicle" value={b.vehicleId} />
        <Detail label="Passengers / Luggage" value={`${b.passengerCount} / ${b.luggageCount}`} />
        <Detail label="Payment" value={b.paymentMethod.replace(/-/g, " ")} />
        <Detail label="Fare" value={formatCurrency(b.fare?.total ?? 0)} />
      </div>

      {b.driverInstructions && (
        <p className="mt-3 rounded-lg bg-brand-light p-3 text-xs text-gray-600">
          <strong>Driver note:</strong> {b.driverInstructions}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-gray-100 pt-4">
        <label htmlFor={`status-${b.id}`} className="text-xs font-semibold text-gray-500">
          Update Status:
        </label>
        <SelectNative
          id={`status-${b.id}`}
          value={b.status}
          onChange={(e) => onStatusChange(e.target.value as Booking["status"])}
          className="w-auto"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s.replace("-", " ")}
            </option>
          ))}
        </SelectNative>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-gray-400">{label}</p>
      <p className="font-medium capitalize text-brand-black">{value || "—"}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: Booking["status"] }) {
  const variant: BadgeProps["variant"] =
    status === "completed" ? "success" : status === "cancelled" ? "destructive" : "default";
  return <Badge variant={variant}>{status.replace("-", " ")}</Badge>;
}
