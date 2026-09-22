/**
 * The hero photograph for each industry page (public/industries). Sourced under
 * the Unsplash License (free for commercial use, no attribution required); see
 * public/industries/credits.json for each photographer and source.
 *
 * They are chosen to sit in the hero rather than be cut out of it: blue-toned or
 * lifestyle shots that belong beside the headline without any crop shape or
 * colour treatment.
 */
export type IndustryImage = { src: string; alt: string };

export const industryImages: Record<string, IndustryImage[]> = {
  adult: [{ src: "/industries/adult.webp", alt: "A couple laughing together against a blue background" }],
  gaming: [{ src: "/industries/gaming.webp", alt: "A player at a monitor in blue light" }],
  "nutra-supplements": [
    { src: "/industries/nutra-supplements.webp", alt: "A woman holding two bottles of supplements" },
  ],
  "ruo-peptides": [{ src: "/industries/ruo-peptides.webp", alt: "A researcher at a microscope in a laboratory" }],
  "travel-payment-solutions": [
    { src: "/industries/travel-payment-solutions.webp", alt: "Travellers with luggage in an airport terminal" },
  ],
  crb: [{ src: "/industries/crb.webp", alt: "Cannabis plants growing under cultivation lights" }],
};
