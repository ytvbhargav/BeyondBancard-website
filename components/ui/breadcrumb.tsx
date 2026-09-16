import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { href as resolveHref } from "@/lib/links";

/**
 * Page context shown above a PageHero H1. Used only for breadcrumbs, never as a
 * decorative label above section headings.
 */
export function Breadcrumb({
  items,
  tone = "light",
  className,
}: {
  items: { label: string; href?: string }[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("type-small", className)}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link
                  href={resolveHref(item.href)}
                  className={cn(
                    "link-draw inline-flex min-h-11 items-center",
                    tone === "dark" ? "text-on-dark-muted hover:text-on-dark" : "text-muted hover:text-ink-900",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center",
                    last ? (tone === "dark" ? "text-on-dark" : "text-ink-900") : tone === "dark" ? "text-on-dark-muted" : "text-muted",
                    last && "font-medium",
                  )}
                >
                  {item.label}
                </span>
              )}
              {!last && (
                <ChevronRight aria-hidden strokeWidth={1.75} className={cn("size-3.5", tone === "dark" ? "text-on-dark-muted" : "text-muted")} />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
