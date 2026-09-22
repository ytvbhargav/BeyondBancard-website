import type { Metadata } from "next";
import { IndustryHero } from "@/components/sections/industry/IndustryHero";
import { RealityAnswer } from "@/components/sections/industry/RealityAnswer";
import { CapabilityExplorer } from "@/components/sections/industry/CapabilityExplorer";
import { ProcessSteps } from "@/components/sections/industry/ProcessSteps";
import { FitCheck } from "@/components/sections/industry/FitCheck";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import type { Faq, IndustryDetailContent } from "@/types/content";

/** Page metadata for an industry detail page: its browser title, with the hero lead as the description. */
export function industryDetailMetadata(content: IndustryDetailContent): Metadata {
  return { title: content.meta.title, description: content.hero.lead };
}

/**
 * Industry page. The page makes one argument, in four movements: the opening,
 * the realities of the industry set against what Beyond does about each of them,
 * the tools the account comes with, and how an account is opened and kept
 * healthy — then the questions merchants ask, and the way in.
 *
 * Every section is laid out on the same 12-column grid and arrives through the
 * page's reveal observer, so the motion is consistent and nothing depends on
 * JavaScript to be readable. The hero's illustration is the one scripted
 * movement, and it is dropped below lg and with reduced motion.
 *
 * The business models sit in the hero rail rather than in a band of their own,
 * and the page links on to applying and to an expert, never to another industry.
 */
export function IndustryDetail({
  content,
  faqs,
  images,
  cutout,
}: {
  content: IndustryDetailContent;
  faqs: Faq[];
  images?: { src: string; alt: string }[];
  cutout?: { src: string; alt: string };
}) {
  const { hero, realities, models, whyBeyond, capabilities, checklist, process, faq } = content;
  // The page's own name, for the hero eyebrow: the last breadcrumb is the current page.
  const eyebrow = content.breadcrumb.at(-1)?.label ?? "";

  return (
    <>
      <IndustryHero
        eyebrow={eyebrow}
        title={hero.title}
        lead={hero.lead}
        expertCta={hero.expertCta}
        breadcrumb={content.breadcrumb}
        images={images}
        cutout={cutout}
        models={models}
      />

      <RealityAnswer title={realities.title} problems={realities.items} answers={whyBeyond.features} />

      <CapabilityExplorer title={capabilities.title} items={capabilities.items} />

      <ProcessSteps id={process.id} title={process.title} steps={process.steps} />

      <FitCheck title={checklist.title} lead={checklist.lead} items={checklist.items} />

      <FaqSection title={faq.title} faqs={faqs} />

      <CtaBand />
    </>
  );
}
