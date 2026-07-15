import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-data";
import { ROUTE_PAGES } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/fleet",
    "/airport-transfer",
    "/outstation-taxi",
    "/local-taxi",
    "/corporate",
    "/wedding",
    "/tour-packages",
    "/pricing",
    "/booking",
    "/offers",
    "/testimonials",
    "/blog",
    "/faqs",
    "/gallery",
    "/contact",
    "/privacy-policy",
    "/terms",
  ].map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const routeLandingPages = ROUTE_PAGES.map((p) => ({
    url: `${SITE.url}/${p.urlSlug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9, // high-intent SEO landing pages
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...routeLandingPages, ...blogRoutes];
}
