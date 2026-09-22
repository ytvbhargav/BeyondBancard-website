import { SolutionPage, solutionMetadata } from "@/components/sections/SolutionPage";
import { workingCapital } from "@/content/solutions/working-capital";

export const metadata = solutionMetadata(workingCapital);

export default function WorkingCapitalPage() {
  return <SolutionPage content={workingCapital} />;
}
