import type { SolutionPageContent } from "@/types/content";
import { solutionBreadcrumb, solutionLink } from "@/content/solutions/links";

/**
 * In-person payments (D-058). Copy is the live beyondbancard.com/accept/in-person-payments/
 * page (captured 21 Sept 2026), in live section order.
 *
 * Edits:
 * - Headings, feature titles, chips and hero mock labels in sentence case ("PIN debit",
 *   "Mobile & wireless", "Wireless & handheld", "Restaurant / hospitality", "Top method",
 *   "Avg. ticket", …); section h2s end with a full stop; straight apostrophes.
 *   "Beyond" → "Beyond Bancard" at the first mention (hero lead).
 * - Hero h1 is the live hero h2. Hero actions are the standard expert button and "Apply now";
 *   the live "Explore In-Person Payments" (in-page jump) and "View Payment Technology" buttons
 *   are not used.
 * - Section labels above the headings ("In-Person Payments", "Accept the way customers pay",
 *   "Choose the experience", "Where this fits", "The bigger picture", "Related solutions", "FAQ")
 *   are not repeated as eyebrows (D-003).
 * - Hero mock card → HeroFile "Beyond checkout" (Example: it shows figures): the live
 *   Countertop / Wireless / Mobile tabs as method chips, $3,240 as the amount and the three live
 *   stats. The amount has no live label and is shown alone (no label drafted, C6).
 * - Ways to pay → features (ruled); the technology list → chips with its paragraph as the note
 *   (§5); "More than the counter." → chips; connected acceptance → hub (the four environments in,
 *   the live "BEYOND" node as the centre, the four results out).
 * - Connected acceptance heading: the live "From new markets to settled funds." is International
 *   payments' heading, so the section's own label is the h2, "Connected acceptance." (C3).
 * - "Mobile & wireless" body: missing full stop added.
 * - Related solutions: the template's title "Related solutions" and menu labels; "Payment
 *   Terminals" → Payment technology (§5), "Reporting & Analytics" → Reporting.
 * - The bigger picture: Accept's heading and this page's paragraph, as live; the lifecycle row
 *   (Accept, Protect, Grow, Operate) becomes the template's links to the other three pillars.
 * - FAQ answers 3 and 8: the placeholder text is dropped and the answer flagged (C2).
 *
 * Dropped:
 * - The hero mock's bare "8%" (C6).
 * - Related section heading "More capabilities that connect to in-person payments." and its
 *   paragraph (a repeat of the technology section's).
 * - Related "Reconciliation" (links to "#").
 * - The FAQ footer "Still have questions? We're happy to help." and its "Contact Us" button (the
 *   template's FAQ line and closing band cover both).
 *
 * Live-site issues:
 * - The browser title is the site's generic "Merchant Processing Service Provider - Online
 *   Processing" (shared with Online payments, International payments and others), not a
 *   page-specific title.
 * - The connected acceptance heading "From new markets to settled funds." is International payments'.
 * - Related "Payment Terminals" links to /operate/virtual-terminal/; "Reconciliation" links to "#".
 * - The related section's paragraph repeats the technology section's paragraph.
 * - The technology section's paragraph title-cases "In-Person Payments", "POS Systems" and
 *   "Smart Terminals" in body copy (the chips and breadcrumb use sentence case).
 * - The hero lead reads "the payment technology to accept customers wherever the sale happens"
 *   (kept verbatim).
 * - FAQ answers 3 and 8 show their placeholders: "[Placeholder — confirm current wallet support by
 *   device.]" and "[Placeholder — TODO: VERIFY WITH BEYOND.]".
 */
