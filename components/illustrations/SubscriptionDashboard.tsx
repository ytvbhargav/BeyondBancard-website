import { Badge } from "@/components/ui/badge";

/**
 * Product-style illustration for industry pages: subscription revenue tiles.
 * Deliberately has no figures (PRD §9.4.1); bars stand in for values.
 */
export function SubscriptionDashboard() {
  const renewals = [38, 46, 42, 55, 51, 63, 60, 72, 69, 80, 78, 88];
  const disputes = [22, 18, 20, 15, 16, 12, 13, 10];

  return (
    <figure className="rounded-md bg-surface text-ink-900 shadow-float" aria-label="Illustration of a subscription revenue dashboard">
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
        <div>
          <p className="type-h4">Subscription overview</p>
          <p className="type-small text-muted">Supplement brand</p>
        </div>
        <Badge status="illustration" icon={false}>
          Illustration
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-px bg-line" aria-hidden>
        <div className="bg-surface p-5 sm:p-6">
          <p className="type-small text-muted">Recurring revenue</p>
          <svg viewBox="0 0 160 56" className="mt-4 h-14 w-full" preserveAspectRatio="none">
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

        <div className="bg-surface p-5 sm:p-6">
          <p className="type-small text-muted">Renewals</p>
          <div className="mt-4 flex h-14 items-end gap-1">
            {renewals.map((h, i) => (
              <span key={i} className="flex-1 rounded-t-[2px] bg-brand-200" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        <div className="bg-surface p-5 sm:p-6">
          <p className="type-small text-muted">Dispute activity</p>
          <div className="mt-4 flex h-14 items-end gap-1.5">
            {disputes.map((h, i) => (
              <span key={i} className="flex-1 rounded-t-[2px] bg-ink-800/20" style={{ height: `${h * 2.5}%` }} />
            ))}
          </div>
        </div>

        <div className="bg-surface p-5 sm:p-6">
          <p className="type-small text-muted">Auto-ship orders</p>
          <ul className="mt-4 space-y-2.5">
            {["Scheduled", "Processed", "Retrying"].map((s, i) => (
              <li key={s} className="flex items-center gap-2">
                <span className={i === 2 ? "size-2 rounded-pill bg-warning-600" : "size-2 rounded-pill bg-success-600"} />
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
