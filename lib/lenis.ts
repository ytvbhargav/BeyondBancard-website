import type Lenis from "lenis";

/** Shared handle so overlays (mobile menu) can pause smooth scrolling. */
export const lenisRef: { current: Lenis | null } = { current: null };
