"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FeaturedPost } from "@/components/sections/blog/FeaturedPost";
import { PostCard } from "@/components/sections/blog/PostCard";
import { blogIndex, categoryCounts, type BlogPost } from "@/content/blog";
import { cn } from "@/lib/utils";

const PER_PAGE = 9;

/** Page numbers, collapsing to 1-4 then the last once there are more than seven. */
function pageNumbers(total: number): (number | "gap")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  return [1, 2, 3, 4, "gap", total];
}

/**
 * The journal's listing: the newest article across the top, then the rest as a
 * board, filtered by category and by a search over titles and openings.
 *
 * The filtering is the only reason this is a client component, and it is an
 * enhancement: every post is in the markup, the default view is everything, and
 * the page reads without JavaScript. Changing a filter or a page returns to the
 * top of the list rather than leaving the reader halfway down a board that has
 * just changed under them.
 */
export function BlogListing({ posts }: { posts: BlogPost[] }) {
  const [category, setCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const [featured, ...rest] = posts;
  const categories = useMemo(() => categoryCounts(rest), [rest]);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rest.filter(
      (post) =>
        (!category || post.categories.includes(category)) &&
        (!q || post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q)),
    );
  }, [rest, category, query]);

  const pages = Math.max(1, Math.ceil(matches.length / PER_PAGE));
  const current = Math.min(page, pages);
  const shown = matches.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const reset =
    <T,>(set: (value: T) => void) =>
    (value: T) => {
      set(value);
      setPage(1);
    };

  return (
    <section className="bg-surface" aria-labelledby="journal-title">
      <Container className="section-y">
        {featured && <FeaturedPost post={featured} />}

        <div className="mt-[72px] flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <h2 id="journal-title" className="text-[28px] leading-[1.1] font-bold tracking-[-0.018em] text-ink-900">
            {blogIndex.latest}
          </h2>
          <label className="relative block w-full md:w-[260px]">
            <span className="sr-only">{blogIndex.searchLabel}</span>
            <Search
              aria-hidden
              strokeWidth={1.75}
              className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => reset(setQuery)(event.target.value)}
              placeholder={blogIndex.searchPlaceholder}
              className="h-11 w-full rounded-pill border border-line-strong bg-surface pr-4 pl-10 text-[13px] text-ink-900 outline-none placeholder:text-muted focus-visible:border-brand-600"
            />
          </label>
        </div>

        {/* The categories the journal files under, with how much is in each */}
        <ul className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {[{ slug: null, label: "All", count: rest.length }, ...categories].map((option) => {
            const active = category === option.slug;
            return (
              <li key={option.slug ?? "all"} className="shrink-0">
                <button
                  type="button"
                  onClick={() => reset(setCategory)(option.slug)}
                  aria-pressed={active}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-pill border px-4 py-[9px] text-[13px] font-medium transition-colors duration-150",
                    active
                      ? "border-ink-900 bg-ink-900 text-on-dark"
                      : "border-line-strong bg-transparent text-muted hover:border-muted hover:bg-surface hover:text-ink-900",
                  )}
                >
                  {option.label}
                  <span className={cn("font-mono text-[11px]", active ? "opacity-70" : "opacity-60")}>
                    {option.count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {shown.length > 0 ? (
          <ul className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((post) => (
              <li key={post.slug} className="h-full">
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-12 text-[16px] text-muted">{blogIndex.empty}</p>
        )}

        {pages > 1 && (
          <nav aria-label="Pagination" className="mt-16 flex items-center justify-center gap-1.5">
            <PageButton label="Previous" disabled={current === 1} onClick={() => setPage(current - 1)}>
              <ChevronLeft aria-hidden strokeWidth={1.75} className="size-4" />
            </PageButton>
            {pageNumbers(pages).map((number, i) =>
              number === "gap" ? (
                <span key={`gap-${i}`} className="px-1.5 font-mono text-[12px] text-muted">
                  …
                </span>
              ) : (
                <button
                  key={number}
                  type="button"
                  onClick={() => setPage(number)}
                  aria-current={number === current ? "page" : undefined}
                  className={cn(
                    "h-10 min-w-10 rounded-pill border px-3 text-[14px] font-medium tabular transition-colors duration-150",
                    number === current
                      ? "border-ink-900 bg-ink-900 text-on-dark"
                      : "border-line-strong bg-transparent text-muted hover:border-ink-900 hover:text-ink-900",
                  )}
                >
                  {number}
                </button>
              ),
            )}
            <PageButton label="Next" disabled={current === pages} onClick={() => setPage(current + 1)}>
              <ChevronRight aria-hidden strokeWidth={1.75} className="size-4" />
            </PageButton>
          </nav>
        )}
      </Container>
    </section>
  );
}

function PageButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid size-10 place-items-center rounded-pill border border-line-strong bg-transparent text-muted transition-colors duration-150 hover:border-ink-900 hover:text-ink-900 disabled:opacity-40 disabled:hover:border-line-strong disabled:hover:text-muted"
    >
      {children}
    </button>
  );
}
