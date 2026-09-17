"use client";

import { ArrowDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { lenisRef } from "@/lib/lenis";
import { cn } from "@/lib/utils";

/**
 * The careers hero's "See open roles" (D-054): a primary button that jumps to the
 * roles heading on the same page and moves focus there, so the next Tab reaches the
 * first role instead of returning to the hero. A plain in-page link, so it still
 * works before hydration and without JS. Scrolls the way the contact directory does:
 * Lenis when it runs, otherwise a native scroll (instant with reduced motion).
 */
export function CareersRolesLink({ target, className, children }: { target: string; className?: string; children: React.ReactNode }) {
  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const heading = document.getElementById(target);
    if (!heading || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    // Keeps the click from reaching the Lenis anchor listener on window
    event.stopPropagation();
    window.history.pushState(null, "", `#${target}`);

    const focus = () => {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    };
    const lenis = lenisRef.current;
    if (lenis) {
      // Lenis caps scrolls at a cached page height; re-measure first. Focusing mid-scroll cuts it short.
      lenis.resize();
      lenis.scrollTo(heading, { onComplete: focus });
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    heading.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    focus();
  };

  return (
    <a href={`#${target}`} onClick={onClick} className={cn(buttonVariants(), className)}>
      <span>{children}</span>
      <ArrowDown
        aria-hidden
        strokeWidth={1.75}
        className="size-[1.125em] transition-transform duration-(--duration-fast) ease-(--ease-out) group-hover/button:translate-y-[3px]"
      />
    </a>
  );
}