export const inPersonPayments = {
  meta: { title: "In-person payments" },
  pillar: "Accept",
  kind: "detail",
  breadcrumb: solutionBreadcrumb("Accept", "In-person payments"),
  hero: {
    title: "Make every checkout feel effortless.",
    lead: "From the countertop to tableside, mobile, and on-the-go transactions, Beyond Bancard gives businesses the payment technology to accept customers wherever the sale happens.",
    visual: {
      title: "Beyond checkout",
      tag: "Example",
      amount: { value: "$3,240" },
      methods: ["Countertop", "Wireless", "Mobile"],
      stats: [
        { label: "Transactions", value: "42" },
        { label: "Top method", value: "Tap" },
        { label: "Avg. ticket", value: "$77" },
      ],
    },
  },
  blocks: [
    {
      kind: "features",
      layout: "ruled",
      title: "Fast, familiar ways to pay.",
      items: [
        { title: "Tap", body: "Accept contactless card payments quickly and securely.", icon: "zap" },
        { title: "Chip", body: "Support EMV chip-card transactions.", icon: "credit-card" },
        { title: "Swipe", body: "Support magnetic-stripe transactions where applicable.", icon: "arrows" },
        { title: "PIN debit", body: "Accept eligible debit-card transactions with PIN entry.", icon: "key" },
        { title: "Mobile wallets", body: "Accept supported contactless wallet payments.", icon: "wallet" },
        // Live body has no full stop.
        { title: "Mobile & wireless", body: "Take payments beyond the traditional countertop.", icon: "smartphone" },
      ],
    },
    {
      kind: "chips",
      title: "Payment technology for the way you sell.",
      chips: [
        "POS systems",
        "Smart terminals",
        "Countertop terminals",
        "Wireless & handheld",
        "Mobile acceptance",
        "Virtual terminal",
      ],
      footnote: "In-Person Payments describes the acceptance experience. The technology itself — POS Systems, Smart Terminals, and more — lives under Operate in Solutions.",
    },
    {
      kind: "chips",
      title: "More than the counter.",
      chips: [
        "Retail",
        "Restaurant / hospitality",
        "Field services",
        "Events",
        "Professional services",
        "Mobile commerce",
      ],
    },
    {
      kind: "hub",
      // The live heading is International payments'; the section label stands in (C3).
      title: "Connected acceptance.",
      lead: "Every in-person transaction connects into the same processing, funding, reporting, and reconciliation environment as the rest of your business.",
      inputs: ["Countertop", "Wireless", "Mobile", "Tableside"],
      outputs: ["Processing", "Funding", "Reporting", "Reconciliation"],
    },
  ],
  related: {
    title: "Related solutions",
    // Live: POS Systems, Payment Terminals (→ virtual terminal), Working Capital,
    // Reporting & Analytics, Reconciliation (#, dropped).
    links: [
      solutionLink("POS systems"),
      solutionLink("Payment technology"),
      solutionLink("Working capital"),
      solutionLink("Reporting"),
    ],
  },
  bigPicture: {
    title: "Accept is where the transaction starts.",
    lead: "Beyond's broader payments ecosystem helps protect, fund, and operate what happens next.",
  },
  faq: {
    title: "In-person payments questions.",
    items: [
      {
        q: "What types of payments can I accept in person?",
        a: "Tap, chip, swipe, PIN debit, and supported mobile wallets, depending on your terminal and setup.",
      },
      {
        q: "What is EMV?",
        a: "EMV refers to the chip-card standard designed to reduce card-present fraud compared to magnetic stripe.",
      },
      {
        q: "Can customers use Apple Pay or other mobile wallets?",
        a: "Supported contactless wallets can be accepted on compatible terminals.",
        confirm: true,
        note: "In-person payments: current wallet support by device (live answer marked as a placeholder)",
      },
      {
        q: "Does Beyond offer wireless terminals?",
        a: "Yes — wireless and handheld terminal options are available for mobile and tableside acceptance.",
      },
      {
        q: "Can Beyond support restaurants?",
        a: "Yes — restaurant and hospitality environments are a supported in-person use case.",
      },
      {
        q: "Can I accept payments away from my main location?",
        a: "Yes, through mobile and wireless acceptance options built for on-the-go transactions.",
      },
      {
        q: "How do POS systems differ from payment terminals?",
        a: "A POS system typically combines payment acceptance with broader business tools like inventory and reporting; a terminal is focused specifically on the payment transaction.",
      },
      {
        q: "Can I use my existing hardware?",
        a: "Compatibility depends on the specific hardware and setup.",
        confirm: true,
        note: "In-person payments: existing hardware compatibility (live answer marked as a placeholder)",
      },
    ],
  },
} satisfies SolutionPageContent;
