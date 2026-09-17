import type { Capability, Feature, IndustryDetailContent, Step } from "@/types/content";
import { industriesBySlug } from "@/content/industries";

export const nutra = {
  meta: { title: "Nutra & supplement payments" },
  breadcrumb: [{ label: "Industries", href: "/industries" }, { label: "Nutra & supplements" }],
  hero: {
    title: "Nutra and supplement payments that keep up with your growth.",
    lead: "Fast-growing nutraceutical and supplement brands need payment infrastructure that understands ecommerce, recurring revenue, product review and changing volume.",
    expertCta: "Talk to a nutra payments expert",
  },
  realities: {
    title: "Nutra has its own payment realities.",
    items: [
      {
        title: "Product and claims review",
        body: "What you sell and how you market it matters during underwriting.",
        icon: "file-search",
      },
      {
        title: "Recurring commerce",
        body: "Subscription and auto-ship models need payment infrastructure built for ongoing billing.",
        icon: "repeat",
      },
      {
        title: "Ecommerce and card-not-present risk",
        body: "Most nutra brands sell online, so fraud controls and visibility matter more.",
        icon: "laptop",
      },
      {
        title: "Rapid growth",
        body: "Fast-scaling brands need a setup that grows with changing volume.",
        icon: "trending-up",
      },
    ] satisfies Feature[],
  },
  models: {
    title: "Business models we support.",
    chips: [
      "Nutraceutical ecommerce",
      "Supplement subscriptions",
      "Auto-ship / continuity programs",
      "Wellness product commerce",
      "Direct-to-consumer brands",
      "Other qualifying nutra businesses",
    ],
    disclaimer: "Eligibility is subject to underwriting.",
  },
  whyBeyond: {
    title: "Why Beyond.",
    features: [
      {
        title: "Underwriting that starts with understanding",
        body: "We look at your products, marketing and transaction flow before deciding how to set up processing.",
        icon: "file-search",
      },
      {
        title: "More ways to structure payments",
        body: "Processing paths and billing options matched to how your brand sells.",
        icon: "sliders",
      },
      {
        title: "Protect the processing relationship",
        body: "Chargeback and fraud tools built around recurring billing patterns.",
        icon: "shield",
      },
      {
        title: "People who stay involved",
        body: "The team keeps watching disputes, refunds and volume with you after launch.",
        icon: "headset",
      },
    ] satisfies Feature[],
  },
  capabilities: {
    title: "Tools for every stage of a nutra brand.",
    items: [
      { pillar: "Accept", title: "Online payments", body: "Ecommerce acceptance built for nutra checkout flows.", href: "/accept/online-payments" },
      { pillar: "Grow", title: "Recurring billing", body: "Support for subscription and auto-ship billing.", href: "/grow/recurring-billing" },
      { pillar: "Grow", title: "Working capital", body: "Capital options to help fund inventory and growth.", href: "/grow/working-capital" },
      { pillar: "Protect", title: "Chargeback protection", body: "Tools to help manage disputes tied to recurring billing.", href: "/protect/chargeback-protection" },
      { pillar: "Protect", title: "Fraud tools", body: "Transaction-level fraud monitoring for ecommerce.", href: "/protect/fraud-risk-tools" },
      { pillar: "Operate", title: "Reporting", body: "Visibility into recurring revenue and transaction trends.", href: "/operate/dashboard-reporting" },
    ] satisfies Capability[],
  },
  checklist: {
    title: "Built for the life of the account.",
    lead: "After launch, these are the signals we keep watching with you.",
    items: [
      "Chargeback activity",
      "Recurring billing and auto-ship patterns",
      "Refund and cancellation activity",
      "Volume changes",
      "Fraud monitoring",
      "Product and claims review",
    ],
  },
  process: {
    id: "nutra-process",
    title: "From first call to a healthy account.",
    steps: [
      { title: "Understand", body: "We start with your products, customers and how you sell." },
      { title: "Structure", body: "Align processing, billing and gateway technology with your model." },
      { title: "Launch", body: "Support the journey from application to your first transactions." },
      { title: "Support & optimize", body: "Stay involved with reporting, chargebacks and risk as you grow." },
    ] satisfies Step[],
  },
  faq: { title: "Nutra and supplement payment questions." },
  related: {
    title: "Related industries",
    items: industriesBySlug(["functional-mushroom", "kratom", "cbd-hemp", "ecommerce"]),
  },
} satisfies IndustryDetailContent;
