import Link from "next/link";
import SiteContainer from "@/components/site-container";

const exploreLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-border">
      {/* One column on mobile, three columns from tablet width up. */}
      <SiteContainer className="grid gap-10 py-12 text-sm text-muted md:grid-cols-[2fr_1fr_1fr] md:gap-12 md:py-16">
        <div>
          <p className="text-lg font-semibold tracking-tight text-foreground">
            Soryn
          </p>
          <p className="mt-2">Technology • Intelligence • Finance</p>
          <p className="mt-6">Created by ShrutiD</p>
        </div>

        <nav aria-labelledby="footer-explore">
          <h2 id="footer-explore" className="font-semibold text-foreground">
            Explore
          </h2>
          <ul className="mt-4 space-y-2">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block rounded-control py-1 transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-semibold text-foreground">Connect</h2>
          {/* Placeholders: plain text, not links, until the real profile
              URLs are approved. Never use href="#" as a stand-in. */}
          <ul className="mt-4 space-y-2">
            <li className="py-1">LinkedIn</li>
            <li className="py-1">GitHub</li>
          </ul>
        </div>
      </SiteContainer>
    </footer>
  );
}
