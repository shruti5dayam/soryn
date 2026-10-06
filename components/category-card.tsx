import type { Category } from "@/content/home";

// Not a link: category pages don't exist yet.
export default function CategoryCard({ category }: { category: Category }) {
  return (
    <article className="h-full rounded-card border border-border bg-surface p-6">
      <h3 className="text-lg font-semibold">{category.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">
        {category.description}
      </p>
    </article>
  );
}
