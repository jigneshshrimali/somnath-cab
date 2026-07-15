import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        aria-invalid={error || undefined}
        className={cn(
          "flex h-11 w-full rounded-lg border bg-white px-4 py-2 text-sm text-brand-black placeholder:text-muted-foreground transition-colors",
          "border-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:border-brand",
          error && "border-danger focus-visible:ring-danger",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
