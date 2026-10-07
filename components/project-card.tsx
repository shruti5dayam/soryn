import Link from "next/link";
import type { ProjectMetadata } from "@/lib/projects";

// The title is the only link to the project page; its ::after covers the
// card. The GitHub link sits above that layer (relative z-10) so it stays
// separately clickable without nesting links.
export default function ProjectCard({
  project,
  headingLevel = "h2",
}: {
  project: ProjectMetadata;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <article className="relative flex h-full flex-col rounded-card border border-border bg-surface p-6 transition-colors hover:border-accent md:p-8">
      <Heading className="text-h3 font-semibold">
        <Link
          href={`/projects/${project.slug}`}
          className="rounded-control after:absolute after:inset-0 after:content-['']"
        >
          {project.title}
        </Link>
      </Heading>
      <p className="mt-3 text-base leading-7 text-muted">{project.summary}</p>

      <p className="mt-6 text-sm text-muted">
        <span className="font-semibold text-foreground">Built with</span>{" "}
        {project.techStack.join(" • ")}
      </p>

      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 mt-auto inline-flex min-h-11 items-center self-start rounded-control pt-4 text-sm font-medium text-accent-hover transition-colors hover:underline hover:underline-offset-4"
      >
        GitHub repository
        <span className="sr-only"> (opens in a new tab)</span>
        <span aria-hidden="true" className="ml-1">
          ↗
        </span>
      </a>
    </article>
  );
}
