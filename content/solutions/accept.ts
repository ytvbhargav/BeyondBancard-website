import type { SolutionPageContent } from "@/types/content";
import { solutionBreadcrumb, solutionLinkAs } from "@/content/solutions/links";

/**
 * Accept hub (D-058). Copy is the live beyondbancard.com/accept/ page (captured
 * 21 Sept 2026), in live section order.
 *
 * Edits:
 * - Headings, card titles, chips and link labels in sentence case; section h2s end with a
 *   full stop; straight apostrophes. "Beyond" → "Beyond Bancard" at the first mention (hero lead).
 * - Hero actions are the standard expert button and "Apply now"; the live "Talk to a Payments
 *   Technology" and "Talk to a Payments Expert" buttons are not used ("payments expert" names no
 *   specialist, so the default "Talk to an expert" label stays).
 * - Hero mock card → HeroFile "Acceptance environment" (Illustration: no figures) with the live
 *   method chips and steps; "Connected" is the status.
 * - Solution tiles → cards, High-risk processing first as live; the tile's small title is the
 *   card title, its heading the tagline, and "Explore …" the link label.
 * - "Your customers don't think in payment channels." → hub: the six channels in, the live
 *   "BEYOND" node (a button linked to null) as the centre, the four results out.
 * - The bigger picture: the heading is Accept's own, "Accept is where the transaction starts." (as
 *   on every Accept solution page), with this page's paragraph.
 * - FAQ answers 5 and 7: the placeholder text is dropped and the answer flagged (C2).
 * - No related solutions: the live page has none, and the cards already link to every Accept page.
 *
 * Dropped:
 * - Eyebrows "Accept", "Payment operations", "Connected acceptance", "Why Operate with Beyond",
 *   "The bigger picture" and "FAQ" (D-003).
 * - Solution tile images and the "why" section photo (C5).
 * - The FAQ footer "Still have questions? We're happy to help." and its "Ready To Get Started?"
 *   button (the template's FAQ line and closing band cover both).
 * - The Accept / Protect / Grow / Operate grid under the bigger picture (PillarLinks lists the other pillars).
 *
 * Live-site issues:
 * - The bigger picture heading "Protect connects checkout to what happens after." is the Protect hub's.
 * - The "why" section label reads "Why Operate with Beyond" on the Accept page.
 * - Hero button "Talk to a Payments Technology" is an unfinished label (links to /contact-us/).
 * - The hub's "BEYOND" node is a button linked to null.
 * - FAQ answers 5 and 7 show their placeholders: "[Placeholder — confirm current integration/
 *   compatibility list.]" and "[Placeholder — TODO: VERIFY WITH BEYOND on current geographic coverage.]".
 */
