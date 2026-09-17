import type { Faq } from "@/types/content";

export const homeFaqs: Faq[] = [
  {
    q: "Can I monitor my transactions?",
    a: "Yes. Our PCI-compliant, web-based payment gateway lets you monitor transactions 24/7.",
  },
  {
    q: "Can you work with businesses declined elsewhere?",
    a: "In many cases, yes. A decline from another processor doesn't automatically disqualify you.",
    confirm: true,
    note: "Appetite for merchants declined by other processors",
  },
  {
    q: "Do you offer equipment?",
    a: "Yes. We offer equipment across nine brands, from standalone restaurant POS to portable readers.",
    confirm: true,
    note: "Nine equipment brands",
  },
  {
    q: "How are my transactions kept secure?",
    a: "Transactions run through industry-leading gateways held to PCI compliance standards, and we hold multiple compliance certifications.",
    confirm: true,
    note: "Which compliance certifications are held",
  },
  {
    q: "Do you have a partner program?",
    a: "Yes. We support agent partners with training, marketing resources and competitive processing rates.",
  },
];

export const highRiskFaqs: Faq[] = [
  {
    q: "What makes a business high risk?",
    a: "Processors weigh your industry, chargeback history, transaction profile and how much you sell online, among other factors.",
  },
  {
    q: "What industries does Beyond support?",
    a: "Beyond has particular depth in adult, gaming, nutra and supplements, RUO peptides, travel and cannabis-related businesses, plus many everyday categories.",
    confirm: true,
    note: "Full list of supported industries",
  },
  {
    q: "Why are high-risk accounts underwritten differently?",
    a: "Dispute exposure, transaction patterns and regulatory considerations differ from conventional retail, so the review is more tailored.",
  },
  {
    q: "Are reserves always required?",
    a: "Reserve requirements depend on your business and underwriting outcome.",
    confirm: true,
    note: "Reserves policy",
  },
  {
    q: "Can high-risk merchants accept payments online?",
    a: "Yes. Online, card-not-present acceptance is available for many qualifying high-risk business models.",
  },
  {
    q: "Can Beyond work with businesses declined elsewhere?",
    a: "In many cases, yes. A decline from another processor doesn't automatically disqualify you.",
    confirm: true,
    note: "Appetite for merchants declined by other processors",
  },
  {
    q: "How long does underwriting take?",
    a: "Timing depends on your business and documentation.",
    confirm: true,
    note: "Underwriting timelines",
  },
];

export const nutraFaqs: Faq[] = [
  {
    q: "Does Beyond support my nutra or supplement business?",
    a: "Beyond reviews qualifying nutraceutical, supplement and wellness businesses individually.",
    confirm: true,
    note: "Nutra eligibility wording",
  },
  {
    q: "Why is this category more complex?",
    a: "Product and claims review, recurring billing and ecommerce fraud exposure all call for a more specialized review.",
  },
  {
    q: "What documents may be required?",
    a: "Underwriting typically reviews your product catalog, marketing claims, website and transaction profile.",
    confirm: true,
    note: "Required underwriting documents",
  },
  {
    q: "Can Beyond support subscription or auto-ship billing?",
    a: "Yes, recurring and auto-ship billing is supported for qualifying merchants.",
  },
  {
    q: "How are chargebacks handled?",
    a: "Beyond provides monitoring and dispute-management tools built around recurring billing patterns.",
  },
  {
    q: "Can Beyond work with my existing website or gateway?",
    a: "Answer to be supplied by Beyond Bancard.",
    confirm: true,
    note: "Compatibility with existing websites and gateways",
  },
  {
    q: "Are there restrictions on product claims?",
    a: "Yes. Marketing and product claims are reviewed during underwriting.",
    confirm: true,
    note: "Specific product claim restrictions",
  },
];

export const partnerFaqs: Faq[] = [
  {
    q: "Who can become a partner?",
    a: "Independent agents, ISOs, sales offices and referral partners.",
    confirm: true,
    note: "Eligible partner types",
  },
  {
    q: "Is there a cost to join?",
    a: "Partner resources are offered without the cost of registering.",
    confirm: true,
    note: "Cost to join (current site: \"without the cost of registering\")",
  },
  {
    q: "How are residuals paid?",
    a: "Answer to be supplied by Beyond Bancard.",
    confirm: true,
    note: "Residual payment schedule and method",
  },
  {
    q: "Can I submit high-risk merchants?",
    a: "Yes, subject to underwriting.",
  },
  {
    q: "What support do partners get?",
    a: "Relationship managers, training and marketing resources.",
  },
];

/* ------------------------------ Adult page (D-057) ------------------------------ */

/**
 * Live beyondbancard.com/industries/adult FAQ (17 Sept 2026), wording unchanged. Where the
 * live answer ends in "[Placeholder — confirm …]", the sentence before it is the answer; the
 * CONFIRM note names the open question with an "Adult:" prefix (every FAQ note lives in this
 * file, so the list needs the page), and the placeholder text itself is never shown.
 */
