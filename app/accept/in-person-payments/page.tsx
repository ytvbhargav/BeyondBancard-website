import { SolutionPage, solutionMetadata } from "@/components/sections/SolutionPage";
import { inPersonPayments } from "@/content/solutions/in-person-payments";

export const metadata = solutionMetadata(inPersonPayments);

export default function InPersonPaymentsPage() {
  return <SolutionPage content={inPersonPayments} />;
}
