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
          <StaggerItem as="li" key={f.title} className="flex gap-5 border-b border-line py-6">
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
    return (
      <Stagger
        as="ul"
        className={cn("grid overflow-hidden rounded-md border border-line bg-surface md:grid-cols-2", className)}
      >
        {items.map((f, i) => (
          <StaggerItem
            as="li"
            key={f.title}
            className={cn(
              "border-line p-7 md:p-9",
              i > 0 && "border-t",
              i === 1 && "md:border-t-0",
              i % 2 === 1 && "md:border-l",
            )}
          >
            {f.icon && <Icon name={f.icon} className="size-6 text-brand-600" />}
            <H className="type-h3 mt-5">{f.title}</H>
            <p className="mt-2 max-w-[28rem] text-muted">
              <MaybeConfirm item={f}>{f.body}</MaybeConfirm>
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    );
  }

  return (
    <Stagger as="ul" className={cn("grid gap-x-8 gap-y-2", colClass, className)}>
      {items.map((f) => (
        <StaggerItem as="li" key={f.title} className="border-t border-line-strong pt-6 pb-8">
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
