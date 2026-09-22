import { SolutionPage, solutionMetadata } from "@/components/sections/SolutionPage";
import { b2bPayments } from "@/content/solutions/b2b-payments";

export const metadata = solutionMetadata(b2bPayments);

export default function B2bPaymentsPage() {
  return <SolutionPage content={b2bPayments} />;
}
