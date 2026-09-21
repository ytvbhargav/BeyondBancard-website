import type { SolutionPageContent } from "@/types/content";
import { solutionBreadcrumb, solutionLink } from "@/content/solutions/links";

/**
 * POS systems (D-058). Copy is the live beyondbancard.com/operate/pos/ page (captured
 * 21 Sept 2026), in live section order.
 *
 * Edits:
 * - Headings, feature titles, chips, hub labels and hero mock labels in sentence case ("Order /
 *   sale", "Restaurants & quick service", "Service businesses", "Mobile / events", "Business
 *   operations", "Payment technology", "Items tracked", …); section h2s end with a full stop;
 *   straight apostrophes. The hero lead doesn't name Beyond, so "Beyond" → "Beyond Bancard" at the
 *   first mention, the section-3 heading ("What a Beyond Bancard POS environment can bring together.").
 * - Hero h1 is the live hero h2. Hero actions are the standard expert button and "Apply now"; the
 *   live "Talk to a Payments Expert" names no specialist, so the default "Talk to an expert" label
 *   stays (as on the Operate hub).
 * - Section labels above the headings ("POS Systems", "The checkout is part of a bigger operation",
 *   "Core POS capabilities", "Where this fits", "Connected acceptance", "Need the device too?",
 *   "Related solutions", "The bigger picture", "FAQ") are not repeated as eyebrows (D-003).
 * - Hero mock card → HeroFile (Example: it shows figures). The mock has no title, so the panel takes
 *   the hero's own label, "POS systems"; "Today 142 Orders" is the amount and Items tracked /
 *   Employees / Locations the stats. No status: the mock shows none.
 * - "Payments should fit the way the business runs." → hub (§5): the live `p-arch` chain's Customer
 *   and Order / sale in, its dark "POS" node as the centre, the six live labels out; keeps the live
 *   anchor "pos-system".
 * - "What a Beyond POS environment can bring together." → features (ruled); "POS by business
 *   model." → chips.
 * - "The best checkout experience connects both sides." → hub: "Business operations" in, the live
 *   "BEYOND" node as the centre, the four live labels out (the Payment gateways pattern).
 * - "Explore terminals, handhelds, readers, and other payment hardware…" → callout; its button
 *   "Explore Payment Hardware" (live: /contact-us/) → "Explore payment hardware", linked to the
 *   hardware catalog, /catalog (C4 allows no raw /contact-us/ link; FAQ 7 points to the catalog, and
 *   the Payment technology page's band links there too).
 * - Related solutions: the template's title "Related solutions" and menu labels (In-person
 *   payments, Payment technology, "Dashboard & Reporting" → Reporting).
 * - The bigger picture: Operate's heading and paragraph, as live; the lifecycle row (Accept,
 *   Protect, Grow, Operate) becomes the template's links to the other three pillars.
 * - FAQ answers 3 to 6: the placeholder text is dropped and the answer flagged (C2).
 *
 * Dropped:
 * - Hero button "Explore Gateway Solutions" (an in-page jump to #pos-system; the label is Payment
 *   gateways').
 * - Hero mock tab row (Checkout, Orders, Inventory, Reporting), as on the Operate hub's mock.
 * - The link on the hub centre "BEYOND" (a button linked to null).
 * - Related section heading "More capabilities that connect to payment gateways." (the template's
 *   title stands in).
 * - Related "Integrations" (no Integrations page; C4).
 * - The FAQ footer "Still have questions? We're happy to help." and its "Ready To Get Started?"
 *   button (the template's FAQ line and closing band cover both).
 *
 * Live-site issues:
 * - Hero button "Explore Gateway Solutions" is the Payment gateways page's label; on this page it
 *   jumps to the POS section #pos-system.
 * - The related heading "More capabilities that connect to payment gateways." names payment gateways.
 * - Related "Integrations" has no page.
 * - "Explore Payment Hardware" links to /contact-us/, not to hardware.
 * - The hub centre "BEYOND" is a button that links to null.
 * - FAQ answers 3 to 6 show their placeholders: "[Placeholder — TODO: VERIFY WITH BEYOND POS
 *   PORTFOLIO for full list.]", "[Placeholder — TODO: VERIFY WITH BEYOND POS PORTFOLIO.]" (answers 4
 *   and 5) and "[Placeholder — TODO: VERIFY WITH BEYOND POS PORTFOLIO on specific compatibility.]".
 */

/** The hardware catalog (resolves to /coming-soon; C4). */
const catalogHref = "/catalog";

