import { IndustryDetail, industryDetailMetadata } from "@/components/sections/IndustryDetail";
import { UnderwritingCard } from "@/components/motion/UnderwritingCard";
import { crb, crbFaqs, crbVisual } from "@/content/crb";

export const metadata = industryDetailMetadata(crb);

export default function CrbPage() {
  return (
    <IndustryDetail
      content={crb}
      faqs={crbFaqs}
      visual={<UnderwritingCard {...crbVisual} mode="static" completed={2} />}
    />
  );
}
