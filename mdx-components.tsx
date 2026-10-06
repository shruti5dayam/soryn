import type { MDXComponents } from "mdx/types";

// Required by @next/mdx in the App Router.
//
// Maps Markdown elements to styled React components for a readable,
// professional article experience. Uses Soryn design tokens and the
// Geist typography system.

const components: MDXComponents = {
  h1: ({ children, id }) => (
    <h1 id={id} className="text-h1 font-semibold mt-0 mb-6">
      {children}
    </h1>
  ),
  h2: ({ children, id }) => (
    <h2 id={id} className="text-h2 font-semibold mt-10 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3 id={id} className="text-h3 font-semibold mt-8 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-base leading-7 text-foreground my-4">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside text-base leading-7 text-foreground my-4 space-y-2">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside text-base leading-7 text-foreground my-4 space-y-2">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="ml-4">{children}</li>,
  a: ({ children, href }) => (
    <a href={href} className="text-accent hover:text-accent-hover underline underline-offset-4">
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-border pl-4 italic text-muted my-6">
      {children}
    </blockquote>
  ),
  code: ({ children, inline }) => {
    if (inline) {
      return (
        <code className="bg-surface-soft text-foreground px-2 py-1 rounded-control font-mono text-sm">
          {children}
        </code>
      );
    }
    return <code>{children}</code>;
  },
  pre: ({ children }) => (
    <pre className="bg-surface-soft border border-border rounded-card p-4 overflow-x-auto font-mono text-sm my-6">
      {children}
    </pre>
  ),
  hr: () => <hr className="border-t border-border my-8" />,
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse border border-border text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-surface-soft">{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  th: ({ children }) => (
    <th className="border border-border px-4 py-2 text-left font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-border px-4 py-2">{children}</td>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
