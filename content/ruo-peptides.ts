import type { Capability, Faq, Feature, IndustryDetailContent, Step } from "@/types/content";
import type { UnderwritingCardProps } from "@/components/motion/UnderwritingCard";
import { featuredIndustries } from "@/content/industries";
import { solutionPillar } from "@/content/solutions/links";
import { keepTogether } from "@/lib/typography";

/**
 * RUO peptides industry page (D-058), in the Adult template (D-057). Copy is the live
 * beyondbancard.com/industries/ruo-peptides/ page (captured 21 Sept 2026), in live section order.
 *
 * Edits:
 * - Headings, reality titles, feature titles, capability titles and step titles in sentence case
 *   ("Product classification", "Website & marketing review", "Card-not-present commerce",
 *   "Business-model scrutiny", "Reporting & analytics", "Support & optimize", …); "Research Use
 *   Only" keeps its capitals (the page's defined term); section h2s end with a full stop; straight
 *   apostrophes. "Beyond" → "Beyond Bancard" at the first mention (hero lead).
 * - Hero h1 is the live hero h2. Hero actions are the expert button, labelled with the live "Talk
 *   to an RUO Payments Expert" in sentence case, and "Apply now"; the live "See Why It's Different"
 *   button (an in-page jump to #why-this-industry-is-different) is not used.
 * - Section labels above the headings ("Research Use Only Payment Solutions", "Why this industry
 *   is different", "Business models we support", "Why Beyond", "Payment capabilities", "Risk &
 *   processing health", "How it works", "FAQ") are not repeated as eyebrows (D-003). The realities'
 *   01–04 markers are dropped (not a sequence); the process timeline numbers its own steps.
 * - "Business models we support." is the chip band title in place of the live "Built around how
 *   your business actually operates." (as on Adult); the four model names, set as h2s on the live
 *   page, are the chips.
 * - Capabilities keep the live titles ("Fraud tools", "Reporting & analytics"); pillar and link
 *   come from the Solutions menu via solutionPillar() (the live pillars already match it).
 * - FAQ heading "Questions about RUO Peptides payments." → "Questions about RUO peptide payments."
 * - FAQ answers 1, 3, 5 and 7: the placeholder text is dropped and the answer flagged (C2).
 * - Hyphenated compounds carry word joiners (keepTogether) so they don't break at the hyphen.
 *
 * Dropped:
 * - The hero art and its "Research Use Only" caption, and the Why Beyond photo (C5).
 * - The capabilities lead "Connected directly to Beyond's core platform — Accept, Protect, Grow,
 *   and Operate — configured around what this industry actually needs." (the template has no
 *   capabilities lead, as on Adult).
 * - The FAQ footer "Still have questions? We're happy to help." and its "Ready To Get Started?"
 *   button (the template's FAQ line and closing band cover both).
 *
 * Live-site issues:
 * - FAQ answers show their placeholders: "[Placeholder — confirm current category appetite.]",
 *   "[Placeholder — confirm documentation checklist.]", "[Placeholder — confirm current supported
 *   methods for this category.]" and "[Placeholder — confirm current integration/gateway
 *   compatibility.]".
 * - The four business-model names are set as h2s on the live page.
 * - FAQ heading reads "Questions about RUO Peptides payments.".
 * - The browser title is the generic "Merchant Processing Service Provider - Online Processing".
 */
/**
 * Hero illustration (UnderwritingCard, static: the High-risk card's "In review" state, 2 of 4
 * checks). Every value is this page's own words: a business-model chip, the sales channel and
 * positioning, and the first four items of the account-health checklist. Row labels are drafted,
 * as on the High-risk card.
 */
export const ruoPeptidesVisual: Omit<UnderwritingCardProps, "mode" | "completed" | "className"> = {
  label: "Example application",
  title: "Merchant application",
  industry: "RUO peptide ecommerce",
  fields: [
    { label: "Sales channel", value: `Ecommerce, ${keepTogether("card-not-present")}` },
    { label: "Positioning", value: "Research Use Only" },
  ],
  checks: ["Business classification review", "Website and marketing content", "Chargeback activity", "Fraud monitoring"],
};

