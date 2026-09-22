import type { SolutionPageContent } from "@/types/content";
import { pillarLink, solutionBreadcrumb, solutionLink } from "@/content/solutions/links";

/**
 * Reporting (D-058). Copy is the live beyondbancard.com/operate/dashboard-reporting/ page
 * (captured 21 Sept 2026), in live section order.
 *
 * Edits:
 * - Browser title is the menu label, "Reporting" (live: "Dashboard & Reporting"); the FAQ heading
 *   keeps the page's own "Dashboard & reporting questions.".
 * - Headings, feature titles, stage labels and link labels in sentence case ("Reporting &
 *   analytics", "Terminal / channel", "Chargeback protection", …); section h2s end with a full
 *   stop; straight apostrophes. The hero lead doesn't name Beyond, so "Beyond" → "Beyond Bancard" at the
 *   first mention, the questions section's closing line.
 * - Section labels above the headings ("Dashboard & Reporting", "From payment to deposit", "Less
 *   chasing. More visibility.", "One question, fewer systems", "Multi-location / portfolio",
 *   "Reporting that connects to action", "Related solutions", "The bigger picture", "FAQ") are not
 *   repeated as eyebrows (D-003).
 * - Hero h1 is the live hero h2. Hero actions are the standard expert button and "Apply now"; the
 *   live "Talk to a Payments Expert" names no specialist, so the default "Talk to an expert" label
 *   stays (as on the Operate hub). No hero visual: the live hero has no mock card (C6).
 * - "Follow the money." → flow: the live `p-arch` chain, "Settlement" the live dark node.
 * - Section 3: the live heading "Payment collection, closer to the billing workflow." is
 *   Invoicing's, so the h2 is the page's own words for the section, "Payment visibility." (the
 *   hero's "Explore Payment Visibility" jumps to it; §5). → features (ruled), keeping the live
 *   anchor "payment-visibility".
 * - "Stop chasing the answer across payment systems." → questions: the six quoted h2s as items,
 *   the closing paragraph as the body. Their straight double quotes become typographic quotes
 *   (“…”), as in Invoicing's body copy; the wording and straight apostrophes are unchanged.
 * - "See the business at the level you need." → flow with its small print as the note;
 *   "Terminal / channel" is the live dark node.
 * - "See something in the numbers? Do something about it." → actions: each h5 prompt and its
 *   button. "Explore Protect" and "Explore Accept" link to the hubs; the solution buttons use the
 *   menu labels; "Explore Integrations" → Payment gateways (§5).
 * - Related solutions: the template's title "Related solutions" and menu labels (Chargeback
 *   protection, Instant payouts, Payment gateways, Cost-reduction programs).
 * - The bigger picture: Operate's heading and paragraph, as live; the lifecycle row (Accept,
 *   Protect, Grow, Operate) becomes the template's links to the other three pillars.
 * - FAQ answers 4 to 8: the placeholder text is dropped and the answer flagged (C2).
 *
 * Dropped:
 * - Hero button "Explore Payment Visibility" (an in-page jump to #payment-visibility).
 * - The section-3 heading "Payment collection, closer to the billing workflow." (Invoicing's; C3).
 * - Related section heading "More capabilities that connect to dashboard & reporting." (the
 *   template's title stands in).
 * - Related "Integrations" (no Integrations page; C4).
 * - The FAQ footer "Still have questions? We're happy to help." and its "Ready To Get Started?"
 *   button (the template's FAQ line and closing band cover both).
 *
 * Live-site issues:
 * - The section-3 heading "Payment collection, closer to the billing workflow." and its label
 *   "Less chasing. More visibility." are the Invoicing page's (the label is on Working capital too).
 * - The "Explore Integrations" button links to "#", and related "Integrations" has no page.
 * - FAQ answers 4 to 8 show their placeholders: "[Placeholder — TODO: VERIFY WITH BEYOND DATA/CRM
 *   PLATFORM.]" (answers 4 and 8), "[Placeholder — TODO: VERIFY WITH BEYOND on exact statement
 *   access.]" (answer 5) and "[Placeholder — TODO: VERIFY WITH BEYOND.]" (answers 6 and 7).
 * - FAQ answer 7's "unless confirmed" reads like a note to the writer rather than to the merchant
 *   (kept verbatim; the answer is flagged).
 */
