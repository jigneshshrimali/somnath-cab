"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-shadow",
        scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur"
      )}
    >
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <nav aria-label="Primary" className="container-page flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Somnath Cab home">
          <div className="relative h-12 w-12">
            <Image
              src="/images/somnath-cab-logo.png"
              alt="Somnath Cab logo"
              fill
              sizes="48px"
              className="object-contain object-left"
              priority
            />
          </div>
          <div className="leading-tight hidden sm:block">
            <p className="text-lg font-bold text-brand-black">SOMNATH CAB</p>
            <p className="text-[10px] font-semibold tracking-wide text-gray-500">
              {SITE.tagline}
            </p>
          </div>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="relative group">
              {link.children ? (
                <>
                  <button
                    className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-brand-black hover:bg-brand-light"
                    aria-expanded={openSubmenu === link.label}
                    aria-haspopup="true"
                    onClick={() => setOpenSubmenu(openSubmenu === link.label ? null : link.label)}
                  >
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <ul
                    role="menu"
                    className="invisible absolute left-0 top-full z-20 min-w-[220px] rounded-xl border border-gray-100 bg-white p-2 opacity-0 shadow-card-hover transition-all group-hover:visible group-hover:opacity-100"
                  >
                    {link.children.map((child) => (
                      <li key={child.href} role="none">
                        <Link
                          role="menuitem"
                          href={child.href}
                          className="block rounded-lg px-3 py-2 text-sm text-brand-black hover:bg-brand-light"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  href={link.href}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm font-medium text-brand-black hover:bg-brand-light",
                    pathname === link.href && "bg-brand-light text-brand-dark"
                  )}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${SITE.phone}`}
            className="flex items-center gap-2 text-sm font-semibold text-brand-black"
          >
            <Phone className="h-4 w-4 text-brand-dark" />
            {SITE.phoneDisplay}
          </a>
          <Button asChild>
            <Link href="/booking">Book Now</Link>
          </Button>
        </div>

        <button
          className="lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-gray-100 bg-white lg:hidden" role="dialog" aria-modal="true">
          <ul className="container-page flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                {link.children ? (
                  <details>
                    <summary className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-brand-black">
                      {link.label}
                    </summary>
                    <ul className="ml-4 flex flex-col gap-1 border-l border-gray-100 pl-3">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} className="block rounded-md px-3 py-2 text-sm text-gray-600">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link href={link.href} className="block rounded-md px-3 py-2 text-sm font-medium text-brand-black">
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
            <li className="mt-2 flex flex-col gap-2">
              <a href={`tel:${SITE.phone}`} className="flex items-center gap-2 px-3 text-sm font-semibold">
                <Phone className="h-4 w-4" /> {SITE.phoneDisplay}
              </a>
              <Button asChild className="mx-3">
                <Link href="/booking">Book Now</Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
