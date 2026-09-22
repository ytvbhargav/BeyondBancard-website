"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Section progress for a solution page: a short column of nodes at the right
 * edge from xl, one per section, filling as the page is read. Each node is a
 * link to its section, so it doubles as a way back up a long page.
 *
 * Hidden below xl, where the viewport is too narrow to give it room, and from
 * assistive technology: every node repeats a heading that is already on the page.
 */
export function SolutionProgress({ sections }: { sections: { id: string; title: string }[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (sections.length === 0) return;
    const headings = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (headings.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = headings.indexOf(entry.target as HTMLElement);
          if (i >= 0) setActive(i);
        }
      },
      // A band across the upper half: the section whose heading last crossed it is the one being read.
      { rootMargin: "-20% 0px -60% 0px" },
    );
    headings.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  if (sections.length < 3) return null;

  return (
    <nav
      aria-hidden
      className="pointer-events-none fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="flex flex-col items-end gap-3">
        {sections.map((section, i) => (
          <li key={section.id} className="pointer-events-auto">
            <a
              href={`#${section.id}`}
              title={section.title}
              tabIndex={-1}
              className={cn(
                "block h-2 rounded-pill transition-[background-color,width] duration-(--duration-base)",
                i === active ? "w-6 bg-brand-600" : "w-2 bg-line-strong hover:bg-muted",
              )}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
