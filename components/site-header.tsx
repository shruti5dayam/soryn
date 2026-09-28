import Link from "next/link";

// The main sections of the site. Add a new entry here to add a nav link.
const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/categories", label: "Categories" },
  { href: "/projects", label: "Projects" },
  { href: "/experiments", label: "Experiments" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-zinc-200">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link
          href="/"
          className="rounded text-xl font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
        >
          Soryn
        </Link>

        <nav aria-label="Main">
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded text-zinc-700 underline-offset-4 hover:text-zinc-950 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