export const accept = {
  meta: { title: "Accept" },
  pillar: "Accept",
  kind: "hub",
  breadcrumb: solutionBreadcrumb("Accept"),
  hero: {
    title: "Get paid. Anywhere. Any way.",
    lead: "From the checkout counter to online commerce, recurring payments, bank payments, international transactions, and complex merchant environments, Beyond Bancard brings payment acceptance together around the way your business operates.",
    visual: {
      title: "Acceptance environment",
      tag: "Illustration",
      status: { label: "Connected", tone: "neutral" },
      methods: [
        "Tap",
        "Chip",
        "Swipe",
        "PIN debit",
        "Wallets",
        "Ecommerce",
        "Payment links",
        "Virtual terminal",
        "ACH",
        "eCheck",
        "International",
        "High-risk",
      ],
      steps: [
        { label: "Accept", state: "done" },
        { label: "Process", state: "done" },
        { label: "Fund & report", state: "active" },
      ],
    },
  },
  blocks: [
    {
      kind: "cards",
      title: "Everything behind the transaction.",
      lead: "Accepting a payment is only the beginning. Beyond helps businesses connect the technology, workflows, and information needed to manage payments from checkout through funding and reconciliation.",
      cards: [
        {
          title: "High-risk processing",
          tagline: "Complex business model? Build the payment environment around it.",
          body: "Industry-aware underwriting and payment solutions designed for specialized, regulated, card-not-present, and harder-to-place businesses.",
          link: solutionLinkAs("High-risk processing", "Explore high-risk processing"),
        },
        {
          title: "Online payments",
          tagline: "Turn every digital interaction into an opportunity to get paid.",
          body: "Accept secure payments through ecommerce, payment links, recurring billing, virtual terminal, and connected gateway experiences.",
          link: solutionLinkAs("Online payments", "Explore online payments"),
        },
        {
          title: "In-person payments",
          tagline: "Make every checkout simpler.",
          body: "Accept tap, chip, swipe, PIN debit, and mobile wallets with payment technology designed around where your customers buy.",
          link: solutionLinkAs("In-person payments", "Explore in-person payments"),
        },
        {
          title: "ACH & eCheck",
          tagline: "Move money directly from the bank.",
          body: "Give customers an alternative to cards for recurring transactions, invoices, larger payments, and other eligible use cases.",
          link: solutionLinkAs("ACH & eCheck", "Explore ACH & eCheck"),
        },
        {
          title: "International payments",
          tagline: "Expand beyond borders.",
          body: "Build a payment program for businesses serving customers across international markets and more complex transaction environments.",
          link: solutionLinkAs("International payments", "Explore international payments"),
        },
        {
          title: "B2B payments",
          tagline: "Make commercial payments work harder.",
          body: "Support business-to-business transactions with commercial card acceptance, ACH, invoicing, and enhanced transaction data where available.",
          link: solutionLinkAs("B2B payments", "Explore B2B payments"),
        },
      ],
    },
    {
      kind: "hub",
      title: "Your customers don't think in payment channels.",
      lead: "Neither should your payment infrastructure. Beyond helps bring in-person, online, recurring, card-not-present, and bank payments into a connected processing environment.",
      inputs: [
        "Store / POS",
        "Website / ecommerce",
        "Payment link",
        "Virtual terminal",
        "ACH / eCheck",
        "Recurring billing",
      ],
      outputs: ["Processing", "Risk", "Funding", "Reporting"],
    },
    {
      kind: "features",
      layout: "split",
      title: "Built for more than the transaction.",
      items: [
        {
          title: "More ways to accept",
          body: "Cards, digital wallets, bank payments, recurring transactions, online and in-person commerce give you more ways to meet customers where they are.",
          icon: "credit-card",
        },
        {
          title: "Built around the business",
          body: "We structure acceptance around how you sell, how customers pay, and how transactions flow.",
          icon: "sliders",
        },
        {
          title: "Connected protection",
          body: "Acceptance can connect with tokenization, authentication, fraud controls, and chargeback capabilities.",
          icon: "shield",
        },
        {
          title: "Visibility after the transaction",
          body: "Reporting, funding, reconciliation, and merchant tools help you understand what happens after the payment is approved.",
          icon: "eye",
        },
      ],
    },
  ],
  bigPicture: {
    // Accept's own heading (the live hub shows Protect's); the paragraph is this page's.
    title: "Accept is where the transaction starts.",
    lead: "Beyond's broader payments ecosystem helps protect, fund, and operate what happens next.",
  },
  faq: {
    title: "Accept payments questions.",
    items: [
      {
        q: "What payment methods does Beyond support?",
        a: "Cards (tap, chip, swipe, PIN debit), digital wallets, ACH, eCheck, and online payment methods, depending on your business and setup.",
      },
      {
        q: "Can Beyond support both online and in-person payments?",
        a: "Yes — most merchants combine both, and Beyond can support a connected acceptance environment across channels.",
      },
      {
        q: "Can Beyond support high-risk businesses?",
        a: "Yes — high-risk processing is one of Beyond's core capabilities, backed by industry-aware underwriting.",
      },
      {
        q: "Does Beyond offer ACH and eCheck?",
        a: "Yes — bank-based payment options are available alongside card acceptance.",
      },
      {
        q: "Can I use my existing gateway or POS system?",
        a: "Compatibility depends on your specific setup.",
        confirm: true,
        note: "Accept: current integration/compatibility list (live answer marked as a placeholder)",
      },
      {
        q: "Can Beyond support recurring billing?",
        a: "Yes — recurring and subscription billing is supported across online and, where applicable, in-person environments.",
      },
      {
        q: "Does Beyond support international transactions?",
        a: "International acceptance capability depends on the specific business.",
        confirm: true,
        note: "Accept: current geographic coverage (live answer marked as a placeholder)",
      },
      {
        q: "How do I determine which payment setup is right for my business?",
        a: "A conversation with our team can help map your transaction environment to the right combination of acceptance capabilities.",
      },
    ],
  },
} satisfies SolutionPageContent;
