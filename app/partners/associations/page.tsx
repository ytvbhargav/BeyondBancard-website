import { SolutionPage, solutionMetadata } from "@/components/sections/SolutionPage";
import { associations } from "@/content/associations";

export const metadata = solutionMetadata(associations);

export default function AssociationsPage() {
  return <SolutionPage content={associations} />;
}
