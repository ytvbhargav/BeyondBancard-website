"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Swipe carousel built on native scroll snapping (no animation library).
 * Below `breakpoint` the track scrolls horizontally with dots and arrows;
 * at and above it the track takes whatever layout `trackClassName` gives it
 * (grid, stack) and the controls hide. `breakpoint: "none"` keeps it a carousel
 * at every width, controls and all.
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
  breakpoint?: "sm" | "md" | "lg" | "none";
  tone?: "light" | "dark";
  stagger?: boolean;
}) {
  const items = Children.toArray(children);
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  // Which slide is current, and whether either end has been reached, read from
  // the track's own scroll position. An IntersectionObserver cannot answer this
  // once more than one slide fits: several are "in view" at once, and the last
  // to report wins, which left Next disabled on the first slide.
  const [ends, setEnds] = useState({ start: true, end: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const slides = Array.from(track.children) as HTMLElement[];
      if (!slides.length) return;
      const left = track.scrollLeft;
      let nearest = 0;
      let best = Infinity;
      slides.forEach((slide, i) => {
        const distance = Math.abs(slide.offsetLeft - track.offsetLeft - left);
        if (distance < best) {
          best = distance;
          nearest = i;
        }
      });
      setActive(nearest);
      // The track rests at the first slide's offset, which is its own left
      // padding rather than zero. A couple of pixels of slack either side:
      // scrollWidth and clientWidth can differ by a fraction.
      const first = slides[0].offsetLeft - track.offsetLeft;
      setEnds({ start: left <= first + 2, end: left + track.clientWidth >= track.scrollWidth - 2 });
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    track.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(onScroll);
    ro.observe(track);

    return () => {
      track.removeEventListener("scroll", onScroll);
      ro.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items.length]);

  /**
   * Scrolls the track to a slide, animating the scroll here rather than asking
   * the browser for it: the page runs a smooth-scrolling library, and native
   * smooth scrolling on a nested scroller never starts under it, which left
   * these arrows doing nothing at all.
   */
  const go = useCallback((index: number) => {
    const track = trackRef.current;
    const target = track?.children[index] as HTMLElement | undefined;
    if (!track || !target) return;

    const to = target.offsetLeft - track.offsetLeft;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      track.scrollLeft = to;
      return;
    }

    const from = track.scrollLeft;
    const distance = to - from;
    if (!distance) return;
    const duration = 420;
    let start = 0;

    // Mandatory snapping pulls every small step back to the snap point it came
    // from, so an animated scroll never leaves the slide it started on. It is
    // suspended for the length of the animation and restored at the end, where
    // the track lands on a snap point anyway.
    track.style.scrollSnapType = "none";

    const step = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);
      // The same ease-out the rest of the site moves on.
      const eased = 1 - Math.pow(1 - progress, 3);
      track.scrollLeft = from + distance * eased;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        track.style.scrollSnapType = "";
      }
    };
    requestAnimationFrame(step);
  }, []);

  const hide = { sm: "sm:hidden", md: "md:hidden", lg: "lg:hidden", none: "" }[breakpoint];
  const dark = tone === "dark";

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={trackRef}
        data-lenis-prevent-touch
        {...(stagger ? { "data-stagger": "" } : {})}
        className={cn(
          "-mx-5 flex snap-x snap-mandatory [scrollbar-width:none] gap-3 overflow-x-auto px-5 pb-2 sm:-mx-6 sm:px-6 [&::-webkit-scrollbar]:hidden",
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

      <div className={cn("mt-6 flex items-center justify-end", hide)}>
        <div className="flex gap-2">
          {[
            { dir: -1, Icon: ChevronLeft, name: "Previous" },
            { dir: 1, Icon: ChevronRight, name: "Next" },
          ].map(({ dir, Icon, name }) => {
            // Disabled at the ends of the track, not at the first and last
            // slide: with several slides in view the last one is reachable long
            // before it is the active one.
            const disabled = dir < 0 ? ends.start : ends.end;
            return (
              <button
                key={name}
                type="button"
                onClick={() => go(Math.min(Math.max(active + dir, 0), items.length - 1))}
                disabled={disabled}
                aria-label={`${name} slide`}
                className={cn(
                  "grid size-11 place-items-center rounded-pill border transition-colors duration-(--duration-fast) disabled:opacity-40",
                  dark
                    ? "border-ink-700 text-on-dark hover:border-brand-300"
                    : "border-line bg-surface text-ink-900 hover:border-brand-600",
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
