import SiteContainer from "@/components/site-container";

export default function BlogPage() {
  return (
    <SiteContainer className="py-12 md:py-16">
      <h1 className="text-3xl font-semibold">Blog</h1>
      <p className="mt-4 text-muted">
        Educational articles will be listed here.
      </p>
    </SiteContainer>
  );
}
