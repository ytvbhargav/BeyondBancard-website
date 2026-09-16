import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { PillarsSection } from "@/components/sections/PillarsSection";
import { IndustryGrid } from "@/components/sections/IndustryGrid";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { UnderwriterPanel } from "@/components/sections/UnderwriterPanel";
import { PartnersTeaser } from "@/components/sections/PartnersTeaser";
import { Testimonials } from "@/components/sections/Testimonials";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { home } from "@/content/home";
import { homeFaqs } from "@/content/faqs";
import { everydayChips, featuredIndustries } from "@/content/industries";
import { testimonials, testimonialsNote } from "@/content/testimonials";

export default function HomePage() {
  return (
    <>
      <Hero title={home.hero.title} lead={home.hero.lead} facts={home.hero.facts} card={home.underwriting} />
      <TrustStrip label={home.trust.label} badges={home.trust.badges} stat={home.trust.stat} />
      <PillarsSection title={home.pillars.title} lead={home.pillars.lead} items={home.pillars.items} />
      <IndustryGrid
        title={home.industries.title}
        lead={home.industries.lead}
        industries={featuredIndustries}
        chips={everydayChips}
        chipsLabel={home.industries.chipsLabel}
        tone="surface"
      />
      <ProcessTimeline
        id="how-it-works"
        tone="ink"
        layout="vertical"
        title={home.process.title}
        steps={home.process.steps}
        aside={<UnderwriterPanel title={home.process.panelTitle} factors={home.process.factors} />}
      />
      <PartnersTeaser {...home.partners} />
      <Testimonials title={home.testimonials.title} items={testimonials} note={testimonialsNote} />
      <TechnologySection {...home.technology} />
      <FaqSection title={home.faq.title} faqs={homeFaqs} />
      <CtaBand />
    </>
  );
}
