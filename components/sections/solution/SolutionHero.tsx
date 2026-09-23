import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { ColorField } from "@/components/motion/ColorField";
import { cn } from "@/lib/utils";
import type { Pillar } from "@/types/content";

/**
 * Solution opening: the industry hero inverted. The same lake of colour and the
 * same ruled grid, but the page is white and the grid is drawn in blue, where
 * the industries are blue and ruled in white. The headline holds a narrow
 * column on the left and the illustration sits on a raised panel beside it.
 *
 * The type starts directly under the breadcrumb and the panel is centred
 * against it, the same way the industry hero is set: aligning the two to the
 * section's foot instead left a hole above the eyebrow.
 *
 * A hub (a pillar's top page) sets the headline a step larger than a detail page
 * and names the pillar in the eyebrow, so the four hubs read as the chapter
 * openings of the section they lead.
 *
 * The headline and lead animate in CSS so they paint before hydration (LCP),
 * and nothing in the section is scripted at all.
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
    <section className="relative isolate -mt-(--header-h) overflow-hidden border-b border-line bg-paper">
      {/* The same field as the industry heroes, at its light strength */}
      <ColorField tone="light" className="-top-[30%] right-[-12%] bottom-[-34%] left-[-10%] -z-10" />
      {/* Holds the type's contrast wherever the colour happens to be */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-paper from-15% via-paper/80 via-50% to-paper/0 to-85%"
      />
      {/* The grid, ruled in blue on white: the industries' grid inverted */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background-image:linear-gradient(to_right,var(--color-brand-600)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-brand-600)_1px,transparent_1px)] [mask-image:radial-gradient(80%_60%_at_70%_0%,black,transparent)] [background-size:72px_72px] opacity-[0.07]"
      />

      <Container className="pt-[calc(var(--header-h)+0.75rem)] pb-0">
        <Breadcrumb items={breadcrumb} className="anim-rise" />

        {/* The type starts under the breadcrumb rather than being pushed down
            to meet the panel, and the panel lines up with it. */}
        <div className={cn("grid items-start gap-10 pt-4 md:pt-6 lg:gap-8", visual && "lg:grid-cols-12")}>
          <div className={cn("min-w-0 pb-14 md:pb-20", visual ? "lg:col-span-6" : "max-w-[46rem]")}>
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
              className="anim-rise mt-6 max-w-[34rem] type-body-lg text-muted"
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

          {/* The panel sits level with the type it belongs to, and sits on the
              page rather than hovering over it: a hairline and a short, tight
              shadow instead of the long one, and no drift inside the frame —
              an illustration sliding against its own border is what made it
              read as floating. */}
          {visual && (
            <div className="lg:col-span-5 lg:col-start-8 lg:self-center">
              <div className="relative rounded-md border border-line bg-surface p-4 shadow-[0_10px_28px_-18px_rgb(7_16_42/0.3)] sm:p-6">
                {visual}
              </div>
            </div>
          )}
        </div>

        {/* Without an illustration the section closes on its own padding */}
        {!visual && <div className="h-0" />}
      </Container>
    </section>
  );
}
