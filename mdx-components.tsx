import type { MDXComponents } from "mdx/types";

// Required by @next/mdx in the App Router.
//
// This is where MDX elements (headings, paragraphs, links, code...) can be
// mapped to custom React components. It is intentionally empty for now, so
// articles render as plain HTML. Article typography comes in a later phase.
const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
