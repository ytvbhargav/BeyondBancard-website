import type { Capability, Feature, IndustryDetailContent, Step } from "@/types/content";
import { featuredIndustries } from "@/content/industries";
import { solutionsMenu } from "@/content/site";

/**
 * Pillar and link for a capability, taken from the Solutions menu so both follow the
 * site IA (the live page files Recurring billing under Accept; the menu has it under Grow).
 * A renamed menu item fails the build here instead of linking to the wrong page.
 * New industry files should follow this approach (content/nutra.ts still hardcodes both).
 */
function solution(menuLabel: string): Pick<Capability, "pillar" | "href"> {
  for (const column of solutionsMenu) {
    const link = column.links.find((l) => l.label === menuLabel);
    if (link) return { pillar: column.pillar, href: link.href };
  }
  throw new Error(`adult capabilities: no "${menuLabel}" link in solutionsMenu`);
}

/**
 * Keeps a hyphenated compound on one line by putting a word joiner (U+2060, invisible,
 * no glyph needed) after each hyphen. Archivo and IBM Plex have no U+2011 glyph, so a
 * non-breaking hyphen would render from a fallback font. The text is otherwise unchanged.
 */
function keepTogether(compound: string): string {
  return compound.replaceAll("-", "-\u2060");
}

/**
 * Adult industry page (D-057). Copy is the live beyondbancard.com/industries/adult page
 * (captured 17 Sept 2026), headings in sentence case. Section labels that sit above the
 * live headings are not repeated as eyebrows (D-003). "Business models we support" stays the
 * chip band title (it describes the chips better than the live heading); Why Beyond uses the
 * live heading and lead, since the label alone left the sticky column empty. FAQs are `adultFaqs`.
 */
/** Labels for the hero illustration (SubscriptionDashboard), both from this page's own copy: a business model and a capability. */
export const adultVisual = { business: "Subscription content", ordersLabel: "Recurring billing" };

export const adult = {
  meta: { title: "Adult payments" },
  breadcrumb: [{ label: "Industries", href: "/industries" }, { label: "Adult" }],
  hero: {
    title: "Payments built for the realities of adult commerce.",
    // Live wording; "Beyond Bancard" on first mention (PRD §10.5).
    lead: `Adult businesses face payment challenges most processors aren't structured to handle. Beyond Bancard brings ${keepTogether("industry-aware")} underwriting, flexible payment technology, risk capabilities, and experienced support together to build a more durable processing environment.`,
  },
  realities: {
    title: "Adult commerce has its own payment realities.",
    items: [
      {
        title: `${keepTogether("Card-not-present")} commerce`,
        body: "Many adult businesses operate primarily online, increasing the importance of secure acceptance, fraud controls, and transaction visibility.",
        icon: "laptop",
      },
      {
        title: "Recurring transactions",
        body: "Subscriptions and repeat billing require payment infrastructure designed around ongoing customer relationships.",
        icon: "repeat",
      },
      {
        title: "Chargeback exposure",
        body: "Descriptors, cancellations, fraud, and disputes can materially affect processing health.",
        icon: "receipt",
      },
      {
        title: "Category-specific underwriting",
        body: "Content, products, fulfillment, policies, marketing, and transaction characteristics all matter during underwriting.",
        icon: "file-search",
      },
    ] satisfies Feature[],
  },
  models: {
    title: "Business models we support.",
    chips: [
      "Adult ecommerce",
      "Digital content",
      "Subscription content",
      "Dating",
      "Entertainment",
      "Adult retail",
      "Other qualifying adult businesses",
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
        ...solution("Online payments"),
        title: "Online payments",
        body: `Secure ecommerce and ${keepTogether("card-not-present")} acceptance.`,
      },
      {
        ...solution("Recurring billing"),
        title: "Recurring billing",
        body: "Infrastructure built around subscriptions and repeat billing.",
      },
      {
        ...solution("Network tokenization"),
        title: "Network tokenization",
        body: "Reduce exposure of sensitive payment data.",
      },
      {
        ...solution("Chargeback protection"),
        title: "Chargeback protection",
        body: "Tools built to help manage disputes and descriptors.",
      },
      {
        ...solution("Fraud & risk tools"),
        title: "Fraud tools",
        body: "Transaction-level visibility and fraud controls.",
      },
      {
        ...solution("Reporting"),
        title: "Reporting & analytics",
        body: "Visibility into transaction activity and account health.",
      },
    ] satisfies Capability[],
  },
  checklist: {
    title: "Built for the life of the account.",
    lead: "A durable payment program requires more than getting through underwriting. Beyond stays focused on the factors that affect processing health after launch.",
    items: [
      "Chargeback activity",
      "Descriptor management",
      "Recurring billing patterns",
      "Refund activity",
      "Fraud monitoring",
      "Processing volume changes",
    ],
  },
  process: {
    id: "adult-process",
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
  faq: { title: "Questions about adult payments." },
  related: {
    title: "Related industries",
    // The other featured complex industries, in menu order.
    items: featuredIndustries.filter((i) => i.slug !== "adult"),
  },
} satisfies IndustryDetailContent;
