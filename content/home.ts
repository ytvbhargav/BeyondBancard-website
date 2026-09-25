import type { Confirmable, Step } from "@/types/content";
import { solutionsMenu } from "@/content/site";
import { lifecycleSteps, riskFactors } from "@/content/high-risk";

export const home = {
  hero: {
    title: "The processor that says yes.",
    /**
     * The live site's own supporting copy, near-verbatim (D-064). The earlier
     * line led on merchants "other processors turn away", which positions
     * Beyond as the place you go once you have been rejected; the offer is
     * broader than that, so the emphasis moves to underwriting by people and
     * the breadth of what is supported.
     */
    lead: "Every industry deserves a processor that actually approves them. Beyond Bancard reviews applications with real underwriters, supports traditional and complex businesses alike, and gives agents a program worth building on.",
    /** The live hero's three promises. Company metrics belong in By the Numbers, not here. */
    facts: [
      { value: "Transparent, flat-rate pricing" },
      { value: "Approvals in as little as 24 hours", confirm: true, note: "24-hour approvals: timing to confirm" },
      { value: "Dedicated support, seven days a week" },
    ] satisfies Confirmable<string>[],
    /**
     * The industries the line above the CTAs cycles through (D-068). No
     * lead-in: the headline has just said "says yes", and repeating it under
     * the device made the hero say the same thing twice. A deliberate mix: the specialised categories Beyond is known for, and the
     * everyday ones it processes just as readily, so the hero never reads as a
     * high-risk-only processor.
     */
    industries: [
      "eCommerce",
      "Gaming",
      "Retail",
      "Nutra & supplements",
      "Restaurants",
      "Travel",
      "Subscriptions",
      "Cannabis (CRB)",
      "Professional services",
      "RUO peptides",
      "Card-not-present",
      "Adult (18+)",
    ],
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

  /**
   * Credibility band (D-066). The sponsor-bank and gateway marquee that used
   * to sit here is gone: those relationships matter operationally but not to a
   * merchant choosing a processor, and the required ISO/MSP disclosure belongs
   * in the footer, which is where it is. What replaces it is four
   * merchant-facing reasons to trust Beyond, on the way from the hero's
   * promise into what Beyond actually does.
   *
   * Not the company metrics: those get their own By the Numbers section later
   * on the page, and saying them twice spends them.
   */
  trust: {
    items: [
      { value: "20+ years of payments expertise", confirm: true, note: "20+ years in payments" },
      { value: "U.S.-based support" },
      { value: "Flexible payment solutions" },
      { value: "Expertise across complex industries" },
    ] satisfies Confirmable<string>[],
  },

  pillars: {
    /**
     * Merchant-facing rather than relationship-led (D-065). "One partner for
     * the whole life of your account" asked to be believed before anything had
     * been shown, and "approval is only the start" carried the hero's
     * underwriting theme into a second section; the breadth of the offer is
     * the value proposition, so the copy states it and names the four pillars
     * before the reader reaches the first card.
     */
    title: "Everything you need to move your business forward.",
    lead: "Accept payments. Protect every transaction. Grow your business. Simplify how you operate. Beyond brings it all together.",
    items: solutionsMenu.map((c) => ({ ...c, links: c.links.slice(0, 4) })),
  },

  /**
   * The four pillar cards (D-065), to the approved design: a numbered eyebrow,
   * the pillar, its line, a paragraph, the chips and the way in. The artwork is
   * one rendered set sharing its materials, lighting and blue, so
   * Accept → Protect → Grow → Operate reads as one story rather than four
   * unrelated pictures; it is decorative, since each card is already named by
   * its heading, so it carries an empty alt.
   */
  pillarCards: {
    Accept: {
      index: "01",
      eyebrow: "Accept payments",
      body: "Meet your customers wherever they pay. Bring in-person, online, mobile, and business payments together with solutions built around your business.",
      art: "/home/accept.webp",
    },
    Protect: {
      index: "02",
      eyebrow: "Protect transactions",
      body: "Build confidence into every payment. Add layers of security that help safeguard customer data, reduce fraud, and manage chargebacks.",
      art: "/home/protect.webp",
    },
    Grow: {
      index: "03",
      eyebrow: "Grow your business",
      body: "Put your payments to work. Explore funding, build recurring revenue, and find smarter ways to manage payment costs and access your money.",
      art: "/home/grow.webp",
    },
    Operate: {
      index: "04",
      eyebrow: "Simplify operations",
      body: "Bring your payment operation together. Connect your hardware, reporting, and everyday tools for a clearer view of your business and a simpler day-to-day.",
      art: "/home/operate.webp",
    },
  } as Record<string, { index: string; eyebrow: string; body: string; art: string }>,

  industries: {
    title: "Built for complex commerce.",
    /** The live homepage's own industries copy (D-069). */
    lead: "From regulated products and recurring commerce to high-growth digital and card-not-present businesses, Beyond Bancard combines deep industry knowledge with the infrastructure, underwriting expertise, and operational support required to build durable payment programs.",
    chipsLabel: "More industries we serve:",
  },

  process: {
    title: "How we get you approved, and keep you processing.",
    steps: [{ title: "Apply", body: lifecycleSteps[0].body }, ...lifecycleSteps.slice(1)] satisfies Step[],
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
