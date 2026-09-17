/**
 * Company values, shared by About (full list) and Careers (titles). Lightly edited
 * for grammar and sentence case from the current About page (D-054); the client
 * confirms the wording as a group.
 */
export const companyValues = {
  note: "Company values wording (lightly edited from the current About page)",
  items: [
    {
      title: "Start with the merchant",
      body: "The merchant is our top priority. Every day we are hyper-focused on making their experience pleasant and seamless.",
    },
    {
      title: "Build relationships and deliver results",
      body: "We provide great service to consumers, to customers, to our communities and to each other. We make a real difference by working together.",
    },
    {
      title: "Act with integrity",
      body: "We openly collaborate in pursuit of the truth. We have no tolerance for politics, hidden agendas or passive-aggressive behavior. Beyond is a fully transparent organization.",
    },
    {
      title: "Team on a mission",
      body: "We are committed to helping our customers by working together with equal parts humility and ambition.",
    },
    {
      title: "Make a difference every day",
      body: "We focus on solutions, and we arrive every day inspired to make an impact through our talents, passion and hard work.",
    },
  ],
} as const;

/** Anchor of the values section on the About page. */
export const valuesHref = "/about-beyond-bancard#values";

export const careersEmail = "careers@beyondbancard.com";
