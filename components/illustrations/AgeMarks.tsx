import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The marks for the adult page: what the category actually is, which is
 * commerce the buyer has to be eighteen to make — the age itself, the check
 * that was passed, and the document it was checked against.
 *
 * They are drawn rather than photographed. Stock photography of age
 * verification does not exist in any usable form, and everything adjacent to it
 * (a wall of spirits, a shop front) names a different trade than this page's
 * own: adult ecommerce, digital and subscription content, dating,
 * entertainment, adult retail. Type and geometry say it exactly and say nothing
 * else.
 *
 * Each mark fills its frame in the hero mosaic and is decorative — the section
 * is already named by its heading — so none of them carries a label for a
 * screen reader.
 */

/** The ink panel and its drawn texture, shared by the three marks. */
function Panel({ motif, children }: { motif: 1 | 3 | 5; children: React.ReactNode }) {
  return (
    <div
      aria-hidden
      className={cn("motif relative grid size-full place-items-center overflow-hidden", `motif-${motif}`)}
    >
      <span
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-ink-950 from-5% via-ink-950/45 via-65% to-ink-950/0"
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/** The age itself, ringed like a stamp. */
export function AgeBadge() {
  return (
    <Panel motif={1}>
      <div className="grid size-32 place-items-center rounded-pill border-2 border-brand-300/70 sm:size-40">
        <div className="grid size-24 place-items-center rounded-pill border border-brand-300/35 sm:size-32">
          <span className="font-display text-[2.5rem] leading-none font-extrabold tracking-[-0.02em] text-on-dark sm:text-[3.25rem]">
            18<span className="text-brand-300">+</span>
          </span>
        </div>
      </div>
    </Panel>
  );
}

/** The check that was passed. */
export function VerifiedMark() {
  return (
    <Panel motif={3}>
      <div className="grid size-20 place-items-center rounded-pill bg-brand-600 shadow-float sm:size-24">
        <Check aria-hidden strokeWidth={3} className="size-10 text-white sm:size-12" />
      </div>
    </Panel>
  );
}

/** The document it was checked against. */
export function IdMark() {
  return (
    <Panel motif={5}>
      <div className="w-32 rounded-sm border border-brand-300/45 bg-ink-950/70 p-3 sm:w-40 sm:p-4">
        <div className="flex items-start gap-2.5">
          <span className="size-8 shrink-0 rounded-xs bg-brand-300/30 sm:size-10" />
          <span className="mt-0.5 grid flex-1 gap-1.5">
            <span className="block h-1.5 rounded-pill bg-brand-300/55" />
            <span className="block h-1.5 w-3/4 rounded-pill bg-brand-300/30" />
            <span className="block h-1.5 w-1/2 rounded-pill bg-brand-300/30" />
          </span>
        </div>
        <span className="mt-3 block h-1.5 w-2/3 rounded-pill bg-brand-300/25" />
      </div>
    </Panel>
  );
}

/** The three marks in the order the hero lays them out: lead, then the pair. */
export const ageMarks = [<AgeBadge key="age" />, <VerifiedMark key="verified" />, <IdMark key="id" />];
