import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS } from "@/lib/blog-data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog — Travel Tips & Guides",
  description: "Travel guides, tips and updates from Somnath Cab — covering Rajkot, Dwarka, Somnath and Gujarat road trips.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHero title="Somnath Cab Blog" description="Travel tips, destination guides and updates from the road." />
      <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} />
      <section className="section-padding container-page grid gap-6 md:grid-cols-3">
        {BLOG_POSTS.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="h-full overflow-hidden transition-shadow hover:shadow-card-hover">
              <div className="relative h-44">
                <Image src={post.coverImage} alt={post.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <CardContent className="p-5">
                <Badge variant="outline">{post.category}</Badge>
                <h2 className="mt-3 text-h4 font-semibold text-brand-black">{post.title}</h2>
                <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>
                <p className="mt-3 text-xs text-gray-400">{formatDate(post.date)} · {post.readTime}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </>
  );
}
