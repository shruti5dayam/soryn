import Link from "next/link";
import type { SectionIntro } from "@/content/home";

type SectionHeadingProps = SectionIntro & {
  // Used by the parent <section aria-labelledby="..."> so screen readers
  // announce each section by its title.
  id: string;
};

// Small uppercase eyebrow + main heading, with an optional text link
// on the right (below the heading on mobile).
export default function SectionHeading({
  id,
  eyebrow,
  title,
  link,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-semibold tracking-widest text-muted uppercase">
          {eyebrow}
        </p>
        <h2 id={id} className="mt-2 text-h2 font-semibold">
          {title}
        </h2>
      </div>

      {link && (
        <Link
          href={link.href}
          className="inline-flex min-h-11 items-center rounded-control text-sm font-medium text-accent-hover transition-colors hover:underline hover:underline-offset-4"
        >
          {link.label}
          {/* Decorative arrow: the link text already says everything. */}
          <span aria-hidden="true" className="ml-1">
            →
          </span>
        </Link>
      )}
    </div>
  );
}
