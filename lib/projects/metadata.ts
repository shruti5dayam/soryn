import { checkDate, isValidSlug } from "@/lib/articles/metadata";
import { PROJECT_STATUSES, type ProjectMetadata } from "./types";

export type ProjectValidationResult =
  | { ok: true; metadata: ProjectMetadata }
  | { ok: false; errors: string[] };

// Checks the `projectMetadata` export of one project file. All problems are
// collected so an author can fix them in one go.
export function validateProjectMetadata(
  input: unknown,
  fileSlug: string,
): ProjectValidationResult {
  const errors: string[] = [];
  const fail = (message: string) => errors.push(`${fileSlug}.mdx: ${message}`);

  if (typeof input !== "object" || input === null) {
    fail('missing or invalid "projectMetadata" export (expected an object)');
    return { ok: false, errors };
  }
  const data = input as Record<string, unknown>;

  for (const field of ["title", "summary"]) {
    const value = data[field];
    if (typeof value !== "string" || value.trim() === "") {
      fail(`"${field}" must be a non-empty string`);
    }
  }

  if (typeof data.slug !== "string" || data.slug.trim() === "") {
    fail('"slug" must be a non-empty string');
  } else if (!isValidSlug(data.slug)) {
    fail(
      `"slug" ("${data.slug}") must use lowercase letters, numbers and single hyphens only`,
    );
  } else if (data.slug !== fileSlug) {
    fail(`"slug" ("${data.slug}") must match the file name ("${fileSlug}")`);
  }

  const isStringList = (value: unknown): value is string[] =>
    Array.isArray(value) &&
    value.every((item) => typeof item === "string" && item.trim() !== "");
  if (!isStringList(data.techStack) || data.techStack.length === 0) {
    fail('"techStack" must be a non-empty array of non-empty strings');
  }
  if (!isStringList(data.tags)) {
    fail('"tags" must be an array of non-empty strings');
  }

  if (typeof data.githubUrl !== "string" || !isHttpsUrl(data.githubUrl)) {
    fail('"githubUrl" must be a full https:// URL');
  }

  if (typeof data.featured !== "boolean") {
    fail('"featured" must be true or false');
  }

  if (
    typeof data.status !== "string" ||
    !(PROJECT_STATUSES as readonly string[]).includes(data.status)
  ) {
    fail(
      `"status" must be one of: ${PROJECT_STATUSES.join(", ")} (got ${JSON.stringify(data.status)})`,
    );
  }

  const publishedOk = checkDate("published", data.published, fail);
  const updatedOk = checkDate("updated", data.updated, fail);
  if (
    publishedOk &&
    updatedOk &&
    (data.updated as string) < (data.published as string)
  ) {
    fail('"updated" cannot be earlier than "published"');
  }

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, metadata: data as ProjectMetadata };
}

function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}
