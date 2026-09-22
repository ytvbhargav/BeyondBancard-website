import { careersEmail } from "@/content/company";
import { contact, cta, portals } from "@/content/site";
import type { IconName } from "@/types/content";

/* ---------------------------------- Types ---------------------------------- */

/** Values of the form's Topic select; the need directory sets them (D-054). */
export type ContactTopicId = "merchant" | "account" | "partner" | "careers" | "other";

export type ContactTopic = { id: ContactTopicId; label: string };

/** One way to reach a team: a label column and a link value (the underwriting-file row, D-001). */
export type ContactChannel = { label: string; value: string; href: string };

/** One quadrant of the need directory. */
export type ContactNeed = {
  /** Heading id. */
  id: string;
  title: string;
  body: string;
  icon: IconName;
  /** Topic the "Message us about this" button selects in the form. */
  topic: ContactTopicId;
  /** The quadrant's one button, when the need has a CTA from `cta`. */
  action?: { label: string; href: string };
  /** Every other channel, as file rows under the button. */
  channels: ContactChannel[];
};

/* ---------------------------------- Data ----------------------------------- */

// Live site labels: "Sales" is sales@, "Support" is boarding@ (content/site.ts lists them in that order).
const [salesEmail, supportEmail] = contact.emails;
const mailto = (email: string) => `mailto:${email}`;

// Each topic keeps the name of the directory quadrant that sets it, so the choice reads the same
// on the button's quadrant, in the note and in the select (D-054).
const titles = {
  merchant: "Open a merchant account",
  account: "Get help with my account",
  partner: "Partner with Beyond",
  careers: "Work at Beyond",
} as const;

export const contactTopics: ContactTopic[] = [
  { id: "merchant", label: titles.merchant },
  { id: "account", label: titles.account },
  { id: "partner", label: titles.partner },
  { id: "careers", label: titles.careers },
  { id: "other", label: "Something else" },
];

export const contactPage = {
  breadcrumb: [{ label: "Company" }, { label: "Contact" }],
  hero: {
    title: "Talk to the right team.",
    // First mention of the full name on the page (PRD §10.5); also the meta description.
    lead: "Tell us what you need and we'll connect you with the people at Beyond Bancard who can help.",
    call: `Call ${contact.phoneMain.label}.`,
  },
  directory: {
    title: "What do you need?",
    messageLabel: "Message us about this",
    needs: [
      {
        id: "need-merchant",
        title: titles.merchant,
        body: "Start an application or talk through your options first.",
        icon: "store",
        topic: "merchant",
        action: { label: cta.apply.label, href: cta.apply.href },
        channels: [
          { label: "Advice", value: cta.expert.label, href: cta.expert.href },
          { label: "Sales", value: salesEmail, href: mailto(salesEmail) },
        ],
      },
      {
        id: "need-account",
        title: titles.account,
        body: "Existing merchants can reach support or log in to the Merchant hub.",
        icon: "headset",
        topic: "account",
        channels: [
          { label: "Support", value: supportEmail, href: mailto(supportEmail) },
          // Verb labels, as on the ISOs & agents page ("Log in to partner portal").
          { label: "Portal", value: `Log in to ${portals.merchant.label}`, href: portals.merchant.href },
        ],
      },
      {
        id: "need-partner",
        title: titles.partner,
        body: "Refer merchants or build a partner business with Beyond.",
        icon: "handshake",
        topic: "partner",
        channels: [
          { label: "Portal", value: "Log in to partner portal", href: portals.partner.href },
          { label: "Learn more", value: "ISOs & agents program", href: "/partners/isos-agents" },
        ],
      },
      {
        id: "need-careers",
        title: titles.careers,
        // The form takes no attachments, so the résumé route is the careers inbox.
        body: "See open roles, or email your résumé to the careers team.",
        icon: "briefcase",
        topic: "careers",
        channels: [
          // Same label as About and Careers; the Careers page anchors its roles board at #open-roles (spec §3.2).
          { label: "Roles", value: "See open roles", href: "/careers#open-roles" },
          { label: "Careers", value: careersEmail, href: mailto(careersEmail) },
        ],
      },
    ] satisfies ContactNeed[],
  },
  form: {
    title: "Send us a message.",
    confirmNote: "Contact form fields and routing",
    requiredHint: "Fields marked * are required.",
    /** Shown on the card and announced when a directory button picks the topic. */
    topicNote: (label: string) => `Topic: ${label}`,
    labels: {
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      phone: "Phone",
      businessName: "Business name",
      topic: "Topic",
      message: "Message",
    },
    topicPlaceholder: "Choose a topic",
    message: {
      /** Inclusive bounds, validated in components/forms/contact-schema.ts. */
      min: 10,
      max: 1000,
      hint: "Between 10 and 1,000 characters.",
      /** Screen readers hear the count only once this many characters (or fewer) are left. */
      announceWithin: 100,
      remaining: (n: number) => `${n} ${n === 1 ? "character" : "characters"} left`,
      over: (n: number) => `${n} ${n === 1 ? "character" : "characters"} too many`,
    },
    errors: {
      firstName: "Enter your first name.",
      lastName: "Enter your last name.",
      email: "Enter an email, like name@company.com.",
      phone: "Enter a full phone number with area code, or leave this blank.",
      topic: "Choose what your message is about.",
      messageShort: "Enter a message of at least 10 characters.",
      messageLong: "Keep your message to 1,000 characters or fewer.",
    },
    submit: "Send message",
    submitting: "Sending…",
    demoNotice: "Demo only — no data is sent.",
    privacy: {
      before: "Your information is handled under our ",
      link: "Privacy Policy",
      href: "/privacy-policy",
      after: ".",
    },
    success: {
      title: "Message sent.",
      body: (firstName: string) => `Thanks, ${firstName}. We've received your message.`,
      again: "Send another message",
    },
  },
  channels: {
    // Only what the directory above does not already list: sales@ and boarding@ live in their quadrants (D-054).
    title: "Other ways to reach us",
    // Labels match the footer ("Phone"); "Address" names the street address without implying walk-ins.
    phone: { label: "Phone", value: contact.phoneMain.label, href: contact.phoneMain.href },
    fax: { label: "Fax", value: contact.fax },
    address: {
      label: "Address",
      lines: contact.address.lines,
      href: contact.address.href,
      linkHint: "opens map in a new tab",
    },
    answers: { label: "Answers", value: "Browse the FAQ", href: "/faq" },
  },
};
