import type { SolutionPageContent } from "@/types/content";
import { solutionBreadcrumb, solutionLink } from "@/content/solutions/links";
import { keepTogether } from "@/lib/typography";

/**
 * ACH & eCheck (D-058). Copy is the live beyondbancard.com/accept/ach-echeck/ page
 * (captured 21 Sept 2026), in live section order.
 *
 * Edits:
 * - Headings, feature titles, column titles, diagram labels and hero mock labels in sentence
 *   case ("Invoices & accounts receivable", "Higher-ticket transactions", "More payment choice",
 *   "Customer bank", "Merchant settlement", …); section h2s end with a full stop; straight
 *   apostrophes.
 * - "Beyond" → "Beyond Bancard" at the first mention: the hero lead doesn't name Beyond, so the
 *   first mention in the copy is the bigger picture paragraph ("Beyond Bancard's broader payments
 *   ecosystem…"). The hero mock's "Beyond ACH" label and the diagram's "BEYOND" node stay as
 *   they are (a mock label and the logo lockup).
 * - Hero h1 is the live hero h2. Hero actions are the expert button, labelled with the live
 *   "Talk to an ACH & eCheck Expert" in sentence case, and "Apply now"; the live "Explore Bank
 *   Payments" button (in-page jump) is not used.
 * - Section labels above the headings ("ACH & eCheck", "Two ways to move payments through the
 *   bank", "Where bank payments fit", "Why bank payments with Beyond", "Connected acceptance",
 *   "The bigger picture", "Related solutions", "FAQ") are not repeated as eyebrows (D-003).
 * - Hero mock card → HeroFile "Invoice #4471" (Example: it shows figures): $4,200.00 as the
 *   amount, the live ACH / eCheck method chips, and the two path endpoints (Customer bank,
 *   Beyond ACH) as steps, as on Instant payouts (the same live endpoints-and-path element). The
 *   live path's fill and dot carry the `active` class (filled to the end), so both endpoints are
 *   shown as done. The amount has no live label, so the figure is shown alone; no labels are
 *   drafted.
 * - "ACH vs. eCheck." → compare (two columns); each live box's heading splits at the em dash
 *   into the column title and subtitle. The block keeps the live section anchor "bank-payments".
 * - "Where bank payments fit" → features (ruled); "Why bank payments with Beyond" → features
 *   (split) with its paragraph as the lead; "A simple path from bank to business." → hub
 *   (Customer bank in, the live "BEYOND" node as the centre, the three results out).
 * - Related solutions: the template's title "Related solutions" and menu labels; "Recurring
 *   Billing" and "B2B Payments" (no links on the live page) link to their pages (§5);
 *   "Reporting & Analytics" → Reporting.
 * - The bigger picture: Accept's heading and this page's paragraph, as live; the lifecycle row
 *   (Accept, Protect, Grow, Operate) becomes the template's links to the other three pillars.
 * - FAQ answers 2, 4, 6, 7 and 8: the placeholder text is dropped and the answer flagged (C2).
 * - Hyphenated compounds outside the FAQ ("bank-account-based", "bank-to-bank", "check-style",
 *   "bank-based", "Higher-ticket", "in-person", "card-present", "non-card") carry word joiners
 *   (keepTogether) so they don't break at the hyphen; the visible text is unchanged. FAQ text
 *   is left plain, as on the industry pages.
 *
 * Dropped:
 * - The "why" section photo (C5) and the hero mock's path bar between the endpoints (C6; its
 *   filled state sets the step states).
 * - The "Where bank payments fit" paragraph "Business-to-business transactions carry different
 *   considerations than typical consumer retail." (B2B payments' lead, §5).
 * - Related section heading "More capabilities that connect to ACH & eCheck.".
 * - Related "Reconciliation" and "Integrations" (no links and no menu page, C4).
 * - The FAQ footer "Still have questions? We're happy to help." and its "Ready To Get Started?"
 *   button (the template's FAQ line and closing band cover both).
 *
 * Live-site issues:
 * - The "Where bank payments fit" paragraph repeats B2B payments' section lead.
 * - Related "Recurring Billing", "B2B Payments", "Reconciliation" and "Integrations" are plain
 *   labels with no links.
 * - The diagram's "BEYOND" node is a button linked to null.
 * - FAQ answers 2, 4, 6, 7 and 8 show their placeholders: "[Placeholder — TODO: VERIFY WITH
 *   BEYOND.]", "[Placeholder — confirm any transaction limits.]", "[Placeholder — confirm
 *   category-specific availability.]", "[Placeholder — TODO: VERIFY WITH BEYOND for
 *   Beyond-specific handling.]" and "[Placeholder — confirm current integration options.]".
 */
