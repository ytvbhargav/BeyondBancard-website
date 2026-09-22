import { Badge } from "@/components/ui/badge";

/**
 * Product-style illustration for industry pages: subscription revenue tiles.
 * Deliberately has no figures (PRD §9.4.1); bars stand in for values. The two
 * business-specific labels default to the Nutra page's and are set per industry.
 */
export function SubscriptionDashboard({
  business = "Supplement brand",
  ordersLabel = "Auto-ship orders",
}: {
  business?: string;
  ordersLabel?: string;
}) {
  const renewals = [38, 46, 42, 55, 51, 63, 60, 72, 69, 80, 78, 88];
  const disputes = [22, 18, 20, 15, 16, 12, 13, 10];

  return (
    <figure className="rounded-md bg-surface text-ink-900 shadow-float" aria-label="Illustration of a subscription revenue dashboard">
      {/* D-060 phone-only density pass: tighter header and tiles below sm, sm+ unchanged. */}
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
        <div>
          <p className="type-h4">Subscription overview</p>
          <p className="type-small text-muted">{business}</p>
        </div>
        <Badge status="illustration" icon={false}>
          Illustration
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-px bg-line" aria-hidden>
        <div className="bg-surface p-4 sm:p-6">
          <p className="type-small text-muted">Recurring revenue</p>
          {/* D-060: chart blocks drop to h-12 below sm. */}
          <svg viewBox="0 0 160 56" className="mt-3 h-12 w-full sm:mt-4 sm:h-14" preserveAspectRatio="none">
            <defs>
              <linearGradient id="rev-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="var(--color-brand-600)" stopOpacity="0.18" />
                <stop offset="1" stopColor="var(--color-brand-600)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 46 L20 42 L40 44 L60 34 L80 36 L100 26 L120 24 L140 14 L160 10 L160 56 L0 56 Z" fill="url(#rev-fill)" />
            <path
              d="M0 46 L20 42 L40 44 L60 34 L80 36 L100 26 L120 24 L140 14 L160 10"
              fill="none"
              stroke="var(--color-brand-600)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <div className="bg-surface p-4 sm:p-6">
          <p className="type-small text-muted">Renewals</p>
          <div className="mt-3 flex h-12 items-end gap-1 sm:mt-4 sm:h-14">
            {renewals.map((h, i) => (
              <span key={i} className="flex-1 rounded-t-[2px] bg-brand-200" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        <div className="bg-surface p-4 sm:p-6">
          <p className="type-small text-muted">Dispute activity</p>
          <div className="mt-3 flex h-12 items-end gap-1 sm:mt-4 sm:h-14 sm:gap-1.5">
            {disputes.map((h, i) => (
              <span key={i} className="flex-1 rounded-t-[2px] bg-ink-800/20" style={{ height: `${h * 2.5}%` }} />
            ))}
          </div>
        </div>

        <div className="bg-surface p-4 sm:p-6">
          <p className="type-small text-muted">{ordersLabel}</p>
          <ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-2.5">
            {["Scheduled", "Processed", "Retrying"].map((s, i) => (
              <li key={s} className="flex items-center gap-2">
                {/* D-060 phone-only density pass: shrink-0 keeps the dot a circle when the row is tight at phone width. */}
                <span className={i === 2 ? "size-2 shrink-0 rounded-pill bg-warning-600" : "size-2 shrink-0 rounded-pill bg-success-600"} />
                <span className="type-small flex-1">{s}</span>
                <span className="h-1.5 rounded-pill bg-line" style={{ width: `${[56, 44, 16][i]}%` }} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}
