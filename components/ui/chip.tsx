import Link from "next/link";
import { cn } from "@/lib/utils";
import { href as resolveHref } from "@/lib/links";

const base =
  "inline-flex min-h-11 items-center gap-2 rounded-pill border px-4 text-[0.9375rem] font-medium transition-[border-color,background-color,color,transform] duration-(--duration-fast) ease-out";

/** Static chip (a label, not interactive). */
export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn(base, "border-line bg-surface text-ink-900", className)}>{children}</span>;
}

/** Chip that links somewhere. */
export function ChipLink({
  href,
  children,
  className,
  tone = "light",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <Link
      href={resolveHref(href)}
      className={cn(
        base,
        tone === "light"
          ? "border-line bg-surface text-ink-900 hover:border-brand-600 hover:text-brand-700"
          : "border-ink-700 bg-transparent text-on-dark hover:border-brand-300",
        "hover:-translate-y-px",
        className,
      )}
    >
      {children}
    </Link>
  );
}

/** Toggle chip for filters. Uses aria-pressed so state is announced. */
export function ChipToggle({
  pressed,
  onClick,
  children,
  count,
}: {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
  count?: number;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        base,
        pressed
          ? "border-ink-900 bg-ink-900 text-on-dark forced-colors:border-2 forced-colors:border-[Highlight]"
          : "border-line bg-surface text-ink-900 hover:border-brand-600 hover:text-brand-700",
      )}
    >
      {children}
      {count !== undefined && (
        <span className={cn("tabular text-[0.8125rem]", pressed ? "text-on-dark-muted" : "text-muted")}>{count}</span>
      )}
    </button>
  );
}
