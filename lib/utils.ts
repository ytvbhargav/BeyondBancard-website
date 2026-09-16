import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Custom type utilities (type-h1, tabular…) are unknown to tailwind-merge.
// Register them so they never get merged away against text colours.
const twMerge = extendTailwindMerge<"type-scale">({
  extend: {
    classGroups: {
      "type-scale": [
        { type: ["display", "h1", "h2", "h3", "h4", "body-lg", "body", "small"] },
      ],
    },
    theme: {
      color: [
        "ink-950",
        "ink-900",
        "ink-800",
        "ink-700",
        "paper",
        "surface",
        "line",
        "line-strong",
        "muted",
        "on-dark",
        "on-dark-muted",
      ],
      radius: ["pill"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
