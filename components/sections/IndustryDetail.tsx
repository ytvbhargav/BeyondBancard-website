import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CapabilityTabs } from "@/components/sections/CapabilityTabs";
import { ChecklistSection } from "@/components/sections/ChecklistSection";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { FaqSection } from "@/components/sections/FaqSection";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { CtaBand } from "@/components/sections/CtaBand";
import { industryPath } from "@/content/industries";
import { cta } from "@/content/site";
import type { Faq, IndustryDetailContent } from "@/types/content";

/** Page metadata for an industry detail page: its browser title, with the hero lead as the description. */
export function industryDetailMetadata(content: IndustryDetailContent): Metadata {
  return { title: content.meta.title, description: content.hero.lead };
}

/**
 * Industry detail page (PRD §9.4, the template for every industry page; D-057).
 * Hero, realities, business models, why Beyond, capabilities, account-health
 * checklist, process, FAQ, related industries and the closing band, all driven
 * by one `IndustryDetailContent` object. `visual` is the optional hero illustration.
 */
export function IndustryDetail({
  content,
  faqs,
  visual,
}: {
  content: IndustryDetailContent;
  faqs: Faq[];
  visual?: React.ReactNode;
}) {
  const { hero, realities, models, whyBeyond, capabilities, checklist, process, faq, related } = content;

  return (
    <>
      <PageHero
        breadcrumb={content.breadcrumb}
        title={hero.title}
        lead={hero.lead}
        actions={
          <>
            <Button href={cta.expert.href} arrow>
              {hero.expertCta ?? cta.expert.label}
            </Button>
            <Button href={cta.apply.href} variant="secondary">
              {cta.apply.label}
            </Button>
          </>
        }
        visual={visual}
      />

      <Section tone="paper" aria-labelledby="realities-title">
        <SectionHeader id="realities-title" title={realities.title} />
        <FeatureGrid items={realities.items} variant="panel" />
      </Section>

      <Section tone="surface" space="compact" aria-labelledby="models-title">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-4">
            <h2 id="models-title" className="type-h3">
              {models.title}
            </h2>
            <p className="mt-2 type-small text-muted">{models.disclaimer}</p>
          </div>
          {/* Chips are inline boxes, not flex items, so text-wrap: balance evens the rows (four RUO
              chips wrap 2 + 2, not 3 + 1 with one left alone). The li margins and the list's
              negative margin stand in for gap-2. Without balance support they wrap as before. */}
          {/* phone pass (D-063): below sm the chips are labels, not tap targets, so they drop to 36px
              (as ChipBand's static chips) with 12px sides. Short pairs then share a row at 390: Gaming
              6 rows -> 4, Travel 4 -> 3 (three rows of two), and every stacked band is 8px a chip shorter.
              py-1.5 pads the two CRB labels that wrap inside their chip at 320. sm: restores the 44px,
              16px-side chip with no vertical padding. */}
          <Reveal as="ul" className="-m-1 text-balance lg:col-span-8">
            {models.chips.map((c) => (
              <li key={c} className="m-1 inline-flex align-top">
                <Chip className="min-h-9 bg-paper px-3 py-1.5 sm:min-h-11 sm:px-4 sm:py-0">{c}</Chip>
              </li>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section tone="paper" aria-labelledby="why-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-36">
              <h2 id="why-title" className="type-h2">
                {whyBeyond.title}
              </h2>
              {whyBeyond.lead && <p className="type-body-lg mt-5 max-w-[28rem] text-muted">{whyBeyond.lead}</p>}
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <FeatureGrid items={whyBeyond.features} variant="rows" />
          </div>
        </div>
      </Section>

      <CapabilityTabs title={capabilities.title} items={capabilities.items} />

      <ChecklistSection title={checklist.title} lead={checklist.lead} items={checklist.items} />

      <ProcessTimeline id={process.id} layout="horizontal" tone="surface" title={process.title} steps={process.steps} />

      <FaqSection title={faq.title} faqs={faqs} />

      <RelatedLinks
        title={related.title}
        links={related.items.map((i) => ({ label: i.name, href: industryPath(i.slug) }))}
      />

      <CtaBand />
    </>
  );
}
