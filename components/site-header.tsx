import Link from "next/link";
import MobileNav from "@/components/mobile-nav";
import SiteContainer from "@/components/site-container";

// The main publication sections.
const primaryLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/categories", label: "Categories" },
  { href: "/projects", label: "Projects" },
];

// Pages about the site and its creator.
const secondaryLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// A Server Component: it has no state, so it renders to plain HTML.
// Only <MobileNav /> (a Client Component) sends JavaScript to the browser.
export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <SiteContainer className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="rounded-control text-xl font-semibold tracking-tight text-foreground"
        >
          Soryn
        </Link>

        {/* Desktop navigation (tablet width and up). */}
        <nav aria-label="Main" className="hidden md:block">
          <div className="flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {primaryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-control py-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* A thin divider separates the secondary links. */}
            <ul className="flex items-center gap-6 border-l border-border pl-8">
              {secondaryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-control py-2 text-sm text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Mobile navigation (below tablet width). */}
        <MobileNav links={[...primaryLinks, ...secondaryLinks]} />
      </SiteContainer>
    </header>
  );
}
