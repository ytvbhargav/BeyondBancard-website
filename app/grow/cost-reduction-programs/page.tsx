import { SolutionPage, solutionMetadata } from "@/components/sections/SolutionPage";
import { costReductionPrograms } from "@/content/solutions/cost-reduction-programs";

export const metadata = solutionMetadata(costReductionPrograms);

export default function CostReductionProgramsPage() {
  return <SolutionPage content={costReductionPrograms} />;
}
