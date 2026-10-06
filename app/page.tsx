import SiteContainer from "@/components/site-container";

export default function HomePage() {
  return (
    <SiteContainer className="py-12 md:py-16">
      <h1 className="text-3xl font-semibold">Soryn</h1>
      <p className="mt-4 text-muted">
        A home for educational writing, research and projects on technology,
        intelligence and finance.
      </p>
    </SiteContainer>
  );
}
