import type { SolutionPageContent } from "@/types/content";
import { solutionBreadcrumb, solutionLink } from "@/content/solutions/links";
import { keepTogether } from "@/lib/typography";

/**
 * The product name with a non-breaking space (U+00A0, which Archivo has), so a balanced
 * heading can't split it as "3D" / "Secure". The text is otherwise unchanged.
 */
const productName = "3D\u00a0Secure";

/**
 * 3D Secure (D-058). Copy is the live beyondbancard.com/protect/3d-secure/ page
 * (captured 21 Sept 2026), in live section order.
 *
 * Edits:
 * - Headings, step and feature titles, chips, hub labels and hero mock labels in sentence case
 *   ("Customer starts checkout", "Reduced unauthorized-use exposure", "Card-not-present",
 *   "Fraud screening", "Low-risk signal", …); section h2s end with a full stop; straight
 *   apostrophes. The hero lead doesn't name Beyond, so "Beyond" → "Beyond Bancard" at the first
 *   mention, the bigger picture lead.
 * - Section labels above the headings ("3D Secure", "How it works", "Security without default
 *   friction", "Where this fits", "One signal among several", "Related solutions", "The bigger
 *   picture", "FAQ") are not repeated as eyebrows (D-003).
 * - Hero h1 is the live hero h2. Hero expert button "Talk to a Payments Risk Expert" → "Talk to a
 *   payments risk expert"; the second action is the standard "Apply now".
 * - Hero mock card → HeroFile (Example: it shows a figure). The card has no title, so it takes the
 *   hero's own label, "3D Secure"; $286.40 is the amount, shown alone as on the live card (no label
 *   drafted, C6); the two live checklist items are done steps and "Proceed to authorization" is the
 *   approved status.
 * - "How 3D Secure works." → steps (a real sequence; the timeline numbers it), keeping the live
 *   anchor "how-it-works".
 * - "Challenge the transaction when necessary — not every customer." (four boxes beside a photo) →
 *   features (split). "Where 3D Secure matters most." → chips.
 * - "Authentication is one signal, not the entire fraud strategy." → hub: the four live signals in,
 *   the live "Stronger Payment Risk Strategy" node as the centre, no outputs (§5).
 * - Related solutions: the template's title "Related solutions" and menu labels.
 * - The bigger picture: Protect's heading and this page's paragraph, as live; the lifecycle row
 *   (Accept, Protect, Grow, Operate) becomes the template's links to the other three pillars.
 * - FAQ heading "Dashboard & reporting questions." → "3D Secure questions." (§5).
 * - FAQ answers 5, 6 and 7: the placeholder text is dropped and the answer flagged (C2).
 * - "3D Secure" in the section h2s ("How 3D Secure works.", "Where 3D Secure matters most.",
 *   "3D Secure questions.") takes a non-breaking space (productName) so no width splits the name
 *   across lines; the visible text is unchanged.
 * - Hyphenated compounds in the step 3 body, a feature title and feature bodies ("Lower-risk",
 *   "higher-risk", "unauthorized-use", "card-not-present", "card-network") carry word joiners
 *   (keepTogether) so they don't break at the hyphen; the visible text is unchanged. FAQ text is
 *   left plain, as on the industry pages.
 *
 * Dropped:
 * - Hero button "Explore 3D Secure" (an in-page jump to #how-it-works).
 * - The hero mock's "Evaluating…" header text and the "✓" before "Proceed to Authorization": the
 *   panel shows the finished check, its steps tick in before the status.
 * - The 01–04 markers on the steps (the timeline numbers them).
 * - The "security without default friction" photo (C5).
 * - The link on the hub centre "Stronger Payment Risk Strategy" (a button linked to null).
 * - Related section heading "More capabilities that connect to chargeback protection." (the
 *   template's title stands in).
 * - The FAQ footer "Still have questions? We're happy to help." and its "Ready To Get Started?"
 *   button (the template's FAQ line and closing band cover both).
 *
 * Live-site issues:
 * - The FAQ heading "Dashboard & reporting questions." is the Reporting page's.
 * - The related section heading "More capabilities that connect to chargeback protection." is the
 *   Chargeback protection page's.
 * - The hub centre "Stronger Payment Risk Strategy" is a button that links to null.
 * - FAQ answers 5, 6 and 7 show their placeholders: "[Placeholder — TODO: VERIFY WITH BEYOND for
 *   specific scenarios.]", "[Placeholder — TODO: VERIFY WITH BEYOND on specific regional
 *   requirements; do not assume blanket European legal requirement without qualification.]" and
 *   "[Placeholder — confirm specific recurring-payment treatment.]".
 */
