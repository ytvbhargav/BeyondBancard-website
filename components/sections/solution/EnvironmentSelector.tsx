"use client";

import { Fragment, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChipToggle } from "@/components/ui/chip";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/Reveal";
import { BlockTitle, ChapterMark, type BlockProps } from "@/components/sections/solution/BlockSection";
import { cn } from "@/lib/utils";
import type { SelectorBlock } from "@/types/content";

/**
 * Environment picker (D-058): choose where payments happen, read the matching
 * recommendation. The left column holds the h2, the optional lead, the legend
 * as a visible label and one toggle chip per option, the first pressed by
 * default. The result sits in a file panel beside the chips from lg (below them
 * on smaller screens), laid out like CostEstimator's: the chosen option as a
 * pill, the recommendation, then the onward link under a hairline.
 *
 * Every recommendation shares one grid cell, so the panel keeps the height of
 * the longest and the button never moves under the pointer; only the chosen one
 * is visible, and it fades up when the choice changes. That stack is decorative
 * (aria-hidden); screen readers get the chosen text from a polite live region,
 * which announces each change.
 */
export function EnvironmentSelector({ block, tone, headingId, index }: BlockProps<SelectorBlock>) {
  const [active, setActive] = useState(0);
  const current = block.options[active];
  if (!current) return null;
  const legendId = `${headingId}-legend`;

  return (
    <Section id={block.id} tone={tone} aria-labelledby={headingId}>
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
        <Reveal className="min-w-0 lg:col-span-5">
          <ChapterMark index={index} />
          <h2 id={headingId} className="type-h2">
            <BlockTitle title={block.title} flag={block} />
          </h2>
          {block.lead && <p className="type-body-lg mt-5 max-w-[28rem] text-muted">{block.lead}</p>}
          <p id={legendId} className="type-h4 mt-10 text-ink-900">
            {block.legend}
          </p>
          <div role="group" aria-labelledby={legendId} className="mt-4 flex flex-wrap gap-2">
            {block.options.map((option, i) => (
              <ChipToggle key={option.label} pressed={i === active} onClick={() => setActive(i)}>
                {option.label}
              </ChipToggle>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="min-w-0 lg:col-span-6 lg:col-start-7">
          {/* White on either tone (spec §4); the hairline sets it apart on a white section */}
          <div className="rounded-md border border-line bg-surface p-5 sm:p-6 md:p-8">
            <div aria-hidden>
              <Badge status="neutral" icon={false}>
                {current.label}
              </Badge>
              <div className="mt-5 grid">
                {block.options.map((option, i) => (
                  <p
                    key={option.label}
                    className={cn(
                      "type-body-lg col-start-1 row-start-1 max-w-[36rem] text-pretty text-ink-900",
                      // The outgoing text hides at once (no transition); the incoming one fades up
                      i === active
                        ? "visible translate-y-0 opacity-100 transition-[opacity,translate] duration-(--duration-fast) ease-(--ease-out)"
                        : "invisible translate-y-1 opacity-0",
                    )}
                  >
                    <Emphasis text={option.text} />
                  </p>
                ))}
              </div>
            </div>
            <p aria-live="polite" aria-atomic="true" className="sr-only">
              <Emphasis text={current.text} />
            </p>
            {block.link && (
              <div className="mt-8 border-t border-line pt-6">
                {/* Wraps rather than overflowing if a label outgrows a phone-width panel */}
                <Button
                  href={block.link.href}
                  variant="secondary"
                  arrow
                  className="h-auto min-h-12 py-3 text-center whitespace-normal"
                >
                  {block.link.label}
                </Button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/** Content marks emphasis with **double asterisks**: every odd segment of the split is emphasised. */
function Emphasis({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold">
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
