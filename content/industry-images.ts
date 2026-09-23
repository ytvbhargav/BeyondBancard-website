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
  // The businesses, not the subject matter: people filming and the rooms they
  // film in, which is what adult ecommerce, subscription and digital content
  // actually look like. It follows the live site's own hero, where a couple
  // are shooting themselves on a phone against a blue studio wall.
  adult: [
    { src: "/industries/adult-creator-1.webp", alt: "A creator holding a camera against a blue studio wall" },
    { src: "/industries/adult-creator-2.webp", alt: "A studio lit in blue and purple, with a phone on a tripod" },
    { src: "/industries/adult-creator-3.webp", alt: "A camera on a tripod filming a subject" },
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
