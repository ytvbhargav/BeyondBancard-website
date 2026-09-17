import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { FaqExplorer } from "@/components/sections/FaqExplorer";
import { FaqSearch } from "@/components/sections/FaqSearch";
import { FaqTopics } from "@/components/sections/FaqTopics";
import { CtaBand } from "@/components/sections/CtaBand";
import { faqPage, faqTopics } from "@/content/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description: faqPage.hero.lead,
};

export default function FaqPage() {
  return (
    <>
      {/* The search lives in the hero and filters the topics below, so both share one explorer. */}
      <FaqExplorer topics={faqTopics} copy={faqPage.explorer}>
        <PageHero
          breadcrumb={faqPage.breadcrumb}
          title={faqPage.hero.title}
          lead={faqPage.hero.lead}
          actions={<FaqSearch />}
        />
        <FaqTopics />
      </FaqExplorer>

      <CtaBand />
    </>
  );
}
