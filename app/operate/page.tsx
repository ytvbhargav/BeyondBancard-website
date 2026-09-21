import { SolutionPage, solutionMetadata } from "@/components/sections/SolutionPage";
import { operate } from "@/content/solutions/operate";

export const metadata = solutionMetadata(operate);

export default function OperatePage() {
  return <SolutionPage content={operate} />;
}
