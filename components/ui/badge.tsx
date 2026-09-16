import { Check, CircleDashed, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export type Status = "approved" | "review" | "pending" | "neutral" | "illustration";

const styles: Record<Status, string> = {
  approved: "bg-success-100 text-success-700",
  review: "bg-warning-100 text-warning-700",
  pending: "bg-paper text-muted ring-1 ring-inset ring-line",
  neutral: "bg-brand-50 text-brand-700",
  illustration: "bg-paper text-muted ring-1 ring-inset ring-line",
};

const icons: Partial<Record<Status, typeof Check>> = {
  approved: Check,
  review: Clock,
  pending: CircleDashed,
};

/**
 * Status pill. Status is always carried by text and an icon, never colour alone.
 */
export function Badge({
  status = "neutral",
  children,
  className,
  icon = true,
}: {
  status?: Status;
  children: React.ReactNode;
  className?: string;
  icon?: boolean;
}) {
  const Icon = icons[status];
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-pill px-3 text-[0.8125rem] font-semibold leading-none whitespace-nowrap",
        styles[status],
        className,
      )}
    >
      {icon && Icon && <Icon aria-hidden strokeWidth={2.25} className="size-3.5" />}
      {children}
    </span>
  );
}
