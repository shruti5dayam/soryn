import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  /* config options here */
};

// Auto-generates ids on headings so TOC links and deep-linking work.
const withMDX = createMDX({
  options: {
    rehypePlugins: [["rehype-slug"]],
  },
});

export default withMDX(nextConfig);
