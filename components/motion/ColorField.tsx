import { cn } from "@/lib/utils";

/**
 * The lake of colour behind a hero: layered lights in the brand blues, combed
 * with fine strands and fading out into the section on every side.
 *
 * It is painted and it stays still. Nothing here animates, blurs, blends or
 * masks, and there is no script behind it, because a hero that moves under the
 * reader is what makes a page feel heavy to scroll — the motion in these
 * sections belongs to the photographs that float over it (`.aurora-float`).
 * Two elements, no JavaScript, no work after the first paint.
 */
export function ColorField({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("aurora", className)}>
      <div className="aurora-light" />
      <div className="aurora-strands" />
    </div>
  );
}
