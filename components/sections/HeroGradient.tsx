"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MeshGradient = dynamic(() => import("@/components/motion/MeshGradient"), { ssr: false });

/**
 * Static CSS gradient (always painted, so there is never a flash) with the
 * WebGL mesh layered on top. The mesh only loads on tablet and desktop widths,
 * with motion allowed, once the browser is idle after load, so it never
 * competes with first paint or hydration.
 */
export function HeroGradient() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const ok =
      window.matchMedia("(min-width: 48rem)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;

    let idle = 0;
    let timer = 0;
    const start = () => {
      if (typeof window.requestIdleCallback === "function") {
        idle = window.requestIdleCallback(() => setEnabled(true), { timeout: 2500 });
      } else {
        timer = setTimeout(() => setEnabled(true), 1200) as unknown as number;
      }
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      window.removeEventListener("load", start);
      if (idle) window.cancelIdleCallback(idle);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      <div className="hero-gradient-static absolute inset-0" />
      {enabled && <MeshGradient className="absolute inset-0 size-full" />}
      <div className="absolute inset-x-0 bottom-0 h-px bg-ink-800" />
    </div>
  );
}
