import { Fragment } from "react";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { BlockSection, type BlockProps } from "@/components/sections/solution/BlockSection";
import { cn } from "@/lib/utils";
import type { CompareBlock } from "@/types/content";

type Column = CompareBlock["columns"][number];

/**
 * Two or three options side by side (D-058): one white file panel split by
 * hairlines, like the industry realities panel and the comparison table. A pair
 * meets at a small "vs" disc on the divider (decorative; screen readers hear
 * "versus" between the columns). Three columns (Level 1/2/3) sit side by side
 * from lg, where each keeps a readable measure, and stack below it; a pair sits
 * side by side from md.
 */
export function CompareColumns({ block, tone, headingId, index }: BlockProps<CompareBlock>) {
  const columns = block.columns;
  // A comparison needs two sides
  if (columns.length < 2) return null;
  const pair = columns.length === 2;
  const divider = pair ? "border-t md:border-t-0 md:border-l" : "border-t lg:border-t-0 lg:border-l";
  const note = block.footnote;

  return (
    <BlockSection block={block} tone={tone} headingId={headingId} index={index}>
      <Stagger
        className={cn("grid rounded-md border border-line bg-surface", pair ? "md:grid-cols-2" : "lg:grid-cols-3")}
      >
        {columns.map((column, i) => (
          <Fragment key={column.title}>
            {pair && i === 1 && <p className="sr-only">versus</p>}
            <StaggerItem
              className={cn(
                // Phone-only density pass (D-060): 20px inset below sm, today's 28/36px from sm up.
                // Stacked, a pair spends four padding edges on one panel, so this is the biggest win here.
                "relative border-line p-5 sm:p-7 md:p-9",
                // Stacked, the "vs" disc straddles the divider and hangs 20px into the column on
                // either side of it. Keep a little more room on a phone at both of those edges, so
                // it crowds neither the last line above it nor the title below it (D-060).
                pair && i === 0 && "pb-6 sm:pb-7 md:pb-9",
                pair && i === 1 && "pt-6 sm:pt-7 md:pt-9",
                i > 0 && divider,
              )}
            >
              {pair && i === 1 && (
                // Sits on the divider: the top rule when stacked, the middle of the vertical rule from md.
                // Paper on the white panel, so it reads as one small object on any section tone.
                <span
                  aria-hidden
                  className="absolute top-0 left-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-pill border border-line-strong bg-paper font-display type-small font-semibold text-ink-900 md:top-1/2 md:left-0"
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

/** One option: title, then subtitle, body and points when present. */
function ColumnCopy({ column }: { column: Column }) {
  const { title, subtitle, body, points } = column;

  return (
    <>
      <h3 className="type-h3">{title}</h3>
      {subtitle && <p className="mt-2 max-w-[30rem] type-body-lg text-ink-900">{subtitle}</p>}
      {body && <p className="mt-3 max-w-[30rem] text-muted">{body}</p>}
      {points && points.length > 0 && (
        // Phone-only density pass (D-060): tighter lead-in and row rhythm below sm
        <ul className="mt-5 max-w-[30rem] sm:mt-6">
          {points.map((point) => (
            <li key={point} className="flex gap-3 border-t border-line py-2.5 text-ink-900 sm:py-3">
              {/* Neutral dot, not a check: points describe an option, they don't endorse it */}
              <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-pill bg-brand-600" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
