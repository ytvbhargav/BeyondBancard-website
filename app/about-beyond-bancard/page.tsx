import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Confirm, DEMO_MODE } from "@/components/ui/confirm";
import { Section, SectionHeader } from "@/components/ui/section";
import { PageHero } from "@/components/sections/PageHero";
import { CompanyFile } from "@/components/sections/CompanyFile";
import { ValuesList } from "@/components/sections/ValuesList";
import { AboutAudiences } from "@/components/sections/AboutAudiences";
import { CtaBand } from "@/components/sections/CtaBand";
import { about } from "@/content/about";
import { companyValues } from "@/content/company";
import { cta } from "@/content/site";

export const metadata: Metadata = {
  // The menu label; the layout template adds "| Beyond Bancard".
  title: "About",
  description: about.hero.lead,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb={about.breadcrumb}
        title={about.hero.title}
        lead={about.hero.lead}
        actions={
          <>
            <Button href={cta.apply.href} arrow>
              {cta.apply.label}
            </Button>
            <Button href={cta.expert.href} variant="secondary">
              {cta.expert.label}
            </Button>
          </>
        }
        visual={<CompanyFile {...about.file} />}
      />

      {/* Careers links here (valuesHref). The wording is confirmed as a group, flagged beside the heading.
          Like any unconfirmed content (D-042), production drops the whole section, not just its heading. */}
      {DEMO_MODE && (
        <Section tone="surface" id="values" aria-labelledby="values-title">
          {/* phone pass (D-063): mb-8 (32px) below sm so the heading stays with its list; sm:mb-12 restores today's 48px, md:mb-16 unchanged. */}
          <SectionHeader
            className="mb-8 sm:mb-12"
            id="values-title"
            title={
              <>
                {about.values.title}
                <Confirm note={companyValues.note} variant="marker">
                  {null}
                </Confirm>
              </>
            }
          />
          <ValuesList items={companyValues.items} />
          {/* Values lead to careers: one line and the route to open roles close the section */}
          <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 md:mt-10">
            <p className="type-body-lg text-ink-900">{about.values.careers.body}</p>
            <Button href={about.values.careers.cta.href} variant="secondary" arrow>
              {about.values.careers.cta.label}
            </Button>
          </div>
        </Section>
      )}

      <AboutAudiences title={about.audiences.title} items={about.audiences.items} />

      <CtaBand />
    </>
  );
}
