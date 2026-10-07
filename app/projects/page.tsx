import type { Metadata } from "next";
import ProjectCard from "@/components/project-card";
import SiteContainer from "@/components/site-container";
import { getAllProjectMetadata } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects | Soryn",
  description:
    "Case studies of the systems built and explored on Soryn, with links to their source repositories.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjectMetadata();

  return (
    <>
      <SiteContainer size="medium" className="pt-12 md:pt-16">
        <p className="text-sm font-semibold tracking-widest text-muted uppercase">
          Work
        </p>
        <h1 className="mt-2 text-h1 font-semibold">Projects</h1>
        <p className="mt-4 max-w-reading text-lg leading-7 text-muted">
          Case studies of systems built and explored on Soryn.
        </p>
      </SiteContainer>

      <SiteContainer className="py-12 md:py-16">
        {projects.length === 0 ? (
          <section
            aria-labelledby="empty-title"
            className="rounded-card border border-border bg-surface-soft p-8 md:p-12"
          >
            <h2 id="empty-title" className="text-h3 font-semibold">
              No published projects yet.
            </h2>
            <p className="mt-3 max-w-reading text-base leading-7 text-muted">
              Projects will appear here once their write-ups have been reviewed
              and published.
            </p>
          </section>
        ) : (
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {projects.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        )}
      </SiteContainer>
    </>
  );
}
