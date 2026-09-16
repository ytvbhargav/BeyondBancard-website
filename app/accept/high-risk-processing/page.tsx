import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/Reveal";
import { UnderwritingCard } from "@/components/motion/UnderwritingCard";
import { PageHero } from "@/components/sections/PageHero";
import { RiskFactors } from "@/components/sections/RiskFactors";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { IndustryGrid } from "@/components/sections/IndustryGrid";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { highRisk, lifecycleSteps, riskFactors } from "@/content/high-risk";
import { highRiskFaqs } from "@/content/faqs";
import { featuredIndustries } from "@/content/industries";
import { cta } from "@/content/site";

export const metadata: Metadata = {
  title: "High-risk merchant accounts",
  description: highRisk.hero.lead,
};

export default function HighRiskPage() {
  return (
    <>
      <PageHero
        breadcrumb={highRisk.breadcrumb}
        title={highRisk.hero.title}
        lead={highRisk.hero.lead}
        actions={
          <>
            <Button href={cta.expert.href} arrow>
              {highRisk.hero.expertCta}
            </Button>
            <Button href={cta.apply.href} variant="secondary">
              {cta.apply.label}
            </Button>
          </>
        }
        visual={<UnderwritingCard {...highRisk.heroCard} mode="static" completed={2} />}
      />

      <RiskFactors title={highRisk.riskFactors.title} lead={highRisk.riskFactors.lead} items={riskFactors} />

      <Section tone="paper" aria-labelledby="philosophy-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-36">
              <h2 id="philosophy-title" className="type-h2">
                {highRisk.philosophy.title}
              </h2>
              <p className="type-body-lg mt-5 max-w-[30rem] text-muted">{highRisk.philosophy.body}</p>
            </div>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <FeatureGrid items={highRisk.philosophy.features} variant="rows" />
          </div>
        </div>
      </Section>

      <IndustryGrid title={highRisk.featured.title} lead={highRisk.featured.lead} industries={featuredIndustries} tone="surface" />

      <ProcessTimeline
        id="lifecycle"
        layout="scroll"
        tone="paper"
        title={highRisk.lifecycle.title}
        lead={highRisk.lifecycle.lead}
        steps={lifecycleSteps}
      />

      <RelatedLinks title={highRisk.related.title} links={highRisk.related.links} />

      <FaqSection title={highRisk.faq.title} faqs={highRiskFaqs} />
      <CtaBand />
    </>
  );
}
