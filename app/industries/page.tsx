import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/PageHero";
import { IndustryGrid } from "@/components/sections/IndustryGrid";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { AllIndustries } from "@/components/sections/AllIndustries";
import { CtaBand } from "@/components/sections/CtaBand";
import { featuredIndustries, industries, industriesHub } from "@/content/industries";
import { cta } from "@/content/site";

export const metadata: Metadata = {
  title: "Industries",
  description: industriesHub.hero.lead,
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        title={industriesHub.hero.title}
        lead={industriesHub.hero.lead}
        actions={
          <Button href={cta.expert.href} arrow>
            Talk to a payments expert
          </Button>
        }
      />

      <IndustryGrid title={industriesHub.featured.title} industries={featuredIndustries} size="lg" showViewAll={false} tone="surface" />

      <ProcessTimeline id="approach" layout="horizontal" tone="paper" title={industriesHub.approach.title} steps={industriesHub.approach.steps} />

      <AllIndustries title={industriesHub.all.title} industries={industries} />

      <section aria-labelledby="not-listed-title" className="bg-paper py-12 md:py-16">
        <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="not-listed-title" className="type-h3">
              {industriesHub.notListed.title}
            </h2>
            <p className="mt-2 text-muted">{industriesHub.notListed.body}</p>
          </div>
          <Button href={cta.expert.href} variant="secondary" arrow>
            {cta.expert.label}
          </Button>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
