import type { Confirmable, Step } from "@/types/content";
import { solutionsMenu } from "@/content/site";
import { lifecycleSteps, riskFactors } from "@/content/high-risk";

export const home = {
  hero: {
    title: "The processor that says yes.",
    lead: "Merchant accounts for businesses other processors turn away, and for everyday businesses too. We underwrite how your business actually works, then stay involved long after approval.",
    facts: [
      { value: "20+ years in payments", confirm: true, note: "20+ years in payments" },
      { value: "Nationwide coverage" },
      { value: "Declined elsewhere? You can still apply" },
    ] satisfies Confirmable<string>[],
  },

  underwriting: {
    label: "Example application",
    title: "New merchant application",
    industry: "Nutra & Supplements",
    fields: [
      { label: "Sales channel", value: "Online, card-not-present" },
      { label: "Billing", value: "Recurring subscription" },
      { label: "Monthly volume", value: "$250,000", featured: true },
      { label: "Prior processor", value: "Declined" },
    ],
    checks: ["Business model review", "Transaction profile", "Chargeback history", "Risk structuring"],
  },

  trust: {
    label: "Registered ISO/MSP of Esquire Bank, Merrick Bank and Mission Valley Bank",
    badges: [
      { value: "Esquire Bank" },
      { value: "Merrick Bank" },
      { value: "Mission Valley Bank" },
      { value: "BBB Accredited Business", confirm: true, note: "Permission to display BBB accreditation" },
      { value: "Authorize.net" },
      { value: "NMI" },
      { value: "USAePay" },
      { value: "Clover" },
    ] satisfies Confirmable<string>[],
    stat: { value: "15,000+ merchants", confirm: true, note: "15,000+ merchants" },
  },

  pillars: {
    title: "One partner for the whole life of your account.",
    lead: "Approval is only the start. Beyond helps you take payments, protect them, fund growth and run the day-to-day.",
    items: solutionsMenu.map((c) => ({ ...c, links: c.links.slice(0, 4) })),
  },

  industries: {
    title: "Built for complex commerce.",
    lead: "Deep experience in regulated and emerging categories, where a generic merchant account usually falls short.",
    chipsLabel: "Everyday businesses too:",
  },

  process: {
    title: "How we get you approved, and keep you processing.",
    steps: [
      { title: "Apply", body: lifecycleSteps[0].body },
      ...lifecycleSteps.slice(1),
    ] satisfies Step[],
    panelTitle: "What underwriters look at",
    factors: riskFactors.map(({ title, icon }) => ({ title, icon })),
  },

  partners: {
    title: "Partner with Beyond.",
    lead: "Training, marketing support and competitive economics for the people who bring merchants to us.",
    loginLine: "Already a partner?",
    loginLabel: "Log in to the partner portal",
  },

  testimonials: {
    title: "What merchants say.",
  },

  technology: {
    title: "Works with the tools you already use.",
    body: "Connect to leading gateways and popular commerce platforms, including Shopify, WooCommerce and Squarespace.",
    equipment: {
      value: "Equipment is available across nine hardware brands, from countertop POS to mobile readers.",
      confirm: true,
      note: "Nine hardware brands",
    } satisfies Confirmable<string>,
    gateways: ["Authorize.net", "NMI", "USAePay", "Clover"],
  },

  faq: { title: "Questions merchants ask." },
};
