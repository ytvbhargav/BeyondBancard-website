import type { SolutionPageContent } from "@/types/content";
import { solutionBreadcrumb, solutionLink } from "@/content/solutions/links";

/**
 * International payments (D-058). Copy is the live
 * beyondbancard.com/accept/international-payments/ page (captured 21 Sept 2026), in live
 * section order.
 *
 * Edits:
 * - Headings, feature titles, hub labels, chips and hero mock labels in sentence case
 *   ("Cross-border transaction", "Risk review", "Settlement & operational complexity",
 *   "Risk / authentication", "Complex / high-risk international commerce", …); section h2s end
 *   with a full stop; straight apostrophes. The hero lead doesn't name Beyond, so "Beyond" →
 *   "Beyond Bancard" at the first mention in the page copy (the bigger picture lead).
 * - Hero h1 is the live hero h2. Hero actions are the expert button and "Apply now"; the live
 *   "Talk to an International Payments Expert" becomes `expertCta` in sentence case, and the live
 *   "Get Started" button is not used.
 * - Section labels above the headings ("International Payments", "New payment realities", "Built
 *   for international commerce", "Connected acceptance", "Where this fits", "The bigger picture",
 *   "Related solutions", "FAQ") are not repeated as eyebrows (D-003).
 * - Hero mock card → HeroFile "Cross-border transaction" (Example: it shows a figure): €340.00 as
 *   the amount, "Processing" as the status (in progress, so `review`) and the three live stages as
 *   steps. The amount has no live label, so the figure shows alone (C6; no label drafted). The live
 *   stages all carry the same dot marker (no done/active state); with the live "Processing" status
 *   they are shown mid-flow: Authentication done, Risk review active, Settlement pending (drafted
 *   states).
 * - New payment realities → features (panel), without the 01–04 markers (not a sequence);
 *   "Global reach, structured payment environment." → features (split, title only: its lead is
 *   dropped, see below); "From new markets to settled funds." → hub (customer markets in, the live
 *   "BEYOND" node as the centre, the four stages out); "Where international acceptance fits." →
 *   chips.
 * - Related solutions: the template's title "Related solutions" and menu labels, in live order.
 * - The bigger picture: Accept's heading and this page's paragraph, as live; the lifecycle row
 *   (Accept, Protect, Grow, Operate) becomes the template's links to the other three pillars.
 * - FAQ answers 2, 3 and 6: the placeholder text is dropped and the answer flagged (C2).
 *
 * Dropped:
 * - The "why" section photo (C5).
 * - The "Global reach, structured payment environment." lead "International acceptance isn't just
 *   switching on another country — it's structuring the environment around it." (it repeats the
 *   "Experienced support" row beside it; as the ACH & eCheck lead, §5).
 * - Related section heading "More capabilities that connect to international payments." (the
 *   template's "Related solutions" is used).
 * - The FAQ footer "Still have questions? We're happy to help." and its "Ready To Get Started?"
 *   button (the template's FAQ line and closing band cover both).
 *
 * Live-site issues:
 * - The browser title is "Merchant Processing Service Provider - Online Processing" (the Online
 *   payments page's).
 * - FAQ answers 2, 3 and 6 show their placeholders: "[Placeholder — TODO: VERIFY WITH BEYOND on
 *   current geographic coverage.]", "[Placeholder — TODO: VERIFY WITH BEYOND.]" and
 *   "[Placeholder — confirm category-specific availability.]".
 * - FAQ answer 3's own sentence, "Multi-currency capability is subject to confirmation.", defers
 *   the answer (kept verbatim, flagged).
 */
