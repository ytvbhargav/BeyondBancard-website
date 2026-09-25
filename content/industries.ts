import type { Industry, IndustryGroup, Step } from "@/types/content";

/**
 * The live site's own line for each group (beyondbancard.com/industries/),
 * kept with the group labels (D-069). Nothing renders these yet: the grouped
 * "more industries" listing they belong to was taken off the hub page, so they
 * are here for whoever puts that section back.
 */
export const groupDescriptions: Record<Exclude<IndustryGroup, "featured">, string> = {
  specialized: "Regulated products and category-aware underwriting.",
  retail: "Everyday commerce — checkout, POS, and reporting built for how these businesses run.",
  professional: "Invoicing, ACH, and mobile acceptance built around project- and service-based billing.",
  healthcare: "Patient- and client-friendly payment collection alongside recurring care.",
  digital: "Recurring revenue, platform, and partner-adjacent business models.",
};

export const groupLabels: Record<Exclude<IndustryGroup, "featured">, string> = {
  specialized: "Specialized & regulated",
  retail: "Retail & hospitality",
  professional: "Professional & field services",
  healthcare: "Healthcare & wellness",
  digital: "Digital businesses",
};

export const industries: Industry[] = [
  // Featured complex industries
  {
    slug: "adult",
    name: "Adult",
    group: "featured",
    teaser: "Payments infrastructure built for the realities of adult commerce.",
    description:
      "Solutions for adult ecommerce, content, entertainment, dating, subscriptions, and other qualifying business models — backed by industry-aware underwriting, risk tools, and ongoing support.",
    inDemo: true,
  },
  {
    slug: "gaming",
    name: "Gaming",
    group: "featured",
    teaser: "Built for high-velocity, digital-first payment environments.",
    description:
      "Flexible payment infrastructure for qualifying gaming businesses managing online transactions, fraud exposure, transaction velocity, and complex acceptance requirements.",
    inDemo: true,
  },
  {
    slug: "nutra-supplements",
    name: "Nutra & Supplements",
    group: "featured",
    teaser: "Payments engineered for fast-growing commerce.",
    description:
      "Processing for qualifying nutraceutical, supplement, wellness, ecommerce, and subscription businesses with an underwriting approach that understands the products and business model.",
    inDemo: true,
  },
  {
    slug: "ruo-peptides",
    name: "RUO Peptides",
    group: "featured",
    teaser: "Processing that understands Research Use Only.",
    description:
      "Payment solutions for qualifying RUO peptide businesses, structured around the product set, ecommerce experience, transaction profile, and realities of the category.",
    inDemo: true,
  },
  {
    slug: "travel-payment-solutions",
    name: "Travel",
    group: "featured",
    teaser: "Payments built for what happens before takeoff.",
    description:
      "Infrastructure for travel businesses managing higher tickets, card-not-present transactions, advance purchases, future delivery, and complex transaction flows.",
    inDemo: true,
  },
  {
    slug: "crb",
    name: "Cannabis-Related Businesses",
    group: "featured",
    teaser: "Navigate complex payments with confidence.",
    description:
      "Payment solutions for qualifying cannabis-related and ancillary businesses supported by industry-aware underwriting, flexible payment options, risk capabilities, and hands-on guidance.",
    inDemo: true,
  },

  // Specialized & regulated
  {
    slug: "cbd-hemp",
    name: "CBD & hemp",
    group: "specialized",
    teaser: "Underwriting built around product and content review.",
  },
  {
    slug: "vape-ecig",
    name: "Vape & e-cig",
    group: "specialized",
    teaser: "Payment infrastructure for regulated vape commerce.",
  },
  {
    slug: "tobacco-cigar",
    name: "Tobacco & cigar",
    group: "specialized",
    teaser: "Payments built for regulated tobacco retail.",
  },
  {
    slug: "nicotine-pouches",
    name: "Nicotine pouches",
    group: "specialized",
    teaser: "Processing built around modern nicotine commerce.",
  },
  {
    slug: "hookah-shisha",
    name: "Hookah & shisha",
    group: "specialized",
    teaser: "Flexible payments for lounges and specialty retail.",
  },
  { slug: "kratom", name: "Kratom", group: "specialized", teaser: "Processing built around complex kratom commerce." },
  {
    slug: "functional-mushroom",
    name: "Functional mushrooms",
    group: "specialized",
    teaser: "Infrastructure for emerging wellness commerce.",
  },
  {
    slug: "online-pharmacy",
    name: "Online pharmacy",
    group: "specialized",
    teaser: "Payments built for complex, verified pharmacy commerce.",
  },
  {
    slug: "gun-shop",
    name: "Gun shops",
    group: "specialized",
    teaser: "Reliable payments for regulated firearm retailers.",
  },
  { slug: "bail-bond", name: "Bail bonds", group: "specialized", teaser: "Payments that work around the clock." },
  {
    slug: "pawn-shop",
    name: "Pawn shops",
    group: "specialized",
    teaser: "Payment technology for high-value, fast-moving retail.",
  },

  // Retail & hospitality
  {
    slug: "ecommerce",
    name: "eCommerce",
    group: "retail",
    teaser: "Turn every digital checkout into a better experience.",
  },
  { slug: "retail", name: "Retail", group: "retail", teaser: "Make every checkout work harder." },
  {
    slug: "restaurant-hospitality",
    name: "Restaurants & hospitality",
    group: "retail",
    teaser: "Keep service moving from order to payment.",
  },
  { slug: "hotel", name: "Hotels", group: "retail", teaser: "Payments built around the guest journey." },
  { slug: "auto-repair", name: "Auto repair", group: "retail", teaser: "Make payment as smooth as the service." },
  {
    slug: "car-dealership",
    name: "Car dealerships",
    group: "retail",
    teaser: "Payments built for higher-value automotive commerce.",
  },
  { slug: "jewelry", name: "Jewelry", group: "retail", teaser: "Protect the experience behind every high-value sale." },
  { slug: "furniture", name: "Furniture", group: "retail", teaser: "Flexible payments for higher-ticket retail." },

  // Professional & field services
  {
    slug: "construction-contracting",
    name: "Construction & contracting",
    group: "professional",
    teaser: "Get paid from job site to back office.",
  },
  { slug: "plumbing", name: "Plumbing", group: "professional", teaser: "Get paid where the work happens." },
  {
    slug: "moving-company",
    name: "Movers",
    group: "professional",
    teaser: "Payment infrastructure for businesses that are always moving.",
  },
  {
    slug: "real-estate",
    name: "Real estate",
    group: "professional",
    teaser: "Flexible payment tools for real estate businesses.",
  },
  {
    slug: "leasing",
    name: "Leasing",
    group: "professional",
    teaser: "Payments built for recurring leasing relationships.",
  },
  {
    slug: "insurance",
    name: "Insurance",
    group: "professional",
    teaser: "Make premium and service payments easier to collect.",
  },

  // Healthcare & wellness
  {
    slug: "medical-healthcare",
    name: "Medical & healthcare",
    group: "healthcare",
    teaser: "Easier payment collection for patients and staff.",
  },
  {
    slug: "mental-health-wellness",
    name: "Mental health & wellness",
    group: "healthcare",
    teaser: "Simplify payment collection around ongoing care.",
  },
  {
    slug: "telehealth-virtual-care",
    name: "Telehealth & virtual care",
    group: "healthcare",
    teaser: "Payments built for care delivered online.",
  },
  {
    slug: "medical-spa",
    name: "Medical spas",
    group: "healthcare",
    teaser: "Better payments for modern wellness businesses.",
  },

  // Digital businesses
  { slug: "saas", name: "SaaS", group: "digital", teaser: "Payments built for recurring software revenue." },
  {
    slug: "web-developer-agency",
    name: "Web developers & agencies",
    group: "digital",
    teaser: "Give your clients a better path to payments.",
  },
  {
    slug: "jet-charter",
    name: "Jet & charter",
    group: "digital",
    teaser: "Infrastructure for high-value charter transactions.",
  },
];

