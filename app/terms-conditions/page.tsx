import { LegalPage, legalMetadata } from "@/components/sections/LegalPage";
import { terms } from "@/content/legal";

export const metadata = legalMetadata(terms);

export default function TermsPage() {
  return <LegalPage content={terms} />;
}
