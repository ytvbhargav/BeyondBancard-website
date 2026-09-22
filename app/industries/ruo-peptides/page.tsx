import { industryImages } from "@/content/industry-images";
import { IndustryDetail, industryDetailMetadata } from "@/components/sections/IndustryDetail";
import { ruoPeptides, ruoPeptidesFaqs } from "@/content/ruo-peptides";

export const metadata = industryDetailMetadata(ruoPeptides);

export default function RuoPeptidesPage() {
  return <IndustryDetail content={ruoPeptides} faqs={ruoPeptidesFaqs} images={industryImages["ruo-peptides"]} />;
}
