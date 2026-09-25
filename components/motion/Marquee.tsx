"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Slow infinite horizontal scroll (S3). The duplicate copy is aria-hidden,
 * hover or focus pauses it, and a visible toggle lets anyone stop the motion
 * (WCAG 2.2.2). Reduced motion shows a static, wrapping list instead.
 */
export function Marquee({
  items,
  label,
  className,
  tone = "light",
}: {
  items: React.ReactNode[];
  label: string;
  className?: string;
  /** Dark surfaces need the pause control inverted, or it reads as a hole. */
  tone?: "light" | "dark";
}) {
  const [paused, setPaused] = useState(false);

  const list = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className={cn("flex shrink-0 items-center gap-12 pr-12 md:gap-16 md:pr-16", hidden && "marquee-dup")}
    >
      {items.map((item, i) => (
        <li key={i} className="shrink-0">
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("marquee flex min-w-0 items-center gap-2", className)}>
      <div
        className="relative min-w-0 flex-1 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        role="region"
        aria-label={label}
      >
        <div className={cn("marquee-track flex w-max", paused && "[animation-play-state:paused]")}>
          {list(false)}
          {list(true)}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        className={cn(
          "marquee-toggle grid size-11 shrink-0 place-items-center rounded-pill transition-colors",
          tone === "dark"
            ? "text-on-dark-muted hover:bg-white/10 hover:text-on-dark"
            : "text-muted hover:bg-paper hover:text-ink-900",
        )}
      >
        {paused ? <Play aria-hidden strokeWidth={1.75} className="size-4" /> : <Pause aria-hidden strokeWidth={1.75} className="size-4" />}
        <span className="sr-only">{paused ? "Play scrolling list" : "Pause scrolling list"}</span>
      </button>
    </div>
  );
}
