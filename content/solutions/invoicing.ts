import type { SolutionPageContent } from "@/types/content";
import { ANSWER_TO_SUPPLY, solutionBreadcrumb, solutionLinkAs } from "@/content/solutions/links";

/**
 * Invoicing (D-058). Copy is the live beyondbancard.com/operate/invoicing/ page
 * (captured 21 Sept 2026), in live section order.
 *
 * Edits:
 * - Headings, feature titles, chips and link labels in sentence case ("Faster path to payment",
 *   "Healthcare / eligible services", "Recurring service relationships", "See payment links under
 *   online payments", …); section h2s end with a full stop; straight apostrophes. The curly quotes
 *   around "amount due" and "paid." stay as live.
 * - "Beyond" → "Beyond Bancard" at the first mention: neither the hero lead nor the sections name
 *   Beyond, so the first mention is the bigger picture lead ("Beyond Bancard's broader payments
 *   ecosystem…").
 * - Section labels above the headings ("Invoicing", "How it works", "Less chasing. More
 *   visibility.", "Where this fits", "Invoicing + payment links", "Invoicing + ACH", "The bigger
 *   picture", "FAQ") are not repeated as eyebrows (D-003).
 * - Hero h1 is the live hero h2. Hero actions are the standard expert button and "Apply now"; the
 *   live "Talk to a Payments Expert" names no specialist, so the default "Talk to an expert" label
 *   stays (as on the Operate hub). No hero visual: the live hero has no mock card (C6).
 * - "Make the path to payment shorter." → steps (a real sequence; the timeline numbers it),
 *   keeping the live anchor "invoicing" (the hero's "Explore Invoicing" button jumped here).
 * - The four boxes beside a photo → features (split) under the live h2 "Payment collection,
 *   closer to the billing workflow.". "Built for businesses that bill after the work." → chips.
 * - "The request and the path to pay it." and "Give larger invoices another way to move." → two
 *   callouts (§5) with the live paragraphs and buttons, linking to Online payments and ACH & eCheck.
 * - No related solutions: the live page has none.
 * - The bigger picture: Operate's heading and paragraph, as live; the lifecycle row (Accept,
 *   Protect, Grow, Operate) becomes the template's links to the other three pillars.
 * - FAQ answer 3 copies answer 2: the stand-in answer, flagged (C2). FAQ answers 1, 5, 6, 7 and 8:
 *   the placeholder text is dropped and the answer flagged (C2).
 *
 * Dropped:
 * - Hero button "Explore Invoicing" (an in-page jump to #invoicing).
 * - The 01–04 markers on the steps (the timeline numbers them).
 * - The "Less chasing. More visibility." section photo (C5).
 * - The FAQ footer "Still have questions? We're happy to help." and its "Ready To Get Started?"
 *   button (the template's FAQ line and closing band cover both).
 *
 * Live-site issues:
 * - FAQ answer 3 ("Can invoices be sent by email or text?") is a copy of answer 2: "Yes — customers
 *   can typically pay through a connected online payment flow.".
 * - FAQ answers 1, 5, 6, 7 and 8 show their placeholders: "[Placeholder — TODO: VERIFY WITH BEYOND
 *   on exact invoicing tool and features.]", "[Placeholder — TODO: VERIFY WITH BEYOND on exact
 *   tracking features.]", "[Placeholder — TODO: VERIFY WITH BEYOND; see also Recurring Billing.]"
 *   and "[Placeholder — TODO: VERIFY WITH BEYOND.]" (twice).
 */
