import Image from "next/image";
import { Badge, type Status } from "@/components/ui/badge";

const APPLICATIONS: { merchant: string; industry: string; status: Status; label: string }[] = [
  { merchant: "Online supplement store", industry: "Nutra & Supplements", status: "approved", label: "Approved" },
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
      {/* D-060 phone-only density pass: tighter chrome below sm, sm+ unchanged. */}
      <div className="flex items-center justify-between gap-3 border-b border-line bg-paper px-4 py-3 sm:gap-4 sm:px-6 sm:py-3.5">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <Image src="/brand/beyond-bancard-mark.png" alt="" width={175} height={201} className="h-6 w-auto" />
          <span className="type-h4">Partner portal</span>
        </div>
        <Badge status="illustration" icon={false}>
          Illustration
        </Badge>
      </div>

      <div className="grid lg:grid-cols-[1.35fr_1fr]" aria-hidden>
        {/* D-060 phone-only density pass: shorter rows and padding below sm. */}
        <div className="p-4 sm:p-6">
          <p className="type-small font-medium">Applications</p>
          <ul className="mt-2.5 sm:mt-3">
            {APPLICATIONS.map((a) => (
              <li
                key={a.merchant}
                className="flex items-center justify-between gap-3 border-t border-line py-2 first:border-t-0 sm:gap-4 sm:py-3"
              >
                <span className="min-w-0 leading-snug sm:leading-[inherit]">
                  <span className="block truncate text-[0.9375rem] font-medium">{a.merchant}</span>
                  <span className="type-small block truncate text-muted">{a.industry}</span>
                </span>
                <Badge status={a.status}>{a.label}</Badge>
              </li>
            ))}
          </ul>
        </div>
        {/* D-060 phone-only density pass: labels share a row and the chart is shorter below sm. */}
        <div className="border-t border-line p-4 sm:p-6 lg:border-t-0 lg:border-l">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 sm:block">
            <p className="type-small font-medium">Residuals trend</p>
            <p className="type-small text-muted">Last 12 months</p>
          </div>
          {/* --residual-unit keeps the sm+ bar scale (1.2px per point) and shrinks it to 0.75px on phones. */}
          <div className="mt-4 flex h-20 items-end gap-1 [--residual-unit:0.75px] sm:mt-6 sm:h-36 sm:gap-1.5 sm:[--residual-unit:1.2px]">
            {RESIDUALS.map((h, i) => (
              <span key={i} className="flex flex-1 flex-col items-center gap-1 sm:gap-1.5">
                <span
                  className={i === RESIDUALS.length - 1 ? "w-full rounded-t-[3px] bg-brand-600" : "w-full rounded-t-[3px] bg-brand-200"}
                  style={{ height: `calc(${h} * var(--residual-unit))` }}
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
