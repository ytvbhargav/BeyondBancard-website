import type { SolutionPageContent } from "@/types/content";
import { solutionBreadcrumb, solutionLink } from "@/content/solutions/links";
import { keepTogether } from "@/lib/typography";

/**
 * Fraud & risk tools (D-058). Copy is the live beyondbancard.com/protect/fraud-risk-tools/
 * page (captured 21 Sept 2026), in live section order.
 *
 * Edits:
 * - Headings, feature and column titles and hero mock labels in sentence case ("Transaction
 *   context", "Identify higher-risk activity", "Monitor what happens after authorization", "Fraud
 *   prevention", "Rules passed", "Low risk", …); section h2s end with a full stop; straight
 *   apostrophes ("Beyond's"). "Beyond" → "Beyond Bancard" at the first mention, the hero lead.
 * - Section labels above the headings ("Fraud & Risk Tools", "Fraud isn't one signal", "Build the
 *   right control layer", "Fraud vs. chargebacks", "Protect conversion", "Related solutions", "The
 *   bigger picture", "FAQ") are not repeated as eyebrows (D-003).
 * - Hero h1 is the live hero h2. Hero expert button "Talk to a Chargeback Expert" (the Chargeback
 *   protection page's) → "Talk to a payments risk expert", the Protect hub's live label (§5); the
 *   second action is the standard "Apply now".
 * - Hero mock card → HeroFile (Illustration: it shows no figures). The mock has no title, so the
 *   panel takes the hero's own label, "Fraud & risk tools", as on B2B payments, POS systems and
 *   Cost-reduction programs; "Today" is the subtitle (there is no figure for it to label), the
 *   three "✓" stats (Authenticated, Tokenized, Rules passed) are done steps and "Low risk ✓" the
 *   approved status.
 * - "Risk looks different from transaction to transaction." → features (ruled), keeping the live
 *   anchor "how-it-works"; "A layered strategy, not one fraud score." → features (split).
 * - "Two different goals, both necessary." → compare, with "A strong payments strategy needs both."
 *   as the note. The "Fraud prevention" column body is the page's own FAQ answer to "What is payment
 *   fraud prevention?", flagged (§5, C3); the flag asks for the fraud prevention goal as a "Goal: …"
 *   line, like the Chargeback protection column's, so the two columns read as a pair.
 * - "Every blocked transaction has a customer behind it." → statement (§5).
 * - Related solutions: the template's title "Related solutions" and menu labels in live order
 *   ("Reporting & Analytics" → Reporting).
 * - The bigger picture: this page's heading and paragraph, as live; the lifecycle row (Accept,
 *   Protect, Grow, Operate) becomes the template's links to the other three pillars.
 * - FAQ answers 6, 7 and 8: the placeholder text is dropped and the answer flagged (C2).
 * - Hyphenated compounds outside the FAQ ("payment-risk" in the hero lead, "Post-transaction",
 *   "higher-risk") carry word joiners (keepTogether) so they don't break at the hyphen; the
 *   visible text is unchanged. FAQ text is left plain, as on the industry pages.
 *
 * Dropped:
 * - Hero button "See How It Works" (an in-page jump to #how-it-works).
 * - Hero mock tab row (Risk signals, Disputes, Reports), as on the POS and Operate mocks (a
 *   tab-style row reads as pages merged into one), and the "✓" glyphs (the done steps and the
 *   status pill carry them).
 * - The section-3 photo (C5).
 * - The live "Fraud Prevention" column body "The underlying technology connecting digital payment
 *   experiences to processing." (the payment gateway definition, C3).
 * - Related section heading "More capabilities that connect to fraud & risk tools." (the
 *   template's title stands in).
 * - The FAQ footer "Still have questions? We're happy to help." and its "Ready To Get Started?"
 *   button (the template's FAQ line and closing band cover both).
 *
 * Live-site issues:
 * - Hero button "Talk to a Chargeback Expert" is the Chargeback protection page's label.
 * - The "Fraud Prevention" column under "Fraud vs. chargebacks" shows the payment gateway
 *   definition instead of a fraud prevention description.
 * - FAQ answers 6, 7 and 8 show their placeholders: "[Placeholder — TODO: VERIFY WITH BEYOND on
 *   tuning approach.]", "[Placeholder — TODO: VERIFY WITH BEYOND on configuration options.]" and
 *   "[Placeholder — TODO: VERIFY WITH BEYOND.]".
 */
