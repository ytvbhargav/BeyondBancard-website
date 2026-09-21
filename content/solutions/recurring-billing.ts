import type { SolutionPageContent } from "@/types/content";
import { solutionBreadcrumb, solutionLink } from "@/content/solutions/links";

/**
 * Recurring billing (D-058). Copy is the live beyondbancard.com/grow/recurring-billing/ page
 * (captured 21 Sept 2026), in live section order.
 *
 * Edits:
 * - Headings, feature titles, chips, flow stages, hub labels and hero mock labels in sentence
 *   case ("Customer authorization", "Billing schedule", "Installment schedules", "Repeat B2B
 *   payments", "More predictable collections", "Fraud & risk", "Stronger recurring payment
 *   environment", "Subscription plan", "Authorized once", "Auto-charging", …); section h2s end
 *   with a full stop; straight apostrophes. The hero lead doesn't name Beyond, so "Beyond" →
 *   "Beyond Bancard" at the first mention, the bigger picture lead.
 * - Section labels above the headings ("Recurring Billing", "Automate the payment schedule",
 *   "Where this fits", "More than automation", "Protect the recurring relationship", "Related
 *   solutions", "The bigger picture", "FAQ") are not repeated as eyebrows (D-003).
 * - Hero h1 is the live hero h2. Hero actions are the standard expert button and "Apply now";
 *   the live "Explore Recurring Billing" (in-page jump to #recurring-billing) and "Talk to a
 *   Payments Expert" buttons are not used ("payments expert" names no specialist, so the default
 *   "Talk to an expert" label stays).
 * - Hero mock card → HeroFile "Subscription plan" (Example: it shows a figure): "$49.00 / mo" as
 *   the amount, the three live stages as steps and "Active" as the status. The amount has no live
 *   label and none is drafted (C6). The live stages share one marker (no done/active state), so the
 *   first two are shown as done and Auto-charging as active, to match "Active". The live card is
 *   set hidden at every breakpoint; its labels are used as §5 of the design spec plans.
 * - "Set the relationship once. Keep payments moving." → flow ("Billing schedule" is the live dark
 *   node), keeping the live anchor "recurring-billing". Its scheduling line is the flow note,
 *   flagged, with the placeholder text dropped (C2, §5).
 * - "Built for repeat business." → chips (the six labels are set as h2s on the live page).
 * - "Fewer manual invoices, more predictable collections." (four boxes beside a photo) → features
 *   (split).
 * - "Stored payments need more than a schedule." → hub: the four live labels in, the live
 *   "Stronger Recurring Payment Environment" node as the centre, no outputs (§5). The paragraph's
 *   first sentence is the lead.
 * - Related solutions: the template's title "Related solutions" and menu labels in live order;
 *   "Reporting & Analytics" → Reporting.
 * - The bigger picture: Grow's heading and this page's paragraph, as live; the lifecycle row
 *   (Accept, Protect, Grow, Operate) becomes the template's links to the other three pillars.
 * - FAQ answers 3, 5, 6 and 8: the placeholder text is dropped and the answer flagged (C2).
 *
 * Dropped:
 * - The hero mock's "Cash Discount", "Dual Pricing" and "Surcharging" chips (Cost-reduction
 *   programs' copy, §5).
 * - The "why" section photo (C5).
 * - The hub paragraph's second sentence, an internal note: "Beyond does not claim automatic
 *   credential updates unless verified." (C2, §5).
 * - Related section heading "More capabilities that connect to recurring billing." (the
 *   template's title stands in).
 * - Related "Reconciliation" (links to "#", C4).
 * - The FAQ footer "Still have questions? We're happy to help." and its "Ready To Get Started?"
 *   button (the template's FAQ line and closing band cover both).
 *
 * Live-site issues:
 * - The browser title is the generic "Merchant Processing Service Provider - Online Processing".
 * - The hero mock lists "Cash Discount", "Dual Pricing" and "Surcharging", copied from
 *   Cost-reduction programs.
 * - The flow's scheduling line shows its placeholder: "[Placeholder — confirm supported
 *   scheduling options.]".
 * - The hub paragraph publishes the internal note "Beyond does not claim automatic credential
 *   updates unless verified.".
 * - Related "Reconciliation" links to "#".
 * - FAQ answers 3, 5, 6 and 8 show their placeholders: "[Placeholder — confirm supported
 *   scheduling options.]", "[Placeholder — confirm specific update behavior.]", "[Placeholder —
 *   TODO: VERIFY WITH BEYOND.]" and "[Placeholder — confirm current integration options.]".
 */
