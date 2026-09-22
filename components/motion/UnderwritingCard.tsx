"use client";

import { useRef } from "react";
import { AnimatePresence, m, useInView } from "motion/react";
import { Check, CircleDashed, LoaderCircle, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { duration, ease } from "@/lib/motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useUnderwritingSequence, type CheckState } from "@/lib/useUnderwritingSequence";

export type UnderwritingCardProps = {
  label: string;
  title: string;
  industry: string;
  fields: { label: string; value: string }[];
  checks: string[];
  /** "sequence" runs the S2 animation once; "static" renders a fixed in-review state. */
  mode?: "sequence" | "static";
  /** For static mode: how many checks are already complete. */
  completed?: number;
  className?: string;
};

export function UnderwritingCard({
  label,
  title,
  industry,
  fields,
  checks,
  mode = "sequence",
  completed = 2,
  className,
}: UnderwritingCardProps) {
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const seq = useUnderwritingSequence(checks.length, { enabled: mode === "sequence" && inView, reduce });

  // Static cards show a fixed in-review state; sequence cards follow the hook.
  const states: CheckState[] =
    mode === "static" ? checks.map((_, i) => (i < completed ? "done" : "pending")) : seq.states;

  const doneCount = states.filter((s) => s === "done").length;
  const approved = mode === "sequence" && seq.approved;
  const running = mode === "sequence" && seq.running;
  const replay = seq.replay;

  const statusText = mode === "static" ? "In review" : approved ? "Approved" : "Underwriting in progress";

  return (
    <div
      ref={ref}
      className={cn("relative w-full rounded-md bg-surface text-ink-900 shadow-float", className)}
    >
      {/* Wraps rather than squeezing: when title and badge can't share a row (phones, lg's
          narrow column) the badge drops under the industry line, never above the title (D-003). */}
      {/* Phone-only density pass (D-060): tighter padding and wrap gap below sm; sm and up unchanged. */}
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 px-4 pt-4 pb-3 sm:gap-y-3 sm:px-6 sm:pt-5 sm:pb-4">
        <div>
          <p className="type-h4">{title}</p>
          <p className="type-small mt-0.5 text-muted">{industry}</p>
        </div>
        <Badge status="illustration" icon={false}>
          {label}
        </Badge>
      </div>

      {/* Phone-only density pass (D-060): 40px rows on phones (44px from sm up), with the list's own
          inset kept at 4px so the outer gap stays in step with the 16px between rows, as on HeroFile. */}
      <dl className="border-t border-line px-4 py-1 sm:px-6 sm:py-1.5">
        {fields.map((f) => (
          <div key={f.label} className="flex items-baseline justify-between gap-4 border-t border-line py-2 first:border-t-0 sm:py-2.5">
            <dt className="type-small text-muted">{f.label}</dt>
            <dd className="tabular text-right text-[0.9375rem] font-medium">{f.value}</dd>
          </div>
        ))}
      </dl>

      {/* Phone-only density pass (D-060): tighter band padding, progress gap and check rows below sm. */}
      <div className="border-t border-line bg-paper px-4 pt-3 pb-2 sm:px-6 sm:pt-4 sm:pb-3">
        <div className="flex items-baseline justify-between">
          <p className="type-small font-medium">Underwriting checks</p>
          <p className="type-small tabular text-muted" aria-hidden>
            {doneCount} of {checks.length}
          </p>
        </div>
        <div aria-hidden className="mt-2 h-1 overflow-hidden rounded-pill bg-line sm:mt-3">
          <div
            className={cn(
              "h-full origin-left rounded-pill transition-[transform,background-color] duration-(--duration-base) ease-out",
              approved ? "bg-success-600" : "bg-brand-600",
            )}
            style={{ transform: `scaleX(${doneCount / checks.length})` }}
          />
        </div>
        <ul className="mt-1 sm:mt-2">
          {checks.map((c, i) => (
            <li key={c} className="flex min-h-9 items-center gap-2.5 sm:min-h-10 sm:gap-3">
              <CheckIcon state={states[i]} reduce={reduce} />
              <span className={cn("text-[0.9375rem]", states[i] === "pending" ? "text-muted" : "text-ink-900")}>{c}</span>
              <span className="sr-only">
                {states[i] === "done" ? "complete" : states[i] === "running" ? "in progress" : "not started"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Phone-only density pass (D-060): a 48px footer band on phones as on HeroFile, the old 64px from
          sm up; in sequence mode the Replay button's own min-h-11 still sets the row's 44px tap target. */}
      <div className="flex min-h-12 items-center justify-between gap-3 rounded-b-md border-t border-line px-4 py-2 sm:min-h-16 sm:px-6 sm:py-3">
        <div className="relative" aria-live="polite" aria-atomic="true">
          <AnimatePresence mode="popLayout" initial={false}>
            <m.span
              key={statusText}
              className="relative inline-flex"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: reduce ? 0 : duration.base, ease: ease.out }}
            >
              <Badge status={approved ? "approved" : "review"} className={cn(approved && !reduce && "approved-pulse")}>
                {statusText}
              </Badge>
            </m.span>
          </AnimatePresence>
        </div>
        {mode === "sequence" && (
          <button
            type="button"
            onClick={replay}
            disabled={running}
            className={cn(
              "inline-flex min-h-11 items-center gap-1.5 rounded-pill px-3 text-[0.875rem] font-semibold text-brand-700 transition-[opacity,background-color] duration-(--duration-fast) hover:bg-brand-50",
              running ? "pointer-events-none opacity-0" : "opacity-100",
            )}
            aria-label="Replay the underwriting example"
          >
            <RotateCcw aria-hidden strokeWidth={2} className="size-4" />
            Replay
          </button>
        )}
      </div>
    </div>
  );
}

function CheckIcon({ state, reduce }: { state: CheckState; reduce: boolean }) {
  return (
    <span aria-hidden className="relative grid size-6 shrink-0 place-items-center">
      <AnimatePresence mode="wait" initial={false}>
        {state === "pending" && (
          <m.span key="p" exit={{ opacity: 0 }} transition={{ duration: 0.12 }} className="grid place-items-center">
            <CircleDashed strokeWidth={1.75} className="size-5 text-line-strong" />
          </m.span>
        )}
        {state === "running" && (
          <m.span
            key="r"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="grid place-items-center"
          >
            <LoaderCircle strokeWidth={2} className={cn("size-5 text-brand-600", !reduce && "animate-spin")} />
          </m.span>
        )}
        {state === "done" && (
          <m.span
            key="d"
            initial={reduce ? false : { scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={reduce ? { duration: 0 } : ease.spring}
            className="grid size-5 place-items-center rounded-pill bg-success-600 text-white"
          >
            <Check strokeWidth={3} className="size-3" />
          </m.span>
        )}
      </AnimatePresence>
    </span>
  );
}
