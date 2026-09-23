import { groupLabels, industries } from "@/content/industries";

export const apply = {
  title: "Apply for a merchant account.",
  lead: {
    before: "It takes about ",
    confirmable: "five minutes",
    after: ". A payments expert will review your details and contact you about next steps.",
    note: "Application takes about five minutes",
  },
  steps: ["Your business", "Processing", "Contact"],
  options: {
    industries: [
      { group: "Featured", items: industries.filter((i) => i.group === "featured").map((i) => i.name) },
      ...(Object.keys(groupLabels) as (keyof typeof groupLabels)[]).map((g) => ({
        group: groupLabels[g],
        items: industries.filter((i) => i.group === g).map((i) => i.name),
      })),
      { group: "Something else", items: ["Other"] },
    ],
    yearsInBusiness: ["Less than 1 year", "1–2 years", "3–5 years", "More than 5 years"],
    salesChannels: ["In person", "Online", "Phone/mail", "B2B invoicing"],
    monthlyVolume: ["Under $10K", "$10K–$50K", "$50K–$100K", "$100K–$500K", "$500K+"],
    averageTicket: ["Under $50", "$50–$250", "$250–$1,000", "$1,000+"],
    bestTime: ["Morning", "Afternoon", "Any time"],
  },
  declinedHelp: "This won't automatically disqualify you.",
  consent: "I agree to be contacted by Beyond Bancard about my application.",
  success: {
    title: (firstName: string) => `Thanks, ${firstName}. Your application has been received.`,
    nextTitle: "What happens next",
    next: [
      { title: "Review", body: "A payments expert reads through your details." },
      { title: "Call from an expert", body: "We contact you to talk through your business and next steps." },
      { title: "Underwriting", body: "Experienced reviewers assess your full business profile." },
    ],
  },
  sidebar: {
    whyTitle: "Why merchants choose Beyond",
    why: ["Experienced underwriting", "Multiple processing paths", "People who stay involved"],
    talkTitle: "Prefer to talk?",
    security: "Your information is handled under our Privacy Policy.",
  },
};
