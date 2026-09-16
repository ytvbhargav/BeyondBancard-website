export const DEMO_ROUTES = [
  "/",
  "/accept/high-risk-processing",
  "/industries",
  "/industries/nutra-supplements",
  "/partners/isos-agents",
  "/live-form",
] as const;

export type DemoRoute = (typeof DEMO_ROUTES)[number];

/**
 * Resolve an internal path. Demo routes link directly; everything else goes to
 * /coming-soon and carries the original path so the client can see where the
 * link will lead in the full build. Hash fragments on demo routes are kept.
 */
export function href(path: string): string {
  const [base, hash] = path.split("#");
  const cleanBase = base === "" ? "/" : base;
  if ((DEMO_ROUTES as readonly string[]).includes(cleanBase)) {
    return hash ? `${cleanBase}#${hash}` : cleanBase;
  }
  return `/coming-soon?from=${encodeURIComponent(path)}`;
}

export function isExternal(url: string) {
  return /^(https?:|mailto:|tel:)/.test(url);
}

export const PHONE = { label: "(844) 365-3050", href: "tel:8443653050" } as const;
