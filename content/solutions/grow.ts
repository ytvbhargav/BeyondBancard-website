import type { SolutionPageContent } from "@/types/content";
import { solutionBreadcrumb, solutionLinkAs } from "@/content/solutions/links";

/**
 * Grow Solutions hub (D-058). Copy is the live beyondbancard.com/grow/ page (captured
 * 21 Sept 2026), in live section order.
 *
 * Edits:
 * - Headings, card titles, feature titles, tags and link labels in sentence case; section h2s
 *   end with a full stop; straight apostrophes. "Beyond" → "Beyond Bancard" at the first mention
 *   (hero lead).
 * - Hero h1 is the live hero h2. Hero actions are the standard expert button and "Apply now"; the
 *   live "Talk to a Payments Expert" button is not used ("payments expert" names no specialist,
 *   so the default "Talk to an expert" label stays, as on the Accept hub).
 * - Hero mock card → HeroFile "Payments" (Illustration: no figures): the four tiles as label/value
 *   rows (Capital: Working capital, Sooner: Instant payouts, Predictable: Recurring billing, Lower
 *   cost: Cost-reduction); the card's footer line "More Flexibility to Run & Grow" becomes the
 *   subtitle. No status (the live card has none).
 * - "Four ways…" tiles → cards: the tile's small title is the card title, its heading the tagline,
 *   and "Explore …" the link label.
 * - Merchant economics chain → flow ("Funding" is the live dark node); the four labels under it
 *   ("Working Capital", "Instant Payouts", "Recurring Revenue", "Cost Reduction", set as h2s on the
 *   live page) → the flow's tags.
 * - The four "why" boxes → features (split).
 * - FAQ answers 3 and 7: the placeholder text is dropped and the answer flagged (C2).
 * - FAQ question 6: non-breaking spaces inside "Cash Discount" and "Dual Pricing" (typography
 *   only, the words are unchanged), so the question wraps between program names, not inside one.
 * - No related solutions: the live page has none, and the cards already link to every Grow page.
 *
 * Dropped:
 * - Eyebrows "Grow", "Four ways payments can work harder", "Merchant economics", "Why Grow with
 *   Beyond", "The bigger picture" and "FAQ" (D-003).
 * - Hero button "Explore Growth Solutions" (links to "#").
 * - The "why" section photo (C5).
 * - The Accept / Protect / Grow / Operate grid under the bigger picture (PillarLinks lists the other pillars).
 * - The FAQ footer "Still have questions? We're happy to help." and its "Ready To Get Started?"
 *   button (the template's FAQ line and closing band cover both).
 *
 * Live-site issues:
 * - Hero button "Explore Growth Solutions" links to "#".
 * - FAQ answers 3 and 7 show their placeholders: "[Placeholder — TODO: VERIFY WITH BEYOND FUNDING
 *   PROGRAM.]" and "[Placeholder — TODO: VERIFY WITH BEYOND.]".
 */
