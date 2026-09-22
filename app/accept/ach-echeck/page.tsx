import { SolutionPage, solutionMetadata } from "@/components/sections/SolutionPage";
import { achEcheck } from "@/content/solutions/ach-echeck";

export const metadata = solutionMetadata(achEcheck);

export default function AchEcheckPage() {
  return <SolutionPage content={achEcheck} />;
}
