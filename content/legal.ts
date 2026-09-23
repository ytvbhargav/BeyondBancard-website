import type { ArticleBlock } from "@/types/content";

/**
 * Terms and Privacy (D-062). Copy is the live beyondbancard.com page for each route,
 * captured 22 Sept 2026, verbatim: legal wording is never rewritten. Mechanical edits
 * only — section headings in sentence case (the live page sets them as h4), missing
 * spaces after full stops restored, and the site's own URLs written as internal links.
 *
 * Three sections cannot be published as they stand, so each keeps its heading and shows
 * a stand-in, flagged for the client (and dropped in production, D-042):
 * - Terms, "Service availability": the live paragraph is a copy of "Account registration
 *   and usage" and says nothing about availability.
 * - Terms, "Modifications": the live paragraph is a copy of "Termination".
 * - Terms, "Governing law and jurisdiction": the live paragraph still leaves the jurisdiction
 *   unfilled in both places.
 *
 * Live-site issues (docs/LIVE_SITE_ISSUES.md):
 * - The two copied Terms sections and the unfilled jurisdiction above.
 * - Neither page shows when it was last updated.
 * - "Limitation of liability" and Privacy's "Information disclosure" run sentences together
 *   with no space after the full stop.
 * - The Privacy page's own link to the terms points at /terms-and-conditions, which is not
 *   the live page's address (/terms-conditions).
 * - The Privacy page has no "Information collection" section, though "Information use" refers
 *   to "the collected information".
 */

export type LegalPageContent = {
  meta: { title: string; description: string };
  breadcrumb: { label: string; href?: string }[];
  title: string;
  lead: string;
  intro: string;
  blocks: ArticleBlock[];
};

/** Shown where the live text cannot be published; always flagged, so production drops it. */
const TO_SUPPLY = "Text to be supplied by Beyond Bancard.";

export const terms = {
  meta: {
    title: "Terms & conditions",
    description:
      "The terms and conditions for using Beyond Bancard's payment system services as a business-to-business user.",
  },
  breadcrumb: [{ label: "Legal" }, { label: "Terms & conditions" }],
  title: "Terms & conditions",
  lead: "Please read these Terms and Conditions carefully before using our payment system service.",
  intro:
    "Please read these Terms and Conditions carefully before using our payment system services as a business-to-business (B2B) user. By accessing or using our website and services, you agree to be bound by these Terms and Conditions.",
  blocks: [
    { type: "h2", id: "account", text: "Account registration and usage" },
    {
      type: "p",
      text: [
        "You must be a legal entity or authorized representative to register and use our payment system services. You are responsible for maintaining the confidentiality of your account information and ensuring its proper use.",
      ],
    },

    { type: "h2", id: "availability", text: "Service availability" },
    {
      type: "p",
      text: [TO_SUPPLY],
      confirm: true,
      note: "Terms: the service availability section repeats the account registration paragraph on the live site",
    },

    { type: "h2", id: "payments", text: "Payment processing and transactions" },
    {
      type: "p",
      text: [
        "Our payment system enables you to process B2B transactions securely and efficiently. You agree to comply with all applicable laws and regulations governing payment transactions and financial activities.",
      ],
    },

    { type: "h2", id: "data", text: "Data security & privacy" },
    {
      type: "p",
      text: [
        "We prioritize the security and privacy of your data. However, we cannot guarantee the complete security of information transmitted or stored through our systems. By using our services, you consent to the collection, use, and storage of your information as outlined in our ",
        { text: "Privacy Policy", href: "/privacy-policy" },
        ".",
      ],
    },

    { type: "h2", id: "ip", text: "Intellectual property rights" },
    {
      type: "p",
      text: [
        "All intellectual property rights related to our website and services, including trademarks, copyrights, and proprietary materials, belong to us. You may not use, modify, reproduce, or distribute any of our intellectual property without our prior written consent.",
      ],
    },

    { type: "h2", id: "liability", text: "Limitation of liability" },
    {
      type: "p",
      text: [
        "We are not liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use or inability to use our services. In no event shall our liability exceed the fees paid by you for the specific services rendered.",
      ],
    },

    { type: "h2", id: "termination", text: "Termination" },
    {
      type: "p",
      text: [
        "We reserve the right to suspend or terminate your access to our services at any time without prior notice, for any reason, including violation of these Terms and Conditions.",
      ],
    },

    { type: "h2", id: "modifications", text: "Modifications" },
    {
      type: "p",
      text: [TO_SUPPLY],
      confirm: true,
      note: "Terms: the modifications section repeats the termination paragraph on the live site",
    },

    { type: "h2", id: "governing-law", text: "Governing law and jurisdiction" },
    {
      type: "p",
      text: [TO_SUPPLY],
      confirm: true,
      note: "Terms: the governing law and the courts with jurisdiction, which the live page has not filled in",
    },

    { type: "h2", id: "sms", text: "Mobile information and marketing" },
    {
      type: "p",
      text: [
        "By opting in to receive SMS messages from Beyond Bancard, you agree to receive only the following types of messages: promotional discounts, flash sales, advertisements, and customer care messages.",
      ],
    },
    { type: "p", text: ["Message frequency may vary. On average, 1-2 messages per month."] },
    { type: "p", text: ["Message and data rates may apply."] },
    {
      type: "p",
      text: [
        "For more information about how your personal information is collected, used, and protected, please review our privacy policy at: ",
        { text: "beyondbancard.com/privacy-policy", href: "/privacy-policy" },
      ],
    },
    { type: "p", text: ["You can opt out of SMS messages at any time by replying STOP. For help, reply HELP."] },
  ],
} satisfies LegalPageContent;

