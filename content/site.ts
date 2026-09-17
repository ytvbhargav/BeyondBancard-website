import type { Cta, NavLink, Pillar } from "@/types/content";
import { PHONE } from "@/lib/links";
import { featuredIndustries, industryPath } from "@/content/industries";

export const siteName = "Beyond Bancard";

/** CTA vocabulary (PRD §5.5). Use these objects, never retype labels. */
export const cta = {
  apply: { label: "Apply now", href: "/live-form", variant: "primary" },
  expert: { label: "Talk to an expert", href: "/schedule-a-demo", variant: "secondary" },
  partner: {
    label: "Become a partner",
    // PRD §5.5: always routes to coming-soon, even though the ISOs page is in the demo.
    href: `/coming-soon?from=${encodeURIComponent("/partners/isos-agents#apply")}`,
    variant: "primary",
  },
  phone: { label: PHONE.label, href: PHONE.href },
} as const satisfies Record<string, Cta>;

export const announcement = {
  text: "Direct RUO peptide processing is now available for merchants processing $100K+ per month.",
  link: { label: "See requirements", href: "/industries/ruo-peptides" },
  note: "RUO announcement: permanent or temporary campaign?",
};

export const contact = {
  phoneMain: PHONE,
  fax: "(661) 885-8801",
  emails: ["sales@beyondbancard.com", "boarding@beyondbancard.com"],
  address: {
    lines: ["500 N State College Blvd., Suite 800", "Orange, CA 92868"],
    href: "https://maps.app.goo.gl/iVN1hwaA5SxrrX2L9",
  },
};

export const portals = {
  partner: { label: "Partner portal", href: "https://portal.beyondbancard.com/v2/login?ref=/v2", external: true },
  merchant: { label: "Merchant hub", href: "https://hub.beyondbancard.com/", external: true },
} satisfies Record<string, NavLink>;

export const social = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/beyond-bancard/", icon: "linkedin" },
  { label: "X", href: "https://twitter.com/BeyondBancard", icon: "x" },
  { label: "Facebook", href: "https://www.facebook.com/bb.beyondbancard", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/beyondbancard/", icon: "instagram" },
] as const;

/* ---------------------------------- Menus ---------------------------------- */

export type SolutionColumn = {
  pillar: Pillar;
  href: string;
  descriptor: string;
  links: NavLink[];
};

export const solutionsMenu: SolutionColumn[] = [
  {
    pillar: "Accept",
    href: "/accept",
    descriptor: "More ways to get paid",
    links: [
      { label: "High-risk processing", href: "/accept/high-risk-processing" },
      { label: "Online payments", href: "/accept/online-payments" },
      { label: "In-person payments", href: "/accept/in-person-payments" },
      { label: "B2B payments", href: "/accept/b2b-payments" },
      { label: "International payments", href: "/accept/international-payments" },
      { label: "ACH & eCheck", href: "/accept/ach-echeck" },
    ],
  },
  {
    pillar: "Protect",
    href: "/protect",
    descriptor: "Keep the revenue you earn",
    links: [
      { label: "Chargeback protection", href: "/protect/chargeback-protection" },
      { label: "Network tokenization", href: "/protect/network-tokenization" },
      { label: "3D Secure", href: "/protect/3d-secure" },
      { label: "Fraud & risk tools", href: "/protect/fraud-risk-tools" },
    ],
  },
  {
    pillar: "Grow",
    href: "/grow",
    descriptor: "Put payments to work",
    links: [
      { label: "Working capital", href: "/grow/working-capital" },
      { label: "Instant payouts", href: "/grow/instant-payouts" },
      { label: "Recurring billing", href: "/grow/recurring-billing" },
      { label: "Cost-reduction programs", href: "/grow/cost-reduction-programs" },
    ],
  },
  {
    pillar: "Operate",
    href: "/operate",
    descriptor: "Tools to run payments",
    links: [
      { label: "Reporting", href: "/operate/dashboard-reporting" },
      { label: "Invoicing", href: "/operate/invoicing" },
      { label: "Payment gateways", href: "/operate/payment-gateways" },
      { label: "Payment technology", href: "/operate/payment-technology" },
      { label: "POS systems", href: "/operate/pos" },
      { label: "Virtual terminal", href: "/operate/virtual-terminal" },
    ],
  },
];

