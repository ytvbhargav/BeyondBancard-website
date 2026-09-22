"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { Step } from "@/types/content";

/** S5 account lifecycle: progress line fills with scroll, nodes pop as reached. */
export function ScrollSteps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const [reached, setReached] = useState<number>(steps.length);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    const start = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      setEnhanced(true);
      setReached(-1);
      ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-progress]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: list, start: "top 60%", end: "bottom 60%", scrub: 0.3 },
          },
        );
        gsap.utils.toArray<HTMLElement>("[data-step]", list).forEach((el, i) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 60%",
            onEnter: () => setReached((r) => Math.max(r, i)),
            onLeaveBack: () => setReached(i - 1),
          });
        });
      }, list);
    };

    // Load GSAP only as the timeline approaches the viewport.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        start();
      },
      { rootMargin: "50% 0px" },
    );
    io.observe(list);

    return () => {
      cancelled = true;
      io.disconnect();
      ctx?.revert();
    };
  }, []);

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden className="absolute top-5 bottom-5 left-5 w-px bg-line-strong" />
      <span
        aria-hidden
        data-progress
        className={cn("absolute top-5 bottom-5 left-5 w-px origin-top bg-brand-600", !enhanced && "scale-y-100")}
      />
      {steps.map((s, i) => {
        const on = i <= reached;
        // phone pass (D-063): pb-10 below sm tightens the step pitch; sm:pb-14 restores today's value, md:pb-20 unchanged.
        return (
          <li key={s.title} data-step className="relative flex gap-6 pb-10 last:pb-0 sm:pb-14 md:pb-20">
            <span
              aria-hidden
              className={cn(
                "relative z-10 grid size-10 shrink-0 place-items-center rounded-pill border font-display text-[0.9375rem] font-bold tabular [font-stretch:108%]",
                "transition-[transform,background-color,border-color,color] duration-(--duration-base) ease-out",
                on ? "scale-100 border-brand-600 bg-brand-600 text-white" : "scale-90 border-line-strong bg-paper text-muted",
              )}
            >
              {i + 1}
            </span>
            <div className="pt-1">
              <h3 className={cn("type-h3 transition-colors duration-(--duration-base)", on ? "text-ink-900" : "text-muted")}>
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </h3>
              <p className="type-body-lg mt-2 max-w-[30rem] text-muted">{s.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
