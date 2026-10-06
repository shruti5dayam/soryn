import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  /* config options here */
};

// Lets `.mdx` files be imported like any other module (see lib/articles).
// No remark/rehype plugins yet: they come later if the articles need them.
const withMDX = createMDX({});

export default withMDX(nextConfig);
