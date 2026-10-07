import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogArticleCard from "@/components/blog-article-card";
import SiteContainer from "@/components/site-container";
import { getAllArticleMetadata } from "@/lib/articles";
import { CATEGORIES, getCategoryBySlug } from "@/lib/categories";

// Only the seven configured slugs exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/categories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.title} | Soryn`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/categories/[slug]">) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  // Published only, newest first; filtered by exact category name.
  const articles = (await getAllArticleMetadata()).filter(
    (article) => article.category === category.title,
  );

  return (
    <>
      <SiteContainer size="medium" className="pt-12 md:pt-16">
        <Link
          href="/categories"
          className="inline-flex min-h-11 items-center rounded-control text-sm font-medium text-accent-hover hover:underline hover:underline-offset-4"
        >
          <span aria-hidden="true" className="mr-1">
            ←
          </span>
          All categories
        </Link>
        <p className="mt-4 text-sm font-semibold tracking-widest text-muted uppercase">
          Category
        </p>
        <h1 className="mt-2 text-h1 font-semibold">{category.title}</h1>
        <p className="mt-4 max-w-reading text-lg leading-7 text-muted">
          {category.description}
        </p>
      </SiteContainer>

      <SiteContainer className="py-12 md:py-16">
        {articles.length === 0 ? (
          <section
            aria-labelledby="empty-title"
            className="rounded-card border border-border bg-surface-soft p-8 md:p-12"
          >
            <h2 id="empty-title" className="text-h3 font-semibold">
              No published lessons in this category yet.
            </h2>
            <p className="mt-3 max-w-reading text-base leading-7 text-muted">
              Lessons will appear here as they are reviewed and published.
            </p>
          </section>
        ) : (
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <li key={article.slug}>
                <BlogArticleCard article={article} />
              </li>
            ))}
          </ul>
        )}
      </SiteContainer>
    </>
  );
}