export const privacy = {
  meta: {
    title: "Privacy policy",
    description:
      "How Beyond Bancard collects, uses, discloses and stores information when you use its payment system services.",
  },
  breadcrumb: [{ label: "Legal" }, { label: "Privacy policy" }],
  title: "Privacy policy",
  lead: "Learn how we protect your privacy and handle your personal information.",
  intro:
    "At Beyond Bancard, we understand the importance of protecting your privacy and safeguarding your personal information. This Privacy Policy outlines how we collect, use, disclose, and store information when you use our payment system services as a business-to-business (B2B) user. By accessing or using our website and services, you consent to the terms outlined in this Privacy Policy.",
  blocks: [
    { type: "h2", id: "use", text: "Information use" },
    {
      type: "p",
      text: [
        "We use the collected information to provide, maintain, and improve our payment system services, including processing transactions and facilitating communication. Your personal information may be used for customer support, account management, and resolving any disputes or issues that may arise. We may use non-personal information for analytics, research, and marketing purposes to enhance our services and provide targeted content.",
      ],
    },

    { type: "h2", id: "disclosure", text: "Information disclosure" },
    {
      type: "p",
      text: [
        "We do not sell, rent, or lease your personal information to third parties unless required by law or with your explicit consent. We may disclose your information to trusted service providers who assist us in delivering our services, subject to strict confidentiality obligations. In the event of a merger, acquisition, or change of control, your information may be transferred to the new entity, ensuring the same level of data protection.",
      ],
    },

    { type: "h2", id: "security", text: "Data security" },
    {
      type: "p",
      text: [
        "We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or alteration. Our payment system follows Payment Card Industry Data Security Standards (PCI DSS) compliance to ensure the security of sensitive payment information.",
      ],
    },

    { type: "h2", id: "retention", text: "Data retention" },
    {
      type: "p",
      text: [
        "We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.",
      ],
    },

    { type: "h2", id: "rights", text: "Your rights" },
    {
      type: "p",
      text: [
        "You have the right to access, update, correct, or delete your personal information. You may also request restrictions on the processing of your data. If you have any questions or concerns regarding your privacy or data protection, please contact our designated privacy officer.",
      ],
    },

    { type: "h2", id: "sms", text: "Mobile information and marketing" },
    {
      type: "p",
      text: [
        "By providing your mobile number and opting in, you consent to receive recurring marketing and promotional text messages from Beyond Bancard. Message frequency may vary depending on account activity, promotions, and updates. Message and data rates may apply. Consent is not a condition of purchase. Mobile information will not be shared with third parties or affiliates for marketing or promotional purposes.",
      ],
    },

    { type: "h2", id: "sms-questions", text: "Privacy and SMS questions" },
    {
      type: "p",
      text: [
        "If you have questions about our privacy practices or SMS communications, please contact us using the contact information provided on beyondbancard.com.",
      ],
    },

    { type: "h2", id: "sms-data", text: "No sharing, sale, or transfer of SMS registration data" },
    {
      type: "p",
      text: [
        "Consumer SMS registration data, consent records, and related personal information will not be shared, sold, rented, leased, or transferred to any external organizations except where required by law or necessary to deliver SMS services. Access to this information is strictly controlled through appropriate security and confidentiality measures.",
      ],
    },

    { type: "h2", id: "sms-opt-out", text: "SMS opt-out" },
    {
      type: "p",
      text: [
        "Users may opt out of SMS messaging campaigns at any time by replying STOP to any message. For assistance, reply HELP. Standard message and data rates may apply.",
      ],
    },

    { type: "h2", id: "terms", text: "Terms & conditions" },
    {
      type: "p",
      text: [
        "By subscribing to SMS communications from Beyond Bancard, you agree to receive recurring automated marketing and informational text messages. Message frequency may vary. Consent is not required as a condition of purchase. For more information, please review our:",
      ],
    },
    {
      type: "ul",
      items: [
        ["Privacy Policy: ", { text: "beyondbancard.com/privacy-policy", href: "/privacy-policy" }],
        // The live list links /terms-and-conditions, which is not this site's address for the page.
        ["Terms & Conditions: ", { text: "beyondbancard.com/terms-conditions", href: "/terms-conditions" }],
      ],
    },
  ],
} satisfies LegalPageContent;

