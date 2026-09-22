import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { Parallax } from "@/components/motion/Parallax";
import { cn } from "@/lib/utils";
import type { Pillar } from "@/types/content";

/**
 * Solution opening. A sibling to the industry hero rather than a copy of it: the
 * field is light and the headline holds a narrow column on the left, with the
 * illustration on a raised panel that breaks the bottom edge of the section, so
 * the page starts on an object rather than on a band of colour.
 *
 * A hub (a pillar's top page) sets the headline a step larger than a detail page
 * and names the pillar in the eyebrow, so the four hubs read as the chapter
 * openings of the section they lead.
 *
 * The headline and lead animate in CSS so they paint before hydration (LCP);
 * only the illustration's drift is scripted, and that is dropped below lg.
 */
export function SolutionHero({
  pillar,
  kind,
  title,
  lead,
  breadcrumb,
  actions,
  visual,
}: {
  pillar?: Pillar;
  kind: "hub" | "detail";
  title: string;
  lead: string;
  breadcrumb: { label: string; href?: string }[];
  actions: React.ReactNode;
  visual?: React.ReactNode;
}) {
  const hub = kind === "hub";
  const eyebrow = pillar ?? breadcrumb.at(0)?.label ?? "";

  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-paper">
      {/* A wash from the top-left corner: enough to lift the type off the page, never enough to tint it */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_0%_0%,color-mix(in_srgb,var(--color-brand-600)_10%,transparent),transparent_70%)]"
      />

      <Container className="pt-6 pb-0">
        <Breadcrumb items={breadcrumb} className="anim-rise" />

        <div className={cn("grid items-end gap-12 pt-14 md:pt-20 lg:gap-8", visual && "lg:grid-cols-12")}>
          <div className={cn("min-w-0", visual ? "lg:col-span-6 lg:pb-24" : "max-w-[46rem] pb-20 md:pb-28")}>
            {eyebrow && (
              <p
                className="anim-rise type-small font-semibold tracking-[0.18em] text-brand-700 uppercase"
                style={{ "--delay": "0ms" } as React.CSSProperties}
              >
                {eyebrow}
              </p>
            )}
            <h1
              className={cn(
                "anim-rise mt-5 max-w-[18ch] font-semibold tracking-[-0.02em] text-balance text-ink-900",
                // The leading rides with the size: as separate classes, tailwind-merge drops it.
                hub ? "text-[clamp(2.5rem,5.6vw,4.5rem)]/[1.05]" : "text-[clamp(2.125rem,4.4vw,3.5rem)]/[1.08]",
              )}
              style={{ "--delay": "80ms" } as React.CSSProperties}
            >
              {title}
            </h1>
            <p
              className="anim-rise type-body-lg mt-6 max-w-[34rem] text-muted"
              style={{ "--delay": "170ms" } as React.CSSProperties}
            >
              {lead}
            </p>
            <div
              className="anim-rise mt-9 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              style={{ "--delay": "250ms" } as React.CSSProperties}
            >
              {actions}
            </div>
          </div>

          {/* The illustration sits on a panel that overlaps the section's bottom edge */}
          {visual && (
            <div className="lg:col-span-5 lg:col-start-8 lg:-mb-20">
              <div className="relative rounded-md border border-line bg-surface p-4 shadow-float sm:p-6">
                <Parallax distance={40}>{visual}</Parallax>
              </div>
            </div>
          )}
        </div>

        {/* Without an illustration the section closes on its own padding */}
        {!visual && <div className="h-0" />}
      </Container>

      {/* Room for the overlapping panel, so the next chapter never runs under it */}
      {visual && <div aria-hidden className="h-16 lg:h-24" />}
    </section>
  );
}
