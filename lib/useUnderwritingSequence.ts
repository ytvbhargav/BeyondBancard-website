"use client";

import { useEffect, useState } from "react";

export type CheckState = "pending" | "running" | "done";

const START_DELAY = 900;
const RUN_MS = 650;
const GAP_MS = 150;
/** How long "Approved" is held before the example starts over, when looping. */
const HOLD_MS = 2600;

/**
 * S2 underwriting sequence: each check spins then completes, in order, once
 * `enabled` turns true. Reduced motion jumps straight to all checks done.
 * `replay` restarts it. Shared by the hero device and the underwriting card.
 *
 * With `loop`, the example holds on Approved and then runs again by itself, so
 * nobody has to press anything to see it happen. Reduced motion never loops:
 * it is shown approved and stays that way.
 */
export function useUnderwritingSequence(
  count: number,
  { enabled, reduce, loop = false }: { enabled: boolean; reduce: boolean; loop?: boolean },
) {
  const [sequence, setSequence] = useState<CheckState[]>(() => Array.from({ length: count }, () => "pending"));
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    if (!enabled || reduce) return;
    const timers: number[] = [];
    let at = START_DELAY;
    for (let i = 0; i < count; i++) {
      timers.push(window.setTimeout(() => setSequence((s) => s.map((v, j) => (j === i ? "running" : v))), at));
      at += RUN_MS;
      timers.push(window.setTimeout(() => setSequence((s) => s.map((v, j) => (j === i ? "done" : v))), at));
      at += GAP_MS;
    }
    if (loop) {
      timers.push(
        window.setTimeout(() => {
          setSequence(Array.from({ length: count }, () => "pending"));
          setRunId((n) => n + 1);
        }, at + HOLD_MS),
      );
    }
    return () => timers.forEach((t) => window.clearTimeout(t));
    // runId restarts the sequence, on replay or on the next turn of the loop.
  }, [enabled, reduce, count, runId, loop]);

  const states: CheckState[] = reduce && enabled ? Array.from({ length: count }, () => "done") : sequence;
  const done = states.filter((s) => s === "done").length;
  const approved = done === count;
  const running = !approved && states.some((s) => s !== "pending");

  function replay() {
    setSequence(Array.from({ length: count }, () => "pending"));
    setRunId((n) => n + 1);
  }

  return { states, done, approved, running, replay };
}
