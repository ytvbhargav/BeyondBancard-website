import type { SolutionPageContent } from "@/types/content";
import { solutionBreadcrumb, solutionLink } from "@/content/solutions/links";
import { keepTogether } from "@/lib/typography";

/**
 * Payment technology (D-058). Copy is the live beyondbancard.com/operate/payment-technology/ page
 * (captured 21 Sept 2026), in live section order.
 *
 * Edits:
 * - Headings, card titles, selector options, table labels and cells, chips and link labels in
 *   sentence case ("Smart terminals", "Customer-facing & PIN pads", "Tableside / mobile", "On-the-go",
 *   "Typical connectivity", "Fixed or portable", "Restaurants & quick service", "View countertop
 *   devices", …); section h2s end with a full stop; straight apostrophes. "Beyond" → "Beyond Bancard"
 *   at the first mention (hero lead).
 * - Hero h1 is the live hero h2. Hero actions are the standard expert button and "Apply now" (the
 *   live buttons: see Dropped). No hero visual (see Dropped).
 * - "Payments should fit the way the business runs." → selector (§5): the six live options and the
 *   six live recommendations. Only the first recommendation is in the page markup; the other five
 *   are the page script's `recommendations` strings, copied verbatim (the live <strong> emphasis as
 *   **…**, the family names in their live capitals). The legend "Where do you take payments?" is
 *   drafted (§5): the live option row has no visible label. The live "Browse Hardware Catalog"
 *   button (a jump to #hardware-catalog) → "Browse hardware catalog", linked to /catalog.
 * - "Six categories, one catalog." → cards (§5): each family name is the card title, its first line
 *   the tagline, its paragraph the body, "Best for: …" the detail (Countertop only, as live) and its
 *   button the link label, linked to /catalog (live: "#").
 * - "A general guide, not a spec sheet." → table, keeping the live anchor "hardware-catalog" (the
 *   live "Browse Hardware Catalog" buttons jumped here). The two "Model-dependent — TODO: VERIFY"
 *   touchscreen cells keep "Model-dependent", flagged (C2).
 * - The chips heading "POS by business model." is the POS systems page's, so the section's own
 *   label is the h2, "Where this fits." (§5) → chips.
 * - "Hardware catalog" band → callout (§5) without its paragraph; its button links to /catalog (live:
 *   a jump to #hardware-catalog).
 * - Related solutions: the template's title "Related solutions" and menu labels (In-person payments,
 *   POS systems, as live).
 * - The bigger picture: Operate's heading and paragraph, as live; the lifecycle row (Accept,
 *   Protect, Grow, Operate) becomes the template's links to the other three pillars.
 * - FAQ answers 4 to 7: the placeholder text is dropped and the answer flagged (C2).
 * - The hyphenated compound in the card title "Customer-facing & PIN pads" carries a word joiner
 *   (keepTogether) so the balanced title doesn't break at the hyphen; the visible text is unchanged.
 *
 * Dropped:
 * - Section labels above the headings ("Payment Technology", "The checkout is part of a bigger
 *   operation", "Payment technology families", "Compare payment technology", "Where this fits",
 *   "Need the device too?", "Related solutions", "The bigger picture", "FAQ") are not repeated as
 *   eyebrows (D-003).
 * - Hero buttons "Browse Hardware Catalog" (an in-page jump to #hardware-catalog) and "Help Me
 *   Choose" (to /contact-us/); the standard expert and "Apply now" actions replace them.
 * - The hero mock card (Checkout / Orders / Inventory / Reporting tabs, "TODAY 142 Orders", 86 Items
 *   Tracked, 6 Employees, 3 Locations): it is the POS systems page's mock word for word, and it shows
 *   POS software rather than payment hardware (C3, as on Network tokenization).
 * - The "Hardware catalog" band's paragraph "Beyond's broader payments ecosystem connects acceptance,
 *   protection, and growth around the same operating layer." (the bigger picture's paragraph; §5).
 * - Related section heading "More capabilities that connect to payment technology." (the
 *   template's title stands in).
 * - Related "Integrations" (links to "#"; no Integrations page; C4).
 * - The FAQ footer "Still have questions? We're happy to help." and its "Ready To Get Started?"
 *   button (the template's FAQ line and closing band cover both).
 *
 * Live-site issues:
 * - The hero mock card, and the section-2 label and heading ("The checkout is part of a bigger
 *   operation", "Payments should fit the way the business runs."), are the same as on the POS
 *   systems page. The heading suits the selector, so it is kept.
 * - The chips heading "POS by business model." is the POS systems page's.
 * - The "Hardware catalog" band's paragraph is the bigger picture's paragraph.
 * - The six family buttons link to "#"; every "Browse Hardware Catalog" button jumps to the
 *   comparison table (#hardware-catalog) rather than to a catalog.
 * - Only the Countertop family has a "Best for: …" line.
 * - The table's touchscreen cells for Countertop and Handheld / Wireless read "Model-dependent —
 *   TODO: VERIFY".
 * - Related "Integrations" links to "#".
 * - FAQ answers 4 to 7 show their placeholders: "[Placeholder — TODO: VERIFY device-level
 *   contactless support in the catalog.]" and "[Placeholder — TODO: VERIFY WITH BEYOND.]" (answers
 *   5, 6 and 7).
 */

