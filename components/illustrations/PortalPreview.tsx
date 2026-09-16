import { Badge, type Status } from "@/components/ui/badge";

const APPLICATIONS: { merchant: string; industry: string; status: Status; label: string }[] = [
  { merchant: "Online supplement store", industry: "Nutra & supplements", status: "approved", label: "Approved" },
  { merchant: "Auto repair shop", industry: "Auto repair", status: "approved", label: "Approved" },
  { merchant: "Vape retailer", industry: "Vape & e-cig", status: "review", label: "In review" },
  { merchant: "Subscription software", industry: "SaaS", status: "pending", label: "Submitted" },
];

const RESIDUALS = [34, 40, 38, 47, 52, 50, 58, 63, 61, 70, 74, 80];
const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

/**
 * Partner portal preview (PRD §9.5.5). Illustrative only: generic merchant
 * descriptions, no amounts, clearly labelled.
 */
export function PortalPreview() {
  return (
    <figure
      className="overflow-hidden rounded-lg border border-line bg-surface text-ink-900 shadow-float"
      aria-label="Illustration of the partner portal showing application statuses and a residuals trend"
    >
      <div className="flex items-center justify-between gap-4 border-b border-line bg-paper px-5 py-3.5 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span aria-hidden className="grid size-7 place-items-center rounded-[7px] bg-brand-600 font-display text-[0.8125rem] font-extrabold text-white">
            B
          </span>
          <span className="type-h4">Partner portal</span>
        </div>
        <Badge status="illustration" icon={false}>
          Illustration
        </Badge>
      </div>

      <div className="grid lg:grid-cols-[1.35fr_1fr]" aria-hidden>
        <div className="p-5 sm:p-6">
          <p className="type-small font-medium">Applications</p>
          <ul className="mt-3">
            {APPLICATIONS.map((a) => (
              <li key={a.merchant} className="flex items-center justify-between gap-4 border-t border-line py-3 first:border-t-0">
                <span className="min-w-0">
                  <span className="block truncate text-[0.9375rem] font-medium">{a.merchant}</span>
                  <span className="type-small block truncate text-muted">{a.industry}</span>
                </span>
                <Badge status={a.status}>{a.label}</Badge>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-line p-5 sm:p-6 lg:border-t-0 lg:border-l">
          <p className="type-small font-medium">Residuals trend</p>
          <p className="type-small text-muted">Last 12 months</p>
          <div className="mt-6 flex h-36 items-end gap-1.5">
            {RESIDUALS.map((h, i) => (
              <span key={i} className="flex flex-1 flex-col items-center gap-1.5">
                <span
                  className={i === RESIDUALS.length - 1 ? "w-full rounded-t-[3px] bg-brand-600" : "w-full rounded-t-[3px] bg-brand-200"}
                  style={{ height: `${h * 1.2}px` }}
                />
                <span className="text-[0.625rem] leading-none text-muted">{MONTHS[i]}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </figure>
  );
}
