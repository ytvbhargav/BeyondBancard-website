import type { SolutionPageContent } from "@/types/content";
import { solutionBreadcrumb, solutionLink } from "@/content/solutions/links";

/**
 * Virtual terminal (D-058). Copy is the live beyondbancard.com/operate/virtual-terminal/ page
 * (captured 21 Sept 2026), in live section order.
 *
 * Edits:
 * - Headings, feature titles, step titles, chips, column titles and hero mock labels in sentence
 *   case ("Phone orders", "Back-office payments", "Mail / remote orders", "Enter transaction",
 *   "Customer profiles", "Transaction history", "Payment gateway", "Key-entered card", "Signed
 *   in", "Virtual terminal vs. payment gateway.", …); section h2s end with a full stop; straight
 *   apostrophes. The hero lead doesn't name Beyond, so "Beyond" → "Beyond Bancard" at the first
 *   mention, the bigger picture lead.
 * - Typo: step 1 "Signin" → "Sign in" (the hero mock's own step reads "Sign In").
 * - Section labels above the headings ("Virtual Terminal", "Get paid without a physical
 *   checkout", "How it works", "More than keyed entry", "Related, not identical", "Related
 *   solutions", "The bigger picture", "FAQ") are not repeated as eyebrows (D-003).
 * - Hero h1 is the live hero h2. Hero actions are the standard expert button and "Apply now"; the
 *   live "Talk to a Payments Expert" names no specialist, so the default "Talk to an expert" label
 *   stays (as on the Operate hub).
 * - Hero mock card → HeroFile "Virtual terminal" (Example: it shows a figure): $412.00 as the
 *   amount, the two live methods as chips, the three live steps with their live `done`/`active`
 *   states (Sign in and Enter transaction done, Process active) and "Signed in" as the status
 *   (neutral, C6). The amount has no live label and none is drafted.
 * - "When the customer isn't standing in front of you." (six boxes) → features (ruled), keeping
 *   the live anchor "virtual-terminal" (the hero's "Explore Virtual Terminal" button jumped here).
 * - "How virtual terminal works." → steps (a real sequence; the timeline numbers it).
 * - "Capabilities beyond the basic transaction." → chips (the six labels are set as h2s on the
 *   live page), with its paragraph as the note (§5).
 * - "Virtual terminal vs. payment gateway." → compare (two columns), Virtual terminal first and
 *   Payment gateway second to match the heading and put the page's own subject first (the live
 *   page shows Payment gateway first); the copy is unchanged. The Virtual terminal body carries a
 *   non-breaking space (U+00A0) before its em dash so the dash stays with "payments" on a narrow
 *   screen instead of opening a line; the visible text is unchanged.
 * - Related solutions: the template's title "Related solutions" (the live section label) and menu
 *   labels in live order; "Dashboard & Reporting" → Reporting.
 * - The bigger picture: Operate's heading and paragraph, as live; the lifecycle row (Accept,
 *   Protect, Grow, Operate) becomes the template's links to the other three pillars.
 * - FAQ answers 4–7: the placeholder text is dropped and the answer flagged (C2).
 *
 * Dropped:
 * - Hero button "Explore Virtual Terminal" (an in-page jump to #virtual-terminal).
 * - The 01–04 markers on the steps (the timeline numbers them).
 * - Related section heading "More capabilities that connect to working capital." (it names
 *   another page; the template's title stands in, §5).
 * - The FAQ footer "Still have questions? We're happy to help." and its "Ready To Get Started?"
 *   button (the template's FAQ line and closing band cover both).
 *
 * Live-site issues:
 * - Step 1 reads "Signin".
 * - "Virtual Terminal vs. Payment Gateway." shows its columns in the reverse order (Payment
 *   Gateway first).
 * - The related section heading "More capabilities that connect to working capital." names
 *   Working capital, not Virtual terminal.
 * - FAQ answers 4–7 show their placeholders: "[Placeholder — TODO: VERIFY WITH BEYOND.]" (four
 *   times).
 * - The hero mock shows "ACH" as a method, while FAQ answer 4 ("Can a virtual terminal support
 *   ACH?") leaves ACH support to the configured gateway and is marked for verification.
 */
