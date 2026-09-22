import type { SolutionPageContent } from "@/types/content";
import { solutionBreadcrumb, solutionLink } from "@/content/solutions/links";

/**
 * B2B payments (D-058). Copy is the live beyondbancard.com/accept/b2b-payments/ page
 * (captured 21 Sept 2026), in live section order.
 *
 * Edits:
 * - Headings, feature titles, chips and stat labels in sentence case; section h2s end with a
 *   full stop; straight apostrophes ("finance team's", "Beyond's").
 * - "Beyond" → "Beyond Bancard" at the first mention, the bigger picture lead (the hero lead
 *   doesn't name Beyond).
 * - Hero expert button "Talk to a B2B Payments Expert" → "Talk to a B2B payments expert".
 * - Hero mock card → HeroFile (Example: it shows figures). The live card has no title, so it takes
 *   the hero's own label, "B2B payments"; "INVOICE $18,400" is the amount, the rest of the Invoice /
 *   Commercial card / ACH tab row the method chips (Invoice is already the amount label), and the
 *   three figures the stats. No status (the card has none).
 * - "Commercial payments have different requirements." (01–04, not a sequence) → features (panel).
 * - Level 2 & Level 3 processing → compare (Level 1, 2, 3) with the first paragraph as the lead;
 *   the block is flagged for Level 2/3 availability and any interchange effect.
 * - "Ways to accept business payments." → features (ruled); "Better visibility from payment to
 *   reconciliation." → features (split) with its paragraph as the lead; "Where B2B payments fit." → chips.
 * - Related solutions: the live section is empty, so the links are the page's own capabilities
 *   (ACH & eCheck, Virtual terminal, Invoicing, Recurring billing, Reporting), with menu labels.
 * - FAQ answers 3, 4, 5 and 8: the placeholder text is dropped and the answer flagged (C2).
 *
 * Dropped:
 * - Eyebrows "B2B Payments", "How B2B is different", "Level 2 & Level 3 processing", "B2B payment
 *   options", "Built for finance teams" (twice), "Where this fits", "The bigger picture" and "FAQ"
 *   (D-003), and the 01–04 markers on the section-2 boxes (not a sequence, D-005).
 * - Hero button "Explore Level 2 & 3 Processing" (an in-page jump).
 * - The Level 2 & 3 second paragraph, an internal note: "Beyond does not automatically claim
 *   enhanced-data capture or specific interchange savings — availability depends on your setup and
 *   the card issuer. [Placeholder — TODO: VERIFY WITH BEYOND. Config flag: level23Automation.enabled
 *   = false until confirmed.]".
 * - The "why" section photo (C5).
 * - The Accept / Protect / Grow / Operate grid under the bigger picture (PillarLinks lists the other pillars).
 * - The related heading "More capabilities that connect to B2B payments." (the template's "Related
 *   solutions" is used).
 * - The FAQ footer "Still have questions? We're happy to help." and its "Ready To Get Started?"
 *   button (the template's FAQ line and closing band cover both).
 *
 * Live-site issues:
 * - Hero button "Explore Level 2 & 3 Processing" jumps to #Level-Processing, which is on "Ways to
 *   accept business payments.", not on the Level 2 & 3 section.
 * - The Level 2 & 3 section shows an internal note, a placeholder and a config flag
 *   (level23Automation.enabled) to visitors.
 * - "More capabilities that connect to B2B payments." has a heading but no items; its label repeats
 *   the section-5 label "Built for finance teams".
 * - FAQ answers 3, 4, 5 and 8 show their placeholders: "[Placeholder — TODO: VERIFY WITH BEYOND.]"
 *   (3 and 4), "[Placeholder — level23Automation.enabled = false until verified.]" (5) and
 *   "[Placeholder — confirm specific reconciliation workflow.]" (8).
 */
