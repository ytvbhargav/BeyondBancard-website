import type { Capability, Faq, Feature, IndustryDetailContent, Step } from "@/types/content";
import type { UnderwritingCardProps } from "@/components/motion/UnderwritingCard";
import { featuredIndustries } from "@/content/industries";
import { solutionPillar } from "@/content/solutions/links";
import { keepTogether } from "@/lib/typography";

/**
 * Travel industry page (D-058). Copy is the live beyondbancard.com/industries/travel-payment-solutions/
 * page (captured 21 Sept 2026), in live section order, on the Adult template (D-057). FAQs are
 * `travelFaqs`; the hero illustration is `travelVisual`.
 *
 * Edits:
 * - Headings, feature titles, chips, capability titles and checklist items in sentence case
 *   ("Future delivery", "Higher tickets", "Card-not-present commerce", "Cancellations &
 *   chargebacks", "Reporting & analytics", "Support & optimize", "Questions about travel
 *   payments."); section h2s end with a full stop; straight apostrophes.
 * - "Beyond" → "Beyond Bancard" at the first mention (hero lead).
 * - Hero h1 is the live hero h2. Hero expert button "Talk to a Travel Payments Expert" → "Talk to
 *   a travel payments expert"; the second action is the standard "Apply now".
 * - Section labels above the headings ("Travel Payment Solutions", "Why this industry is
 *   different", "Why Beyond", "Payment capabilities", "Risk & processing health", "How it
 *   works", "FAQ") are not repeated as eyebrows (D-003). "Business models we support" stays the
 *   chip band title, as on Adult; the six model names, set as h2s on the live page, are the
 *   chips.
 * - Capability pillars and links come from the Solutions menu (`solutionPillar()`); here they
 *   match the live pillars. "Reporting & Analytics" links to Reporting and keeps its live title.
 * - Hyphenated compounds (card-not-present, higher-ticket, future-delivery, deposit-based) are
 *   kept on one line with `keepTogether`; FAQ text is left plain, as on Adult.
 * - Hero visual: the High-risk UnderwritingCard (static, "In review", 2 of 4 checks). Industry is
 *   the "Travel agencies" chip; row values are the page's words ("online or over the phone" from
 *   the realities, "advance or deposit-based" from FAQ 5, "Future delivery"); checks are the first
 *   four checklist items. Row labels are drafted, as on the High-risk card.
 * - FAQ answers 1, 3, 4, 7 and 8: the placeholder text is dropped and the answer flagged (C2).
 *
 * Dropped:
 * - Hero button "See Why It's Different" (an in-page jump to #why-this-industry-is-different).
 * - The hero badge "Built for Future Delivery" (the example card stands in).
 * - The chip band's live heading "Built around how your business actually operates." (the band
 *   title is "Business models we support.", as on Adult).
 * - The "why Beyond" photo (C5).
 * - The capabilities lead "Connected directly to Beyond's core platform — Accept, Protect, Grow,
 *   and Operate — configured around what this industry actually needs." (the capability section
 *   has no lead, as on Adult).
 * - The 01–04 markers on the realities (not a sequence) and the steps (the timeline numbers them).
 * - The FAQ footer "Still have questions? We're happy to help." and its "Ready To Get Started?"
 *   button (the closing band covers both).
 *
 * Live-site issues:
 * - FAQ answers 1, 3, 4, 7 and 8 show their placeholders: "[Placeholder — confirm current category
 *   appetite.]", "[Placeholder — confirm documentation checklist.]", "[Placeholder — confirm
 *   current supported methods.]", "[Placeholder — confirm current integration/gateway
 *   compatibility.]" and "[Placeholder — confirm specific disruption support process.]".
 * - The six business-model names are set as h2s.
 * - The browser title is the generic "Merchant Processing Service Provider - Online Processing".
 */
