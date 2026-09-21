"use client";

import { useEffect, useRef } from "react";

/**
 * SpotlightCard's pointer glow as a standalone layer (D-058), so a card can stay
 * server-rendered and only this span hydrates. Place it as a direct child of a
 * `group/card relative isolate` card: it tracks mouse movement over the parent
 * and fades in on hover. Touch and pen never see it. Its own radius clips the
 * glow, so the card doesn't need overflow-hidden (which would clip a focus ring).
 */
export function CardSpotlight() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const layer = ref.current;
    const card = layer?.parentElement;
    if (!layer || !card) return;
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = layer.getBoundingClientRect();
      layer.style.setProperty("--x", `${e.clientX - rect.left}px`);
      layer.style.setProperty("--y", `${e.clientY - rect.top}px`);
    };
    card.addEventListener("pointermove", onPointerMove);
    return () => card.removeEventListener("pointermove", onPointerMove);
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-(--duration-base) group-hover/card:opacity-100 [background:radial-gradient(22rem_circle_at_var(--x,50%)_var(--y,50%),var(--color-brand-100),transparent_65%)]"
    />
  );
}
