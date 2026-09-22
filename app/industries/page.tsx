import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { IndustriesHero } from "@/components/sections/industry/IndustriesHero";
import { FeaturedIndex } from "@/components/sections/industry/FeaturedIndex";
import { ProcessSteps } from "@/components/sections/industry/ProcessSteps";
import { CtaBand } from "@/components/sections/CtaBand";
import { featuredIndustries, industriesHub, industryPath } from "@/content/industries";
import { industryImages } from "@/content/industry-images";
import { cta } from "@/content/site";

export const metadata: Metadata = {
  title: "Industries",
  description: industriesHub.hero.lead,
};

export default function IndustriesPage() {
  const featured = featuredIndustries.map((industry) => ({
    slug: industry.slug,
    name: industry.name,
    teaser: industry.teaser,
    href: industryPath(industry.slug),
    // The lead photograph of that industry's own hero, so the two pages show
    // the reader the same picture of the same business.
    image: industryImages[industry.slug]?.[0],
  }));

  return (
    <>
      <IndustriesHero
        title={industriesHub.hero.title}
        lead={industriesHub.hero.lead}
        names={featured.map(({ name, href }) => ({ name, href }))}
      />

      <FeaturedIndex title={industriesHub.featured.title} entries={featured} />

      <ProcessSteps id="approach" title={industriesHub.approach.title} steps={industriesHub.approach.steps} />

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
