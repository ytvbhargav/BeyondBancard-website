import { SolutionPage, solutionMetadata } from "@/components/sections/SolutionPage";
import { instantPayouts } from "@/content/solutions/instant-payouts";

export const metadata = solutionMetadata(instantPayouts);

export default function InstantPayoutsPage() {
  return <SolutionPage content={instantPayouts} />;
}
