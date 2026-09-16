import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ScrollSteps } from "@/components/motion/ScrollSteps";
import { cn } from "@/lib/utils";
import type { Step } from "@/types/content";

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
  steps: Step[];
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

function VerticalSteps({ steps, dark }: { steps: Step[]; dark: boolean }) {
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
            <p className={cn("mt-1.5 max-w-[34rem]", dark ? "text-on-dark-muted" : "text-muted")}>{s.body}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

function HorizontalSteps({ steps, dark }: { steps: Step[]; dark: boolean }) {
  const cols = steps.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4";
  return (
    <Stagger as="ol" className={cn("grid gap-10 sm:grid-cols-2 lg:gap-6", cols)}>
      {steps.map((s, i) => (
        <StaggerItem as="li" key={s.title} className="relative">
          <div className="flex items-center">
            <Node n={i + 1} dark={dark} />
            {i < steps.length - 1 && (
              <span aria-hidden className={cn("ml-3 hidden h-px flex-1 lg:block", dark ? "bg-ink-800" : "bg-line-strong")} />
            )}
          </div>
          <h3 className={cn("type-h4 mt-5", dark ? "text-on-dark" : "text-ink-900")}>
            <span className="sr-only">Step {i + 1}: </span>
            {s.title}
          </h3>
          <p className={cn("mt-2 max-w-[26rem] pr-2", dark ? "text-on-dark-muted" : "text-muted")}>{s.body}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
