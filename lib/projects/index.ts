// Server-side project loading. Uses the filesystem, so import it only from
// Server Components, never from a file that starts with "use client".

import { readdir } from "node:fs/promises";
import path from "node:path";
import type { ComponentType } from "react";
import { isValidSlug } from "@/lib/articles/metadata";
import { validateProjectMetadata } from "./metadata";
import type { ProjectMetadata } from "./types";

export * from "./types";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export type Project = {
  metadata: ProjectMetadata;
  Content: ComponentType;
};

// Slugs of every top-level ".mdx" file in content/projects, sorted A-Z.
export async function getProjectSlugs(): Promise<string[]> {
  let entries;
  try {
    entries = await readdir(PROJECTS_DIR, { withFileTypes: true });
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
          `content/projects/${entry.name}: file name must be a slug (lowercase letters, numbers and single hyphens)`,
        );
      }
      return slug;
    })
    .sort();
}

// Loads one project by slug, whatever its status. The slug is checked
// against the real file list BEFORE it reaches the import path, so input
// like "../secret" can never touch the filesystem.
export async function getProject(slug: string): Promise<Project | null> {
  if (!isValidSlug(slug)) return null;
  const knownSlugs = await getProjectSlugs();
  if (!knownSlugs.includes(slug)) return null;

  const projectModule = (await import(`@/content/projects/${slug}.mdx`)) as {
    default: ComponentType;
    projectMetadata?: unknown;
  };

  const result = validateProjectMetadata(projectModule.projectMetadata, slug);
  if (!result.ok) throw new Error(result.errors.join("\n"));

  return { metadata: result.metadata, Content: projectModule.default };
}

// Like getProject, but returns null for drafts. Use this for public pages.
export async function getPublishedProject(
  slug: string,
): Promise<Project | null> {
  const project = await getProject(slug);
  if (!project || project.metadata.status !== "published") return null;
  return project;
}

// Published projects, newest first (ties ordered by slug A-Z).
export async function getAllProjectMetadata(): Promise<ProjectMetadata[]> {
  const slugs = await getProjectSlugs();
  const projects = await Promise.all(slugs.map((slug) => getProject(slug)));

  return projects
    .flatMap((project) => (project ? [project.metadata] : []))
    .filter((metadata) => metadata.status === "published")
    .sort((a, b) => {
      if (a.published !== b.published) return a.published < b.published ? 1 : -1;
      return a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0;
    });
}

// Up to `limit` projects for the homepage: featured first, otherwise the
// newest published ones.
export async function getHomepageProjects(
  limit = 3,
): Promise<ProjectMetadata[]> {
  const all = await getAllProjectMetadata();
  const featured = all.filter((project) => project.featured);
  return (featured.length > 0 ? featured : all).slice(0, limit);
}
