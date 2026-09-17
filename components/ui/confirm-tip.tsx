"use client";

import { useEffect, useRef } from "react";

/** Gap kept between an open tooltip and the viewport edges (matches its max-width of 100vw - 2rem). */
const GUTTER = 16;

/**
 * The tooltip of a `<Confirm>` flag. It is shown by CSS (hover, tap or focus
 * within the trigger); when it opens, this nudges it sideways through
 * `--tip-shift` so it stays inside the viewport. Without the nudge, a trigger
 * near the right edge of a narrow screen opened a tooltip that made the page
 * scroll sideways.
 */
export function ConfirmTip({ className, children }: { className: string; children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tip = ref.current;
    const trigger = tip?.parentElement;
    if (!tip || !trigger) return;
    let frame = 0;

    const fit = () => {
      tip.style.removeProperty("--tip-shift");
      const b = tip.getBoundingClientRect();
      if (b.width === 0) return;
      const vw = document.documentElement.clientWidth;
      let shift = Math.min(0, vw - GUTTER - b.right);
      if (b.left + shift < GUTTER) shift = GUTTER - b.left;
      if (Math.abs(shift) >= 0.5) tip.style.setProperty("--tip-shift", `${Math.round(shift)}px`);
    };
    // The :hover style may land after the event, so measure again in the next frame (before it paints).
    const open = () => {
      fit();
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fit);
    };

    trigger.addEventListener("pointerenter", open);
    trigger.addEventListener("focusin", open);
    return () => {
      cancelAnimationFrame(frame);
      trigger.removeEventListener("pointerenter", open);
      trigger.removeEventListener("focusin", open);
    };
  }, []);

  return (
    <span ref={ref} aria-hidden className={className}>
      {children}
    </span>
  );
}
