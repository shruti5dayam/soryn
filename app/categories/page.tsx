import SiteContainer from "@/components/site-container";

export default function CategoriesPage() {
  return (
    <SiteContainer className="py-12 md:py-16">
      <h1 className="text-3xl font-semibold">Categories</h1>
      <p className="mt-4 text-muted">
        Articles grouped by topic will be browsable here.
      </p>
    </SiteContainer>
  );
}
