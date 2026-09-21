import { Fragment } from "react";
import { DEMO_MODE, MaybeConfirm } from "@/components/ui/confirm";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { BlockSection, type BlockProps } from "@/components/sections/solution/BlockSection";
import { cn } from "@/lib/utils";
import type { CompareBlock } from "@/types/content";

type Column = CompareBlock["columns"][number];
type Part = "title" | "subtitle" | "body" | "points";

/** A column with nothing under its title: a flag on it can only mark the title. */
const titleOnly = (c: Column) => !c.subtitle && !c.body && !c.points?.length;

/**
 * Two or three options side by side (D-058): one white file panel split by
 * hairlines, like the industry realities panel and the comparison table. A pair
 * meets at a small "vs" disc on the divider (decorative; screen readers hear
 * "versus" between the columns). Three columns (Level 1/2/3) sit side by side
 * from lg, where each keeps a readable measure, and stack below it; a pair sits
 * side by side from md.
 */
export function CompareColumns({ block, tone, headingId }: BlockProps<CompareBlock>) {
  // Production drops a flagged title-only column: its title is the unconfirmed copy
  const columns = block.columns.filter((c) => DEMO_MODE || !(c.confirm && titleOnly(c)));
  // A comparison needs two sides
  if (columns.length < 2) return null;
  const pair = columns.length === 2;
  const divider = pair ? "border-t md:border-t-0 md:border-l" : "border-t lg:border-t-0 lg:border-l";
  // Small print under the panel (`note` is the client question on a flagged block, shown by the title marker).
  const note = block.footnote;

  return (
    <BlockSection block={block} tone={tone} headingId={headingId}>
      <Stagger
        className={cn("grid rounded-md border border-line bg-surface", pair ? "md:grid-cols-2" : "lg:grid-cols-3")}
      >
        {columns.map((column, i) => (
          <Fragment key={column.title}>
            {pair && i === 1 && <p className="sr-only">versus</p>}
            <StaggerItem className={cn("relative border-line p-7 md:p-9", i > 0 && divider)}>
              {pair && i === 1 && (
                // Sits on the divider: the top rule when stacked, the middle of the vertical rule from md.
                // Paper on the white panel, so it reads as one small object on any section tone.
                <span
                  aria-hidden
                  className="type-small absolute top-0 left-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-pill border border-line-strong bg-paper font-display font-semibold text-ink-900 md:top-1/2 md:left-0"
                >
                  vs
                </span>
              )}
              <ColumnCopy column={column} />
            </StaggerItem>
          </Fragment>
        ))}
      </Stagger>
      {note && <p className="mt-6 max-w-[40rem] text-muted">{note}</p>}
    </BlockSection>
  );
}

/**
 * One option: title, then subtitle, body and points when present. A column flag
 * outlines its most specific copy (the body, else the subtitle, else the points);
 * in production that copy is dropped with its wrapper, so no empty line is left.
 * A title-only column carries the flag as a marker on its title instead (dropped
 * whole in production by CompareColumns).
 */
function ColumnCopy({ column }: { column: Column }) {
  const { title, subtitle, body, points } = column;
  const flagOn: Part = body ? "body" : subtitle ? "subtitle" : points?.length ? "points" : "title";
  const shows = (part: Part) => !(column.confirm && !DEMO_MODE && part === flagOn);
  const flag = (part: Part, children: React.ReactNode) =>
    part === flagOn ? (
      <MaybeConfirm
        item={column}
        as={part === "points" ? "div" : "span"}
        variant={part === "title" ? "marker" : undefined}
      >
        {children}
      </MaybeConfirm>
    ) : (
      children
    );

  return (
    <>
      <h3 className="type-h3">{flag("title", title)}</h3>
      {subtitle && shows("subtitle") && (
        <p className="type-body-lg mt-2 max-w-[30rem] text-ink-900">{flag("subtitle", subtitle)}</p>
      )}
      {body && shows("body") && <p className="mt-3 max-w-[30rem] text-muted">{flag("body", body)}</p>}
      {points &&
        points.length > 0 &&
        shows("points") &&
        flag(
          "points",
          <ul className="mt-6 max-w-[30rem]">
            {points.map((point) => (
              <li key={point} className="flex gap-3 border-t border-line py-3 text-ink-900">
                {/* Neutral dot, not a check: points describe an option, they don't endorse it */}
                <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-pill bg-brand-600" />
                <span>{point}</span>
              </li>
            ))}
          </ul>,
        )}
    </>
  );
}
