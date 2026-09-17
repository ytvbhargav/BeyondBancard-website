import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DEMO_MODE, MaybeConfirm } from "@/components/ui/confirm";
import { cn } from "@/lib/utils";
import type { CompanyFileContent } from "@/content/about";

/**
 * The company file (spec §3.1): the underwriting file (D-001) applied to Beyond itself,
 * and a sibling of the UnderwritingCard, with the same label/value rows. Every value is
 * a fact rather than an example, so it carries no "Example" label. One <dl>: company
 * facts, then the sponsor banks from the disclosure (PRD §8.5) on a paper strip, like
 * the card's checks. A second sheet sits offset behind it so the panel reads as a file.
 */
export function CompanyFile({
  name,
  kind,
  status,
  facts,
  banksLabel,
  banks,
  className,
}: CompanyFileContent & { className?: string }) {
  // Production drops unconfirmed rows whole (D-042), so no label is left without its value.
  const rows = facts.filter((f) => !f.confirm || DEMO_MODE);
  return (
    <div className={cn("relative w-full", className)}>
      {/* The sheet underneath: a white page with a firmer edge, so its lip reads as paper and not as a border */}
      <div
        aria-hidden
        className="absolute inset-x-4 top-4 -bottom-3 rounded-md border border-line-strong bg-surface shadow-float"
      />

      <div
        role="group"
        aria-label={`${name} ${kind.toLowerCase()}`}
        className="relative rounded-md border border-line bg-surface text-ink-900 shadow-press"
      >
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-5 pt-5 pb-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="grid size-10 shrink-0 place-items-center rounded-sm bg-brand-600 type-h3 leading-none font-extrabold text-white"
            >
              B
            </span>
            <div>
              <p className="type-h4">{name}</p>
              <p className="type-small text-muted">{kind}</p>
            </div>
          </div>
          {/* One calm pulse once the card has risen in, the same moment as the homepage's Approved pill */}
          <span className="approved-pulse inline-flex rounded-pill" style={{ animationDelay: "var(--duration-slow)" }}>
            <Badge status="approved">{status}</Badge>
          </span>
        </div>

        {/* Rows are direct children of the <dl> (a nested wrapper would break dt/dd grouping) */}
        <dl className="border-t border-line pt-1.5">
          {rows.map((f) => (
            <div
              key={f.label}
              className="mx-5 flex items-baseline justify-between gap-4 border-t border-line py-2.5 first:border-t-0 sm:mx-6"
            >
              <dt className="type-small text-muted">{f.label}</dt>
              <dd className="text-right text-[0.9375rem] font-medium tabular">
                <MaybeConfirm item={f} variant="marker">
                  {f.href ? (
                    // The value is the link (as in the footer): negative margins keep the row height while the hit area reaches 44px.
                    <a
                      href={f.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-draw-parent -my-3 inline-flex items-center gap-1 py-3 text-brand-700"
                    >
                      <span className="link-draw">{f.value}</span>
                      <ArrowUpRight aria-hidden strokeWidth={1.75} className="size-4 shrink-0" />
                      <span className="sr-only"> ({f.linkHint ?? "opens in a new tab"})</span>
                    </a>
                  ) : (
                    f.value
                  )}
                </MaybeConfirm>
              </dd>
            </div>
          ))}

          <div className="mt-1.5 rounded-b-md border-t border-line bg-paper px-5 pt-4 pb-1.5 sm:px-6">
            <dt className="type-small font-medium">{banksLabel}</dt>
            <dd>
              <ul className="mt-1.5">
                {banks.map((b) => (
                  <li
                    key={b.name}
                    className="flex items-baseline justify-between gap-4 border-t border-line py-2.5 first:border-t-0"
                  >
                    <span className="text-[0.9375rem] font-medium">{b.name}</span>
                    <span className="sr-only">, </span>
                    <span className="text-right type-small text-muted">{b.location}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
