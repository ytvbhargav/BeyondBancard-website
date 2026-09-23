import { hasIndustryPage, industries, industryPath } from "@/content/industries";
import { solutionsMenu } from "@/content/site";
import { testimonials, testimonialsNote } from "@/content/testimonials";
import type { NavLink, Testimonial } from "@/types/content";

/**
 * A client quote plus the context this page sets beside it (D-054). The quote,
 * name, role and company come from content/testimonials.ts untouched (PRD §9.8).
 */
export type ClientStory = Testimonial & {
  /** The business's industry; `href` only when the industry has a page. */
  industry: { label: string; href?: string };
  /** The Beyond page covering something the quote names, where one exists. */
  related?: NavLink;
};

type StoryContext = { industry: string; related?: NavLink };

/**
 * Looks the slug up in content/industries.ts, so a renamed or removed industry
 * fails the build instead of linking nowhere. The industry is named either way;
 * it is only linked when it has a page of its own.
 */
function industryLink(slug: string): { label: string; href?: string } {
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) throw new Error(`client-stories: unknown industry slug "${slug}"`);
  return hasIndustryPage(slug) ? { label: industry.name, href: industryPath(industry.slug) } : { label: industry.name };
}

/** Looks the page up in the Solutions menu, so its label and path stay single-source. */
function solutionLink(path: string): NavLink {
  const link = solutionsMenu.flatMap((column) => column.links).find((l) => l.href === path);
  if (!link) throw new Error(`client-stories: no Solutions menu link for "${path}"`);
  return link;
}

// Keyed by client name. Industries are inferred from the business names, so the client
// confirms them (see `context` below). The related link is sourced: the live
// /grow/cost-reduction-programs page covers the cash discount program Andrew C. names.
// Carlos H. names the support team, which has no page of its own, so his file has no related row.
const contextByName: Record<string, StoryContext> = {
  "Andrew C.": { industry: "travel-payment-solutions", related: solutionLink("/grow/cost-reduction-programs") },
  "James W.": { industry: "medical-healthcare" },
  "Carlos H.": { industry: "restaurant-hospitality" },
  "Kumar S.": { industry: "jewelry" },
};

const items: ClientStory[] = testimonials.map((t) => {
  const context = contextByName[t.name];
  if (!context) throw new Error(`client-stories: no context for "${t.name}"`);
  return { ...t, industry: industryLink(context.industry), related: context.related };
});

const countWords = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
/** "Four businesses", from the number of stories, so the lead stays true if a quote is added or withdrawn. */
const businesses = (n: number) => (n === 1 ? "One business" : `${countWords[n - 1] ?? n} businesses`);

export const clientStories = {
  breadcrumb: [{ label: "Resources" }, { label: "Client stories" }],
  hero: {
    title: "What merchants say about Beyond.",
    lead: `${businesses(items.length)}, in their own words, on working with Beyond Bancard.`,
  },
  /** Visually hidden heading of the stories region; each company name is a heading under it. */
  storiesTitle: "Client stories",
  /** Row labels of each story's client file. */
  file: {
    industry: "Industry",
    related: "Related",
  },
  /** The industry shown for each named client is inferred, so it is flagged on every Industry row. */
  context: {
    confirm: true,
    note: "Industry shown for each client, inferred from the business name (Travel is listed under complex industries). OK to show?",
  },
  /** Display permission for the quotes, flagged once for the whole set (D-043). Same note as the homepage. */
  permission: { confirm: true, note: "Permission to display client testimonials" satisfies typeof testimonialsNote },
  /** In the order of content/testimonials.ts; the first story is featured. */
  items,
};
