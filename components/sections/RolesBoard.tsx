import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CareersRole } from "@/content/careers";

/**
 * Open roles set like rows in an application queue (D-054): one white file panel
 * split by hairlines, where each row is a single link to the posting (new tab).
 * The link is named by the title and destination, and described by the summary,
 * so a screen reader's link list stays short.
 *
 * No scroll reveal: the board is the page's job and sits right under the hero, so
 * it rises in with the hero's CSS entrance instead. A reveal that has not fired yet
 * would leave a row invisible while it holds keyboard focus.
 */
export function RolesBoard({
  roles,
  linkLabel,
  empty,
  idPrefix = "role",
  className,
}: {
  roles: CareersRole[];
  /** Destination, read after each title by screen readers, e.g. "View on Indeed". */
  linkLabel: string;
  /** Shown in the panel when there are no roles. */
  empty: React.ReactNode;
  /** Prefix for the row ids that name and describe each link. */
  idPrefix?: string;
  className?: string;
}) {
  if (roles.length === 0) {
    return (
      <div className={cn("rounded-md border border-line bg-surface px-5 py-7 sm:px-7 md:px-9 md:py-8", className)}>
        {empty}
      </div>
    );
  }

  return (
    <ul className={cn("divide-y divide-line overflow-hidden rounded-md border border-line bg-surface", className)}>
      {roles.map((role, i) => {
        // Ids come from the position, so two postings with the same title stay distinct
        const id = `${idPrefix}-${i + 1}`;
        return (
          <li key={role.href}>
            <a
              href={role.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-labelledby={`${id}-title ${id}-link`}
              aria-describedby={`${id}-summary`}
              className={cn(
                "group/role link-draw-parent relative grid gap-x-10 px-5 py-6 sm:px-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:px-9 md:py-7",
                "transition-colors duration-(--duration-fast) ease-out hover:bg-brand-50 focus-visible:-outline-offset-2",
                // Match the panel's inner corners so the inset focus ring is not clipped.
                i === 0 && "rounded-t-[calc(var(--radius-md)-1px)]",
                i === roles.length - 1 && "rounded-b-[calc(var(--radius-md)-1px)]",
              )}
            >
              <div className="min-w-0">
                <h3 id={`${id}-title`} className="type-h3 pr-9 text-ink-900 md:pr-0">
                  <span className="link-draw">{role.title}</span>
                </h3>
                <p id={`${id}-summary`} className="mt-2 max-w-[38rem] text-muted">
                  {role.summary}
                </p>
              </div>
              <span id={`${id}-link`} className="sr-only">
                {linkLabel} (opens in a new tab)
              </span>
              {/* The external arrow: a small corner mark on phones, a round button that fills on hover from md */}
              <span
                aria-hidden
                className={cn(
                  "absolute top-5 right-4 grid size-8 place-items-center rounded-pill text-brand-700 sm:right-6",
                  "md:static md:size-9 md:border md:border-line-strong md:text-ink-900",
                  "transition-[background-color,border-color,color] duration-(--duration-fast) ease-out group-hover/role:border-brand-600 md:group-hover/role:bg-brand-600 md:group-hover/role:text-white",
                )}
              >
                <ArrowUpRight
                  strokeWidth={1.75}
                  className="size-5 transition-transform duration-(--duration-fast) ease-(--ease-out) group-hover/role:translate-x-px group-hover/role:-translate-y-px md:size-4"
                />
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
