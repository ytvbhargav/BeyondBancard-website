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
