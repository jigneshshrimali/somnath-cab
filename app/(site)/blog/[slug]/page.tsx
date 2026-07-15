import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { BLOG_POSTS } from "@/lib/blog-data";
import { formatDate } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, images: [post.coverImage] },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <>
      <PageHero title={post.title} description={`${formatDate(post.date)} · ${post.readTime} · By ${post.author}`} />
      <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: post.title, href: `/blog/${post.slug}` }]} />
      <article className="section-padding container-page max-w-3xl">
        <div className="relative mb-8 h-72 overflow-hidden rounded-2xl md:h-96">
          <Image src={post.coverImage} alt={post.title} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" priority />
        </div>
        <div className="prose max-w-none text-gray-700">
          <p className="text-lg">{post.excerpt}</p>
          <p>
            This article is part of the Somnath Cab travel guide series. Replace this placeholder
            body with full editorial content — itinerary suggestions, distance/time estimates,
            local tips and internal links to relevant service pages (e.g. our{" "}
            <a href="/outstation-taxi" className="text-brand-dark underline">outstation taxi service</a>).
          </p>
        </div>
      </article>
    </>
  );
}
