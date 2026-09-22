import type { SolutionPageContent } from "@/types/content";
import { ANSWER_TO_SUPPLY, solutionBreadcrumb, solutionLink } from "@/content/solutions/links";
import { keepTogether } from "@/lib/typography";

/**
 * Network tokenization (D-058). Copy is the live beyondbancard.com/protect/network-tokenization/
 * page (captured 21 Sept 2026), in live section order.
 *
 * Edits:
 * - Headings, feature titles, compare column titles and chips in sentence case ("Reduce credential
 *   exposure", "Gateway / vault token", "Card-on-file", "Account-based customer relationships", …);
 *   section h2s end with a full stop; straight apostrophes. The hero lead doesn't name Beyond, so
 *   "Beyond" → "Beyond Bancard" at the first mention, the bigger picture lead.
 * - Hero h1 is the page's own section-2 heading "Keep the card number out of more places." (the live
 *   hero h2 is Fraud & risk tools', §5); the hero lead is this page's and is kept. Hero actions are
 *   the standard expert button and "Apply now" ("Talk to a Payments Expert" names no specialist, so
 *   the default "Talk to an expert" label stays). No hero visual (the live mock card is Fraud & risk
 *   tools', §5).
 * - Section 2 (traditional vs. network-tokenized environment) → compare, titled with its label as a
 *   sentence, "What network tokenization does." (its h2 is now the h1), keeping the live anchor
 *   "network-tokenization".
 * - "More than a security checkbox." (four boxes beside a photo) → features (split).
 * - "Network token vs. gateway token." → compare in live column order, its paragraph as the note.
 * - "Where tokenization fits." → chips.
 * - Related solutions: the template's title "Related solutions" and menu labels (Recurring billing,
 *   Online payments, 3D Secure, Fraud & risk tools, as live).
 * - The bigger picture: Protect's heading and this page's paragraph, as live; the lifecycle row
 *   (Accept, Protect, Grow, Operate) becomes the template's links to the other three pillars.
 * - FAQ question 2 repeats answer 1, so its wording is drafted from its own live answer and the item
 *   flagged (C2). Answers 3, 5, 6 and 7: the placeholder text is dropped and the answer flagged (C2).
 *   Answer 8 repeats its question: stand-in answer, flagged (C2).
 * - Hyphenated compounds in feature bodies ("stored-card", "Network-tokenized") carry word joiners
 *   (keepTogether) so they don't break at the hyphen; the visible text is unchanged. The hero lead
 *   (also the meta description) and FAQ text are left plain, as on Online payments.
 *
 * Dropped:
 * - Section labels above the headings ("Network Tokenization", "Build the right control layer",
 *   the second "What network tokenization does", "Where this fits", "Related solutions", "The bigger
 *   picture", "FAQ") are not repeated as eyebrows (D-003).
 * - The hero h2 "Stop more bad transactions without blocking good customers." and the hero mock card
 *   (Risk Signals / Disputes / Reports, "TODAY Low Risk ✓", Authenticated / Tokenized / Rules Passed),
 *   both Fraud & risk tools' (§5).
 * - Hero button "Explore Network Tokenization" (an in-page jump to #network-tokenization).
 * - The "control layer" section photo (C5).
 * - Related section heading "More capabilities that connect to network tokenization." (the
 *   template's title stands in).
 * - The FAQ footer "Still have questions? We're happy to help." and its "Ready To Get Started?"
 *   button (the template's FAQ line and closing band cover both).
 *
 * Live-site issues:
 * - The hero headline "Stop more bad transactions without blocking good customers." and the hero mock
 *   card are the Fraud & risk tools page's.
 * - Sections 2 and 4 carry the same label, "What network tokenization does".
 * - FAQ question 2 repeats answer 1 ("A method of replacing sensitive card credentials with
 *   network-issued tokens to reduce credential exposure."); its answer is about network vs. gateway
 *   tokens.
 * - Section 4 says a network token is "issued or managed through the card network"; FAQ answer 2
 *   says "issued and managed by the card network itself". Both are kept as live.
 * - FAQ answers 3, 5, 6 and 7 show their placeholders: "[Placeholder — TODO: VERIFY WITH BEYOND on
 *   specific PCI-scope impact.]", "[Placeholder — confirm specific update behavior.]" and
 *   "[Placeholder — TODO: VERIFY WITH BEYOND.]" (6 and 7).
 * - FAQ answer 8 repeats its question ("How does Beyond enable network tokenization?").
 */
