// Table of Contents extraction from MDX article source.
// Generates consistent heading IDs using github-slugger (same as rehype-slug).

import Slugger from "github-slugger";

export type TableOfContentsItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

// Extracts H2 and H3 headings from article source.
// Returns a list of TOC items with generated IDs matching rehype-slug output.
// Ignores headings inside fenced code blocks.
export function extractTableOfContents(source: string): TableOfContentsItem[] {
  const slugger = new Slugger();
  const items: TableOfContentsItem[] = [];

  // Split by code fences to avoid treating code-block content as headings
  const codeFencePattern = /```[\s\S]*?```/g;
  const nonCodeSource = source.replace(codeFencePattern, "");

  // Match H2 and H3 headings: "## Heading" or "### Subheading"
  const headingPattern = /^(#{2,3})\s+(.+)$/gm;
  let match;

  while ((match = headingPattern.exec(nonCodeSource)) !== null) {
    const level = (match[1].length as 2 | 3);
    const text = match[2].trim();

    // Only include H2 and H3
    if (level === 2 || level === 3) {
      // Use github-slugger to generate the id (same logic as rehype-slug)
      const id = slugger.slug(text);
      items.push({ id, text, level });
    }
  }

  return items;
}

// Format a date from ISO string (e.g., "2026-10-10") to human readable.
export function formatDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Determine if we should show the updated date separately.
// Only show "Updated" if it differs from published date.
export function shouldShowUpdated(published: string, updated: string): boolean {
  return published !== updated;
}
