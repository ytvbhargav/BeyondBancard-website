import type { SolutionPageContent } from "@/types/content";
import { solutionBreadcrumb, solutionLink } from "@/content/solutions/links";
import { keepArrows } from "@/lib/typography";

/**
 * Instant payouts (D-058). Copy is the live beyondbancard.com/grow/instant-payouts/ page
 * (captured 21 Sept 2026), in live section order.
 *
 * Edits:
 * - Headings, feature titles, column titles and hero mock labels in sentence case ("Traditional
 *   flow", "Expedited / instant payout", "Cover an unexpected expense", "Manage weekend / holiday
 *   timing", "Today's card sales", "Earned revenue", …); section h2s end with a full stop;
 *   straight apostrophes. The hero lead doesn't name Beyond, so "Beyond" → "Beyond Bancard" at
 *   the first mention in the page copy (the bigger picture lead).
 * - Hero h1 is the live hero h2. Hero actions are the expert button, labelled with the live "Talk
 *   to a Funding Specialist" in sentence case, and "Apply now"; the live "Explore Working
 *   Capital" button (an in-page jump) is not used.
 * - Section labels above the headings ("Instant Payouts", "Why timing matters", "Put cash back to
 *   work", "Simple when you need it", "Not the same as working capital", "Related solutions",
 *   "The bigger picture", "FAQ") are not repeated as eyebrows (D-003).
 * - Hero mock card → HeroFile "Instant payout" (Example: it shows a figure), titled with the
 *   card's own "Instant Payout" button label: "Today's card sales" $4,820.00 as the amount and the
 *   two path endpoints as steps. The live path's fill and dot carry the `active` class (filled to
 *   the end), so both endpoints are shown as done. No status: the live card has none.
 * - "Revenue earned isn't always revenue available." (traditional vs. expedited) and "Two
 *   different tools, two different jobs." (instant payout vs. working capital) → compare (§5).
 *   The first keeps no anchor: its live anchor "working-capital" names another page.
 * - "When earned revenue needs to move faster." → features (ruled); "Your revenue. Available
 *   sooner." → features (split).
 * - Related solutions: the template's title "Related solutions" and menu labels; "Reporting &
 *   Analytics" → Reporting.
 * - The bigger picture: Grow's heading and this page's paragraph, as live; the lifecycle row
 *   (Accept, Protect, Grow, Operate) becomes the template's links to the other three pillars.
 * - FAQ answers 3–8: the placeholder text is dropped and the answer flagged (C2).
 * - The "→" in both compares' column text carries a non-breaking space after it (keepArrows) so each
 *   arrow stays with the stage it points to on a narrow screen; the visible text is unchanged.
 *
 * Dropped:
 * - The hero mock's "Instant Payout" button (links to null; its label titles the panel) and the
 *   path bar between the endpoints (C6).
 * - The "why" section photo (C5).
 * - The "Compare Cash Flow Solutions" button under "Two different tools…" (a contact-page link
 *   outside the CTA vocabulary; the hero expert button and the closing band lead to the same
 *   conversation).
 * - Related section heading "More capabilities that connect to instant payouts." (the template's
 *   "Related solutions" is used).
 * - Related "Merchant Tools" and "Reconciliation" (link to "#", no menu page; C4, §5).
 * - The FAQ footer "Still have questions? We're happy to help." and its "Ready To Get Started?"
 *   button (the template's FAQ line and closing band cover both).
 *
 * Live-site issues:
 * - Hero button "Explore Working Capital" jumps to "#working-capital", the anchor of this page's
 *   "Why timing matters" section, not to the Working capital page.
 * - The hero mock card sits in a container hidden at every breakpoint (desktop, tablet and
 *   mobile), as on the Grow hub, so it doesn't show on the live page; its "Instant Payout" button
 *   links to null.
 * - "Compare Cash Flow Solutions" opens the contact page rather than a comparison.
 * - Related "Merchant Tools" and "Reconciliation" link to "#".
 * - FAQ answers 3–8 show their placeholders: "[Placeholder — TODO: VERIFY WITH BEYOND PAYOUT
 *   PROGRAM.]" (3–7) and "[Placeholder — TODO: VERIFY WITH BEYOND PAYOUT PROGRAM for exact
 *   deposit details.]" (8).
 */
