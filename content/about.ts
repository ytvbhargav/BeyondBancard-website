import type { Cta, IconName, NavLink } from "@/types/content";
import { contact } from "@/content/site";

/* Page-specific types (kept here while pages are built in parallel, spec §1.10). */

/** A label/value row in the company file. `confirm` flags an unverified value; `href` makes the value an external link. */
export type CompanyFact = {
  label: string;
  value: string;
  href?: string;
  linkHint?: string;
  confirm?: boolean;
  note?: string;
};

/** A sponsor bank as named in the regulatory disclosure (PRD §8.5). */
export type SponsorBank = { name: string; location: string };

export type CompanyFileContent = {
  name: string;
  /** Document type, shown under the name. */
  kind: string;
  status: string;
  facts: CompanyFact[];
  banksLabel: string;
  banks: SponsorBank[];
};

export type Audience = { title: string; body: string; icon: IconName; link?: NavLink };

/**
 * About (spec §3.1, D-054). Values live in content/company.ts, shared with Careers.
 * Sources: mission and lead from the current About page and PRD positioning; company
 * facts from PRD §1, §8.5 and §9.1; audience bodies from PRD §1, §9.1.4 and §9.1.6;
 * the careers line from the current Careers intro.
 */
export const about = {
  breadcrumb: [{ label: "Company" }, { label: "About" }],
  hero: {
    title: "We help businesses take payments securely and efficiently.",
    // Live H1 ("Comprehensive Package of Products") plus the PRD positioning line.
    lead: "Beyond Bancard gives merchants flexible payment processing and a comprehensive package of products, and works with businesses other processors turn away.",
  },

  file: {
    name: "Beyond Bancard",
    kind: "Company file",
    status: "Registered ISO/MSP",
    // The full address is in the footer; the file names the city and links to the map (D-054).
    facts: [
      {
        label: "Headquarters",
        value: "Orange, California",
        href: contact.address.href,
        linkHint: "opens map in a new tab",
      },
      { label: "Experience", value: "20+ years in payments", confirm: true, note: "20+ years in payments" },
      { label: "Coverage", value: "Nationwide" },
    ],
    banksLabel: "Sponsor banks",
    // Order and locations as in the disclosure (PRD §8.5). The current About page lists Avidia Bank
    // instead of Esquire Bank: an open question for the client, the disclosure is not changed.
    banks: [
      { name: "Esquire Bank", location: "Jericho, NY" },
      { name: "Merrick Bank", location: "South Jordan, UT" },
      { name: "Mission Valley Bank", location: "Sun Valley, CA" },
    ],
  } satisfies CompanyFileContent,

  values: {
    title: "What we believe.",
    // Values lead to careers, so the route to open roles closes the values section (D-054).
    careers: {
      body: "We're growing across the country, and we'd like you to join the team.",
      cta: { label: "See open roles", href: "/careers#open-roles" } satisfies Cta,
    },
  },

  audiences: {
    title: "Who we work with.",
    items: [
      {
        title: "Complex and high-risk industries",
        body: "Deep experience in regulated and emerging categories, where a generic merchant account usually falls short.",
        icon: "shield",
        link: { label: "View complex industries", href: "/industries" },
      },
      {
        title: "Everyday businesses",
        body: "Retail, restaurants, field services, healthcare and more.",
        icon: "store",
      },
      {
        title: "Partners",
        body: "Training, marketing support and competitive economics for the people who bring merchants to us.",
        icon: "handshake",
        // Named after its destination, as in the Partners menu (/partners is "Partner programs").
        link: { label: "View ISOs & agents", href: "/partners/isos-agents" },
      },
    ] satisfies Audience[],
  },
};