export const achEcheck = {
  meta: { title: "ACH & eCheck" },
  pillar: "Accept",
  kind: "detail",
  breadcrumb: solutionBreadcrumb("Accept", "ACH & eCheck"),
  hero: {
    title: "Give customers another way to pay.",
    lead: `Move money through ${keepTogether("bank-account-based")} payment methods designed for invoices, recurring transactions, larger payments, B2B commerce, and businesses looking beyond cards.`,
    expertCta: "Talk to an ACH & eCheck expert",
    visual: {
      title: "Invoice #4471",
      tag: "Example",
      amount: { value: "$4,200.00" },
      methods: ["ACH", "eCheck"],
      // The live path is filled to the end (its `active` class), so both endpoints are done.
      steps: [
        { label: "Customer bank", state: "done" },
        { label: "Beyond ACH", state: "done" },
      ],
    },
  },
  blocks: [
    {
      kind: "compare",
      // The live section anchor.
      id: "bank-payments",
      title: "ACH vs. eCheck.",
      columns: [
        {
          title: "ACH",
          subtitle: `Electronic ${keepTogether("bank-to-bank")} payments`,
          body: "Recurring payments, invoices, account payments, B2B payments, and larger eligible transactions.",
        },
        {
          title: "eCheck",
          subtitle: "A digital alternative to paper checks",
          body: `Remote check acceptance, a familiar ${keepTogether("check-style")} customer experience, invoice payments, and ${keepTogether("bank-account-based")} transactions.`,
        },
      ],
    },
    {
      kind: "features",
      layout: "ruled",
      // The live lead repeats B2B payments' and is dropped (§5).
      title: "Built for transactions where cards aren't always the best fit.",
      items: [
        {
          title: "Recurring billing",
          body: `Predictable, scheduled ${keepTogether("bank-based")} payments.`,
          icon: "repeat",
        },
        {
          title: "Invoices & accounts receivable",
          body: `${keepTogether("Bank-based")} payment against outstanding invoices.`,
          icon: "file-text",
        },
        {
          title: `${keepTogether("Higher-ticket")} transactions`,
          body: "An alternative path for larger eligible payments.",
          icon: "banknote",
        },
        {
          title: "B2B payments",
          body: `Commercial payments moved directly ${keepTogether("bank-to-bank")}.`,
          icon: "building",
        },
        {
          title: "Remote payments",
          body: `Accept payments without an ${keepTogether("in-person")} or ${keepTogether("card-present")} transaction.`,
          icon: "laptop",
        },
        {
          title: "Alternative payment acceptance",
          body: `Give customers a ${keepTogether("non-card")} path to pay.`,
          icon: "landmark",
        },
      ],
    },
    {
      kind: "features",
      layout: "split",
      title: "More ways to get paid, without abandoning cards.",
      lead: "Bank payments work alongside your existing card acceptance — not instead of it.",
      items: [
        {
          title: "More payment choice",
          body: `Give customers a ${keepTogether("bank-based")} alternative alongside cards.`,
          icon: "wallet",
        },
        {
          title: "Support for recurring commerce",
          body: "Built for subscriptions, invoices, and scheduled payments.",
          icon: "calendar",
        },
        {
          title: "Connected reporting",
          body: "Bank payments show up in the same reporting environment as the rest of your processing.",
          icon: "chart",
        },
        {
          title: "Experienced payment support",
          body: "People who understand how bank payments fit into your broader payment mix.",
          icon: "headset",
        },
      ],
    },
    {
      kind: "hub",
      title: "A simple path from bank to business.",
      inputs: ["Customer bank"],
      outputs: ["Processing", "Merchant settlement", "Reporting"],
    },
  ],
  related: {
    title: "Related solutions",
    // Live: Recurring Billing, B2B Payments (no links; mapped per §5), Reporting & Analytics,
    // Reconciliation and Integrations (no links, dropped).
    links: [solutionLink("Recurring billing"), solutionLink("B2B payments"), solutionLink("Reporting")],
  },
  bigPicture: {
    title: "Accept is where the transaction starts.",
    // First mention of Beyond on the page, so the full name (the hero lead doesn't name Beyond).
    lead: "Beyond Bancard's broader payments ecosystem helps protect, fund, and operate what happens next.",
  },
  faq: {
    title: "ACH & eCheck questions.",
    items: [
      {
        q: "What's the difference between ACH and eCheck?",
        a: "ACH moves funds directly bank-to-bank through the Nacha network; eCheck typically digitizes a check-style transaction for electronic clearing.",
      },
      {
        q: "How long do ACH payments take?",
        a: "Settlement timing varies by transaction type.",
        confirm: true,
        note: "ACH & eCheck: ACH settlement timing by transaction type (live answer marked as a placeholder)",
      },
      {
        q: "Can ACH be used for recurring billing?",
        a: "Yes — ACH is commonly used for subscription and scheduled recurring payments.",
      },
      {
        q: "Are ACH payments appropriate for larger transactions?",
        a: "ACH can be a fit for larger eligible transactions where card economics or limits are less favorable.",
        confirm: true,
        note: "ACH & eCheck: any ACH transaction limits (live answer marked as a placeholder)",
      },
      {
        q: "Can I accept ACH payments online?",
        a: "Yes, ACH can be integrated into an online checkout or invoicing flow.",
      },
      {
        q: "Can high-risk merchants use ACH or eCheck?",
        a: "In many cases, yes — bank payments can be part of a broader high-risk payment program.",
        confirm: true,
        note: "ACH & eCheck: category-specific availability of ACH and eCheck for high-risk merchants (live answer marked as a placeholder)",
      },
      {
        q: "How are returned ACH payments handled?",
        a: "Returned payments follow standard banking network procedures.",
        confirm: true,
        note: "ACH & eCheck: Beyond-specific handling of returned ACH payments (live answer marked as a placeholder)",
      },
      {
        q: "Can ACH integrate with my current systems?",
        a: "Integration depends on your existing platform.",
        confirm: true,
        note: "ACH & eCheck: current integration options (live answer marked as a placeholder)",
      },
    ],
  },
} satisfies SolutionPageContent;
