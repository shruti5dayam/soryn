import type { Project } from "@/content/home";

// Not a link and has no hover effect: project detail pages don't exist yet.
// When they do, wrap the title in a <Link> and add a subtle hover state.
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col rounded-card border border-border bg-surface p-6 md:p-8">
      {/* PLACEHOLDER for a real screenshot or architecture diagram.
          Replace this div with an <Image> (and a proper alt text) when
          real project visuals exist. Hidden from screen readers because
          it carries no information. */}
      <div
        aria-hidden="true"
        className="flex aspect-[16/7] items-center justify-center rounded-control border border-border bg-surface-soft px-4 text-center text-sm text-muted"
      >
        Architecture / workflow preview
      </div>

      <h3 className="mt-6 text-h3 font-semibold">{project.title}</h3>
      <p className="mt-3 text-base leading-7 text-muted">{project.purpose}</p>

      <dl className="mt-6 space-y-4 border-t border-border pt-6 text-sm">
        <div>
          <dt className="font-semibold">Built with</dt>
          <dd className="mt-1 text-muted">{project.context.join(" • ")}</dd>
        </div>
        <div>
          <dt className="font-semibold">Focus</dt>
          <dd className="mt-1 leading-6 text-muted">{project.learning}</dd>
        </div>
      </dl>
    </article>
  );
}
