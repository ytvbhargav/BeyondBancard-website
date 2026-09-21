import { DEMO_MODE, MaybeConfirm } from "@/components/ui/confirm";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { BlockSection, type BlockProps } from "@/components/sections/solution/BlockSection";
import { cn } from "@/lib/utils";
import type { TableBlock, TableCell } from "@/types/content";

/**
 * Comparison table (D-058): the compared options across the top, row labels down
 * the side, in one white file panel split by hairlines (D-001). From md it is a real
 * <table> (sr-only caption, `th scope="col"` for options, `th scope="row"` for labels);
 * below md the same data is one card per option, each a label/value list, so nothing
 * scrolls sideways. Flagged cells are outlined in demo mode; production drops any row
 * with an unconfirmed cell (D-042), so no option is ever left with a gap.
 */
export function ComparisonTable({ block, tone, headingId }: BlockProps<TableBlock>) {
  const rows = block.rows.filter((r) => DEMO_MODE || r.cells.every((c) => !c.confirm));
  if (rows.length === 0) return null;
  // Small print under the panel (`note` is the client question on a flagged block, shown by the title marker).
  const note = block.footnote;
  // Shared by every cell so the label column and the options line up. Four or more
  // options share the md width, so their cells pad less there.
  const cellPad = block.columns.length >= 4 ? "px-4 py-4 lg:px-6" : "px-5 py-4 lg:px-6";

  return (
    <BlockSection block={block} tone={tone} headingId={headingId}>
      {/* No overflow-hidden on either panel: it would clip the CONFIRM tooltips of the top rows */}
      <Reveal className="hidden rounded-md border border-line bg-surface tabular md:block">
        {/* Fixed layout never widens a column to fit, so a long word (or zoomed text) breaks instead of spilling */}
        <table className="w-full table-fixed border-separate border-spacing-0 wrap-break-word">
          <caption className="sr-only">{block.title}</caption>
          {/* The short row labels get a fifth of the width and the options split the rest,
              so option text (the part read across) wraps less. */}
          <colgroup>
            <col className="w-1/5" />
            {block.columns.map((c) => (
              <col key={c} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {/* The corner above the row labels is a plain cell, so no header is left empty */}
              <td className="rounded-tl-md bg-paper" />
              {block.columns.map((c) => (
                <th
                  key={c}
                  scope="col"
                  className={cn("type-h4 bg-paper text-left align-bottom last:rounded-tr-md", cellPad)}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label}>
                <th
                  scope="row"
                  className={cn("type-small border-t border-line text-left align-top font-medium text-muted", cellPad)}
                >
                  {r.label}
                </th>
                {block.columns.map((c, i) => (
                  <td key={c} className={cn("border-t border-line align-top text-[0.9375rem] text-ink-900", cellPad)}>
                    <CellText cell={r.cells[i]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      <Stagger as="ul" className="grid gap-4 tabular wrap-break-word md:hidden">
        {block.columns.map((c, i) => (
          <StaggerItem as="li" key={c} className="rounded-md border border-line bg-surface">
            <h3 className="type-h4 rounded-t-md border-b border-line bg-paper px-5 py-4">{c}</h3>
            <dl className="px-5 py-1">
              {rows.map((r) => (
                <div key={r.label} className="border-t border-line py-3 first:border-t-0">
                  <dt className="type-small text-muted">{r.label}</dt>
                  <dd className="mt-1 text-[0.9375rem] text-ink-900">
                    <CellText cell={r.cells[i]} />
                  </dd>
                </div>
              ))}
            </dl>
          </StaggerItem>
        ))}
      </Stagger>

      {note && <p className="mt-5 max-w-[40rem] type-small text-muted">{note}</p>}
    </BlockSection>
  );
}

/** One cell's text, outlined with its client question in demo mode when flagged. */
function CellText({ cell }: { cell?: TableCell }) {
  if (!cell) return null;
  return <MaybeConfirm item={cell}>{cell.text}</MaybeConfirm>;
}
