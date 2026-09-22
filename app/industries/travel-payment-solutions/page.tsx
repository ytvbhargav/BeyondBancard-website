import { industryImages } from "@/content/industry-images";
import { IndustryDetail, industryDetailMetadata } from "@/components/sections/IndustryDetail";
import { travel, travelFaqs } from "@/content/travel";

export const metadata = industryDetailMetadata(travel);

export default function TravelPage() {
  return <IndustryDetail content={travel} faqs={travelFaqs} images={industryImages["travel-payment-solutions"]} />;
}
