"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MeshGradient = dynamic(() => import("@/components/motion/MeshGradient"), { ssr: false });

const DESKTOP = "(min-width: 64rem)";
const REDUCE = "(prefers-reduced-motion: reduce)";

/**
 * Hero background (S1). The CSS glow (.hero-glow and its rising core) is
 * always painted, so there is never a flash. On desktop widths with motion
 * allowed, the WebGL port of the same layers loads once the browser is idle
 * after load and fades in on top; it unmounts again below 64rem or when
 * reduced motion is switched on.
 */
export function HeroGradient() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP);
    const reduce = window.matchMedia(REDUCE);

    let idle = 0;
    let timer = 0;
    const cancel = () => {
      if (idle) window.cancelIdleCallback(idle);
      window.clearTimeout(timer);
      idle = 0;
      timer = 0;
    };
    const schedule = () => {
      cancel();
      if (!desktop.matches || reduce.matches) return;
      if (typeof window.requestIdleCallback === "function") {
        idle = window.requestIdleCallback(() => setEnabled(true), { timeout: 2500 });
      } else {
        timer = window.setTimeout(() => setEnabled(true), 1200);
      }
    };
    const onChange = () => {
      if (desktop.matches && !reduce.matches) schedule();
      else {
        cancel();
        setEnabled(false);
      }
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    desktop.addEventListener("change", onChange);
    // Reduced motion switched on mid-visit removes the canvas too, not only at mount.
    reduce.addEventListener("change", onChange);

    return () => {
      window.removeEventListener("load", schedule);
      desktop.removeEventListener("change", onChange);
      reduce.removeEventListener("change", onChange);
      cancel();
    };
  }, []);

  return (
    <div aria-hidden className="hero-glow">
      <div className="hero-glow-core" />
      {enabled && <MeshGradient className="absolute inset-0 size-full" />}
    </div>
  );
}
