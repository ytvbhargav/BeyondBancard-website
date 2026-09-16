"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, m } from "motion/react";
import { Search, X } from "lucide-react";
import { ChipToggle } from "@/components/ui/chip";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { LayoutMotionProvider } from "@/components/motion/MotionProvider";
import { groupLabels, industryPath } from "@/content/industries";
import { cta } from "@/content/site";
import { duration, ease } from "@/lib/motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import type { Industry, IndustryGroup } from "@/types/content";

type Group = Exclude<IndustryGroup, "featured">;
const GROUPS = Object.keys(groupLabels) as Group[];

/**
 * All industries (S6). Filter chips and a name search; cards reflow with
 * Motion layout animations. Each group keeps an id so menu links like
 * /industries#retail land on it.
 */
export function AllIndustries({ title, industries }: { title: string; industries: Industry[] }) {
  const [group, setGroup] = useState<Group | "all">("all");
  const [query, setQuery] = useState("");
  const reduce = useReducedMotionSafe();

  const list = industries.filter((i) => i.group !== "featured");
  const q = query.trim().toLowerCase();

  const visible = useMemo(
    () =>
      GROUPS.filter((g) => group === "all" || g === group)
        .map((g) => ({
          group: g,
          items: list.filter((i) => i.group === g && (!q || i.name.toLowerCase().includes(q) || i.teaser.toLowerCase().includes(q))),
        }))
        .filter((g) => g.items.length > 0),
    [group, q, list],
  );
  const count = visible.reduce((n, g) => n + g.items.length, 0);

  const transition = { duration: reduce ? 0 : duration.base, ease: ease.out };

  return (
    <Section tone="surface" id="all-industries" aria-labelledby="all-industries-title">
      <SectionHeader id="all-industries-title" title={title} className="md:mb-10" />

      <div className="flex flex-col gap-5 border-b border-line pb-8 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by group" className="flex flex-wrap gap-2">
          <ChipToggle pressed={group === "all"} onClick={() => setGroup("all")} count={list.length}>
            All
          </ChipToggle>
          {GROUPS.map((g) => (
            <ChipToggle key={g} pressed={group === g} onClick={() => setGroup(g)} count={list.filter((i) => i.group === g).length}>
              {groupLabels[g]}
            </ChipToggle>
          ))}
        </div>
        <div className="relative w-full lg:w-72">
          <label htmlFor="industry-search" className="sr-only">
            Search industries
          </label>
          <Search aria-hidden strokeWidth={1.75} className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
          <input
            id="industry-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search industries"
            autoComplete="off"
            className="h-12 w-full rounded-pill border border-line-strong bg-surface pr-11 pl-11 text-ink-900 placeholder:text-muted focus-visible:border-brand-600 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute top-1/2 right-1 grid size-10 -translate-y-1/2 place-items-center rounded-pill text-muted hover:text-ink-900"
              aria-label="Clear search"
            >
              <X aria-hidden strokeWidth={1.75} className="size-4" />
            </button>
          )}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {count === 0 ? "No industries match" : `Showing ${count} ${count === 1 ? "industry" : "industries"}`}
      </p>

      <LayoutMotionProvider>
      <LayoutGroup>
        <div className="relative">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((g) => (
              <m.div
                key={g.group}
                id={g.group}
                layout={!reduce}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transition}
                className="scroll-mt-32 border-b border-line py-10 last:border-b-0 lg:grid lg:grid-cols-12 lg:gap-8"
              >
                <m.h3 layout={!reduce ? "position" : false} className="type-h4 mb-5 lg:col-span-3 lg:mb-0 lg:pt-4">
                  {groupLabels[g.group]}
                </m.h3>
                <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {g.items.map((ind) => (
                      <m.li
                        key={ind.slug}
                        layout={!reduce}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={transition}
                      >
                        <SpotlightCard href={industryPath(ind.slug)} title={ind.name} body={ind.teaser} size="sm" />
                      </m.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </m.div>
            ))}
          </AnimatePresence>

          {count === 0 && (
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={transition} className="py-16">
              <p className="type-h3">No industries match “{query}”.</p>
              <p className="mt-2 max-w-[34rem] text-muted">
                Try a broader term or clear the filter. We also review many business models individually.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setQuery("");
                    setGroup("all");
                  }}
                >
                  Clear filters
                </Button>
                <Button href={cta.expert.href} size="sm" arrow>
                  {cta.expert.label}
                </Button>
              </div>
            </m.div>
          )}
        </div>
      </LayoutGroup>
      </LayoutMotionProvider>
    </Section>
  );
}