export const fraudRiskTools = {
  meta: { title: "Fraud & risk tools" },
  pillar: "Protect",
  kind: "detail",
  breadcrumb: solutionBreadcrumb("Protect", "Fraud & risk tools"),
  hero: {
    title: "Stop more bad transactions without blocking good customers.",
    lead: `Beyond Bancard helps businesses combine ${keepTogether("payment-risk")} signals, authentication, transaction controls, and monitoring to identify suspicious activity while preserving legitimate commerce.`,
    expertCta: "Talk to a payments risk expert",
    visual: {
      // The mock has no title: the hero's own label, as on B2B payments and POS systems.
      title: "Fraud & risk tools",
      subtitle: "Today",
      tag: "Illustration",
      // The live "✓" stats, shown as passed checks.
      steps: [
        { label: "Authenticated", state: "done" },
        { label: "Tokenized", state: "done" },
        { label: "Rules passed", state: "done" },
      ],
      status: { label: "Low risk", tone: "approved" },
    },
  },
  blocks: [
    {
      kind: "features",
      layout: "ruled",
      id: "how-it-works",
      title: "Risk looks different from transaction to transaction.",
      items: [
        {
          title: "Transaction context",
          body: "Amount, frequency, and transaction behavior.",
          icon: "activity",
        },
        {
          title: "Cardholder authentication",
          body: "Authentication signals such as 3D Secure where applicable.",
          icon: "badge-check",
        },
        {
          title: "Credential security",
          body: "Tokenization and secure credential handling.",
          icon: "lock",
        },
        {
          title: "Merchant rules",
          body: "Configured payment controls appropriate to the merchant environment.",
          icon: "sliders",
        },
        {
          title: "Dispute activity",
          body: `${keepTogether("Post-transaction")} dispute patterns and account health.`,
          icon: "alert",
        },
      ],
    },
    {
      kind: "features",
      layout: "split",
      title: "A layered strategy, not one fraud score.",
      items: [
        {
          title: `Identify ${keepTogether("higher-risk")} activity`,
          body: "Surface transactions and patterns that warrant a closer look.",
          icon: "alert",
        },
        {
          title: "Apply controls intelligently",
          body: "Match the level of scrutiny to the actual risk of the transaction.",
          icon: "gauge",
        },
        {
          title: "Connect authentication",
          body: "Bring authentication signals like 3D Secure into the broader risk picture.",
          icon: "link",
        },
        {
          title: "Monitor what happens after authorization",
          body: "Risk doesn't stop once a transaction is approved.",
          icon: "eye",
        },
      ],
    },
    {
      kind: "compare",
      title: "Two different goals, both necessary.",
      columns: [
        {
          title: "Fraud prevention",
          // The live body is the payment gateway definition; the page's own FAQ answer stands in.
          body: "The set of tools and practices used to identify and stop suspicious or unauthorized transactions before they complete.",
          confirm: true,
          note: "Fraud & risk tools: the fraud prevention goal, as a 'Goal: …' line like the Chargeback protection column (the live column shows the payment gateway definition; the page's FAQ answer stands in)",
        },
        {
          title: "Chargeback protection",
          body: "Goal: address disputes that occur after the transaction and reduce avoidable chargeback impact.",
        },
      ],
      footnote: "A strong payments strategy needs both.",
    },
    {
      kind: "statement",
      title: "Every blocked transaction has a customer behind it.",
      body: [
        "Risk controls should reduce bad transactions without unnecessarily declining legitimate customers. The right strategy balances security with approval and checkout performance.",
      ],
    },
  ],
  related: {
    title: "Related solutions",
    // Live: 3D Secure, Network Tokenization, Chargeback Protection, Online Payments,
    // Reporting & Analytics (→ Reporting).
    links: [
      solutionLink("3D Secure"),
      solutionLink("Network tokenization"),
      solutionLink("Chargeback protection"),
      solutionLink("Online payments"),
      solutionLink("Reporting"),
    ],
  },
  bigPicture: {
    title: "Protect is what happens around every transaction.",
    lead: "Beyond's broader payments ecosystem connects acceptance, funding, and operations around the same protection layer.",
  },
  faq: {
    title: "Fraud & risk questions.",
    // Questions 1 and 2 are reused by the Protect hub (pickFaq): keep their wording exact.
    items: [
      {
        q: "What is payment fraud prevention?",
        a: "The set of tools and practices used to identify and stop suspicious or unauthorized transactions before they complete.",
      },
      {
        q: "What's the difference between fraud and a chargeback?",
        a: "Fraud prevention acts before a transaction completes; a chargeback is a dispute that occurs after the transaction has already happened.",
      },
      {
        q: "Can fraud tools stop every fraudulent payment?",
        a: "No — no fraud strategy stops 100% of fraudulent activity. The goal is meaningful risk reduction, not a guarantee.",
      },
      {
        q: "How does 3D Secure fit into fraud prevention?",
        a: "3D Secure adds an authentication signal that can be one input into a broader fraud and risk strategy.",
      },
      {
        q: "How does tokenization improve security?",
        a: "It reduces the exposure of sensitive card credentials across the payment environment.",
      },
      {
        q: "Can fraud controls increase false declines?",
        a: "Overly aggressive rules can decline legitimate transactions. Beyond aims to balance risk reduction with checkout performance.",
        confirm: true,
        note: "Fraud & risk tools: how risk controls are tuned to limit false declines (live answer marked as a placeholder)",
      },
      {
        q: "Can Beyond customize risk controls by business?",
        a: "Risk controls can be configured to reflect a merchant's specific environment.",
        confirm: true,
        note: "Fraud & risk tools: which risk control configuration options are available (live answer marked as a placeholder)",
      },
      {
        q: "Which fraud tools does Beyond support?",
        a: "Specific tooling depends on Beyond's gateway and processing setup.",
        confirm: true,
        note: "Fraud & risk tools: which fraud tools Beyond supports (live answer marked as a placeholder)",
      },
    ],
  },
} satisfies SolutionPageContent;
