"use client";

// This is a Client Component because the menu needs state (open/closed)
// and event handlers. Keeping it small means the rest of the header can
// stay a Server Component and ship no JavaScript.

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import SiteContainer from "@/components/site-container";

type NavLink = {
  href: string;
  label: string;
};

export default function MobileNav({ links }: { links: NavLink[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  // While the menu is open, pressing Escape closes it and returns
  // keyboard focus to the menu button.
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen(!isOpen)}
        className="-mr-2 flex h-11 items-center gap-2 rounded-control px-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
      >
        <MenuIcon isOpen={isOpen} />
        Menu
      </button>

      {/* Positioned just below the sticky header (the nearest positioned parent).
          The `hidden` attribute hides it from everyone, including screen readers. */}
      <div
        id={menuId}
        hidden={!isOpen}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-border bg-background"
      >
        <SiteContainer>
          <nav aria-label="Main">
            <ul className="py-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-control py-3 text-base font-medium text-foreground transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </SiteContainer>
      </div>
    </div>
  );
}

// Three lines when closed, an X when open. Decorative only: the button's
// visible "Menu" text and aria-expanded already tell users what it does.
function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      {isOpen ? (
        <path d="M5 5l10 10M15 5L5 15" />
      ) : (
        <path d="M3 6h14M3 10h14M3 14h14" />
      )}
    </svg>
  );
}
