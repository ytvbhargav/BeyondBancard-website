import type { SolutionPageContent } from "@/types/content";
import { pickFaq, solutionBreadcrumb, solutionLinkAs } from "@/content/solutions/links";
import { networkTokenization } from "@/content/solutions/network-tokenization";
import { threeDSecure } from "@/content/solutions/3d-secure";
import { fraudRiskTools } from "@/content/solutions/fraud-risk-tools";
import { chargebackProtection } from "@/content/solutions/chargeback-protection";

/**
 * Protect Solutions hub (D-058). Copy is the live beyondbancard.com/protect page
 * (captured 21 Sept 2026), headings and labels in sentence case.
 *
 * Edits:
 * - Hero h1 is the live hero h2; "Beyond" → "Beyond Bancard" in the hero lead (first mention).
 * - Hero expert button "Talk to a Payments Risk Expert" → "Talk to a payments risk expert".
 * - Hero mock card, tile titles, tile links, lifecycle stages and "why" titles in sentence case
 *   ("Transaction — risk checked", "Explore network tokenization", "Account health", …).
 * - The four solution tiles → `cards`; the lifecycle chain → `flow` ("Transaction risk" is the
 *   live dark node); the four "why" boxes → `features` (split).
 * - The section-2 paragraph is the cards lead, verbatim ("Beyond": the hero lead already names
 *   Beyond Bancard). It is not flagged (see live-site issues).
 * - FAQ: the live questions are the Adult page's, so the section reuses five live questions from
 *   the Protect pages by reference (`pickFaq`), under the live heading "Protect questions.".
 * - No related solutions: the live page has none, and the cards already link to every Protect page.
 *
 * Dropped:
 * - Eyebrows "Protect", "Four layers of protection", "Risk is a lifecycle", "Why Operate with
 *   Beyond", "The bigger picture" and "FAQ" (D-003).
 * - Hero button "Explore Protection Solutions" (links to this page).
 * - Solution tile images and the "why" photo (C5).
 * - The live FAQ (eight Adult questions), its "Still have questions? We're happy to help." line and
 *   "Ready To Get Started?" button (the closing band covers it).
 * - The Accept / Protect / Grow / Operate grid under the bigger picture (PillarLinks lists the other pillars).
 *
 * Live-site issues:
 * - The FAQ is a copy of the Adult FAQ (adult business models and underwriting, three placeholder
 *   answers, and the gateway question's answer repeats the next question).
 * - The section-2 lead is the same paragraph as on the Accept and Operate hubs ("Accepting a payment
 *   is only the beginning…"). §5 asks for it flagged, but there is no lead-only flag and a block
 *   flag would drop the card grid, the hub's only links to its four pages, in production (D-042),
 *   so it is kept unflagged, as on Operate.
 * - The bigger-picture lead restates its heading ("Protect connects … what happens after"); the
 *   other hubs use a "Beyond's broader payments ecosystem …" line.
 * - The "why" section is labelled "Why Operate with Beyond" (the Operate hub's label); its h2 is right.
 */
