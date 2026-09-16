/**
 * Simple monochrome social glyphs drawn from basic shapes. lucide-react v1 no
 * longer ships brand icons; swap for licensed brand assets in the full build.
 */
export function SocialIcon({ name }: { name: "linkedin" | "x" | "facebook" | "instagram" }) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", "aria-hidden": true as const, fill: "none" };
  switch (name) {
    case "linkedin":
      return (
        <svg {...common}>
          <rect x="2.5" y="2.5" width="19" height="19" rx="4" stroke="currentColor" strokeWidth="1.75" />
          <path d="M7.5 10.5v6M7.5 7.25v.01M11 16.5v-6m0 2.75c0-1.6 1-2.75 2.5-2.75s2.5 1 2.5 2.75v3.25" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.75" />
          <path d="M13 21.5V12.5h2.5M13 12.5V10c0-1.1.9-2 2-2h1M10.5 12.5H13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="17.25" cy="6.75" r="1" fill="currentColor" />
        </svg>
      );
  }
}
