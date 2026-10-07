import Link from "next/link";
import type { ArticleMetadata } from "@/lib/articles";
import { formatDate, shouldShowUpdated } from "@/lib/articles/toc";

// The title is the only link; its ::after covers the whole card, so the
// full card is clickable without nesting interactive elements.
export default function BlogArticleCard({
  article,
  headingLevel = "h2",
}: {
  article: ArticleMetadata;
  // Use "h3" when the card sits under a section heading (e.g. the homepage).
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <article className="relative flex h-full flex-col rounded-card border border-border bg-surface p-6 transition-colors hover:border-accent md:p-8">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p className="text-muted">{article.category}</p>
        <p className="rounded-control border border-border bg-surface-soft px-2 py-0.5 text-xs font-medium">
          <span className="sr-only">Difficulty: </span>
          {article.difficulty}
        </p>
      </div>

      <Heading className="mt-6 text-h3 font-semibold">
        <Link
          href={`/blog/${article.slug}`}
          className="rounded-control after:absolute after:inset-0 after:content-['']"
        >
          {article.title}
        </Link>
      </Heading>
      <p className="mt-3 text-base leading-7 text-muted">{article.summary}</p>

      <p className="mt-auto pt-6 text-sm text-muted">
        <span>Published {formatDate(article.published)}</span>
        {shouldShowUpdated(article.published, article.updated) && (
          <span> · Updated {formatDate(article.updated)}</span>
        )}
      </p>
    </article>
  );
}
