import { ConfirmTip } from "@/components/ui/confirm-tip";
import { cn } from "@/lib/utils";

export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE !== "false";

/**
 * Wraps unverified content (PRD §7.3).
 * Demo mode shows a "Client to confirm" tooltip plus either a dashed amber
 * outline (default) or, where an outline would clutter the layout (the
 * announcement bar, hero fact bar), a small amber marker after the content.
 * Production: renders children only when `confirmed` is true.
 * Every usage is listed in docs/CONFIRM_LIST.md (pnpm confirm-list).
 */
export function Confirm({
  note,
  confirmed = false,
  as: Tag = "span",
  variant = "outline",
  tooltip = "top",
  tooltipAlign = "start",
  className,
  children,
}: {
  note: string;
  confirmed?: boolean;
  as?: "span" | "div";
  variant?: "outline" | "marker";
  tooltip?: "top" | "bottom";
  /** "center" centres the tooltip on the trigger, for triggers in centred text that can sit near either edge at narrow widths. */
  tooltipAlign?: "start" | "center";
  className?: string;
  children: React.ReactNode;
}) {
  if (confirmed) return <>{children}</>;
  if (!DEMO_MODE) return null;

  return (
    <Tag
      data-confirm={note}
      className={cn(
        "group/confirm relative",
        variant === "outline" && "rounded-[4px] outline-[1.5px] outline-offset-[3px] outline-warning-600 outline-dashed",
        Tag === "span" ? "inline" : "block",
        className,
      )}
    >
      {children}
      {variant === "marker" && (
        <span
          aria-hidden
          className="ml-1.5 inline-block size-2 -translate-y-px rounded-pill bg-warning-100 align-middle ring-2 ring-warning-600"
        />
      )}
      <ConfirmTip
        className={cn(
          "pointer-events-none absolute z-50 w-max max-w-[min(18rem,calc(100vw-2rem))] rounded-sm bg-ink-950 px-3 py-2 text-left font-sans text-[0.8125rem] leading-snug font-medium tracking-normal text-on-dark normal-case shadow-float",
          tooltip === "top" ? "bottom-[calc(100%+10px)] slide-in-from-bottom-1" : "top-[calc(100%+10px)] slide-in-from-top-1",
          // --tip-shift is set when the tooltip opens, to keep it inside the viewport (ConfirmTip)
          tooltipAlign === "center" ? "left-[calc(50%+var(--tip-shift,0px))] -translate-x-1/2" : "left-[var(--tip-shift,0px)]",
          // display:none while hidden, so the tooltip never adds scrollable overflow at narrow widths
          "hidden animate-in fade-in-0 duration-(--duration-fast) ease-out",
          "group-hover/confirm:block group-focus-within/confirm:block",
        )}
      >
        <span className="text-warning-100">Client to confirm:</span> {note}
      </ConfirmTip>
    </Tag>
  );
}

/** Convenience for Confirmable<T> content objects. */
export function MaybeConfirm({
  item,
  children,
  as,
  variant,
  tooltip,
  tooltipAlign,
  className,
}: {
  item: { confirm?: boolean; note?: string };
  children: React.ReactNode;
  as?: "span" | "div";
  variant?: "outline" | "marker";
  tooltip?: "top" | "bottom";
  tooltipAlign?: "start" | "center";
  className?: string;
}) {
  if (!item.confirm) return <>{children}</>;
  return (
    <Confirm
      note={item.note ?? "Unverified content"}
      as={as}
      variant={variant}
      tooltip={tooltip}
      tooltipAlign={tooltipAlign}
      className={className}
    >
      {children}
    </Confirm>
  );
}
