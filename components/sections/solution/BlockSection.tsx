import { Section, SectionHeader } from "@/components/ui/section";
import { Confirm } from "@/components/ui/confirm";
import { cn } from "@/lib/utils";
import type { Flag } from "@/types/content";

export type BlockTone = "paper" | "surface";

/** Props every solution block component receives from `SolutionPage`. */
export type BlockProps<B> = {
  block: B;
  /** Background, alternated by the page so neighbouring sections never share a tone. */
  tone: BlockTone;
  /** Id for the section's h2; the section is labelled by it. */
  headingId: string;
};

/**
 * A block's title with its CONFIRM marker. A flagged block is dropped whole in
 * production (SolutionPage), so the marker only ever appears in demo mode and
 * sits beside the text: the heading never renders empty.
 */
export function BlockTitle({ title, flag }: { title: string; flag?: Flag }) {
  if (!flag?.confirm) return <>{title}</>;
  return (
    <>
      {title}
      <Confirm note={flag.note ?? "Section copy"} variant="marker">
        {null}
      </Confirm>
    </>
  );
}

/**
 * From lg the h2 column widens from SectionHeader's 40rem to 46rem. Solution
 * titles are long sentences, and at 40rem `text-wrap: balance` split them into
 * three lines with one short word alone in the middle ("The best checkout /
 * experience / connects both sides."). At 46rem they balance onto two lines.
 * The lead keeps its own 36rem measure, and phone widths do not change.
 */
const headerMeasure = "lg:[&>:first-child]:max-w-[46rem]";

/**
 * Standard solution section: tone, rhythm, container and a left-aligned header
 * (h2 + optional lead). Blocks with their own header layout use `Section` directly
 * with the same `headingId`.
 */
export function BlockSection({
  block,
  tone,
  headingId,
  space = "default",
  action,
  className,
  headerClassName,
  children,
}: BlockProps<Flag & { id?: string; title: string; lead?: string }> & {
  space?: "default" | "compact";
  action?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <Section id={block.id} tone={tone} space={space} aria-labelledby={headingId} className={className}>
      <SectionHeader
        id={headingId}
        title={<BlockTitle title={block.title} flag={block} />}
        lead={block.lead}
        action={action}
        className={cn(headerMeasure, headerClassName)}
      />
      {children}
    </Section>
  );
}
