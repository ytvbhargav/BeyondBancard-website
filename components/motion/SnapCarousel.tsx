"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Swipe carousel built on native scroll snapping (no animation library).
 * Below `breakpoint` the track scrolls horizontally with dots and arrows;
 * at and above it the track takes whatever layout `trackClassName` gives it
 * (grid, stack) and the controls hide.
 */
export function SnapCarousel({
  label,
  children,
  trackClassName,
  itemClassName,
  breakpoint = "lg",
  tone = "light",
  stagger = false,
}: {
  label: string;
  children: React.ReactNode;
  trackClassName?: string;
  itemClassName?: string;
  breakpoint?: "sm" | "md" | "lg";
  tone?: "light" | "dark";
  stagger?: boolean;
}) {
  const items = Children.toArray(children);
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { root: track, threshold: 0.6 },
    );
    track.querySelectorAll(":scope > li").forEach((li) => io.observe(li));
    return () => io.disconnect();
  }, [items.length]);

  const go = useCallback((index: number) => {
    const track = trackRef.current;
    const target = track?.children[index] as HTMLElement | undefined;
    if (!track || !target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // phone pass (D-063): aim at the snap point itself, which sits the track's scroll padding before the card
    // (20px on phones, 0 from sm up), so arrows don't depend on the browser re-snapping.
    const pad = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
    track.scrollTo({ left: target.offsetLeft - track.offsetLeft - pad, behavior: reduce ? "auto" : "smooth" });
  }, []);

  const hide = { sm: "sm:hidden", md: "md:hidden", lg: "lg:hidden" }[breakpoint];
  const dark = tone === "dark";

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={trackRef}
        data-lenis-prevent-touch
        {...(stagger ? { "data-stagger": "" } : {})}
        className={cn(
          // phone pass (D-063): scroll-px-5 matches the px-5 gutter, so a snapped card rests on the 20px gutter
          // instead of flush at x=0 (the first snap point becomes scrollLeft 0). sm:scroll-px-0 keeps today's 0.
          "-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto scroll-smooth px-5 pb-2 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-0 sm:px-6 [&::-webkit-scrollbar]:hidden",
          trackClassName,
        )}
      >
        {items.map((child, i) => (
          <li
            key={i}
            data-index={i}
            {...(stagger ? { "data-stagger-item": "" } : {})}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
            style={{ "--stack-i": i } as React.CSSProperties}
            className={cn("w-[86%] shrink-0 snap-start", itemClassName)}
          >
            {child}
          </li>
        ))}
      </ul>

      <div className={cn("mt-6 flex items-center justify-between", hide)}>
        <div className="flex gap-2" aria-hidden>
          {items.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-pill transition-[width,background-color] duration-(--duration-base) ease-out",
                i === active ? "w-6" : "w-1.5",
                i === active ? (dark ? "bg-on-dark" : "bg-ink-900") : dark ? "bg-ink-700" : "bg-line-strong",
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          {[
            { dir: -1, Icon: ChevronLeft, name: "Previous" },
            { dir: 1, Icon: ChevronRight, name: "Next" },
          ].map(({ dir, Icon, name }) => {
            const disabled = dir < 0 ? active === 0 : active === items.length - 1;
            return (
              <button
                key={name}
                type="button"
                onClick={() => go(Math.min(Math.max(active + dir, 0), items.length - 1))}
                disabled={disabled}
                aria-label={`${name} slide`}
                className={cn(
                  "grid size-11 place-items-center rounded-pill border transition-colors duration-(--duration-fast) disabled:opacity-40",
                  dark ? "border-ink-700 text-on-dark hover:border-brand-300" : "border-line bg-surface text-ink-900 hover:border-brand-600",
                )}
              >
                <Icon aria-hidden strokeWidth={1.75} className="size-5" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