export const everydayGroups: NavLink[] = [
  { label: "Specialized & regulated", href: "/industries#specialized" },
  { label: "Retail & hospitality", href: "/industries#retail" },
  { label: "Professional & field services", href: "/industries#professional" },
  { label: "Healthcare & wellness", href: "/industries#healthcare" },
  { label: "Digital businesses", href: "/industries#digital" },
];

export const partnersMenu: NavLink[] = [
  { label: "Partner programs", href: "/partners", description: "Every way to work with Beyond." },
  {
    label: "ISOs & agents",
    href: "/partners/isos-agents",
    description: "Offer more merchants a home, including hard-to-place businesses.",
  },
  {
    label: "ISVs & platforms",
    href: "/partners/isvs-platforms",
    description: "Embed payments, enhance your product and create recurring revenue.",
  },
  {
    label: "Associations",
    href: "/partners/associations",
    description: "Create a valuable payment benefit for members while generating recurring revenue.",
  },
];

export const resourcesMenu: NavLink[] = [
  { label: "Blog", href: "/news" },
  { label: "Client stories", href: "/our-clients" },
  { label: "FAQ", href: "/faq" },
];

export const companyMenu: NavLink[] = [
  { label: "About", href: "/about-beyond-bancard" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact-us" },
];

export const legalLinks: NavLink[] = [
  { label: "Terms", href: "/terms-conditions" },
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Accessibility", href: "/accessibility" },
];

/* --------------------------------- Footer --------------------------------- */

export type FooterGroup = {
  /** Visible h2. */
  title: string;
  /** Pillar hub. The desktop heading links here; below lg the panel opens with this row. */
  hub?: { href: string; descriptor: string };
  links: NavLink[];
  /** Emphasised closing row with an arrow. */
  more?: NavLink;
};

const pillarGroup = (c: SolutionColumn): FooterGroup => ({
  title: c.pillar,
  hub: { href: c.href, descriptor: c.descriptor },
  links: c.links,
});

/** Footer link groups as three desktop columns. Flattened into one accordion list below lg. */
export const footerGroups: FooterGroup[][] = [
  solutionsMenu.map(pillarGroup),
  [
    {
      title: "Complex industries",
      links: featuredIndustries.map((i) => ({ label: i.name, href: industryPath(i.slug) })),
    },
    {
      title: "Everyday businesses",
      links: everydayGroups,
      more: { label: "View all industries", href: "/industries" },
    },
    {
      title: "Partners",
      // cta.partner.href already points at /coming-soon; the footer passes it through untouched.
      links: [
        ...partnersMenu.map(({ label, href }) => ({ label, href })),
        { label: cta.partner.label, href: cta.partner.href },
      ],
    },
  ],
  [
    { title: "Resources", links: resourcesMenu },
    { title: "Company", links: companyMenu },
    { title: "Log in", links: [portals.partner, portals.merchant] },
    { title: "Legal", links: legalLinks },
  ],
];

/** Regulatory disclosures, verbatim (PRD §8.5). Do not edit. */
export const disclosures = {
  sponsorBanks:
    "Beyond Bancard is a registered ISO/MSP of Esquire Bank, Jericho, NY; Merrick Bank, South Jordan, UT; and Mission Valley Bank, Sun Valley, CA.",
  clover:
    "The Clover name and logo are registered trademarks owned by Clover Network, LLC. These registered trademarks are also utilized by Fiserv Canada Ltd. Beyond Bancard operates as an Independent Sales Organization (ISO) of Fiserv Canada Ltd. All trademarks, service marks, and brand names mentioned are the exclusive property of their respective owners.",
  copyright: "© 2026 Beyond Bancard™. All rights reserved.",
};

export const ctaBandDefault = {
  title: "Build a better payments program.",
  body: "Simpler processing, better economics, or support for a complex business model. Tell us what you need and we'll build around it.",
};
