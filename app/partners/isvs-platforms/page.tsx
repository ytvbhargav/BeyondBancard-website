import { SolutionPage, solutionMetadata } from "@/components/sections/SolutionPage";
import { isvsPlatforms } from "@/content/isvs-platforms";

export const metadata = solutionMetadata(isvsPlatforms);

export default function IsvsPlatformsPage() {
  return <SolutionPage content={isvsPlatforms} />;
}
