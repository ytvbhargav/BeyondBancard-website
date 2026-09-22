import {
  Activity,
  CalendarClock,
  CreditCard,
  FileText,
  KeyRound,
  Landmark,
  Laptop,
  Lock,
  Radar,
  Receipt,
  ShieldCheck,
  Terminal,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Badge, type Status } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Pillar } from "@/types/content";

type Row = { icon: LucideIcon; label: string; status: Status; value: string };

const ROWS: Record<Pillar, { title: string; rows: Row[] }> = {
  Accept: {
    title: "Ways to get paid",
    rows: [
      { icon: Laptop, label: "Online checkout", status: "approved", value: "On" },
      { icon: CreditCard, label: "In-person payments", status: "approved", value: "On" },
      { icon: Landmark, label: "ACH & eCheck", status: "approved", value: "On" },
      { icon: Receipt, label: "B2B invoices", status: "approved", value: "On" },
    ],
  },
  Protect: {
    title: "Account protection",
    rows: [
      { icon: ShieldCheck, label: "Chargeback alerts", status: "approved", value: "Active" },
      { icon: Lock, label: "3D Secure", status: "approved", value: "On" },
      { icon: KeyRound, label: "Network tokens", status: "approved", value: "On" },
      { icon: Radar, label: "Fraud rules", status: "neutral", value: "Watching" },
    ],
  },
  Grow: {
    title: "Growth tools",
    rows: [
      { icon: CalendarClock, label: "Recurring billing", status: "approved", value: "Scheduled" },
      { icon: Zap, label: "Instant payout", status: "approved", value: "Sent" },
    ],
  },
  Operate: {
    title: "Daily operations",
    rows: [
      { icon: FileText, label: "Batch settled", status: "approved", value: "Done" },
      { icon: Receipt, label: "Invoices sent", status: "approved", value: "Done" },
      { icon: Terminal, label: "Virtual terminal", status: "approved", value: "Online" },
    ],
  },
};

const BARS = [28, 34, 31, 42, 47, 45, 56, 61, 66, 74, 82, 90];

/**
 * Small product-UI illustration for each pillar panel. No figures: statuses
 * and shapes only, labelled "Illustration". Rows, the chart and the footer
 * strip are tighter below sm (D-060), so a pillar card fits a phone screen.
 */
export function PillarVisual({ pillar, className }: { pillar: Pillar; className?: string }) {
  const { title, rows } = ROWS[pillar];
  return (
    <figure
      aria-hidden
      className={cn("w-full max-w-[26rem] rounded-md bg-surface text-ink-900 shadow-float", className)}
    >
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3 sm:py-4">
        <span className="type-h4">{title}</span>
        <Badge status="illustration" icon={false}>
          Illustration
        </Badge>
      </div>

      {(pillar === "Grow" || pillar === "Operate") && (
        <div className="border-b border-line px-5 pt-4 pb-3 sm:pt-5 sm:pb-4">
          <p className="type-small flex items-center gap-1.5 text-muted">
            <Activity strokeWidth={1.75} className="size-3.5" />
            {pillar === "Grow" ? "Volume trend" : "Settlement activity"}
          </p>
          {pillar === "Grow" ? (
            <div className="mt-3 flex h-14 items-end gap-1.5 sm:mt-4 sm:h-20">
              {BARS.map((h, i) => (
                <span
                  key={i}
                  className={cn("flex-1 rounded-t-[3px]", i === BARS.length - 1 ? "bg-brand-600" : "bg-brand-200")}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          ) : (
            <svg viewBox="0 0 240 64" className="mt-3 h-12 w-full sm:h-16" preserveAspectRatio="none">
              <path d="M0 48 L30 40 L60 44 L90 30 L120 34 L150 22 L180 26 L210 14 L240 18" fill="none" stroke="var(--color-brand-600)" strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M0 48 L30 40 L60 44 L90 30 L120 34 L150 22 L180 26 L210 14 L240 18 L240 64 L0 64 Z" fill="var(--color-brand-100)" opacity="0.7" />
            </svg>
          )}
        </div>
      )}

      <ul className="px-5 py-2">
        {rows.map((r) => (
          <li key={r.label} className="flex items-center gap-3 border-b border-line py-2 last:border-b-0 sm:py-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-sm bg-paper text-ink-900 sm:size-8">
              <r.icon strokeWidth={1.75} className="size-4" />
            </span>
            <span className="flex-1 text-[0.9375rem] font-medium">{r.label}</span>
            <Badge status={r.status} icon={r.status === "approved"}>
              {r.value}
            </Badge>
          </li>
        ))}
      </ul>

      {pillar === "Protect" && (
        <div className="flex items-center justify-between gap-3 rounded-b-md border-t border-line bg-paper px-5 py-2 sm:py-3">
          <span className="type-small text-muted">Dispute activity</span>
          <span className="flex h-5 items-end gap-1">
            {[90, 70, 76, 55, 48, 40, 32].map((h, i) => (
              <span key={i} className="w-1.5 rounded-t-[2px] bg-ink-800/25" style={{ height: `${h}%` }} />
            ))}
          </span>
        </div>
      )}
      {pillar === "Accept" && (
        <div className="flex items-center justify-between gap-3 rounded-b-md border-t border-line bg-paper px-5 py-2 sm:py-3">
          <span className="type-small text-muted">Latest payment</span>
          <Badge status="approved">Approved</Badge>
        </div>
      )}
    </figure>
  );
}