export const industryPath = (slug: string) => `/industries/${slug}`;

export const featuredIndustries = industries.filter((i) => i.group === "featured");

/**
 * Only the featured industries have pages of their own. Everything else in the
 * list above is a business type we name, not a page we can link to, so nothing
 * may link to it: a link there lands on the redesign placeholder.
 */
export const hasIndustryPage = (slug: string) => featuredIndustries.some((i) => i.slug === slug);

/**
 * The named tail of the list: the everyday and specialised categories that are
 * not in the featured six. One list, read by the homepage's industries section
 * and by the Industries menu, so the two can never drift apart. Slugs, so a
 * renamed industry follows and a mistyped one drops out rather than printing
 * something wrong.
 */
const moreIndustrySlugs = [
  "ecommerce",
  "retail",
  "restaurant-hospitality",
  "medical-healthcare",
  "saas",
  "construction-contracting",
  "real-estate",
  "auto-repair",
  "cbd-hemp",
  "vape-ecig",
  "insurance",
  "telehealth-virtual-care",
];

export const moreIndustries = moreIndustrySlugs
  .map((slug) => industries.find((i) => i.slug === slug))
  .filter((i) => i !== undefined);

export const industriesBySlug = (slugs: string[]) =>
  slugs.map((s) => industries.find((i) => i.slug === s)).filter((i): i is Industry => Boolean(i));

