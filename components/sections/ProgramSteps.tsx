"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { Section, SectionHeader } from "@/components/ui/section";
import { DrawLine } from "@/components/motion/DrawLine";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { cn } from "@/lib/utils";
import type { Step } from "@/types/content";

const STEP_GAP = 0.55;

/**
 * Partner program steps (S8). Numbered because it is a real sequence. The
 * connector between steps draws in order as the row enters the viewport:
 * horizontal on large screens, vertical on small.
 */
export function ProgramSteps({ title, steps }: { title: string; steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotionSafe();
  const on = inView || reduce;

  return (
    <Section tone="paper" aria-labelledby="program-title">
      <SectionHeader id="program-title" title={title} />
      <ol ref={ref} className="grid gap-0 lg:grid-cols-4 lg:gap-6">
        {steps.map((s, i) => {
          const last = i === steps.length - 1;
          const delay = reduce ? 0 : i * STEP_GAP;
          return (
            <li key={s.title} className="relative flex gap-5 pb-10 last:pb-0 lg:block lg:pb-0">
              <div className="flex flex-col items-center lg:flex-row">
                <span
                  aria-hidden
                  style={{ transitionDelay: `${delay}s` }}
                  className={cn(
                    "relative z-10 grid size-12 shrink-0 place-items-center rounded-pill border font-display text-[1.0625rem] font-bold tabular [font-stretch:108%]",
                    "transition-[transform,background-color,border-color,color] duration-300 ease-out",
                    on ? "scale-100 border-brand-600 bg-brand-600 text-white" : "scale-90 border-line-strong bg-surface text-ink-900",
                  )}
                >
                  {i + 1}
                </span>
                {!last && (
                  <>
                    <DrawLine
                      orientation="horizontal"
                      play={on}
                      delay={delay + 0.2}
                      duration={0.45}
                      className="ml-4 hidden h-0.5 flex-1 lg:block"
                    />
                    {/* phone pass (D-063): below sm the line no longer sets the step height. flex: 1's 0% basis
                        falls back to the SVG's 100px viewBox height while the column is measured, and min-height:
                        auto holds it there, so basis-0 and min-h-0 let it shrink to the text. -mb-7 carries it
                        28px into the li's pb-10, stopping 12px short of the next number, like its mt-3 at the top.
                        sm:flex-1 sm:min-h-auto sm:mb-0 restore today's values; lg:hidden unchanged. */}
                    <DrawLine
                      orientation="vertical"
                      play={on}
                      delay={delay + 0.2}
                      duration={0.45}
                      className="mt-3 -mb-7 min-h-0 w-0.5 grow basis-0 sm:mb-0 sm:min-h-auto sm:flex-1 lg:hidden"
                    />
                  </>
                )}
              </div>
              <div className={cn("pt-2.5 lg:pt-6 lg:pr-6")}>
                <h3 className="type-h4">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="mt-2 max-w-[22rem] text-muted">{s.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
