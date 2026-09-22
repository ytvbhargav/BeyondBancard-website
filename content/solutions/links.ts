import { solutionsMenu, type SolutionColumn } from "@/content/site";
import type { Capability, Faq, NavLink, Pillar } from "@/types/content";

/**
 * Links into the Solutions menu, looked up by exact menu label so a renamed item
 * fails the build instead of linking to the wrong page (the approach adult.ts uses).
 */
export function solutionLink(menuLabel: string): NavLink {
  for (const column of solutionsMenu) {
    const link = column.links.find((l) => l.label === menuLabel);
    if (link) return { label: link.label, href: link.href };
  }
  throw new Error(`solutionLink: no "${menuLabel}" link in solutionsMenu`);
}

/** The same link with a different visible label (e.g. "Explore online payments"). */
export function solutionLinkAs(menuLabel: string, label: string): NavLink {
  return { ...solutionLink(menuLabel), label };
}

export function pillarColumn(pillar: Pillar): SolutionColumn {
  const column = solutionsMenu.find((c) => c.pillar === pillar);
  if (!column) throw new Error(`pillarColumn: no "${pillar}" column in solutionsMenu`);
  return column;
}

/** A pillar hub link: /accept, /protect, /grow or /operate. */
export function pillarLink(pillar: Pillar, label: string = pillar): NavLink {
  return { label, href: pillarColumn(pillar).href };
}

/** Breadcrumb for a hub ("Solutions / Accept") or a solution page ("Solutions / Accept / Online payments"). */
export function solutionBreadcrumb(pillar: Pillar, pageLabel?: string): { label: string; href?: string }[] {
  if (!pageLabel) return [{ label: "Solutions" }, { label: pillar }];
  return [{ label: "Solutions" }, { label: pillar, href: pillarColumn(pillar).href }, { label: pageLabel }];
}

/** Pillar and link for an industry page capability, from the Solutions menu (follows the site IA, not the live page's pillar). */
export function solutionPillar(menuLabel: string): Pick<Capability, "pillar" | "href"> {
  for (const column of solutionsMenu) {
    const link = column.links.find((l) => l.label === menuLabel);
    if (link) return { pillar: column.pillar, href: link.href };
  }
  throw new Error(`solutionPillar: no "${menuLabel}" link in solutionsMenu`);
}

/** An FAQ from another page by its exact question, so a reworded question fails the build. */
export function pickFaq(list: Faq[], q: string): Faq {
  const faq = list.find((f) => f.q === q);
  if (!faq) throw new Error(`pickFaq: no FAQ with the question "${q}"`);
  return faq;
}

/**
 * Stand-in for an FAQ whose live answer is missing or belongs to another question.
 * Always paired with `confirm: true` (the Adult precedent, D-057).
 */
export const ANSWER_TO_SUPPLY = "Answer to be supplied by Beyond Bancard.";
