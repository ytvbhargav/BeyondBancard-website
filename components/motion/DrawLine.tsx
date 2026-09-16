"use client";

import { m } from "motion/react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

/**
 * A straight connector that draws itself once in view (SVG pathLength).
 * Horizontal or vertical; stretches to fill its box.
 */
export function DrawLine({
  orientation = "horizontal",
  delay = 0,
  duration = 0.6,
  className,
  play,
}: {
  orientation?: "horizontal" | "vertical";
  delay?: number;
  duration?: number;
  className?: string;
  /** When provided, drawing is controlled by the parent instead of viewport. */
  play?: boolean;
}) {
  const reduce = useReducedMotionSafe();
  const d = orientation === "horizontal" ? "M0 1 L100 1" : "M1 0 L1 100";
  // No non-scaling-stroke: it would measure pathLength dashes in screen pixels.
  // The viewBox's thin axis maps 1:1 to the element, so stroke width stays 2px.
  const common = { d, fill: "none", strokeWidth: 2 };
  const target = { pathLength: 1 };
  return (
    <svg
      aria-hidden
      className={className}
      viewBox={orientation === "horizontal" ? "0 0 100 2" : "0 0 2 100"}
      preserveAspectRatio="none"
    >
      <path {...common} stroke="var(--color-line-strong)" />
      <m.path
        {...common}
        stroke="var(--color-brand-600)"
        initial={{ pathLength: reduce ? 1 : 0 }}
        {...(play === undefined
          ? { whileInView: target, viewport: { once: true, amount: 0.6 } }
          : { animate: play ? target : { pathLength: reduce ? 1 : 0 } })}
        transition={reduce ? { duration: 0 } : { delay, duration, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}
