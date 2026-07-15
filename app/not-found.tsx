import Link from "next/link";
import { Search, Home, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="container-page flex flex-col items-center justify-center py-24 text-center">
      <p className="text-8xl font-black text-brand">404</p>
      <h1 className="mt-4 text-h2 font-semibold text-brand-black">Page Not Found</h1>
      <p className="mt-3 max-w-md text-gray-600">
        Looks like this route took a wrong turn. Let&apos;s get you back on the road.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">
            <Home className="h-4 w-4" /> Back to Home
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/booking">
            <Search className="h-4 w-4" /> Book a Cab
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <a href={`tel:${SITE.phone}`}>
            <Phone className="h-4 w-4" /> Call Us
          </a>
        </Button>
      </div>
    </section>
  );
}
