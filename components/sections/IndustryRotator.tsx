"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * The industries, one after another. It is what makes the headline mean
 * something: the breadth of what Beyond processes. The headline has already
 * said "says yes", so this does not say it again — the list alone finishes the
 * sentence.
 *
 * Every industry is in the markup, stacked in one grid cell so the box is as
 * wide as the longest name whichever one is showing. That is deliberate: a box
 * that resized with each word would shove "Says yes to" left and right every
 * couple of seconds, and the line would never sit still.
 *
 * A screen reader is given the whole list once, in a sentence, and is never
 * told about the cycling. Without JavaScript the first industry simply stands
 * there, because the visible one is chosen at render rather than switched on
 * afterwards — and with reduced motion the cycle never starts, so it stands
 * there too.
 */
export function IndustryRotator({
  industries,
  className,
  style,
}: {
  industries: string[];
  className?: string;
  style?: React.CSSProperties;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % industries.length), 2400);
    return () => clearInterval(timer);
  }, [industries.length]);

  return (
    <p style={style} className={cn("flex justify-center", className)}>
      {/* The list once, for anyone not watching it turn */}
      <span className="sr-only">{industries.join(", ")}.</span>

      <span aria-hidden className="grid">
        {industries.map((industry, i) => (
          <span
            key={industry}
            className={cn(
              "col-start-1 row-start-1 whitespace-nowrap text-on-dark transition-[opacity,transform] ease-(--ease-out)",
              i === index
                ? "translate-y-0 opacity-100 delay-150 duration-(--duration-base)"
                : "-translate-y-[0.14em] opacity-0 duration-(--duration-fast)",
            )}
          >
            {industry}
          </span>
        ))}
      </span>
    </p>
  );
}