export const internationalPayments = {
  meta: { title: "International payments" },
  pillar: "Accept",
  kind: "detail",
  breadcrumb: solutionBreadcrumb("Accept", "International payments"),
  hero: {
    title: "Take your business farther.",
    lead: "Accept customers beyond your home market with payment infrastructure designed for international commerce, cross-border transactions, and more complex payment environments.",
    expertCta: "Talk to an international payments expert",
    visual: {
      title: "Cross-border transaction",
      tag: "Example",
      status: { label: "Processing", tone: "review" },
      amount: { value: "€340.00" },
      // The live stages share one marker (no done/active state): shown mid-flow, to match "Processing".
      steps: [
        { label: "Authentication", state: "done" },
        { label: "Risk review", state: "active" },
        { label: "Settlement", state: "pending" },
      ],
    },
  },
  blocks: [
    {
      kind: "features",
      layout: "panel",
      title: "New markets introduce new payment realities.",
      lead: "Global commerce creates new payment complexity that domestic-only processing isn't always built to handle.",
      items: [
        {
          title: "Cross-border transactions",
          body: "Transactions crossing borders can introduce additional processing and settlement considerations.",
          icon: "arrows",
        },
        {
          title: "Fraud & authentication",
          body: "International, card-not-present activity can carry a different risk profile than domestic transactions.",
          icon: "lock",
        },
        {
          title: "Chargebacks & disputes",
          body: "Dispute handling can look different across markets and card networks.",
          icon: "alert",
        },
        {
          title: "Settlement & operational complexity",
          body: "Cross-border settlement can introduce additional operational steps.",
          icon: "landmark",
        },
      ],
    },
    {
      kind: "features",
      layout: "split",
      // The live lead repeats the "Experienced support" row and is dropped (as on ACH & eCheck, §5).
      title: "Global reach, structured payment environment.",
      items: [
        {
          title: "Reach more customers",
          body: "Support payment programs for businesses serving customers beyond their domestic market.",
          icon: "globe",
        },
        {
          title: "Navigate cross-border complexity",
          body: "Structure the payment environment around markets, transaction flows, and processing requirements.",
          icon: "sliders",
        },
        {
          title: "Protect international transactions",
          body: "Connect acceptance with authentication, fraud, and chargeback capabilities where appropriate.",
          icon: "shield",
        },
        {
          title: "Experienced support",
          body: "Work with people who understand that international acceptance requires more than switching on another country.",
          icon: "headset",
        },
      ],
    },
    {
      kind: "hub",
      title: "From new markets to settled funds.",
      // Live: Customer Markets → BEYOND → the four stages.
      inputs: ["Customer markets"],
      outputs: ["Risk / authentication", "Processing", "Settlement", "Reporting"],
    },
    {
      kind: "chips",
      title: "Where international acceptance fits.",
      chips: [
        "International ecommerce",
        "Travel",
        "Digital businesses",
        "Subscription businesses",
        "Multinational merchant operations",
        "Complex / high-risk international commerce",
      ],
    },
  ],
  related: {
    title: "Related solutions",
    links: [
      solutionLink("Fraud & risk tools"),
      solutionLink("3D Secure"),
      solutionLink("Chargeback protection"),
      solutionLink("Online payments"),
    ],
  },
  bigPicture: {
    title: "Accept is where the transaction starts.",
    // First mention of Beyond in the page copy, so the full name.
    lead: "Beyond Bancard's broader payments ecosystem helps protect, fund, and operate what happens next.",
  },
  faq: {
    title: "International payments questions.",
    items: [
      {
        q: "What is international payment processing?",
        a: "Payment acceptance structured for businesses serving customers outside their home market.",
      },
      {
        q: "Can Beyond support customers outside the United States?",
        a: "International acceptance capability depends on the specific business and markets involved.",
        confirm: true,
        note: "International payments: current geographic coverage (live answer marked as a placeholder)",
      },
      {
        q: "Does Beyond support multiple currencies?",
        a: "Multi-currency capability is subject to confirmation.",
        confirm: true,
        note: "International payments: multi-currency support (live answer marked as a placeholder)",
      },
      {
        q: "What are cross-border payments?",
        a: "Transactions where the customer and merchant are in different countries, which can introduce additional processing considerations.",
      },
      {
        q: "How are international payments different from domestic transactions?",
        a: "They can carry different fraud, authentication, dispute, and settlement considerations than domestic-only processing.",
      },
      {
        q: "Can high-risk businesses process internationally?",
        a: "In many cases, yes, subject to underwriting.",
        confirm: true,
        note: "International payments: category-specific availability for high-risk businesses (live answer marked as a placeholder)",
      },
      {
        q: "How does fraud protection work with international transactions?",
        a: "Authentication and risk tools are applied appropriately to the transaction's risk profile, including cross-border activity.",
      },
      {
        q: "How do I know if international processing is right for my business?",
        a: "A conversation with our team can help determine the right structure based on your markets and transaction profile.",
      },
    ],
  },
} satisfies SolutionPageContent;