export const recurringBilling = {
  meta: { title: "Recurring billing" },
  pillar: "Grow",
  kind: "detail",
  breadcrumb: solutionBreadcrumb("Grow", "Recurring billing"),
  hero: {
    title: "Make repeat revenue easier to repeat.",
    lead: "Automate scheduled payments for subscriptions, memberships, service plans, retainers, and other ongoing customer relationships — so businesses spend less time chasing the same payment twice.",
    visual: {
      title: "Subscription plan",
      tag: "Example",
      status: { label: "Active", tone: "neutral" },
      amount: { value: "$49.00 / mo" },
      // The live stages share one marker (no done/active state): shown as a running plan, with
      // Auto-charging ongoing to match "Active".
      steps: [
        { label: "Authorized once", state: "done" },
        { label: "Scheduled", state: "done" },
        { label: "Auto-charging", state: "active" },
      ],
    },
  },
  blocks: [
    {
      kind: "flow",
      // The live section anchor (the hero's "Explore Recurring Billing" button jumped here).
      id: "recurring-billing",
      title: "Set the relationship once. Keep payments moving.",
      nodes: [
        { label: "Customer authorization" },
        { label: "Payment method" },
        { label: "Billing schedule" },
        { label: "Automated charge" },
        { label: "Reporting" },
      ],
      focus: 2,
      footnote: "Scheduling concepts may include weekly, monthly, annual, or custom intervals.",
      footnoteFlag: {
        confirm: true,
        note: "Recurring billing: supported scheduling options (live copy marked as a placeholder)",
      },
    },
    {
      kind: "chips",
      title: "Built for repeat business.",
      chips: [
        "Subscriptions",
        "Memberships",
        "Service plans",
        "Retainers",
        "Installment schedules",
        "Repeat B2B payments",
      ],
    },
    {
      kind: "features",
      layout: "split",
      title: "Fewer manual invoices, more predictable collections.",
      items: [
        {
          title: "More predictable collections",
          body: "Reduce the guesswork around when repeat revenue actually arrives.",
          icon: "calendar",
        },
        {
          title: "Less manual billing work",
          body: "Automate the parts of billing that don't need a human touch.",
          icon: "zap",
        },
        {
          title: "Better customer convenience",
          body: "Give customers a smoother way to pay for ongoing relationships.",
          icon: "users",
        },
        {
          title: "Connected payment visibility",
          body: "See recurring activity in the same reporting environment as the rest of your business.",
          icon: "chart",
        },
      ],
    },
    {
      kind: "hub",
      title: "Stored payments need more than a schedule.",
      // The live paragraph's first sentence; the second is an internal note (dropped, §5).
      lead: "Network tokenization may help payment continuity for stored-credential environments depending on actual implementation.",
      inputs: ["Recurring billing", "Network tokenization", "Fraud & risk", "Reporting"],
      // The live centre node; no outputs, so it reads as the outcome.
      center: "Stronger recurring payment environment",
    },
  ],
  related: {
    title: "Related solutions",
    // Live: Network Tokenization, Online Payments, ACH & eCheck, Reporting & Analytics
    // (→ Reporting) and Reconciliation (links to "#", dropped).
    links: [
      solutionLink("Network tokenization"),
      solutionLink("Online payments"),
      solutionLink("ACH & eCheck"),
      solutionLink("Reporting"),
    ],
  },
  bigPicture: {
    title: "Grow is what payments make possible.",
    // First mention of Beyond on the page (the hero lead doesn't name it).
    lead: "Beyond Bancard's broader payments ecosystem connects acceptance, protection, and operations around the same growth capabilities.",
  },
  faq: {
    title: "Recurring billing questions.",
    items: [
      {
        q: "What is recurring billing?",
        a: "A way to automate scheduled payments for subscriptions, memberships, and other ongoing customer relationships.",
      },
      {
        q: "What businesses use recurring payments?",
        a: "Subscription businesses, membership organizations, service providers, and B2B companies with repeat billing relationships, among others.",
      },
      {
        q: "Can customers choose their billing schedule?",
        a: "Scheduling flexibility depends on the specific setup.",
        confirm: true,
        note: "Recurring billing: supported scheduling options (live answer marked as a placeholder)",
      },
      {
        q: "Can recurring payments use cards and ACH?",
        a: "Yes — recurring billing can typically support both card and bank-based payment methods.",
      },
      {
        q: "What happens when a card expires?",
        a: "Depending on network and issuer support, tokenization may help maintain continuity.",
        confirm: true,
        note: "Recurring billing: specific card-update behavior when a stored card expires (live answer marked as a placeholder)",
      },
      {
        q: "Can customers cancel recurring billing?",
        a: "Cancellation processes depend on your specific setup and policies.",
        confirm: true,
        note: "Recurring billing: how customers cancel recurring billing, to verify with Beyond (live answer marked as a placeholder)",
      },
      {
        q: "How are recurring payments reported?",
        a: "Recurring transactions appear within your broader payment reporting environment.",
      },
      {
        q: "Can recurring billing integrate into my current system?",
        a: "Integration depends on your existing platform.",
        confirm: true,
        note: "Recurring billing: current integration options (live answer marked as a placeholder)",
      },
    ],
  },
} satisfies SolutionPageContent;
