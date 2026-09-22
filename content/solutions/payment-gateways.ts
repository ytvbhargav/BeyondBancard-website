import type { SolutionPageContent } from "@/types/content";
import { ANSWER_TO_SUPPLY, solutionBreadcrumb, solutionLink } from "@/content/solutions/links";

/**
 * Payment gateways (D-058). Copy is the live beyondbancard.com/operate/payment-gateways/ page
 * (captured 21 Sept 2026), in live section order.
 *
 * Edits:
 * - Headings, feature titles, flow stages, hub labels and hero mock labels in sentence case
 *   ("Website / app / business system", "Card network / payment rail", "Multi-channel commerce",
 *   "Gateway session", "Processor → authorization", …); section h2s end with a full stop; straight
 *   apostrophes. The hero lead doesn't name Beyond, so "Beyond" → "Beyond Bancard" at the first
 *   mention, the "One gateway isn't right for every business." paragraph.
 * - Hero h1 is the live hero h2. Hero actions are the standard expert button and "Apply now"; the
 *   live "Talk to a Payments Expert" names no specialist, so the default "Talk to an expert" label
 *   stays.
 * - Section labels above the headings ("Payment Gateways", "What a gateway does", "The right
 *   gateway, not just a gateway", "Where gateways fit", "Connected acceptance", "Related solutions",
 *   "The bigger picture", "FAQ") are not repeated as eyebrows (D-003).
 * - Hero mock card → HeroFile "Gateway session" (Illustration: it shows no figures): the four live
 *   stages as steps, done/active as live, and "Connected" as the status.
 * - "Connect the customer experience to payment processing." → flow: the live `p-arch` chain,
 *   "Payment gateway" the live dark node, keeping the live anchor "gateway-solutions".
 * - "One gateway isn't right for every business." → statement: the live paragraph as the body; its
 *   seven labels are dropped (below).
 * - "One connection, many use cases." → features (ruled).
 * - "Gateway + Beyond." → hub: "Gateway" in, the live "BEYOND" node as the centre, the five live
 *   capabilities out (§5).
 * - Hub output "DisFraud & Risk" → "Fraud & risk" (typo, C1).
 * - Related solutions: the template's title "Related solutions" and menu labels (Online payments,
 *   Virtual terminal, Recurring billing, 3D Secure, Network tokenization, as live).
 * - The bigger picture: Operate's heading and paragraph, as live; the lifecycle row (Accept,
 *   Protect, Grow, Operate) becomes the template's links to the other three pillars.
 * - FAQ answers 5 and 6: the placeholder text is dropped and the answer flagged (C2). Answer 8 is
 *   only a placeholder: stand-in answer, flagged (C2).
 *
 * Dropped:
 * - Hero button "Explore Gateway Solutions" (an in-page jump to #gateway-solutions).
 * - The section-2 lead "Payment operations become easier when teams can connect what customers paid
 *   to what ultimately reached the bank." (the Reporting page's, §5).
 * - The seven labels under "One gateway isn't right for every business." (Ecommerce, Virtual
 *   Terminal, Recurring Payments, Stored Credentials, Integrations, Reporting, Multi-Channel
 *   Commerce): five are the feature titles of the next section, "One connection, many use
 *   cases."; stored-payment workflows are in its Recurring payments body, and Integrations is a
 *   hub output.
 * - The link on the hub centre "BEYOND" (a button linked to null).
 * - Related section heading "More capabilities that connect to payment gateways." (the template's
 *   title stands in).
 * - Related "Integrations" (links to "#"; no Integrations page, C4).
 * - The FAQ footer "Still have questions? We're happy to help." and its "Ready To Get Started?"
 *   button (the template's FAQ line and closing band cover both).
 *
 * Live-site issues:
 * - The section-2 lead repeats the Reporting page's "Follow the money." lead.
 * - The hub output "DisFraud & Risk" is a typo.
 * - The hub centre "BEYOND" is a button that links to null.
 * - Related "Integrations" links to "#" and has no page.
 * - FAQ answers 5 and 6 show their placeholders: "[Placeholder — TODO: VERIFY WITH BEYOND GATEWAY
 *   PORTFOLIO.]" and "[Placeholder — TODO: VERIFY WITH BEYOND GATEWAY PORTFOLIO on specific
 *   integration options.]".
 * - FAQ answer 8 is only a placeholder: "[Placeholder — TODO: VERIFY WITH BEYOND GATEWAY PORTFOLIO
 *   before publishing specific vendor names.]".
 */
