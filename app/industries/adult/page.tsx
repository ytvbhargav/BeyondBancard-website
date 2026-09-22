import { industryImages } from "@/content/industry-images";
import { IndustryDetail, industryDetailMetadata } from "@/components/sections/IndustryDetail";
import { adult } from "@/content/adult";
import { adultFaqs } from "@/content/faqs";

export const metadata = industryDetailMetadata(adult);

export default function AdultPage() {
  return (
    <IndustryDetail
      content={adult}
      faqs={adultFaqs}
      images={industryImages["adult"]}
    />
  );
}
