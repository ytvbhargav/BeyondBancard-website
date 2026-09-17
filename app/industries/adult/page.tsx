import { IndustryDetail, industryDetailMetadata } from "@/components/sections/IndustryDetail";
import { SubscriptionDashboard } from "@/components/illustrations/SubscriptionDashboard";
import { adult, adultVisual } from "@/content/adult";
import { adultFaqs } from "@/content/faqs";

export const metadata = industryDetailMetadata(adult);

export default function AdultPage() {
  return (
    <IndustryDetail
      content={adult}
      faqs={adultFaqs}
      visual={<SubscriptionDashboard {...adultVisual} />}
    />
  );
}