export const invoicing = {
  meta: { title: "Invoicing" },
  pillar: "Operate",
  kind: "detail",
  breadcrumb: solutionBreadcrumb("Operate", "Invoicing"),
  hero: {
    title: "From invoice sent to payment received.",
    lead: "Create payment requests, give customers a convenient path to payment, and track billing activity without stitching together separate payment workflows.",
  },
  blocks: [
    {
      kind: "steps",
      // The live section anchor (the hero's "Explore Invoicing" button jumped here).
      id: "invoicing",
      title: "Make the path to payment shorter.",
      steps: [
        { title: "Create", body: "Build an invoice or payment request." },
        { title: "Send", body: "Deliver it by email, text, or link." },
        { title: "Pay", body: "The customer pays by card, ACH, or another supported method." },
        { title: "Track", body: "See what's paid, outstanding, and in progress." },
      ],
    },
    {
      kind: "features",
      layout: "split",
      title: "Payment collection, closer to the billing workflow.",
      items: [
        {
          title: "Faster path to payment",
          body: "Give customers a convenient way to move from request to payment.",
          icon: "zap",
        },
        {
          title: "Fewer manual steps",
          body: "Bring payment collection closer to the billing workflow.",
          icon: "link",
        },
        {
          title: "Flexible payment options",
          body: "Support eligible payment methods through the configured environment.",
          icon: "wallet",
        },
        {
          title: "Better tracking",
          body: "See payment and invoice activity without relying entirely on manual follow-up.",
          icon: "activity",
        },
      ],
    },
    {
      kind: "chips",
      title: "Built for businesses that bill after the work.",
      chips: [
        "Professional services",
        "B2B",
        "Contractors",
        "Healthcare / eligible services",
        "Field services",
        "Recurring service relationships",
      ],
    },
    {
      kind: "callout",
      title: "The request and the path to pay it.",
      body: "An invoice creates the business request. A payment link creates the digital path to payment. Together they can shorten the distance between “amount due” and “paid.”",
      link: solutionLinkAs("Online payments", "See payment links under online payments"),
    },
    {
      kind: "callout",
      title: "Give larger invoices another way to move.",
      body: "For appropriate billing environments, ACH and eCheck can give customers a bank-based way to pay larger invoices — without assuming it's always the lower-cost option.",
      link: solutionLinkAs("ACH & eCheck", "Explore ACH & eCheck"),
    },
  ],
  bigPicture: {
    title: "Operate is how it all runs day to day.",
    // First mention of Beyond on the page, so the full name (the hero lead doesn't name Beyond).
    lead: "Beyond Bancard's broader payments ecosystem connects acceptance, protection, and growth around the same operating layer.",
  },
  faq: {
    title: "Invoicing questions.",
    items: [
      {
        q: "Can I create and send invoices through Beyond?",
        a: "Yes — invoicing is part of the Operate solution family.",
        confirm: true,
        note: "Invoicing: the exact invoicing tool and features (live answer marked as a placeholder)",
      },
      {
        q: "Can customers pay invoices online?",
        a: "Yes — customers can typically pay through a connected online payment flow.",
      },
      {
        q: "Can invoices be sent by email or text?",
        a: ANSWER_TO_SUPPLY,
        confirm: true,
        note: "Invoicing: sending invoices by email or text (live answer copies the previous answer, on paying invoices online)",
      },
      {
        q: "Can customers pay by card or ACH?",
        a: "Supported payment methods depend on your configuration; both are common options for invoicing.",
      },
      {
        q: "Can I see which invoices have been paid?",
        a: "Yes — invoice status tracking is a core part of the invoicing workflow.",
        confirm: true,
        note: "Invoicing: the exact invoice tracking features (live answer marked as a placeholder)",
      },
      {
        q: "Can I schedule recurring invoices?",
        a: "Recurring invoicing capability depends on the specific tool.",
        confirm: true,
        note: "Invoicing: whether recurring invoices can be scheduled, and with which tool (live answer marked as a placeholder; it points to Recurring billing)",
      },
      {
        q: "Can invoices integrate with accounting software?",
        a: "Integration depends on your specific accounting platform and setup.",
        confirm: true,
        note: "Invoicing: which accounting platforms invoices integrate with (live answer marked as a placeholder)",
      },
      {
        q: "Can I customize invoices with my business information?",
        a: "Customization options depend on the specific invoicing tool.",
        confirm: true,
        note: "Invoicing: invoice customization options (live answer marked as a placeholder)",
      },
    ],
  },
} satisfies SolutionPageContent;
