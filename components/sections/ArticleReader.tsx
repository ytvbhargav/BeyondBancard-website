"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Confirm } from "@/components/ui/confirm";
import { PostTitle } from "@/components/sections/PostTitle";
import { lenisRef } from "@/lib/lenis";
import { cn } from "@/lib/utils";

/** A section heading in the contents list. Flagged headings carry their Confirm note (demo mode only). */
export type ArticleTocItem = { id: string; label: string; confirm?: boolean; note?: string };

/** A section is current once its heading passes this share of the viewport height. */
const READING_LINE = 0.4;

/**
 * Reading layout (the article's bold element, D-054): the prose column with an
 * "On this page" contents list built from the section headings. From lg it is a
 * sticky right rail whose current section carries a 2px brand bar and
 * aria-current, updated by one IntersectionObserver; below lg it is a
 * collapsible list above the prose. Anchor jumps land under the sticky header
 * through the global scroll-padding.
 */
export function ArticleReader({
  title,
  items,
  children,
}: {
  title: string;
  items: ArticleTocItem[];
  children: React.ReactNode;
}) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const headings = items.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => !!el);
    if (!headings.length) return;

    // Same offset the anchor jumps use: html { scroll-padding-top: header height + 16px }
    const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;

    // The observer's root runs from far above the page down to the reading line,
    // so a heading is "intersecting" exactly when it has passed the line. Any
    // move across it, however far the jump (scrollbar drag, End key, find in
    // page, scroll restoration), changes that state and fires the callback; the
    // current section is then read from layout.
    const update = () => {
      const line = Math.max(offset, window.innerHeight * READING_LINE);
      let id: string | null = null;
      for (const h of headings) {
        if (h.getBoundingClientRect().top > line) break;
        id = h.id;
      }
      setCurrent(id);
    };

    const io = new IntersectionObserver(update, {
      rootMargin: `100000px 0px -${Math.round((1 - READING_LINE) * 100)}% 0px`,
    });
    headings.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [items]);

  // Without smooth scrolling the native jump already lands under the header
  // (scroll-padding-top). With Lenis on, these links take over so the jump is one
  // Lenis scroll (which reads scroll-padding-top) after re-measuring the page, which
  // Lenis caches and can be stale on a long article; the hash is recorded and focus
  // moves to the section as a native jump would.
  const jump = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const lenis = lenisRef.current;
    const target = document.getElementById(id);
    if (!lenis || !target || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    // Keeps the click from reaching the Lenis listener on window
    event.stopPropagation();
    window.history.pushState(null, "", `#${id}`);
    // Lenis caps scrolls at a cached page height, which can be stale on a long page; re-measure first
    lenis.resize();
    lenis.scrollTo(target, {
      // Focusing during the smooth scroll cuts it short, so wait until it lands
      onComplete: () => {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      },
    });
  };

  const list = (
    <ol className="border-l border-line">
      {items.map((item) => {
        const active = item.id === current;
        return (
          <li key={item.id} className="flex">
            <a
              href={`#${item.id}`}
              onClick={(event) => jump(event, item.id)}
              aria-current={active ? "true" : undefined}
              className={cn(
                "-ml-px flex min-h-11 flex-1 items-center border-l-2 py-2 pl-4 text-[0.9375rem] leading-snug text-pretty",
                "transition-[border-color,color] duration-(--duration-fast) ease-(--ease-out)",
                active
                  ? "border-brand-600 font-medium text-ink-900"
                  : "border-transparent text-muted hover:text-ink-900",
              )}
            >
              {item.confirm ? (
                <Confirm variant="marker" note={item.note ?? "Unverified content"}>
                  <PostTitle>{item.label}</PostTitle>
                </Confirm>
              ) : (
                <span>
                  <PostTitle>{item.label}</PostTitle>
                </span>
              )}
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
      <details className="group/toc rounded-md border border-line bg-paper lg:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
          {title}
          <ChevronDown
            aria-hidden
            strokeWidth={1.75}
            className="size-5 text-muted transition-transform duration-(--duration-fast) ease-(--ease-out) group-open/toc:rotate-180"
          />
        </summary>
        <nav aria-label={title} className="px-5 pb-4">
          {list}
        </nav>
      </details>

      {/* Before the prose in the DOM, so keyboard users reach the contents first at every width */}
      <nav
        aria-labelledby="article-toc-title"
        className="hidden lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:block"
      >
        <div className="sticky top-[calc(var(--header-h)+2rem)]">
          <p id="article-toc-title" className="mb-4 type-small font-semibold text-ink-900">
            {title}
          </p>
          {list}
        </div>
      </nav>

      <div className="min-w-0 lg:col-span-8 lg:col-start-1 lg:row-start-1">{children}</div>
    </div>
  );
}
