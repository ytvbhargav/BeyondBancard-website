import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { BlockTitle, type BlockProps } from "@/components/sections/solution/BlockSection";
import { cn } from "@/lib/utils";
import type { ActionsBlock } from "@/types/content";

/**
 * "If this, go there" rows (D-058): the h2 (and optional lead) on the left, a
 * ruled list on the right in the file-row style, each row a prompt (h3) and a
 * ghost arrow link to the page that answers it. The link stretches over its row
 * (the PostRow pattern), so the whole row is one target: hovering anywhere draws
 * the underline and nudges the arrow, and the focus ring moves out to the row.
 * The link text names the destination and the prompt describes it, so the link
 * still makes sense out of context. Prompt above link below sm, side by side
 * from sm; the header stacks above the rows below lg, as in Statement.
 */
export function ActionRows({ block, tone, headingId }: BlockProps<ActionsBlock>) {
  return (
    <Section id={block.id} tone={tone} aria-labelledby={headingId}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 id={headingId} className="type-h2 max-w-[20ch]">
            <BlockTitle title={block.title} flag={block} />
          </h2>
          {block.lead && <p className="type-body-lg mt-5 max-w-[28rem] text-muted">{block.lead}</p>}
        </div>
        <Stagger as="ul" className="border-t border-line-strong lg:col-span-7 lg:col-start-6">
          {block.rows.map((row, i) => {
            const promptId = `${headingId}-prompt-${i + 1}`;
            return (
              <StaggerItem
                as="li"
                key={row.prompt}
                // The 48px link sets the row height (68px from sm); below sm the padding
                // balances the space the link's own hit area leaves under its label.
                className="relative flex flex-col items-start border-b border-line pt-5 pb-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-2.5"
              >
                <h3 id={promptId} className="type-h4">
                  {row.prompt}
                </h3>
                <Button
                  href={row.link.href}
                  variant="ghost"
                  arrow
                  aria-describedby={promptId}
                  className={cn(
                    // `static` so the ::after stretches over the row (the li), not just the link
                    "link-draw-parent static after:absolute after:inset-0 after:rounded-sm",
                    // The ghost variant still sets translate/scale on hover and press, and any value
                    // but none makes the link the containing block of its own ::after: the hit area
                    // would shrink to the label under the pointer and hover would flicker. twMerge
                    // swaps them for `none`.
                    "hover:translate-none active:translate-none active:scale-none",
                    // A long label wraps instead of overflowing the row (the base is nowrap, 48px tall, unshrinkable)
                    "h-auto min-h-12 shrink whitespace-normal text-left",
                    "focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-(--color-focus)",
                  )}
                >
                  {row.link.label}
                </Button>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </Section>
  );
}
