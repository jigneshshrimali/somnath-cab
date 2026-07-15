import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function generateBookingRef(): string {
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  const ts = Date.now().toString().slice(-4);
  return `AC${ts}${rand}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay = 300) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/** Basic honeypot + timing spam check for public forms (defense-in-depth, pair with server rate limiting) */
export function isLikelySpam(formOpenedAt: number, honeypotValue: string): boolean {
  const elapsedMs = Date.now() - formOpenedAt;
  if (honeypotValue.trim().length > 0) return true; // bot filled hidden field
  if (elapsedMs < 1500) return true; // submitted too fast for a human
  return false;
}
