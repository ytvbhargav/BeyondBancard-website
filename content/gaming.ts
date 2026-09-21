import type { Capability, Faq, Feature, IndustryDetailContent, Step } from "@/types/content";
import type { UnderwritingCardProps } from "@/components/motion/UnderwritingCard";
import { featuredIndustries } from "@/content/industries";
import { solutionPillar } from "@/content/solutions/links";
import { keepTogether } from "@/lib/typography";

/**
 * Gaming industry page (D-058), in the Adult template (D-057). Copy is the live
 * beyondbancard.com/industries/gaming/ page (captured 21 Sept 2026), in live section order.
 *
 * Edits:
 * - Headings, reality titles, feature titles, capability titles and step titles in sentence case
 *   ("Digital-first transactions", "Fraud & account risk", "Business-model-specific underwriting",
 *   "Underwriting that starts with understanding", "APIs / integrations", "Reporting & analytics",
 *   "Support & optimize", …); section h2s end with a full stop; straight apostrophes. "Beyond" →
 *   "Beyond Bancard" at the first mention (hero lead).
 * - Hero h1 is the live hero h2. Hero actions are the expert button, labelled with the live "Talk
 *   to a Gaming Payments Expert" in sentence case, and "Apply now"; the live "See Why It's
 *   Different" button (an in-page jump to #why-this-industry-is-different) is not used.
 * - Section labels above the headings ("Gaming Payment Solutions", "Why this industry is
 *   different", "Why Beyond", "Payment capabilities", "Risk & processing health", "How it works",
 *   "FAQ") are not repeated as eyebrows (D-003). The realities' 01–04 markers are dropped (not a
 *   sequence); the process timeline numbers its own steps.
 * - "Business models we support." is the chip band title in place of the live "Built around how
 *   your business actually operates." (as on Adult); the six model names, set as h2s on the live
 *   page, are the chips.
 * - Capabilities keep the live titles ("Fraud tools", "APIs / integrations", "Reporting &
 *   analytics"); pillar and link come from the Solutions menu via solutionPillar(), so Recurring
 *   billing sits under Grow (the live page files it under Accept). "APIs / integrations" has no
 *   page in the menu: it links to Payment gateways, under Operate (design spec §6).
 * - FAQ heading "Questions about Gaming payments." → "Questions about gaming payments."
 * - Hyphenated compounds in headings, cards, chips and the hero visual carry word joiners
 *   (keepTogether) so they don't break at the hyphen (FAQ wording is left as is, as on the
 *   sibling pages). "Business-model-specific" joins only "Business-model", so the reality title
 *   can still wrap in the narrow panel at 320px (the whole compound is wider than the column
 *   there).
 *
 * Dropped:
 * - The hero art and its "Built for Digital-First Commerce" caption, and the Why Beyond photo (C5).
 * - The capabilities lead "Connected directly to Beyond's core platform — Accept, Protect, Grow,
 *   and Operate — configured around what this industry actually needs." (the template has no
 *   capabilities lead, as on Adult) and the live pillar label on each capability (the tabs group
 *   by the menu's pillars).
 * - The FAQ footer "Still have questions? We're happy to help." and its "Ready To Get Started?"
 *   button (the template's FAQ line and closing band cover both).
 *
 * Live-site issues:
 * - The business models section carries the realities' label "Why this industry is different",
 *   and its six model names are set as h2s.
 * - The capability "APIs / Integrations" has no page in the Solutions menu, and Recurring Billing
 *   is labelled Accept (the menu files it under Grow).
 * - FAQ heading reads "Questions about Gaming payments.".
 * - The browser title is the generic "Merchant Processing Service Provider - Online Processing".
 */
/**
 * Hero illustration (UnderwritingCard, static: the High-risk card's "In review" state, 2 of 4
 * checks). Every value is this page's own words: a business-model chip as the industry, the sales
 * channel ("operate primarily online", "digital-first"), a second business-model chip under the
 * realities' "monetization" label, and the first four items of the account-health checklist.
 */
export const gamingVisual: Omit<UnderwritingCardProps, "mode" | "completed" | "className"> = {
  label: "Example application",
  title: "Merchant application",
  industry: "Digital gaming platforms",
  fields: [
    { label: "Sales channel", value: `Online, ${keepTogether("digital-first")}` },
    { label: "Monetization", value: `${keepTogether("In-game")} purchases` },
  ],
  checks: ["Transaction velocity", "Fraud monitoring", "Chargeback activity", "Account risk signals"],
};

