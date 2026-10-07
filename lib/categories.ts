import type { ArticleCategory } from "@/lib/articles/types";

// The single source of truth for the seven Soryn areas. Titles must match
// ARTICLE_CATEGORIES exactly: articles are filtered by `title`.
export type CategoryConfig = {
  slug: string;
  title: ArticleCategory;
  description: string;
};

export const CATEGORIES: CategoryConfig[] = [
  {
    slug: "programming-cs",
    title: "Programming & CS",
    description:
      "Python, algorithms, APIs, databases and core computer science concepts.",
  },
  {
    slug: "data-science-ml",
    title: "Data Science & ML",
    description:
      "NumPy, Pandas, statistics, machine learning and model evaluation.",
  },
  {
    slug: "ai-agents",
    title: "AI & Agents",
    description:
      "LLMs, tools, state, memory, planning, workflows and agent systems.",
  },
  {
    slug: "data-engineering",
    title: "Data Engineering",
    description:
      "Data ingestion, transformation, pipelines, storage and data quality.",
  },
  {
    slug: "cloud-infrastructure",
    title: "Cloud & Infrastructure",
    description:
      "Compute, storage, networking, containers and deployment foundations.",
  },
  {
    slug: "fintech",
    title: "FinTech",
    description:
      "Payments, reconciliation, automation, financial systems, risk and AI.",
  },
  {
    slug: "finance-investing",
    title: "Finance & Investing",
    description:
      "Markets, financial statements, valuation, portfolios and risk.",
  },
];

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}
