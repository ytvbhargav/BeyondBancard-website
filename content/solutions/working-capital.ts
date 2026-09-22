import type { SolutionPageContent } from "@/types/content";
import { solutionBreadcrumb, solutionLink } from "@/content/solutions/links";

/**
 * Working capital (D-058). Copy is the live beyondbancard.com/grow/working-capital/ page
 * (captured 21 Sept 2026), in live section order.
 *
 * Edits:
 * - Headings, feature, step and column titles and hero mock labels in sentence case ("Stock
 *   inventory", "Hire & train", "Business-oriented evaluation", "Working capital vs. instant
 *   payouts.", "Business performance review", "Terms under review", …); section h2s end with a
 *   full stop; straight apostrophes. "Beyond" → "Beyond Bancard" at the first mention (hero lead).
 * - Hero h1 is the live hero h2. Hero actions are the expert button, labelled with the live "Talk
 *   to a Funding Specialist" in sentence case, and "Apply now"; the live "Explore Working Capital"
 *   button (an in-page jump to #working-capital) is not used.
 * - Section labels above the headings ("Working Capital", "Less chasing. More visibility.", "How
 *   it works", "Designed around business performance", "Two different tools", "Related
 *   solutions", "The bigger picture", "FAQ") are not repeated as eyebrows (D-003).
 * - Hero mock card → HeroFile "Business performance review" (Illustration: no figures): its three
 *   rows as steps. The live rows share one marker (no done/active state); "Terms under review"
 *   names a state still in progress, so it is the active step and the two before it are done. No
 *   status: the live card has none. The live card is set hidden at every breakpoint; its labels
 *   are used as on the other Grow pages.
 * - "Growth rarely waits for perfect timing." → features (ruled), keeping the live anchor
 *   "working-capital". "How working capital works." → steps (a real sequence; the timeline numbers
 *   it, so the live 01–04 markers are dropped). "Financing should understand the business behind
 *   the application." (four boxes beside a photo) → features (split).
 * - "Working capital vs. instant payouts." → compare (two columns). Each live box is one
 *   paragraph; its first sentence is the column subtitle and the other three sentences, joined as
 *   live, are the column body, word for word.
 * - Feature "Business-oriented evaluation": the placeholder text is dropped and the item flagged (C2).
 * - Related solutions: the template's title "Related solutions" and menu labels in live order;
 *   "Reporting & Analytics" → Reporting.
 * - The bigger picture: Grow's heading and this page's paragraph, as live; the lifecycle row
 *   (Accept, Protect, Grow, Operate) becomes the template's links to the other three pillars.
 * - FAQ answers 1–6 and 8: the placeholder text is dropped and the answer flagged (C2).
 *
 * Dropped:
 * - The "why" section photo (C5).
 * - The "Compare Cash Flow Solutions" button under the comparison (§5 drops it; the capture links
 *   it to /contact-us/, a contact-page link outside the CTA vocabulary: the hero expert button and
 *   the closing band lead to the same conversation).
 * - Related section heading "More capabilities that connect to working capital." (the template's
 *   "Related solutions" is used).
 * - The FAQ footer "Still have questions? We're happy to help." and its "Ready To Get Started?"
 *   button (the template's FAQ line and closing band cover both).
 *
 * Live-site issues:
 * - The section label "Less chasing. More visibility." above "Growth rarely waits for perfect
 *   timing." is the Invoicing and Reporting pages' label.
 * - The hero mock card sits in a container hidden at every breakpoint (desktop, tablet and
 *   mobile), so it doesn't show on the live page.
 * - "How it works" step 1 reads "Beyond/funding provider evaluates the business…": the page doesn't
 *   say whether Beyond or a funding provider carries out the review (kept verbatim).
 * - "Compare Cash Flow Solutions" opens the contact page rather than a comparison.
 * - Feature "Business-Oriented Evaluation" shows its placeholder: "[Placeholder — TODO: VERIFY WITH
 *   BEYOND FUNDING PROGRAM.]".
 * - FAQ answers 1–6 and 8 show their placeholders: "[Placeholder — TODO: VERIFY WITH BEYOND FUNDING
 *   PROGRAM for exact structure.]" (1), "[Placeholder — TODO: VERIFY WITH BEYOND FUNDING
 *   PROGRAM before publishing a specific characterization.]" (4) and "[Placeholder — TODO: VERIFY
 *   WITH BEYOND FUNDING PROGRAM.]" (2, 3, 5, 6, 8).
 */
