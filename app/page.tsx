import Link from "next/link";
import SiteContainer from "@/components/site-container";
import SectionHeading from "@/components/section-heading";
import ProjectCard from "@/components/project-card";
import CategoryCard from "@/components/category-card";
import BlogArticleCard from "@/components/blog-article-card";
import {
  hero,
  projectsIntro,
  topicsIntro,
  articlesIntro,
  aboutIntro,
  about,
} from "@/content/home";
import { getAllArticleMetadata } from "@/lib/articles";
import { CATEGORIES } from "@/lib/categories";
import { getHomepageProjects } from "@/lib/projects";

// Shared vertical spacing for every section: 64px on mobile, 96px on desktop.
const sectionSpacing = "py-16 md:py-24";

// This page only assembles the homepage. All the text lives in
// content/home.ts, and each card's markup lives in its own component.
// Project and article sections only render when real published MDX exists.
export default async function HomePage() {
  const [projects, allArticles] = await Promise.all([
    getHomepageProjects(3),
    getAllArticleMetadata(),
  ]);
  const articles = allArticles.slice(0, 3);

  return (
    <>
      {/* 1. Hero */}
      <section aria-labelledby="hero-heading">
        {/* Less bottom padding than other sections: the Projects section
            below adds its own top padding, so the two add up. */}
        <SiteContainer className="pt-16 pb-12 md:pt-24 md:pb-8">
          <p className="text-sm font-semibold tracking-widest text-muted uppercase">
            {hero.descriptor}
          </p>
          <h1
            id="hero-heading"
            className="mt-4 text-display font-semibold"
          >
            {hero.title}
          </h1>
          {/* Narrower than the container so the lines stay easy to read. */}
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted md:text-xl md:leading-9">
            {hero.statement}
          </p>
          <p className="mt-4 text-sm text-muted">
            Created by{" "}
            <span className="font-semibold text-foreground">
              {hero.creator}
            </span>
          </p>

          {/* Stacked and full width on phones, side by side from `sm` up. */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={hero.primaryCta.href}
              className="inline-flex min-h-12 items-center justify-center rounded-control bg-accent px-6 text-base font-medium text-white transition-colors hover:bg-accent-hover"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="inline-flex min-h-12 items-center justify-center rounded-control border border-border bg-surface px-6 text-base font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </SiteContainer>
      </section>

      {/* 2. Selected Projects */}
      {projects.length > 0 && (
      <section aria-labelledby="projects-heading">
        <SiteContainer className={sectionSpacing}>
          <SectionHeading id="projects-heading" {...projectsIntro} />
          <ul className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
            {projects.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} headingLevel="h3" />
              </li>
            ))}
          </ul>
        </SiteContainer>
      </section>
      )}

      {/* 3. Areas / Topics (soft blue band) */}
      <section
        aria-labelledby="topics-heading"
        className="bg-surface-soft"
      >
        <SiteContainer className={sectionSpacing}>
          <SectionHeading id="topics-heading" {...topicsIntro} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {CATEGORIES.map((category) => (
              <li key={category.slug}>
                <CategoryCard category={category} />
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-sm text-muted">
            Finance content on Soryn is educational and is not personalised
            financial advice.
          </p>
        </SiteContainer>
      </section>

      {/* 4. Featured Articles */}
      {articles.length > 0 && (
        <section aria-labelledby="articles-heading">
          <SiteContainer className={sectionSpacing}>
            <SectionHeading id="articles-heading" {...articlesIntro} />
            <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {articles.map((article) => (
                <li key={article.slug}>
                  <BlogArticleCard article={article} headingLevel="h3" />
                </li>
              ))}
            </ul>
          </SiteContainer>
        </section>
      )}

      {/* 5. About ShrutiD */}
      <section
        aria-labelledby="about-heading"
        className="border-t border-border"
      >
        <SiteContainer size="medium" className={sectionSpacing}>
          <SectionHeading id="about-heading" {...aboutIntro} />
          <div className="mt-6 max-w-reading space-y-4 text-lg leading-8 text-muted">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Link
            href={about.link.href}
            className="mt-6 inline-flex min-h-11 items-center rounded-control text-sm font-medium text-accent-hover transition-colors hover:underline hover:underline-offset-4"
          >
            {about.link.label}
            <span aria-hidden="true" className="ml-1">
              →
            </span>
          </Link>
        </SiteContainer>
      </section>
    </>
  );
}
