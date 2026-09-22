import { industryImages } from "@/content/industry-images";
import { IndustryDetail, industryDetailMetadata } from "@/components/sections/IndustryDetail";
import { gaming, gamingFaqs } from "@/content/gaming";

export const metadata = industryDetailMetadata(gaming);

export default function GamingPage() {
  return <IndustryDetail content={gaming} faqs={gamingFaqs} images={industryImages["gaming"]} />;
}
