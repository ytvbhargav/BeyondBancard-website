import type { SolutionPageContent } from "@/types/content";
import { partnersMenu } from "@/content/site";
import { solutionPillar } from "@/content/solutions/links";
import { keepTogether } from "@/lib/typography";

/**
 * Looks a partner program up in the Partners menu by its route, so a renamed program or a
 * dropped descriptor fails the build instead of leaving a card empty (the approach `content/partners.ts` uses).
 */
function programCard(href: string, linkLabel: string) {
  const item = partnersMenu.find((p) => p.href === href);
  if (!item?.description) throw new Error(`Partner program or its descriptor not found: ${href}`);
  return { title: item.label, body: item.description, link: { label: linkLabel, href: item.href } };
}

/**
 * ISVs & platforms partner page (D-061), in the SolutionPage template (D-058). Copy is the live
 * beyondbancard.com/partners/isvs-platforms/ page (captured 22 Sept 2026), in live section order.
 *
 * Edits:
 * - Headings, feature titles, capability titles, chips, flow stages, step titles and hero mock
 *   labels in sentence case ("Turn payments into revenue", "Keep customers in your experience",
 *   "In-person payments", "Flexible pricing", "Webhooks / event notifications", "Launch & grow",
 *   "Your platform", …); section h2s end with a full stop; straight apostrophes. "Beyond" →
 *   "Beyond Bancard" at the first mention in the page copy (the "Payments are already happening"
 *   paragraph; the hero lead doesn't name Beyond).
 * - Hero h1 is the live hero h2. Hero actions are the partner pair, "Become a partner" then "Talk
 *   to an expert" (`ctas: "partner"`, PRD §5.5); the live "Talk to Our Platform Team" and "Explore
 *   Our APIs" (an in-page jump to #our-api) buttons are not used.
 * - Section labels above the headings ("ISVs & Platforms", "Built for platforms", "Merchant value",
 *   "Integration story", "How it works", "FAQ") are not repeated as eyebrows (D-003); the steps'
 *   01–03 markers are dropped (the timeline numbers its own steps).
 * - Hero mock card → HeroFile "Your platform" (Example: it shows a figure): "Checkout" labels the
 *   $64.00 amount, the three live methods are the chips, "Connected" is the status and the three
 *   live stages are the steps. The stages carry no done/active state, so all three are shown as done.
 * - "Payments are already happening in your ecosystem." → statement, with the live h6 under the
 *   heading as the lead and the paragraph as the body; "Built for platforms ready to do more with
 *   payments." → features (split); "Give your customers more ways to do business." → capabilities;
 *   "Built for your product team." → flow ("Beyond APIs / Gateway / Integration Layer" is the live
 *   dark node), keeping the live section anchor; "From first conversation to live merchants." → steps.
 * - Capabilities keep the live titles and bodies; pillar and link come from the Solutions menu via
 *   solutionPillar(), so Recurring billing and Flexible pricing (→ Cost-reduction programs) sit
 *   under Grow, where the live page files both under Accept, and Faster access to funds links to
 *   Instant payouts. "Payment security" has no page of its own in the menu: it links to Fraud &
 *   risk tools, under Protect (as Gaming's "APIs / integrations" does, design spec §6).
 * - The seven capability labels under the integration diagram become a chips band. Its live label,
 *   "Integration story", reads oddly as a heading, so its title is drafted from the labels' own
 *   words: "What the integration covers." (drafted copy for client review, D-040).
 * - Other partner programs → cards, with the Partners menu's labels and descriptors
 *   (`content/site.ts`) and drafted "Explore …" link labels, as on the Accept hub.
 * - No related solutions and no bigger picture: partner pages sit outside the four pillars.
 * - FAQ answers 1, 3 and 5: the placeholder text is dropped and the answer flagged (C2).
 * - Hyphenated compounds in the capability titles and bodies ("In-person", "card-not-present",
 *   "repeat-payment") carry word joiners (keepTogether) so they don't break at the hyphen; the
 *   visible text is unchanged. FAQ text is left plain, as on the solution pages.
 *
 * Dropped:
 * - The "Built for platforms" section image (C5).
 * - The capabilities lead "One payments partnership can unlock a much broader set of capabilities
 *   for your platform." — CapabilityTabs renders a title and the tools only, with no lead slot
 *   (as on the industry pages); it would never have rendered.
 * - The sample testimonial ("Sample placeholder — pending approved partner content", the quote and
 *   "Placeholder — VP of Product, Sample Platform Partner") and the four "Partner Logo"
 *   placeholders beneath it (C2).
 * - The FAQ footer "Still have questions? We're happy to help." and its "Ready To Get Started?"
 *   button (the template's FAQ line and closing band cover both).
 *
 * Live-site issues:
 * - A sample testimonial is published, headed "Sample placeholder — pending approved partner
 *   content", above four "Partner Logo" placeholders.
 * - The capabilities "Recurring Billing" and "Flexible Pricing" are labelled Accept (the Solutions
 *   menu files both under Grow), and "Payment Security" and "Flexible Pricing" name no page in it.
 * - FAQ answers 1, 3 and 5 show their placeholders: "[Placeholder — Beyond team to confirm specific
 *   vertical focus.]", "[Placeholder — confirm current technical integration options.]" and
 *   "[Placeholder — specific revenue share terms to be confirmed by the Beyond partnerships team.]".
 * - The browser title is the generic "Merchant Processing Service Provider - Online Processing".
 */
