"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { href as resolveHref } from "@/lib/links";

/**
 * Interactive card (M6): border turns brand blue and the card lifts 2px on
 * hover; on fine pointers a soft radial spotlight follows the cursor.
 */
export function SpotlightCard({
  href,
  title,
  body,
  size = "md",
  headingLevel,
  className,
}: {
  href: string;
  title: string;
  body: string;
  size?: "md" | "lg" | "sm";
  /** Render the title as a heading (inside the one link) where the cards sit under a section h2. */
  headingLevel?: "h3";
  className?: string;
}) {
  const Title = headingLevel ?? "span";
  function onPointerMove(e: React.PointerEvent<HTMLAnchorElement>) {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  return (
    <Link
      href={resolveHref(href)}
      onPointerMove={onPointerMove}
      className={cn(
        "group/card relative isolate flex h-full flex-col overflow-hidden rounded-md border border-line bg-surface text-ink-900",
        "transition-[transform,border-color] duration-(--duration-fast) ease-out hover:-translate-y-0.5 hover:border-brand-600",
        size === "lg" && "min-h-44 p-6 md:min-h-64 md:p-8",
        size === "md" && "min-h-40 p-6 md:min-h-52 md:p-7",
        // phone pass (D-063): below sm the small card sizes to its content, so a one-line teaser leaves no gap
        size === "sm" && "p-4 sm:min-h-32 sm:p-5",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-(--duration-base) group-hover/card:opacity-100 [background:radial-gradient(22rem_circle_at_var(--x,50%)_var(--y,50%),var(--color-brand-100),transparent_65%)]"
      />
      <span className="flex items-start justify-between gap-4">
        <Title className={cn(size === "sm" ? "type-h4" : "type-h3", "text-ink-900")}>{title}</Title>
        <span
          aria-hidden
          className={cn(
            "grid shrink-0 place-items-center rounded-pill border border-line text-ink-900 transition-[background-color,border-color,color,transform] duration-(--duration-fast) group-hover/card:border-brand-600 group-hover/card:bg-brand-600 group-hover/card:text-white",
            // phone pass (D-063): below sm the 36px arrow centres on the h3's first line and no longer sets the row height
            size === "sm" ? "size-8" : "size-9 -my-1.5 sm:my-0",
          )}
        >
          <ArrowRight strokeWidth={1.75} className="size-4 transition-transform duration-(--duration-fast) group-hover/card:translate-x-px" />
        </span>
      </span>
      <span
        className={cn(
          "mt-auto block text-muted",
          // phone pass (D-063): tighter title-to-teaser gap on the small card below sm
          size === "sm" ? "type-small pt-2 sm:pt-3" : "pt-6 md:pt-10",
        )}
      >
        {body}
      </span>
    </Link>
  );
}
