import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteContainer from "@/components/site-container";
import { getAllArticleMetadata, getPublishedArticle } from "@/lib/articles";

// Only the slugs returned by generateStaticParams exist.
// Any other /blog/<something> is a 404 instead of a generated page.
export const dynamicParams = false;

// Tells Next.js which article pages to build: every published article.
// Drafts are not included, so they have no page.
export async function generateStaticParams() {
  const articles = await getAllArticleMetadata();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  if (!article) return {};

  return {
    title: article.metadata.title,
    description: article.metadata.metaDescription,
  };
}

// Route foundation only: the final article layout comes later.
export default async function ArticlePage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  if (!article) notFound();

  const { Content } = article;

  return (
    <SiteContainer size="reading" className="py-12 md:py-16">
      <article>
        <Content />
      </article>
    </SiteContainer>
  );
}
