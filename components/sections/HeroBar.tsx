import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IndustryRotator } from "@/components/sections/IndustryRotator";
import { cta } from "@/content/site";
import { cn } from "@/lib/utils";
import type { useUnderwritingSequence } from "@/lib/useUnderwritingSequence";

type HeroBarProps = {
  seq: ReturnType<typeof useUnderwritingSequence>;
  count: number;
  statusText: string;
  /** The industries the bar cycles through, when the headline is not showing them beside "to". */
  industries?: string[];
};

function Divider({ className }: { className?: string }) {
  return <span aria-hidden className={cn("mx-3 hidden h-8 w-px shrink-0 bg-brand-200/20 lg:block", className)} />;
}

/**
 * The hero's glass status bar. Desktop: a floating glass pill, sticky at the
 * bottom of the first screen, with check progress, the example status,
 * "Talk to an expert", call and Replay. The CTA and call fade out once the
 * page scrolls (the foot CTAs come into view), and portrait desktop-layout
 * viewports, which show the foot CTAs at load, drop them (globals.css).
 * Mobile: a content-sized pill overlapping the terminal window with the
 * status.
 *
 * Nothing here is a control of the underwriting example: it runs and re-runs
 * on its own, so there is no Replay to press (D-067).
 *
 * Screen readers get one reading of the status: the visible labels and cells
 * are hidden from them, and the sr-only progress line plus the page's only
 * live region carry the same information.
 */
export function HeroBar({ seq, count, statusText, industries }: HeroBarProps) {
  const progress = count > 0 ? seq.done / count : 0;
  const steps = Array.from({ length: Math.max(0, count - 1) }, (_, i) => (i + 1) / count);

  return (
    <div
      data-hero-bar
      className={cn(
        "hero-bar relative z-20 -mt-14 px-5 sm:px-6 md:px-8 lg:sticky lg:bottom-0 lg:mt-0 lg:flex lg:min-h-20 lg:w-full lg:shrink-0 lg:items-start lg:justify-center lg:px-0 lg:pb-4",
        // Below 64rem the pill held only the industries; without them it has nothing to say
        !industries && "max-lg:hidden",
      )}
    >
      <div className="hero-bar-pill mx-auto flex h-14 w-fit max-w-md items-center justify-start gap-2 rounded-pill border border-white/12 bg-ink-950/60 pr-1.5 pl-4 backdrop-blur-md lg:mt-1.5 lg:h-auto lg:min-h-[3.625rem] lg:w-max lg:max-w-[calc(100%-3rem)] lg:justify-between lg:gap-3 lg:bg-ink-950/70 lg:py-1.5 lg:pl-6 lg:whitespace-nowrap lg:shadow-float">
        <span aria-hidden className="type-small hidden min-w-0 truncate font-medium text-brand-200 lg:inline">
          <span className="xl:hidden">Checks</span>
          <span className="hidden xl:inline">Underwriting checks</span>
        </span>

        <span
          aria-hidden
          className="hero-pre-track relative hidden h-2 w-40 min-w-16 shrink rounded-pill bg-white/25 @container lg:block xl:w-[13.75rem]"
          style={{ "--p": progress } as React.CSSProperties}
        >
          <span
            className="absolute inset-0 origin-left rounded-pill bg-brand-400 transition-transform duration-(--duration-base) ease-(--ease-out)"
            style={{ transform: "scaleX(var(--p))" }}
          />
          {/* Step marks sit where the counter's centre lands; a mark is hidden once reached, so it never touches the counter */}
          {steps.map((at) => (
            <span
              key={at}
              className={cn(
                "hero-pre-notch absolute top-1/2 hidden size-[5px] -translate-x-1/2 -translate-y-1/2 rounded-pill bg-white/60 transition-opacity duration-(--duration-fast) xl:block",
                progress >= at && "opacity-0",
              )}
              style={{ left: `calc(1.625rem + (100% - 3.25rem) * ${at})` }}
            />
          ))}
          <span
            className="absolute top-1/2 left-0 grid h-[22px] min-w-13 place-items-center rounded-sm bg-brand-600 px-1.5 text-[0.75rem] font-semibold text-white tabular ring-2 ring-ink-950 transition-transform duration-(--duration-base) ease-(--ease-out)"
            style={{ transform: "translate(calc((100cqw - 3.25rem) * var(--p)), -50%)" }}
          >
            <span className="hero-pre-now">
              {seq.done} of {count}
            </span>
            <span className="hero-pre-final">
              {count} of {count}
            </span>
          </span>
        </span>

        <span className="sr-only">
          Underwriting checks: {seq.done} of {count} complete.
        </span>

        {/* With a plain headline the industries turn here instead of beside
            "to". The status itself is not lost either way: the progress
            counter carries it, and the live region below announces it. */}
        {industries && (
          <>
            <Divider />
            <IndustryRotator
              industries={industries}
              className="min-w-0 font-display text-[1.125rem] font-extrabold [font-stretch:80%] text-on-dark lg:text-[1.375rem]"
            />
          </>
        )}

        <span className="sr-only" aria-live="polite" aria-atomic="true">
          Example application status: {statusText}
        </span>

        <span className="hero-bar-cta hidden lg:contents">
          <Divider />
          <Button href={cta.expert.href} size="sm" className="hidden lg:inline-flex">
            {cta.expert.label}
          </Button>
          <a
            href={cta.phone.href}
            aria-label={`Call ${cta.phone.label}`}
            className="hidden size-11 shrink-0 place-items-center rounded-pill bg-brand-600 text-white transition-colors duration-(--duration-fast) hover:bg-brand-700 lg:grid"
          >
            <Phone aria-hidden strokeWidth={1.75} className="size-4" />
          </a>
        </span>

      </div>
    </div>
  );
}