export const grow = {
  meta: { title: "Grow" },
  pillar: "Grow",
  kind: "hub",
  breadcrumb: solutionBreadcrumb("Grow"),
  hero: {
    title: "Put your payments to work.",
    lead: "Payments shouldn't only move money. Beyond Bancard helps businesses improve cash flow, access growth capital, build recurring revenue, and reduce the cost of getting paid.",
    visual: {
      title: "Payments",
      subtitle: "More flexibility to run & grow",
      tag: "Illustration",
      fields: [
        { label: "Capital", value: "Working capital" },
        { label: "Sooner", value: "Instant payouts" },
        { label: "Predictable", value: "Recurring billing" },
        { label: "Lower cost", value: "Cost-reduction" },
      ],
    },
  },
  blocks: [
    {
      kind: "cards",
      title: "More than moving money from customer to merchant.",
      cards: [
        {
          title: "Working capital",
          tagline: "Put capital behind the next opportunity.",
          body: "Access business funding designed around the performance and needs of your business so you can invest in inventory, equipment, hiring, expansion, and other growth opportunities.",
          link: solutionLinkAs("Working capital", "Explore working capital"),
        },
        {
          title: "Instant payouts",
          tagline: "Stop waiting for money you've already earned.",
          body: "Give eligible merchants faster access to card-sale proceeds when timing matters — without treating earned revenue like a loan.",
          link: solutionLinkAs("Instant payouts", "Explore instant payouts"),
        },
        {
          title: "Recurring billing",
          tagline: "Turn repeat business into predictable revenue.",
          body: "Automate scheduled payments for subscriptions, memberships, service plans, retainers, and other recurring customer relationships.",
          link: solutionLinkAs("Recurring billing", "Explore recurring billing"),
        },
        {
          title: "Cost-reduction programs",
          tagline: "Keep more of every sale.",
          body: "Explore Cash Discount, Dual Pricing, Surcharging, and other eligible strategies designed to reduce or offset the cost of accepting card payments.",
          link: solutionLinkAs("Cost-reduction programs", "Explore cost-reduction programs"),
        },
      ],
    },
    {
      kind: "flow",
      title: "The transaction is only part of the equation.",
      lead: "The way money enters, moves through, and leaves the business affects far more than payment acceptance. Beyond helps merchants look at the complete financial flow around the transaction.",
      nodes: [
        { label: "Sales" },
        { label: "Processing" },
        { label: "Funding" },
        { label: "Operating cash" },
        { label: "Reinvestment" },
      ],
      focus: 2,
      // The four levers listed under the live chain.
      tags: ["Working capital", "Instant payouts", "Recurring revenue", "Cost reduction"],
    },
    {
      kind: "features",
      layout: "split",
      title: "Payments as a financial layer, not just a transaction.",
      items: [
        {
          title: "Connected to payments",
          body: "Growth solutions work best when they are informed by the payment activity already happening through the business.",
          icon: "link",
        },
        {
          title: "Built around cash flow",
          body: "Choose capabilities that help address the timing and economics of money moving through the business.",
          icon: "wallet",
        },
        {
          title: "More than one lever",
          body: "Capital, faster funding, recurring payments, and cost-reduction strategies solve different financial needs.",
          icon: "sliders",
        },
        {
          title: "People who help structure it",
          body: "Beyond helps merchants evaluate the available options and determine what makes sense for the business.",
          icon: "headset",
        },
      ],
    },
  ],
  bigPicture: {
    title: "Grow is what payments make possible.",
    lead: "Beyond's broader payments ecosystem connects acceptance, protection, and operations around the same growth capabilities.",
  },
  faq: {
    title: "Grow questions.",
    items: [
      {
        q: "What Grow solutions does Beyond offer?",
        a: "Working Capital, Instant Payouts, Recurring Billing, and Cost-Reduction Programs (Cash Discount, Dual Pricing, and Surcharging).",
      },
      {
        q: "What's the difference between Working Capital and Instant Payouts?",
        a: "Working Capital provides additional funding that may involve repayment; Instant Payouts accelerate access to revenue you've already earned and are not financing.",
      },
      {
        q: "Can payment processing history help determine funding eligibility?",
        a: "Processing history can be one input into a funding evaluation.",
        confirm: true,
        note: "Grow: how processing history is used in funding eligibility, to verify with the Beyond funding program (live answer marked as a placeholder)",
      },
      {
        q: "What is recurring billing?",
        a: "A way to automate scheduled payments for subscriptions, memberships, service plans, retainers, and other repeat relationships.",
      },
      {
        q: "What are cost-reduction programs?",
        a: "Pricing strategies — like Cash Discount, Dual Pricing, and Surcharging — designed to help reduce or offset the cost of accepting card payments.",
      },
      {
        q: "What's the difference between Cash\u00a0Discount, Dual\u00a0Pricing, and Surcharging?",
        a: "Each is a different program structure with different eligibility, disclosure, and configuration requirements — see our Cost-Reduction Programs comparison for details.",
      },
      {
        q: "Can every business use a cost-reduction program?",
        a: "Eligibility depends on the specific program, payment methods, card network rules, and jurisdiction.",
        confirm: true,
        note: "Grow: which businesses are eligible for each cost-reduction program, to verify with Beyond (live answer marked as a placeholder)",
      },
      {
        q: "Which Grow solution is right for my business?",
        a: "It depends on whether your priority is capital, faster access to earned funds, predictable recurring revenue, or lower acceptance costs — a conversation with our team can help map the right fit.",
      },
    ],
  },
} satisfies SolutionPageContent;
