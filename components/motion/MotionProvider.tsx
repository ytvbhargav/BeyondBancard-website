"use client";

import { LazyMotion } from "motion/react";

const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);
const loadMaxFeatures = () => import("@/lib/motion-features-max").then((mod) => mod.default);

/**
 * Motion features load after first paint (PRD §11.2 JS budget). `strict`
 * errors if a full `motion.*` component slips in and defeats the split.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}

/** Adds layout animation support for a subtree (industry filter reflow). */
export function LayoutMotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadMaxFeatures} strict>
      {children}
    </LazyMotion>
  );
}
