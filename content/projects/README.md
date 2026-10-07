# Soryn projects

Project case studies live here as MDX files. This folder holds content only;
the code that loads it is in `lib/projects/`.

## The basics

- **One `.mdx` file is one project.**
- **The file name must be the slug.** `my-project.mdx` has the slug
  `my-project` and appears at `/projects/my-project`.
- **Start from the template.** Copy `PROJECT_TEMPLATE.mdx.example` to
  `<slug>.mdx`. The template is never published.
- `_system/placeholder.mdx` is required so the build works when there are no
  projects yet. Do not delete it.

## Metadata

Every project starts with a `projectMetadata` export:

```mdx
export const projectMetadata = {
  title: "...",
  slug: "...", // same as the file name
  summary: "...", // shown on project cards
  techStack: ["Python"],
  tags: ["..."],
  githubUrl: "https://github.com/...", // must be https://
  featured: true, // preferred on the homepage
  published: "2026-10-10", // YYYY-MM-DD
  updated: "2026-10-10", // YYYY-MM-DD
  status: "draft", // "draft" or "published"
}
```

Metadata is checked when the site builds; mistakes stop the build with a
message naming the file and field.

## Headings

- `projectMetadata.title` becomes the page's single H1. **Do not write an H1
  in the MDX body.**
- Begin the body with an introduction, then use `##` for sections and `###`
  for sub-sections.

## Publishing

Only `status: "published"` projects appear on the site (`/projects`, the
homepage, and `/projects/<slug>`). Drafts have no page. The homepage shows up
to three projects, preferring `featured: true`, and hides the section when no
project is published. Do not publish unverified results or invented metrics.
