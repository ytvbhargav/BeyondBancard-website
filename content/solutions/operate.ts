import type { SolutionPageContent } from "@/types/content";
import { solutionBreadcrumb, solutionLinkAs } from "@/content/solutions/links";

/**
 * Operate hub (D-058). Copy is the live beyondbancard.com/operate/ page (captured
 * 21 Sept 2026), in live section order.
 *
 * Edits:
 * - Headings, card titles, stage labels, chips and link labels in sentence case; section h2s end
 *   with a full stop; straight apostrophes. The hero lead doesn't name Beyond, so "Beyond" →
 *   "Beyond Bancard" at the first mention, the section-2 lead.
 * - Section labels above the headings ("Operate", "Payment operations", "From transaction to
 *   reconciliation", "Connected acceptance", "The bigger picture", "FAQ") are not repeated as
 *   eyebrows (D-003); "Why Operate with Beyond" is the "why" section's h2 (below).
 * - Hero actions are the standard expert button and "Apply now"; the live "Talk to a Payments
 *   Expert" names no specialist, so the default "Talk to an expert" label stays (as on Accept).
 * - Hero mock card → HeroFile stats (Example: it shows figures). The mock has no title, so the
 *   panel takes the hero's own label, "Operate", as on B2B payments, POS systems and Cost-reduction
 *   programs; "Today $18,426" is the amount and Transactions / Deposited / Pending the stats. No
 *   status: the mock shows none.
 * - Solution tiles → cards: the tile's small title is the card title, its heading the tagline,
 *   and "Explore …" the link label ("Dashboard & Reporting" keeps its live title; the link goes to
 *   the menu's Reporting page).
 * - "From transaction to reconciliation." → flow: each live node "Accept — Customer Pays" splits at
 *   the dash into label and detail; "Fund" is the live dark node.
 * - "Different ways to get paid. One operation behind them." → hub: the six channels in, the live
 *   "BEYOND" node (a button linked to null) as the centre, the five results out.
 * - The four "why" boxes → features (split). The live h2 "Visibility beyond authorization."
 *   repeats the third box's title, so the section's own label is the h2, "Why Operate with
 *   Beyond." ("Operate" keeps its capital as the pillar name; as on Reporting, C3). The first two
 *   bodies are flagged (see live-site issues).
 * - The bigger picture: the lifecycle row (Accept, Protect, Grow, Operate) becomes the template's
 *   links to the other three pillars.
 * - FAQ answers 5, 6 and 8: the placeholder text is dropped and the answer flagged (C2).
 * - No related solutions: the live page has none, and the cards already link to every Operate page.
 *
 * Dropped:
 * - Hero button "Talk to a Payments Technology" (an in-page jump to #payment-technology).
 * - Hero mock tab row (POS, Gateway, Virtual Terminal, Invoices): a tab-style row reads as pages
 *   merged into one, so it isn't reproduced.
 * - The hero mock's bare "↑ 12.4%" (C6).
 * - The "why" section photo (C5).
 * - The FAQ footer "Still have questions? We're happy to help." and its "Ready To Get Started?"
 *   button (the template's FAQ line and closing band cover both).
 *
 * Live-site issues:
 * - Hero button "Talk to a Payments Technology" is an unfinished label.
 * - The "why" bodies of "Technology That Fits the Business" and "Connected Payment Workflows" are
 *   the industry pages' "Underwriting That Starts With Understanding" and "More Ways to Structure
 *   Payments" bodies (kept, flagged).
 * - The "why" h2 "Visibility beyond authorization." repeats the third box's title.
 * - The section-2 lead is the same paragraph as on the Accept and Protect hubs.
 * - The Virtual Terminal tile's heading "Turn your workspace to get paid." reads as if a word is
 *   missing (kept verbatim).
 * - The hub's "BEYOND" node is a button linked to null.
 * - FAQ answers 5, 6 and 8 show their placeholders: "[Placeholder — TODO: VERIFY WITH BEYOND.]"
 *   (twice) and "[Placeholder — TODO: VERIFY WITH BEYOND on the exact reconciliation workflow.]".
 */
