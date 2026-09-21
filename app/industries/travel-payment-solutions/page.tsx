import { IndustryDetail, industryDetailMetadata } from "@/components/sections/IndustryDetail";
import { UnderwritingCard } from "@/components/motion/UnderwritingCard";
import { travel, travelFaqs, travelVisual } from "@/content/travel";

export const metadata = industryDetailMetadata(travel);

export default function TravelPage() {
  return (
    <IndustryDetail
      content={travel}
      faqs={travelFaqs}
      visual={<UnderwritingCard {...travelVisual} mode="static" completed={2} />}
    />
  );
}
