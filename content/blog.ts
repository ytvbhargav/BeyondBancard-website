import type { Faq, NavLink } from "@/types/content";

/* ---------------------------------- Types ---------------------------------- */

/**
 * Categories used by posts on page 1 of the live blog, as the live listing's
 * filter data and each post's markup assign them (D-054).
 */
export type BlogCategory =
  "Merchant service payment" | "Peptide payment" | "POS systems" | "Credit card fees" | "Contactless payments";

export type BlogPost = {
  slug: string;
  /** Sentence case; acronyms kept. */
  title: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  categories: BlogCategory[];
  /** The live listing excerpt, cut where the live listing cuts it. Render it with excerptText(). */
  excerpt: string;
};

/**
 * A run of article text, optionally linked. Internal hrefs are site paths and
 * resolve through href(); external ones are full URLs or tel: links.
 */
export type ArticleText = string | { text: string; href: string };

type Flag = { confirm?: boolean; note?: string };

/** Article body as structured blocks (maps to a rich-text CMS field later). */
export type ArticleBlock = Flag &
  (
    | { type: "p"; text: ArticleText[] }
    | { type: "h2" | "h3"; id: string; text: string }
    | { type: "ul" | "ol"; items: ArticleText[][] }
  );

/* ---------------------------------- Posts ---------------------------------- */

/** Page 1 of the live blog, newest first (captured 17 Sept 2026). */
export const blogPosts: BlogPost[] = [
  {
    slug: "when-to-question-your-processor-or-seek-a-review",
    title: "When to question your processor or seek a review",
    date: "2026-06-05",
    categories: ["Merchant service payment"],
    excerpt:
      "Payment processing plays a major role in daily business operations, yet many companies continue using the same provider for years without reviewing",
  },
  {
    slug: "how-to-get-a-credit-card-terminal-for-my-business",
    title: "How to get a credit card terminal for my business",
    date: "2026-06-03",
    categories: ["Credit card fees"],
    excerpt:
      "Businesses today need reliable ways to accept payments quickly and securely, whether operating in retail, hospitality, service industries, or mobile sales environments.",
  },
  {
    slug: "are-your-pos-systems-ready-for-mobile-wallets",
    title: "Are your POS systems ready for mobile wallets?",
    date: "2026-06-01",
    categories: ["POS systems"],
    excerpt:
      "Customer payment preferences continue changing as digital wallets become more common in retail stores, restaurants, service businesses, and mobile checkout environments. Businesses",
  },
  {
    slug: "ways-to-prevent-chargebacks-and-protect-your-business",
    title: "Ways to prevent chargebacks and protect your business",
    date: "2026-04-13",
    categories: ["Merchant service payment", "Peptide payment"],
    excerpt:
      "If you’re a business owner, you know what a headache a chargeback can be, especially if you are a high-risk company like",
  },
  {
    slug: "merchant-account-setup-what-documents-are-needed",
    title: "Merchant account setup: what documents are needed?",
    date: "2026-04-11",
    categories: ["Peptide payment"],
    excerpt:
      "If you’ve been denied an account by a merchant processing service provider, you may be wondering why and what to do about",
  },
  {
    slug: "how-to-build-a-peptide-website-in-2026",
    title: "How to build a peptide website in 2026",
    date: "2026-04-08",
    categories: ["Merchant service payment", "Peptide payment"],
    excerpt:
      "If you are a peptide business owner in 2026, you know how challenging it can be as regulatory commissions tighten their grip",
  },
  {
    slug: "tap-to-pay-vs-chip-vs-swipe-which-in-store-method-is-best-and-safest",
    title: "Tap-to-pay vs chip vs swipe: which in-store method is best (and safest)?",
    date: "2026-04-05",
    categories: ["Credit card fees"],
    excerpt:
      "In-store payment methods continue to evolve as businesses balance speed, security, and customer expectations at checkout. A credit card processing company supports",
  },
  {
    slug: "how-to-compare-pos-providers-fairly",
    title: "How to compare POS providers fairly",
    date: "2026-04-03",
    categories: ["POS systems"],
    excerpt:
      "Comparing providers requires more than reviewing surface-level pricing or feature lists. A POS system provider can offer similar tools on paper, but",
  },
  {
    slug: "how-businesses-can-reduce-chargebacks-fraud",
    title: "How businesses can reduce chargebacks + fraud",
    date: "2026-04-01",
    categories: ["Merchant service payment"],
    excerpt:
      "Chargebacks and fraud continue to impact businesses across industries, increasing operational costs and creating disruptions in payment processing. A merchant processing service",
  },
  {
    slug: "what-is-a-high-risk-merchant-account-and-how-does-it-work",
    title: "What is a high-risk merchant account and how does it work?",
    date: "2026-03-05",
    categories: ["Merchant service payment"],
    excerpt:
      "A high-risk merchant account is a specialized payment processing account designed for businesses that card networks or banks consider to have elevated",
  },
  {
    slug: "pos-systems-vs-payment-terminals-vs-mobile-payments-explained",
    title: "POS systems vs payment terminals vs mobile payments explained",
    date: "2026-03-03",
    categories: ["POS systems"],
    excerpt:
      "Businesses today have multiple options for accepting payments, but not all systems function the same way. A POS system provider delivers more",
  },
  {
    slug: "6-steps-to-secure-credit-card-payment-processing",
    title: "6 steps to secure credit card payment processing",
    date: "2026-03-01",
    categories: ["Contactless payments"],
    excerpt:
      "Secure credit card payment processing is critical for protecting customer data, maintaining regulatory compliance, and preserving business reputation. Payment security failures can",
  },
];

