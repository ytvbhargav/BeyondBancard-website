import { LegalPage, legalMetadata } from "@/components/sections/LegalPage";
import { accessibility } from "@/content/legal";

export const metadata = legalMetadata(accessibility);

export default function AccessibilityPage() {
  return <LegalPage content={accessibility} />;
}
