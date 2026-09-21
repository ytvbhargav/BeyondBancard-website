import { SolutionPage, solutionMetadata } from "@/components/sections/SolutionPage";
import { chargebackProtection } from "@/content/solutions/chargeback-protection";

export const metadata = solutionMetadata(chargebackProtection);

export default function ChargebackProtectionPage() {
  return <SolutionPage content={chargebackProtection} />;
}
