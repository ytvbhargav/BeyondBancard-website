import { cn } from "@/lib/utils";

/**
 * A heading whose words rise one after another when it enters the viewport.
 * Server-rendered: each word is a span with its index, and globals.css runs the
 * transition once RevealObserver marks the group shown, so the heading is plain
 * text without JS and static with reduced motion. The text stays one string for
 * screen readers and for selection, since the spans are inline.
 */
export function RevealWords({
  text,
  as: Tag = "span",
  className,
  id,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  id?: string;
}) {
  const words = text.split(" ");
  return (
    <Tag id={id} data-words="" className={cn("[text-wrap:balance]", className)}>
      {/* The space sits between the spans, not inside them: a trailing space inside
          an inline-block collapses, and the words would run together. */}
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span data-word="" style={{ "--i": i } as React.CSSProperties}>
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