export const postPath = (slug: string) => `/news/${slug}`;

/**
 * The excerpt as the list shows it: an ellipsis where the live excerpt stops mid-sentence,
 * none where it stops at the end of a sentence ("…mobile sales environments.").
 */
export const excerptText = ({ excerpt }: BlogPost) => (/[.?!]$/.test(excerpt) ? excerpt : excerpt + "…");

const dateFormats = {
  short: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }),
  long: new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }),
};

/** "Jun 3, 2026" (short) or "June 3, 2026" (long). UTC, so server and client render the same text. */
export const formatPostDate = (iso: string, style: keyof typeof dateFormats = "short") =>
  dateFormats[style].format(new Date(`${iso}T00:00:00Z`));

/** Labels shared by the lead article, list rows and the article header. */
export const postLabels = {
  latest: "Latest",
  published: "Published",
  by: "By",
  category: "Category",
  categories: "Categories",
  readingTime: "Reading time",
  minutes: (n: number) => `${n} min read`,
  read: "Read article",
};

/* ------------------------------- Blog index -------------------------------- */

export const blogIndex = {
  breadcrumb: [{ label: "Resources" }, { label: "Blog" }],
  hero: {
    title: "Practical guides to payment processing.",
    lead: "Plain-language articles on chargebacks, POS systems, high-risk accounts and more, from the Beyond Bancard team.",
  },
  // The list and its filter cover this page's posts after the lead, not the whole archive
  list: {
    title: "Recent articles.",
    filterLabel: "Filter by category",
    all: "All",
    status: (count: number, total: number, category?: string) =>
      category
        ? `Showing ${count} of ${total} recent articles in ${category}`
        : `Showing ${total} recent ${total === 1 ? "article" : "articles"}`,
    showAll: "Show all recent articles",
  },
};

/* --------------------------------- Article --------------------------------- */

/**
 * Copied verbatim from the live article (17 Sept 2026) by a script, not retyped.
 * Changes: headings in sentence case; "•" lines became list items; the FAQ block
 * moved to `articleFaqs` (rendered by FaqSection); whitespace collapsed as the browser
 * shows it; post links point at /news/<slug> (the live permalinks sit at the
 * site root). The featured image is dropped (no stock photos).
 */
