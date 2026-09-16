"use client";

import { useEffect } from "react";
import { lenisRef } from "@/lib/lenis";

/**
 * Smooth scrolling (Lenis). Loaded after hydration, skipped entirely when the
 * visitor prefers reduced motion or uses a coarse pointer.
 */
export function LenisProvider() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    if (reduce.matches || !fine.matches) return;

    let raf = 0;
    let idle = 0;
    let cancelled = false;

    const init = () =>
      import("lenis").then(({ default: Lenis }) => {
        if (cancelled) return;
        const lenis = new Lenis({ lerp: 0.12, anchors: { offset: -96 }, autoRaf: false });
        lenisRef.current = lenis;
        const loop = (time: number) => {
          lenis.raf(time);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      });
    // Smooth scrolling is an enhancement: wait until the main thread is free.
    if (typeof window.requestIdleCallback === "function") idle = window.requestIdleCallback(init, { timeout: 3000 });
    else init();

    const onReduce = () => {
      if (reduce.matches) {
        lenisRef.current?.destroy();
        lenisRef.current = null;
        cancelAnimationFrame(raf);
      }
    };
    reduce.addEventListener("change", onReduce);

    return () => {
      cancelled = true;
      if (idle) window.cancelIdleCallback(idle);
      reduce.removeEventListener("change", onReduce);
      cancelAnimationFrame(raf);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return null;
}
