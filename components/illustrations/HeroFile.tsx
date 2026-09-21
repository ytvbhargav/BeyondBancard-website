"use client";

import { useEffect, useRef, useState } from "react";
import { m, useInView } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { duration, ease } from "@/lib/motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import type { HeroFileContent } from "@/types/content";

type StepState = NonNullable<HeroFileContent["steps"]>[number]["state"];

const stateText: Record<StepState, string> = {
  done: "complete",
  active: "in progress",
  pending: "not started",
};

/** Seconds from the end of the hero entrance to the first tick. */
const FIRST_TICK = duration.fast;
/** Seconds between ticks, as on the risk checklist (S7). */
const TICK_GAP = 0.22;

const statCols = ["grid-cols-1", "grid-cols-2", "grid-cols-3"];

/**
 * Solution page hero illustration (D-058) in the underwriting-file style
 * (UnderwritingCard, D-001): a white panel with a title and its Example or
 * Illustration tag, then whichever parts the live mock card has, in this
 * order: amount, method chips, label/value rows, stats, steps on a paper band
 * and the status pill. Done steps tick in one by one once the panel is in the
 * viewport and its entrance has finished, then the active step pulses twice;
 * reduced motion shows the final state.
 */
export function HeroFile({ title, subtitle, tag, status, amount, methods, fields, stats, steps }: HeroFileContent) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotionSafe();
  const [entered, setEntered] = useState(false);
  const on = entered || reduce;

  useEffect(() => {
    if (!inView) return;
    // Wait for PageHero's entrance (anim-rise-card, 200ms delay + 700ms) so no tick lands while the
    // card still slides in. Scrolled into view later, it has long finished and the ticks start at once.
    const entrance = ref.current?.closest(".anim-rise-card")?.getAnimations() ?? [];
    let live = true;
    void Promise.allSettled(entrance.map((a) => a.finished)).then(() => {
      if (live) setEntered(true);
    });
    return () => {
      live = false;
    };
  }, [inView]);

  const hasMethods = Boolean(methods && methods.length > 0);
  // Three columns at most; more would wrap and leave empty grid cells.
  const shownStats = stats?.slice(0, 3) ?? [];
  // The active step reacts once the last done step has ticked.
  const settled = FIRST_TICK + (steps?.filter((s) => s.state === "done").length ?? 0) * TICK_GAP;

  return (
    <figure
      ref={ref}
      aria-label={`${tag}: ${title}`}
      className="w-full overflow-hidden rounded-md bg-surface text-ink-900 shadow-float"
    >
      <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-4 sm:px-6">
        <div className="min-w-0">
          <p className="type-h4">{title}</p>
          {subtitle && <p className="type-small mt-0.5 text-muted">{subtitle}</p>}
        </div>
        <Badge status="illustration" icon={false}>
          {tag}
        </Badge>
      </div>

      {(amount || hasMethods) && (
        <div className="border-t border-line px-5 py-5 sm:px-6">
          {amount &&
            (amount.label ? (
              <dl>
                <dt className="type-small text-muted">{amount.label}</dt>
                <dd className="type-h2 tabular mt-1">{amount.value}</dd>
              </dl>
            ) : (
              // Some live cards show the figure alone; no label is drafted for it (C6).
              <p className="type-h2 tabular">{amount.value}</p>
            ))}
          {methods && hasMethods && (
            <ul className={cn("flex flex-wrap gap-1.5", amount && "mt-4")}>
              {methods.map((method) => (
                <li
                  key={method}
                  className="inline-flex h-7 items-center rounded-pill border border-line bg-paper px-2.5 text-[0.8125rem] font-medium whitespace-nowrap"
                >
                  {method}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {fields && fields.length > 0 && (
        <dl className="border-t border-line px-5 py-1.5 sm:px-6">
          {fields.map((f) => (
            <div key={f.label} className="flex items-baseline justify-between gap-4 border-t border-line py-2.5 first:border-t-0">
              <dt className="type-small text-muted">{f.label}</dt>
              <dd className="tabular text-right text-[0.9375rem] font-medium">{f.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {shownStats.length > 0 && (
        // Hairlines between the columns are the 1px gaps over the line colour. Padding and figure size
        // follow the panel's own width (it is 280px on a 320px screen, 375px beside the copy at 1024px),
        // and long words wrap inside their cell rather than run under the next one.
        <dl className={cn("@container grid gap-px border-t border-line bg-line", statCols[shownStats.length - 1])}>
          {shownStats.map((s) => (
            <div key={s.label} className="flex min-w-0 flex-col gap-1 bg-surface px-2.5 py-4 @[24rem]:px-5">
              <dt className="type-small hyphens-auto text-muted wrap-break-word">{s.label}</dt>
              <dd className="type-h4 tabular order-first wrap-anywhere @[27rem]:type-h3">{s.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {steps && steps.length > 0 && (
        <ol className="border-t border-line bg-paper px-5 py-3 sm:px-6">
          {steps.map((s, i) => {
            // Done steps tick in their own order; others wait for the last tick.
            const delay = FIRST_TICK + steps.slice(0, i).filter((p) => p.state === "done").length * TICK_GAP;
            return (
              <li key={s.label} className="relative flex items-start gap-3 py-2">
                {i < steps.length - 1 && (
                  // Rail to the next step; it fills in green once this step is done.
                  <span aria-hidden className="absolute top-8 -bottom-2 left-3 w-0.5 -translate-x-1/2 overflow-hidden rounded-pill bg-line">
                    {s.state === "done" && (
                      <m.span
                        className="block h-full origin-top bg-success-600"
                        initial={false}
                        animate={{ scaleY: on ? 1 : 0 }}
                        transition={reduce ? { duration: 0 } : { delay: delay + duration.fast, duration: duration.base, ease: ease.out }}
                      />
                    )}
                  </span>
                )}
                <StepMark state={s.state} on={on} reduce={reduce} delay={s.state === "done" ? delay : settled} />
                <span
                  className={cn(
                    "text-[0.9375rem] leading-6",
                    s.state === "pending" ? "text-muted" : "text-ink-900",
                    s.state === "active" && "font-medium",
                  )}
                >
                  {s.label}
                  <span className="sr-only">, {stateText[s.state]}</span>
                </span>
              </li>
            );
          })}
        </ol>
      )}

      {status && (
        // Static pill: the approved pulse ring animates box-shadow, which rule 3 (transform/opacity) rules out.
        <div className="flex min-h-16 items-center border-t border-line px-5 py-3 sm:px-6">
          <Badge status={status.tone}>{status.label}</Badge>
        </div>
      )}
    </figure>
  );
}

/**
 * Step marker, one 24px mark for every state so the rail lines up: done is a
 * green disc whose check draws in (ChecklistSection), active a brand ring whose
 * dot pulses in opacity, pending a dashed circle. State is also in sr-only text.
 */
function StepMark({ state, on, reduce, delay }: { state: StepState; on: boolean; reduce: boolean; delay: number }) {
  return (
    <svg viewBox="0 0 24 24" className="size-6 shrink-0" aria-hidden>
      {state === "pending" && (
        // Eight even dashes: the circumference (2π × 10.25 ≈ 64.4) over 16.
        <circle cx="12" cy="12" r="10.25" fill="none" stroke="var(--color-line-strong)" strokeWidth="1.5" strokeDasharray="4.025" />
      )}
      {state === "active" && (
        <>
          <circle cx="12" cy="12" r="10.25" fill="var(--color-surface)" stroke="var(--color-brand-600)" strokeWidth="1.5" />
          <m.circle
            cx="12"
            cy="12"
            r="4.5"
            fill="var(--color-brand-600)"
            initial={false}
            animate={{ opacity: on && !reduce ? [1, 0.3, 1] : 1 }}
            transition={reduce ? { duration: 0 } : { delay, duration: duration.xslow * 2, repeat: 1, ease: ease.inOut }}
          />
        </>
      )}
      {state === "done" && (
        <>
          <circle cx="12" cy="12" r="10.25" fill="var(--color-surface)" stroke="var(--color-line-strong)" strokeWidth="1.5" />
          <m.circle
            cx="12"
            cy="12"
            r="11"
            fill="var(--color-success-600)"
            initial={false}
            animate={{ scale: on ? 1 : 0.4, opacity: on ? 1 : 0 }}
            transition={reduce ? { duration: 0 } : { delay, ...ease.spring }}
            style={{ transformOrigin: "12px 12px" }}
          />
          <m.path
            d="M7.25 12.4l3.1 3.1 6.4-6.6"
            fill="none"
            stroke="var(--color-surface)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{ pathLength: on ? 1 : 0 }}
            transition={reduce ? { duration: 0 } : { delay: delay + duration.instant, duration: duration.base, ease: ease.out }}
          />
        </>
      )}
    </svg>
  );
}
