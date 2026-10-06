// The article content model. Every article exports an `articleMetadata`
// object from its .mdx file that must match ArticleMetadata.

// The seven primary categories. An article has exactly one.
export const ARTICLE_CATEGORIES = [
  "Programming & CS",
  "Data Science & ML",
  "AI & Agents",
  "Data Engineering",
  "Cloud & Infrastructure",
  "FinTech",
  "Finance & Investing",
] as const;

export const ARTICLE_DIFFICULTIES = [
  "Beginner",
  "Intermediate",
  "Advanced",
] as const;

// Only "published" articles appear on the public site.
export const ARTICLE_STATUSES = ["draft", "published"] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];
export type ArticleDifficulty = (typeof ARTICLE_DIFFICULTIES)[number];
export type ArticleStatus = (typeof ARTICLE_STATUSES)[number];

export type ArticleMetadata = {
  title: string;
  slug: string; // must match the file name: <slug>.mdx
  summary: string; // short text for article cards and the page intro
  metaDescription: string; // text for search engines (<meta name="description">)
  category: ArticleCategory;
  tags: string[]; // free-form, lowercase-with-hyphens by convention
  difficulty: ArticleDifficulty;
  published: string; // ISO date: YYYY-MM-DD
  updated: string; // ISO date: YYYY-MM-DD
  status: ArticleStatus;
  featured?: boolean;
};
