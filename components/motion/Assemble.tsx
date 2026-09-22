"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * A group whose children arrive scattered and settle into their places as the
 * section is scrolled: each child starts offset, tilted and slightly small, and
 * the scroll drives it back to its natural position in the layout.
 *
 * The children are laid out normally and only transformed, so the finished state
 * is exactly the layout the CSS describes. Nothing is applied below `from`, with
 * reduced motion, or before GSAP loads, which means the group is correct without
 * any of it.
 */
export function Assemble({
  children,
  className,
  from = 1024,
  selector = ":scope > *",
}: {
  children: React.ReactNode;
  className?: string;
  /** Minimum viewport width, in pixels, at which the pieces assemble. */
  from?: number;
  /** Which descendants move; defaults to the group's own children. */
  selector?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
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
        const pieces = gsap.utils.toArray<HTMLElement>(selector, el);
        pieces.forEach((piece, i) => {
          // Alternating sides and angles, so the group looks dealt rather than nudged.
          const side = i % 2 === 0 ? -1 : 1;
          const depth = 1 + (i % 3);
          gsap.fromTo(
            piece,
            { xPercent: side * 6 * depth, yPercent: 10 + depth * 4, rotate: side * 2.5, scale: 0.94, opacity: 0.4 },
            {
              xPercent: 0,
              yPercent: 0,
              rotate: 0,
              scale: 1,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: piece,
                start: "top 92%",
                end: "top 55%",
                scrub: 0.5,
              },
            },
          );
        });
      }, el);
    };

    // Load GSAP only as the group approaches the viewport.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        start();
      },
      { rootMargin: "60% 0px" },
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      ctx?.revert();
    };
  }, [from, selector]);

  return (
    <div ref={root} className={cn("[perspective:1400px]", className)}>
      {children}
    </div>
  );
}
