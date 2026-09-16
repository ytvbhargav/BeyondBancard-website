import { Section, SectionHeader } from "@/components/ui/section";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import type { Feature } from "@/types/content";

/** Risk factors (PRD §9.2.2). Not numbered: these are factors, not steps. */
export function RiskFactors({ title, lead, items }: { title: string; lead: string; items: Feature[] }) {
  return (
    <Section tone="surface" aria-labelledby="risk-title">
      <SectionHeader id="risk-title" title={title} lead={lead} />
      <FeatureGrid items={items} variant="ruled" columns={3} />
    </Section>
  );
}
