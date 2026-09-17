"use client";

import { useEffect, useState } from "react";
import { m } from "motion/react";
import { ArrowRight, CreditCard, LayoutDashboard, ShieldCheck, TrendingUp, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { href } from "@/lib/links";
import { duration, ease, stagger } from "@/lib/motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { cn } from "@/lib/utils";
import type { Capability, Pillar } from "@/types/content";

const ORDER: Pillar[] = ["Accept", "Protect", "Grow", "Operate"];
const ICONS: Record<Pillar, LucideIcon> = { Accept: CreditCard, Protect: ShieldCheck, Grow: TrendingUp, Operate: LayoutDashboard };

/**
 * Capabilities grouped by pillar (PRD §9.4.5). Pillars are a vertical tab list
 * on large screens (arrow keys move between them) and a scrolling pill row on
 * small screens; tools are listed as rows so one or many read equally well.
 */
export function CapabilityTabs({ title, items }: { title: string; items: Capability[] }) {
  const pillars = ORDER.filter((p) => items.some((i) => i.pillar === p));
  const [value, setValue] = useState<string>(pillars[0]);
  const [touched, setTouched] = useState(false);
  const reduce = useReducedMotionSafe();
  // The list is vertical from lg, so arrow keys and aria-orientation follow the layout (horizontal before hydration).
  const [vertical, setVertical] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 64rem)");
    const update = () => setVertical(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <Section tone="surface" aria-labelledby="capabilities-title">
      <SectionHeader id="capabilities-title" title={title} className="md:mb-12" />
      <Tabs
        value={value}
        onValueChange={(v) => {
          setTouched(true);
          setValue(v);
        }}
        orientation={vertical ? "vertical" : "horizontal"}
        className="grid gap-8 lg:grid-cols-12"
      >
        <TabsList
          aria-label="Capabilities by pillar"
          className="-mx-5 -my-1 flex gap-2 overflow-x-auto px-5 py-1 sm:-mx-6 sm:px-6 lg:col-span-4 lg:mx-0 lg:my-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-line lg:px-0 lg:py-0"
        >
          {pillars.map((p) => {
            const Icon = ICONS[p];
            const count = items.filter((i) => i.pillar === p).length;
            return (
              <TabsTrigger
                key={p}
                value={p}
                className={cn(
                  "group/tab flex shrink-0 items-center gap-3 rounded-pill border border-line px-5 text-left transition-colors duration-(--duration-fast)",
                  "h-11 data-[state=active]:border-ink-900 data-[state=active]:bg-ink-900 data-[state=active]:text-on-dark",
                  "lg:h-auto lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:px-0 lg:py-5",
                  "lg:data-[state=active]:bg-transparent lg:data-[state=active]:text-ink-900",
                )}
              >
                <span
                  aria-hidden
                  className="hidden size-11 place-items-center rounded-sm border border-line-strong text-ink-900 transition-colors duration-(--duration-base) group-data-[state=active]/tab:border-brand-600 group-data-[state=active]/tab:bg-brand-600 group-data-[state=active]/tab:text-white lg:grid"
                >
                  <Icon strokeWidth={1.75} className="size-5" />
                </span>
                <span className="font-medium lg:type-h4">{p}</span>
                <span className="type-small hidden text-muted lg:ml-auto lg:inline">
                  {count} {count === 1 ? "tool" : "tools"}
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {pillars.map((p) => (
          <TabsContent key={p} value={p} className="lg:col-span-7 lg:col-start-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-focus)">
            <ul className="border-t border-line">
              {items
                .filter((i) => i.pillar === p)
                .map((c, idx) => (
                  <m.li
                    key={c.title}
                    className="border-b border-line"
                    initial={touched && !reduce ? { opacity: 0, x: 16 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: duration.base, ease: ease.out, delay: idx * stagger.base }}
                  >
                    <Link
                      href={href(c.href)}
                      className="group/cap flex items-start justify-between gap-6 py-7 transition-colors duration-(--duration-fast)"
                    >
                      <span>
                        <span className="type-h3 block group-hover/cap:text-brand-700">{c.title}</span>
                        <span className="mt-2 block max-w-[32rem] text-muted">{c.body}</span>
                      </span>
                      <span
                        aria-hidden
                        className="mt-1 grid size-10 shrink-0 place-items-center rounded-pill border border-line text-ink-900 transition-[background-color,border-color,color] duration-(--duration-fast) group-hover/cap:border-brand-600 group-hover/cap:bg-brand-600 group-hover/cap:text-white"
                      >
                        <ArrowRight strokeWidth={1.75} className="size-4" />
                      </span>
                    </Link>
                  </m.li>
                ))}
            </ul>
          </TabsContent>
        ))}
      </Tabs>
    </Section>
  );
}
