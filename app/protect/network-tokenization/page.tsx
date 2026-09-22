import { SolutionPage, solutionMetadata } from "@/components/sections/SolutionPage";
import { networkTokenization } from "@/content/solutions/network-tokenization";

export const metadata = solutionMetadata(networkTokenization);

export default function NetworkTokenizationPage() {
  return <SolutionPage content={networkTokenization} />;
}