/**
 * The live statement describes the accessibility overlay on the current site (Alt+1 profiles,
 * a background AI remediation service). The redesign meets WCAG 2.2 AA in the build itself and
 * runs no overlay, so those sections are flagged as a group: they show in demo mode with the
 * client question and drop in production, leaving the commitment, the browser support and the
 * feedback address, which hold either way.
 */
const OVERLAY_NOTE =
  "Accessibility: the statement describes the accessibility overlay on the current site (the Alt+1 profiles and the background AI remediation). The redesign meets WCAG 2.2 AA in the build itself, with no overlay. Keep the overlay, or rewrite the statement?";

export const accessibility = {
  meta: {
    title: "Accessibility",
    description: "How Beyond Bancard works to keep its website usable by the widest possible audience.",
  },
  breadcrumb: [{ label: "Legal" }, { label: "Accessibility" }],
  title: "Accessibility statement",
  lead: "We firmly believe that the internet should be available and accessible to anyone and are committed to providing a website that is accessible to the broadest possible audience, regardless of ability.",
  intro: "To fulfill this, we aim to adhere as strictly as possible to the World Wide Web Consortium’s (W3C) Web Content Accessibility Guidelines 2.1 (WCAG 2.1) at the AA level. These guidelines explain how to make web content accessible to people with a wide array of disabilities. Complying with those guidelines helps us ensure that the website is accessible to blind people, people with motor impairments, visual impairment, cognitive disabilities, and more.",
  blocks: [
    { type: "h2", id: "compliance", text: "Compliance status" },
    {
      type: "p",
      text: [
        "This website utilizes various technologies that are meant to make it as accessible as possible at all times. We utilize an accessibility interface that allows persons with specific disabilities to adjust the website’s UI (user interface) and design it to their personal needs.",
      ],
      confirm: true,
      note: OVERLAY_NOTE,
    },
    {
      type: "p",
      text: [
        "Additionally, the website utilizes an AI-based application that runs in the background and optimizes its accessibility level constantly. This application remediates the website’s HTML, adapts its functionality and behavior for screen-readers used by blind users, and for keyboard functions used by individuals with motor impairments.",
      ],
      confirm: true,
      note: OVERLAY_NOTE,
    },

    { type: "h2", id: "screen-reader", text: "Screen-reader and keyboard navigation" },
    {
      type: "p",
      text: [
        "Our website implements the ARIA attributes (Accessible Rich Internet Applications) technique, alongside various behavioral changes, to ensure blind users visiting with screen-readers can read, comprehend, and enjoy the website’s functions. As soon as a user with a screen-reader enters your site, they immediately receive a prompt to enter the Screen-Reader Profile so they can browse and operate your site effectively. Here’s how our website covers some of the most important screen-reader requirements:",
      ],
      confirm: true,
      note: OVERLAY_NOTE,
    },
    {
      type: "ul",
      items: [
        ["Screen-reader optimization: we run a process that learns the website’s components from top to bottom, to ensure ongoing compliance even when updating the website. In this process, we provide screen-readers with meaningful data using the ARIA set of attributes. For example, we provide accurate form labels; descriptions for actionable icons (social media icons, search icons, cart icons, etc.); validation guidance for form inputs; element roles such as buttons, menus, modal dialogues (popups), and others.Additionally, the background process scans all of the website’s images. It provides an accurate and meaningful image-object-recognition-based description as an ALT (alternate text) tag for images that are not described. It will also extract texts embedded within the image using an OCR (optical character recognition) technology. To turn on screen-reader adjustments at any time, users need only to press the Alt+1 keyboard combination. Screen-reader users also get automatic announcements to turn the Screen-reader mode on as soon as they enter the website.These adjustments are compatible with popular screen readers such as JAWS, NVDA, VoiceOver, and TalkBack."],
        ["Keyboard navigation optimization: The background process also adjusts the website’s HTML and adds various behaviors using JavaScript code to make the website operable by the keyboard. This includes the ability to navigate the website using the Tab and Shift+Tab keys, operate dropdowns with the arrow keys, close them with Esc, trigger buttons and links using the Enter key, navigate between radio and checkbox elements using the arrow keys, and fill them in with the Spacebar or Enter key.Additionally, keyboard users will find content-skip menus available at any time by clicking Alt+2, or as the first element of the site while navigating with the keyboard. The background process also handles triggered popups by moving the keyboard focus towards them as soon as they appear, not allowing the focus to drift outside.Users can also use shortcuts such as “M” (menus), “H” (headings), “F” (forms), “B” (buttons), and “G” (graphics) to jump to specific elements."],
      ],
      confirm: true,
      note: OVERLAY_NOTE,
    },

    { type: "h2", id: "profiles", text: "Disability profiles supported on our website" },
    {
      type: "ul",
      items: [
        ["Epilepsy Safe Profile: this profile enables people with epilepsy to safely use the website by eliminating the risk of seizures resulting from flashing or blinking animations and risky color combinations."],
        ["Vision Impaired Profile: this profile adjusts the website so that it is accessible to the majority of visual impairments such as Degrading Eyesight, Tunnel Vision, Cataract, Glaucoma, and others."],
        ["Cognitive Disability Profile: this profile provides various assistive features to help users with cognitive disabilities such as Autism, Dyslexia, CVA, and others, to focus on the essential elements more easily."],
        ["ADHD Friendly Profile: this profile significantly reduces distractions and noise to help people with ADHD, and Neurodevelopmental disorders browse, read, and focus on the essential elements more easily."],
        ["Blind Users Profile (Screen-readers): this profile adjusts the website to be compatible with screen-readers such as JAWS, NVDA, VoiceOver, and TalkBack. A screen-reader is installed on the blind user’s computer, and this site is compatible with it."],
        ["Keyboard Navigation Profile (Motor-Impaired): this profile enables motor-impaired persons to operate the website using the keyboard Tab, Shift+Tab, and the Enter keys. Users can also use shortcuts such as “M” (menus), “H” (headings), “F” (forms), “B” (buttons), and “G” (graphics) to jump to specific elements."],
      ],
      confirm: true,
      note: OVERLAY_NOTE,
    },

    { type: "h2", id: "adjustments", text: "Additional UI, design, and readability adjustments" },
    {
      type: "ul",
      items: [
        ["Font adjustments – users can increase and decrease its size, change its family (type), adjust the spacing, alignment, line height, and more."],
        ["Color adjustments – users can select various color contrast profiles such as light, dark, inverted, and monochrome. Additionally, users can swap color schemes of titles, texts, and backgrounds with over seven different coloring options."],
        ["Animations – epileptic users can stop all running animations with the click of a button. Animations controlled by the interface include videos, GIFs, and CSS flashing transitions."],
        ["Content highlighting – users can choose to emphasize essential elements such as links and titles. They can also choose to highlight focused or hovered elements only."],
        ["Audio muting – users with hearing devices may experience headaches or other issues due to automatic audio playing. This option lets users mute the entire website instantly."],
        ["Cognitive disorders – we utilize a search engine linked to Wikipedia and Wiktionary, allowing people with cognitive disorders to decipher meanings of phrases, initials, slang, and others."],
        ["Additional functions – we allow users to change cursor color and size, use a printing mode, enable a virtual keyboard, and many other functions."],
      ],
      confirm: true,
      note: OVERLAY_NOTE,
    },

    { type: "h2", id: "compatibility", text: "Assistive technology and browser compatibility" },
    {
      type: "p",
      text: [
        "We aim to support as many browsers and assistive technologies as possible, so our users can choose the best fitting tools for them, with as few limitations as possible. Therefore, we have worked very hard to be able to support all major systems that comprise over 95% of the user market share, including Google Chrome, Mozilla Firefox, Apple Safari, Opera and Microsoft Edge, JAWS, and NVDA (screen readers), both for Windows and MAC users.",
      ],
    },

    { type: "h2", id: "feedback", text: "Notes, comments, and feedback" },
    {
      type: "p",
      text: [
        "Despite our very best efforts to allow anybody to adjust the website to their needs, there may still be pages or sections that are not fully accessible, are in the process of becoming accessible, or are lacking an adequate technological solution to make them accessible. Still, we are continually improving our accessibility, adding, updating, improving its options and features, and developing and adopting new technologies. All this is meant to reach the optimal level of accessibility following technological advancements. If you wish to contact the website’s owner, please use the following email ",
        { text: "support@beyondbancard.com", href: "mailto:support@beyondbancard.com" },
        ".",
      ],
    },
  ],
} satisfies LegalPageContent;
