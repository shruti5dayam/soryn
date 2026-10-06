import type { Experiment } from "@/content/home";

// Deliberately lighter than ProjectCard: smaller padding and no visual area.
// Not a link: experiment pages don't exist yet.
export default function ExperimentCard({
  experiment,
}: {
  experiment: Experiment;
}) {
  return (
    <article className="h-full rounded-card border border-border p-5">
      {/* The status is written out as text, so it never relies on colour. */}
      <p className="inline-block rounded-control border border-border bg-surface px-2 py-0.5 text-xs font-medium">
        <span className="sr-only">Status: </span>
        {experiment.status}
      </p>
      <h3 className="mt-4 text-base font-semibold">{experiment.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">
        {experiment.description}
      </p>
    </article>
  );
}
