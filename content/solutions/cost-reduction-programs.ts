import type { SolutionPageContent } from "@/types/content";
import { cta } from "@/content/site";
import { solutionBreadcrumb } from "@/content/solutions/links";

/**
 * Cost-reduction programs (D-058). Copy is the live beyondbancard.com/grow/cost-reduction-programs/
 * page (captured 21 Sept 2026), in live section order.
 *
 * Edits:
 * - Headings, card titles, table labels, feature titles, field labels, link labels and hero mock
 *   labels in sentence case ("Cash discount", "Dual pricing", "Pricing structure", "Customer
 *   disclosure", "Ongoing program support", "Monthly card volume", "Current effective processing
 *   rate", "Compare programs", "Estimate impact", "Explore cash discount", …); section h2s end with a
 *   full stop; straight apostrophes ("don't", "Beyond's"). "Beyond" → "Beyond Bancard" at the first
 *   mention (hero lead).
 * - Hero h1 is the live hero h2. Hero actions are the standard expert button and "Apply now"; the
 *   live "Compare Cost-Reduction Programs" (in-page jump to #cost-reduction) and "Talk to a Payments
 *   Expert" buttons are not used ("payments expert" names no specialist, so the default "Talk to an
 *   expert" label stays).
 * - Section labels above the headings ("Cost-Reduction Programs", "Three different approaches",
 *   "Which program fits?", "Built for plataforms", "See the opportunity", "Current cost estimate",
 *   "The bigger picture", "FAQ") are not repeated as eyebrows (D-003).
 * - Hero mock card → HeroFile (Example: it shows a figure). The live card has no title, so it takes
 *   the hero's own label, "Cost-reduction programs"; "$50,000" with its live label "Monthly card
 *   volume" is the amount, the three programs are the chips and "Compare programs" / "Estimate
 *   impact" the steps. The live items share one marker (no done/active state), so both are shown as
 *   done. No status: the live card has none. The live card is set hidden at every breakpoint; its
 *   labels are used as on the other Grow pages.
 * - "One goal. Different ways to get there." → cards (§5): each tile's small title is the card
 *   title, its heading the tagline, and "Explore …" the link label. The links go to
 *   /grow/cash-discount, /grow/dual-pricing and /grow/surcharging (coming soon, C4).
 * - "Compare the three approaches side by side." → table, keeping the live anchor "cost-reduction".
 *   Cells reading "Text — TODO: VERIFY …" keep the text and are flagged (C2), so production shows
 *   only the two rows without a flag.
 * - "The program is only as good as the way it's implemented." (four boxes beside a photo) →
 *   features (split) with its paragraph as the lead.
 * - The ROI widget → estimator (§5): the live defaults (50,000 and 3.25, which give the live
 *   "$19,500"), the live result label and disclaimer, and "Build My Cost-Reduction Model" → "Build my
 *   cost-reduction model", linking to the expert page.
 * - No related solutions: the live page has none, and the program cards link onward.
 * - The bigger picture: the live heading and paragraph (shared with the other Grow pages); the
 *   lifecycle row (Accept, Protect, Grow, Operate) becomes the template's links to the other three
 *   pillars.
 * - FAQ question 2 keeps the live capitals on the program names, as the Grow hub's copy of the same
 *   question does, with non-breaking spaces inside "Cash Discount" and "Dual Pricing" so it wraps
 *   between names (typography only).
 * - FAQ answers 3–7: the placeholder text is dropped and the answer flagged (C2).
 *
 * Dropped:
 * - The comparison table's paragraph, an internal note: "Table data is configuration-driven so
 *   requirements can be updated as laws and network rules change. Cells marked TODO require
 *   confirmation before publishing exact compliance details." (C2), and the "TODO: VERIFY …" text
 *   in the table cells.
 * - The implementation section photo (C5).
 * - The live "$19,500" estimate figure (the estimator computes it from the defaults).
 * - The internal note under the estimator: "This estimate connects to the same Merchant ROI
 *   experience available from the homepage." (C2).
 * - The Accept / Protect / Grow / Operate grid under the bigger picture (PillarLinks lists the other pillars).
 * - The FAQ footer "Still have questions? We're happy to help." and its "Ready To Get Started?"
 *   button (the template's FAQ line and closing band cover both).
 *
 * Live-site issues:
 * - The browser title is "Merchant Processing Service Provider - Online Processing" (the Online
 *   payments page's).
 * - The hero mock card sits in a container hidden at every breakpoint (desktop, tablet and mobile),
 *   so it doesn't show on the live page.
 * - The section label above "The program is only as good as the way it's implemented." reads
 *   "Built for plataforms" (typo).
 * - The comparison table publishes its internal note ("Table data is configuration-driven…
 *   Cells marked TODO require confirmation…") and "TODO: VERIFY" markers in 12 cells (debit
 *   treatment, signage / disclosure, POS configuration, best-fit merchant models).
 * - "Build My Cost-Reduction Model" links to "beyond-bancard-homepage-mannypay-menu.html#apply", a
 *   prototype file path.
 * - The internal note "This estimate connects to the same Merchant ROI experience available from
 *   the homepage." is published under the estimator (its "Merchant ROI experience" link goes to
 *   "#").
 * - FAQ answers 3–7 show their placeholders: "[Placeholder — TODO: VERIFY WITH BEYOND for
 *   program-specific outcomes.]" (3), "[Placeholder — TODO: VERIFY current debit treatment by
 *   program.]" (4), "[Placeholder — TODO: VERIFY current state/network rules before publishing
 *   specifics.]" (5), "[Placeholder — TODO: VERIFY WITH BEYOND on hardware/software requirements.]"
 *   (6) and "[Placeholder — TODO: VERIFY current signage/disclosure requirements.]" (7).
 */