/* ------------------------------ Industries hub ----------------------------- */

export const industriesHub = {
  /*
   * The live beyondbancard.com/industries/ copy, restored (D-069). The
   * redesign had paraphrased the hero and written its own four-step block;
   * the client asked for the original messaging. "Beyond" reads "Beyond
   * Bancard" at the first mention, and headings take sentence case and a full
   * stop, as elsewhere on the site.
   */
  hero: {
    title: "Payments built around the way you do business.",
    lead: "Every industry has its own payment realities. Beyond Bancard combines flexible infrastructure, experienced underwriting, risk capabilities, and hands-on support to build payment solutions around your business — not force your business into a generic model.",
  },
  featured: {
    title: "Complex commerce is where experience matters most.",
    lead: "Some businesses require more than a rate and a terminal. They require an understanding of the products being sold, how transactions happen, where risk exists, and how the payment environment should be structured for long-term stability.",
  },
  approach: {
    title: "Complexity requires more than approval.",
    lead: "Getting a merchant account is only the beginning. Beyond helps structure the payment environment around your business — from underwriting and acceptance through risk, reporting, funding, and ongoing account health.",
    steps: [
      {
        title: "Understand — we know the category.",
        body: "We start with the business model, products, transaction flow, customer experience, and processing profile — not simply an industry label.",
      },
      {
        title: "Structure — we know how to structure it.",
        body: "Align processing, payment methods, gateway technology, risk controls, and transaction flows around the business.",
      },
      {
        title: "Launch — we know how to get it live.",
        body: "Support the journey from application and underwriting through integration, activation, and first transaction.",
      },
      {
        title: "Optimize — we know how to keep it healthy.",
        body: "Stay involved with reporting, chargebacks, risk, account health, payment operations, and opportunities to optimize over time.",
      },
    ] satisfies Step[],
  },
  /** For the grouped listing, which the hub page does not currently show. */
  all: {
    title: "More industries. Same payments expertise.",
    lead: "Beyond supports businesses across specialized and regulated categories, everyday retail and hospitality, professional and field services, healthcare, and digital business models.",
  },
  notListed: {
    title: "Don't see your industry?",
    body: "We review many business models individually.",
  },
};

