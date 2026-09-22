import { SolutionPage, solutionMetadata } from "@/components/sections/SolutionPage";
import { invoicing } from "@/content/solutions/invoicing";

export const metadata = solutionMetadata(invoicing);

export default function InvoicingPage() {
  return <SolutionPage content={invoicing} />;
}