const articleBlocks: ArticleBlock[] = [
  {
    type: "p",
    text: [
      "A high-risk merchant account is a specialized payment processing account designed for businesses that card networks or banks consider to have elevated financial, regulatory, or chargeback risk. These accounts allow companies to accept credit and debit card payments despite operating in industries or sales models that traditional underwriting departments may decline. A ",
      {
        text: "merchant processing service provider",
        href: "/news/what-is-a-high-risk-merchant-account-and-how-does-it-work",
      },
      " evaluates factors such as industry type, transaction volume, refund rates, and historical chargeback activity before approving a high-risk profile. Approval criteria are typically more detailed than standard merchant underwriting, and risk mitigation measures are built into the agreement.",
    ],
  },
  {
    type: "p",
    text: [
      "Online merchant service providers",
      " often structure high-risk accounts with additional monitoring tools and reserve requirements to manage exposure. While processing terms may differ from standard accounts, high-risk merchant accounts provide payment access that would otherwise be unavailable. Understanding how these accounts function helps businesses evaluate costs, compliance expectations, and long-term sustainability.",
    ],
  },
  { type: "h2", id: "what-is-a-high-risk-merchant-account", text: "What is a high-risk merchant account?" },
  {
    type: "p",
    text: [
      "A high-risk merchant account is issued to businesses that financial institutions consider more likely to experience chargebacks, regulatory scrutiny, or fluctuating revenue patterns. Risk classification does not necessarily reflect business quality. It typically relates to operational characteristics that increase potential disputes or refund activity.",
    ],
  },
  { type: "p", text: ["High-risk accounts may include:"] },
  {
    type: "ul",
    items: [
      ["Higher approval scrutiny during underwriting to evaluate financial stability and transaction history"],
      ["Rolling reserves or security deposits held temporarily to offset potential chargeback exposure"],
      ["Enhanced monitoring of refund ratios and customer dispute levels"],
      ["Specific compliance requirements tied to card network regulations"],
    ],
  },
  {
    type: "p",
    text: [
      "These structural safeguards allow processors to manage potential exposure while enabling businesses to continue accepting electronic payments.",
    ],
  },
  {
    type: "h2",
    id: "why-some-businesses-are-classified-as-high-risk",
    text: "Why some businesses are classified as high risk",
  },
  {
    type: "p",
    text: [
      "Risk classification is based on measurable financial and operational factors rather than subjective judgment. Processors analyze business models, customer acquisition strategies, and refund patterns to determine classification.",
    ],
  },
  { type: "p", text: ["Common risk indicators include:"] },
  {
    type: "ul",
    items: [
      ["Subscription or recurring billing models that increase cancellation disputes"],
      ["International sales activity with cross-border fraud exposure"],
      ["Elevated historical chargeback ratios exceeding card network thresholds"],
      ["Products or services subject to regulatory oversight or consumer complaint patterns"],
    ],
  },
  {
    type: "p",
    text: [
      "When risk factors are present, underwriting teams implement additional safeguards to protect acquiring banks and payment networks.",
    ],
  },
  {
    type: "h2",
    id: "industries-that-typically-need-high-risk-merchant-accounts",
    text: "Industries that typically need high-risk merchant accounts",
  },
  {
    type: "p",
    text: [
      "Certain industries are frequently categorized as high risk due to historical dispute levels or regulatory complexity. Classification varies by bank and payment processor.",
    ],
  },
  { type: "p", text: ["Industries often requiring specialized accounts include:"] },
  {
    type: "ul",
    items: [
      ["Subscription-based digital services with recurring billing"],
      ["Nutraceutical, supplement, or wellness product sellers"],
      ["Travel services with advance booking deposits"],
      ["Online coaching or educational programs with installment billing"],
    ],
  },
  {
    type: "p",
    text: [
      "Businesses operating in these sectors typically require a ",
      {
        text: "merchant processing service provider",
        href: "/news/what-is-a-high-risk-merchant-account-and-how-does-it-work",
      },
      " experienced in managing higher dispute thresholds and compliance standards.",
    ],
  },
  { type: "h2", id: "how-high-risk-merchant-accounts-work", text: "How high-risk merchant accounts work" },
  {
    type: "p",
    text: [
      "High-risk accounts function similarly to standard merchant accounts in terms of transaction flow. Customers submit card payments through a payment gateway, and transactions are routed through acquiring banks for authorization and settlement.",
    ],
  },
  { type: "p", text: ["Operational differences may include:"] },
  {
    type: "ul",
    items: [
      ["Rolling reserve percentages withheld for a defined period to offset potential disputes"],
      ["Slightly higher transaction processing rates reflecting increased underwriting exposure"],
      ["Ongoing compliance reviews to maintain account stability"],
      ["Chargeback monitoring tools that flag dispute trends early"],
    ],
  },
  {
    type: "p",
    text: [
      "Online ",
      { text: "merchant service providers", href: "/news/what-is-a-high-risk-merchant-account-and-how-does-it-work" },
      " implement monitoring systems to track risk indicators in real time. This structured oversight helps maintain processing continuity and reduce unexpected account interruptions.",
    ],
  },
  { type: "h2", id: "fees-chargebacks-and-risk-management", text: "Fees, chargebacks, and risk management" },
  {
    type: "p",
    text: [
      "High-risk ",
      { text: "merchant accounts", href: "/news/what-is-a-high-risk-merchant-account-and-how-does-it-work" },
      " often involve higher transaction fees compared to standard processing. This pricing structure reflects additional underwriting review, fraud monitoring, and dispute management infrastructure.",
    ],
  },
  { type: "p", text: ["Risk management strategies typically include:"] },
  {
    type: "ul",
    items: [
      ["Real-time fraud detection filters that screen suspicious transactions"],
      ["Automated alerts when chargeback ratios approach network thresholds"],
      ["Documentation protocols to support dispute representment"],
      ["Reserve account structures that stabilize cash flow during dispute cycles"],
    ],
  },
  {
    type: "p",
    text: [
      "Chargeback management is central to maintaining account stability. Businesses must monitor refund policies and customer communication practices to reduce dispute frequency.",
    ],
  },
  {
    type: "h2",
    id: "benefits-of-using-a-high-risk-payment-processor",
    text: "Benefits of using a high-risk payment processor",
  },
  {
    type: "p",
    text: [
      "Working with a processor experienced in high-risk underwriting offers operational stability and long-term continuity. Specialized providers understand regulatory complexity and chargeback mitigation strategies specific to higher-risk industries.",
    ],
  },
  { type: "p", text: ["Advantages may include:"] },
  {
    type: "ul",
    items: [
      ["Greater approval likelihood for businesses declined by standard processors"],
      ["Risk monitoring systems designed for subscription or online sales models"],
      ["Structured reserve management that protects account longevity"],
      ["Compliance guidance aligned with card network standards"],
    ],
  },
  {
    type: "p",
    text: [
      "A knowledgeable merchant processing service provider reduces the likelihood of sudden account termination by proactively managing risk exposure.",
    ],
  },
  {
    type: "h2",
    id: "how-to-apply-for-a-high-risk-merchant-account",
    text: "How to apply for a high-risk merchant account",
  },
  {
    type: "p",
    text: [
      "Application requirements are typically more detailed than standard merchant onboarding. Underwriting departments evaluate financial documentation and operational transparency carefully.",
    ],
  },
  { type: "p", text: ["Applicants may need to provide:"] },
  {
    type: "ul",
    items: [
      ["Business formation documents and ownership verification"],
      ["Processing history statements from prior providers"],
      ["Bank statements demonstrating revenue stability"],
      ["Detailed product or service descriptions and refund policies"],
    ],
  },
  {
    type: "p",
    text: [
      "Clear documentation supports underwriting review and improves approval probability. Transparency during application reduces delays and ensures risk factors are addressed upfront.",
    ],
  },
  { type: "h2", id: "summary", text: "Summary" },
  {
    type: "p",
    text: [
      "A high-risk merchant account enables businesses with elevated dispute potential or regulatory exposure to accept electronic payments securely. A ",
      { text: "merchant processing service", href: "/news/what-is-a-high-risk-merchant-account-and-how-does-it-work" },
      " provider evaluates operational risk factors and structures safeguards such as reserves and monitoring tools. Online ",
      "merchant service",
      " providers support ongoing compliance, fraud prevention, and chargeback management to maintain processing continuity. Understanding how these accounts function helps businesses assess costs, risk controls, and long-term payment stability.",
    ],
  },
  {
    type: "h2",
    id: "best-merchant-processing-service-provider",
    text: "Best merchant processing service provider",
    confirm: true,
    note: "Existing blog copy: claim to verify",
  },
  {
    type: "p",
    text: [
      "If you are looking for a solid credit card processing provider, be sure to check out ",
      { text: "Beyond Bancard", href: "/" },
      ". With expert support to ensure your transactions are speedy and safe, you’re in the best of hands with Beyond Bancard – a company you can trust to make your business run smoothly. Call today and see what we can do for you – ",
      { text: "(844) 365-3050", href: "tel:8443653050" },
      ".",
    ],
    confirm: true,
    note: "Existing blog copy: claim to verify",
  },
];

