// Server-side article loading.
//
// This file uses the filesystem, so import it only from Server Components,
// route handlers and generateStaticParams/generateMetadata, never from a
// file that starts with "use client".

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { ComponentType } from "react";
import { isValidSlug, validateArticleMetadata } from "./metadata";
import type { ArticleMetadata } from "./types";

export * from "./types";

// Every article lives here as <slug>.mdx.
const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export type Article = {
  metadata: ArticleMetadata;
  Content: ComponentType; // the rendered MDX body
  sourceContent?: string; // raw MDX source for TOC extraction
};

// Slugs of every ".mdx" file in content/articles, sorted A-Z.
// Other files (README.md, ARTICLE_TEMPLATE.mdx.example) are ignored because
// they don't end in exactly ".mdx". A badly named article file is a loud
// error, so it can't silently go missing.
export async function getArticleSlugs(): Promise<string[]> {
  let entries;
  try {
    entries = await readdir(ARTICLES_DIR, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => {
      const slug = entry.name.slice(0, -".mdx".length);
      if (!isValidSlug(slug)) {
        throw new Error(
          `content/articles/${entry.name}: file name must be a slug (lowercase letters, numbers and single hyphens), e.g. "what-is-an-ai-agent.mdx"`,
        );
      }
      return slug;
    })
    .sort();
}

// Loads one article by slug, whatever its status (draft or published).
// Returns null for any slug that isn't an existing article file. The slug is
// checked against the real file list BEFORE it is used in the import path,
// so input like "../secret" or "a/b" can never reach the filesystem.
export async function getArticle(slug: string): Promise<Article | null> {
  if (!isValidSlug(slug)) return null;
  const knownSlugs = await getArticleSlugs();
  if (!knownSlugs.includes(slug)) return null;

  const articleModule = (await import(`@/content/articles/${slug}.mdx`)) as {
    default: ComponentType;
    articleMetadata?: unknown;
  };

  const result = validateArticleMetadata(articleModule.articleMetadata, slug);
  if (!result.ok) throw new Error(result.errors.join("\n"));

  // Read the source file for TOC extraction
  let sourceContent: string | undefined;
  try {
    const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
    sourceContent = await readFile(filePath, "utf-8");
  } catch {
    // Source not available, but that's ok for rendering
  }

  return {
    metadata: result.metadata,
    Content: articleModule.default,
    sourceContent,
  };
}

// Like getArticle, but returns null for drafts too. Use this for public pages.
export async function getPublishedArticle(
  slug: string,
): Promise<Article | null> {
  const article = await getArticle(slug);
  if (!article || article.metadata.status !== "published") return null;
  return article;
}

// Metadata for all articles, newest first.
// Drafts are left out unless includeDrafts is true.
// Articles with the same date are ordered by slug A-Z, so the order is
// always the same.
export async function getAllArticleMetadata(
  options: { includeDrafts?: boolean } = {},
): Promise<ArticleMetadata[]> {
  const slugs = await getArticleSlugs();
  const articles = await Promise.all(slugs.map((slug) => getArticle(slug)));

  return articles
    .flatMap((article) => (article ? [article.metadata] : []))
    .filter((metadata) => options.includeDrafts || metadata.status === "published")
    .sort((a, b) => {
      if (a.published !== b.published) return a.published < b.published ? 1 : -1;
      if (a.slug === b.slug) return 0;
      return a.slug < b.slug ? -1 : 1;
    });
}
