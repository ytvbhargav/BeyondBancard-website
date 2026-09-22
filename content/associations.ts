import type { NavLink, SolutionPageContent } from "@/types/content";
import { partnersMenu } from "@/content/site";
import { solutionPillar } from "@/content/solutions/links";
import { keepTogether } from "@/lib/typography";

/**
 * Associations partner page (D-061), in the Solutions page template (D-058). Copy is the
 * live beyondbancard.com/partners/associations/ page (captured 22 Sept 2026), in live
 * section order.
 *
 * Edits:
 * - Headings, feature titles, capability titles, flow stages and tags, hero mock labels and step
 *   titles in sentence case ("Recurring revenue", "POS & payment terminals", "Beyond co-branded
 *   payment program", "Events & trade shows", "Bring it to members", "Live program", "Members
 *   enrolled", …); section h2s end with a full stop; straight apostrophes. "Beyond" →
 *   "Beyond Bancard" at the first mention in the page copy (the second section's paragraph; the
 *   hero lead doesn't name Beyond).
 * - Hero h1 is the live hero h2. Hero actions are the partner pair, "Become a partner" and
 *   "Talk to an expert" (PRD §5.5); the live "Explore an Association Partnership" (contact) and
 *   "See the Program" (in-page jump) buttons are not used.
 * - Hero mock card: dropped, so this page has no hero panel (see Dropped).
 * - Section labels above the headings ("Associations", "Built for organizations", "Member
 *   value", "Turnkey member program", "How it works", "FAQ") are not repeated as eyebrows
 *   (D-003); the 01–03 markers on "From program design to member adoption." are dropped (the
 *   steps component numbers its own).
 * - "Turn payments into a benefit members actually use." → statement (the live H6 line is the
 *   lead, the paragraph the body); "Value for your organization. Value for your members." →
 *   features (split); "Give every member a better way to get paid." → the capability tabs; the
 *   p-arch node chain → flow ("Beyond Co-Branded Payment Program" is the live dark node, so it
 *   is the focused stage, and the section keeps the live #member-program anchor); "From program
 *   design to member adoption." → steps.
 * - The six program-support labels under the chain are names with no bodies, so they become the
 *   flow's `tags` (the shape the Grow hub uses, design spec §4 and §5): they stay in the one live
 *   section, under the chain they belong to, and no heading has to be invented for them.
 * - Capabilities keep the live titles ("POS & payment terminals", "Fraud & chargeback
 *   protection", "Integrations & APIs", …); pillar and link come from the Solutions menu via
 *   solutionPillar(), so Recurring billing and Flexible pricing programs sit under Grow (the
 *   live page files both under Accept). Titles with no page of their own link to the nearest
 *   menu page: POS & payment terminals → POS systems, Flexible pricing programs →
 *   Cost-reduction programs, Fraud & chargeback protection → Chargeback protection, Reporting &
 *   analytics → Reporting, Integrations & APIs → Payment gateways.
 * - "Other partner programs." closes the page with the two other programs, as on ISOs & agents:
 *   the Partners menu's labels and descriptors, so a renamed program fails the build. The
 *   "Explore …" card labels are drafted (the live page has no such section).
 * - No related solutions and no bigger picture: partner pages sit outside the four pillars.
 * - Hyphenated compounds ("non-dues", "card-not-present", "card-based", "membership-style",
 *   "co-branded") carry word joiners (keepTogether) so they don't break at the hyphen, in the
 *   narrow cells (the hero stat, the flow stage and its tag) as well as the bodies; the visible
 *   text is unchanged. FAQ text is left plain, as on the sibling pages.
 * - FAQ answers 1, 2, 3 and 7: the placeholder text is dropped and the answer flagged (C2).
 *
 * Dropped:
 * - The whole hero mock card. Its four figures (1,240 members enrolled, 86% adoption, $42K
 *   non-dues revenue, a 4.8/5 member rating) are program results and a satisfaction score, which
 *   read as claims about real associations even behind an Example tag, and ratings are never shown
 *   (PRD §10.2-10.4). The other pages' panels show a transaction or a state, not an outcome.
 * - The section-3 lead (the industry pages' paragraph, see below) and its image (C5).
 * - The capabilities lead "Your membership isn't one-size-fits-all. Their payment solutions
 *   shouldn't be either. Members get access to the right payment capabilities for their business
 *   while receiving support from a team that understands payments." (the capability tabs have no
 *   lead, as on the industry pages).
 * - The testimonial section: "Sample placeholder — pending approved partner content", the quote
 *   and "Placeholder — Executive Director, Sample Member Association", with its four "Partner
 *   Logo" placeholders (C2).
 * - The FAQ footer "Still have questions? We're happy to help." and its "Ready To Get Started?"
 *   button (the template's FAQ line and closing band cover both).
 *
 * Live-site issues:
 * - The hero mock card presents program results (1,240 members enrolled, 86% adoption, $42K
 *   non-dues revenue) and a 4.8/5 member rating as real figures, with no "example" label on them.
 * - The section-3 paragraph is the industry pages' "Why Beyond" lead ("Beyond helps structure
 *   the full payment environment around your business — from underwriting and acceptance through
 *   risk, reporting, funding, and ongoing account health."), which doesn't describe an
 *   association program.
 * - A sample testimonial and four "Partner Logo" placeholders are published.
 * - The capabilities file Recurring Billing and Flexible Pricing Programs under Accept (the
 *   Solutions menu files both under Grow).
 * - FAQ answers 1, 2, 3 and 7 show their placeholders, including "[Placeholder — do not publish
 *   specific revenue share terms until approved.]".
 * - The browser title is the generic "Merchant Processing Service Provider - Online Processing".
 */