export const gaming = {
  meta: { title: "Gaming payments" },
  breadcrumb: [{ label: "Industries", href: "/industries" }, { label: "Gaming" }],
  hero: {
    title: "Payment infrastructure built for gaming.",
    // Live wording; "Beyond Bancard" on first mention (PRD §10.5).
    lead: "Gaming businesses move fast. Their payments environment has to keep up. Beyond Bancard supports qualifying gaming models with flexible acceptance, fraud and risk capabilities, transaction visibility, and experienced underwriting.",
    expertCta: "Talk to a gaming payments expert",
  },
  realities: {
    title: "Gaming has its own payment realities.",
    items: [
      {
        title: `${keepTogether("Digital-first")} transactions`,
        body: "Gaming businesses operate primarily online, with transactions happening continuously across a digital customer base.",
        icon: "laptop",
      },
      {
        title: "Transaction velocity",
        body: "High transaction frequency requires infrastructure that can keep pace without compromising visibility or control.",
        icon: "gauge",
      },
      {
        title: "Fraud & account risk",
        body: `${keepTogether("Digital-first")} commerce brings fraud exposure that requires active monitoring and response.`,
        icon: "alert",
      },
      {
        title: `${keepTogether("Business-model")}-specific underwriting`,
        body: "The specific gaming model, monetization approach, and customer base all matter during underwriting.",
        icon: "file-search",
      },
    ] satisfies Feature[],
  },
  models: {
    title: "Business models we support.",
    chips: [
      "Digital gaming platforms",
      `${keepTogether("In-game")} purchases`,
      "Gaming subscriptions",
      "Esports commerce",
      "Gaming marketplaces",
      "Other qualifying gaming businesses",
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
        body: `${keepTogether("High-velocity")} digital transaction acceptance.`,
      },
      {
        ...solutionPillar("Recurring billing"),
        title: "Recurring billing",
        body: "Support for subscriptions and recurring gaming revenue models.",
      },
      {
        ...solutionPillar("Fraud & risk tools"),
        title: "Fraud tools",
        body: `Monitoring built for ${keepTogether("high-frequency")} digital transactions.`,
      },
      {
        ...solutionPillar("Network tokenization"),
        title: "Network tokenization",
        body: "Reduce exposure of stored payment data.",
      },
      {
        // No menu page for APIs / integrations: Payment gateways is the nearest (design spec §6).
        ...solutionPillar("Payment gateways"),
        title: "APIs / integrations",
        body: "Connect payments directly into digital platforms.",
      },
      {
        ...solutionPillar("Reporting"),
        title: "Reporting & analytics",
        body: `${keepTogether("Transaction-level")} visibility at scale.`,
      },
    ] satisfies Capability[],
  },
  checklist: {
    title: "Built for the life of the account.",
    lead: "A durable payment program requires more than getting through underwriting. Beyond stays focused on the factors that affect processing health after launch.",
    items: [
      "Transaction velocity",
      "Fraud monitoring",
      "Chargeback activity",
      "Account risk signals",
      "Processing volume changes",
      "Gateway performance",
    ],
  },
  process: {
    id: "gaming-process",
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
  faq: { title: "Questions about gaming payments." },
  related: {
    title: "Related industries",
    // The other featured complex industries, in menu order.
    items: featuredIndustries.filter((i) => i.slug !== "gaming"),
  },
} satisfies IndustryDetailContent;

/**
 * Live Gaming FAQ (21 Sept 2026), wording unchanged. No live answer carries a placeholder,
 * repeats its question or copies another answer, so none is flagged.
 */
export const gamingFaqs: Faq[] = [
  {
    q: "Why is payment processing different for gaming businesses?",
    a: "Gaming businesses often operate under additional underwriting and compliance requirements that can make payment processing more challenging than it is for traditional businesses. Specialized payment solutions help address those unique considerations.",
  },
  {
    q: "Can gaming businesses accept online payments?",
    a: "Yes. Depending on the business model and underwriting approval, gaming businesses can securely accept online credit card, debit card, and other supported payment methods.",
  },
  {
    q: "Can subscription-based gaming businesses accept recurring payments?",
    a: "Yes. Many payment solutions support recurring billing for memberships, subscriptions, and other ongoing payment arrangements, subject to approval.",
  },
  {
    q: "What information is needed to apply for payment processing?",
    a: "Applications typically require business information, ownership details, website information, banking information, estimated processing volume, and any additional documentation requested during underwriting.",
  },
  {
    q: "Can I switch processors if my current provider no longer supports my business?",
    a: "Yes. Businesses frequently change payment providers because of policy changes, service concerns, or changing processing requirements. We can help you explore available alternatives.",
  },
  {
    q: "How long does the approval process usually take?",
    a: "Approval times vary depending on the business, underwriting review, and any additional documentation that may be required before a decision is made.",
  },
  {
    q: "Can gaming businesses process payments from customers in multiple locations?",
    a: "Depending on your business model and approval, payment solutions may support transactions across multiple states and, where permitted, international markets.",
  },
  {
    q: "How do payment solutions help reduce fraud?",
    a: "Many payment platforms include fraud prevention tools, transaction monitoring, and security features designed to help identify suspicious activity and protect payment information.",
  },
  {
    q: "Will I receive support after my account is approved?",
    a: "Yes. Beyond Bancard provides ongoing customer support to help answer questions, address account concerns, and assist as your payment processing needs evolve.",
  },
  {
    q: "Why work with Beyond Bancard instead of a single payment processor?",
    a: "Our access to multiple banking partners allows us to explore a broader range of payment processing options, helping identify solutions that align with your business model and industry requirements.",
  },
];
