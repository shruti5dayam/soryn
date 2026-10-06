import type { Article } from "@/content/home";

// Not a link: article pages don't exist yet. No date or reading time
// is shown because none has been written.
export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="flex h-full flex-col rounded-card border border-border bg-surface p-6 md:p-8">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p className="text-muted">{article.category}</p>
        {/* The difficulty is written out as text, so it never relies on
            colour alone. */}
        <p className="rounded-control border border-border bg-surface-soft px-2 py-0.5 text-xs font-medium">
          <span className="sr-only">Difficulty: </span>
          {article.difficulty}
        </p>
      </div>

      <h3 className="mt-6 text-h3 font-semibold">{article.title}</h3>
      <p className="mt-3 text-base leading-7 text-muted">{article.summary}</p>
    </article>
  );
}