export const dashboardReporting = {
  meta: { title: "Reporting" },
  pillar: "Operate",
  kind: "detail",
  breadcrumb: solutionBreadcrumb("Operate", "Reporting"),
  hero: {
    title: "See where your money is — and what happened along the way.",
    lead: "Bring transactions, deposits, disputes, statements, and payment performance together so your team spends less time piecing the story together.",
  },
  blocks: [
    {
      kind: "flow",
      title: "Follow the money.",
      lead: "Payment operations become easier when teams can connect what customers paid to what ultimately reached the bank.",
      nodes: [
        { label: "Transaction" },
        { label: "Batch" },
        { label: "Settlement" },
        { label: "Deposit" },
        { label: "Reconciliation" },
      ],
      focus: 2,
    },
    {
      kind: "features",
      layout: "ruled",
      // The live section anchor (the hero's "Explore Payment Visibility" button jumped here).
      id: "payment-visibility",
      // The live heading is Invoicing's; the page's own words for the section (§5).
      title: "Payment visibility.",
      items: [
        {
          title: "Transactions",
          body: "Review transaction activity, status, amount, payment channel, and other supported payment details.",
          icon: "receipt",
        },
        {
          title: "Deposits",
          body: "Connect settlement and funding activity to the payments that generated it where supported.",
          icon: "landmark",
        },
        {
          title: "Disputes",
          body: "Bring chargeback and dispute activity into the broader payment operations picture where supported.",
          icon: "alert",
        },
        {
          title: "Statements",
          body: "Access applicable merchant statements and payment documentation through supported merchant tools.",
          icon: "file-text",
        },
        {
          title: "Reporting & analytics",
          body: "Understand volume, transaction trends, payment methods, locations, and other supported dimensions of payment performance.",
          icon: "chart",
        },
        {
          title: "Reconciliation",
          body: "Reduce the work required to understand how transactions, fees, adjustments, and funding activity relate to one another.",
          icon: "arrows",
        },
      ],
    },
    {
      kind: "questions",
      title: "Stop chasing the answer across payment systems.",
      items: [
        "“Why was today's deposit lower than yesterday's sales?”",
        "“Which transactions are in this batch?”",
        "“Was this refund already deducted?”",
        "“Where is the statement for this location?”",
        "“Which disputes need attention?”",
        "“How much did we process online versus in person?”",
      ],
      // First mention of Beyond on the page (the hero lead doesn't name it).
      body: "Beyond Bancard helps bring the information behind those questions closer together.",
    },
    {
      kind: "flow",
      title: "See the business at the level you need.",
      nodes: [{ label: "Portfolio" }, { label: "Business" }, { label: "Location" }, { label: "Terminal / channel" }],
      focus: 3,
      footnote: "Available where supported by the reporting environment.",
    },
    {
      kind: "actions",
      title: "See something in the numbers? Do something about it.",
      rows: [
        { prompt: "High disputes?", link: solutionLink("Chargeback protection") },
        { prompt: "Declines or risk signals?", link: pillarLink("Protect", "Explore Protect") },
        { prompt: "Need cash sooner?", link: solutionLink("Instant payouts") },
        { prompt: "Processing expense too high?", link: solutionLink("Cost-reduction programs") },
        { prompt: "Need another payment channel?", link: pillarLink("Accept", "Explore Accept") },
        // Live: "Explore Integrations" linked to "#"; there is no Integrations page (§5).
        { prompt: "Need to connect a system?", link: solutionLink("Payment gateways") },
      ],
    },
  ],
  related: {
    title: "Related solutions",
    // Live: Chargeback Protection, Instant Payouts, Payment Gateways, Cost-Reduction Programs, Integrations.
    links: [
      solutionLink("Chargeback protection"),
      solutionLink("Instant payouts"),
      solutionLink("Payment gateways"),
      solutionLink("Cost-reduction programs"),
    ],
  },
  bigPicture: {
    title: "Operate is how it all runs day to day.",
    lead: "Beyond's broader payments ecosystem connects acceptance, protection, and growth around the same operating layer.",
  },
  faq: {
    title: "Dashboard & reporting questions.",
    items: [
      {
        q: "What payment information can I see?",
        a: "Transactions, deposits, disputes, statements, and payment performance, subject to your account's supported features.",
      },
      {
        q: "Can I view transactions and deposits?",
        a: "Yes — transaction and deposit visibility are core parts of the reporting environment.",
      },
      {
        q: "Can I see chargebacks and disputes?",
        a: "Yes, where supported — dispute activity connects to the broader payment operations picture.",
      },
      {
        q: "Can I download reports?",
        a: "Report export capability depends on the specific reporting environment.",
        confirm: true,
        note: "Reporting: whether reports can be downloaded (live answer marked as a placeholder)",
      },
      {
        q: "Can I access merchant statements?",
        a: "Yes, through supported merchant tools.",
        confirm: true,
        note: "Reporting: exact merchant statement access (live answer marked as a placeholder)",
      },
      {
        q: "Can I see multiple locations?",
        a: "Multi-location visibility depends on the reporting environment.",
        confirm: true,
        note: "Reporting: multi-location visibility by reporting environment (live answer marked as a placeholder)",
      },
      {
        q: "Can reporting help with reconciliation?",
        a: "Yes — reporting is designed to help connect transactions to funding activity, though it does not represent fully automated accounting reconciliation unless confirmed.",
        confirm: true,
        note: "Reporting: what reporting does for reconciliation, and whether any of it is automated (live answer marked as a placeholder)",
      },
      {
        q: "Can payment data integrate with my other systems?",
        a: "Integration capability depends on your specific systems and setup.",
        confirm: true,
        note: "Reporting: which systems payment data can integrate with (live answer marked as a placeholder)",
      },
    ],
  },
} satisfies SolutionPageContent;
