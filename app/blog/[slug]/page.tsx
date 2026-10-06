import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteContainer from "@/components/site-container";
import {
  getAllArticleMetadata,
  getPublishedArticle,
  type ArticleMetadata,
} from "@/lib/articles";
import { extractTableOfContents, formatDate, shouldShowUpdated, type TableOfContentsItem } from "@/lib/articles/toc";

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
    title: `${article.metadata.title} | Soryn`,
    description: article.metadata.metaDescription,
  };
}

// Article header section with title, category, and metadata.
function ArticleHeader({ metadata }: { metadata: ArticleMetadata }) {
  return (
    <div className="mb-8 md:mb-12">
      <p className="text-sm font-semibold tracking-widest text-muted uppercase">
        {metadata.category}
      </p>
      <h1 className="mt-2 text-3xl md:text-4xl font-semibold leading-tight">
        {metadata.title}
      </h1>
      {metadata.summary && (
        <p className="mt-4 text-lg text-muted leading-7">{metadata.summary}</p>
      )}
      <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-4 text-sm text-muted">
        <span>{metadata.difficulty}</span>
        <span>•</span>
        <span>Published {formatDate(metadata.published)}</span>
        {shouldShowUpdated(metadata.published, metadata.updated) && (
          <>
            <span>•</span>
            <span>Updated {formatDate(metadata.updated)}</span>
          </>
        )}
      </div>
    </div>
  );
}

// Table of Contents sidebar navigation.
function TableOfContents({ items }: { items: TableOfContentsItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="text-sm text-muted"
    >
      <p className="font-semibold text-foreground mb-4 uppercase text-xs tracking-widest">
        On this page
      </p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "ml-4" : ""}>
            <a
              href={`#${item.id}`}
              className="hover:text-accent transition-colors"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default async function ArticlePage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  if (!article) notFound();

  const { Content, metadata } = article;
  const toc = extractTableOfContents(article.sourceContent || "");

  return (
    <SiteContainer size="wide" className="py-12 md:py-16">
      <article className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 md:gap-12 lg:gap-16">
        {/* Desktop TOC sidebar */}
        <aside className="hidden md:block md:h-fit md:sticky md:top-24">
          <TableOfContents items={toc} />
        </aside>

        {/* Article content */}
        <div className="min-w-0">
          {/* Mobile/Tablet TOC (shown above article on small screens) */}
          <div className="md:hidden mb-8 pb-6 border-b border-border">
            <TableOfContents items={toc} />
          </div>

          <ArticleHeader metadata={metadata} />

          {/* The article body, constrained to reading width */}
          <div className="max-w-reading prose prose-sm md:prose-base">
            <Content />
          </div>
        </div>
      </article>
    </SiteContainer>
  );
}
