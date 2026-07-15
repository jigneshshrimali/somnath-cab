import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

export function CtaBanner() {
  return (
    <section className="bg-brand">
      <div className="container-page flex flex-col items-center justify-between gap-6 py-10 text-center md:flex-row md:text-left">
        <div>
          <h2 className="text-2xl font-bold text-brand-black">Ready to book your ride?</h2>
          <p className="text-brand-black/80">Call now or book online — available 24x7 across Rajkot & Gujarat.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild variant="secondary" size="lg">
            <a href={`tel:${SITE.phone}`}><Phone className="h-4 w-4" /> Call Now</a>
          </Button>
          <Button asChild size="lg" className="border-2 border-brand-black">
            <Link href="/booking"><MessageCircle className="h-4 w-4" /> Book Your Ride</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
