/**
 * Hero photographs for the industry pages (public/industries). The first leads
 * the mosaic; the other two sit beside it. Sourced under the Unsplash License
 * (free for commercial use, no attribution required); see
 * public/industries/credits.json for each photographer and source.
 */
export type IndustryImage = { src: string; alt: string };

export const industryImages: Record<string, IndustryImage[]> = {
  "nutra-supplements": [
    { src: "/industries/nutra-supplements-1.webp", alt: "Citrus slices, supplement beads and capsules" },
    { src: "/industries/nutra-supplements-2.webp", alt: "A clear bottle filled with capsules" },
    { src: "/industries/nutra-supplements-3.webp", alt: "Capsules spilled from a brown bottle" },
  ],
  gaming: [
    { src: "/industries/gaming-1.webp", alt: "A wireless game controller lit in cyan and magenta" },
    { src: "/industries/gaming-2.webp", alt: "A crowd watching a match on a big screen" },
    { src: "/industries/gaming-3.webp", alt: "Team banners at an esports event" },
  ],
  "ruo-peptides": [
    { src: "/industries/ruo-peptides-1.webp", alt: "A researcher using a pipette with test tubes" },
    { src: "/industries/ruo-peptides-2.webp", alt: "Rows of laboratory tubes in a tray" },
    { src: "/industries/ruo-peptides-3.webp", alt: "A gloved hand holding a beaker of clear liquid" },
  ],
  "travel-payment-solutions": [
    {
      src: "/industries/travel-payment-solutions-1.webp",
      alt: "An aircraft at the gate, seen through a terminal window",
    },
    { src: "/industries/travel-payment-solutions-2.webp", alt: "A parent and child watching an aircraft at the gate" },
    { src: "/industries/travel-payment-solutions-3.webp", alt: "An aircraft taking off past a terminal" },
  ],
  crb: [
    { src: "/industries/crb-1.webp", alt: "Cannabis plants growing under cultivation lights" },
    { src: "/industries/crb-2.webp", alt: "A cannabis plant in close-up" },
    { src: "/industries/crb-3.webp", alt: "A cultivation room of green plants" },
  ],
};

/**
 * The homepage rail's photograph for each industry (public/home/industries).
 * Supplied by the client; each one shows the moment of payment in that
 * industry rather than the industry in the abstract. An industry with no
 * photograph here keeps its drawn panel, so the rail never shows a stand-in.
 */
export const homeIndustryImages: Record<string, IndustryImage> = {
  adult: {
    src: "/home/industries/adult.webp",
    alt: "A laptop on a desk showing an age verification screen with an 18+ shield and an “I am 18+” button",
  },
  gaming: {
    src: "/home/industries/gaming.webp",
    alt: "A games controller in front of a monitor reading Payment Approved, Enjoy the game",
  },
  "nutra-supplements": {
    src: "/home/industries/nutra-supplements.webp",
    alt: "A supplement bottle and capsules beside a phone showing a completed order",
  },
  "travel-payment-solutions": {
    src: "/home/industries/travel-payment-solutions.webp",
    alt: "A passport and sunglasses beside a laptop showing a Book Your Trip screen, an aircraft climbing outside the window",
  },
  // No photograph was supplied for this one; the research bench from the
  // industry's own page carries the same idea, so the rail is not left with
  // one drawn panel among five photographs.
  "ruo-peptides": {
    src: "/industries/ruo-peptides-1.webp",
    alt: "A researcher using a pipette with test tubes",
  },
  crb: {
    src: "/home/industries/crb.webp",
    alt: "A labelled cannabis jar beside a countertop card terminal reading Payment Approved",
  },
};