/** The hardware catalog (resolves to /coming-soon; C4). */
const catalogHref = "/catalog";

export const paymentTechnology = {
  meta: { title: "Payment technology" },
  pillar: "Operate",
  kind: "detail",
  breadcrumb: solutionBreadcrumb("Operate", "Payment technology"),
  hero: {
    title: "Payment technology for wherever business happens.",
    lead: "From fixed checkout counters to tableside service and mobile teams, Beyond Bancard helps businesses choose payment hardware around where, how, and what they sell.",
  },
  blocks: [
    {
      kind: "selector",
      title: "Payments should fit the way the business runs.",
      // Drafted (§5): the live option row has no visible label.
      legend: "Where do you take payments?",
      // The live options in order; the texts are the page script's recommendations, verbatim.
      options: [
        {
          label: "Fixed checkout",
          text: "For a **fixed checkout**, businesses typically look at **Countertop** devices — reliable payment technology built for a consistent point of sale.",
        },
        {
          label: "Tableside / mobile",
          text: "For **tableside or mobile service**, businesses typically look at **Handheld & Wireless** devices — portable technology that comes to the customer.",
        },
        {
          label: "Customer-facing",
          text: "For **customer-facing environments**, businesses typically look at **Customer-Facing & PIN Pad** devices — giving customers their own payment interaction.",
        },
        {
          label: "High-volume checkout",
          text: "For **high-volume checkout**, businesses typically look at **Smart Terminals** — more capability at the point of payment for busier environments.",
        },
        {
          label: "Self-service",
          text: "For **self-service environments**, businesses typically look at **Specialty Hardware** like kiosks — built for specialized payment setups.",
        },
        {
          label: "On-the-go",
          text: "For **on-the-go acceptance**, businesses typically look at **Mobile Readers** — compact payment hardware for field teams and pop-ups.",
        },
      ],
      link: { label: "Browse hardware catalog", href: catalogHref },
    },
    {
      kind: "cards",
      title: "Six categories, one catalog.",
      // Every family button links to "#" live; the demo sends them to the catalog (§5).
      cards: [
        {
          title: "Countertop",
          tagline: "Built for the checkout counter.",
          body: "Reliable payment technology for businesses with a fixed point of sale and consistent checkout environment.",
          detail: "Best for: Retail counters, service desks, reception areas, fixed checkout",
          link: { label: "View countertop devices", href: catalogHref },
        },
        {
          title: "Smart terminals",
          tagline: "More capability at the point of payment.",
          body: "Touchscreen payment devices designed for richer merchant and customer interactions at checkout.",
          link: { label: "View smart terminals", href: catalogHref },
        },
        {
          title: "Handheld & wireless",
          tagline: "Take checkout to the customer.",
          body: "Portable payment technology for tableside service, line-busting, curbside, events, and teams that don't stay behind a counter.",
          link: { label: "View handheld & wireless", href: catalogHref },
        },
        {
          title: "Mobile readers",
          tagline: "Compact payment acceptance for businesses on the move.",
          body: "Flexible mobile payment hardware for field teams, events, pop-ups, and other mobile commerce environments.",
          link: { label: "View mobile devices", href: catalogHref },
        },
        {
          title: `${keepTogether("Customer-facing")} & PIN pads`,
          tagline: "Give customers their own payment interaction.",
          body: "Dedicated customer-facing devices for supported card, PIN, and contactless payment experiences.",
          link: { label: "View customer-facing devices", href: catalogHref },
        },
        {
          title: "Specialty hardware",
          tagline: "Built for specialized payment environments.",
          body: "Explore kiosks, peripherals, accessories, and other payment technology for more specialized operating needs.",
          link: { label: "Browse specialty hardware", href: catalogHref },
        },
      ],
    },
    {
      kind: "table",
      // The live section anchor (the live "Browse Hardware Catalog" buttons jumped here).
      id: "hardware-catalog",
      title: "A general guide, not a spec sheet.",
      lead: "Exact specifications vary by device — visit the hardware catalog for actual model details.",
      columns: ["Countertop", "Smart terminal", "Handheld / wireless", "Mobile reader"],
      rows: [
        {
          label: "Fixed / portable",
          cells: [{ text: "Fixed" }, { text: "Fixed or portable" }, { text: "Portable" }, { text: "Portable" }],
        },
        {
          label: "Typical connectivity",
          cells: [
            { text: "Wired / Wi-Fi" },
            { text: "Wi-Fi / Ethernet" },
            { text: "Wireless / cellular" },
            { text: "Bluetooth / mobile app" },
          ],
        },
        {
          label: "Touchscreen",
          cells: [
            {
              text: "Model-dependent",
              confirm: true,
              note: "Payment technology: whether countertop and handheld / wireless devices have a touchscreen (live cells marked for verification)",
            },
            { text: "Typically yes" },
            {
              text: "Model-dependent",
              confirm: true,
              note: "Payment technology: whether countertop and handheld / wireless devices have a touchscreen (live cells marked for verification)",
            },
            { text: "Typically no" },
          ],
        },
        {
          label: "Typical environment",
          cells: [
            { text: "Fixed checkout" },
            { text: "High-interaction checkout" },
            { text: "Tableside, events, curbside" },
            { text: "Field, pop-up, on-the-go" },
          ],
        },
      ],
    },
    {
      kind: "chips",
      // The live heading "POS by business model." is the POS systems page's; the section label stands in (§5).
      title: "Where this fits.",
      chips: ["Restaurants & quick service", "Retail", "Service businesses", "Multi-location", "Mobile / events"],
    },
    {
      kind: "callout",
      // The live paragraph is the bigger picture's, so the band has no body (§5).
      title: "Hardware catalog.",
      link: { label: "Browse hardware catalog", href: catalogHref },
    },
  ],
  related: {
    title: "Related solutions",
    // Live: In-Person Payments, POS Systems, Integrations ("#", dropped).
    links: [solutionLink("In-person payments"), solutionLink("POS systems")],
  },
  bigPicture: {
    title: "Operate is how it all runs day to day.",
    lead: "Beyond's broader payments ecosystem connects acceptance, protection, and growth around the same operating layer.",
  },
  faq: {
    title: "Payment technology questions.",
    items: [
      {
        q: "What type of payment terminal do I need?",
        a: "It depends on where and how you sell — use the selector above, or browse the full catalog to compare devices.",
      },
      {
        q: "What's the difference between a smart terminal and a traditional terminal?",
        a: "Smart terminals typically add touchscreen interaction and richer functionality beyond basic payment capture.",
      },
      {
        q: "Do you offer wireless payment terminals?",
        a: "Yes — wireless and handheld options are available for mobile and tableside acceptance.",
      },
      {
        q: "Can I accept contactless payments?",
        a: "Contactless acceptance depends on the specific device.",
        confirm: true,
        note: "Payment technology: device-level contactless support in the catalog (live answer marked as a placeholder)",
      },
      {
        q: "Can Beyond support multiple devices or locations?",
        a: "Multi-device and multi-location support depends on your specific setup.",
        confirm: true,
        note: "Payment technology: multi-device and multi-location support (live answer marked as a placeholder)",
      },
      {
        q: "Does every terminal work with every processor or gateway?",
        a: "No — compatibility depends on the specific device and configuration.",
        confirm: true,
        note: "Payment technology: which devices work with which processors and gateways (live answer marked as a placeholder)",
      },
      {
        q: "Can I use my existing hardware?",
        a: "Compatibility depends on the specific hardware and setup.",
        confirm: true,
        note: "Payment technology: existing hardware compatibility (live answer marked as a placeholder)",
      },
      {
        q: "Where can I see available devices?",
        a: "Browse the complete Beyond hardware catalog for actual devices, specifications, and configurations.",
      },
    ],
  },
} satisfies SolutionPageContent;