export const travel = {
  meta: { title: "Travel payments" },
  breadcrumb: [{ label: "Industries", href: "/industries" }, { label: "Travel" }],
  hero: {
    title: "Payments built for what happens before takeoff.",
    // Live wording; "Beyond Bancard" on first mention (PRD §10.5).
    lead: "Travel payments carry unique exposure because money often changes hands long before a trip is fulfilled. Beyond Bancard brings payment infrastructure, risk capabilities, and experienced support together for travel businesses managing complex transaction flows.",
    expertCta: "Talk to a travel payments expert",
  },
  realities: {
    title: "Travel has its own payment realities.",
    items: [
      {
        title: "Future delivery",
        body: "Payments may occur weeks or months before services are actually delivered.",
        icon: "calendar",
      },
      {
        title: "Higher tickets",
        body: "Travel transactions can create larger individual exposures than typical retail purchases.",
        icon: "banknote",
      },
      {
        title: `${keepTogether("Card-not-present")} commerce`,
        body: "Many bookings occur online or over the phone, increasing the importance of secure acceptance.",
        icon: "laptop",
      },
      {
        title: "Cancellations & chargebacks",
        body: "Changes, cancellations, service disruptions, and customer disputes can affect processing health.",
        icon: "receipt",
      },
    ] satisfies Feature[],
  },
  models: {
    title: "Business models we support.",
    chips: [
      "Travel agencies",
      "Tour operators",
      "Jet & charter",
      "Booking platforms",
      "Hotels",
      "Other qualifying travel businesses",
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
        body: `Booking and reservation acceptance for ${keepTogether("card-not-present")} sales.`,
      },
      {
        ...solutionPillar("ACH & eCheck"),
        title: "ACH & eCheck",
        body: `Alternative payment options for ${keepTogether("higher-ticket")} transactions.`,
      },
      {
        ...solutionPillar("Chargeback protection"),
        title: "Chargeback protection",
        body: `Tools built around cancellations and ${keepTogether("future-delivery")} disputes.`,
      },
      {
        ...solutionPillar("3D Secure"),
        title: "3D Secure",
        body: `Additional verification for ${keepTogether("card-not-present")} bookings.`,
      },
      {
        ...solutionPillar("Working capital"),
        title: "Working capital",
        body: "Capital options to help manage cash flow around future delivery.",
      },
      {
        ...solutionPillar("Reporting"),
        title: "Reporting & analytics",
        body: "Visibility into booking activity and account health.",
      },
    ] satisfies Capability[],
  },
  checklist: {
    title: "Built for the life of the account.",
    lead: "A durable payment program requires more than getting through underwriting. Beyond stays focused on the factors that affect processing health after launch.",
    items: [
      `${keepTogether("Future-delivery")} exposure`,
      "Cancellation and refund activity",
      "Chargeback activity",
      `${keepTogether("Higher-ticket")} transaction monitoring`,
      "Processing volume changes",
      "Fraud monitoring",
    ],
  },
  process: {
    id: "travel-payment-solutions-process",
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
  faq: { title: "Questions about travel payments." },
  related: {
    title: "Related industries",
    // The other featured complex industries, in menu order.
    items: featuredIndustries.filter((i) => i.slug !== "travel-payment-solutions"),
  },
} satisfies IndustryDetailContent;

/**
 * Hero illustration: the High-risk underwriting card, static and "In review" (2 of 4 checks).
 * Row labels are drafted as on the High-risk card; every value is this page's own words.
 */
export const travelVisual: Omit<UnderwritingCardProps, "mode" | "completed" | "className"> = {
  label: "Example application",
  title: "Merchant application",
  industry: "Travel agencies",
  fields: [
    // "Many bookings occur online or over the phone" (realities).
    { label: "Sales channel", value: "Online or over the phone" },
    // "Can Beyond support advance or deposit-based payments?" (FAQ 5).
    { label: "Billing", value: `Advance or ${keepTogether("deposit-based")}` },
    { label: "Fulfillment", value: "Future delivery" },
  ],
  // The first four items of the page's risk checklist.
  checks: travel.checklist.items.slice(0, 4),
};

/**
 * Live FAQ, wording unchanged. Where the live answer ends in "[Placeholder — confirm …]", the
 * sentence before it is the answer; the CONFIRM note names the open question with a "Travel:"
 * prefix, and the placeholder text itself is never shown.
 */
export const travelFaqs: Faq[] = [
  {
    q: "Does Beyond support my specific travel business model?",
    a: "Beyond evaluates travel agencies, tour operators, jet and charter, booking platforms, and hotels individually.",
    confirm: true,
    note: "Travel: current category appetite (live answer marked as a placeholder)",
  },
  {
    q: "Why is travel considered more complex for payment processing?",
    a: "Future delivery, higher ticket sizes, and cancellation exposure all require a more specialized payment environment.",
  },
  {
    q: "What documentation may be required?",
    a: "Underwriting typically reviews the business model, booking process, and transaction profile.",
    confirm: true,
    note: "Travel: the documentation checklist for underwriting (live answer marked as a placeholder)",
  },
  {
    q: "What payment methods may be available?",
    a: "Available methods depend on the business model and underwriting outcome.",
    confirm: true,
    note: "Travel: payment methods currently supported for this category (live answer marked as a placeholder)",
  },
  {
    q: "Can Beyond support advance or deposit-based payments?",
    a: "Yes, advance payment and deposit structures are common in travel and can be supported based on underwriting.",
  },
  {
    q: "How are chargebacks handled?",
    a: "Beyond provides monitoring and dispute-management tools built around cancellations and future-delivery disputes.",
  },
  {
    q: "Can Beyond integrate with my existing booking system?",
    a: "In many cases, yes.",
    confirm: true,
    note: "Travel: current integration and gateway compatibility with booking systems (live answer marked as a placeholder)",
  },
  {
    q: "What happens during major disruptions (e.g., mass cancellations)?",
    a: "Our team remains involved to help manage the payment environment through unusual disruption events.",
    confirm: true,
    note: "Travel: the specific support process during disruptions such as mass cancellations (live answer marked as a placeholder)",
  },
];
