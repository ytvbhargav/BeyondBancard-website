export type MotionTag = "div" | "section" | "ul" | "ol" | "li" | "header" | "p" | "span" | "dl" | "article";

/**
 * Fade-up reveal that plays once when the element enters the viewport (M7).
 * Rendered on the server with no client JS of its own: RevealObserver watches
 * every [data-reveal] element and CSS in globals.css runs the transition.
 * Without JS, or with reduced motion, content is simply shown.
 */
export function Reveal({
  as: Tag = "div",
  className,
  children,
  delay = 0,
  id,
}: {
  as?: MotionTag;
  className?: string;
  children: React.ReactNode;
  /** Seconds, matching the motion token scale. */
  delay?: number;
  id?: string;
}) {
  return (
    <Tag
      id={id}
      data-reveal=""
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay * 1000}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
