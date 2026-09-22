import { IndustryDetail, industryDetailMetadata } from "@/components/sections/IndustryDetail";
import { UnderwritingCard } from "@/components/motion/UnderwritingCard";
import { gaming, gamingFaqs, gamingVisual } from "@/content/gaming";

export const metadata = industryDetailMetadata(gaming);

export default function GamingPage() {
  return (
    <IndustryDetail
      content={gaming}
      faqs={gamingFaqs}
      visual={<UnderwritingCard {...gamingVisual} mode="static" completed={2} />}
    />
  );
}
