import { Chip } from "@/components/ui/chip";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/Reveal";
import { BlockTitle, ChapterMark, type BlockProps } from "@/components/sections/solution/BlockSection";
import { cn } from "@/lib/utils";
import type { ChipsBlock } from "@/types/content";

/**
 * "Where this fits" band (D-058), the industry template's business-models band
 * reused: a compact section with the title (h2 at h3 scale), optional lead and
 * small-print note on the left, static chips on the right. The split is 4/8 for
 * a title and short note; a lead (Payment gateways has two sentences) widens the
 * text to 5/7 so it doesn't run to a tall, narrow column.
 *
 * The chips are labels, not controls, so they don't borrow the outlined 44px
 * pill of `ChipLink` / `ChipToggle`: no outline, 36px tall, filled with the
 * tone opposite the section so they still read as objects on either background.
 * Like the industry band, they are inline boxes rather than flex items, so
 * text-wrap: balance evens the rows (six chips that overflow the column wrap
 * 3 + 3, not 5 + 1 with the last one left alone). The li margins and the
 * list's negative margin stand in for gap-2. Without balance support they wrap
 * as before.
 */
export function ChipBand({ block, tone, headingId, index }: BlockProps<ChipsBlock>) {
  return (
    <Section id={block.id} tone={tone} space="compact" aria-labelledby={headingId}>
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        <div className={block.lead ? "lg:col-span-5" : "lg:col-span-4"}>
          <ChapterMark index={index} />
          <h2 id={headingId} className="type-h3">
            <BlockTitle title={block.title} flag={block} />
          </h2>
          {block.lead && <p className="mt-2 max-w-[36rem] text-pretty text-muted">{block.lead}</p>}
          {block.footnote && <p className="mt-2 max-w-[36rem] type-small text-pretty text-muted">{block.footnote}</p>}
        </div>
        <Reveal as="ul" className={cn("-m-1 text-balance", block.lead ? "lg:col-span-7" : "lg:col-span-8")}>
          {block.chips.map((c) => (
            <li key={c} className="m-1 inline-flex align-top">
              <Chip
                className={cn(
                  "min-h-9 border-transparent px-3.5 py-1.5",
                  tone === "surface" ? "bg-paper" : "bg-surface",
                )}
              >
                {c}
              </Chip>
            </li>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
