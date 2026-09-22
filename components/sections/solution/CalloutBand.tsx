import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/Reveal";
import { BlockTitle, type BlockProps } from "@/components/sections/solution/BlockSection";
import { cn } from "@/lib/utils";
import type { CalloutBlock } from "@/types/content";

/**
 * A compact band with one onward link (D-058): "Need the device too?", the
 * Invoicing + payment links and Invoicing + ACH bands. One panel, opposite in
 * tone to the section so it reads as an object on either background, with the
 * h2 (at h3 scale) and copy on the left and a secondary arrow button on the right.
 * The row wraps rather than switching at a fixed breakpoint: the copy keeps at
 * least 24rem, so everything stacks below md, a short label moves beside the
 * copy from about 820px and the longest ("See payment links under Online
 * payments") from about 950px, so every current label sits beside it from lg.
 * That is looser than spec §4's "stacks below md" on purpose: side by side at
 * 768px would squeeze the copy to about 190px. Below sm the button spans the
 * panel and its label may wrap to two balanced lines, so it never overflows at
 * 390px.
 */
export function CalloutBand({ block, tone, headingId }: BlockProps<CalloutBlock>) {
  return (
    <Section id={block.id} tone={tone} space="compact" aria-labelledby={headingId}>
      <Reveal
        className={cn(
          // phone pass (D-063): the 20px inset of the D-060 file panels (FeatureGrid, CompareColumns) and a matching
          // 20px copy-to-button gap below sm; sm:p-7 and sm:gap-y-6 restore today's values, md:p-9 unchanged.
          "flex flex-wrap items-center justify-between gap-x-10 gap-y-5 rounded-md border border-line p-5 sm:gap-y-6 sm:p-7 md:p-9",
          tone === "surface" ? "bg-paper" : "bg-surface",
        )}
      >
        <div className="min-w-0 grow basis-96">
          <h2 id={headingId} className="type-h3 max-w-[36rem] text-ink-900">
            <BlockTitle title={block.title} flag={block} />
          </h2>
          {/* `lead` comes with every block; a callout's copy is normally `body`, and either is shown */}
          {block.lead && <p className="mt-3 max-w-[36rem] text-pretty text-muted">{block.lead}</p>}
          {block.body && <p className="mt-3 max-w-[36rem] text-pretty text-muted">{block.body}</p>}
        </div>
        <Button
          href={block.link.href}
          variant="secondary"
          arrow
          // Full width below sm; the label may wrap there, so the pill grows in height instead. py-2.5 keeps
          // one line at exactly 48px (20 + 24 + 3 border, lifted by min-h-12) like the other buttons;
          // max-w-full caps a long label at the panel width from sm up, where it would otherwise overflow.
          className="h-auto min-h-12 w-full max-w-full py-2.5 text-center text-balance whitespace-normal sm:w-auto"
        >
          {block.link.label}
        </Button>
      </Reveal>
    </Section>
  );
}
