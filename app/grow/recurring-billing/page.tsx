import { SolutionPage, solutionMetadata } from "@/components/sections/SolutionPage";
import { recurringBilling } from "@/content/solutions/recurring-billing";

export const metadata = solutionMetadata(recurringBilling);

export default function RecurringBillingPage() {
  return <SolutionPage content={recurringBilling} />;
}
