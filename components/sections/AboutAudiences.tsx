import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeader } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import type { Audience } from "@/content/about";

/** Keeps hyphenated words ("high-risk") on one line, so a title never breaks at the hyphen. */
function keepHyphenated(title: string) {
  return title.split(/(\S+-\S+)/).map((part, i) =>
    i % 2 ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/**
 * Who Beyond works with (spec §3.1): three peers under a top rule, each routing its
 * audience onward. Stacked on phones; ruled rows on tablets (title left, body and link
 * on the values' right column); three columns from lg. The columns share one subgrid,
 * so bodies and links line up across them even when a title wraps.
 */
export function AboutAudiences({ title, items }: { title: string; items: Audience[] }) {
  return (
    <Section tone="paper" aria-labelledby="audiences-title">
      <SectionHeader id="audiences-title" title={title} />
      <Stagger as="ul" className="grid gap-x-8 lg:grid-cols-3">
        {items.map((a) => (
          <StaggerItem
            as="li"
            key={a.title}
            className="grid content-start border-t border-line-strong pt-6 pb-10 md:grid-cols-12 md:gap-x-8 md:pb-8 lg:row-span-3 lg:grid-cols-1 lg:grid-rows-subgrid lg:gap-x-0 lg:pb-0"
          >
            {/* Icon top-aligned to the first line (the title wraps to two lines at md and at lg widths near 1024px) */}
            <div className="flex items-start gap-3 md:col-span-5 md:row-span-2 md:self-start lg:col-span-1 lg:row-span-1">
              <Icon name={a.icon} className="mt-0.5 size-5 shrink-0 text-brand-600" />
              <h3 className="type-h4">{keepHyphenated(a.title)}</h3>
            </div>
            <p className="mt-2.5 max-w-[26rem] text-muted md:col-span-7 md:col-start-6 md:row-start-1 md:mt-0 lg:col-span-1 lg:col-start-auto lg:row-start-auto lg:mt-2.5">
              {a.body}
            </p>
            <Button
              href={a.link.href}
              variant="ghost"
              arrow
              className="mt-3 justify-self-start md:col-span-7 md:col-start-6 md:row-start-2 md:mt-2 lg:col-span-1 lg:col-start-auto lg:row-start-auto lg:mt-4"
            >
              {a.link.label}
            </Button>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
