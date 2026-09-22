import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/Reveal";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { BlockSection, BlockTitle, type BlockProps } from "@/components/sections/solution/BlockSection";
import type { FeaturesBlock } from "@/types/content";

/**
 * Feature set (D-004 structures). `split` is the "why Beyond" layout from the
 * industry template: sticky title and lead on the left, rows on the right.
 * `panel` and `ruled` pick two or three columns from the item count.
 */
export function FeaturesSection({ block, tone, headingId, index }: BlockProps<FeaturesBlock>) {
  if (block.layout === "split") {
    return (
      <Section id={block.id} tone={tone} aria-labelledby={headingId}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-36">
              <h2 id={headingId} className="type-h2">
                <BlockTitle title={block.title} flag={block} />
              </h2>
              {block.lead && <p className="type-body-lg mt-5 max-w-[28rem] text-muted">{block.lead}</p>}
            </div>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <FeatureGrid items={block.items} variant="rows" />
          </div>
        </div>
      </Section>
    );
  }

  const columns = block.items.length % 3 === 0 && block.items.length > 3 ? 3 : 2;
  // The panel is a white file object (D-001); on a surface section it takes the
  // opposite tone so it still reads as an object, like ChipBand/CalloutBand/SolutionCards.
  const panelBg = block.layout === "panel" && tone === "surface" ? "bg-paper" : undefined;
  return (
    <BlockSection block={block} tone={tone} headingId={headingId} index={index}>
      <FeatureGrid items={block.items} variant={block.layout} columns={columns} className={panelBg} />
    </BlockSection>
  );
}
