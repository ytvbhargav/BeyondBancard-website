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

/** `confirm`/`note` flag an unverified body (D-058: the live CRB capabilities copy the Gaming page's). */
export type Capability = { pillar: Pillar; title: string; body: string; href: string; confirm?: boolean; note?: string };

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
  | "activity"
  // Added for the Solutions pages (D-058).
  | "lock"
  | "key"
  | "landmark"
  | "banknote"
  | "smartphone"
  | "monitor"
  | "calendar"
  | "zap"
  | "link"
  | "percent"
  | "file-text"
  | "building"
  | "truck"
  | "alert"
  | "eye"
  | "gauge"
  | "plug"
  | "tag"
  | "calculator"
  | "coins"
  | "map-pin"
  | "arrows";

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

/* ------------------------------ Solution pages ------------------------------ */
// The Solutions hubs (/accept, /protect, /grow, /operate) and every solution page
// (D-058). One `SolutionPageContent` object per page, rendered by
// `components/sections/SolutionPage.tsx`. A page is a hero, an ordered list of
// blocks, then related solutions, the other pillars, the FAQ and the closing band.

/** Anything the client still has to confirm. In demo mode it is outlined; in production it is dropped. */
export type Flag = { confirm?: boolean; note?: string };

/**
 * Hero illustration in the underwriting-file style (D-001): a white panel with a
 * title, a status pill and label/value content. Every figure is invented for the
 * picture, so the panel always carries an "Example" or "Illustration" tag (PRD §10.4).
 */
export type HeroFileContent = {
  title: string;
  subtitle?: string;
  /** "Example" when the panel shows figures, "Illustration" when it doesn't. */
  tag: "Example" | "Illustration";
  /** Status pill in the panel footer. `approved` = green check, `review` = amber clock, `neutral` = blue. */
  status?: { label: string; tone: "approved" | "review" | "neutral" };
  /** One large tabular figure. `label` only when the live card labels it; the figure then shows alone. */
  amount?: { label?: string; value: string };
  /** Small chips, e.g. accepted methods. */
  methods?: string[];
  /** Label/value rows. */
  fields?: { label: string; value: string }[];
  /** Up to three figures side by side. */
  stats?: { label: string; value: string }[];
  /** A short sequence; done items tick in one by one when the panel enters the viewport. */
  steps?: { label: string; state: "done" | "active" | "pending" }[];
};

export type FlowNode = { label: string; detail?: string };

type BlockBase = Flag & {
  /** Section anchor. Optional; the renderer derives heading ids from the index. */
  id?: string;
  title: string;
  lead?: string;
};

/** Feature set. `split` puts the title and lead in a sticky left column with rows on the right. */
export type FeaturesBlock = BlockBase & {
  kind: "features";
  layout: "panel" | "ruled" | "rows" | "split";
  items: Feature[];
};

/** A real, numbered sequence ("How it works"). */
export type StepsBlock = BlockBase & { kind: "steps"; steps: Step[] };

/** An ordered chain of stages joined by arrows; `focus` is the index of the emphasised stage. */
export type FlowBlock = BlockBase & {
  kind: "flow";
  nodes: FlowNode[];
  focus?: number;
  /** Small labels under the chain (the Grow hub's four levers). */
  tags?: string[];
  /** Small print under the diagram (not `note`, which is the client question on a flagged block). */
  footnote?: string;
  footnoteFlag?: Flag;
};

/** Many inputs meeting in one centre (Beyond by default), optionally fanning out again. */
export type HubBlock = BlockBase & {
  kind: "hub";
  inputs: string[];
  center?: string;
  outputs?: string[];
};

/** Static chips ("Where this fits"). */
export type ChipsBlock = BlockBase & { kind: "chips"; chips: string[]; footnote?: string };

/** Two or three options side by side ("ACH vs. eCheck"). */
export type CompareBlock = BlockBase & {
  kind: "compare";
  columns: (Flag & { title: string; subtitle?: string; body?: string; points?: string[] })[];
  footnote?: string;
};

export type TableCell = Flag & { text: string };

/** Comparison table. The first column holds row labels; `columns` are the compared options. */
export type TableBlock = BlockBase & {
  kind: "table";
  columns: string[];
  rows: { label: string; cells: TableCell[] }[];
  footnote?: string;
};

/** A single idea in a few sentences. */
export type StatementBlock = BlockBase & { kind: "statement"; body: string[] };

/** Linked cards: the solutions inside a hub, or program options. */
export type CardsBlock = BlockBase & {
  kind: "cards";
  cards: { title: string; tagline?: string; body: string; detail?: string; link: NavLink }[];
};

/** "If this, go there" rows. */
export type ActionsBlock = BlockBase & { kind: "actions"; rows: { prompt: string; link: NavLink }[] };

/** Questions a team asks, set as quotes. */
export type QuestionsBlock = BlockBase & { kind: "questions"; items: string[]; body?: string };

/** Current processing cost estimate: monthly volume × effective rate × 12. */
export type EstimatorBlock = BlockBase & {
  kind: "estimator";
  volume: { label: string; defaultValue: number };
  rate: { label: string; defaultValue: number };
  resultLabel: string;
  disclaimer: string;
  cta: NavLink;
};

/** Pick an option, read the matching recommendation. `text` may mark emphasis with **double asterisks**. */
export type SelectorBlock = BlockBase & {
  kind: "selector";
  legend: string;
  options: { label: string; text: string }[];
  link: NavLink;
};

/** A compact band with one onward link. */
export type CalloutBlock = BlockBase & { kind: "callout"; body?: string; link: NavLink };

export type SolutionBlock =
  | FeaturesBlock
  | StepsBlock
  | FlowBlock
  | HubBlock
  | ChipsBlock
  | CompareBlock
  | TableBlock
  | StatementBlock
  | CardsBlock
  | ActionsBlock
  | QuestionsBlock
  | EstimatorBlock
  | SelectorBlock
  | CalloutBlock
  | CapabilitiesBlock;

/** Capabilities grouped by pillar, shown as the industry pages' tabs (partner pages, D-061). */
export type CapabilitiesBlock = BlockBase & { kind: "capabilities"; items: Capability[] };

export type SolutionPageContent = {
  /** Browser title (the menu label), and the meta description (defaults to the hero lead). */
  meta: { title: string; description?: string };
  /** The Solutions pillar this page belongs to. Omitted on partner pages, which sit outside the four. */
  pillar?: Pillar;
  /** "hub" for /accept, /protect, /grow, /operate; "detail" for the pages inside them and the partner pages. */
  kind: "hub" | "detail";
  breadcrumb: { label: string; href?: string }[];
  /**
   * `expertCta` overrides the "Talk to an expert" label where the live page names the expert.
   * `ctas: "partner"` swaps the hero pair to "Become a partner" and "Talk to an expert" (PRD §5.5).
   */
  hero: {
    title: string;
    lead: string;
    expertCta?: string;
    ctas?: "merchant" | "partner";
    visual?: HeroFileContent;
  };
  blocks: SolutionBlock[];
  related?: { title: string; links: NavLink[] };
  /** "The bigger picture": this pillar's role, above links to the other three pillars. Omit with no pillar. */
  bigPicture?: { title: string; lead: string };
  faq: { title: string; items: Faq[] };
};