export const workingCapital = {
  meta: { title: "Working capital" },
  pillar: "Grow",
  kind: "detail",
  breadcrumb: solutionBreadcrumb("Grow", "Working capital"),
  hero: {
    title: "Put capital behind what's next.",
    lead: "Whether you're stocking inventory, upgrading equipment, hiring ahead of demand, or opening the next location, Beyond Bancard helps eligible merchants access working capital designed around the needs of the business.",
    expertCta: "Talk to a funding specialist",
    visual: {
      title: "Business performance review",
      tag: "Illustration",
      // The live rows share one marker: "Terms under review" is the step in progress.
      steps: [
        { label: "Business reviewed", state: "done" },
        { label: "Offer presented", state: "done" },
        { label: "Terms under review", state: "active" },
      ],
    },
  },
  blocks: [
    {
      kind: "features",
      layout: "ruled",
      // The live section anchor.
      id: "working-capital",
      title: "Growth rarely waits for perfect timing.",
      items: [
        {
          title: "Stock inventory",
          body: "Prepare for demand without waiting for existing cash to catch up.",
          icon: "package",
        },
        {
          title: "Upgrade equipment",
          body: "Invest in technology, vehicles, equipment, or infrastructure the business needs to operate and grow.",
          icon: "truck",
        },
        { title: "Hire & train", body: "Add people before the revenue from expanded capacity arrives.", icon: "users" },
        { title: "Expand", body: "Invest in another location, service area, or growth initiative.", icon: "map-pin" },
        {
          title: "Manage seasonal needs",
          body: "Bridge timing differences between expenses and revenue cycles.",
          icon: "calendar",
        },
        {
          title: "Handle unexpected costs",
          body: "Create more flexibility when operating needs change.",
          icon: "alert",
        },
      ],
    },
    {
      kind: "steps",
      title: "How working capital works.",
      steps: [
        {
          title: "Review",
          body: "Beyond/funding provider evaluates the business and applicable eligibility information.",
        },
        { title: "Offer", body: "Eligible businesses receive available funding terms." },
        { title: "Choose", body: "Merchant reviews the amount, cost, repayment structure, and disclosures." },
        { title: "Fund", body: "Approved funds are provided according to program terms." },
      ],
    },
    {
      kind: "features",
      layout: "split",
      title: "Financing should understand the business behind the application.",
      items: [
        {
          title: "Business-oriented evaluation",
          body: "Review criteria that reflect how the business actually operates.",
          icon: "file-search",
          confirm: true,
          note: "Working capital: the review criteria behind a business-oriented evaluation, to verify with the Beyond funding program (live copy marked as a placeholder)",
        },
        {
          title: "Flexible use of funds",
          body: "Apply capital toward the specific need the business is facing.",
          icon: "sliders",
        },
        {
          title: "Clear terms before acceptance",
          body: "Understand the amount, cost, and repayment structure before you commit.",
          icon: "file-text",
        },
        {
          title: "Connected payments relationship",
          body: "Funding that considers the broader payments relationship, not an isolated application.",
          icon: "handshake",
        },
      ],
    },
    {
      kind: "compare",
      title: "Working capital vs. instant payouts.",
      // Each live box is one paragraph: its first sentence leads, the rest is the body, word for word.
      columns: [
        {
          title: "Working capital",
          subtitle: "Access additional capital.",
          body: "Money beyond existing earned card revenue. May create repayment obligations. Appropriate for inventory, expansion, equipment, and larger investment needs.",
        },
        {
          title: "Instant payouts",
          subtitle: "Access earned money faster.",
          body: "Accelerates access to eligible payment proceeds already generated through sales. Not financing. Appropriate for immediate operating cash, weekend/holiday timing, and short-term cash needs.",
        },
      ],
    },
  ],
  related: {
    title: "Related solutions",
    // Live: Instant Payouts, In-Person Payments, Online Payments, Reporting & Analytics (→ Reporting).
    links: [
      solutionLink("Instant payouts"),
      solutionLink("In-person payments"),
      solutionLink("Online payments"),
      solutionLink("Reporting"),
    ],
  },
  bigPicture: {
    title: "Grow is what payments make possible.",
    lead: "Beyond's broader payments ecosystem connects acceptance, protection, and operations around the same growth capabilities.",
  },
  faq: {
    title: "Working capital questions.",
    items: [
      {
        q: "What is merchant working capital?",
        a: "Business funding designed around the performance and needs of the business, made available to eligible merchants.",
        confirm: true,
        note: "Working capital: the exact structure of merchant working capital, to verify with the Beyond funding program (live answer marked as a placeholder)",
      },
      {
        q: "How much working capital can I qualify for?",
        a: "Amounts depend on your business profile and the funding program's evaluation.",
        confirm: true,
        note: "Working capital: how funding amounts are determined, to verify with the Beyond funding program (live answer marked as a placeholder)",
      },
      {
        q: "How is eligibility determined?",
        a: "Eligibility criteria depend on the specific funding program.",
        confirm: true,
        note: "Working capital: the eligibility criteria, to verify with the Beyond funding program (live answer marked as a placeholder)",
      },
      {
        q: "Is working capital a loan?",
        a: "The exact product structure depends on Beyond's funding program and provider.",
        confirm: true,
        note: "Working capital: whether working capital is a loan (the product structure), to verify with the Beyond funding program before publishing a specific characterization (live answer marked as a placeholder)",
      },
      {
        q: "How quickly can funding be available?",
        a: "Timing depends on the program and underwriting.",
        confirm: true,
        note: "Working capital: how quickly funding can be available, to verify with the Beyond funding program (live answer marked as a placeholder)",
      },
      {
        q: "How is repayment structured?",
        a: "Repayment terms depend on the specific program offered.",
        confirm: true,
        note: "Working capital: how repayment is structured, to verify with the Beyond funding program (live answer marked as a placeholder)",
      },
      {
        q: "What can I use working capital for?",
        a: "Common uses include inventory, equipment, hiring, expansion, seasonal needs, and unexpected costs.",
      },
      {
        q: "Does applying affect my credit?",
        a: "This depends on the funding program's evaluation process.",
        confirm: true,
        note: "Working capital: whether applying affects the merchant's credit, to verify with the Beyond funding program (live answer marked as a placeholder)",
      },
    ],
  },
} satisfies SolutionPageContent;