/**
 * A partner program card, looked up in the Partners menu by its route so a renamed program or a
 * missing descriptor fails the build (the approach `content/partners.ts` uses).
 */
function programCard(href: string, linkLabel: string) {
  const item = partnersMenu.find((p) => p.href === href);
  if (!item?.description) throw new Error(`Partner program or its descriptor not found: ${href}`);
  return { title: item.label, body: item.description, link: { label: linkLabel, href: item.href } satisfies NavLink };
}

export const associations = {
  meta: { title: "Associations" },
  kind: "detail",
  breadcrumb: [{ label: "Partners", href: "/partners" }, { label: "Associations" }],
  hero: {
    title: "A better payments benefit for your members — and your organization.",
    lead: "Give your members access to payment solutions, preferred support, and cost-saving opportunities while creating a recurring revenue stream that helps support your association.",
    ctas: "partner",
  },
  blocks: [
    {
      kind: "statement",
      title: "Turn payments into a benefit members actually use.",
      lead: "Your members process payments every day.",
      // First mention of Beyond in the page copy (the hero lead doesn't name it).
      body: [
        "A Beyond Bancard association program turns something they're already paying for into an opportunity to deliver more value — without asking your organization to become a payments expert.",
      ],
    },
    {
      kind: "features",
      layout: "split",
      // The live lead is the industry pages' "Why Beyond" paragraph (dropped, see above).
      title: "Value for your organization. Value for your members.",
      items: [
        {
          title: "Recurring revenue",
          body: `Create an additional source of ${keepTogether("non-dues")} revenue as participating members process payments through the Beyond program.`,
          icon: "coins",
        },
        {
          title: "Meaningful member value",
          body: "Give members access to competitive payment solutions, technology, and expertise they may not be able to negotiate or source on their own.",
          icon: "users",
        },
        {
          title: "Turnkey program support",
          body: "Beyond works with your team on program rollout, member onboarding, education, communications, and sales support.",
          icon: "headset",
        },
        {
          title: "A dedicated partner",
          body: "Work with people who understand your organization and can support your staff, chapters, events, and participating members.",
          icon: "handshake",
        },
      ],
    },
    {
      kind: "capabilities",
      title: "Give every member a better way to get paid.",
      items: [
        {
          ...solutionPillar("In-person payments"),
          title: "In-person payments",
          body: "Countertop and mobile solutions for physical commerce.",
        },
        {
          ...solutionPillar("Online payments"),
          title: "Online payments",
          body: `Secure ecommerce and ${keepTogether("card-not-present")} acceptance.`,
        },
        {
          ...solutionPillar("POS systems"),
          title: "POS & payment terminals",
          body: "Hardware options that fit member business types.",
        },
        {
          ...solutionPillar("ACH & eCheck"),
          title: "ACH & eCheck",
          body: `An alternative to ${keepTogether("card-based")} payments.`,
        },
        {
          // The menu files recurring billing under Grow (the live page labels it Accept).
          ...solutionPillar("Recurring billing"),
          title: "Recurring billing",
          body: `Support for subscription and ${keepTogether("membership-style")} billing.`,
        },
        {
          // Dual pricing and surcharging are the cost-reduction programs, under Grow (live: Accept).
          ...solutionPillar("Cost-reduction programs"),
          title: "Flexible pricing programs",
          body: "Dual pricing, surcharge, and other eligible programs.",
        },
        {
          ...solutionPillar("Chargeback protection"),
          title: "Fraud & chargeback protection",
          body: "Tools that help protect member revenue.",
        },
        {
          ...solutionPillar("Reporting"),
          title: "Reporting & analytics",
          body: "Visibility into payment activity and performance.",
        },
        {
          ...solutionPillar("Working capital"),
          title: "Working capital",
          body: "Access to additional capital options for eligible members.",
        },
        {
          // No menu page for integrations & APIs: Payment gateways is the nearest.
          ...solutionPillar("Payment gateways"),
          title: "Integrations & APIs",
          body: "Connects with the systems members already use.",
        },
      ],
    },
    {
      kind: "flow",
      // The live section anchor (the hero's "See the Program" button jumped here).
      id: "member-program",
      title: "We help run the program with you.",
      lead: "A valuable affinity program shouldn't create another job for your association staff.",
      nodes: [
        { label: "Association" },
        { label: `Beyond ${keepTogether("co-branded")} payment program` },
        { label: "Member businesses" },
        { label: "Payments + support + member benefits" },
      ],
      focus: 1,
      // The six program-support labels listed under the live chain.
      tags: [
        `${keepTogether("Co-branded")} program materials`,
        "Dedicated member enrollment",
        "Member education",
        "Events & trade shows",
        "Program reporting",
        "Dedicated relationship management",
      ],
    },
    {
      kind: "steps",
      title: "From program design to member adoption.",
      steps: [
        {
          title: "Build the program",
          body: "We work with your team to define the offer, member benefits, program structure, and rollout strategy.",
        },
        {
          title: "Bring it to members",
          body: `Beyond can support member education, ${keepTogether("co-branded")} materials, campaigns, events, and enrollment.`,
        },
        {
          title: "Support & grow",
          body: "Our team supports participating merchants while working with your organization to increase awareness and adoption over time.",
        },
      ],
    },
    {
      kind: "cards",
      title: "Other partner programs.",
      cards: [
        programCard("/partners/isos-agents", "Explore ISOs & agents"),
        programCard("/partners/isvs-platforms", "Explore ISVs & platforms"),
      ],
    },
  ],
  faq: {
    title: "Questions from associations.",
    items: [
      {
        q: "How does an association payments partnership work?",
        a: "Beyond works with your organization to design a co-branded program that gives members access to payment solutions while creating revenue for the association.",
        confirm: true,
        note: "Associations: program structure specifics (live answer marked as a placeholder)",
      },
      {
        q: "How does the association generate revenue?",
        a: "Participating members' processing activity can generate non-dues revenue for the organization.",
        confirm: true,
        note: "Associations: which revenue share terms may be published (the live answer is marked as a placeholder: do not publish specific terms until approved)",
      },
      {
        q: "What types of businesses can participate?",
        a: "Most member business types can participate, including conventional and more specialized categories.",
        confirm: true,
        note: "Associations: member eligibility scope (live answer marked as a placeholder)",
      },
      {
        q: "Who supports members after enrollment?",
        a: "Beyond's support team assists enrolled members directly, while your organization continues to own the member relationship.",
      },
      {
        q: "Can the program be co-branded?",
        a: "Yes. Co-branded materials are part of a typical association program.",
      },
      {
        q: "Does Beyond provide marketing and enrollment support?",
        a: "Yes. Beyond can support communications, campaigns, and enrollment materials alongside your team.",
      },
      {
        q: "Can Beyond support national or multi-chapter organizations?",
        a: "Yes.",
        confirm: true,
        note: "Associations: support for national and multi-chapter organizations, and any chapter-specific program considerations (the live answer is a bare yes plus a placeholder)",
      },
    ],
  },
} satisfies SolutionPageContent;
