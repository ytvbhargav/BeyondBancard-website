import { SolutionPage, solutionMetadata } from "@/components/sections/SolutionPage";
import { internationalPayments } from "@/content/solutions/international-payments";

export const metadata = solutionMetadata(internationalPayments);

export default function InternationalPaymentsPage() {
  return <SolutionPage content={internationalPayments} />;
}
