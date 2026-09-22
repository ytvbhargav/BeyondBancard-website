import { SolutionPage, solutionMetadata } from "@/components/sections/SolutionPage";
import { fraudRiskTools } from "@/content/solutions/fraud-risk-tools";

export const metadata = solutionMetadata(fraudRiskTools);

export default function FraudRiskToolsPage() {
  return <SolutionPage content={fraudRiskTools} />;
}
