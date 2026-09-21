import { SolutionPage, solutionMetadata } from "@/components/sections/SolutionPage";
import { paymentTechnology } from "@/content/solutions/payment-technology";

export const metadata = solutionMetadata(paymentTechnology);

export default function PaymentTechnologyPage() {
  return <SolutionPage content={paymentTechnology} />;
}
