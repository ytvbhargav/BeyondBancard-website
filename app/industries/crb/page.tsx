import { industryImages } from "@/content/industry-images";
import { IndustryDetail, industryDetailMetadata } from "@/components/sections/IndustryDetail";
import { crb, crbFaqs } from "@/content/crb";

export const metadata = industryDetailMetadata(crb);

export default function CrbPage() {
  return <IndustryDetail content={crb} faqs={crbFaqs} images={industryImages["crb"]} />;
}
