import type { SolutionPageContent } from "@/types/content";
import { solutionBreadcrumb, solutionLink } from "@/content/solutions/links";

/**
 * Chargeback protection (D-058). Copy is the live beyondbancard.com/protect/chargeback-protection/
 * page (captured 21 Sept 2026), in live section order.
 *
 * Edits:
 * - Headings, feature and step titles and hero mock labels in sentence case ("Ratio pressure",
 *   "Customer initiates a dispute", "Dispute received", …); section h2s end with a full stop;
 *   straight apostrophes. The hero lead doesn't name Beyond, so "Beyond" → "Beyond Bancard" at
 *   the first mention, the bigger picture lead.
 * - Section labels above the headings ("Chargeback Protection", "Why earlier matters", "How it
 *   works", "Configure the response", "Why it matters", "Part of a bigger strategy", "Related
 *   solutions", "The bigger picture", "FAQ") are not repeated as eyebrows (D-003).
 * - Hero h1 is the live hero h2. Hero expert button "Talk to a Chargeback Expert" → "Talk to a
 *   chargeback expert"; the second action is the standard "Apply now".
 * - Hero mock card → HeroFile "Dispute #48291" (Example: it shows a dispute number): the three
 *   live checklist items as done steps and "Chargeback avoided" as the approved status.
 * - "By the time a chargeback posts…" → features (panel): its 01–03 boxes are not a sequence, so
 *   the markers are dropped. "How proactive dispute resolution works." → steps (a real sequence;
 *   the timeline numbers it), keeping the live anchor "how-it-works".
 * - "Put rules behind the decision." → statement, flagged (§5). "Get ahead of the dispute, not
 *   just the chargeback." → features (split). "Not every dispute is the same." → statement.
 * - Related solutions: the template's title "Related solutions" and menu labels ("Fraud & Risk
 *   Tools" → Fraud & risk tools, "Reporting & Analytics" → Reporting).
 * - The bigger picture: Protect's heading and this page's paragraph, as live; the lifecycle row
 *   (Accept, Protect, Grow, Operate) becomes the template's links to the other three pillars.
 * - FAQ heading "Dashboard & reporting questions." → "Chargeback protection questions." (§5).
 * - FAQ answers 5 and 6: the placeholder text is dropped and the answer flagged (C2).
 *
 * Dropped:
 * - Hero button "See How It Works" (an in-page jump to #how-it-works).
 * - The hero mock's "Evaluating…" header text and the "✓" before "Chargeback Avoided": the panel
 *   shows the finished check, its steps tick in before the status.
 * - The internal paragraph under "Put rules behind the decision.": "TODO: VERIFY RDR RULE
 *   CONFIGURATION — exact rule dimensions depend on the underlying dispute-resolution
 *   implementation and are not confirmed here." (C2).
 * - The "why it matters" photo (C5).
 * - Related section heading "More capabilities that connect to chargeback protection." (the
 *   template's title stands in).
 * - The FAQ footer "Still have questions? We're happy to help." and its "Ready To Get Started?"
 *   button (the template's FAQ line and closing band cover both).
 *
 * Live-site issues:
 * - The FAQ heading "Dashboard & reporting questions." is the Reporting page's.
 * - "Put rules behind the decision." shows its internal TODO paragraph on the live page.
 * - FAQ answers 5 and 6 show their placeholders: "[Placeholder — TODO: VERIFY WITH BEYOND.]" and
 *   "[Placeholder — TODO: VERIFY RDR RULE CONFIGURATION.]".
 * - FAQ answer 5's "Do not assume equivalent Mastercard coverage." reads like a note to the writer
 *   rather than to the merchant (kept verbatim; the answer is flagged and its note asks the client).
 */
