import { Icon } from "@/components/ui/icon";
import { MaybeConfirm } from "@/components/ui/confirm";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { cn } from "@/lib/utils";
import type { Feature } from "@/types/content";

type Variant = "ruled" | "rows" | "panel";

/**
 * Feature set without the identical-card look. Three structures:
 * - ruled: columns under a top rule (peers you scan across)
 * - rows: a vertical list with dividers (reads like a checklist)
 * - panel: one white file panel split by inner lines (a single object)
 */
export function FeatureGrid({
  items,
  variant = "ruled",
  columns = 3,
  headingLevel = "h3",
  className,
}: {
  items: Feature[];
  variant?: Variant;
  columns?: 2 | 3;
  headingLevel?: "h3" | "h4";
  className?: string;
}) {
  const H = headingLevel;
  const colClass = columns === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2";

  if (variant === "rows") {
    return (
      <Stagger as="ul" className={cn("border-t border-line", className)}>
        {items.map((f) => (
          <StaggerItem
            as="li"
            key={f.title}
            // Phone-only density pass (D-060): tighter row padding and gap below sm; sm and up unchanged.
            className="flex gap-4 border-b border-line py-5 sm:gap-5 sm:py-6"
          >
            {f.icon && (
              <span className="grid size-11 shrink-0 place-items-center rounded-sm bg-brand-50 text-brand-700">
                <Icon name={f.icon} className="size-5" />
              </span>
            )}
            <div>
              <H className="type-h4">{f.title}</H>
              <p className="mt-1.5 max-w-[36rem] text-muted">
                <MaybeConfirm item={f}>{f.body}</MaybeConfirm>
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    );
  }

  if (variant === "panel") {
    // Three items sit in one row from md, so the panel never ends on a half-empty row (D-058).
    const three = items.length === 3;
    return (
      <Stagger
        as="ul"
        className={cn(
          "grid overflow-hidden rounded-md border border-line bg-surface",
          three ? "md:grid-cols-3" : "md:grid-cols-2",
          className,
        )}
      >
        {items.map((f, i) => (
          <StaggerItem
            as="li"
            key={f.title}
            className={cn(
              // Phone-only density pass (D-060): p-5 below sm, today's p-7 from sm up.
              "border-line p-5 sm:p-7 md:p-9",
              i > 0 && "border-t",
              three ? i > 0 && "md:border-t-0 md:border-l" : [i === 1 && "md:border-t-0", i % 2 === 1 && "md:border-l"],
            )}
          >
            {/*
              Phone-only density pass (D-060): below sm the icon sits beside the title instead of
              above it. The title stays type-h3 at every width — it is the panel's hierarchy cue,
              and the p-5 padding does the real saving. From sm up the wrapper is a plain block, so
              the icon stacks above the title with mt-5 exactly as before.
              phone pass (D-063): items-start plus mt-0.5 pins the 20px icon to the title's first
              line (type-h3 line box is about 25px at 390), so a title that wraps to two lines no
              longer leaves the icon floating between them. sm:mt-0 restores today's stacked icon.
            */}
            <div className="flex items-start gap-3 sm:block">
              {f.icon && <Icon name={f.icon} className="mt-0.5 size-5 shrink-0 text-brand-600 sm:mt-0 sm:size-6" />}
              <H className="type-h3 sm:mt-5">{f.title}</H>
            </div>
            <p className="mt-2 max-w-[28rem] text-muted">
              <MaybeConfirm item={f}>{f.body}</MaybeConfirm>
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    );
  }

  // Five items sit three over two from lg (and two, two, one full width at md), so the
  // grid never ends on a half-empty row (D-058). Assumes the full content width.
  const five = items.length === 5;
  // Row spacing is the grid gap, not item padding, so the last row adds nothing to the
  // section's bottom padding (D-006 rhythm).
  return (
    <Stagger
      as="ul"
      // Phone-only density pass (D-060): gap-y-7 below sm, today's gap-y-10 from sm up.
      className={cn("grid gap-x-8 gap-y-7 sm:gap-y-10", five ? "md:grid-cols-2 lg:grid-cols-6" : colClass, className)}
    >
      {items.map((f, i) => (
        <StaggerItem
          as="li"
          key={f.title}
          className={cn(
            // Phone-only density pass (D-060): pt-5 below sm, today's pt-6 from sm up.
            "border-t border-line-strong pt-5 sm:pt-6",
            five && (i < 3 ? "lg:col-span-2" : "lg:col-span-3"),
            five && i === 4 && "md:col-span-2",
          )}
        >
          <div className="flex items-center gap-3">
            {f.icon && <Icon name={f.icon} className="size-5 shrink-0 text-brand-600" />}
            <H className="type-h4">{f.title}</H>
          </div>
          <p className="mt-2.5 max-w-[26rem] text-muted">
            <MaybeConfirm item={f}>{f.body}</MaybeConfirm>
          </p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
