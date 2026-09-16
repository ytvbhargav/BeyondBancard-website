"use client";

import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Confirm } from "@/components/ui/confirm";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { duration, ease } from "@/lib/motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types/content";

function Attribution({ t, dark }: { t: Testimonial; dark?: boolean }) {
  return (
    <figcaption className="type-small mt-6">
      <span className={cn("block font-semibold", dark ? "text-on-dark" : "text-ink-900")}>{t.name}</span>
      <span className="block text-muted">
        {t.role}, {t.company}
      </span>
    </figcaption>
  );
}

/**
 * Testimonials (PRD §9.1.7). Desktop: featured quote plus three supporting
 * quotes. Mobile: one quote at a time with a crossfade.
 */
export function Testimonials({ title, items, note }: { title: string; items: Testimonial[]; note: string }) {
  const [featured, ...rest] = items;
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotionSafe();
  const go = (d: number) => setIndex((i) => (i + d + items.length) % items.length);

  return (
    <Section tone="paper" aria-labelledby="testimonials-title">
      <SectionHeader id="testimonials-title" title={title} />
      <Confirm note={note} as="div">
        {/* Desktop and tablet */}
        <div className="hidden md:block">
          <figure className="grid gap-8 lg:grid-cols-12">
            <span aria-hidden className="font-display text-[5rem] leading-[0.7] font-extrabold text-brand-600 lg:col-span-1">
              “
            </span>
            <div className="lg:col-span-10">
              <blockquote className="font-display text-[1.625rem] leading-[1.35] font-semibold tracking-[-0.01em] text-ink-900 [font-stretch:104%] lg:text-[1.875rem]">
                <p>{featured.quote}</p>
              </blockquote>
              <Attribution t={featured} />
            </div>
          </figure>
          <Stagger as="ul" className="mt-16 grid gap-8 border-t border-line pt-10 md:grid-cols-3">
            {rest.map((t) => (
              <StaggerItem as="li" key={t.name}>
                <figure>
                  <blockquote className="text-ink-900">
                    <p>“{t.quote}”</p>
                  </blockquote>
                  <Attribution t={t} />
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden" role="group" aria-roledescription="carousel" aria-label="Merchant testimonials">
          <div className="relative grid min-h-[22rem]" aria-live="polite">
            <AnimatePresence initial={false} mode="popLayout">
              <m.figure
                key={index}
                className="col-start-1 row-start-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : duration.base, ease: ease.out }}
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${items.length}`}
              >
                <span aria-hidden className="block font-display text-[3.5rem] leading-[0.6] font-extrabold text-brand-600">
                  “
                </span>
                <blockquote className="mt-4 font-display text-[1.25rem] leading-[1.4] font-semibold text-ink-900 [font-stretch:104%]">
                  <p>{items[index].quote}</p>
                </blockquote>
                <Attribution t={items[index]} />
              </m.figure>
            </AnimatePresence>
          </div>
          <div className="mt-8 flex items-center justify-between border-t border-line pt-4">
            <p className="type-small tabular text-muted" aria-hidden>
              {index + 1} / {items.length}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                className="grid size-11 place-items-center rounded-pill border border-line bg-surface text-ink-900 hover:border-brand-600"
                aria-label="Previous testimonial"
              >
                <ChevronLeft aria-hidden strokeWidth={1.75} className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="grid size-11 place-items-center rounded-pill border border-line bg-surface text-ink-900 hover:border-brand-600"
                aria-label="Next testimonial"
              >
                <ChevronRight aria-hidden strokeWidth={1.75} className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </Confirm>
    </Section>
  );
}
