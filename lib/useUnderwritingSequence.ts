"use client";

import { useEffect, useState } from "react";

export type CheckState = "pending" | "running" | "done";

const START_DELAY = 900;
const RUN_MS = 650;
const GAP_MS = 150;

/**
 * S2 underwriting sequence: each check spins then completes, in order, once
 * `enabled` turns true. Reduced motion jumps straight to all checks done.
 * `replay` restarts it. Shared by the hero device and the underwriting card.
 */
export function useUnderwritingSequence(count: number, { enabled, reduce }: { enabled: boolean; reduce: boolean }) {
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
    return () => timers.forEach((t) => window.clearTimeout(t));
    // runId restarts the sequence on replay.
  }, [enabled, reduce, count, runId]);

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
