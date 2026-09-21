import { SolutionPage, solutionMetadata } from "@/components/sections/SolutionPage";
import { dashboardReporting } from "@/content/solutions/dashboard-reporting";

export const metadata = solutionMetadata(dashboardReporting);

export default function DashboardReportingPage() {
  return <SolutionPage content={dashboardReporting} />;
}
