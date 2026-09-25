import type { Feature, IconName, Step } from "@/types/content";

export const riskFactors: (Feature & { icon: IconName })[] = [
  { title: "Industry and products", body: "Some business types receive closer review.", icon: "package" },
  { title: "Card-not-present sales", body: "Online and remote sales carry more fraud and dispute risk.", icon: "laptop" },
  { title: "Recurring billing", body: "Subscriptions add lifecycle and chargeback considerations.", icon: "repeat" },
  { title: "Higher ticket sizes", body: "Larger sales mean larger financial exposure.", icon: "receipt" },
  { title: "Chargeback history", body: "Past dispute patterns shape account health.", icon: "file-search" },
  { title: "International activity", body: "Cross-border customers add complexity.", icon: "globe" },
];

export const lifecycleSteps: Step[] = [
  { title: "Application", body: "Tell us how your business sells and what you need." },
  { title: "Underwriting", body: "Experienced reviewers assess your full business profile." },
  { title: "Launch", body: "We set up the right processing path, gateway and tools." },
  { title: "Monitor", body: "We watch disputes, fraud, funding and volume with you." },
  { title: "Optimize", body: "As you grow, we adjust your setup to keep the account healthy." },
];

export const highRisk = {
  breadcrumb: [
    { label: "Solutions" },
    { label: "Accept", href: "/accept" },
    { label: "High-risk processing" },
  ],
  hero: {
    title: "High-risk merchant accounts built for how your business really works.",
    lead: "Complex industries need more than a generic merchant account. Beyond Bancard combines experienced underwriting, multiple processing paths, risk tools and ongoing support to build a processing setup that lasts.",
    expertCta: "Talk to a high-risk expert",
  },
  heroCard: {
    label: "Example application",
    title: "Merchant application",
    industry: "Subscription ecommerce",
    fields: [
      { label: "Sales channel", value: "Online, card-not-present" },
      { label: "Billing", value: "Recurring" },
      { label: "Chargeback history", value: "Under review" },
    ],
    checks: ["Business model review", "Transaction profile", "Chargeback history", "Risk structuring"],
  },
  riskFactors: {
    title: "Risk is more than an industry label.",
    lead: "Processors and sponsor banks look at your whole business and transaction profile. Understanding these factors is the first step to the right setup.",
  },
  philosophy: {
    title: "We start with how your business actually works.",
    body: "Beyond looks past the category name to your products, customers, transaction flow, fulfillment, marketing and processing history.",
    features: [
      {
        title: "Multiple processing paths",
        body: "More than one way to structure processing, so the setup fits your business model.",
        icon: "sliders",
      },
      {
        title: "Recurring commerce support",
        body: "Subscription and ongoing billing models are supported for qualifying merchants.",
        icon: "repeat",
      },
      {
        title: "Risk tools built in",
        body: "Chargeback protection, 3D Secure and fraud tools are available as part of your setup.",
        icon: "shield",
      },
      {
        title: "Experienced people who stay involved",
        body: "Experienced reviewers assess your business, and the team stays involved after launch.",
        icon: "headset",
      },
    ] satisfies Feature[],
  },
  featured: {
    title: "Featured complex industries.",
    lead: "Categories where Beyond has particular depth.",
    chipsLabel: "Also supported:",
  },
  lifecycle: {
    title: "Built for the life of the account.",
    lead: "A healthy processing relationship needs ongoing attention to disputes, fraud, funding, volume and account changes. Beyond stays involved after launch.",
  },
  related: {
    title: "Related solutions",
    links: [
      { label: "Online payments", href: "/accept/online-payments" },
      { label: "ACH & eCheck", href: "/accept/ach-echeck" },
      { label: "Payment gateways", href: "/operate/payment-gateways" },
      { label: "Chargeback protection", href: "/protect/chargeback-protection" },
      { label: "3D Secure", href: "/protect/3d-secure" },
      { label: "Fraud & risk tools", href: "/protect/fraud-risk-tools" },
      { label: "Reporting", href: "/operate/dashboard-reporting" },
    ],
  },
  faq: { title: "High-risk processing questions." },
};
