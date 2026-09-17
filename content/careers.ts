import type { Cta, IconName } from "@/types/content";
import { careersEmail } from "@/content/company";

/** An open role, linked to its posting on Indeed (live careers page, 17 Sept 2026). */
export type CareersRole = { title: string; summary: string; href: string };

/** A statement about working at Beyond, kept verbatim from the live careers page. */
export type CareersStatement = { text: string; icon: IconName };

export const careers = {
  breadcrumb: [{ label: "Company" }, { label: "Careers" }],
  hero: {
    // Short name in the H1 (live "Join the Beyond Team"); the lead, header logo and <title> carry "Beyond Bancard" (D-054).
    title: "Join the Beyond team.",
    lead: "Beyond Bancard is growing across the country, and we'd like you to join the team.",
    rolesCta: "See open roles",
  },
  roles: {
    /** Anchor of the roles heading; the hero's "See open roles" jumps here and moves focus to it. */
    id: "open-roles",
    title: "Open roles.",
    /** Follows the computed role count, e.g. "5 roles on Indeed". Hidden when there are no roles. */
    countLabel: (n: number) => (n === 1 ? "role on Indeed" : "roles on Indeed"),
    note: "Open roles: 3 of the 5 Indeed postings show as expired and 2 could not be checked (17 Sept 2026). Which roles are open, and where should candidates apply? Summaries are lightly edited from the current careers page.",
    /** Until the client confirms, production shows the empty state instead of the list (D-042). */
    confirmed: false,
    /** Accessible destination for each row; the board says "on Indeed" once, beside the count. */
    linkLabel: "View on Indeed",
    empty: {
      body: "There are no open roles right now. You can still send your résumé to",
      email: careersEmail,
    },
    items: [
      {
        title: "Junior Underwriter",
        summary: "Assist in assessing risk and ensuring seamless financial transactions for clients.",
        href: "https://www.indeed.com/job/junior-underwriter-084cb9710a57d836",
      },
      {
        title: "Relationship Manager",
        summary: "Foster client connections and drive growth with innovative payment solutions.",
        href: "https://www.indeed.com/job/relationship-manager-ee51b9fbc578b335",
      },
      {
        title: "Junior Risk Manager",
        summary: "Safeguard clients' interests and optimize risk management strategies.",
        href: "https://www.indeed.com/job/junior-risk-manager-3564f488b0c111e3",
      },
      {
        title: "Technology Project Manager",
        summary: "Lead technological advancements that enhance payment processing and customer experiences at Beyond.",
        href: "https://www.indeed.com/job/technology-project-manager-f2601bc78758c953",
      },
      {
        title: "Technical Support Specialist",
        summary: "Provide exceptional support to merchants navigating payment technologies.",
        href: "https://www.indeed.com/job/technical-support-specialist-e832fa74d0b26ab3",
      },
    ] satisfies CareersRole[],
  },
  culture: {
    title: "What it's like to work here.",
    items: [
      { text: "We prioritize the personal development and career trajectory of each employee.", icon: "trending-up" },
      { text: "We offer an environment where your ideas are valued.", icon: "megaphone" },
      { text: "Through collaboration, team members can unleash their potential.", icon: "users" },
      { text: "Being part of a successful team fosters a sense of pride and fulfillment.", icon: "badge-check" },
    ] satisfies CareersStatement[],
  },
  values: {
    title: "Our values.",
    linkLabel: "Read what we believe",
  },
  ctaBand: {
    title: "Don't see the right role?",
    body: `Send your résumé to ${careersEmail} and tell us where you'd fit.`,
    primary: { label: "Email the careers team", href: `mailto:${careersEmail}` } satisfies Cta,
    secondary: { label: "About Beyond", href: "/about-beyond-bancard" } satisfies Cta,
  },
};
