import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { PageHero } from "@/components/sections/PageHero";
import { RolesBoard } from "@/components/sections/RolesBoard";
import { CareersRolesLink } from "@/components/sections/CareersRolesLink";
import { CtaBand } from "@/components/sections/CtaBand";
import { careers } from "@/content/careers";
import { careersEmail, companyValues, valuesHref } from "@/content/company";

export const metadata: Metadata = {
  title: "Careers",
  description: careers.hero.lead,
};

export default function CareersPage() {
  const { roles, culture, values } = careers;
  const shownRoles = roles.items;
  const roleCount = shownRoles.length;

  return (
    <>
      <PageHero
        breadcrumb={careers.breadcrumb}
        title={careers.hero.title}
        lead={careers.hero.lead}
        actions={
          <>
            {roleCount > 0 && <CareersRolesLink target={roles.id}>{careers.hero.rolesCta}</CareersRolesLink>}
            <Button href={`mailto:${careersEmail}`} variant="ghost" className={roleCount > 0 ? "sm:ml-3" : undefined}>
              {careersEmail}
            </Button>
          </>
        }
      />

      {/* The page's job: open roles first, each one click from its posting. Hero-adjacent on the same
          paper tone, so a short top padding keeps the first role in the first view. */}
      <Section tone="paper" space="none" className="pt-10 section-b" aria-labelledby={roles.id}>
        <SectionHeader
          id={roles.id}
          title={roles.title}
          // Count on the heading's baseline, close to the board it counts. The heading takes focus
          // after the hero jump (tabindex -1), so it shows no ring, like the article's sections.
          className="mb-6 gap-1 sm:flex-row sm:items-baseline sm:justify-between md:mb-6 lg:items-baseline [&_h2]:outline-none"
          action={
            roleCount > 0 && (
              <p className="text-muted">
                <span className="font-semibold text-ink-900 tabular">{roleCount}</span> {roles.countLabel(roleCount)}
              </p>
            )
          }
        />
        <div className="anim-rise" style={{ "--delay": "360ms" } as React.CSSProperties}>
          <RolesBoard
            roles={shownRoles}
            linkLabel={roles.linkLabel}
            empty={
              <p className="max-w-[40rem] type-body-lg text-ink-900">
                {roles.empty.body}{" "}
                <a href={`mailto:${roles.empty.email}`} className="link-draw font-semibold text-brand-700">
                  {roles.empty.email}
                </a>
                .
              </p>
            }
          />
        </div>
      </Section>

      <Section tone="surface" aria-labelledby="culture-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-8">
          <Reveal className="lg:col-span-5">
            <h2 id="culture-title" className="max-w-[16ch] type-h2">
              {culture.title}
            </h2>
          </Reveal>
          <Stagger
            as="ul"
            className="grid gap-x-8 sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:grid-cols-1 xl:grid-cols-2"
          >
            {culture.items.map((s) => (
              <StaggerItem as="li" key={s.text} className="border-t border-line-strong pt-5 pb-8">
                <Icon name={s.icon} className="size-6 text-brand-600" />
                <p className="mt-3 max-w-[30rem] type-body-lg text-pretty text-ink-900">{s.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Titles only; the full statements live on About (single source in content/company.ts). */}
        <div className="mt-14 grid gap-x-8 md:mt-20 lg:grid-cols-12 lg:grid-rows-[auto_1fr]">
          <h2 id="values-title" className="type-h2 text-ink-900 lg:col-span-5 lg:row-start-1">
            {values.title}
          </h2>
          <ul className="mt-8 border-t border-line-strong lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:mt-0">
            {companyValues.items.map((v) => (
              <li key={v.title} className="border-b border-line py-3.5 type-h4 text-ink-900">
                {v.title}
              </li>
            ))}
          </ul>
          <div className="mt-4 lg:col-span-5 lg:row-start-2 lg:mt-5">
            <Button href={valuesHref} variant="ghost" arrow>
              {values.linkLabel}
            </Button>
          </div>
        </div>
      </Section>

      <CtaBand
        title={careers.ctaBand.title}
        body={careers.ctaBand.body}
        primary={careers.ctaBand.primary}
        primaryArrow={false}
        secondary={careers.ctaBand.secondary}
      />
    </>
  );
}
