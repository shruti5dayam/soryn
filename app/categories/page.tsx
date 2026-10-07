import type { Metadata } from "next";
import CategoryCard from "@/components/category-card";
import SiteContainer from "@/components/site-container";
import { CATEGORIES } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Categories | Soryn",
  description:
    "Browse Soryn's seven learning areas: programming, data science, AI, data engineering, cloud, FinTech and finance.",
};

export default function CategoriesPage() {
  return (
    <>
      <SiteContainer size="medium" className="pt-12 md:pt-16">
        <p className="text-sm font-semibold tracking-widest text-muted uppercase">
          Explore
        </p>
        <h1 className="mt-2 text-h1 font-semibold">Categories</h1>
        <p className="mt-4 max-w-reading text-lg leading-7 text-muted">
          Lessons on Soryn are organised into seven areas.
        </p>
      </SiteContainer>

      <SiteContainer className="py-12 md:py-16">
        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <li key={category.slug}>
              <CategoryCard category={category} headingLevel="h2" />
            </li>
          ))}
        </ul>
      </SiteContainer>
    </>
  );
}
