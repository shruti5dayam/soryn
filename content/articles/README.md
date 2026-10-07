# Soryn articles

Educational articles live here as MDX files. This folder holds content only;
the code that loads it is in `lib/articles/`.

## The basics

- **One `.mdx` file is one article.**
- **The file name must be the slug.** `what-is-an-ai-agent.mdx` has the slug
  `what-is-an-ai-agent` and appears at `/blog/what-is-an-ai-agent`. Slugs use
  lowercase letters, numbers and single hyphens only.
- **Start from the template.** Copy `ARTICLE_TEMPLATE.mdx.example` to
  `<slug>.mdx`. The template itself is never published, because it doesn't end
  in `.mdx`.

## Metadata

Every article starts with an `articleMetadata` export (there is no YAML
frontmatter):

```mdx
export const articleMetadata = {
  title: "...",
  slug: "...", // same as the file name
  summary: "...", // shown on article cards
  metaDescription: "...", // shown to search engines
  category: "AI & Agents",
  tags: ["agents", "agent-loop"],
  difficulty: "Beginner",
  published: "2026-10-10", // YYYY-MM-DD
  updated: "2026-10-10", // YYYY-MM-DD
  status: "draft",
}
```

- **category:** exactly one of `Programming & CS`, `Data Science & ML`,
  `AI & Agents`, `Data Engineering`, `Cloud & Infrastructure`, `FinTech`,
  `Finance & Investing`.
- **tags:** as many as are useful, lowercase with hyphens.
- **difficulty:** `Beginner`, `Intermediate` or `Advanced`.
- **status:** `draft` or `published`.

The metadata is checked when the site builds. A mistake (unknown category, bad
date, slug that doesn't match the file name...) stops the build and the error
names the article and the field.

## Headings and Table of Contents

- **Do not write an H1 (`#`) in the MDX body.** The `articleMetadata.title` is
  automatically rendered as the page's single H1. Start your article body with
  the introduction paragraph.
- Use `##` (H2) for major sections and `###` (H3) for sub-sections.
- **Do not skip heading levels** (e.g., don't jump from H2 to H4).
- Use **plain text** in headings for V1. The TOC generator needs readable text
  to create reliable deep-links.
- Headings inside fenced code blocks are ignored by the TOC extractor, so feel
  free to include code examples.

The site **automatically generates heading IDs** and a **table of contents** from
your H2 and H3 headings. Readers can click the TOC to jump to sections, and the
URL updates with anchors like `#how-does-it-work`. Do not manually write heading
IDs or maintain a separate TOC list.

## Drafts and publishing

Only `status: "published"` articles appear on the site. Drafts are left out of
public lists and have no page: `/blog/<draft-slug>` is a 404. Change the status
to `"published"` only after the article has been reviewed.

## Writing

- Write clearly and educationally, as if explaining to a peer.
- Use headings to structure your article logically.
- Include code examples in fenced code blocks when useful.
- Final articles come from the Soryn Content Studio workflow. Do not publish
  unverified material, and list sources under `## References`.