export const protect = {
  meta: { title: "Protect" },
  pillar: "Protect",
  kind: "hub",
  breadcrumb: solutionBreadcrumb("Protect"),
  hero: {
    title: "Protect revenue without slowing good customers down.",
    lead: "Beyond Bancard combines authentication, credential security, fraud controls, and dispute-resolution capabilities to help businesses reduce avoidable payment risk while keeping legitimate transactions moving.",
    expertCta: "Talk to a payments risk expert",
    visual: {
      title: "Transaction lifecycle",
      tag: "Illustration",
      steps: [
        { label: "Credential — tokenized", state: "done" },
        { label: "Authentication — 3D Secure", state: "done" },
        { label: "Transaction — risk checked", state: "done" },
        { label: "Dispute — protected", state: "active" },
      ],
      status: { label: "Protected", tone: "approved" },
    },
  },
  blocks: [
    {
      kind: "cards",
      title: "Protect the payment from checkout through dispute.",
      // Same live paragraph as the Accept and Operate hubs; unflagged (a block flag would drop the
      // cards in production). "Beyond": the hero lead already names Beyond Bancard.
      lead: "Accepting a payment is only the beginning. Beyond helps businesses connect the technology, workflows, and information needed to manage payments from checkout through funding and reconciliation.",
      cards: [
        {
          title: "Network tokenization",
          tagline: "Protect credentials. Keep payments connected.",
          body: "Replace exposed card credentials with network-issued payment tokens that can help secure stored-payment experiences and maintain payment continuity when card details change.",
          link: solutionLinkAs("Network tokenization", "Explore network tokenization"),
        },
        {
          title: "3D Secure",
          tagline: "Authenticate customers when the transaction needs it.",
          body: "Add cardholder authentication to eligible online payments using modern risk-based checks that can challenge higher-risk transactions while allowing lower-risk purchases to move more smoothly.",
          link: solutionLinkAs("3D Secure", "Explore 3D Secure"),
        },
        {
          title: "Fraud & risk tools",
          tagline: "Identify suspicious activity before it becomes loss.",
          body: "Apply payment-risk controls and transaction signals to help identify potentially fraudulent activity while preserving legitimate commerce.",
          link: solutionLinkAs("Fraud & risk tools", "Explore fraud & risk tools"),
        },
        {
          title: "Chargeback protection",
          tagline: "Address disputes before they become bigger problems.",
          body: "Use proactive dispute-resolution capabilities to help resolve eligible disputes earlier, reduce chargeback volume, and protect account health.",
          link: solutionLinkAs("Chargeback protection", "Explore chargeback protection"),
        },
      ],
    },
    {
      kind: "flow",
      title: "Payment risk doesn't begin or end at authorization.",
      lead: "Different risks appear at different stages of the payment lifecycle. Beyond helps connect the tools needed to protect each stage rather than relying on a single fraud control.",
      nodes: [
        { label: "Credential" },
        { label: "Authentication" },
        { label: "Transaction risk" },
        { label: "Authorization" },
        { label: "Settlement" },
        { label: "Dispute" },
        { label: "Account health" },
      ],
      focus: 2,
    },
    {
      kind: "features",
      layout: "split",
      title: "Protect more than the payment.",
      items: [
        {
          title: "Connected protection",
          body: "Authentication, credential security, fraud controls, disputes, and account health work better as part of one payments strategy.",
          icon: "shield",
        },
        {
          title: "Built around the transaction environment",
          body: "Risk controls should reflect how the business sells, where transactions happen, and the type of customers and payment activity involved.",
          icon: "sliders",
        },
        {
          title: "Protect conversion too",
          body: "Security should help stop risky transactions without creating unnecessary friction for legitimate customers.",
          icon: "trending-up",
        },
        {
          title: "People behind the tools",
          body: "Beyond helps businesses understand the available controls and structure the right combination around their payment environment.",
          icon: "headset",
        },
      ],
    },
  ],
  bigPicture: {
    title: "Protect connects checkout to what happens after.",
    lead: "Protect connects what happens at checkout with what happens after the transaction — including chargebacks, reporting, funding, and account health.",
  },
  faq: {
    title: "Protect questions.",
    // Live questions from the four Protect pages, by reference (the live hub FAQ is Adult's).
    items: [
      pickFaq(networkTokenization.faq.items, "What is network tokenization?"),
      pickFaq(threeDSecure.faq.items, "What is 3D Secure?"),
      pickFaq(fraudRiskTools.faq.items, "What is payment fraud prevention?"),
      pickFaq(fraudRiskTools.faq.items, "What's the difference between fraud and a chargeback?"),
      pickFaq(chargebackProtection.faq.items, "What is proactive dispute resolution?"),
    ],
  },
} satisfies SolutionPageContent;
