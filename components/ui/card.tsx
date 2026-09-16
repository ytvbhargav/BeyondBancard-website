import { cn } from "@/lib/utils";

/**
 * Panel surface. Prefers a 1px line over shadows (PRD §5.4).
 * `float` is reserved for elements that sit above the page (hero card, menus).
 */
export function Card({
  className,
  elevation = "flat",
  as: Tag = "div",
  ...props
}: React.HTMLAttributes<HTMLElement> & { elevation?: "flat" | "float"; as?: React.ElementType }) {
  return (
    <Tag
      className={cn(
        "rounded-md border border-line bg-surface text-ink-900",
        elevation === "float" && "border-transparent shadow-float",
        className,
      )}
      {...props}
    />
  );
}

/** Label/value row used in the "underwriting file" panels. */
export function FileRow({
  label,
  value,
  className,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-baseline justify-between gap-4 border-t border-line py-2.5 first:border-t-0", className)}>
      <dt className="type-small text-muted">{label}</dt>
      <dd className="tabular text-right text-[0.9375rem] font-medium text-ink-900">{value}</dd>
    </div>
  );
}
