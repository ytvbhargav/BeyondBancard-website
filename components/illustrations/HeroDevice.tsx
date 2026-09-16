import { Check, CircleDashed, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CheckState } from "@/lib/useUnderwritingSequence";

/**
 * The hero's centrepiece (S2): a tilted merchant device whose screen runs the
 * underwriting sequence. All content sits in the top of the screen; the lower
 * screen fades to ink so the hero CTAs and lead can overlap it cleanly.
 * Purely visual (aria-hidden); the hero announces status in its own live region.
 */
export function HeroDevice({
  title,
  industry,
  checks,
  states,
  approved,
  reduce,
}: {
  title: string;
  industry: string;
  checks: string[];
  states: CheckState[];
  approved: boolean;
  reduce: boolean;
}) {
  return (
    <div
      aria-hidden
      className="relative aspect-[1/2.05] w-full rotate-[-8deg] rounded-[2.6rem] bg-ink-950 p-2 shadow-[0_60px_120px_-30px_var(--color-ink-950)] ring-1 ring-white/15"
    >
      <span className="absolute top-24 -right-[3px] h-14 w-[3px] rounded-r-sm bg-ink-700" />
      <span className="absolute top-40 -right-[3px] h-9 w-[3px] rounded-r-sm bg-ink-700" />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[2.2rem] bg-[linear-gradient(180deg,var(--color-brand-600)_0%,var(--color-brand-800)_42%,var(--color-ink-950)_68%)]">
        <span className="mx-auto mt-2 block h-[1.125rem] w-16 shrink-0 rounded-pill bg-ink-950" />

        <div className="flex flex-col gap-2.5 px-3 pt-3 text-left">
          <div className="flex items-center justify-between gap-2">
            <span className="grid size-5 place-items-center rounded-[6px] bg-white font-display text-[0.625rem] font-extrabold text-brand-700">
              B
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-pill px-2 py-0.5 text-[0.6875rem] font-semibold whitespace-nowrap transition-colors duration-(--duration-base)",
                approved ? "bg-success-100 text-success-700" : "bg-warning-100 text-warning-700",
                approved && !reduce && "approved-pulse",
              )}
            >
              {approved && <Check strokeWidth={3} className="size-3" />}
              {approved ? "Approved" : "In review"}
            </span>
          </div>

          <div>
            <p className="font-display text-[0.875rem] leading-tight font-bold text-white [font-stretch:104%]">{title}</p>
            <div className="mt-1 flex items-center justify-between gap-2">
              <span className="text-[0.6875rem] text-white/80">{industry}</span>
              <span className="rounded-pill bg-white/15 px-1.5 py-px text-[0.5625rem] font-semibold text-white">Example</span>
            </div>
          </div>

          <ul className="flex flex-col gap-1">
            {checks.map((c, i) => {
              const s = states[i];
              return (
                <li
                  key={c}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-2 py-1.5 text-[0.6875rem] leading-tight transition-colors duration-(--duration-base)",
                    s === "done" ? "bg-white/15 text-white" : "bg-white/[0.07] text-white/75",
                  )}
                >
                  <span className="grid size-3.5 shrink-0 place-items-center">
                    {s === "done" && (
                      <span className="grid size-3.5 place-items-center rounded-pill bg-success-600 text-white">
                        <Check strokeWidth={3.5} className="size-2" />
                      </span>
                    )}
                    {s === "running" && (
                      <LoaderCircle strokeWidth={2.5} className={cn("size-3.5 text-white", !reduce && "animate-spin")} />
                    )}
                    {s === "pending" && <CircleDashed strokeWidth={2} className="size-3.5 text-white/50" />}
                  </span>
                  <span className="truncate">{c}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
