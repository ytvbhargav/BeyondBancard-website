import { SolutionPage, solutionMetadata } from "@/components/sections/SolutionPage";
import { grow } from "@/content/solutions/grow";

export const metadata = solutionMetadata(grow);

export default function GrowPage() {
  return <SolutionPage content={grow} />;
}
