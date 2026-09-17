import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { footerGroups, type FooterGroup } from "@/content/site";
import { href, isExternal } from "@/lib/links";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/types/content";

/** Internal paths: pre-resolved /coming-soon links stay as they are, everything else goes via href(). */
const resolve = (h: string) => (h.startsWith("/coming-soon") ? h : href(h));

const HEADING = "font-display text-lg/[1.625rem] font-bold tracking-[-0.005em] text-on-dark [font-stretch:112%]";

// 44px rows on touch widths and coarse pointers; Helcim's 32px rhythm only for a mouse at lg+.
// Rows stay full column width on touch, so short labels ("FAQ", "Blog") are still 44px-wide targets.
const LINK =
  "link-draw-parent flex min-h-11 w-full items-center gap-1.5 text-base/6 text-on-dark-muted transition-colors duration-(--duration-fast) hover:text-on-dark lg:pointer-fine:min-h-8 lg:pointer-fine:w-auto";

function GroupLink({ link, more = false }: { link: NavLink; more?: boolean }) {
  const cls = cn(LINK, more && "font-medium text-on-dark");
  if (isExternal(link.href)) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>
        <span className="link-draw">{link.label}</span>
        <ArrowUpRight aria-hidden strokeWidth={1.75} className="size-4 shrink-0" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={resolve(link.href)} className={cls}>
      <span className="link-draw">{link.label}</span>
      {more && <ArrowRight aria-hidden strokeWidth={1.75} className="size-4 shrink-0" />}
    </Link>
  );
}

function GroupLinks({ group }: { group: FooterGroup }) {
  return (
    <>
      {group.links.map((l) => (
        <li key={l.href} className="flex">
          <GroupLink link={l} />
        </li>
      ))}
      {group.more && (
        <li className="flex">
          <GroupLink link={group.more} more />
        </li>
      )}
    </>
  );
}

/** Desktop group: bold h2 (a link for pillar hubs) over a plain list. */
function Group({ group }: { group: FooterGroup }) {
  return (
    <div>
      {group.hub ? (
        <h2 className={cn("flex", HEADING)}>
          <Link
            href={resolve(group.hub.href)}
            className="link-draw-parent group/h inline-flex items-center gap-1.5 pointer-coarse:min-h-11"
          >
            <span className="link-draw">{group.title}</span>
            <ArrowRight
              aria-hidden
              strokeWidth={1.75}
              className="size-4 text-on-dark-muted transition-transform duration-(--duration-fast) motion-safe:group-hover/h:translate-x-[3px]"
            />
          </Link>
        </h2>
      ) : (
        <h2 className={HEADING}>{group.title}</h2>
      )}
      <ul className="mt-3 flex flex-col">
        <GroupLinks group={group} />
      </ul>
    </div>
  );
}

/** Below lg: native disclosure, closed by default, independent of its siblings. */
function Disclosure({ group }: { group: FooterGroup }) {
  return (
    <details className="group/acc border-b border-ink-800">
      <summary className="flex min-h-13 cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
        <h2 className="font-display text-base/6 font-bold text-on-dark [font-stretch:112%]">{group.title}</h2>
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          className="size-4 shrink-0 text-on-dark-muted"
        >
          <path d="M2 8h12" />
          {/* Plus to minus: the vertical stroke collapses (transform only). */}
          <path
            d="M8 2v12"
            className="origin-center [transform-box:fill-box] group-open/acc:scale-y-0 motion-safe:transition-[scale] motion-safe:duration-(--duration-fast)"
          />
        </svg>
      </summary>
      <ul className="flex flex-col pb-4">
        {group.hub && (
          <li className="flex">
            <Link
              href={resolve(group.hub.href)}
              className="link-draw-parent flex min-h-11 w-full flex-col justify-center py-1.5 text-on-dark"
            >
              <span className="inline-flex items-center gap-1.5 font-medium">
                <span className="link-draw">{group.title}</span>
                <ArrowRight aria-hidden strokeWidth={1.75} className="size-4" />
              </span>
              <span className="type-small text-on-dark-muted">{group.hub.descriptor}</span>
            </Link>
          </li>
        )}
        <GroupLinks group={group} />
      </ul>
    </details>
  );
}

/**
 * Footer link groups (Helcim-style): three columns of bold-headed groups from lg, native
 * accordions below. Both trees are server-rendered; CSS shows exactly one of them.
 */
export function FooterNav({ className }: { className?: string }) {
  const flat = footerGroups.flat();
  return (
    <nav aria-label="Footer" className={className}>
      <div className="hidden lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8">
        {footerGroups.map((column) => (
          <div key={column[0].title} data-footer-column className="flex flex-col gap-10">
            {column.map((g) => (
              <Group key={g.title} group={g} />
            ))}
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 md:items-start md:gap-x-8 lg:hidden">
        <div className="border-t border-ink-800">
          {flat.slice(0, 6).map((g) => (
            <Disclosure key={g.title} group={g} />
          ))}
        </div>
        <div className="md:border-t md:border-ink-800">
          {flat.slice(6).map((g) => (
            <Disclosure key={g.title} group={g} />
          ))}
        </div>
      </div>
    </nav>
  );
}
