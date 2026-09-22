import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/Reveal";
import { BlockTitle, type BlockProps } from "@/components/sections/solution/BlockSection";
import { cn } from "@/lib/utils";
import type { StatementBlock } from "@/types/content";

/**
 * A single idea in a few sentences (D-058): the h2 (and optional lead) on the
 * left, the paragraphs on the right. The first paragraph carries the point at
 * body-lg in ink; any that follow are supporting copy in muted body text. From
 * lg the paragraphs sit under a strong hairline, as the rows do in ActionRows
 * (the same header-left, content-right shape), so the two read as one family.
 * Stacks below lg. An empty body renders the header alone.
 */
export function Statement({ block, tone, headingId }: BlockProps<StatementBlock>) {
  const [first, ...rest] = block.body;
  return (
    <Section id={block.id} tone={tone} aria-labelledby={headingId}>
      <div className="grid gap-5 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 id={headingId} className="type-h2 max-w-[20ch]">
            <BlockTitle title={block.title} flag={block} />
          </h2>
          {block.lead && <p className="type-body-lg mt-5 max-w-[28rem] text-muted">{block.lead}</p>}
        </div>
        {/* Short copy, so one reveal for the column rather than a stagger per paragraph */}
        {block.body.length > 0 && (
          <Reveal
            delay={0.1}
            className={cn(
              "lg:col-span-7 lg:col-start-6 lg:border-t lg:border-line-strong lg:pt-6",
              // Stacked, a muted body-lg lead would run straight into the ink body-lg first
              // paragraph and read as its weaker twin, so the hairline starts below lg too.
              block.lead && "border-t border-line-strong pt-6",
            )}
          >
            {first && <p className="type-body-lg max-w-[40rem] text-pretty text-ink-900">{first}</p>}
            {rest.map((p, i) => (
              <p key={i} className="mt-4 max-w-[40rem] text-pretty text-muted">
                {p}
              </p>
            ))}
          </Reveal>
        )}
      </div>
    </Section>
  );
}
