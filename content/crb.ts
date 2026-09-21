import type { Capability, Faq, Feature, IndustryDetailContent, Step } from "@/types/content";
import type { UnderwritingCardProps } from "@/components/motion/UnderwritingCard";
import { featuredIndustries } from "@/content/industries";
import { solutionPillar } from "@/content/solutions/links";
import { keepTogether } from "@/lib/typography";

/**
 * Cannabis-related businesses (CRB) industry page (D-058), in the Adult template (D-057). Copy is
 * the live beyondbancard.com/industries/crb/ page (captured 21 Sept 2026), in live section order.
 *
 * Edits:
 * - Headings, reality titles, feature titles, capability titles and step titles in sentence case
 *   ("Business classification matters", "Product & business-model review", "Payment-method
 *   flexibility", "Underwriting that starts with understanding", "APIs / integrations", "Reporting &
 *   analytics", "Support & optimize", …); CRB and CBD keep their capitals; section h2s end with a
 *   full stop. "Beyond" → "Beyond Bancard" at the first mention (hero lead).
 * - Hero h1 is the live hero h2. Hero actions are the expert button, labelled with the live "Talk
 *   to a CRB Payments Expert" in sentence case, and "Apply now"; the live "See Why It's Different"
 *   button (an in-page jump to #why-this-industry-is-different) is not used.
 * - Section labels above the headings ("CRB Payment Solutions", "Why this industry is different",
 *   "Business models we support", "Why Beyond", "Payment capabilities", "Risk & processing
 *   health", "How it works", "FAQ") are not repeated as eyebrows (D-003). The realities' 01–04
 *   markers are dropped (not a sequence); the process timeline numbers its own steps.
 * - "Business models we support." is the chip band title in place of the live "Built around how
 *   your business actually operates." (as on Adult); the five model names, set as h2s on the live
 *   page, are the chips.
 * - Capabilities keep the live titles ("Fraud tools", "APIs / integrations", "Reporting &
 *   analytics"); pillar and link come from the Solutions menu via solutionPillar(). "APIs /
 *   integrations" has no page in the menu: it links to Payment gateways, under Operate (design
 *   spec §6, as on Gaming).
 * - FAQ heading "Questions about Cannabis-Related Businesses payments." → "Questions about
 *   cannabis-related business payments." (sentence case, and "business" as on the meta title).
 * - FAQ answers 1, 3, 4 and 6: the placeholder text is dropped and the answer flagged (C2).
 * - Hyphenated compounds carry word joiners (keepTogether) so they don't break at the hyphen.
 *
 * Dropped:
 * - The hero art and its "Industry-Aware Underwriting" caption, and the Why Beyond photo (C5).
 * - The capability "Recurring Billing" ("Support for subscriptions and recurring gaming revenue
 *   models."): it is the Gaming page's, and names gaming (design spec §6).
 * - The capabilities lead "Connected directly to Beyond's core platform — Accept, Protect, Grow,
 *   and Operate — configured around what this industry actually needs." (the template has no
 *   capabilities lead, as on Adult) and the live pillar label on each capability (the tabs group
 *   by the menu's pillars).
 * - The FAQ footer "Still have questions? We're happy to help." and its "Ready To Get Started?"
 *   button (the template's FAQ line and closing band cover both).
 *
 * Live-site issues:
 * - The capabilities section is a copy of the Gaming page's: same six titles, pillars and bodies.
 *   "Recurring Billing" names gaming (dropped); the other five are kept as generic, though their
 *   bodies speak of high-velocity digital transactions rather than CRB payments.
 * - The capability "APIs / Integrations" has no page in the Solutions menu.
 * - FAQ answers show their placeholders: "[Placeholder — confirm current category appetite.]",
 *   "[Placeholder — confirm current payment-method availability by classification.]",
 *   "[Placeholder — confirm documentation checklist.]" and "[Placeholder — confirm current
 *   integration/gateway compatibility.]".
 * - The five business-model names are set as h2s.
 * - FAQ heading reads "Questions about Cannabis-Related Businesses payments.".
 * - The browser title is the generic "Merchant Processing Service Provider - Online Processing".
 */
