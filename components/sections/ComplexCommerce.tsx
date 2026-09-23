import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { SnapCarousel } from "@/components/motion/SnapCarousel";
import { industryPath } from "@/content/industries";
import { cn } from "@/lib/utils";
import type { Industry } from "@/types/content";

/**
 * The complex industries, as a rail the reader moves through rather than a grid
 * they take in at once: a native scroll-snap carousel, with arrows and dots for
 * anyone not swiping.
 *
 * Each card is an art panel over its own caption. The panel carries a mark
 * drawn in CSS gradients in the brand blues (`.motif-*` in globals.css) with
 * the industry's name set on it; the caption below it is the teaser and the
 * link. Nothing is photographed and nothing is loaded — the rail is type and
 * geometry.
 *
 * The snapping and the scrolling are the browser's own; the only script is the
 * carousel's arrows and its active dot.
 */
export function ComplexCommerce({
  title,
  lead,
  industries,
}: {
  title: string;
  lead?: string;
  industries: Industry[];
}) {
  return (
    <Section tone="surface" aria-labelledby="complex-commerce-title">
      <SectionHeader
        id="complex-commerce-title"
        title={title}
        lead={lead}
        action={
          <Button href="/industries" variant="secondary" arrow>
            View all industries
          </Button>
        }
      />

      <div className="mt-12 md:mt-16">
        <SnapCarousel
          label={title}
          breakpoint="none"
          stagger
          trackClassName="gap-4 md:gap-5"
          itemClassName="w-[78%] sm:w-[46%] lg:w-[31%] xl:w-[23.5%]"
        >
          {industries.map((industry, i) => (
            <Link key={industry.slug} href={industryPath(industry.slug)} className="group block">
              {/* The art panel: the mark, and the name set on it */}
              <span
                className={cn("motif relative block aspect-4/5 overflow-hidden rounded-lg", `motif-${(i % 6) + 1}`)}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-ink-950 from-10% via-ink-950/30 via-60% to-ink-950/0 transition-opacity duration-(--duration-base) group-hover:opacity-80"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-baseline gap-2.5 p-5">
                  <span className="type-small font-semibold text-brand-300 tabular">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="type-h4 text-balance text-on-dark">{industry.name}</span>
                </span>
              </span>

              {/* The caption, under the panel rather than on it */}
              <span className="mt-5 block max-w-[34ch] text-pretty text-muted">{industry.teaser}</span>
              <span className="type-small mt-4 inline-flex items-center gap-1.5 font-semibold text-brand-700">
                Explore {industry.name}
                <ArrowRight
                  aria-hidden
                  strokeWidth={2}
                  className="size-4 transition-transform duration-(--duration-base) ease-(--ease-out) group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </SnapCarousel>
      </div>
    </Section>
  );
}
