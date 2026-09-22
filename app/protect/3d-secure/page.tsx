import { SolutionPage, solutionMetadata } from "@/components/sections/SolutionPage";
import { threeDSecure } from "@/content/solutions/3d-secure";

export const metadata = solutionMetadata(threeDSecure);

export default function ThreeDSecurePage() {
  return <SolutionPage content={threeDSecure} />;
}