export const ruoPeptides = {
  meta: { title: "RUO peptide payments" },
  breadcrumb: [{ label: "Industries", href: "/industries" }, { label: "RUO Peptides" }],
  hero: {
    title: "Processing that understands Research Use Only.",
    // Live wording; "Beyond Bancard" on first mention (PRD §10.5).
    lead: "RUO peptide businesses require a payment partner that understands the distinction between research commerce and consumer therapeutic use. Beyond Bancard evaluates the complete business model — from products and website presentation to fulfillment and transaction activity — to build an appropriate payment environment for qualifying merchants.",
    expertCta: "Talk to an RUO payments expert",
  },
  realities: {
    title: "RUO peptides have their own payment realities.",
    items: [
      {
        title: "Product classification",
        body: "What is being sold and how it is positioned matters during underwriting.",
        icon: "package",
      },
      {
        title: "Website & marketing review",
        body: `Product descriptions, claims, policies, and ${keepTogether("customer-facing")} content can be relevant to underwriting.`,
        icon: "file-search",
      },
      {
        title: `${keepTogether("Card-not-present")} commerce`,
        body: "Most RUO peptide businesses operate digitally, increasing the importance of secure ecommerce acceptance.",
        icon: "laptop",
      },
      {
        title: `${keepTogether("Business-model")} scrutiny`,
        body: "Underwriting considers the complete operating and transaction profile, not just the product category.",
        icon: "briefcase",
      },
    ] satisfies Feature[],
  },
  models: {
    title: "Business models we support.",
    chips: [
      "RUO peptide ecommerce",
      "Research supply businesses",
      "Laboratory-focused commerce",
      "Other qualifying RUO businesses",
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
    items: [
      {
        ...solutionPillar("Online payments"),
        title: "Online payments",
        body: `Ecommerce acceptance for ${keepTogether("research-use")} product sales.`,
      },
      {
        ...solutionPillar("Fraud & risk tools"),
        title: "Fraud tools",
        body: `Transaction-level fraud monitoring for ${keepTogether("card-not-present")} sales.`,
      },
      {
        ...solutionPillar("Chargeback protection"),
        title: "Chargeback protection",
        body: "Tools to help manage disputes specific to this category.",
      },
      {
        ...solutionPillar("Reporting"),
        title: "Reporting & analytics",
        body: "Visibility into transaction activity and account health.",
      },
    ] satisfies Capability[],
  },
  checklist: {
    title: "Built for the life of the account.",
    lead: "A durable payment program requires more than getting through underwriting. Beyond stays focused on the factors that affect processing health after launch.",
    items: [
      "Business classification review",
      "Website and marketing content",
      "Chargeback activity",
      "Fraud monitoring",
      "Transaction pattern review",
    ],
  },
  process: {
    id: "ruo-peptides-process",
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
  faq: { title: "Questions about RUO peptide payments." },
  related: {
    title: "Related industries",
    // The other featured complex industries, in menu order.
    items: featuredIndustries.filter((i) => i.slug !== "ruo-peptides"),
  },
} satisfies IndustryDetailContent;

/**
 * Live RUO peptides FAQ (21 Sept 2026), wording unchanged. Where the live answer ends in
 * "[Placeholder — confirm …]", the sentence before it is the answer; the CONFIRM note names
 * the open question with an "RUO peptides:" prefix, and the placeholder text itself is never shown.
 */
export const ruoPeptidesFaqs: Faq[] = [
  {
    q: "Does Beyond support my specific RUO peptide business?",
    a: "Beyond evaluates qualifying RUO peptide and research-supply businesses individually, based on the complete business model.",
    confirm: true,
    note: "RUO peptides: current category appetite (live answer marked as a placeholder)",
  },
  {
    q: "Why is this category considered more complex for payment processing?",
    a: "Product classification, website presentation, and business-model scrutiny all require a more specialized underwriting approach than conventional ecommerce.",
  },
  {
    q: "What documentation may be required?",
    a: "Underwriting typically reviews the product catalog, website content, policies, and transaction profile.",
    confirm: true,
    note: "RUO peptides: required underwriting documents (live answer marked as a placeholder)",
  },
  {
    q: "Does Beyond require Research Use Only positioning?",
    a: "Yes. Website content, product descriptions, and marketing should maintain Research Use Only positioning throughout underwriting and processing.",
  },
  {
    q: "What payment methods may be available?",
    a: "Available methods depend on underwriting outcome.",
    confirm: true,
    note: "RUO peptides: payment methods available for this category (live answer marked as a placeholder)",
  },
  {
    q: "How are chargebacks handled?",
    a: "Beyond provides monitoring and dispute-management tools built around this category's transaction patterns.",
  },
  {
    q: "Can Beyond integrate with my existing website or gateway?",
    a: "In many cases, yes.",
    confirm: true,
    note: "RUO peptides: compatibility with existing websites and gateways (live answer marked as a placeholder)",
  },
  {
    q: "What happens if our website content needs to change?",
    a: "Our team can help review updated content as your business evolves to help maintain appropriate positioning.",
  },
];
