import { LegalPage, legalMetadata } from "@/components/sections/LegalPage";
import { privacy } from "@/content/legal";

export const metadata = legalMetadata(privacy);

export default function PrivacyPage() {
  return <LegalPage content={privacy} />;
}
