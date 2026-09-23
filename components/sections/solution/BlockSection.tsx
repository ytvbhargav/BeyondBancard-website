import { Section } from "@/components/ui/section";
import { RevealWords } from "@/components/motion/RevealWords";
import { cn } from "@/lib/utils";
import type { Flag } from "@/types/content";

export type BlockTone = "paper" | "surface" | "ink";

/** Props every solution block component receives from `SolutionPage`. */
export type BlockProps<B> = {
  block: B;
  /** Background, alternated by the page so neighbouring sections never share a tone. */
  tone: BlockTone;
  /** Id for the section's h2; the section is labelled by it. */
  headingId: string;
  /** Position in the page, from 0: the chapter number in the header. */
  index?: number;
};

/**
 * The chapter number and its rule, for blocks that lay out their own header
 * rather than using BlockSection's.
 */
export function ChapterMark({
  index,
  tone = "light",
  className,
}: {
  index?: number;
  tone?: "light" | "dark";
  className?: string;
}) {
  if (typeof index !== "number") return null;
  const dark = tone === "dark";
  return (
    <div className={cn("mb-5 flex items-center gap-4", className)}>
      <span className={cn("type-small font-semibold tabular", dark ? "text-brand-300" : "text-brand-700")}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <span aria-hidden className={cn("h-px w-12", dark ? "bg-ink-700" : "bg-line-strong")} />
    </div>
  );
}

/** A block's title: the words rise one after another as the section is reached. */
export function BlockTitle({ title }: { title: string; flag?: Flag }) {
  return <RevealWords text={title} />;
}

/**
 * The four ways a chapter's body arrives, cycled by the chapter's position.
 * A long page of identical fade-ups reads as one long section; giving each
 * chapter its own entrance is what makes them read as separate ones.
 */
const ENTRANCES = ["chapter-rise", "chapter-slide", "chapter-lift", "chapter-settle"] as const;

/**
 * A chapter of a solution page.
 *
 * The page reads as a numbered sequence rather than a stack of identical bands:
 * the number and its rule hold a narrow left column, and the title and lead take
 * the wide one. Below lg the two columns become one and the number sits above
 * the title, where a phone has no room for a margin column.
 *
 * The header is the same in every chapter, so the sequence stays legible; the
 * body is what changes, arriving one of four ways depending on where the
 * chapter falls in the page.
 */
export function BlockSection({
  block,
  tone,
  headingId,
  index,
  space = "default",
  action,
  className,
  headerClassName,
  eyebrow,
  children,
}: BlockProps<Flag & { id?: string; title: string; lead?: string }> & {
  space?: "default" | "compact";
  action?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  /** Small label above the title; the chapter number is added separately. */
  eyebrow?: string;
  children: React.ReactNode;
}) {
  const dark = tone === "ink";
  const number = typeof index === "number" ? String(index + 1).padStart(2, "0") : undefined;

  return (
    <Section id={block.id} tone={tone} space={space} aria-labelledby={headingId} className={className}>
      <>
        <div className={cn("grid gap-6 lg:grid-cols-12 lg:gap-8", headerClassName)}>
          {/* The chapter mark: number, rule and optional label */}
          <div className="lg:col-span-3 xl:col-span-2">
            <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
              {number && (
                <span className={cn("type-small font-semibold tabular", dark ? "text-brand-300" : "text-brand-700")}>
                  {number}
                </span>
              )}
              <span
                aria-hidden
                className={cn("h-px flex-1 lg:w-12 lg:flex-none", dark ? "bg-ink-700" : "bg-line-strong")}
              />
              {eyebrow && (
                <span
                  className={cn(
                    "type-small font-semibold tracking-[0.14em] uppercase",
                    dark ? "text-on-dark-muted" : "text-muted",
                  )}
                >
                  {eyebrow}
                </span>
              )}
            </div>
          </div>

          <div className="lg:col-span-9 xl:col-span-10">
            <h2
              id={headingId}
              className={cn(
                "max-w-[20ch] text-[clamp(1.875rem,3.4vw,3.25rem)]/[1.08] font-semibold tracking-[-0.015em] text-balance",
                dark ? "text-on-dark" : "text-ink-900",
              )}
            >
              <BlockTitle title={block.title} />
            </h2>
            {block.lead && (
              <p
                className={cn(
                  "mt-5 max-w-[38rem] type-body-lg text-pretty",
                  dark ? "text-on-dark-muted" : "text-muted",
                )}
              >
                {block.lead}
              </p>
            )}
            {action && <div className="mt-8">{action}</div>}
          </div>
        </div>

        <div data-reveal="" className={cn("mt-10 md:mt-14 lg:mt-16", ENTRANCES[(index ?? 0) % ENTRANCES.length])}>
          {children}
        </div>
      </>
    </Section>
  );
}
