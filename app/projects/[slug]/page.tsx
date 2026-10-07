import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteContainer from "@/components/site-container";
import { formatDate, shouldShowUpdated } from "@/lib/articles/toc";
import { getAllProjectMetadata, getPublishedProject } from "@/lib/projects";

// Only published project slugs exist; anything else is a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getAllProjectMetadata();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProject(slug);
  if (!project) return {};
  return {
    title: `${project.metadata.title} | Soryn`,
    description: project.metadata.summary,
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = await getPublishedProject(slug);
  if (!project) notFound();

  const { Content, metadata } = project;

  return (
    <SiteContainer size="reading" className="py-12 md:py-16">
      <article>
        <header className="mb-8 md:mb-12">
          <p className="text-sm font-semibold tracking-widest text-muted uppercase">
            Project
          </p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">
            {metadata.title}
          </h1>
          <p className="mt-4 text-lg leading-7 text-muted">
            {metadata.summary}
          </p>

          <p className="mt-6 text-sm text-muted">
            <span className="font-semibold text-foreground">Built with</span>{" "}
            {metadata.techStack.join(" • ")}
          </p>
          <p className="mt-2 text-sm text-muted">
            Published {formatDate(metadata.published)}
            {shouldShowUpdated(metadata.published, metadata.updated) && (
              <> · Updated {formatDate(metadata.updated)}</>
            )}
          </p>

          <a
            href={metadata.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-control bg-accent px-6 text-base font-medium text-white transition-colors hover:bg-accent-hover"
          >
            View Repository on GitHub
            <span className="sr-only"> (opens in a new tab)</span>
            <span aria-hidden="true" className="ml-2">
              ↗
            </span>
          </a>
        </header>

        <div className="border-t border-border pt-8">
          <Content />
        </div>
      </article>
    </SiteContainer>
  );
}