const articleFaqs: Faq[] = [
  {
    q: "Is being labeled high risk the same as being fraudulent?",
    a: "No. High-risk classification reflects elevated chargeback potential or regulatory exposure, not misconduct. Many legitimate businesses operate in high-risk industries due to billing models or market characteristics.",
  },
  {
    q: "Do high-risk merchant accounts have higher fees?",
    a: "Yes, processing rates are typically higher to reflect increased monitoring, reserve requirements, and underwriting exposure. Pricing varies depending on risk profile and transaction volume.",
  },
  {
    q: "Can a business transition from high risk to standard processing?",
    a: "In some cases, improved chargeback ratios and stable processing history may allow reevaluation. Risk classification depends on ongoing performance and underwriting standards.",
  },
  {
    q: "What happens if chargebacks exceed acceptable limits?",
    a: "Exceeding network thresholds may trigger monitoring programs or account review. Proactive dispute management and refund transparency reduce this risk.",
  },
  {
    q: "How long does approval take for a high-risk account?",
    a: "Approval timelines vary depending on documentation completeness and underwriting complexity. Providing accurate financial records and operational details speeds review.",
  },
];

/** The one article in the demo: /news/what-is-a-high-risk-merchant-account-and-how-does-it-work. */
export const highRiskArticle = {
  slug: "what-is-a-high-risk-merchant-account-and-how-does-it-work",
  author: "Beyond Bancard",
  /** The live post's meta description, verbatim. */
  description:
    "Learn what a high-risk merchant account is, how it works, and why some businesses need one for payment processing.",
  breadcrumb: [
    { label: "Resources" },
    { label: "Blog", href: "/news" },
    // Short form of the title that fits one line at 390px
    { label: "High-risk merchant accounts" },
  ],
  toc: { title: "On this page" },
  blocks: articleBlocks,
  faq: {
    // Site FAQ heading pattern (live: "Frequently Asked Questions"); the Q&As are verbatim
    title: "High-risk account questions.",
    items: articleFaqs,
  },
  /** UI copy placed after the first section, not article copy. */
  callout: {
    title: "Looking for a high-risk merchant account?",
    link: { label: "High-risk processing", href: "/accept/high-risk-processing" },
  },
  related: {
    title: "Related solutions",
    links: [
      { label: "High-risk processing", href: "/accept/high-risk-processing" },
      { label: "Chargeback protection", href: "/protect/chargeback-protection" },
      { label: "Fraud & risk tools", href: "/protect/fraud-risk-tools" },
      { label: "Online payments", href: "/accept/online-payments" },
    ] satisfies NavLink[],
  },
  more: { title: "More from the blog.", all: { label: "All articles", href: "/news" } },
};

/* --------------------------------- Helpers --------------------------------- */

export const plainText = (runs: ArticleText[]) => runs.map((r) => (typeof r === "string" ? r : r.text)).join("");

const blockText = (b: ArticleBlock) =>
  "items" in b ? b.items.map(plainText).join(" ") : typeof b.text === "string" ? b.text : plainText(b.text);

const WORDS_PER_MINUTE = 225;

/** Reading time from the body word count (blocks plus the FAQ), rounded up. */
export function readingMinutes(blocks: ArticleBlock[], faqs: Faq[]) {
  const text = [...blocks.map(blockText), ...faqs.map((f) => `${f.q} ${f.a}`)].join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
