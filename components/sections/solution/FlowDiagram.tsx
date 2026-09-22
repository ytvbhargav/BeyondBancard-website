import { ArrowRight } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import { MaybeConfirm } from "@/components/ui/confirm";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { BlockSection, type BlockProps } from "@/components/sections/solution/BlockSection";
import { duration, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { FlowBlock } from "@/types/content";

/**
 * Flow diagram (D-058, the live `p-arch` chain): an ordered list of stages
 * joined by arrows, the `focus` stage set on ink. Below lg a centred vertical
 * stack with down arrows; from lg one row of equal columns with the arrows in
 * the gaps. Six or seven stages switch to the dense sizes: narrower gaps and
 * padding (6px at lg), and a 14px label at lg (15px at xl), so the longest
 * single word in the content ("Authentication") still fits a column at 1024px
 * with a scrollbar. Labels wrap (balanced) and break only as a last resort, so
 * zoom or user text spacing never pushes a tile past its column. The space
 * before a slash is a no-break space, so a line breaks after the slash and
 * never opens with one ("Authentication /" + "risk"). Tiles and tag
 * chips take the background opposite to the section, so a chain on white still
 * reads as tiles. The focus label is a <strong>, so the emphasis is not visual
 * only. Stages stagger in; each arrow fades in after the stage it leads to.
 */
export function FlowDiagram({ block, tone, headingId, index }: BlockProps<FlowBlock>) {
  const { nodes } = block;
  const dense = nodes.length >= 6;
  const tags = block.tags ?? [];
  const showNote = Boolean(block.footnote);
  // Opposite background to the section, as on the chip bands
  const tileBg = tone === "surface" ? "bg-paper" : "bg-surface";

  return (
    <BlockSection block={block} tone={tone} headingId={headingId} index={index}>
      <div className="mx-auto max-w-[28rem] lg:max-w-none">
        <Stagger
          as="ol"
          className={cn(
            "flex flex-col lg:grid lg:auto-cols-fr lg:grid-flow-col",
            dense ? "lg:gap-x-5 xl:gap-x-8" : "lg:gap-x-10",
          )}
        >
          {nodes.map((node, i) => {
            const focus = block.focus === i;
            // Glue each slash to the word before it, so no line opens with "/"
            const label = node.label.replace(/ \//g, "\u00A0/");
            return (
              <StaggerItem as="li" key={node.label} className="relative flex flex-col lg:block">
                <div
                  className={cn(
                    "flex min-h-14 flex-col justify-center rounded-sm border px-4 py-3.5 text-center lg:h-full lg:min-h-20",
                    dense ? "lg:px-1.5 lg:py-4 xl:px-3" : "lg:px-4 lg:py-5 xl:px-5",
                    focus
                      ? "border-ink-900 bg-ink-900 text-on-dark shadow-float forced-colors:border-2"
                      : `border-line text-ink-900 ${tileBg}`,
                  )}
                >
                  <span
                    className={cn(
                      "block font-display text-[1.0625rem] leading-snug font-semibold text-balance wrap-break-word [font-stretch:108%]",
                      dense
                        ? "lg:text-[0.875rem] lg:[font-stretch:100%] xl:text-[0.9375rem] xl:[font-stretch:104%]"
                        : "lg:text-[0.9375rem] lg:[font-stretch:104%] xl:text-[1.0625rem]",
                    )}
                  >
                    <span className="sr-only">
                      Stage {i + 1} of {nodes.length}:{" "}
                    </span>
                    {focus ? <strong className="font-semibold">{label}</strong> : label}
                  </span>
                  {node.detail && (
                    <span className={cn("mt-1 block type-small", focus ? "text-on-dark-muted" : "text-muted")}>
                      {node.detail}
                    </span>
                  )}
                </div>
                {i < nodes.length - 1 && <Connector index={i} dense={dense} />}
              </StaggerItem>
            );
          })}
        </Stagger>

        {(tags.length > 0 || showNote) && (
          <Reveal delay={duration.base} className="mt-8 lg:mt-10">
            {tags.length > 0 && (
              <ul className="flex flex-wrap justify-center gap-2 lg:justify-start">
                {tags.map((t) => (
                  <li key={t}>
                    <Chip className={tileBg}>{t}</Chip>
                  </li>
                ))}
              </ul>
            )}
            {showNote && (
              <p
                className={cn(
                  "mx-auto max-w-[40rem] text-center type-small text-muted lg:mx-0 lg:text-left",
                  tags.length > 0 && "mt-5",
                )}
              >
                <MaybeConfirm item={block.footnoteFlag ?? {}}>{block.footnote}</MaybeConfirm>
              </p>
            )}
          </Reveal>
        )}
      </div>
    </BlockSection>
  );
}

/**
 * Arrow to the next stage (aria-hidden: the list order carries the sequence).
 * Below lg a down arrow in the space under the tile; from lg a right arrow
 * centred in the column gap, its width matching the gap. It stays hidden while
 * the list is (the Stagger's hidden state in globals.css) and fades in once
 * the stage after it has started; reduced motion shows it at once.
 */
function Connector({ index, dense }: { index: number; dense: boolean }) {
  const delay = Math.round(((index + 1) * stagger.base + duration.base) * 1000);
  return (
    <span
      aria-hidden
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "flex h-9 items-center justify-center text-muted",
        "lg:absolute lg:top-1/2 lg:left-full lg:h-auto lg:-translate-y-1/2",
        dense ? "lg:w-5 xl:w-8" : "lg:w-10",
        "transition-opacity duration-(--duration-base) ease-out",
        "motion-safe:[.js_[data-stagger]:not([data-shown])_&]:opacity-0",
      )}
    >
      <ArrowRight strokeWidth={1.75} className={cn("size-5 rotate-90 lg:rotate-0", dense && "lg:size-4 xl:size-5")} />
    </span>
  );
}
