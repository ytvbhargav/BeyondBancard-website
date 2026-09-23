import { cn } from "@/lib/utils";

/**
 * The lake of colour behind a hero: layered lights in the brand blues, combed
 * with fine strands and fading out into the section on every side.
 *
 * The dark tone is the industry heroes, where the lights carry the section. The
 * light tone is the solution heroes, where the same lights are a wash across a
 * white page — the two are the same field at two strengths, which is what makes
 * the two halves of the site read as one.
 *
 * It is painted and it stays still. Nothing here animates, blurs, blends or
 * masks, and there is no script behind it, because a hero that moves under the
 * reader is what makes a page feel heavy to scroll — the motion in these
 * sections belongs to whatever floats over it (`.aurora-float`). Two elements,
 * no JavaScript, no work after the first paint.
 */
export function ColorField({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <div aria-hidden className={cn("aurora", tone === "light" && "aurora-on-light", className)}>
      <div className="aurora-light" />
      <div className="aurora-strands" />
    </div>
  );
}
