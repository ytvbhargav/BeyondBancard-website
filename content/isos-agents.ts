import type { Feature, Step } from "@/types/content";

export const isosAgents = {
  breadcrumb: [{ label: "Partners", href: "/partners" }, { label: "ISOs & agents" }],
  hero: {
    title: "Grow your merchant portfolio with a processor that says yes.",
    lead: "Offer more merchants a home, including hard-to-place businesses, with broader products, dedicated support and competitive economics.",
    portalCta: "Log in to partner portal",
  },
  audience: {
    title: "Who it's for.",
    items: [
      {
        title: "Independent agents",
        body: "Sell merchant services on your own terms, with a processor behind you.",
        icon: "briefcase",
      },
      {
        title: "ISOs and sales offices",
        body: "Give your team more products to sell and more merchants you can place.",
        icon: "users",
      },
      {
        title: "Referral partners",
        body: "Introduce businesses that need payments and let Beyond Bancard handle the rest.",
        icon: "handshake",
      },
    ] satisfies Feature[],
  },
  benefits: {
    title: "Built around your success.",
    items: [
      {
        title: "Uncapped income",
        body: "High residual earnings and activation bonuses.",
        icon: "wallet",
        confirm: true,
        note: "Residual and bonus terms (current site: residuals up to 100%, bonuses up to $10,000)",
      },
      {
        title: "In-house support",
        body: "A dedicated team of relationship managers, plus training and marketing resources.",
        icon: "headset",
      },
      {
        title: "Fast turnaround",
        body: "Quick application decisions.",
        icon: "clock",
        confirm: true,
        note: "Application turnaround (current site: 2-hour turnaround)",
      },
      {
        title: "Flexibility",
        body: "Work from anywhere and set your own schedule.",
        icon: "globe",
      },
      {
        title: "Broader approvals",
        body: "Place high-risk and hard-to-place merchants other processors decline.",
        icon: "badge-check",
      },
      {
        title: "Equipment and tools",
        body: "Access to leading POS systems, terminals and gateways.",
        icon: "credit-card",
      },
    ] satisfies Feature[],
  },
  program: {
    title: "How the program works.",
    steps: [
      { title: "Apply to partner", body: "Tell us about your business and the merchants you work with." },
      { title: "Get onboarded and trained", body: "Meet your relationship manager and learn the products." },
      { title: "Submit merchants", body: "Send applications, including hard-to-place businesses." },
      { title: "Track and earn in the partner portal", body: "Follow application status and residuals in one place." },
    ] satisfies Step[],
  },
  portal: {
    title: "Your portfolio, in one place.",
    body: "The partner portal shows where every application stands and how your residuals are trending.",
  },
  otherPrograms: {
    title: "Other partner programs.",
    items: [
      {
        title: "ISVs & platforms",
        body: "Embed payments, enhance your product and create recurring revenue.",
        href: "/partners/isvs-platforms",
      },
      {
        title: "Associations",
        body: "Create a valuable payment benefit for members while generating recurring revenue.",
        href: "/partners/associations",
      },
    ],
  },
  faq: { title: "Partner program questions." },
  ctaBand: {
    title: "Ready to grow with Beyond?",
    body: "Tell us about your book of business and we'll show you how the program fits.",
    secondaryLabel: "Talk to our partner team",
  },
};