export const instantPayouts = {
  meta: { title: "Instant payouts" },
  pillar: "Grow",
  kind: "detail",
  breadcrumb: solutionBreadcrumb("Grow", "Instant payouts"),
  hero: {
    title: "Stop waiting for money you've already earned.",
    lead: "When timing matters, eligible merchants can access payment proceeds faster instead of waiting through traditional settlement timelines.",
    expertCta: "Talk to a funding specialist",
    visual: {
      // Titled with the live card's "Instant Payout" button label.
      title: "Instant payout",
      tag: "Example",
      amount: { label: "Today's card sales", value: "$4,820.00" },
      // The live path is filled to the end (its `active` class), so both endpoints are done.
      steps: [
        { label: "Earned revenue", state: "done" },
        { label: "Available now", state: "done" },
      ],
    },
  },
  blocks: [
    {
      kind: "compare",
      title: "Revenue earned isn't always revenue available.",
      columns: [
        {
          title: "Traditional flow",
          body: keepArrows("Sale → Processing → Settlement → Bank Availability, following standard settlement timing."),
        },
        {
          title: "Expedited / instant payout",
          body: keepArrows("Sale → Faster Access, shortening the gap depending on eligibility and program availability."),
        },
      ],
    },
    {
      kind: "features",
      layout: "ruled",
      title: "When earned revenue needs to move faster.",
      items: [
        { title: "Make payroll", body: "Cover payroll timing without waiting on settlement.", icon: "users" },
        {
          title: "Restock inventory",
          body: "Reorder when the opportunity is in front of you, not after funds settle.",
          icon: "package",
        },
        {
          title: "Cover an unexpected expense",
          body: "Handle a surprise cost without disrupting operations.",
          icon: "alert",
        },
        {
          title: "Take advantage of an opportunity",
          body: "Move fast on a time-sensitive deal or purchase.",
          icon: "trending-up",
        },
        {
          title: "Manage weekend / holiday timing",
          body: "Bridge gaps created by non-banking days.",
          icon: "calendar",
        },
        {
          title: "Keep operations moving",
          body: "Reduce the number of things waiting on cash timing.",
          icon: "activity",
        },
      ],
    },
    {
      kind: "features",
      layout: "split",
      title: "Your revenue. Available sooner.",
      items: [
        {
          title: "Access earned revenue sooner",
          body: "Get to funds you've already generated through sales, faster.",
          icon: "zap",
        },
        { title: "No new borrowing", body: "This is your revenue, not a financing product.", icon: "wallet" },
        {
          title: "Use only when needed",
          body: "Access faster funding on your terms, not as a default.",
          icon: "sliders",
        },
        {
          title: "Connected to payment activity",
          body: "Built around the sales activity already flowing through your account.",
          icon: "link",
        },
      ],
    },
    {
      kind: "compare",
      title: "Two different tools, two different jobs.",
      // Short taglines, so `subtitle` (as on Working capital); the first compare's longer sentences are `body`.
      columns: [
        { title: "Instant payout", subtitle: keepArrows("Existing earned revenue → available sooner.") },
        { title: "Working capital", subtitle: keepArrows("Additional funding → repayment required.") },
      ],
    },
  ],
  related: {
    title: "Related solutions",
    // Live: Working Capital, Reporting & Analytics, Merchant Tools and Reconciliation (both "#",
    // dropped).
    links: [solutionLink("Working capital"), solutionLink("Reporting")],
  },
  bigPicture: {
    title: "Grow is what payments make possible.",
    // First mention of Beyond on the page, so the full name (the hero lead doesn't name Beyond).
    lead: "Beyond Bancard's broader payments ecosystem connects acceptance, protection, and operations around the same growth capabilities.",
  },
  faq: {
    title: "Instant payout questions.",
    items: [
      {
        q: "What is an instant payout?",
        a: "Faster access to eligible card-sale proceeds instead of waiting through the traditional settlement timeline.",
      },
      {
        q: "Is an instant payout a loan?",
        a: "No — it accelerates access to revenue you've already earned; it is not a financing or borrowing product.",
      },
      {
        q: "How quickly are funds available?",
        a: "Timing depends on eligibility and program availability.",
        confirm: true,
        note: "Instant payouts: how quickly payout funds are available, to verify with the Beyond payout program (live answer marked as a placeholder)",
      },
      {
        q: "Are instant payouts available every day?",
        a: "Availability may vary by day and program.",
        confirm: true,
        note: "Instant payouts: which days instant payouts are available, to verify with the Beyond payout program (live answer marked as a placeholder)",
      },
      {
        q: "Is there a fee?",
        a: "Fee structure depends on the specific payout program.",
        confirm: true,
        note: "Instant payouts: the instant payout fee structure, to verify with the Beyond payout program (live answer marked as a placeholder)",
      },
      {
        q: "How much can I access?",
        a: "Available amounts depend on eligible processing activity.",
        confirm: true,
        note: "Instant payouts: how much a merchant can access through an instant payout, to verify with the Beyond payout program (live answer marked as a placeholder)",
      },
      {
        q: "Which merchants are eligible?",
        a: "Eligibility depends on account standing and program criteria.",
        confirm: true,
        note: "Instant payouts: merchant eligibility criteria for instant payouts, to verify with the Beyond payout program (live answer marked as a placeholder)",
      },
      {
        q: "Where are funds deposited?",
        a: "Funds are typically deposited to your linked bank account.",
        confirm: true,
        note: "Instant payouts: exact deposit details for instant payouts, to verify with the Beyond payout program (live answer marked as a placeholder)",
      },
    ],
  },
} satisfies SolutionPageContent;