export const adultFaqs: Faq[] = [
  {
    q: "Does Beyond support my specific adult business model?",
    a: "Beyond evaluates adult ecommerce, content, subscription, dating, entertainment, and other qualifying models individually.",
    confirm: true,
    note: "Adult: current category appetite (live answer marked as a placeholder)",
  },
  {
    q: "Why is adult considered more complex for payment processing?",
    a: "Card-not-present transactions, recurring billing, and chargeback exposure all require a more specialized payment environment than conventional retail.",
  },
  {
    q: "What documentation may be required?",
    a: "Underwriting typically reviews the business model, website, policies, and transaction profile.",
    confirm: true,
    note: "Adult: required underwriting documents (live answer marked as a placeholder)",
  },
  {
    q: "What payment methods may be available?",
    a: "Available methods depend on the business model and underwriting outcome.",
    confirm: true,
    note: "Adult: payment methods available for this category (live answer marked as a placeholder)",
  },
  {
    q: "Can Beyond support recurring billing?",
    a: "Yes, recurring and subscription billing is a core capability for qualifying adult merchants.",
  },
  {
    q: "How are chargebacks handled?",
    a: "Beyond provides monitoring and dispute-management tools to help address chargeback activity as it happens.",
  },
  {
    // The live answer repeats the next question, so there is no answer to copy (same as the Nutra question).
    q: "Can Beyond integrate with my existing website or gateway?",
    a: "Answer to be supplied by Beyond Bancard.",
    confirm: true,
    note: "Adult: compatibility with existing websites and gateways (live answer repeats the next question)",
  },
  {
    q: "What happens if my processing needs change?",
    a: "Our team remains involved after launch to help adjust the payment environment as the business evolves.",
  },
];

/* ------------------------------- FAQ page (D-054) ------------------------------- */

/** A group of questions on the FAQ page. `id` is the section anchor (/faq#partners). */
export type FaqTopic = { id: string; title: string; faqs: Faq[] };

/**
 * Looks a question up by its exact wording, so the FAQ page shows the same objects
 * as the pages above (one source for each answer and its CONFIRM flag). A reworded
 * question fails the build here instead of silently dropping off the FAQ page.
 */
function pick(list: Faq[], q: string): Faq {
  const faq = list.find((f) => f.q === q);
  if (!faq) throw new Error(`faqTopics: no FAQ with the question "${q}"`);
  return faq;
}

/**
 * Every FAQ on the site, grouped for /faq. The "declined elsewhere" question appears
 * on both the homepage and High-risk pages; it is listed once, from highRiskFaqs, so
 * the Accounts topic speaks of "Beyond" throughout (same answer and note either way).
 * Topic titles are searched too, so they name only what every mode shows: in
 * production the security topic keeps just the monitoring answer.
 */
export const faqTopics: FaqTopic[] = [
  {
    id: "accounts",
    title: "Accounts and eligibility",
    faqs: [
      pick(highRiskFaqs, "Can Beyond work with businesses declined elsewhere?"),
      pick(highRiskFaqs, "What industries does Beyond support?"),
      pick(highRiskFaqs, "How long does underwriting take?"),
    ],
  },
  {
    id: "high-risk",
    title: "High-risk processing",
    faqs: [
      pick(highRiskFaqs, "What makes a business high risk?"),
      pick(highRiskFaqs, "Why are high-risk accounts underwritten differently?"),
      pick(highRiskFaqs, "Are reserves always required?"),
      pick(highRiskFaqs, "Can high-risk merchants accept payments online?"),
    ],
  },
  { id: "nutra", title: "Nutra and supplements", faqs: nutraFaqs },
  { id: "adult", title: "Adult", faqs: adultFaqs },
  {
    id: "security",
    title: "Technology and security",
    faqs: [
      pick(homeFaqs, "Can I monitor my transactions?"),
      pick(homeFaqs, "Do you offer equipment?"),
      pick(homeFaqs, "How are my transactions kept secure?"),
    ],
  },
  {
    id: "partners",
    title: "Partners",
    faqs: [pick(homeFaqs, "Do you have a partner program?"), ...partnerFaqs],
  },
];

/**
 * FAQ page copy. Strings with {placeholders} are filled in by FaqExplorer:
 * {count} a number, {term} the visitor's search, {phone} the phone number.
 * `one` / `other` pick the singular or plural sentence.
 */
export const faqPage = {
  breadcrumb: [{ label: "Resources" }, { label: "FAQ" }],
  hero: {
    title: "Questions merchants and partners ask.",
    // Also the meta description. It names no topics: production mode hides some of them until answers are confirmed.
    lead: "Search every answer about working with Beyond Bancard, or browse by topic.",
  },
  explorer: {
    search: {
      label: "Search questions",
      // Both terms match confirmed answers, so they find something in production mode too.
      placeholder: "Try “chargebacks” or “online”",
      clear: "Clear search",
    },
    count: {
      /** Beside the search label, and announced when the search is cleared. */
      all: { one: "1 question", other: "{count} questions" },
      /** Beside the search label while searching. */
      short: { one: "1 match", other: "{count} matches" },
      /** Announced while searching. */
      match: { one: "1 question matches “{term}”", other: "{count} questions match “{term}”" },
      /** Announced, and shown as the empty state's heading. */
      none: "No questions match “{term}”.",
    },
    noun: { one: "question", other: "questions" },
    topicsLabel: "Topics",
    empty: {
      // No phone here: the "Still have a question?" block beside (lg) or right below the empty state has it.
      body: "Try another word, or clear the search to see every question.",
    },
    help: {
      title: "Still have a question?",
      call: "Call {phone}",
      message: { label: "Send us a message", href: "/contact-us#contact-form" },
    },
    /** Demo-mode flag on a topic heading when every answer in it is unconfirmed. */
    topicNote: "Whole FAQ topic hidden in production until its answers are confirmed",
  },
};

export type FaqExplorerCopy = (typeof faqPage)["explorer"];