export const threeDSecure = {
  meta: { title: "3D Secure" },
  pillar: "Protect",
  kind: "detail",
  breadcrumb: solutionBreadcrumb("Protect", "3D Secure"),
  hero: {
    title: "Add stronger authentication without turning checkout into an obstacle.",
    lead: "3D Secure adds an authentication layer to eligible online payments, helping businesses reduce unauthorized transactions while allowing lower-risk purchases to move through a more streamlined experience.",
    expertCta: "Talk to a payments risk expert",
    visual: {
      title: "3D Secure",
      tag: "Example",
      amount: { value: "$286.40" },
      steps: [
        { label: "Low-risk signal", state: "done" },
        { label: "Authenticated frictionlessly", state: "done" },
      ],
      status: { label: "Proceed to authorization", tone: "approved" },
    },
  },
  blocks: [
    {
      kind: "steps",
      // The live section anchor (the hero's "Explore 3D Secure" button jumped here).
      id: "how-it-works",
      title: `How ${productName} works.`,
      steps: [
        { title: "Customer starts checkout", body: "Customer enters payment information." },
        {
          title: "Transaction data is evaluated",
          body: "The authentication flow evaluates transaction and cardholder context.",
        },
        {
          title: "Authenticate when needed",
          body: `${keepTogether("Lower-risk")} transactions may move through with less friction, while ${keepTogether("higher-risk")} transactions may require an additional cardholder challenge.`,
        },
        {
          title: "Continue to authorization",
          body: "The authenticated transaction proceeds to payment authorization.",
        },
      ],
    },
    {
      kind: "features",
      layout: "split",
      title: "Challenge the transaction when necessary — not every customer.",
      items: [
        {
          title: "Stronger cardholder authentication",
          body: "Add an authentication layer appropriate to the transaction's risk.",
          icon: "badge-check",
        },
        {
          title: `Reduced ${keepTogether("unauthorized-use")} exposure`,
          body: `Help reduce the risk of unauthorized card use in ${keepTogether("card-not-present")} transactions.`,
          icon: "lock",
        },
        {
          title: "Risk-based checkout experience",
          body: "Challenge only the transactions that warrant it, not every customer.",
          icon: "sliders",
        },
        {
          title: "Potential liability benefits",
          body: `Certain successfully authenticated transactions may qualify for ${keepTogether("card-network")} liability protections depending on the transaction, market, card network, and applicable rules.`,
          icon: "shield",
        },
      ],
    },
    {
      kind: "chips",
      title: `Where ${productName} matters most.`,
      chips: [
        "Ecommerce",
        "International commerce",
        "Card-not-present",
        "Higher-risk ecommerce",
        "Higher-value online transactions",
        "Digital services",
      ],
    },
    {
      kind: "hub",
      title: "Authentication is one signal, not the entire fraud strategy.",
      inputs: ["3D Secure", "Fraud screening", "Tokenization", "Transaction monitoring"],
      // The live centre node (a button linked to null); no outputs, so it reads as the outcome.
      center: "Stronger payment risk strategy",
    },
  ],
  related: {
    title: "Related solutions",
    // Live: Online Payments, International Payments, Fraud & Risk Tools, Chargeback Protection.
    links: [
      solutionLink("Online payments"),
      solutionLink("International payments"),
      solutionLink("Fraud & risk tools"),
      solutionLink("Chargeback protection"),
    ],
  },
  bigPicture: {
    title: "Protect is what happens around every transaction.",
    // First mention of Beyond on the page (the hero lead doesn't name it).
    lead: "Beyond Bancard's broader payments ecosystem connects acceptance, funding, and operations around the same protection layer.",
  },
  faq: {
    // The live heading is the Reporting page's ("Dashboard & reporting questions."; §5).
    title: `${productName} questions.`,
    items: [
      {
        q: "What is 3D Secure?",
        a: "An authentication protocol that adds a cardholder verification layer to eligible online transactions.",
      },
      {
        q: "Does every customer have to complete an authentication challenge?",
        a: "No — modern, risk-based 3D Secure can allow lower-risk transactions to proceed with less friction while challenging higher-risk ones.",
      },
      {
        q: "Does 3D Secure prevent all fraud?",
        a: "No. It's one layer of a broader fraud and risk strategy, not a complete solution on its own.",
      },
      {
        q: "Can 3D Secure reduce chargebacks?",
        a: "It can help reduce certain types of disputes tied to unauthorized use, though it does not eliminate all chargeback risk.",
      },
      {
        q: "What is liability shift?",
        a: "In some cases, successfully authenticated transactions may qualify for card-network liability protections, depending on the transaction, market, card network, and applicable rules.",
        confirm: true,
        note: "3D Secure: the specific scenarios in which liability shift applies (live answer marked as a placeholder)",
      },
      {
        q: "Is 3D Secure required internationally?",
        a: "Requirements vary by market and regulation.",
        confirm: true,
        note: "3D Secure: specific regional requirements, without assuming a blanket European legal requirement (live answer marked as a placeholder)",
      },
      {
        q: "Does 3D Secure work with recurring payments?",
        a: "3D Secure can apply to certain recurring payment scenarios depending on network rules.",
        confirm: true,
        note: "3D Secure: specific recurring-payment treatment (live answer marked as a placeholder)",
      },
      {
        q: "Can high-risk merchants use 3D Secure?",
        a: "Yes — 3D Secure is available as part of a broader risk strategy for qualifying high-risk merchants.",
      },
    ],
  },
} satisfies SolutionPageContent;