export const isvsPlatforms = {
  meta: { title: "ISVs & platforms" },
  kind: "detail",
  breadcrumb: [{ label: "Partners", href: "/partners" }, { label: "ISVs & platforms" }],
  hero: {
    title: "Make payments part of your product — and your growth.",
    lead: "Bring payments directly into your software experience with flexible technology, merchant onboarding, and payment solutions backed by a team that understands how to build and scale payment programs.",
    ctas: "partner",
    visual: {
      title: "Your platform",
      tag: "Example",
      status: { label: "Connected", tone: "neutral" },
      amount: { label: "Checkout", value: "$64.00" },
      methods: ["Visa", "ACH", "Wallet"],
      // The live stages share one marker (no done/active state): shown as a completed transaction.
      steps: [
        { label: "Merchant onboarded", state: "done" },
        { label: "Payment processed", state: "done" },
        { label: "Funds deposited", state: "done" },
      ],
    },
  },
  blocks: [
    {
      kind: "statement",
      title: "Payments are already happening in your ecosystem.",
      lead: "The opportunity is to make them work harder for your business.",
      body: [
        "Beyond Bancard helps ISVs and platforms integrate payments into the customer experience, expand the financial capabilities they offer, and participate in the economics created by the transactions flowing through their software.",
      ],
    },
    {
      kind: "features",
      layout: "split",
      title: "Built for platforms ready to do more with payments.",
      items: [
        {
          title: "Turn payments into revenue",
          body: "Participate in the economics of the transactions flowing through your platform and create a recurring revenue stream that grows alongside your customers.",
          icon: "trending-up",
        },
        {
          title: "Integrate your way",
          body: "Connect through APIs, gateways, hosted payment experiences, and existing integrations to build the payment experience that fits your product.",
          icon: "plug",
        },
        {
          title: "Keep customers in your experience",
          body: "Create a connected journey from merchant onboarding through payment acceptance without unnecessarily sending customers outside your ecosystem.",
          icon: "users",
        },
        {
          title: "Payments expertise included",
          body: "You build your product. Beyond brings the processing relationships, payments expertise, underwriting support, risk capabilities, and operational infrastructure behind it.",
          icon: "handshake",
        },
      ],
    },
    {
      kind: "capabilities",
      title: "Give your customers more ways to do business.",
      items: [
        {
          ...solutionPillar("Online payments"),
          title: "Online payments",
          body: `Secure ecommerce and ${keepTogether("card-not-present")} payments.`,
        },
        {
          ...solutionPillar("In-person payments"),
          title: `${keepTogether("In-person")} payments`,
          body: "Terminals and payment technology for physical commerce.",
        },
        {
          ...solutionPillar("ACH & eCheck"),
          title: "ACH & eCheck",
          body: "Give customers an alternative to card payments.",
        },
        {
          // The live page files this under Accept; the Solutions menu files it under Grow.
          ...solutionPillar("Recurring billing"),
          title: "Recurring billing",
          body: `Support subscriptions and ${keepTogether("repeat-payment")} business models.`,
        },
        {
          // Live pillar Accept again; the menu's nearest page is Cost-reduction programs, under Grow.
          ...solutionPillar("Cost-reduction programs"),
          title: "Flexible pricing",
          body: "Support traditional processing and alternative pricing programs where appropriate.",
        },
        {
          // No menu page for payment security: Fraud & risk tools is the nearest (design spec §6).
          ...solutionPillar("Fraud & risk tools"),
          title: "Payment security",
          body: "Tokenization, 3D Secure, fraud prevention, and chargeback tools.",
        },
        {
          ...solutionPillar("Instant payouts"),
          title: "Faster access to funds",
          body: "Help eligible merchants improve cash flow.",
        },
        {
          ...solutionPillar("Working capital"),
          title: "Working capital",
          body: "Give growing merchants access to additional capital options.",
        },
      ],
    },
    {
      kind: "flow",
      // The live section anchor (the hero's "Explore Our APIs" button jumped here).
      id: "our-api",
      title: "Built for your product team.",
      lead: "Payments shouldn't require you to become a payments company. Beyond works with your team from solution design through integration, certification, launch, merchant onboarding, and ongoing optimization.",
      nodes: [
        { label: "Your platform" },
        { label: "Beyond APIs / gateway / integration layer" },
        { label: "Payment processing" },
        { label: "Merchant funding + reporting + risk" },
      ],
      focus: 1,
    },
    {
      kind: "chips",
      // Drafted title: the live section label "Integration story" reads oddly as a heading, so the
      // seven labels are introduced in their own words (client review, D-040).
      title: "What the integration covers.",
      chips: [
        "Embedded onboarding",
        "Payment acceptance",
        "Tokenization",
        "Merchant management",
        "Reporting",
        "Webhooks / event notifications",
        "API access",
      ],
    },
    {
      kind: "steps",
      title: "From first conversation to live merchants.",
      steps: [
        {
          title: "Design",
          body: "We work together to define the customer experience, payment capabilities, integration approach, and commercial model.",
        },
        {
          title: "Integrate",
          body: "Your developers connect to the appropriate Beyond payment technologies and integrations with support from our team.",
        },
        {
          title: "Launch & grow",
          body: "Start onboarding merchants, processing transactions, and expanding your payments program as your platform grows.",
        },
      ],
    },
    {
      kind: "cards",
      title: "Other partner programs.",
      cards: [
        programCard("/partners/isos-agents", "Explore ISOs & agents"),
        programCard("/partners/associations", "Explore associations"),
      ],
    },
  ],
  faq: {
    title: "Questions from ISVs & platforms.",
    items: [
      {
        q: "What types of software companies does Beyond work with?",
        a: "Beyond works with software companies and platforms across a range of verticals whose customers need to accept payments as part of the product experience.",
        confirm: true,
        note: "ISVs & platforms: the specific vertical focus (live answer marked as a placeholder)",
      },
      {
        q: "Can Beyond support embedded or integrated payments?",
        a: "Yes. Embedded and integrated payment experiences are a core part of how Beyond works with ISVs and platforms.",
      },
      {
        q: "What integration options are available?",
        a: "Options can include APIs, gateways, and hosted payment experiences depending on your product's needs.",
        confirm: true,
        note: "ISVs & platforms: current technical integration options (live answer marked as a placeholder)",
      },
      {
        q: "Who handles merchant underwriting?",
        a: "Beyond's underwriting team supports merchant review and approval, working alongside your onboarding flow.",
      },
      {
        q: "Can our company participate in payment revenue?",
        a: "Yes, revenue participation models are available.",
        confirm: true,
        note: "ISVs & platforms: specific revenue share terms (live answer marked as a placeholder)",
      },
      {
        q: "Can we maintain our own customer experience and branding?",
        a: "Yes. The goal is to support your product experience, not replace it.",
      },
      {
        q: "Does Beyond support both online and in-person payments?",
        a: "Yes — Beyond supports online, in-person, and card-not-present payment scenarios.",
      },
    ],
  },
} satisfies SolutionPageContent;
