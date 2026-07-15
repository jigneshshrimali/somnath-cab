import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { SITE } from "@/lib/constants";
import { breadcrumbSchema } from "@/lib/schema-org";

export interface Crumb {
  name: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const schema = breadcrumbSchema([
    { name: "Home", url: SITE.url },
    ...items.map((i) => ({ name: i.name, url: `${SITE.url}${i.href}` })),
  ]);

  return (
    <nav aria-label="Breadcrumb" className="bg-brand-light">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ol className="container-page flex flex-wrap items-center gap-1.5 py-3 text-sm text-gray-600">
        <li className="flex items-center gap-1.5">
          <Link href="/" className="flex items-center gap-1 hover:text-brand-dark">
            <Home className="h-3.5 w-3.5" /> Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
            {i === items.length - 1 ? (
              <span aria-current="page" className="font-medium text-brand-black">
                {item.name}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-brand-dark">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