export const chargebackProtection = {
  meta: { title: "Chargeback protection" },
  pillar: "Protect",
  kind: "detail",
  breadcrumb: solutionBreadcrumb("Protect", "Chargeback protection"),
  hero: {
    title: "Resolve more disputes before they become chargebacks.",
    lead: "Proactive dispute-resolution capabilities can help eligible Visa disputes get addressed earlier — reducing unnecessary chargeback volume, operational work, and pressure on account health.",
    expertCta: "Talk to a chargeback expert",
    visual: {
      title: "Dispute #48291",
      tag: "Example",
      steps: [
        { label: "Dispute received", state: "done" },
        { label: "Rules evaluated", state: "done" },
        { label: "Eligible for resolution", state: "done" },
      ],
      status: { label: "Chargeback avoided", tone: "approved" },
    },
  },
  blocks: [
    {
      kind: "features",
      layout: "panel",
      title: "By the time a chargeback posts, the damage has already started.",
      lead: "The strongest chargeback strategy is not simply responding faster. It's preventing eligible disputes from becoming chargebacks in the first place.",
      items: [
        {
          title: "Cost",
          body: "A chargeback can mean the transaction amount, fees, and internal handling cost.",
          icon: "banknote",
        },
        {
          title: "Ratio pressure",
          body: "Higher dispute activity can affect processing health and network monitoring exposure.",
          icon: "gauge",
        },
        {
          title: "Operational work",
          body: "Traditional disputes require time, evidence, and manual attention.",
          icon: "file-search",
        },
      ],
    },
    {
      kind: "steps",
      // The live section anchor (the hero's "See How It Works" button jumped here).
      id: "how-it-works",
      title: "How proactive dispute resolution works.",
      steps: [
        { title: "Customer initiates a dispute", body: "The cardholder raises a qualifying Visa dispute." },
        { title: "Resolution rules are evaluated", body: "The dispute is checked against configured criteria." },
        {
          title: "Eligible dispute is resolved",
          body: "If the dispute matches the approved resolution criteria, it may be resolved before a chargeback posts.",
        },
        {
          title: "Chargeback is avoided",
          body: "The eligible dispute is closed earlier rather than entering the traditional chargeback process.",
        },
      ],
    },
    {
      kind: "statement",
      title: "Put rules behind the decision.",
      // The live TODO paragraph that follows is internal (dropped); the rule dimensions are unconfirmed.
      // Same note as FAQ answer 6 (the same open question), so the confirm list asks it once.
      body: [
        "Resolution criteria can potentially reflect factors such as transaction amount, dispute category or reason, merchant-defined criteria, and other supported dispute attributes.",
      ],
      confirm: true,
      note: "Chargeback protection: which resolution criteria (RDR rule dimensions) merchants can configure (live section copy and FAQ answer marked for verification)",
    },
    {
      kind: "features",
      layout: "split",
      title: "Get ahead of the dispute, not just the chargeback.",
      items: [
        {
          title: "Reduce chargeback volume",
          body: "Resolve eligible disputes earlier so fewer reach the chargeback stage.",
          icon: "shield",
        },
        {
          title: "Protect account health",
          body: "Lower avoidable dispute pressure on the merchant's processing profile.",
          icon: "activity",
        },
        {
          title: "Reduce manual work",
          body: "Automate eligible resolution activity instead of requiring manual handling for every dispute.",
          icon: "zap",
        },
        {
          title: "Act earlier",
          body: "Shift the dispute strategy upstream instead of reacting only after a chargeback posts.",
          icon: "clock",
        },
      ],
    },
    {
      kind: "statement",
      title: "Not every dispute is the same.",
      body: [
        "Proactive resolution is one part of a complete chargeback strategy. A durable approach also involves clearer descriptors, sound refund practices, fraud controls, 3D Secure, responsive customer service, disciplined recurring billing management, transaction monitoring, and representment where appropriate.",
      ],
    },
  ],
  related: {
    title: "Related solutions",
    // Live: 3D Secure, Fraud & Risk Tools, Online Payments, Reporting & Analytics.
    links: [
      solutionLink("3D Secure"),
      solutionLink("Fraud & risk tools"),
      solutionLink("Online payments"),
      solutionLink("Reporting"),
    ],
  },
  bigPicture: {
    title: "Protect is what happens around every transaction.",
    // First mention of Beyond on the page (the hero lead doesn't name it).
    lead: "Beyond Bancard's broader payments ecosystem connects acceptance, funding, and operations around the same protection layer.",
  },
  faq: {
    // The live heading is the Reporting page's ("Dashboard & reporting questions."; §5).
    title: "Chargeback protection questions.",
    items: [
      {
        q: "What is proactive dispute resolution?",
        a: "A capability that can resolve eligible disputes before they become full chargebacks, based on configured rules and network support.",
      },
      {
        q: "How is this different from responding to a chargeback?",
        a: "Traditional chargeback response happens after a chargeback has already posted; proactive resolution aims to address the dispute before that point, where eligible.",
      },
      {
        q: "Does every dispute qualify for early resolution?",
        a: "No — eligibility depends on the dispute type, card network, and configured criteria.",
      },
      {
        q: "Does this eliminate all chargebacks?",
        a: "No. It's one part of a broader chargeback-management strategy, not a complete replacement for it.",
      },
      {
        q: "Is this available for Mastercard disputes?",
        a: "Availability depends on card network and the dispute-resolution services enabled for the merchant. Do not assume equivalent Mastercard coverage.",
        confirm: true,
        note: "Chargeback protection: Mastercard dispute coverage, and whether 'Do not assume equivalent Mastercard coverage.' is meant for merchants (live answer marked as a placeholder)",
      },
      {
        q: "Can I control which disputes are resolved?",
        a: "Resolution criteria can be configured within supported parameters.",
        confirm: true,
        note: "Chargeback protection: which resolution criteria (RDR rule dimensions) merchants can configure (live section copy and FAQ answer marked for verification)",
      },
      {
        q: "Can this help reduce my chargeback ratio?",
        a: "It can help by resolving eligible disputes before they count as chargebacks, though exact impact depends on your dispute mix.",
      },
      {
        q: "Does Beyond also help prevent disputes before they happen?",
        a: "Yes — fraud tools, 3D Secure, and clear billing practices all play a role in preventing disputes in the first place.",
      },
    ],
  },
} satisfies SolutionPageContent;
