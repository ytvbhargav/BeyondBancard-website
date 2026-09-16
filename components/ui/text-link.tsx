import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { href as resolveHref, isExternal } from "@/lib/links";

/** Full-row link (lists, menus): the whole row is the target, the underline draws under the text. */
export function RowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href.startsWith("/coming-soon") ? href : resolveHref(href)}
      className={cn("link-draw-parent flex min-h-12 items-center", className)}
    >
      <span className="link-draw">{children}</span>
    </Link>
  );
}

/** Inline text link with the left-to-right underline draw (M5). */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const classes = cn("link-draw font-medium", className);
  if (isExternal(href)) {
    const isWeb = href.startsWith("http");
    return (
      <a
        href={href}
        className={cn(classes, "inline-flex items-center gap-1")}
        {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
        {isWeb && (
          <>
            <ArrowUpRight aria-hidden strokeWidth={1.75} className="size-4" />
            <span className="sr-only"> (opens in a new tab)</span>
          </>
        )}
      </a>
    );
  }
  return (
    <Link href={href.startsWith("/coming-soon") ? href : resolveHref(href)} className={classes}>
      {children}
    </Link>
  );
}
