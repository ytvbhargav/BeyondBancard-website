export const DEMO_ROUTES = [
  "/",
  "/accept/high-risk-processing",
  "/industries",
  "/industries/nutra-supplements",
  "/partners/isos-agents",
  "/live-form",
  // Company and Resources pages (D-054).
  "/about-beyond-bancard",
  "/careers",
  "/contact-us",
  "/our-clients",
  "/faq",
  // First page of the Industries and Partners menus (D-057).
  "/industries/adult",
  "/partners",
  // Top 6 industries and every Solutions page (D-058).
  "/industries/gaming",
  "/industries/ruo-peptides",
  "/industries/travel-payment-solutions",
  "/industries/crb",
  "/accept",
  "/accept/online-payments",
  "/accept/in-person-payments",
  "/accept/b2b-payments",
  "/accept/international-payments",
  "/accept/ach-echeck",
  "/protect",
  "/protect/chargeback-protection",
  "/protect/network-tokenization",
  "/protect/3d-secure",
  "/protect/fraud-risk-tools",
  "/grow",
  "/grow/working-capital",
  "/grow/instant-payouts",
  "/grow/recurring-billing",
  "/grow/cost-reduction-programs",
  "/operate",
  "/operate/dashboard-reporting",
  "/operate/invoicing",
  "/operate/payment-gateways",
  "/operate/payment-technology",
  "/operate/pos",
  "/operate/virtual-terminal",
  // The last two Partners menu pages (D-061).
  "/partners/isvs-platforms",
  "/partners/associations",
  // Legal pages (D-062).
  "/terms-conditions",
  "/privacy-policy",
  "/accessibility",
] as const;

export type DemoRoute = (typeof DEMO_ROUTES)[number];

/**
 * Resolve an internal path. Demo routes link directly; everything else goes to
 * /coming-soon and carries the original path so the client can see where the
 * link will lead in the full build. Hash fragments on demo routes are kept, and
 * a bare "#id" stays an in-page link.
 */
export function href(path: string): string {
  // Fragment-only links stay on the current page.
  if (path.startsWith("#")) return path;
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
