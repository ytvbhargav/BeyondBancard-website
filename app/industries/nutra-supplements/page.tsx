import { IndustryDetail, industryDetailMetadata } from "@/components/sections/IndustryDetail";
import { SubscriptionDashboard } from "@/components/illustrations/SubscriptionDashboard";
import { nutra } from "@/content/nutra";
import { nutraFaqs } from "@/content/faqs";

export const metadata = industryDetailMetadata(nutra);

export default function NutraPage() {
  return <IndustryDetail content={nutra} faqs={nutraFaqs} visual={<SubscriptionDashboard />} />;
}
