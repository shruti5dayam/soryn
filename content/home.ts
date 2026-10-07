// Homepage content.
//
// All homepage text lives here as plain data, separate from the components
// that display it. Edit this file to change wording; the layout updates
// automatically. Only static copy lives here. Projects and articles come
// from their MDX files, never from this file.

export type Link = {
  label: string;
  href: string;
};

export type SectionIntro = {
  eyebrow: string;
  title: string;
  link?: Link;
};

// 1. Hero
export const hero = {
  descriptor: "Technology • Intelligence • Finance",
  title: "Soryn",
  statement:
    "Soryn turns learning, research, experiments and projects into clear educational content across technology, intelligence and finance.",
  creator: "ShrutiD",
  primaryCta: { label: "Explore Projects", href: "/projects" },
  secondaryCta: { label: "Read Articles", href: "/blog" },
};

// 2. Selected Projects (cards come from published project MDX)
export const projectsIntro: SectionIntro = {
  eyebrow: "Work",
  title: "Selected Projects",
  link: { label: "View all projects", href: "/projects" },
};

// 3. Areas / Topics
export const topicsIntro: SectionIntro = {
  eyebrow: "Explore",
  title: "Areas / Topics",
  link: { label: "Browse categories", href: "/categories" },
};

// 4. Featured Articles (cards come from published article MDX)
export const articlesIntro: SectionIntro = {
  eyebrow: "Writing",
  title: "Featured Articles",
  link: { label: "View all articles", href: "/blog" },
};

// 6. About ShrutiD
export const aboutIntro: SectionIntro = {
  eyebrow: "Creator",
  title: "About ShrutiD",
};

export const about = {
  paragraphs: [
    "I'm ShrutiD, a technologist learning and building across software, data, AI and financial systems.",
    "Soryn is where I turn what I learn, research and build into clear educational content, experiments and projects.",
  ],
  link: { label: "More About Me", href: "/about" },
};
