"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { RevealWords } from "@/components/motion/RevealWords";
import { href } from "@/lib/links";
import { cn } from "@/lib/utils";
import type { Capability, Pillar } from "@/types/content";

const ORDER: Pillar[] = ["Accept", "Protect", "Grow", "Operate"];

/**
 * What the account actually comes with, as a board of tools rather than a tab
 * strip: light cards on ink, the first one wide, each naming the pillar it
 * belongs to and linking on to it.
 *
 * The filter is an enhancement — every card is in the markup and the "All" view
 * is the default, so without JS the whole board reads. Filtering re-keys the
 * grid so the cards animate back in.
 */
export function CapabilityExplorer({ title, items }: { title: string; items: Capability[] }) {
  const pillars = ORDER.filter((p) => items.some((i) => i.pillar === p));
  const [filter, setFilter] = useState<Pillar | "All">("All");
  const shown = filter === "All" ? items : items.filter((i) => i.pillar === filter);

  return (
    <section className="tone-dark relative isolate overflow-hidden bg-ink-900" aria-labelledby="capabilities-title">
      <div aria-hidden className="page-hero-dark absolute inset-0 -z-10 opacity-60" />
      <Container className="section-y">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <RevealWords
            as="h2"
            id="capabilities-title"
            text={title}
            className="type-h2 max-w-[20ch] text-on-dark"
          />
          {/* Pillar filter: a row of pills that scrolls on phones */}
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 lg:justify-end">
            {(["All", ...pillars] as const).map((p) => (
              <button
                key={p}
                type="button"
                aria-pressed={filter === p}
                onClick={() => setFilter(p)}
                className={cn(
                  "type-small h-10 shrink-0 rounded-pill border px-4 font-medium transition-colors duration-(--duration-fast)",
                  filter === p
                    ? "border-brand-500 bg-brand-500 text-white"
                    : "border-ink-700 text-on-dark-muted hover:border-ink-600 hover:text-on-dark",
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <ul key={filter} className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((item, i) => (
            <li
              key={item.title}
              className={cn(
                "anim-rise",
                // The first card of the unfiltered board runs wide, so the grid reads as a board and not a row of equals
                filter === "All" && i === 0 && "md:col-span-2",
              )}
              style={{ "--delay": `${Math.min(i, 8) * 60}ms` } as React.CSSProperties}
            >
              <Link
                href={href(item.href)}
                className={cn(
                  "group/cap flex h-full flex-col rounded-md border border-ink-800 bg-ink-950/60 p-6 transition-[border-color,background-color,translate] duration-(--duration-fast) sm:p-8",
                  "hover:-translate-y-0.5 hover:border-brand-500 hover:bg-ink-950 focus-visible:-translate-y-0.5 focus-visible:border-brand-500",
                )}
              >
                <span className="type-small font-semibold tracking-[0.12em] text-brand-300 uppercase">{item.pillar}</span>
                <span className="type-h3 mt-4 text-on-dark">{item.title}</span>
                <span className="mt-3 max-w-[34rem] text-on-dark-muted">{item.body}</span>
                <span className="mt-auto flex items-center gap-1.5 pt-6 font-semibold text-brand-300">
                  <span className="link-draw">Explore</span>
                  <ArrowUpRight
                    aria-hidden
                    strokeWidth={1.75}
                    className="size-4 transition-transform duration-(--duration-fast) group-hover/cap:translate-x-px group-hover/cap:-translate-y-px"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
