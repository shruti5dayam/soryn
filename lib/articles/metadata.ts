import {
  ARTICLE_CATEGORIES,
  ARTICLE_DIFFICULTIES,
  ARTICLE_STATUSES,
  type ArticleMetadata,
} from "./types";

// Lowercase words separated by single hyphens, e.g. "what-is-an-ai-agent".
// Restricting slugs to this shape also makes them safe to use in file paths:
// no dots, slashes or spaces can get through.
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidSlug(value: string): boolean {
  return SLUG_PATTERN.test(value);
}

export type ValidationResult =
  | { ok: true; metadata: ArticleMetadata }
  | { ok: false; errors: string[] };

// Checks the `articleMetadata` export of one article.
// `fileSlug` is the file name without ".mdx", used to name the article in
// error messages and to check the file name matches the slug.
// All problems are collected, so an author can fix them in one go.
export function validateArticleMetadata(
  input: unknown,
  fileSlug: string,
): ValidationResult {
  const errors: string[] = [];
  const fail = (message: string) => errors.push(`${fileSlug}.mdx: ${message}`);

  if (typeof input !== "object" || input === null) {
    fail('missing or invalid "articleMetadata" export (expected an object)');
    return { ok: false, errors };
  }
  const data = input as Record<string, unknown>;

  const requireText = (field: string) => {
    const value = data[field];
    if (typeof value !== "string" || value.trim() === "") {
      fail(`"${field}" must be a non-empty string`);
    }
  };
  requireText("title");
  requireText("summary");
  requireText("metaDescription");

  // slug
  if (typeof data.slug !== "string" || data.slug.trim() === "") {
    fail('"slug" must be a non-empty string');
  } else if (!isValidSlug(data.slug)) {
    fail(
      `"slug" ("${data.slug}") must use lowercase letters, numbers and single hyphens only`,
    );
  } else if (data.slug !== fileSlug) {
    fail(`"slug" ("${data.slug}") must match the file name ("${fileSlug}")`);
  }

  // fixed-choice fields
  const requireOneOf = (field: string, allowed: readonly string[]) => {
    const value = data[field];
    if (typeof value !== "string" || !allowed.includes(value)) {
      fail(
        `"${field}" must be one of: ${allowed.join(", ")} (got ${JSON.stringify(value)})`,
      );
    }
  };
  requireOneOf("category", ARTICLE_CATEGORIES);
  requireOneOf("difficulty", ARTICLE_DIFFICULTIES);
  requireOneOf("status", ARTICLE_STATUSES);

  // tags
  if (
    !Array.isArray(data.tags) ||
    !data.tags.every((tag) => typeof tag === "string" && tag.trim() !== "")
  ) {
    fail('"tags" must be an array of non-empty strings');
  }

  // dates
  const publishedOk = checkDate("published", data.published, fail);
  const updatedOk = checkDate("updated", data.updated, fail);
  if (
    publishedOk &&
    updatedOk &&
    (data.updated as string) < (data.published as string)
  ) {
    fail('"updated" cannot be earlier than "published"');
  }

  // optional field
  if (data.featured !== undefined && typeof data.featured !== "boolean") {
    fail('"featured" must be true or false when present');
  }

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, metadata: data as ArticleMetadata };
}

// Accepts only real calendar dates written as YYYY-MM-DD.
// Returns true when valid; otherwise reports the problem and returns false.
function checkDate(
  field: string,
  value: unknown,
  fail: (message: string) => void,
): boolean {
  const looksRight = typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
  if (!looksRight) {
    fail(`"${field}" must be a date written as YYYY-MM-DD (got ${JSON.stringify(value)})`);
    return false;
  }
  // Rejects dates such as 2026-02-31 that match the pattern but don't exist.
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) {
    fail(`"${field}" ("${value}") is not a real calendar date`);
    return false;
  }
  return true;
}
