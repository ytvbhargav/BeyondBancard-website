import type { SolutionPageContent } from "@/types/content";
import { solutionBreadcrumb, solutionLink } from "@/content/solutions/links";
import { keepTogether } from "@/lib/typography";

/**
 * Online payments (D-058). Copy is the live beyondbancard.com/accept/online-payments/
 * page (captured 21 Sept 2026), in live section order.
 *
 * Edits:
 * - Headings, feature titles, chips, flow stages and hero mock labels in sentence case
 *   ("Ecommerce checkout", "Authentication / risk", "Funding & reporting", "Card-not-present",
 *   "Complex / high-risk ecommerce", "Beyond checkout", …); section h2s end with a full stop;
 *   straight apostrophes. "Beyond" → "Beyond Bancard" at the first mention in the page copy
 *   (the transaction lifecycle lead; the hero lead doesn't name Beyond).
 * - Hero h1 is the live hero h2. Hero actions are the standard expert button and "Apply now";
 *   the live "Start Accepting Online" (in-page jump) and "Talk to a Payments Expert" buttons are
 *   not used ("payments expert" names no specialist, so the default "Talk to an expert" label stays).
 * - Section labels above the headings ("Online Payments", "Ways to accept online", "The transaction
 *   lifecycle", "Built around digital commerce", "Where this fits", "Related solutions", "The bigger
 *   picture", "FAQ") are not repeated as eyebrows (D-003).
 * - Hero mock card → HeroFile "Beyond checkout" (Example: it shows a figure): $128.00 as the
 *   amount, the four live methods as chips, the three live stages as steps and "Live" as the
 *   status. The amount has no live label, so the figure is shown alone (no label drafted, C6).
 *   The live stages all carry the same dot marker (no done/active state), so all three are
 *   shown as done.
 * - Ways to accept → features (ruled); the lifecycle chain → flow ("Authorization" is the live
 *   dark node); "The infrastructure behind the checkout." → features (split); "Where online
 *   acceptance fits." → chips.
 * - Related solutions: the template's title "Related solutions" and menu labels in live order;
 *   "Reporting & Analytics" → Reporting.
 * - The bigger picture: Accept's heading and this page's paragraph, as live; the lifecycle row
 *   (Accept, Protect, Grow, Operate) becomes the template's links to the other three pillars.
 * - FAQ answer 2: the placeholder text is dropped and the answer flagged (C2).
 * - Hyphenated compounds in feature bodies ("browser-based", "card-not-present", "one-time")
 *   carry word joiners (keepTogether) so they don't break at the hyphen; the visible text is
 *   unchanged. FAQ text is left plain, as on the industry pages.
 *
 * Dropped:
 * - The "why" section photo (C5).
 * - The sample testimonial ("Sample placeholder — pending verified customer quotes", the quote and
 *   "Bob C. — Manager, eCommerce Merchant") (C2, §5).
 * - Related section heading "More capabilities that connect to online payments." (the template's
 *   "Related solutions" is used).
 * - The FAQ footer "Still have questions? We're happy to help." and its "Ready To Get Started?"
 *   button (the template's FAQ line and closing band cover both).
 *
 * Live-site issues:
 * - A sample testimonial is published, headed "Sample placeholder — pending verified customer quotes".
 * - FAQ answer 2 shows its placeholder: "[Placeholder — confirm current supported platform list.]".
 */