export const operate = {
  meta: { title: "Operate" },
  pillar: "Operate",
  kind: "hub",
  breadcrumb: solutionBreadcrumb("Operate"),
  hero: {
    title: "Run payments without the operational drag.",
    lead: "Bring payment technology, remote acceptance, billing, transaction visibility, and reporting together around the way your business operates.",
    visual: {
      // The mock has no title: the hero's own label, as on B2B payments and POS systems.
      title: "Operate",
      tag: "Example",
      amount: { label: "Today", value: "$18,426" },
      stats: [
        { label: "Transactions", value: "286" },
        { label: "Deposited", value: "$17,890" },
        { label: "Pending", value: "$536" },
      ],
    },
  },
  blocks: [
    {
      kind: "cards",
      title: "Everything behind the transaction.",
      // First mention of Beyond on this page (the hero lead doesn't name it).
      lead: "Accepting a payment is only the beginning. Beyond Bancard helps businesses connect the technology, workflows, and information needed to manage payments from checkout through funding and reconciliation.",
      cards: [
        {
          title: "Payment technology",
          tagline: "The right technology for every checkout.",
          body: "Choose from countertop, smart, handheld, wireless, mobile, and other payment-device configurations built around where and how you sell.",
          link: solutionLinkAs("Payment technology", "Explore payment technology"),
        },
        {
          title: "POS systems",
          tagline: "More than a checkout.",
          body: "Bring payment acceptance together with the software and tools businesses use to manage commerce and day-to-day operations.",
          link: solutionLinkAs("POS systems", "Explore POS systems"),
        },
        {
          title: "Payment gateways",
          tagline: "The connection behind the transaction.",
          body: "Connect websites, applications, checkout environments, and business systems to payment processing through flexible gateway technology.",
          link: solutionLinkAs("Payment gateways", "Explore payment gateways"),
        },
        {
          title: "Virtual terminal",
          tagline: "Turn your workspace to get paid.",
          body: "Accept eligible remote and card-not-present payments through a secure browser-based interface without requiring a traditional checkout terminal.",
          link: solutionLinkAs("Virtual terminal", "Explore virtual terminal"),
        },
        {
          title: "Invoicing",
          tagline: "Send the bill. Make it easier to get paid.",
          body: "Create payment requests, give customers a convenient path to payment, and track billing activity through a connected payment workflow.",
          link: solutionLinkAs("Invoicing", "Explore invoicing"),
        },
        {
          title: "Dashboard & reporting",
          tagline: "Know where every payment stands.",
          body: "Bring transactions, deposits, disputes, statements, trends, and payment activity together so your team spends less time piecing together the story.",
          link: solutionLinkAs("Reporting", "Explore dashboard & reporting"),
        },
      ],
    },
    {
      kind: "flow",
      title: "From transaction to reconciliation.",
      lead: "Processing a transaction is easy to see. Everything that happens afterward is where payment operations become complicated. Beyond helps connect the technology and information behind the transaction so your team can spend less time chasing answers.",
      nodes: [
        { label: "Accept", detail: "Customer pays" },
        { label: "Process", detail: "Transaction routes" },
        { label: "Fund", detail: "Money settles" },
        { label: "Understand", detail: "See activity" },
        { label: "Reconcile", detail: "Know where it went" },
      ],
      focus: 2,
    },
    {
      kind: "hub",
      title: "Different ways to get paid. One operation behind them.",
      lead: "Commerce may happen across different channels, but merchants still need one clear understanding of payment activity across the business.",
      inputs: ["In-person", "Online", "Virtual terminal", "Invoice", "Recurring", "ACH"],
      outputs: ["Transactions", "Funding", "Disputes", "Reporting", "Reconciliation"],
    },
    {
      kind: "features",
      layout: "split",
      // The live h2 repeats the third item's title; the section label stands in (C3).
      title: "Why Operate with Beyond.",
      items: [
        {
          title: "Technology that fits the business",
          body: "We evaluate how your business actually operates rather than treating every company in a category the same.",
          icon: "sliders",
          confirm: true,
          note: "Operate: this body is the industry pages' \"Underwriting that starts with understanding\" item; keep it here or supply Operate copy?",
        },
        {
          title: "Connected payment workflows",
          body: "Payment methods, gateways, processing options, and technology give us more flexibility to build around the business model.",
          icon: "link",
          confirm: true,
          note: "Operate: this body is the industry pages' \"More ways to structure payments\" item; keep it here or supply Operate copy?",
        },
        {
          title: "Visibility beyond authorization",
          body: "Understand more than whether a transaction was approved — including what happens through settlement, funding, disputes, and reporting.",
          icon: "eye",
        },
        {
          title: "People behind the platform",
          body: "Beyond helps merchants choose, configure, and support the payment technology their business depends on.",
          icon: "headset",
        },
      ],
    },
  ],
  bigPicture: {
    title: "Operate is how it all runs day to day.",
    lead: "Beyond's broader payments ecosystem connects acceptance, protection, and growth around the same operating layer.",
  },
  faq: {
    title: "Operate questions.",
    items: [
      {
        q: "What payment technology does Beyond support?",
        a: "Countertop, smart, handheld, wireless, mobile, and customer-facing devices, among other configurations. See our hardware catalog for actual devices.",
      },
      {
        q: "What's the difference between a payment terminal and a POS system?",
        a: "A payment terminal captures the payment itself; a POS system helps operate the broader checkout and business, often including orders, inventory, and reporting.",
      },
      {
        q: "What's the difference between a gateway and a virtual terminal?",
        a: "A gateway is the underlying technology connecting a digital payment experience to processing; a virtual terminal is a user interface for manually entering and managing remote payments, commonly operating through a gateway.",
      },
      {
        q: "Can Beyond help me choose payment hardware?",
        a: "Yes — our Payment Technology page can help you identify the right hardware category before you browse the catalog.",
      },
      {
        q: "Can I use my existing POS or gateway?",
        a: "Compatibility depends on your specific setup.",
        confirm: true,
        note: "Operate: which existing POS and gateway setups are compatible (live answer marked as a placeholder)",
      },
      {
        q: "Can Beyond support multiple locations?",
        a: "Multi-location support depends on the specific platform and reporting environment.",
        confirm: true,
        note: "Operate: multi-location support by platform and reporting environment (live answer marked as a placeholder)",
      },
      {
        q: "How can I see transactions and deposits?",
        a: "Through Beyond's dashboard and reporting environment, subject to your account's supported features.",
      },
      {
        q: "Can Beyond help with payment reconciliation?",
        a: "Yes — reporting tools are designed to help connect transactions to funding activity.",
        confirm: true,
        note: "Operate: the exact reconciliation workflow (live answer marked as a placeholder)",
      },
    ],
  },
} satisfies SolutionPageContent;
