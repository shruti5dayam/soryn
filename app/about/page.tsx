import SiteContainer from "@/components/site-container";

export default function AboutPage() {
  return (
    <SiteContainer className="py-12 md:py-16">
      <h1 className="text-3xl font-semibold">About</h1>
      <p className="mt-4 text-muted">
        The story behind Soryn and its author will be told here.
      </p>
    </SiteContainer>
  );
}
