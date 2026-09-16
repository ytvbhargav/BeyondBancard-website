import type { Testimonial } from "@/types/content";

/** Existing client-site quotes. Wording must not be edited (PRD §9.8). */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Jimmy and his team at Beyond Bancard have saved me thousands of dollars in fees with their cash discount program. I have saved over $5,000 a month in fees with this great new program. I highly recommend anyone to give the team at Beyond Bancard a try.",
    name: "Andrew C.",
    role: "CEO",
    company: "Universal Travel Group",
  },
  {
    quote:
      "Beyond Bancard has provided A1 service for my business. Eighty-five percent of my business is credit card processing. The team at Beyond Bancard customized a program catering to the needs of my business.",
    name: "James W.",
    role: "Owner",
    company: "Smile Time Dental Group",
  },
  {
    quote:
      "Over the last few years we have made use of Beyond Bancard's support team numerous times, and they have always assisted us in resolving the issue with an entirely satisfactory result.",
    name: "Carlos H.",
    role: "Owner",
    company: "Papas and Beer",
  },
  {
    quote:
      "Beyond Bancard gets it done. They have lowered my interest rate and helped my business save hundreds of dollars a month. I highly recommend them.",
    name: "Kumar S.",
    role: "Owner",
    company: "Lifetime Jewelers",
  },
];

export const testimonialsNote = "Permission to display client testimonials";
