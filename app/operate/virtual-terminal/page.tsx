import { SolutionPage, solutionMetadata } from "@/components/sections/SolutionPage";
import { virtualTerminal } from "@/content/solutions/virtual-terminal";

export const metadata = solutionMetadata(virtualTerminal);

export default function VirtualTerminalPage() {
  return <SolutionPage content={virtualTerminal} />;
}
