import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { DEMO_MODE } from "@/components/ui/confirm";
import { Section, SectionHeader } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { PageHero } from "@/components/sections/PageHero";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PartnerPortalBand } from "@/components/sections/PartnerPortalBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { partners } from "@/content/partners";
import { partnerFaqs } from "@/content/faqs";
import { cta } from "@/content/site";

export const metadata: Metadata = {
  // The menu label; the layout template adds "| Beyond Bancard".
  title: "Partner programs",
  description: partners.hero.lead,
};

export default function PartnersPage() {
  // Production drops unconfirmed benefits whole (D-042), so no heading is left without its body.
  const benefits = partners.benefits.items.filter((f) => !f.confirm || DEMO_MODE);

  return (
    <>
      {/* No breadcrumb: the hub is the top of its menu, like the Industries hub, and a one-item trail reads as an eyebrow (D-003) */}
      <PageHero
        tone="dark"
        title={partners.hero.title}
        lead={partners.hero.lead}
        actions={
          <>
            <Button href={cta.partner.href} arrow>
              {cta.partner.label}
            </Button>
            <Button href={partners.portal.login.href} variant="ghost-dark" className="sm:ml-3">
              {partners.portal.login.label}
            </Button>
          </>
        }
      />

      <Section tone="paper" aria-labelledby="programs-title">
        <SectionHeader id="programs-title" title={partners.programs.title} />
        {/* One column of compact choices below lg (height follows the content); three tall cards from lg */}
        <Stagger as="ul" className="grid gap-4 lg:grid-cols-3">
          {partners.programs.items.map((p) => (
            <StaggerItem as="li" key={p.href}>
              <SpotlightCard href={p.href} title={p.label} body={p.description} size="lg" headingLevel="h3" className="min-h-0 md:min-h-0 lg:min-h-72" />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="surface" aria-labelledby="benefits-title">
        {/* Same 4 / 7 split as the FAQ below, so the two sections share one left edge for their content */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <SectionHeader id="benefits-title" title={partners.benefits.title} className="mb-0 md:mb-0 lg:col-span-4 lg:self-start" />
          <FeatureGrid items={benefits} variant="ruled" columns={2} className="lg:col-span-7 lg:col-start-6" />
        </div>
      </Section>

      <PartnerPortalBand {...partners.portal} />

      <FaqSection title={partners.faq.title} faqs={partnerFaqs} tone="surface" />

      <CtaBand
        title={partners.ctaBand.title}
        body={partners.ctaBand.body}
        primary={cta.partner}
        secondary={partners.ctaBand.secondary}
      />
    </>
  );
}
