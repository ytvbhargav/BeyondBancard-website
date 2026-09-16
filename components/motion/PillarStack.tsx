"use client";

import { useEffect, useRef } from "react";
import { SnapCarousel } from "@/components/motion/SnapCarousel";

const STEP = 0.05;
const MAX_SHADE = 0.45;

/**
 * S4 pillars sequence, Helcim-style. Large screens: panels pin in a stack and
 * each arriving panel pushes the ones beneath it back (scale down + darken),
 * driven directly by scroll position. Small screens: a swipe carousel.
 * Reduced motion keeps the stack but skips the scaling.
 */
export function PillarStack({ label, children }: { label: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const wide = window.matchMedia("(min-width: 64rem)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const items = Array.from(root.querySelectorAll<HTMLElement>("li[data-index]"));
      const cards = items.map((li) => li.querySelector<HTMLElement>("[data-card]"));
      const shades = items.map((li) => li.querySelector<HTMLElement>("[data-shade]"));

      if (!wide.matches || reduce.matches) {
        cards.forEach((c) => c && (c.style.transform = ""));
        shades.forEach((s) => s && (s.style.opacity = "0"));
        return;
      }

      const vh = window.innerHeight;
      const progress = items.map((li) => {
        const stickyTop = parseFloat(getComputedStyle(li).top) || 0;
        const top = li.getBoundingClientRect().top;
        return Math.min(Math.max((vh - top) / Math.max(vh - stickyTop, 1), 0), 1);
      });

      cards.forEach((card, i) => {
        if (!card) return;
        let behind = 0;
        for (let j = i + 1; j < items.length; j++) behind += progress[j];
        card.style.transform = behind ? `scale(${1 - STEP * behind})` : "";
        const shade = shades[i];
        if (shade) shade.style.opacity = String(Math.min(behind * 0.2, MAX_SHADE));
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    wide.addEventListener("change", schedule);
    reduce.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      wide.removeEventListener("change", schedule);
      reduce.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <div ref={ref}>
      <SnapCarousel
        label={label}
        tone="dark"
        trackClassName="lg:mx-0 lg:block lg:snap-none lg:overflow-visible lg:px-0 lg:pb-0"
        itemClassName="lg:sticky lg:top-[calc(6rem+var(--stack-i)*1.75rem)] lg:mb-[22vh] lg:w-auto lg:last:mb-0"
      >
        {children}
      </SnapCarousel>
    </div>
  );
}
