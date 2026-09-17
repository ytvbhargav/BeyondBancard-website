import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { href as resolveHref, isExternal } from "@/lib/links";
import { cn } from "@/lib/utils";
import type { contactPage } from "@/content/contact";

/**
 * Link value in a contact file row. The whole 44px row height is the target and
 * the underline draws under the text only. Phone and email open their apps; web
 * links open in a new tab with an arrow (D-024); internal paths resolve through
 * href() and carry no arrow.
 */
export function ChannelLink({
  href,
  children,
  newTabHint = "opens in a new tab",
  className,
}: {
  href: string;
  children: React.ReactNode;
  /** Screen-reader text for web links, e.g. "opens map in a new tab". */
  newTabHint?: string;
  className?: string;
}) {
  const classes = cn("link-draw-parent inline-flex min-h-11 items-center gap-1.5 font-medium text-brand-700", className);
  const label = <span className="link-draw [overflow-wrap:anywhere]">{children}</span>;
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {label}
        <ArrowUpRight aria-hidden strokeWidth={1.75} className="size-4 shrink-0" />
        <span className="sr-only"> ({newTabHint})</span>
      </a>
    );
  }
  if (isExternal(href)) {
    return (
      <a href={href} className={classes}>
        {label}
      </a>
    );
  }
  return (
    <Link href={resolveHref(href)} className={classes}>
      {label}
    </Link>
  );
}

/*
 * Contact file rows (D-001), shared by the need directory and the sidebar so both
 * set labels and values the same way: a muted label column at least 4.5rem wide
 * (it grows for a longer label), 15px values, hairlines between rows, 44px rows.
 * The label sits above the value only when the panel is too narrow for the
 * longest email beside it (a container query on the wrapper), so an address
 * never breaks mid-word.
 */
export const fileList = "grid grid-cols-1 @[18.75rem]:grid-cols-[minmax(4.5rem,auto)_minmax(0,1fr)] @[18.75rem]:gap-x-3";
export const fileRow = "col-span-full grid grid-cols-subgrid items-start border-t border-line";
export const fileLabel = "flex items-center pt-2.5 type-small text-muted @[18.75rem]:min-h-11 @[18.75rem]:pt-0";
export const fileValue = "min-w-0 text-[0.9375rem] tabular";

/**
 * "Other ways to reach us" on /contact-us (D-054): a file panel beside the
 * message form, sticky from lg, listing only channels the directory above does
 * not. Every value comes from content/site.ts via content/contact.ts.
 */
export function ContactChannels({
  channels,
  className,
}: {
  channels: (typeof contactPage)["channels"];
  className?: string;
}) {
  const { phone, fax, address, answers } = channels;
  return (
    <aside aria-labelledby="channels-title" className={className}>
      {/* Same offset as the root scroll-padding, so the panel and the form card line up after a directory jump. */}
      <div className="rounded-md border border-line bg-surface lg:sticky lg:top-24">
        <h2 id="channels-title" className="border-b border-line px-6 py-5 type-h4">
          {channels.title}
        </h2>
        <div className="@container px-6 pt-1 pb-2">
          <dl className={cn(fileList, "[&>div:first-child]:border-t-0")}>
            <div className={fileRow}>
              <dt className={fileLabel}>{phone.label}</dt>
              <dd className={fileValue}>
                <ChannelLink href={phone.href}>{phone.value}</ChannelLink>
              </dd>
            </div>
            <div className={fileRow}>
              <dt className={fileLabel}>{fax.label}</dt>
              <dd className={cn(fileValue, "flex min-h-11 items-center text-ink-900")}>{fax.value}</dd>
            </div>
            <div className={fileRow}>
              <dt className={fileLabel}>{address.label}</dt>
              <dd className={fileValue}>
                <a
                  href={address.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw-parent inline-block min-h-11 py-2.5 font-medium text-brand-700"
                >
                  {address.lines.map((l, i) => (
                    <span key={l} className="block">
                      <span className="link-draw">{l}</span>
                      {/* Keeps "Suite 800, Orange" apart when the lines are read as one name. */}
                      {i < address.lines.length - 1 && <span className="sr-only">,</span>}
                      {/* The new-tab arrow follows the first line, as in the footer, even when that line wraps. */}
                      {i === 0 && (
                        <ArrowUpRight
                          aria-hidden
                          strokeWidth={1.75}
                          className="ml-1.5 inline-block size-4 align-[-0.1875em]"
                        />
                      )}
                    </span>
                  ))}
                  <span className="sr-only"> ({address.linkHint})</span>
                </a>
              </dd>
            </div>
            <div className={fileRow}>
              <dt className={fileLabel}>{answers.label}</dt>
              <dd className={fileValue}>
                <ChannelLink href={answers.href}>{answers.value}</ChannelLink>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </aside>
  );
}
