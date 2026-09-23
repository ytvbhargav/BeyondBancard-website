"use client";

import { useEffect, useRef } from "react";
import { m } from "motion/react";
import { Button } from "@/components/ui/button";
import { apply } from "@/content/apply";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

/** Submission confirmation with a drawn checkmark (S9). Receives focus on mount. */
export function SuccessPanel({ firstName }: { firstName: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotionSafe();

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const draw = (delay: number, d = 0.5) =>
    reduce ? { duration: 0 } : { delay, duration: d, ease: [0.65, 0, 0.35, 1] as const };

  return (
    <m.div
      className="rounded-lg border border-line bg-surface px-6 py-10 sm:px-10 sm:py-12"
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
      role="status"
    >
      <svg viewBox="0 0 64 64" className="size-16" aria-hidden>
        <m.circle
          cx="32"
          cy="32"
          r="29"
          fill="none"
          stroke="var(--color-success-600)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={draw(0.1, 0.6)}
          style={{ rotate: -90, transformOrigin: "32px 32px" }}
        />
        <m.path
          d="M20 33l8 8 16-17"
          fill="none"
          stroke="var(--color-success-600)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={draw(0.6, 0.35)}
        />
      </svg>

      <h2 ref={ref} tabIndex={-1} className="mt-8 max-w-[22ch] type-h2 outline-none">
        {apply.success.title(firstName)}
      </h2>

      <div className="mt-10 border-t border-line pt-8">
        <h3 className="type-h4">{apply.success.nextTitle}</h3>
        <ol className="mt-5 grid gap-6 sm:grid-cols-3">
          {apply.success.next.map((s, i) => (
            <li key={s.title}>
              <span
                aria-hidden
                className="grid size-8 place-items-center rounded-pill border border-line-strong font-display text-[0.875rem] font-bold tabular"
              >
                {i + 1}
              </span>
              <p className="mt-3 font-semibold">
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </p>
              <p className="mt-1 type-small text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button href="/" variant="secondary">
          Back to home
        </Button>
      </div>
    </m.div>
  );
}
