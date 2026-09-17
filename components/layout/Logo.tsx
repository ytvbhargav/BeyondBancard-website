import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Placeholder wordmark until the client supplies logo files (CONFIRM).
 * The mark is a "B" set in Archivo inside a brand-blue tile.
 */
export function Logo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Beyond Bancard home"
      className={cn("group/logo inline-flex min-h-11 min-w-11 items-center gap-2.5 rounded-sm", className)}
    >
      <span
        aria-hidden
        className="grid size-8 place-items-center rounded-[9px] bg-brand-600 font-display text-[1.125rem] leading-none font-extrabold text-white [font-stretch:112%]"
      >
        B
      </span>
      <span
        aria-hidden
        className={cn(
          "hidden font-display text-[0.9375rem] leading-none font-extrabold tracking-[-0.02em] whitespace-nowrap [font-stretch:104%] min-[380px]:inline sm:text-[1.1875rem] sm:[font-stretch:112%]",
          tone === "dark" ? "text-on-dark" : "text-ink-900",
        )}
      >
        Beyond Bancard
      </span>
    </Link>
  );
}