/**
 * Hero illustration (UnderwritingCard, static: the High-risk card's "In review" state, 2 of 4
 * checks). Every value is this page's own words: the business-model chip "Cannabis-adjacent
 * ecommerce" as the industry and, from it, the sales channel (online), the models' "subject to
 * underwriting" disclaimer for payment methods, and four items of the account-health checklist,
 * in its order (the landscape item is not a check). Spec §6 says the first four; the second,
 * "Evolving regulatory landscape", is a condition, so it would read as a completed check.
 */
export const crbVisual: Omit<UnderwritingCardProps, "mode" | "completed" | "className"> = {
  label: "Example application",
  title: "Merchant application",
  industry: `${keepTogether("Cannabis-adjacent")} ecommerce`,
  fields: [
    { label: "Sales channel", value: "Online" },
    { label: "Payment methods", value: "Subject to underwriting" },
  ],
  checks: [
    "Business classification review",
    "Chargeback activity",
    `${keepTogether("Payment-method")} appropriateness`,
    "Fraud monitoring",
  ],
};

/** Every capability body below is the Gaming page's; flagged once as a group (D-058). */
const copiedFromGaming = {
  confirm: true,
  note: "Cannabis-related businesses: the live capabilities repeat the Gaming page's wording. Supply CRB-specific capabilities?",
} as const;

export const crb = {
  meta: { title: "Cannabis-related business payments" },
  breadcrumb: [{ label: "Industries", href: "/industries" }, { label: "Cannabis-related businesses" }],
  hero: {
    title: "Navigate complex payments with confidence.",
    // Live wording; "Beyond Bancard" on first mention (PRD §10.5).
    lead: `${keepTogether("Cannabis-related")} businesses operate in one of the most complex payment environments in commerce. Beyond Bancard combines category experience, flexible payment options, risk capabilities, and ${keepTogether("hands-on")} support to help qualifying CRBs build a sustainable payment program.`,
    expertCta: "Talk to a CRB payments expert",
  },
  realities: {
    title: `${keepTogether("Cannabis-related")} businesses have their own payment realities.`,
    items: [
      {
        title: "Business classification matters",
        body: `Not every ${keepTogether("cannabis-related")} business has the same risk or payment profile.`,
        icon: "layers",
      },
      {
        title: "Evolving requirements",
        body: `The payment environment for ${keepTogether("cannabis-related")} businesses continues to evolve.`,
        icon: "landmark",
      },
      {
        title: `Product & ${keepTogether("business-model")} review`,
        body: "What a company sells and how it participates in the cannabis ecosystem matters.",
        icon: "file-search",
      },
      {
        title: `${keepTogether("Payment-method")} flexibility`,
        body: "Different business models may require different approaches to payment acceptance.",
        icon: "credit-card",
      },
    ] satisfies Feature[],
  },
  models: {
    title: "Business models we support.",
    chips: [
      "Cannabis retail (where qualifying)",
      "Ancillary cannabis services",
      `CBD & ${keepTogether("hemp-derived")} product businesses`,
      `${keepTogether("Cannabis-adjacent")} ecommerce`,
      "Other qualifying CRB business models",
    ],
    disclaimer: "Exact eligibility remains subject to underwriting.",
  },
  whyBeyond: {
    title: "Getting approved is only the beginning.",
    lead: "Beyond helps structure the full payment environment around your business — from underwriting and acceptance through risk, reporting, funding, and ongoing account health.",
    features: [
      {
        title: "Underwriting that starts with understanding",
        body: "We evaluate how your business actually operates rather than treating every company in a category the same.",
        icon: "file-search",
      },
      {
        title: "More ways to structure payments",
        body: "Payment methods, gateways, processing options, and technology give us more flexibility to build around the business model.",
        icon: "sliders",
      },
      {
        title: "Protect the processing relationship",
        body: "Risk controls, chargeback tools, monitoring, and operational support help address the issues that can threaten processing stability.",
        icon: "shield",
      },
      {
        title: "People who stay involved",
        body: "From application through launch and ongoing operations, experienced people remain available when the business changes or an issue needs attention.",
        icon: "headset",
      },
    ] satisfies Feature[],
  },
  capabilities: {
    title: "The right capabilities for how you process.",
    // The live section is Gaming's; its Recurring billing item names gaming and is dropped (design spec §6).
    items: [
      {
        ...solutionPillar("Online payments"),
        title: "Online payments",
        body: `${keepTogether("High-velocity")} digital transaction acceptance.`,
        ...copiedFromGaming,
      },
      {
        ...solutionPillar("Fraud & risk tools"),
        title: "Fraud tools",
        body: `Monitoring built for ${keepTogether("high-frequency")} digital transactions.`,
        ...copiedFromGaming,
      },
      {
        ...solutionPillar("Network tokenization"),
        title: "Network tokenization",
        body: "Reduce exposure of stored payment data.",
        ...copiedFromGaming,
      },
      {
        // No menu page for APIs / integrations: Payment gateways is the nearest (design spec §6).
        ...solutionPillar("Payment gateways"),
        title: "APIs / integrations",
        body: "Connect payments directly into digital platforms.",
        ...copiedFromGaming,
      },
      {
        ...solutionPillar("Reporting"),
        title: "Reporting & analytics",
        body: `${keepTogether("Transaction-level")} visibility at scale.`,
        ...copiedFromGaming,
      },
    ] satisfies Capability[],
  },
  checklist: {
    title: "Built for the life of the account.",
    lead: "A durable payment program requires more than getting through underwriting. Beyond stays focused on the factors that affect processing health after launch.",
    items: [
      "Business classification review",
      "Evolving regulatory landscape",
      "Chargeback activity",
      `${keepTogether("Payment-method")} appropriateness`,
      "Fraud monitoring",
      "Account monitoring",
    ],
  },
  process: {
    id: "crb-process",
    title: "A repeatable process, built for complex commerce.",
    steps: [
      {
        title: "Understand",
        body: "We learn the business, products, customers, transaction flow, and processing requirements.",
      },
      {
        title: "Structure",
        body: "We determine the appropriate processing, payment methods, technology, and risk approach.",
      },
      { title: "Launch", body: "Our team works through application, underwriting, integration, and activation." },
      {
        title: "Support & optimize",
        body: "Once live, we remain involved with payment operations, risk, reporting, and opportunities to improve the program.",
      },
    ] satisfies Step[],
  },
  faq: { title: `Questions about ${keepTogether("cannabis-related")} business payments.` },
  related: {
    title: "Related industries",
    // The other featured complex industries, in menu order.
    items: featuredIndustries.filter((i) => i.slug !== "crb"),
  },
} satisfies IndustryDetailContent;