export const networkTokenization = {
  meta: { title: "Network tokenization" },
  pillar: "Protect",
  kind: "detail",
  breadcrumb: solutionBreadcrumb("Protect", "Network tokenization"),
  hero: {
    // The live hero h2 is Fraud & risk tools'; the page's own section-2 heading stands in (§5).
    title: "Keep the card number out of more places.",
    lead: "Network tokenization replaces sensitive card credentials with network-issued tokens, helping reduce exposure while supporting safer stored and recurring payment experiences.",
  },
  blocks: [
    {
      kind: "compare",
      // The live section anchor (the hero's "Explore Network Tokenization" button jumped here).
      id: "network-tokenization",
      // The section's label: its live h2 is the page h1.
      title: "What network tokenization does.",
      columns: [
        {
          title: "Traditional stored-card environment",
          body: "Merchant or system stores the underlying card number (PAN) directly.",
        },
        {
          title: "Network-tokenized environment",
          body: "Merchant or system uses a token; the card network maps that token to the underlying credential.",
        },
      ],
    },
    {
      kind: "features",
      layout: "split",
      title: "More than a security checkbox.",
      items: [
        {
          title: "Reduce credential exposure",
          body: "Use tokens instead of exposing primary account numbers throughout the payment environment.",
          icon: "lock",
        },
        {
          title: "Support stored payments",
          body: `Improve the security model for recurring and ${keepTogether("stored-card")} transactions.`,
          icon: "repeat",
        },
        {
          title: "Improve payment continuity",
          body: "Network tokens may help maintain continuity when underlying card credentials change, depending on network and issuer support.",
          icon: "link",
        },
        {
          title: "Support authorization performance",
          body: `${keepTogether("Network-tokenized")} credentials can carry network context that may improve authorization performance in eligible payment environments.`,
          icon: "gauge",
        },
      ],
    },
    {
      kind: "compare",
      title: "Network token vs. gateway token.",
      columns: [
        {
          title: "Gateway / vault token",
          body: "Represents the credential within a gateway or payment provider environment.",
        },
        {
          title: "Network token",
          body: "Issued or managed through the card network and associated with the underlying payment credential.",
        },
      ],
      footnote: "Both can play useful roles in a payment environment — one does not automatically replace the other.",
    },
    {
      kind: "chips",
      title: "Where tokenization fits.",
      chips: [
        "Recurring billing",
        "Ecommerce",
        "Subscriptions",
        "Stored credentials",
        "Card-on-file",
        "Digital commerce",
        "Account-based customer relationships",
      ],
    },
  ],
  related: {
    title: "Related solutions",
    // Live: Recurring Billing, Online Payments, 3D Secure, Fraud & Risk Tools.
    links: [
      solutionLink("Recurring billing"),
      solutionLink("Online payments"),
      solutionLink("3D Secure"),
      solutionLink("Fraud & risk tools"),
    ],
  },
  bigPicture: {
    title: "Protect is what happens around every transaction.",
    // First mention of Beyond on the page, so the full name (PRD §10.5).
    lead: "Beyond Bancard's broader payments ecosystem connects acceptance, funding, and operations around the same protection layer.",
  },
  faq: {
    title: "Network tokenization questions.",
    items: [
      {
        // The Protect hub reuses this item by its exact question (pickFaq).
        q: "What is network tokenization?",
        a: "A method of replacing sensitive card credentials with network-issued tokens to reduce credential exposure.",
      },
      {
        // Drafted question: the live one repeats answer 1 (C2).
        q: "Is a network token the same as a gateway token?",
        a: "No — a gateway token exists within a specific provider's environment, while a network token is issued and managed by the card network itself.",
        confirm: true,
        note: "Network tokenization: question wording drafted; the live question repeats the previous answer. The answer says a network token is 'issued and managed by the card network itself'; the gateway-token comparison says 'issued or managed through the card network': which is right?",
      },
      {
        q: "Does tokenization eliminate PCI responsibilities?",
        a: "No. Tokenization can reduce certain exposure, but it doesn't eliminate all PCI scope considerations.",
        confirm: true,
        note: "Network tokenization: the specific PCI-scope impact of tokenization (live answer marked as a placeholder)",
      },
      {
        q: "Can network tokens help recurring payments?",
        a: "Yes — they can support a more resilient stored-payment experience for subscriptions and recurring billing.",
      },
      {
        q: "What happens when a customer's card expires?",
        a: "Depending on network and issuer support, a network token may help maintain continuity without requiring the customer to re-enter card details.",
        confirm: true,
        note: "Network tokenization: the specific credential update behavior when a card expires (live answer marked as a placeholder)",
      },
      {
        q: "Can network tokenization improve authorization rates?",
        a: "It may help in some environments due to additional network context, but Beyond does not promise a specific improvement.",
        confirm: true,
        note: "Network tokenization: whether network tokens improve authorization rates (live answer marked as a placeholder)",
      },
      {
        q: "Does tokenization work for every card?",
        a: "Support depends on the card network, issuer, and specific implementation.",
        confirm: true,
        note: "Network tokenization: which cards support network tokenization (live answer marked as a placeholder)",
      },
      {
        q: "How does Beyond enable network tokenization?",
        a: ANSWER_TO_SUPPLY,
        confirm: true,
        note: "Network tokenization: how Beyond enables network tokenization (live answer repeats its question)",
      },
    ],
  },
} satisfies SolutionPageContent;
