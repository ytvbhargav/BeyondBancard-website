"use client";

import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChipToggle } from "@/components/ui/chip";
import { SectionHeader } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { PostRow } from "@/components/sections/PostRow";
import { blogIndex, type BlogCategory, type BlogPost } from "@/content/blog";
import { stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * "Recent articles": category chips over an editorial list (D-054). The heading
 * and chips stack at every width, as on /industries, so the row holds however
 * many categories the CMS sends. Chips are derived from the posts in the list,
 * so a category only shows when it has posts here; they are ordered by count,
 * then by most recent post. Filtering re-keys the rows so they fade in again
 * (CSS, no layout animation); the filter state is not kept in the URL. While a
 * category is chosen the filter covers this page only, so the page count gives
 * way to the status and a reset.
 */
export function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const [category, setCategory] = useState<BlogCategory | null>(null);
  const [filtered, setFiltered] = useState(false);
  const chipsRef = useRef<HTMLDivElement>(null);
  const copy = blogIndex.list;

  const categories = useMemo(() => {
    const counts = new Map<BlogCategory, { count: number; newest: string }>();
    for (const p of posts) {
      for (const c of p.categories) {
        const entry = counts.get(c);
        counts.set(c, {
          count: (entry?.count ?? 0) + 1,
          newest: entry && entry.newest > p.date ? entry.newest : p.date,
        });
      }
    }
    return [...counts.entries()]
      .sort(([, a], [, b]) => b.count - a.count || b.newest.localeCompare(a.newest))
      .map(([name, { count }]) => ({ name, count }));
  }, [posts]);

  const visible = category ? posts.filter((p) => p.categories.includes(category)) : posts;

  const choose = (next: BlogCategory | null) => {
    if (next === category) return;
    setCategory(next);
    setFiltered(true);
  };

  // The reset button unmounts with the filter, so focus moves to the "All" chip
  const reset = () => {
    choose(null);
    chipsRef.current?.querySelector("button")?.focus();
  };

  return (
    <section aria-labelledby="articles-title">
      <SectionHeader id="articles-title" title={copy.title} className="md:mb-10" />

      {/* One swipeable row on phones (bleeds to the gutter, padded so focus rings are not clipped); wraps from md */}
      <div
        ref={chipsRef}
        role="group"
        aria-label={copy.filterLabel}
        className="-mx-5 -my-1 mb-8 flex gap-2 overflow-x-auto px-5 py-1 *:shrink-0 sm:-mx-6 sm:px-6 md:mx-0 md:mb-10 md:flex-wrap md:overflow-visible md:px-0"
      >
        <ChipToggle pressed={category === null} onClick={() => choose(null)} count={posts.length}>
          {copy.all}
        </ChipToggle>
        {categories.map((c) => (
          <ChipToggle key={c.name} pressed={category === c.name} onClick={() => choose(c.name)} count={c.count}>
            {c.name}
          </ChipToggle>
        ))}
      </div>

      <Stagger as="ul" className="border-t border-line-strong">
        {visible.map((post, i) => (
          <StaggerItem as="li" key={`${category ?? "all"}:${post.slug}`}>
            <div
              className={
                filtered
                  ? "animate-in duration-(--duration-base) ease-(--ease-out) fade-in-0 fill-mode-backwards slide-in-from-bottom-2"
                  : undefined
              }
              style={filtered ? { animationDelay: `${Math.min(i, 8) * stagger.tight}s` } : undefined}
            >
              <PostRow post={post} />
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 sm:justify-end">
        {/* Always mounted so changes are announced; shown while a category is chosen */}
        <p aria-live="polite" className={cn("type-small text-muted tabular", !category && "sr-only")}>
          {copy.status(visible.length, posts.length, category ?? undefined)}
        </p>
        {category && (
          <Button variant="ghost" onClick={reset}>
            {copy.showAll}
          </Button>
        )}
      </div>
    </section>
  );
}
