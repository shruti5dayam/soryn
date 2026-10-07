import SiteContainer from "@/components/site-container";

export default function ExperimentsPage() {
  return (
    <SiteContainer size="medium" className="py-12 md:py-16">
      <p className="text-sm font-semibold tracking-widest text-muted uppercase">
        Building
      </p>
      <h1 className="mt-2 text-h1 font-semibold">Experiments / Build Logs</h1>
      <section
        aria-labelledby="empty-title"
        className="mt-8 rounded-card border border-border bg-surface-soft p-8 md:p-12"
      >
        <h2 id="empty-title" className="text-h3 font-semibold">
          No build logs yet.
        </h2>
        <p className="mt-3 max-w-reading text-base leading-7 text-muted">
          Experiments and build logs will be shared here once there is real
          work to document.
        </p>
      </section>
    </SiteContainer>
  );
}