export const pos = {
  meta: { title: "POS systems" },
  pillar: "Operate",
  kind: "detail",
  breadcrumb: solutionBreadcrumb("Operate", "POS systems"),
  hero: {
    title: "More than a checkout.",
    lead: "Bring payment acceptance together with the software and tools businesses use to manage orders, customers, inventory, reporting, and day-to-day commerce.",
    visual: {
      // The mock has no title: the hero's own label.
      title: "POS systems",
      tag: "Example",
      amount: { label: "Today", value: "142 orders" },
      stats: [
        { label: "Items tracked", value: "86" },
        { label: "Employees", value: "6" },
        { label: "Locations", value: "3" },
      ],
    },
  },
  blocks: [
    {
      kind: "hub",
      // The live section anchor (the hero's "Explore Gateway Solutions" button jumped here).
      id: "pos-system",
      title: "Payments should fit the way the business runs.",
      inputs: ["Customer", "Order / sale"],
      // The live dark `p-arch` node (§5).
      center: "POS",
      outputs: ["Payments", "Orders", "Customers", "Inventory", "Employees", "Reporting"],
    },
    {
      kind: "features",
      layout: "ruled",
      // First mention of Beyond on the page (the hero lead doesn't name it).
      title: "What a Beyond Bancard POS environment can bring together.",
      items: [
        { title: "Checkout", body: "Create a faster, more intuitive transaction experience.", icon: "credit-card" },
        { title: "Orders", body: "Manage order activity around the customer and business workflow.", icon: "receipt" },
        {
          title: "Customers",
          body: "Connect customer activity to the commerce experience where supported.",
          icon: "users",
        },
        {
          title: "Inventory",
          body: "Track products and availability where supported by the selected POS platform.",
          icon: "package",
        },
        { title: "Team", body: "Support employee and role-based workflows where available.", icon: "briefcase" },
        {
          title: "Reporting",
          body: "Understand sales and payment activity from the same operating environment.",
          icon: "chart",
        },
      ],
    },
    {
      kind: "chips",
      title: "POS by business model.",
      chips: ["Restaurants & quick service", "Retail", "Service businesses", "Multi-location", "Mobile / events"],
    },
    {
      kind: "hub",
      title: "The best checkout experience connects both sides.",
      inputs: ["Business operations"],
      // Centre: the live "BEYOND" node (the template's default).
      outputs: ["POS", "Payment technology", "Payment processing", "Reporting"],
    },
    {
      kind: "callout",
      title: "Explore terminals, handhelds, readers, and other payment hardware available through Beyond.",
      // Live button links to /contact-us/; the demo sends it to the hardware catalog, as the Payment
      // technology page's band does (and as FAQ 7 points).
      link: { label: "Explore payment hardware", href: catalogHref },
    },
  ],
  related: {
    title: "Related solutions",
    // Live: In-Person Payments, Payment Technology, Dashboard & Reporting, Integrations (dropped).
    links: [solutionLink("In-person payments"), solutionLink("Payment technology"), solutionLink("Reporting")],
  },
  bigPicture: {
    title: "Operate is how it all runs day to day.",
    lead: "Beyond's broader payments ecosystem connects acceptance, protection, and growth around the same operating layer.",
  },
  faq: {
    title: "POS questions.",
    items: [
      {
        q: "What is a POS system?",
        a: "Software and technology that helps operate checkout along with related business functions like orders, inventory, and reporting.",
      },
      {
        q: "What's the difference between a POS and a payment terminal?",
        a: "A payment terminal captures the payment; a POS system helps run the broader business around that transaction.",
      },
      {
        q: "What types of businesses can use Beyond POS solutions?",
        a: "Restaurants, retail, service businesses, multi-location operations, and mobile/event-based businesses, among others.",
        confirm: true,
        note: "POS systems: the full list of business types, per the Beyond POS portfolio (live answer marked as a placeholder)",
      },
      {
        q: "Can a POS manage inventory?",
        a: "Depends on the selected POS platform.",
        confirm: true,
        note: "POS systems: which POS platforms manage inventory, per the Beyond POS portfolio (live answer marked as a placeholder)",
      },
      {
        q: "Can a POS support multiple locations?",
        a: "Multi-location support depends on the specific platform.",
        confirm: true,
        note: "POS systems: which POS platforms support multiple locations, per the Beyond POS portfolio (live answer marked as a placeholder)",
      },
      {
        q: "Can Beyond integrate payments with my existing POS?",
        a: "In many cases, yes.",
        confirm: true,
        note: "POS systems: specific compatibility with existing POS systems, per the Beyond POS portfolio (live answer marked as a placeholder)",
      },
      {
        q: "Does Beyond provide POS hardware?",
        a: "Yes — see the hardware catalog for available devices.",
      },
      {
        q: "How do I choose the right POS?",
        a: "It depends on your business model, checkout environment, and the operational features you need — our team can help you narrow it down.",
      },
    ],
  },
} satisfies SolutionPageContent;
