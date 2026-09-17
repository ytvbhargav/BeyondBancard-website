import type { Feature, NavLink } from "@/types/content";
import { home } from "@/content/home";
import { isosAgents } from "@/content/isos-agents";
import { partnersMenu, portals } from "@/content/site";

/* Page-specific types (kept here while pages are built in parallel, spec §1.10). */

export type PartnerProgram = Required<Pick<NavLink, "label" | "href" | "description">>;

/** Looks a benefit up by its exact title, so this page shows the ISOs & agents objects (and their confirm flags) unchanged. */
function benefit(title: string): Feature {
  const item = isosAgents.benefits.items.find((b) => b.title === title);
  if (!item) throw new Error(`Partner benefit not found: ${title}`);
  return item;
}

/** Looks a program up in the Partners menu by its route, and fails the build if it or its descriptor goes missing. */
function program(href: string): PartnerProgram {
  const item = partnersMenu.find((p) => p.href === href);
  if (!item?.description) throw new Error(`Partner program or its descriptor not found: ${href}`);
  return { label: item.label, href: item.href, description: item.description };
}

/** Looks an ISOs & agents program step up by its exact title. */
function programStep(title: string) {
  const step = isosAgents.program.steps.find((s) => s.title === title);
  if (!step) throw new Error(`ISOs & agents program step not found: ${title}`);
  return step;
}

/**
 * Partner programs hub (spec §6.2, D-057). Every string is reused from existing content
 * except the section titles and the closing band body:
 * - lead: homepage partners teaser (PRD §9.1.6)
 * - programs: the Partners menu and its PRD §9.5 descriptors
 * - benefits: the ISOs & agents benefits, by reference. The current /partners page's
 *   "best rates" and "lowest processing rates" claims are not used (PRD §10.2).
 * - portal band: the homepage "Already a partner?" line, the ISOs & agents program step for
 *   the portal (PRD §9.5: application statuses and residuals), and the closing band's contact label
 * - FAQ: as on ISOs & agents
 * - closing band: the ISOs & agents title and labels; the body is the ISOs & agents body
 *   made program-neutral (drafted copy, D-057), since this page offers three programs
 */
export const partners = {
  hero: {
    title: "Partner with Beyond Bancard.",
    lead: home.partners.lead,
  },

  programs: {
    title: "Choose your program.",
    items: [program("/partners/isos-agents"), program("/partners/isvs-platforms"), program("/partners/associations")],
  },

  benefits: {
    // The current /partners page's accordion label ("Why Partner With Us?"), in sentence case.
    title: "Why partner with us?",
    items: [benefit("Uncapped income"), benefit("In-house support"), benefit("Flexibility"), benefit("Broader approvals")],
  },

  portal: {
    title: home.partners.loginLine,
    body: programStep("Track and earn in the partner portal").body,
    login: { label: isosAgents.hero.portalCta, href: portals.partner.href } satisfies NavLink,
    contact: { label: isosAgents.ctaBand.secondaryLabel, href: "/contact-us" } satisfies NavLink,
  },

  faq: { title: isosAgents.faq.title },

  ctaBand: {
    title: isosAgents.ctaBand.title,
    body: "Tell us about your business and we'll find the program that fits.",
    secondary: { label: isosAgents.ctaBand.secondaryLabel, href: "/contact-us" },
  },
};
