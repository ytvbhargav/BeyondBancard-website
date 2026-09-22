import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { HeroFile } from "@/components/illustrations/HeroFile";
import { SolutionHero } from "@/components/sections/solution/SolutionHero";
import { SolutionProgress } from "@/components/sections/solution/SolutionProgress";
import { ProcessSteps } from "@/components/sections/industry/ProcessSteps";
import { CapabilityExplorer } from "@/components/sections/industry/CapabilityExplorer";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import type { BlockTone } from "@/components/sections/solution/BlockSection";
import { FeaturesSection } from "@/components/sections/solution/FeaturesSection";
import { FlowDiagram } from "@/components/sections/solution/FlowDiagram";
import { HubDiagram } from "@/components/sections/solution/HubDiagram";
import { ChipBand } from "@/components/sections/solution/ChipBand";
import { CompareColumns } from "@/components/sections/solution/CompareColumns";
import { ComparisonTable } from "@/components/sections/solution/ComparisonTable";
import { Statement } from "@/components/sections/solution/Statement";
import { SolutionCards } from "@/components/sections/solution/SolutionCards";
import { ActionRows } from "@/components/sections/solution/ActionRows";
import { QuestionList } from "@/components/sections/solution/QuestionList";
import { CostEstimator } from "@/components/sections/solution/CostEstimator";
import { EnvironmentSelector } from "@/components/sections/solution/EnvironmentSelector";
import { CalloutBand } from "@/components/sections/solution/CalloutBand";
import { PillarLinks } from "@/components/sections/solution/PillarLinks";
import { cta } from "@/content/site";
import type { SolutionBlock, SolutionPageContent } from "@/types/content";

/** Browser title (the menu label) and description (the hero lead unless set). */
export function solutionMetadata(content: SolutionPageContent): Metadata {
  return { title: content.meta.title, description: content.meta.description ?? content.hero.lead };
}

/** Chapter backgrounds alternate, so neighbouring chapters never share a tone. */
const tones: BlockTone[] = ["surface", "paper"];

function Block({ block, index, tone }: { block: SolutionBlock; index: number; tone: BlockTone }) {
  const headingId = `${block.id ?? `section-${index + 1}`}-title`;
  const props = { tone, headingId, index };
  switch (block.kind) {
    case "features":
      return <FeaturesSection block={block} {...props} />;
    case "steps":
      // The stepper from the industry pages: the sequence is always whole, never cut off the side.
      return (
        <ProcessSteps
          id={block.id ?? `section-${index + 1}`}
          title={block.title}
          lead={block.lead}
          steps={block.steps}
        />
      );
    case "flow":
      return <FlowDiagram block={block} {...props} />;
    case "hub":
      return <HubDiagram block={block} {...props} />;
    case "chips":
      return <ChipBand block={block} {...props} />;
    case "compare":
      return <CompareColumns block={block} {...props} />;
    case "table":
      return <ComparisonTable block={block} {...props} />;
    case "statement":
      return <Statement block={block} {...props} />;
    case "cards":
      return <SolutionCards block={block} {...props} />;
    case "actions":
      return <ActionRows block={block} {...props} />;
    case "questions":
      return <QuestionList block={block} {...props} />;
    case "estimator":
      return <CostEstimator block={block} {...props} />;
    case "selector":
      return <EnvironmentSelector block={block} {...props} />;
    case "callout":
      return <CalloutBand block={block} {...props} />;
    case "capabilities":
      return <CapabilityExplorer title={block.title} items={block.items} />;
  }
}

/** Consecutive blocks that share one band: a run of callouts, or any other block on its own. */
type Band = { start: number; blocks: SolutionBlock[] };

function toBands(blocks: SolutionBlock[]): Band[] {
  const bands: Band[] = [];
  blocks.forEach((block, i) => {
    const prev = bands.at(-1);
    if (prev && block.kind === "callout" && prev.blocks.at(-1)?.kind === "callout") prev.blocks.push(block);
    else bands.push({ start: i, blocks: [block] });
  });
  return bands;
}

/**
 * Solutions hub and solution detail template (D-058). Hero with an optional
 * underwriting-file illustration, the page's blocks in live-page order, then
 * related solutions, the other three pillars, the FAQ and the closing band.
 * Section backgrounds alternate from the hero down, per band: consecutive
 * callouts (Invoicing + payment links, Invoicing + ACH) share one band and tone,
 * 24px apart, instead of striping the page with near-identical compact bands.
 * When the last block is a chips band, the other pillars come before related
 * solutions (as on live B2B and International payments), so the static chips
 * never sit directly on the related chip links. A flagged block (whole-block
 * `confirm`) is shown with a marker in demo mode and dropped in production (D-042).
 */
