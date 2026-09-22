import { industryImages } from "@/content/industry-images";
import { IndustryDetail, industryDetailMetadata } from "@/components/sections/IndustryDetail";
import { nutra } from "@/content/nutra";
import { nutraFaqs } from "@/content/faqs";

export const metadata = industryDetailMetadata(nutra);

export default function NutraPage() {
  return <IndustryDetail content={nutra} faqs={nutraFaqs} images={industryImages["nutra-supplements"]} />;
}
