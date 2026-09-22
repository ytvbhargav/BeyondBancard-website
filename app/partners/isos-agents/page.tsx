import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { PageHero } from "@/components/sections/PageHero";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ProgramSteps } from "@/components/sections/ProgramSteps";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { PortalPreview } from "@/components/illustrations/PortalPreview";
import { isosAgents } from "@/content/isos-agents";
import { partnerFaqs } from "@/content/faqs";
import { cta, portals } from "@/content/site";

export const metadata: Metadata = {
  title: "ISO & agent partner program",
  description: isosAgents.hero.lead,
};

export default function IsosAgentsPage() {
  return (
    <>
      <PageHero
        tone="dark"
        breadcrumb={isosAgents.breadcrumb}
        title={isosAgents.hero.title}
        lead={isosAgents.hero.lead}
        actions={
          <>
            <Button href={cta.partner.href} arrow>
              {cta.partner.label}
            </Button>
            <Button href={portals.partner.href} variant="ghost-dark" className="sm:ml-3">
              {isosAgents.hero.portalCta}
            </Button>
          </>
        }
      />

      <Section tone="paper" aria-labelledby="audience-title">
        <SectionHeader id="audience-title" title={isosAgents.audience.title} />
        {/*
          phone pass (D-063): below sm the gap is gap-3, the cards p-5, and the icon (size-5) sits
          beside the title, as in FeatureGrid's panel items (D-060). From sm up the wrapper is a
          plain block, so gap-4, p-7, the size-6 icon and the title's mt-6 are exactly as before.
        */}
        <Stagger as="ul" className="grid gap-3 sm:gap-4 md:grid-cols-3">
          {isosAgents.audience.items.map((a) => (
            <StaggerItem as="li" key={a.title} className="rounded-md border border-line bg-surface p-5 sm:p-7">
              <div className="flex items-center gap-3 sm:block">
                {a.icon && <Icon name={a.icon} className="size-5 shrink-0 text-brand-600 sm:size-6" />}
                <h3 className="type-h3 sm:mt-6">{a.title}</h3>
              </div>
              <p className="mt-2 text-muted">{a.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="surface" aria-labelledby="benefits-title">
        <SectionHeader id="benefits-title" title={isosAgents.benefits.title} />
        <FeatureGrid items={isosAgents.benefits.items} variant="ruled" columns={3} />
      </Section>

      <ProgramSteps title={isosAgents.program.title} steps={isosAgents.program.steps} />

      <Section tone="ink" aria-labelledby="portal-title">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <h2 id="portal-title" className="type-h2 text-on-dark">
              {isosAgents.portal.title}
            </h2>
            <p className="type-body-lg mt-5 text-on-dark-muted">{isosAgents.portal.body}</p>
            <Button href={portals.partner.href} variant="secondary-dark" className="mt-8">
              {isosAgents.hero.portalCta}
            </Button>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.1}>
            <PortalPreview />
          </Reveal>
        </div>
      </Section>

      <Section tone="surface" aria-labelledby="programs-title">
        <SectionHeader id="programs-title" title={isosAgents.otherPrograms.title} />
        <Stagger as="ul" className="grid gap-4 md:grid-cols-2">
          {isosAgents.otherPrograms.items.map((p) => (
            <StaggerItem as="li" key={p.href}>
              <SpotlightCard href={p.href} title={p.title} body={p.body} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <FaqSection title={isosAgents.faq.title} faqs={partnerFaqs} />

      <CtaBand
        title={isosAgents.ctaBand.title}
        body={isosAgents.ctaBand.body}
        primary={cta.partner}
        secondary={{ label: isosAgents.ctaBand.secondaryLabel, href: "/contact-us" }}
      />
    </>
  );
}
