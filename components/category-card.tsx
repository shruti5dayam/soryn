import Link from "next/link";
import type { CategoryConfig } from "@/lib/categories";

// The title is the only link; its ::after covers the whole card, so the
// full card is clickable without nesting interactive elements.
export default function CategoryCard({
  category,
  headingLevel = "h3",
}: {
  category: CategoryConfig;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <article className="relative h-full rounded-card border border-border bg-surface p-6 transition-colors hover:border-accent">
      <Heading className="text-lg font-semibold">
        <Link
          href={`/categories/${category.slug}`}
          className="rounded-control after:absolute after:inset-0 after:content-['']"
        >
          {category.title}
        </Link>
      </Heading>
      <p className="mt-2 text-sm leading-6 text-muted">
        {category.description}
      </p>
    </article>
  );
}
