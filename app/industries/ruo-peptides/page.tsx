import { IndustryDetail, industryDetailMetadata } from "@/components/sections/IndustryDetail";
import { UnderwritingCard } from "@/components/motion/UnderwritingCard";
import { ruoPeptides, ruoPeptidesFaqs, ruoPeptidesVisual } from "@/content/ruo-peptides";

export const metadata = industryDetailMetadata(ruoPeptides);

export default function RuoPeptidesPage() {
  return (
    <IndustryDetail
      content={ruoPeptides}
      faqs={ruoPeptidesFaqs}
      visual={<UnderwritingCard {...ruoPeptidesVisual} mode="static" completed={2} />}
    />
  );
}