/**
 * Live CRB FAQ (21 Sept 2026), wording unchanged. Where the live answer ends in
 * "[Placeholder — confirm …]", the sentence before it is the answer; the CONFIRM note names the
 * open question with a "Cannabis-related businesses:" prefix, and the placeholder text itself is
 * never shown.
 */
export const crbFaqs: Faq[] = [
  {
    q: "Does Beyond support my specific type of cannabis-related business?",
    a: "Beyond evaluates cannabis-related and ancillary business models individually based on classification and business model.",
    confirm: true,
    note: "Cannabis-related businesses: current category appetite (live answer marked as a placeholder)",
  },
  {
    q: "Why is this category considered more complex for payment processing?",
    a: "Business classification, evolving requirements, and payment-method availability all require a more specialized underwriting approach.",
  },
  {
    q: "Is card acceptance available for cannabis-related businesses?",
    a: "Card acceptance availability depends on business classification, underwriting, and network rules, and is not guaranteed for every business type.",
    confirm: true,
    note: "Cannabis-related businesses: current payment-method availability by business classification (live answer marked as a placeholder)",
  },
  {
    q: "What documentation may be required?",
    a: "Underwriting typically reviews licensing, business classification, and the complete operating profile.",
    confirm: true,
    note: "Cannabis-related businesses: required underwriting documents (live answer marked as a placeholder)",
  },
  {
    q: "How are chargebacks handled?",
    a: "Beyond provides monitoring and dispute-management tools appropriate to the business model and payment methods in use.",
  },
  {
    q: "Can Beyond integrate with my existing POS or ecommerce platform?",
    a: "In many cases, yes.",
    confirm: true,
    note: "Cannabis-related businesses: compatibility with existing POS and ecommerce platforms (live answer marked as a placeholder)",
  },
  {
    q: "What happens if regulations affecting my business change?",
    a: "Our team stays involved to help adjust the payment environment as requirements evolve.",
  },
  {
    q: "What happens if my processing needs change over time?",
    a: "Beyond remains involved after launch to help adapt the payment program as the business grows or changes.",
  },
];
