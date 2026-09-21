import { SolutionPage, solutionMetadata } from "@/components/sections/SolutionPage";
import { onlinePayments } from "@/content/solutions/online-payments";

export const metadata = solutionMetadata(onlinePayments);

export default function OnlinePaymentsPage() {
  return <SolutionPage content={onlinePayments} />;
}
