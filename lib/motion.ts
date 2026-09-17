import type { Transition, Variants } from "motion/react";

export const duration = {
  instant: 0.12,
  fast: 0.2,
  base: 0.35,
  slow: 0.6,
  xslow: 0.9,
  /** Homepage hero entrance (CSS, --duration-hero-* in globals.css) */
  hero: { glow: 1, word: 0.9, device: 1.6, shade: 0.5, bar: 0.5 },
} as const;

export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
  spring: { type: "spring", stiffness: 400, damping: 32 },
} as const satisfies Record<string, Transition["ease"] | Transition>;

export const stagger = { tight: 0.04, base: 0.08, loose: 0.14 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.out } },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: duration.slow, ease: ease.out } },
};

/** Scroll reveals play once, when 30% of the element is visible (PRD §6.1). */
export const revealViewport = { once: true, amount: 0.3 } as const;