export const onlinePayments = {
  meta: { title: "Online payments" },
  pillar: "Accept",
  kind: "detail",
  breadcrumb: solutionBreadcrumb("Accept", "Online payments"),
  hero: {
    title: "Turn every digital interaction into a checkout.",
    lead: "Accept secure payments through your website, ecommerce experience, payment links, recurring billing, or virtual terminal — with gateway connectivity and risk capabilities behind every transaction.",
    visual: {
      title: "Beyond checkout",
      tag: "Example",
      status: { label: "Live", tone: "neutral" },
      amount: { value: "$128.00" },
      methods: ["Visa", "Mastercard", "ACH", "Wallet"],
      // The live stages share one marker (no done/active state): shown as a completed checkout.
      steps: [
        { label: "Checkout", state: "done" },
        { label: "Authorized", state: "done" },
        { label: "Settled", state: "done" },
      ],
    },
  },
  blocks: [
    {
      kind: "features",
      layout: "ruled",
      title: "More ways to turn intent into payment.",
      items: [
        {
          title: "Ecommerce checkout",
          body: "Accept payments directly through your website or online storefront.",
          icon: "laptop",
        },
        {
          title: "Payment links",
          body: "Create a direct path to payment from email, text, invoices, or other customer interactions.",
          icon: "link",
        },
        {
          title: "Recurring payments",
          body: "Support subscriptions and repeat transactions without rebuilding the customer experience each time.",
          icon: "repeat",
        },
        {
          title: "Virtual terminal",
          body: `Accept remote payments through a secure ${keepTogether("browser-based")} payment interface.`,
          icon: "monitor",
        },
        {
          title: "Gateway connectivity",
          body: "Connect payment acceptance into the ecommerce and business systems you already use.",
          icon: "plug",
        },
        {
          title: "Fraud & authentication",
          body: `Add risk and authentication capabilities appropriate to ${keepTogether("card-not-present")} commerce.`,
          icon: "lock",
        },
      ],
    },
    {
      kind: "flow",
      title: "Online payments don't end at authorization.",
      lead: "Beyond Bancard helps connect the stages around the transaction so businesses have more visibility and support from checkout through funding.",
      nodes: [
        { label: "Checkout" },
        { label: "Authentication / risk" },
        { label: "Authorization" },
        { label: "Settlement" },
        { label: "Funding & reporting" },
      ],
      focus: 2,
    },
    {
      kind: "features",
      layout: "split",
      title: "The infrastructure behind the checkout.",
      lead: "Beyond pairs online acceptance with the gateway flexibility, recurring billing support, and risk capabilities digital commerce actually needs.",
      items: [
        {
          title: "Flexible gateway options",
          body: "Connect through the gateway and shopping cart setup that fits your platform.",
          icon: "sliders",
        },
        {
          title: "Recurring commerce support",
          body: `Built for subscriptions and repeat billing, not just ${keepTogether("one-time")} checkout.`,
          icon: "calendar",
        },
        {
          title: "Risk & chargeback capabilities",
          body: `Authentication and dispute tools built for ${keepTogether("card-not-present")} commerce.`,
          icon: "shield",
        },
        {
          title: "Reporting & visibility",
          body: "See what happens after authorization, not just at the moment of sale.",
          icon: "chart",
        },
      ],
    },
    {
      kind: "chips",
      title: "Where online acceptance fits.",
      chips: [
        "Ecommerce",
        "Subscriptions",
        "Digital services",
        "Professional services",
        "Card-not-present",
        "Complex / high-risk ecommerce",
        "B2B remote payments",
      ],
    },
  ],
  related: {
    title: "Related solutions",
    // Live: 3D Secure, Network Tokenization, Recurring Billing, Payment Gateways,
    // Reporting & Analytics (→ Reporting).
    links: [
      solutionLink("3D Secure"),
      solutionLink("Network tokenization"),
      solutionLink("Recurring billing"),
      solutionLink("Payment gateways"),
      solutionLink("Reporting"),
    ],
  },
  bigPicture: {
    title: "Accept is where the transaction starts.",
    lead: "Beyond's broader payments ecosystem helps protect, fund, and operate what happens next.",
  },
  faq: {
    title: "Online payments questions.",
    items: [
      {
        q: "How can I accept payments on my website?",
        a: "Through an ecommerce checkout integration, hosted payment page, or connected gateway, depending on your platform.",
      },
      {
        q: "Does Beyond work with ecommerce platforms?",
        a: "Beyond supports connections to common ecommerce and shopping cart platforms.",
        confirm: true,
        note: "Online payments: current supported platform list (live answer marked as a placeholder)",
      },
      {
        q: "Can Beyond support recurring billing?",
        a: "Yes — recurring and subscription billing is a core online payments capability.",
      },
      {
        q: "What is a payment gateway?",
        a: "A payment gateway securely transmits transaction data between your checkout and the payment processing network.",
      },
      {
        q: "Can I accept payments without a website?",
        a: "Yes — payment links and virtual terminal options can allow acceptance without a full ecommerce build.",
      },
      {
        q: "What is a virtual terminal?",
        a: "A secure, browser-based interface for manually keying in and processing remote payments.",
      },
      {
        q: "How does Beyond help manage online fraud?",
        a: "Through authentication, risk tools, and monitoring appropriate to card-not-present transactions.",
      },
      {
        q: "Can high-risk merchants accept payments online?",
        a: "Yes — many qualifying high-risk business models can accept payments online through a structured underwriting process.",
      },
    ],
  },
} satisfies SolutionPageContent;
