import { SolutionPage, solutionMetadata } from "@/components/sections/SolutionPage";
import { pos } from "@/content/solutions/pos";

export const metadata = solutionMetadata(pos);

export default function PosPage() {
  return <SolutionPage content={pos} />;
}
