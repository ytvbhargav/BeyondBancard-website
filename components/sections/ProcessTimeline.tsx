import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ScrollSteps } from "@/components/motion/ScrollSteps";
import { MaybeConfirm } from "@/components/ui/confirm";
import { cn } from "@/lib/utils";
import type { Flag, Step } from "@/types/content";

/** A step may carry a client-to-confirm flag on its body, like a feature item. */
type FlaggedStep = Step & Flag;

type Layout = "vertical" | "horizontal" | "scroll";

/**
 * Numbered process (a real sequence). Three layouts:
 * - vertical: compact list, optional aside (homepage, dark)
 * - horizontal: columns joined by a rule (Nutra, Industries hub)
 * - scroll: S5 account lifecycle; the progress line fills with scroll and
 *   each node pops as it is reached (GSAP ScrollTrigger, lazy-loaded)
 */
export function ProcessTimeline({
  title,
  lead,
  steps,
  layout = "vertical",
  tone = "paper",
  aside,
  id,
}: {
  title: string;
  lead?: string;
  steps: FlaggedStep[];
  layout?: Layout;
  tone?: "paper" | "surface" | "ink";
  aside?: React.ReactNode;
  id?: string;
}) {
  const dark = tone === "ink";
  const headingId = `${id ?? "process"}-title`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        "section-y",
        tone === "paper" && "bg-paper",
        tone === "surface" && "bg-surface",
        dark && "tone-dark bg-ink-950",
      )}
    >
      <Container>
        {layout === "horizontal" && (
          <>
            <SectionHeader id={headingId} title={title} lead={lead} tone={dark ? "dark" : "light"} />
            <HorizontalSteps steps={steps} dark={dark} />
          </>
        )}

        {layout === "vertical" && (
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
            <div className={aside ? "lg:col-span-7" : "lg:col-span-8"}>
              <SectionHeader id={headingId} title={title} lead={lead} tone={dark ? "dark" : "light"} className="md:mb-14" />
              <VerticalSteps steps={steps} dark={dark} />
            </div>
            {aside && <div className="lg:col-span-5 lg:col-start-8 lg:pt-2">{aside}</div>}
          </div>
        )}

        {layout === "scroll" && (
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-36">
                <SectionHeader id={headingId} title={title} lead={lead} tone={dark ? "dark" : "light"} className="mb-0 md:mb-0" />
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <ScrollSteps steps={steps} />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

function Node({ n, dark, className }: { n: number; dark?: boolean; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative z-10 grid size-10 shrink-0 place-items-center rounded-pill border font-display text-[0.9375rem] font-bold tabular [font-stretch:108%]",
        dark ? "border-ink-700 bg-ink-950 text-on-dark" : "border-line-strong bg-surface text-ink-900",
        className,
      )}
    >
      {n}
    </span>
  );
}

function VerticalSteps({ steps, dark }: { steps: FlaggedStep[]; dark: boolean }) {
  return (
    <Stagger as="ol" className="relative">
      {steps.map((s, i) => (
        <StaggerItem as="li" key={s.title} className="relative flex gap-5 pb-9 last:pb-0">
          {i < steps.length - 1 && (
            <span aria-hidden className={cn("absolute top-10 bottom-0 left-5 w-px", dark ? "bg-ink-800" : "bg-line")} />
          )}
          <Node n={i + 1} dark={dark} />
          <div className="pt-1.5">
            <h3 className={cn("type-h4", dark ? "text-on-dark" : "text-ink-900")}>
              <span className="sr-only">Step {i + 1}: </span>
              {s.title}
            </h3>
            <p className={cn("mt-1.5 max-w-[34rem]", dark ? "text-on-dark-muted" : "text-muted")}>
              <MaybeConfirm item={s}>{s.body}</MaybeConfirm>
            </p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/**
 * Phone pass (D-063): below sm the steps take VerticalSteps' form instead of the
 * desktop columns stacked up. The node sits beside the title (grid column 1,
 * spanning the title and body rows), the body runs in column 2, and a phone-only
 * rail joins each node to the next. From sm up the li is a list item again, so the
 * grid-only classes do nothing and the 2-column (sm) and ruled 4/5-column (lg)
 * layouts are unchanged.
 */
function HorizontalSteps({ steps, dark }: { steps: FlaggedStep[]; dark: boolean }) {
  const cols = steps.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4";
  return (
    // phone pass (D-063): 32px between steps below sm; sm:gap-10 restores today's 40px, lg:gap-6 unchanged.
    <Stagger as="ol" className={cn("grid gap-8 sm:grid-cols-2 sm:gap-10 lg:gap-6", cols)}>
      {steps.map((s, i) => (
        <StaggerItem
          as="li"
          key={s.title}
          // phone pass (D-063): a node | text grid below sm; sm:list-item restores the li's default display.
          className="relative grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 sm:list-item"
        >
          {/* phone pass (D-063): the rail runs from the bottom of this node through the 32px gap
              (-bottom-8 matches gap-8) to the top of the next node, as in VerticalSteps. */}
          {i < steps.length - 1 && (
            <span
              aria-hidden
              className={cn("absolute top-10 -bottom-8 left-5 w-px sm:hidden", dark ? "bg-ink-800" : "bg-line-strong")}
            />
          )}
          {/* phone pass (D-063): row-span-2 and self-start hold the node at the top of column 1,
              beside the title; both do nothing once the li is a list item from sm. */}
          <div className="row-span-2 flex items-center self-start">
            <Node n={i + 1} dark={dark} />
            {/* -mr-3 runs the rule half-way into the grid gap, so it stops 12px short of
                the next node, matching the 12px after this one */}
            {i < steps.length - 1 && (
              <span aria-hidden className={cn("ml-3 hidden h-px flex-1 lg:-mr-3 lg:block", dark ? "bg-ink-800" : "bg-line-strong")} />
            )}
          </div>
          {/* phone pass (D-063): mt-2 centres the 22px title line on the 40px node; sm:mt-5 restores today's value. */}
          <h3 className={cn("type-h4 mt-2 sm:mt-5", dark ? "text-on-dark" : "text-ink-900")}>
            <span className="sr-only">Step {i + 1}: </span>
            {s.title}
          </h3>
          {/* phone pass (D-063): mt-1.5 as in VerticalSteps; sm:mt-2 restores today's value. */}
          <p className={cn("mt-1.5 max-w-[26rem] pr-2 sm:mt-2", dark ? "text-on-dark-muted" : "text-muted")}>
            <MaybeConfirm item={s}>{s.body}</MaybeConfirm>
          </p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
