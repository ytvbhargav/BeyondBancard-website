import type { Industry, IndustryGroup, Step } from "@/types/content";

export const groupLabels: Record<Exclude<IndustryGroup, "featured">, string> = {
  specialized: "Specialized & regulated",
  retail: "Retail & hospitality",
  professional: "Professional & field services",
  healthcare: "Healthcare & wellness",
  digital: "Digital businesses",
};

export const industries: Industry[] = [
  // Featured complex industries
  { slug: "adult", name: "Adult", group: "featured", teaser: "Payments infrastructure built for the realities of adult commerce." },
  { slug: "gaming", name: "Gaming", group: "featured", teaser: "Built for high-velocity, digital-first payment environments." },
  { slug: "nutra-supplements", name: "Nutra & supplements", group: "featured", teaser: "Payments engineered for fast-growing commerce.", inDemo: true },
  { slug: "ruo-peptides", name: "RUO peptides", group: "featured", teaser: "Processing that understands Research Use Only." },
  { slug: "travel-payment-solutions", name: "Travel", group: "featured", teaser: "Payments built for what happens before takeoff." },
  { slug: "crb", name: "Cannabis-related businesses", group: "featured", teaser: "Navigate complex payments with confidence." },

  // Specialized & regulated
  { slug: "cbd-hemp", name: "CBD & hemp", group: "specialized", teaser: "Underwriting built around product and content review." },
  { slug: "vape-ecig", name: "Vape & e-cig", group: "specialized", teaser: "Payment infrastructure for regulated vape commerce." },
  { slug: "tobacco-cigar", name: "Tobacco & cigar", group: "specialized", teaser: "Payments built for regulated tobacco retail." },
  { slug: "nicotine-pouches", name: "Nicotine pouches", group: "specialized", teaser: "Processing built around modern nicotine commerce." },
  { slug: "hookah-shisha", name: "Hookah & shisha", group: "specialized", teaser: "Flexible payments for lounges and specialty retail." },
  { slug: "kratom", name: "Kratom", group: "specialized", teaser: "Processing built around complex kratom commerce." },
  { slug: "functional-mushroom", name: "Functional mushrooms", group: "specialized", teaser: "Infrastructure for emerging wellness commerce." },
  { slug: "online-pharmacy", name: "Online pharmacy", group: "specialized", teaser: "Payments built for complex, verified pharmacy commerce." },
  { slug: "gun-shop", name: "Gun shops", group: "specialized", teaser: "Reliable payments for regulated firearm retailers." },
  { slug: "bail-bond", name: "Bail bonds", group: "specialized", teaser: "Payments that work around the clock." },
  { slug: "pawn-shop", name: "Pawn shops", group: "specialized", teaser: "Payment technology for high-value, fast-moving retail." },

  // Retail & hospitality
  { slug: "ecommerce", name: "eCommerce", group: "retail", teaser: "Turn every digital checkout into a better experience." },
  { slug: "retail", name: "Retail", group: "retail", teaser: "Make every checkout work harder." },
  { slug: "restaurant-hospitality", name: "Restaurants & hospitality", group: "retail", teaser: "Keep service moving from order to payment." },
  { slug: "hotel", name: "Hotels", group: "retail", teaser: "Payments built around the guest journey." },
  { slug: "auto-repair", name: "Auto repair", group: "retail", teaser: "Make payment as smooth as the service." },
  { slug: "car-dealership", name: "Car dealerships", group: "retail", teaser: "Payments built for higher-value automotive commerce." },
  { slug: "jewelry", name: "Jewelry", group: "retail", teaser: "Protect the experience behind every high-value sale." },
  { slug: "furniture", name: "Furniture", group: "retail", teaser: "Flexible payments for higher-ticket retail." },

  // Professional & field services
  { slug: "construction-contracting", name: "Construction & contracting", group: "professional", teaser: "Get paid from job site to back office." },
  { slug: "plumbing", name: "Plumbing", group: "professional", teaser: "Get paid where the work happens." },
  { slug: "moving-company", name: "Movers", group: "professional", teaser: "Payment infrastructure for businesses that are always moving." },
  { slug: "real-estate", name: "Real estate", group: "professional", teaser: "Flexible payment tools for real estate businesses." },
  { slug: "leasing", name: "Leasing", group: "professional", teaser: "Payments built for recurring leasing relationships." },
  { slug: "insurance", name: "Insurance", group: "professional", teaser: "Make premium and service payments easier to collect." },

  // Healthcare & wellness
  { slug: "medical-healthcare", name: "Medical & healthcare", group: "healthcare", teaser: "Easier payment collection for patients and staff." },
  { slug: "mental-health-wellness", name: "Mental health & wellness", group: "healthcare", teaser: "Simplify payment collection around ongoing care." },
  { slug: "telehealth-virtual-care", name: "Telehealth & virtual care", group: "healthcare", teaser: "Payments built for care delivered online." },
  { slug: "medical-spa", name: "Medical spas", group: "healthcare", teaser: "Better payments for modern wellness businesses." },

  // Digital businesses
  { slug: "saas", name: "SaaS", group: "digital", teaser: "Payments built for recurring software revenue." },
  { slug: "web-developer-agency", name: "Web developers & agencies", group: "digital", teaser: "Give your clients a better path to payments." },
  { slug: "jet-charter", name: "Jet & charter", group: "digital", teaser: "Infrastructure for high-value charter transactions." },
];

export const industryPath = (slug: string) => `/industries/${slug}`;

export const featuredIndustries = industries.filter((i) => i.group === "featured");

export const industriesBySlug = (slugs: string[]) =>
  slugs
    .map((s) => industries.find((i) => i.slug === s))
    .filter((i): i is Industry => Boolean(i));

/* ------------------------------ Industries hub ----------------------------- */

export const industriesHub = {
  hero: {
    title: "Payments built around the way you do business.",
    lead: "Every industry has its own payment realities. Beyond Bancard combines flexible infrastructure, experienced underwriting, risk tools and hands-on support to fit your business, not force it into a generic model.",
  },
  featured: {
    title: "Complex commerce is where experience matters most.",
  },
  approach: {
    title: "How we fit payments to your business.",
    steps: [
      { title: "Understand", body: "We start with the business model: what you sell, who buys it and how." },
      { title: "Structure", body: "Align processing, payment methods and gateway technology with how you operate." },
      { title: "Launch", body: "Support the journey from application to your first transactions." },
      { title: "Optimize", body: "Stay involved with reporting, chargebacks and risk as your business changes." },
    ] satisfies Step[],
  },
  all: {
    title: "More industries. Same payments expertise.",
  },
  notListed: {
    title: "Don't see your industry?",
    body: "We review many business models individually.",
  },
};

/** Everyday chips on the homepage (PRD §9.1.4). */
export const everydayChips = industriesBySlug([
  "cbd-hemp",
  "vape-ecig",
  "ecommerce",
  "retail",
  "restaurant-hospitality",
  "auto-repair",
]);
