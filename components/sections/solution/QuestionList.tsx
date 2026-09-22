import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { BlockSection, type BlockProps } from "@/components/sections/solution/BlockSection";
import { cn } from "@/lib/utils";
import type { QuestionsBlock } from "@/types/content";

/**
 * Questions a team asks, set as quotes (D-058): a ruled list, one column below
 * md and two from md, under a strong top rule with hairlines between the quotes,
 * as in ActionRows and the rows of the file. Archivo at h3 scale but semibold,
 * so the quotes read as voices rather than headings; they are list items, not
 * h3s, because nothing sits under them. The content strings carry their own
 * quotation marks. The optional body answers them and closes the section in
 * body-lg ink.
 */
export function QuestionList({ block, tone, headingId, index }: BlockProps<QuestionsBlock>) {
  return (
    <BlockSection block={block} tone={tone} headingId={headingId} index={index}>
      <Stagger as="ul" className="grid gap-x-8 md:grid-cols-2">
        {block.items.map((quote, i) => (
          <StaggerItem
            as="li"
            key={quote}
            className={cn(
              "type-h3 border-b border-line py-5 font-semibold text-balance text-ink-900 md:py-6",
              // Strong top rule on the first row only: the first item, and the second once there are two columns
              i === 0 && "border-t border-t-line-strong",
              i === 1 && "md:border-t md:border-t-line-strong",
            )}
          >
            {quote}
          </StaggerItem>
        ))}
      </Stagger>
      {block.body && (
        <Reveal as="p" delay={0.1} className="type-body-lg mt-8 max-w-[40rem] text-pretty text-ink-900 md:mt-10">
          {block.body}
        </Reveal>
      )}
    </BlockSection>
  );
}
