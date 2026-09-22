"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Moves its content against the scroll by `distance` pixels across the time the
 * element crosses the viewport (M7 extended). The element renders in place with
 * no transform, so it is correct without JS, with reduced motion, and below the
 * `from` breakpoint, where a small screen's short scroll makes parallax read as
 * drift rather than depth.
 */
export function Parallax({
  children,
  distance = 60,
  from = 768,
  className,
}: {
  children: React.ReactNode;
  /** Total travel in pixels; negative moves with the scroll instead of against it. */
  distance?: number;
  /** Minimum viewport width, in pixels, at which the parallax runs. */
  from?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia(`(min-width: ${from}px)`).matches) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    const start = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { y: distance / 2 },
          {
            y: -distance / 2,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.4 },
          },
        );
      }, el);
    };

    // Load GSAP only as the element approaches the viewport.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        start();
      },
      { rootMargin: "50% 0px" },
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      ctx?.revert();
    };
  }, [distance, from]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
