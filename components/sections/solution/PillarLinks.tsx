import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { solutionsMenu } from "@/content/site";
import { href } from "@/lib/links";
import { cn } from "@/lib/utils";
import type { Pillar } from "@/types/content";
import type { BlockTone } from "@/components/sections/solution/BlockSection";

/**
 * "The bigger picture" (D-058, revised on client feedback): this pillar's role in
 * one sentence, then all four pillars on one line, joined like the live page's
 * lifecycle row. This page's pillar is the filled node; the other three are links.
 * Nodes are dots on a rule, not tabs, and each label names where it goes.
 */
export function PillarLinks({
  pillar,
  title,
  lead,
  tone,
  isHub = false,
}: {
  pillar: Pillar;
  title: string;
  lead: string;
  tone: BlockTone;
  /** True on a pillar hub, where the current node is this page and so is not a link. */
  isHub?: boolean;
}) {
  return (
    <Section tone={tone} aria-labelledby="bigger-picture-title">
      <SectionHeader id="bigger-picture-title" title={title} lead={lead} align="center" />
      <Stagger as="ol" className="mx-auto grid max-w-[56rem] grid-cols-4">
        {solutionsMenu.map((c, i) => (
          <StaggerItem as="li" key={c.pillar} className="relative flex flex-col items-center">
            {/* The rule joins node centres: it stops at the first and last dot */}
            <span
              aria-hidden
              className={cn(
                "absolute top-4 h-px bg-line-strong md:top-[1.0625rem]",
                i === 0 ? "left-1/2" : "left-0",
                i === solutionsMenu.length - 1 ? "right-1/2" : "right-0",
              )}
            />
            <PillarNode pillar={c.pillar} descriptor={c.descriptor} pillarHref={c.href} current={c.pillar === pillar} isHub={isHub} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

function Dot({ current }: { current: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative z-10 grid size-8 place-items-center rounded-pill border-[1.5px] transition-colors duration-(--duration-fast) md:size-9",
        current
          ? "border-ink-900 bg-ink-900 forced-colors:border-2"
          : "border-line-strong bg-surface group-hover/node:border-brand-600",
      )}
    >
      <span
        className={cn("size-2 rounded-pill", current ? "bg-on-dark" : "bg-transparent group-hover/node:bg-brand-600")}
      />
    </span>
  );
}

function PillarNode({
  pillar,
  descriptor,
  pillarHref,
  current,
  isHub,
}: {
  pillar: Pillar;
  descriptor: string;
  pillarHref: string;
  current: boolean;
  isHub: boolean;
}) {
  const name = <span className="type-small block font-semibold md:text-[0.9375rem]">{pillar}</span>;

  // On a pillar hub the current node is the page itself, so it is text, not a link.
  if (current && isHub) {
    return (
      <span aria-current="page" className="flex min-h-11 flex-col items-center px-1 text-ink-900">
        <Dot current />
        <span className="mt-3 text-center">
          {name}
          <span className="sr-only"> (this page)</span>
        </span>
      </span>
    );
  }

  return (
    <Link
      href={href(pillarHref)}
      className={cn(
        "group/node link-draw-parent flex min-h-11 flex-col items-center px-1",
        current ? "text-ink-900" : "text-muted hover:text-ink-900",
      )}
    >
      <Dot current={current} />
      <span className="link-draw mt-3 text-center">
        {name}
        <span className="sr-only">: {descriptor}</span>
      </span>
    </Link>
  );
}