export const paymentGateways = {
  meta: { title: "Payment gateways" },
  pillar: "Operate",
  kind: "detail",
  breadcrumb: solutionBreadcrumb("Operate", "Payment gateways"),
  hero: {
    title: "The connection behind the transaction.",
    lead: "Securely connect your checkout, website, application, or business system to payment processing with gateway options built around your technology and transaction needs.",
    visual: {
      title: "Gateway session",
      tag: "Illustration",
      status: { label: "Connected", tone: "neutral" },
      steps: [
        { label: "Website / app", state: "done" },
        { label: "Payment gateway", state: "done" },
        { label: "Authentication / risk", state: "done" },
        { label: "Processor → authorization", state: "active" },
      ],
    },
  },
  blocks: [
    {
      kind: "flow",
      // The live section anchor (the hero's "Explore Gateway Solutions" button jumped here).
      id: "gateway-solutions",
      title: "Connect the customer experience to payment processing.",
      // The live lead is the Reporting page's (§5): dropped.
      nodes: [
        { label: "Customer" },
        { label: "Website / app / business system" },
        { label: "Payment gateway" },
        { label: "Authentication / risk" },
        { label: "Processor" },
        { label: "Card network / payment rail" },
        { label: "Authorization" },
      ],
      focus: 2,
    },
    {
      kind: "statement",
      title: "One gateway isn't right for every business.",
      // The live section's seven labels are dropped: five repeat the feature titles below.
      body: [
        // First mention of Beyond on the page (the hero lead doesn't name it).
        "Gateway requirements vary based on how a business accepts payments, what systems it uses, how transactions are stored or repeated, and what reporting or integration capabilities it needs. Beyond Bancard helps merchants select the right payment infrastructure around those requirements.",
      ],
    },
    {
      kind: "features",
      layout: "ruled",
      title: "One connection, many use cases.",
      items: [
        { title: "Ecommerce", body: "Connect online checkout to payment processing.", icon: "laptop" },
        { title: "Software", body: "Connect applications to payment infrastructure.", icon: "plug" },
        {
          title: "Recurring payments",
          body: "Support scheduled and stored-payment workflows where available.",
          icon: "repeat",
        },
        { title: "Virtual terminal", body: "Enable browser-based payment acceptance.", icon: "monitor" },
        {
          title: "Multi-channel commerce",
          body: "Connect payment environments across customer touchpoints.",
          icon: "layers",
        },
        { title: "Reporting", body: "Provide transaction visibility through supported gateway tools.", icon: "chart" },
      ],
    },
    {
      kind: "hub",
      title: "Gateway + Beyond.",
      lead: "A gateway is more useful connected to the rest of your payment strategy.",
      inputs: ["Gateway"],
      // Centre: the live "BEYOND" node (the template's default).
      // Live: "DisFraud & Risk" (typo) → "Fraud & risk".
      outputs: ["3D Secure", "Network tokenization", "Fraud & risk", "Recurring billing", "Integrations"],
    },
  ],
  related: {
    title: "Related solutions",
    // Live: Online Payments, Virtual Terminal, Recurring Billing, 3D Secure, Network Tokenization,
    // Integrations (#, dropped).
    links: [
      solutionLink("Online payments"),
      solutionLink("Virtual terminal"),
      solutionLink("Recurring billing"),
      solutionLink("3D Secure"),
      solutionLink("Network tokenization"),
    ],
  },
  bigPicture: {
    title: "Operate is how it all runs day to day.",
    lead: "Beyond's broader payments ecosystem connects acceptance, protection, and growth around the same operating layer.",
  },
  faq: {
    title: "Payment gateway questions.",
    items: [
      {
        q: "What is a payment gateway?",
        a: "Technology that securely connects a digital payment experience — like a website, app, or business system — to payment processing.",
      },
      {
        q: "Do I need a gateway for ecommerce?",
        a: "In most cases, yes — a gateway is typically required to connect online checkout to payment processing.",
      },
      {
        q: "What's the difference between a gateway and a processor?",
        a: "A gateway transmits and secures the transaction data; a processor handles the actual movement and settlement of funds.",
      },
      {
        q: "What's the difference between a gateway and a virtual terminal?",
        a: "A gateway is the underlying connection technology; a virtual terminal is a user interface for manually entering payments, which typically runs through a gateway.",
      },
      {
        q: "Can I keep my current gateway?",
        a: "Compatibility depends on your specific setup.",
        confirm: true,
        note: "Payment gateways: whether a merchant can keep their current gateway, per the Beyond gateway portfolio (live answer marked as a placeholder)",
      },
      {
        q: "Can Beyond integrate with my software?",
        a: "In many cases, yes.",
        confirm: true,
        note: "Payment gateways: specific software integration options, per the Beyond gateway portfolio (live answer marked as a placeholder)",
      },
      {
        q: "Can gateways support recurring payments?",
        a: "Yes, many gateway environments support recurring and stored-payment workflows.",
      },
      {
        q: "Which gateways does Beyond support?",
        a: ANSWER_TO_SUPPLY,
        confirm: true,
        note: "Payment gateways: which gateways Beyond supports, with the vendor names that can be published (live answer is only a placeholder)",
      },
    ],
  },
} satisfies SolutionPageContent;
