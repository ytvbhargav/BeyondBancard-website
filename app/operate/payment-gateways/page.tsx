import { SolutionPage, solutionMetadata } from "@/components/sections/SolutionPage";
import { paymentGateways } from "@/content/solutions/payment-gateways";

export const metadata = solutionMetadata(paymentGateways);

export default function PaymentGatewaysPage() {
  return <SolutionPage content={paymentGateways} />;
}
