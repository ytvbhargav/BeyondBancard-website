import { SolutionPage, solutionMetadata } from "@/components/sections/SolutionPage";
import { protect } from "@/content/solutions/protect";

export const metadata = solutionMetadata(protect);

export default function ProtectPage() {
  return <SolutionPage content={protect} />;
}
