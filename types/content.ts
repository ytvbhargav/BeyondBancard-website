// Shared content types. Shapes map 1:1 to a future CMS schema (PRD §7.2).

export type Confirmable<T> = { value: T; confirm?: boolean; note?: string };

export type Cta = { label: string; href: string; variant?: "primary" | "secondary" | "ghost" };

export type Faq = { q: string; a: string; confirm?: boolean; note?: string };

export type IndustryGroup =
  | "featured"
  | "specialized"
  | "retail"
  | "professional"
  | "healthcare"
  | "digital";

export type Industry = {
  slug: string;
  name: string;
  teaser: string;
  group: IndustryGroup;
  inDemo?: boolean;
};

export type Pillar = "Accept" | "Protect" | "Grow" | "Operate";

export type Capability = { pillar: Pillar; title: string; body: string; href: string };

export type Step = { title: string; body: string };

export type Testimonial = { quote: string; name: string; role: string; company: string };

export type NavLink = { label: string; href: string; description?: string; external?: boolean };

export type IconName =
  | "store"
  | "laptop"
  | "repeat"
  | "receipt"
  | "file-search"
  | "globe"
  | "layers"
  | "shield"
  | "users"
  | "wallet"
  | "headset"
  | "clock"
  | "sliders"
  | "badge-check"
  | "megaphone"
  | "trending-up"
  | "package"
  | "handshake"
  | "briefcase"
  | "credit-card"
  | "chart"
  | "activity";

export type Feature = { title: string; body: string; icon?: IconName; confirm?: boolean; note?: string };

/**
 * One industry detail page (PRD §9.4 template, reused for every industry; D-057).
 * Rendered by `components/sections/IndustryDetail.tsx`; the page's FAQs and optional
 * hero visual are passed alongside. Strings are copy; `process.id` is the section anchor.
 */
export type IndustryDetailContent = {
  /** Browser title; the hero lead doubles as the meta description. */
  meta: { title: string };
  breadcrumb: { label: string; href?: string }[];
  /** `expertCta` overrides the "Talk to an expert" label (Nutra's PRD wording); omit to use `cta.expert`. */
  hero: { title: string; lead: string; expertCta?: string };
  realities: { title: string; items: Feature[] };
  models: { title: string; chips: string[]; disclaimer: string };
  /** `lead` sits under the title in the sticky column; omit for a title-only column. */
  whyBeyond: { title: string; lead?: string; features: Feature[] };
  capabilities: { title: string; items: Capability[] };
  checklist: { title: string; lead?: string; items: string[] };
  process: { id: string; title: string; steps: Step[] };
  faq: { title: string };
  related: { title: string; items: Industry[] };
};
