// The project content model. Every project exports a `projectMetadata`
// object from its .mdx file that must match ProjectMetadata.

export const PROJECT_STATUSES = ["draft", "published"] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export type ProjectMetadata = {
  title: string;
  slug: string; // must match the file name: <slug>.mdx
  summary: string;
  techStack: string[];
  tags: string[];
  githubUrl: string; // https URL of the repository
  featured: boolean;
  published: string; // ISO date: YYYY-MM-DD
  updated: string; // ISO date: YYYY-MM-DD
  status: ProjectStatus;
};
