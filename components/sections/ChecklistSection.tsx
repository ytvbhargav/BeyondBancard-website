"use client";

import { useRef } from "react";
import { m, useInView } from "motion/react";
import { Section } from "@/components/ui/section";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

/**
 * Risk and health checklist (S7): items tick one by one as the panel enters
 * the viewport. Reduced motion shows every item ticked. An odd last item spans
 * both columns from sm, so the panel never ends on a half-empty row (D-058).
 */
export function ChecklistSection({ title, lead, items }: { title: string; lead?: string; items: string[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotionSafe();
  const on = inView || reduce;

  return (
    <Section tone="paper" aria-labelledby="checklist-title">
      {/* Phone-only density pass (D-060): 32px between the heading block and the
          panel below sm, restored to today's 48px from sm up. lg:gap-8 is unchanged. */}
      <div className="grid gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 id="checklist-title" className="type-h2">
            {title}
          </h2>
          {lead && <p className="type-body-lg mt-5 max-w-[28rem] text-muted">{lead}</p>}
        </div>
        <ul ref={ref} className="grid overflow-hidden rounded-md border border-line bg-surface sm:grid-cols-2 lg:col-span-7">
          {items.map((item, i) => {
            const delay = reduce ? 0 : 0.25 + i * 0.22;
            return (
              <li
                key={item}
                // Phone-only density pass (D-060): 56px rows and tighter padding below sm,
                // restored to the 80px row and px-6 py-5 from sm up.
                className="flex min-h-14 items-center gap-3 border-line px-4 py-3 not-first:border-t sm:min-h-20 sm:gap-4 sm:px-6 sm:py-5 sm:nth-2:border-t-0 sm:even:border-l sm:odd:last:col-span-2"
              >
                <svg viewBox="0 0 28 28" className="size-7 shrink-0" aria-hidden>
                  <circle cx="14" cy="14" r="13" fill="none" stroke="var(--color-line-strong)" strokeWidth="1.5" />
                  <m.circle
                    cx="14"
                    cy="14"
                    r="13"
                    fill="var(--color-success-600)"
                    initial={false}
                    animate={{ scale: on ? 1 : 0.4, opacity: on ? 1 : 0 }}
                    transition={reduce ? { duration: 0 } : { delay, type: "spring", stiffness: 420, damping: 28 }}
                    style={{ transformOrigin: "14px 14px" }}
                  />
                  <m.path
                    d="M8.5 14.5l3.6 3.6 7.4-7.6"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={false}
                    animate={{ pathLength: on ? 1 : 0 }}
                    transition={reduce ? { duration: 0 } : { delay: delay + 0.12, duration: 0.3, ease: "easeOut" }}
                  />
                </svg>
                <span className="text-ink-900">{item}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
