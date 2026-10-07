import type { Metadata } from "next";
import BlogArticleCard from "@/components/blog-article-card";
import SiteContainer from "@/components/site-container";
import { getAllArticleMetadata } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles & Lessons | Soryn",
  description:
    "Educational articles and lessons on programming, data science, AI, data engineering, cloud, FinTech and finance.",
};

export default async function BlogPage() {
  // Published only, newest first.
  const articles = await getAllArticleMetadata();

  return (
    <>
      <SiteContainer size="medium" className="pt-12 md:pt-16">
        <p className="text-sm font-semibold tracking-widest text-muted uppercase">
          Learn
        </p>
        <h1 className="mt-2 text-h1 font-semibold">Articles &amp; Lessons</h1>
        <p className="mt-4 max-w-reading text-lg leading-7 text-muted">
          A growing library of clear, research-backed lessons across
          technology, data, AI, financial systems and finance.
        </p>
      </SiteContainer>

      <SiteContainer className="py-12 md:py-16">
        {articles.length === 0 ? (
          <section
            aria-labelledby="empty-title"
            className="rounded-card border border-border bg-surface-soft p-8 md:p-12"
          >
            <h2 id="empty-title" className="text-h3 font-semibold">
              No published lessons yet.
            </h2>
            <p className="mt-3 max-w-reading text-base leading-7 text-muted">
              Soryn is being built from real learning, research and projects.
              The first articles will appear here as they are reviewed and
              published.
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