export const b2bPayments = {
  meta: { title: "B2B payments" },
  pillar: "Accept",
  kind: "detail",
  breadcrumb: solutionBreadcrumb("Accept", "B2B payments"),
  hero: {
    title: "Better payments for business-to-business commerce.",
    lead: "Build B2B acceptance around larger transactions, commercial cards, ACH, invoices, remote payments, and richer transaction data — with tools designed for the way businesses pay businesses.",
    expertCta: "Talk to a B2B payments expert",
    visual: {
      title: "B2B payments",
      tag: "Example",
      amount: { label: "Invoice", value: "$18,400" },
      // The live tab row after its first tab, "Invoice", which the amount label already names.
      methods: ["Commercial card", "ACH"],
      stats: [
        { label: "Data level", value: "L3" },
        { label: "Terms", value: "Net 30" },
        { label: "Line items", value: "4" },
      ],
    },
  },
  blocks: [
    {
      kind: "features",
      layout: "panel",
      title: "Commercial payments have different requirements.",
      lead: "Business-to-business transactions carry different considerations than typical consumer retail.",
      items: [
        {
          title: "Larger transactions",
          body: "Commercial payments often involve higher transaction values than consumer retail.",
          icon: "banknote",
        },
        {
          title: "Commercial cards",
          body: "Purchasing and corporate cards can carry different data and processing characteristics.",
          icon: "credit-card",
        },
        {
          title: "Invoices & remote payments",
          body: "B2B payment often happens away from a traditional checkout, against an invoice or purchase order.",
          icon: "file-text",
        },
        {
          title: "Reconciliation & data",
          body: "Finance teams need transaction data that supports accurate, efficient reconciliation.",
          icon: "file-search",
        },
      ],
    },
    {
      kind: "compare",
      title: "Make commercial card data work harder.",
      lead: "Eligible commercial-card transactions can include enhanced transaction information beyond basic payment data. Where supported, Level 2 and Level 3 processing can help businesses submit richer transaction details and potentially improve payment economics.",
      // The live second paragraph is an internal note (dropped); availability is unconfirmed.
      confirm: true,
      note: "B2B payments: Level 2/3 availability and any interchange effect",
      columns: [
        { title: "Level 1", body: "Basic transaction information — amount, date, merchant." },
        {
          title: "Level 2",
          body: "Additional commercial transaction data — potentially tax information and customer reference information.",
        },
        {
          title: "Level 3",
          body: "More detailed line-item transaction information — potentially item detail, quantity, and product information.",
        },
      ],
    },
    {
      kind: "features",
      layout: "ruled",
      title: "Ways to accept business payments.",
      items: [
        {
          title: "Commercial card acceptance",
          body: "Accept purchasing and corporate card transactions.",
          icon: "credit-card",
        },
        { title: "ACH", body: "Move funds directly bank-to-bank for commercial payments.", icon: "landmark" },
        { title: "Virtual terminal", body: "Key in remote commercial payments securely.", icon: "monitor" },
        { title: "Invoicing", body: "Bill and collect against outstanding invoices.", icon: "file-text" },
        { title: "Recurring billing", body: "Support scheduled B2B payment relationships.", icon: "repeat" },
        {
          title: "Reporting & reconciliation",
          body: "Match payment data to your accounting and finance systems.",
          icon: "chart",
        },
      ],
    },
    {
      kind: "features",
      layout: "split",
      title: "Better visibility from payment to reconciliation.",
      lead: "B2B payments should make your finance team's job easier, not harder.",
      items: [
        { title: "Richer transaction data", body: "Enhanced data where eligible and supported.", icon: "layers" },
        {
          title: "Flexible acceptance",
          body: "Commercial cards, ACH, invoicing, and virtual terminal in one relationship.",
          icon: "handshake",
        },
        { title: "Reporting", body: "Transaction visibility built for finance workflows.", icon: "chart" },
        {
          title: "Reconciliation",
          body: "Match payments to invoices and accounting records more efficiently.",
          icon: "arrows",
        },
      ],
    },
    {
      kind: "chips",
      title: "Where B2B payments fit.",
      chips: [
        "Wholesale",
        "Distribution",
        "Manufacturers",
        "Professional services",
        "Commercial suppliers",
        "Enterprise vendors",
        "Government-related eligible payments",
      ],
    },
  ],
  related: {
    // The live section ("More capabilities that connect to B2B payments.") is empty; these are the
    // capabilities the page itself names.
    title: "Related solutions",
    links: [
      solutionLink("ACH & eCheck"),
      solutionLink("Virtual terminal"),
      solutionLink("Invoicing"),
      solutionLink("Recurring billing"),
      solutionLink("Reporting"),
    ],
  },
  bigPicture: {
    title: "Accept is where the transaction starts.",
    // First mention of Beyond on the page, so the full name (PRD §10.5).
    lead: "Beyond Bancard's broader payments ecosystem helps protect, fund, and operate what happens next.",
  },
  faq: {
    title: "B2B payments questions.",
    items: [
      {
        q: "What is B2B payment processing?",
        a: "Payment acceptance structured for business-to-business transactions rather than consumer retail.",
      },
      {
        q: "What are Level 2 and Level 3 transactions?",
        a: "Enhanced commercial-card data tiers that can include additional transaction and line-item detail beyond basic payment information.",
      },
      {
        q: "Which cards qualify for Level 2 or Level 3 processing?",
        a: "Eligibility depends on the card type and issuer.",
        confirm: true,
        note: "B2B payments: which cards qualify for Level 2 or Level 3 processing (live answer marked as a placeholder)",
      },
      {
        q: "Can Level 2/3 processing reduce interchange costs?",
        a: "Enhanced data can potentially improve payment economics on qualifying transactions, but Beyond does not promise a specific reduction.",
        confirm: true,
        note: "B2B payments: whether Level 2/3 processing reduces interchange costs (live answer marked as a placeholder)",
      },
      {
        q: "Does Beyond automate enhanced transaction data?",
        a: "Automated Level 2/3 data capture is not confirmed at this time.",
        confirm: true,
        note: "B2B payments: whether Level 2/3 data capture is automated (live answer marked as a placeholder)",
      },
      {
        q: "Can B2B customers pay by ACH?",
        a: "Yes — ACH is a common payment method for B2B transactions.",
      },
      {
        q: "Can I accept payments through a virtual terminal?",
        a: "Yes — virtual terminal is available for remote commercial card and payment acceptance.",
      },
      {
        q: "How does B2B reconciliation work?",
        a: "Reporting tools help match transactions to invoices and accounting records.",
        confirm: true,
        note: "B2B payments: the specific reconciliation workflow (live answer marked as a placeholder)",
      },
    ],
  },
} satisfies SolutionPageContent;
