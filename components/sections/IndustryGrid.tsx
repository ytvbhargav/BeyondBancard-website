import { Button } from "@/components/ui/button";
import { Chip, ChipLink } from "@/components/ui/chip";
import { Section, SectionHeader } from "@/components/ui/section";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { SnapCarousel } from "@/components/motion/SnapCarousel";
import { hasIndustryPage, industryPath } from "@/content/industries";
import type { Industry } from "@/types/content";

/** Featured complex industries (PRD §9.1.4, §9.2.4, §9.3.2). */
export function IndustryGrid({
  title,
  lead,
  industries,
  chips,
  chipsLabel,
  showViewAll = true,
  size = "md",
  tone = "paper",
}: {
  title: string;
  lead?: string;
  industries: Industry[];
  chips?: Industry[];
  chipsLabel?: string;
  showViewAll?: boolean;
  size?: "md" | "lg";
  tone?: "paper" | "surface";
}) {
  const viewAll = (
    <Button href="/industries" variant="secondary" arrow>
      View all industries
    </Button>
  );

  return (
    <Section tone={tone} aria-labelledby="industry-grid-title">
      <SectionHeader id="industry-grid-title" title={title} lead={lead} action={showViewAll && !chips ? viewAll : undefined} />
      <SnapCarousel
        label={title}
        breakpoint="sm"
        stagger
        trackClassName="sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
        itemClassName="sm:w-auto"
      >
        {industries.map((ind) => (
          <SpotlightCard key={ind.slug} href={industryPath(ind.slug)} title={ind.name} body={ind.teaser} size={size} />
        ))}
      </SnapCarousel>

      {chips && (
        <div className="mt-10 flex flex-col gap-6 border-t border-line pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {chipsLabel && <p className="type-small mr-2 w-full font-medium text-muted sm:w-auto">{chipsLabel}</p>}
            {/* A chip only links where there is somewhere to land: the rest are
                industries Beyond names but has no page for yet, and a link
                there would drop the reader on the redesign placeholder. */}
            <ul className="contents">
              {chips.map((c) => (
                <li key={c.slug}>
                  {hasIndustryPage(c.slug) ? (
                    <ChipLink href={industryPath(c.slug)}>{c.name}</ChipLink>
                  ) : (
                    <Chip>{c.name}</Chip>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {showViewAll && <div className="shrink-0">{viewAll}</div>}
        </div>
      )}
    </Section>
  );
}
