import { SolutionPage, solutionMetadata } from "@/components/sections/SolutionPage";
import { accept } from "@/content/solutions/accept";

export const metadata = solutionMetadata(accept);

export default function AcceptPage() {
  return <SolutionPage content={accept} />;
}