export const costReductionPrograms = {
  meta: { title: "Cost-reduction programs" },
  pillar: "Grow",
  kind: "detail",
  breadcrumb: solutionBreadcrumb("Grow", "Cost-reduction programs"),
  hero: {
    title: "Keep more of every sale.",
    lead: "Processing costs don't have to be treated as a fixed expense. Beyond Bancard helps merchants evaluate eligible pricing strategies designed to reduce or offset the cost of card acceptance while maintaining a clear customer experience.",
    visual: {
      // The live card has no title: the hero's own label stands in.
      title: "Cost-reduction programs",
      tag: "Example",
      amount: { label: "Monthly card volume", value: "$50,000" },
      methods: ["Cash discount", "Dual pricing", "Surcharging"],
      // The live items share one marker (no done/active state): shown as done.
      steps: [
        { label: "Compare programs", state: "done" },
        { label: "Estimate impact", state: "done" },
      ],
    },
  },
  blocks: [
    {
      kind: "cards",
      title: "One goal. Different ways to get there.",
      // The program pages aren't built yet: these hrefs resolve to coming soon (C4).
      cards: [
        {
          title: "Cash discount",
          tagline: "Reward lower-cost ways to pay.",
          body: "Set pricing appropriately and offer customers a clearly disclosed discount when they use qualifying lower-cost payment methods.",
          link: { label: "Explore cash discount", href: "/grow/cash-discount" },
        },
        {
          title: "Dual pricing",
          tagline: "Show the choice clearly.",
          body: "Display separate prices for cash and card so customers understand the payment economics before checkout.",
          link: { label: "Explore dual pricing", href: "/grow/dual-pricing" },
        },
        {
          title: "Surcharging",
          tagline: "Offset eligible credit-card costs.",
          body: "Add a disclosed surcharge to qualifying credit-card transactions where permitted and configured appropriately.",
          link: { label: "Explore surcharging", href: "/grow/surcharging" },
        },
      ],
    },
    {
      kind: "table",
      // The live section anchor (the hero's "Compare Cost-Reduction Programs" button jumped here).
      id: "cost-reduction",
      title: "Compare the three approaches side by side.",
      columns: ["Cash discount", "Dual pricing", "Surcharging"],
      // Live cells marked "TODO: VERIFY" keep their text and are flagged; production drops those rows.
      rows: [
        {
          label: "Customer sees two prices?",
          cells: [
            { text: "Card price posted; cash price shown as discount" },
            { text: "Yes — both prices shown together" },
            { text: "No — surcharge added at payment" },
          ],
        },
        {
          label: "Credit cards affected?",
          cells: [
            { text: "Yes — discount applies when qualifying lower-cost methods are used" },
            { text: "Yes — card price reflects acceptance cost" },
            { text: "Yes — credit cards only" },
          ],
        },
        {
          label: "Debit treatment",
          cells: [
            {
              text: "Program-dependent",
              confirm: true,
              note: "Cost-reduction programs: debit card treatment under Cash Discount and Dual Pricing (live cells marked for verification)",
            },
            {
              text: "Program-dependent",
              confirm: true,
              note: "Cost-reduction programs: debit card treatment under Cash Discount and Dual Pricing (live cells marked for verification)",
            },
            {
              text: "Not eligible for surcharge by law",
              confirm: true,
              note: "Cost-reduction programs: whether debit cards are ineligible for a surcharge by law (live cell marked for verification)",
            },
          ],
        },
        {
          label: "Signage / disclosure",
          cells: [
            {
              text: "Required",
              confirm: true,
              note: "Cost-reduction programs: current signage and disclosure requirements for each program (live cells marked for verification)",
            },
            {
              text: "Required",
              confirm: true,
              note: "Cost-reduction programs: current signage and disclosure requirements for each program (live cells marked for verification)",
            },
            {
              text: "Required",
              confirm: true,
              note: "Cost-reduction programs: current signage and disclosure requirements for each program (live cells marked for verification)",
            },
          ],
        },
        {
          label: "POS configuration",
          cells: [
            {
              text: "Required",
              confirm: true,
              note: "Cost-reduction programs: the POS configuration each program requires (live cells marked for verification)",
            },
            {
              text: "Required",
              confirm: true,
              note: "Cost-reduction programs: the POS configuration each program requires (live cells marked for verification)",
            },
            {
              text: "Required",
              confirm: true,
              note: "Cost-reduction programs: the POS configuration each program requires (live cells marked for verification)",
            },
          ],
        },
        {
          label: "Best-fit merchant models",
          cells: [
            {
              text: "Retail, service businesses",
              confirm: true,
              note: "Cost-reduction programs: the full list of best-fit merchant models for each program (live cells marked for verification)",
            },
            {
              text: "Retail, restaurants",
              confirm: true,
              note: "Cost-reduction programs: the full list of best-fit merchant models for each program (live cells marked for verification)",
            },
            {
              text: "Higher-ticket, B2B",
              confirm: true,
              note: "Cost-reduction programs: the full list of best-fit merchant models for each program (live cells marked for verification)",
            },
          ],
        },
      ],
    },
    {
      kind: "features",
      layout: "split",
      title: "The program is only as good as the way it's implemented.",
      lead: "Rules and eligibility vary by program, payment method, card network, jurisdiction, and implementation. Beyond helps merchants structure and operate the appropriate program rather than treating every cost-reduction strategy as the same thing.",
      items: [
        {
          title: "Pricing structure",
          body: "Choose and configure the model that fits your business.",
          icon: "tag",
        },
        {
          title: "Customer disclosure",
          body: "Signage and communication built around what's legally required.",
          icon: "megaphone",
        },
        {
          title: "Payment technology",
          body: "POS and gateway configuration that applies the program correctly.",
          icon: "monitor",
        },
        {
          title: "Ongoing program support",
          body: "Stay current as rules and requirements evolve.",
          icon: "headset",
        },
      ],
    },
    {
      kind: "estimator",
      title: "See how different payment-cost strategies could affect your business.",
      // The live defaults: $50,000 at 3.25% gives the live "$19,500".
      volume: { label: "Monthly card volume", defaultValue: 50000 },
      rate: { label: "Current effective processing rate", defaultValue: 3.25 },
      resultLabel: "Estimated current annual processing expense",
      disclaimer:
        "This estimate reflects your current volume and rate — it does not represent a guaranteed savings figure. A cost-reduction model built with our team can show how Cash Discount, Dual Pricing, or Surcharging could apply to your specific business.",
      cta: { label: "Build my cost-reduction model", href: cta.expert.href },
    },
  ],
  bigPicture: {
    title: "Grow is what payments make possible.",
    lead: "Beyond's broader payments ecosystem connects acceptance, protection, and operations around the same growth capabilities.",
  },
  faq: {
    title: "Cost-reduction questions.",
    items: [
      {
        q: "What is zero-cost credit card processing?",
        a: "A general term sometimes used for programs designed to offset card-processing costs; the specific mechanism (Cash Discount, Dual Pricing, or Surcharging) determines how it actually works.",
      },
      {
        q: "What's the difference between Cash\u00a0Discount, Dual\u00a0Pricing, and Surcharging?",
        a: "Each is a distinct program structure with different eligibility, card treatment, disclosure, and configuration requirements — see the comparison above.",
      },
      {
        q: "Can I eliminate all processing fees?",
        a: "No program guarantees $0 processing expense for every transaction.",
        confirm: true,
        note: "Cost-reduction programs: program-specific outcomes, to verify with Beyond (live answer marked as a placeholder)",
      },
      {
        q: "Can debit cards be treated the same as credit cards?",
        a: "No — debit card treatment differs by program and is subject to network rules.",
        confirm: true,
        note: "Cost-reduction programs: current debit card treatment by program (live answer marked as a placeholder)",
      },
      {
        q: "Are these programs legal everywhere?",
        a: "Legality and requirements vary by jurisdiction and can change.",
        confirm: true,
        note: "Cost-reduction programs: current state and network rules for each program, to verify before publishing specifics (live answer marked as a placeholder)",
      },
      {
        q: "Do I need special equipment?",
        a: "Most programs require specific POS or gateway configuration.",
        confirm: true,
        note: "Cost-reduction programs: hardware and software requirements for each program, to verify with Beyond (live answer marked as a placeholder)",
      },
      {
        q: "How should pricing be displayed?",
        a: "Display requirements vary by program and jurisdiction.",
        confirm: true,
        note: "Cost-reduction programs: current signage and disclosure requirements (live answer marked as a placeholder)",
      },
      {
        q: "Which program is best for my business?",
        a: "It depends on your transaction mix, customer base, and jurisdiction — a conversation with our team can help identify the right fit.",
      },
    ],
  },
} satisfies SolutionPageContent;
