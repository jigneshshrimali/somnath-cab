import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description: "Browse photos of the Somnath Cab fleet, drivers and trips across Rajkot and Gujarat.",
  alternates: { canonical: "/gallery" },
};

const GALLERY_IMAGES = [
  { src: "/images/somnath-cab-logo.png", alt: "Somnath Cab logo — Safe Journey, Divine Destination" },
  { src: "/images/fleet-city.jpg", alt: "Somnath Cab Sedan and SUV fleet" }, // PLACEHOLDER — swap for a real fleet photo
  { src: "/images/somnath.png", alt: "Vehicle at Somnath Temple at sunset" },
  { src: "/images/airport-1.png", alt: "Pickup at Rajkot (Hirasar) Airport" },
  { src: "/images/airport-2.png", alt: "Driver greeting passenger with name placard" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero title="Photo Gallery" description="A glimpse of our fleet, drivers and journeys." />
      <Breadcrumbs items={[{ name: "Gallery", href: "/gallery" }]} />
      <section className="section-padding container-page columns-2 gap-4 md:columns-3">
        {GALLERY_IMAGES.map((img, i) => (
          <div key={i} className="relative mb-4 h-56 w-full overflow-hidden rounded-2xl break-inside-avoid">
            <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" loading="lazy" />
          </div>
        ))}
      </section>
    </>
  );
}