export const virtualTerminal = {
  meta: { title: "Virtual terminal" },
  pillar: "Operate",
  kind: "detail",
  breadcrumb: solutionBreadcrumb("Operate", "Virtual terminal"),
  hero: {
    title: "Turn your browser into a secure checkout.",
    lead: "Accept eligible remote and card-not-present payments from a connected computer without requiring a traditional payment terminal at the point of sale.",
    visual: {
      title: "Virtual terminal",
      tag: "Example",
      status: { label: "Signed in", tone: "neutral" },
      amount: { value: "$412.00" },
      methods: ["Key-entered card", "ACH"],
      // States as live: the first two steps carry `done`, Process carries `active`.
      steps: [
        { label: "Sign in", state: "done" },
        { label: "Enter transaction", state: "done" },
        { label: "Process", state: "active" },
      ],
    },
  },
  blocks: [
    {
      kind: "features",
      layout: "ruled",
      // The live section anchor (the hero's "Explore Virtual Terminal" button jumped here).
      id: "virtual-terminal",
      title: "When the customer isn't standing in front of you.",
      items: [
        {
          title: "Phone orders",
          body: "Take a payment while the customer is still on the line.",
          icon: "headset",
        },
        {
          title: "Remote customers",
          body: "Accept payment regardless of where the customer is located.",
          icon: "map-pin",
        },
        {
          title: "B2B payments",
          body: "Process commercial payments without a checkout terminal.",
          icon: "building",
        },
        {
          title: "Professional services",
          body: "Bill and collect for services rendered.",
          icon: "briefcase",
        },
        {
          title: "Back-office payments",
          body: "Process payments away from the front of house.",
          icon: "monitor",
        },
        {
          title: "Mail / remote orders",
          body: "Process orders that arrive outside a normal checkout flow.",
          icon: "package",
        },
      ],
    },
    {
      kind: "steps",
      title: "How virtual terminal works.",
      steps: [
        // Live: "Signin" (typo).
        { title: "Sign in", body: "Access the supported payment environment." },
        { title: "Enter transaction", body: "Enter the required payment and transaction information." },
        { title: "Process", body: "Submit the payment securely through the configured gateway." },
        { title: "Track", body: "View transaction activity through the supported payment system." },
      ],
    },
    {
      kind: "chips",
      title: "Capabilities beyond the basic transaction.",
      chips: [
        "Customer profiles",
        "Recurring payments",
        "Digital receipts",
        "Invoicing",
        "Transaction history",
        "Reporting",
      ],
      footnote: "Availability of each capability depends on the specific virtual terminal and gateway configuration.",
    },
    {
      kind: "compare",
      title: "Virtual terminal vs. payment gateway.",
      // Ordered as the heading reads (the live page shows the gateway column first). The space
      // before the em dash is non-breaking so the dash never opens a line on a phone.
      columns: [
        {
          title: "Virtual terminal",
          body: "A user interface that allows a merchant or team member to enter and manage eligible remote payments\u00a0— commonly operating through a gateway environment.",
        },
        {
          title: "Payment gateway",
          body: "The underlying technology connecting digital payment experiences to processing.",
        },
      ],
    },
  ],
  related: {
    title: "Related solutions",
    // Live: Payment Gateways, Invoicing, Recurring Billing, ACH & eCheck, Dashboard & Reporting.
    links: [
      solutionLink("Payment gateways"),
      solutionLink("Invoicing"),
      solutionLink("Recurring billing"),
      solutionLink("ACH & eCheck"),
      solutionLink("Reporting"),
    ],
  },
  bigPicture: {
    title: "Operate is how it all runs day to day.",
    // First mention of Beyond on the page, so the full name (the hero lead doesn't name Beyond).
    lead: "Beyond Bancard's broader payments ecosystem connects acceptance, protection, and growth around the same operating layer.",
  },
  faq: {
    title: "Virtual terminal questions.",
    items: [
      {
        q: "What is a virtual terminal?",
        a: "A secure, browser-based interface for manually entering and processing remote payments without a physical terminal.",
      },
      {
        q: "Do I need payment hardware?",
        a: "No — a virtual terminal works from a connected computer without requiring a physical checkout terminal.",
      },
      {
        q: "Can I take payments over the phone?",
        a: "Yes — phone orders are a common virtual terminal use case.",
      },
      {
        q: "Can a virtual terminal support ACH?",
        a: "Support depends on the configured gateway.",
        confirm: true,
        // The hero mock's "ACH" chip rides on this answer, so the note names it for the client.
        note: "Virtual terminal: whether the virtual terminal supports ACH, and with which gateways (live answer marked as a placeholder; the hero mock also shows ACH as a method)",
      },
      {
        q: "Can I send receipts?",
        a: "Digital receipt capability depends on the specific setup.",
        confirm: true,
        note: "Virtual terminal: digital receipt capability by setup (live answer marked as a placeholder)",
      },
      {
        q: "Can I create recurring payments?",
        a: "Recurring payment support depends on the configured virtual terminal and gateway.",
        confirm: true,
        note: "Virtual terminal: recurring payment support by virtual terminal and gateway (live answer marked as a placeholder)",
      },
      {
        q: "Can multiple employees use it?",
        a: "Multi-user access depends on the specific setup.",
        confirm: true,
        note: "Virtual terminal: multi-user access for employees by setup (live answer marked as a placeholder)",
      },
      {
        q: "Is a virtual terminal the same as a payment gateway?",
        a: "No — a virtual terminal is a user interface that commonly operates through a gateway, which is the underlying connection technology.",
      },
    ],
  },
} satisfies SolutionPageContent;
