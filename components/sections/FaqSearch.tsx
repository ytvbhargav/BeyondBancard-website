"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { fill, plural, useFaqExplorer } from "@/components/sections/FaqExplorer";
import { cn } from "@/lib/utils";

/** Lets typing settle before the result count is announced, so a screen reader reads one count, not one per keystroke. */
const ANNOUNCE_DELAY_MS = 700;

/**
 * The FAQ page's search field (D-054), set large in the hero as the page's one
 * bold element. Filters every answer below as you type; Enter jumps to the first
 * result. Filtering never moves focus out of the field.
 */
export function FaqSearch() {
  const { copy, query, setQuery, term, searching, total, count, inputRef, clear, showResults } = useFaqExplorer();

  const visibleCount = searching
    ? fill(plural(count, copy.count.short), { count })
    : fill(plural(total, copy.count.all), { count: total });
  const message = !searching
    ? fill(plural(total, copy.count.all), { count: total })
    : count === 0
      ? fill(copy.count.none, { term })
      : fill(plural(count, copy.count.match), { count, term });

  // The live region starts with the idle count, so nothing is announced on load.
  const [announced, setAnnounced] = useState(message);
  useEffect(() => {
    const timer = window.setTimeout(() => setAnnounced(message), ANNOUNCE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [message]);

  return (
    <form
      role="search"
      className="w-full max-w-[42rem]"
      onSubmit={(e) => {
        e.preventDefault();
        // Enter in an empty field stays put instead of jumping to the first answer.
        if (searching) showResults();
      }}
    >
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <Label htmlFor="faq-search">{copy.search.label}</Label>
        <p className="type-small tabular text-muted">{visibleCount}</p>
      </div>
      <div className="relative">
        <Search
          aria-hidden
          strokeWidth={1.75}
          className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-muted md:left-6"
        />
        <input
          ref={inputRef}
          id="faq-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            // Firefox doesn't clear search fields on Escape.
            if (e.key === "Escape" && query) {
              e.preventDefault();
              setQuery("");
            }
          }}
          placeholder={copy.search.placeholder}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="search"
          className={cn(
            // One focus ring: the 1px border plus a 1px shadow make a 2px focus-colour ring with a soft brand halo.
            // outline-hidden replaces the global offset outline (it drew a second blue line) but still shows in forced colours.
            "h-14 w-full rounded-pill border border-line-strong bg-surface pl-13 text-base text-ink-900 shadow-float transition-[border-color,box-shadow] duration-(--duration-fast) placeholder:text-muted hover:border-ink-700/50 focus-visible:border-brand-600 focus-visible:shadow-[0_0_0_1px_var(--color-focus),0_0_0_5px_var(--color-brand-100),var(--shadow-float)] focus-visible:outline-hidden md:type-body-lg md:h-16 md:pl-15 [&::-webkit-search-cancel-button]:appearance-none",
            // Room for the clear button only once there is something to clear, so the placeholder fits at 390px.
            query ? "pr-14 md:pr-16" : "pr-5 md:pr-6",
          )}
        />
        {query && (
          <button
            type="button"
            onClick={clear}
            aria-label={copy.search.clear}
            className="absolute top-1/2 right-1.5 grid size-11 -translate-y-1/2 place-items-center rounded-pill text-muted transition-colors duration-(--duration-fast) hover:bg-paper hover:text-ink-900 md:right-2.5"
          >
            <X aria-hidden strokeWidth={1.75} className="size-5" />
          </button>
        )}
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announced}
      </p>
    </form>
  );
}
