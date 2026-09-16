import { disclosures } from "@/content/site";
import { cn } from "@/lib/utils";

/** Regulatory disclosures, verbatim (PRD §8.5). */
export function DisclosuresBlock({ className, compact = false }: { className?: string; compact?: boolean }) {
  if (compact) {
    return <p className={cn("type-small text-muted", className)}>{disclosures.sponsorBanks}</p>;
  }
  return (
    <div className={cn("type-small max-w-[64rem] space-y-3 text-on-dark-muted", className)}>
      <p>{disclosures.sponsorBanks}</p>
      <p>{disclosures.clover}</p>
    </div>
  );
}
