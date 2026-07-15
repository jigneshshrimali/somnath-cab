import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectNativeProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

/**
 * Accessible native <select> wrapper (keyboard + screen-reader friendly by default).
 * Used instead of a custom listbox where a simple dropdown suffices.
 */
const SelectNative = React.forwardRef<HTMLSelectElement, SelectNativeProps>(
  ({ className, error, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        aria-invalid={error || undefined}
        className={cn(
          "h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 pr-9 text-sm text-brand-black transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:border-brand",
          error && "border-danger focus-visible:ring-danger",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    </div>
  )
);
SelectNative.displayName = "SelectNative";

export { SelectNative };
