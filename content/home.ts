// Homepage content.
//
// All homepage text lives here as plain data, separate from the components
// that display it. Edit this file to change wording; the layout updates
// automatically. This is temporary structured content: long-form articles
// will later move to MDX.
//
// Everything below is DRAFT copy. Do not add metrics, dates, reading times
// or results that have not been confirmed.

export type Link = {
  label: string;
  href: string;
};

export type SectionIntro = {
  eyebrow: string;
  title: string;
  link?: Link;
};

export type Project = {
  title: string;
  purpose: string;
  context: string[];
  learning: string;
};

export type Category = {
  title: string;
  description: string;
};

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type Article = {
  title: string;
  category: string;
  difficulty: Difficulty;
  summary: string;
};

export type ExperimentStatus = "Experiment" | "In Progress";

export type Experiment = {
  status: ExperimentStatus;
  title: string;
  description: string;
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

// 2. Selected Projects
export const projectsIntro: SectionIntro = {
  eyebrow: "Work",
  title: "Selected Projects",
  link: { label: "View all projects", href: "/projects" },
};

export const projects: Project[] = [
  {
    title: "Financial Intelligence & Reconciliation",
    purpose:
      "A system for turning financial transaction data into structured, reviewable reconciliation and mapping workflows.",
    context: [
      "Python",
      "FastAPI",
      "React",
      "reconciliation",
      "rules",
      "human review",
    ],
    learning:
      "Exploring how deterministic financial controls and AI-assisted workflows can work together without removing human approval.",
  },
  {
    title: "Bank Statement Data Pipeline",
    purpose:
      "A data pipeline for preserving raw financial source files, validating source formats and producing canonical transaction data.",
    context: ["Python", "validation", "lineage", "canonical data", "Excel"],
    learning:
      "Building a reliable path from raw financial files to standardized data that can feed reconciliation and mapping systems.",
  },
];

// 3. Areas / Topics
export const topicsIntro: SectionIntro = {
  eyebrow: "Explore",
  title: "Areas / Topics",
  link: { label: "Browse categories", href: "/categories" },
};

export const categories: Category[] = [
  {
    title: "Programming & CS",
    description:
      "Python, algorithms, APIs, databases and core computer science concepts.",
  },
  {
    title: "Data Science & ML",
    description:
      "NumPy, Pandas, statistics, machine learning and model evaluation.",
  },
  {
    title: "AI & Agents",
    description:
      "LLMs, tools, state, memory, planning, workflows and agent systems.",
  },
  {
    title: "Data Engineering",
    description:
      "Data ingestion, transformation, pipelines, storage and data quality.",
  },
  {
    title: "Cloud & Infrastructure",
    description:
      "Compute, storage, networking, containers and deployment foundations.",
  },
  {
    title: "FinTech",
    description:
      "Payments, reconciliation, automation, financial systems, risk and AI.",
  },
  {
    title: "Finance & Investing",
    description:
      "Markets, financial statements, valuation, portfolios and risk.",
  },
];

// 4. Featured Articles (planned articles; no article pages exist yet)
export const articlesIntro: SectionIntro = {
  eyebrow: "Writing",
  title: "Featured Articles",
  link: { label: "View all articles", href: "/blog" },
};

export const articles: Article[] = [
  {
    title: "What Is an AI Agent?",
    category: "AI & Agents",
    difficulty: "Beginner",
    summary:
      "A practical introduction to agents, goals, tools, state and the loop that connects them.",
  },
  {
    title: "Workflows vs Agents",
    category: "AI & Agents",
    difficulty: "Beginner",
    summary:
      "Understanding when software should follow a predefined workflow and when an agent should make decisions dynamically.",
  },
  {
    title: "The Agent Loop",
    category: "AI & Agents",
    difficulty: "Beginner",
    summary:
      "How an agent repeatedly observes, reasons, acts and evaluates while working toward a goal.",
  },
];

// 5. Experiments / Build Logs
export const experimentsIntro: SectionIntro = {
  eyebrow: "Building",
  title: "Experiments / Build Logs",
  link: { label: "View build logs", href: "/experiments" },
};

export const experiments: Experiment[] = [
  {
    status: "Experiment",
    title: "Agent Tool Loop",
    description:
      "Exploring how an agent chooses tools, receives results and continues reasoning through a task.",
  },
  {
    status: "In Progress",
    title: "Source Data Normalization",
    description:
      "Testing a pipeline that converts different financial source formats into a consistent transaction structure.",
  },
  {
    status: "Experiment",
    title: "Graph Modeling Notes",
    description:
      "Exploring nodes, relationships and graph modeling patterns while learning Neo4j and Cypher.",
  },
];

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