export function SolutionPage({ content }: { content: SolutionPageContent }) {
  const { hero, related, bigPicture, faq } = content;
  const blocks = content.blocks;
  const bands = toBands(blocks);
  const hasRelated = Boolean(related && related.links.length > 0);
  const pillarsFirst = blocks.at(-1)?.kind === "chips";
  const hasPillars = Boolean(content.pillar && content.bigPicture);
  const toneAt = (i: number) => tones[i % tones.length];
  // The closing sections (related, the pillar row, the FAQ) stay light, so the page
  // settles before the closing band.
  const lightToneAt = (i: number) => (i % 2 === 0 ? "surface" : "paper") as "surface" | "paper";
  // The nodes of the progress rail: one per chapter, in page order.
  const chapters = blocks.map((block, i) => ({
    id: `${block.id ?? `section-${i + 1}`}-title`,
    title: block.title,
  }));
  // After the bands come related solutions and the lifecycle row, in that order unless
  // `pillarsFirst`, then the FAQ. Tones keep alternating, skipping whichever is absent.
  let after = bands.length;
  const take = () => lightToneAt(after++);
  const order = pillarsFirst ? (["pillars", "related"] as const) : (["related", "pillars"] as const);
  const sectionTones: { related?: "surface" | "paper"; pillars?: "surface" | "paper" } = {};
  for (const key of order) {
    if (key === "related" && !hasRelated) continue;
    if (key === "pillars" && !hasPillars) continue;
    sectionTones[key] = take();
  }
  const relatedTone = sectionTones.related ?? "surface";
  const pillarsTone = sectionTones.pillars ?? "surface";
  const faqTone = lightToneAt(after);

  const relatedLinks =
    related && hasRelated ? <RelatedLinks title={related.title} links={related.links} tone={relatedTone} /> : null;
  // Partner pages sit outside the four pillars, so they have no lifecycle row.
  const pillar = content.pillar;
  const pillarLinks =
    pillar && bigPicture ? (
      <PillarLinks
        pillar={pillar}
        title={bigPicture.title}
        lead={bigPicture.lead}
        tone={pillarsTone}
        isHub={content.kind === "hub"}
      />
    ) : null;
  const partnerCtas = hero.ctas === "partner";

  return (
    <>
      <SolutionProgress sections={chapters} />

      <SolutionHero
        pillar={content.pillar}
        kind={content.kind}
        breadcrumb={content.breadcrumb}
        title={hero.title}
        lead={hero.lead}
        actions={
          <>
            {/* The longest label ("Talk to an international payments expert") is wider than a 390px
                phone's column: let it wrap to two balanced lines in a taller pill rather than widen
                the hero. One line stays exactly 48px (py-3 + 24px line), like the size-md button. */}
            <Button
              href={partnerCtas ? cta.partner.href : cta.expert.href}
              arrow
              className="h-auto min-h-12 py-3 text-center text-balance whitespace-normal"
            >
              {partnerCtas ? cta.partner.label : (hero.expertCta ?? cta.expert.label)}
            </Button>
            <Button href={partnerCtas ? cta.expert.href : cta.apply.href} variant="secondary">
              {partnerCtas ? cta.expert.label : cta.apply.label}
            </Button>
          </>
        }
        visual={hero.visual ? <HeroFile {...hero.visual} /> : undefined}
      />

      {bands.map((band, b) => {
        const items = band.blocks.map((block, j) => (
          <Block key={`${block.kind}-${band.start + j}`} block={block} index={band.start + j} tone={toneAt(b)} />
        ));
        if (items.length === 1) return items[0];
        // A callout run: tighten the padding between its sections (12px + 12px) so the panels sit
        // as a pair on one band; the outer edges keep the compact section rhythm.
        return (
          <div
            key={`callouts-${band.start}`}
            className="[&>section:not(:first-child)]:pt-3 [&>section:not(:last-child)]:pb-3"
          >
            {items}
          </div>
        );
      })}

      {!pillarsFirst && relatedLinks}

      {pillarLinks}

      {pillarsFirst && relatedLinks}

      <FaqSection title={faq.title} faqs={faq.items} tone={faqTone} />

      <CtaBand />
    </>
  );
}
