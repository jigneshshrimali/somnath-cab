"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // In production, forward this to an error-tracking service (Sentry, etc.)
    console.error(error);
  }, [error]);

  return (
    <div className="container-page flex flex-col items-center justify-center py-24 text-center">
      <AlertTriangle className="h-12 w-12 text-danger" />
      <h1 className="mt-4 text-h3 font-semibold text-brand-black">Something went wrong</h1>
      <p className="mt-2 max-w-md text-gray-600">
        We hit an unexpected error. Please try again, or call us if the problem persists.
      </p>
      <Button onClick={reset} className="mt-6">
        Try Again
      </Button>
    </div>
  );
}
