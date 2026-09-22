import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

type Tone = "paper" | "surface" | "ink" | "ink-deep";

const toneClass: Record<Tone, string> = {
  paper: "bg-paper text-ink-900",
  surface: "bg-surface text-ink-900",
  ink: "tone-dark bg-ink-900",
  "ink-deep": "tone-dark bg-ink-950",
};

/**
 * Page section with the standard vertical rhythm (56 / 80 / 100px) and container.
 * `space` lets hero-adjacent or compact bands tighten the padding without
 * fighting specificity elsewhere.
 */
export function Section({
  tone = "paper",
  space = "default",
  className,
  containerClassName,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  tone?: Tone;
  space?: "default" | "compact" | "none";
  containerClassName?: string;
}) {
  return (
    <section
      className={cn(
        toneClass[tone],
        space === "default" && "section-y",
        space === "compact" && "py-12 md:py-16",
        className,
      )}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/** True when a caller sets its own base bottom margin (mb-0, mb-6, my-4, m-0…). */
const setsBaseMargin = (className?: string) => !!className && /(?:^|\s)-?m[by]?-/.test(className);

/**
 * Section heading: H2 + optional lead. Left-aligned by default with an optional
 * action on the right; `align="center"` is for showcase sections whose content
 * spans the full width (stacked panels, carousels).
 */
export function SectionHeader({
  title,
  lead,
  action,
  id,
  className,
  tone = "light",
  as: Heading = "h2",
  align = "left",
}: {
  title: React.ReactNode;
  lead?: React.ReactNode;
  action?: React.ReactNode;
  id?: string;
  className?: string;
  tone?: "light" | "dark";
  as?: "h2" | "h3";
  align?: "left" | "center";
}) {
  // phone pass (D-063): 32px from the header to its content on phones; the sm: step restores
  // today's 40px (centred) / 48px (left) at 640-767. A caller with its own base margin (mb-0 in
  // split layouts, mb-6 on careers) keeps it at sm too, so the restore is left out for them.
  const ownMargin = setsBaseMargin(className);
  if (align === "center") {
    return (
      <div
        className={cn(
          "mx-auto mb-8 flex max-w-[48rem] flex-col items-center text-center md:mb-14",
          !ownMargin && "sm:mb-10",
          className,
        )}
      >
        <Heading id={id} className={cn(Heading === "h2" ? "type-h2" : "type-h3", tone === "dark" ? "text-on-dark" : "text-ink-900")}>
          {title}
        </Heading>
        {lead && (
          <p className={cn("type-body-lg mt-5 max-w-[40rem]", tone === "dark" ? "text-on-dark-muted" : "text-muted")}>{lead}</p>
        )}
        {action && <div className="mt-8">{action}</div>}
      </div>
    );
  }
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-6 md:mb-16 lg:flex-row lg:items-end lg:justify-between",
        !ownMargin && "sm:mb-12",
        className,
      )}
    >
      <div className="max-w-[40rem]">
        <Heading id={id} className={cn(Heading === "h2" ? "type-h2" : "type-h3", tone === "dark" ? "text-on-dark" : "text-ink-900")}>
          {title}
        </Heading>
        {lead && (
          <p className={cn("type-body-lg mt-5 max-w-[36rem]", tone === "dark" ? "text-on-dark-muted" : "text-muted")}>{lead}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
