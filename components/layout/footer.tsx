import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { SITE, FOOTER_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-brand-black text-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <div className="relative h-10 w-10">
              <Image src="/images/somnath-cab-logo.png" alt="Somnath Cab" fill sizes="40px" className="object-contain" />
            </div>
            <span className="text-xl font-bold">SOMNATH CAB</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-gray-400">{SITE.description}</p>
          <div className="mt-5 flex gap-3">
            {[
              { Icon: Facebook, href: SITE.social.facebook, label: "Facebook" },
              { Icon: Instagram, href: SITE.social.instagram, label: "Instagram" },
              { Icon: Twitter, href: SITE.social.twitter, label: "Twitter" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-brand hover:text-brand-black transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol title="Quick Links" links={FOOTER_LINKS.quickLinks} />
        <FooterCol title="Our Services" links={FOOTER_LINKS.services} />
        <FooterCol title="Support" links={FOOTER_LINKS.support} />

        <div className="lg:col-span-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand">Contact Info</h3>
          <ul className="grid gap-3 text-sm text-gray-300 sm:grid-cols-3">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <span>{SITE.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container-page flex flex-col items-center justify-between gap-3 text-xs text-gray-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Somnath Cab. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand">{title}</h3>
      <ul className="space-y-2.5 text-sm text-gray-300">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:text-brand transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
