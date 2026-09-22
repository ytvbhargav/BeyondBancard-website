import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { RowLink } from "@/components/ui/text-link";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { partnersMenu, portals } from "@/content/site";

/** Partners teaser (PRD §9.1.6): three programmes as ruled columns, not cards. */
export function PartnersTeaser({
  title,
  lead,
  loginLine,
  loginLabel,
}: {
  title: string;
  lead: string;
  loginLine: string;
  loginLabel: string;
}) {
  const programs = partnersMenu.filter((p) => p.href !== "/partners");
  return (
    <Section tone="surface" aria-labelledby="partners-title">
      <SectionHeader id="partners-title" title={title} lead={lead} />
      <Stagger as="ul" className="grid gap-x-8 md:grid-cols-3">
        {programs.map((p) => (
          <StaggerItem as="li" key={p.href} className="border-t-2 border-ink-900 pt-6 pb-8 md:pb-0">
            <h3 className="type-h3">
              <RowLink href={p.href} className="min-h-11 text-ink-900 hover:text-brand-700">
                {p.label}
              </RowLink>
            </h3>
            <p className="mt-2 max-w-[22rem] text-muted">{p.description}</p>
          </StaggerItem>
        ))}
      </Stagger>
      {/* phone pass (D-063): the last item's pb-8 already spaces the login line below sm, so mt-4 there; sm+ unchanged. */}
      <p className="type-small mt-4 flex flex-wrap items-center gap-x-2 text-muted sm:mt-12 md:mt-16">
        {loginLine}{" "}
        <a
          href={portals.partner.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1 font-semibold text-brand-700"
        >
          <span className="link-draw">{loginLabel}</span>
          <ArrowUpRight aria-hidden strokeWidth={1.75} className="size-4" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
    </Section>
  );
}
