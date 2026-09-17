import { Fragment } from "react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FooterNav } from "@/components/layout/FooterNav";
import { FooterWordmark } from "@/components/layout/FooterWordmark";
import { Logo } from "@/components/layout/Logo";
import { SocialIcon } from "@/components/layout/SocialIcon";
import { DisclosuresBlock } from "@/components/sections/DisclosuresBlock";
import { contact, disclosures, social } from "@/content/site";

// Label/value rows: 44px on touch widths and coarse pointers, 28px for a mouse at lg+.
const ROW = "flex min-h-11 items-center lg:pointer-fine:min-h-7";
const VALUE_LINK = "link-draw-parent inline-flex min-h-11 items-center text-on-dark lg:pointer-fine:min-h-7";

/**
 * Site footer (PRD §8.4, D-053), modelled on Helcim's: a contact rail beside three columns of
 * bold-headed link groups, the small print under the rail, and the wordmark as the last element.
 * Below xl the rail becomes a band above the links (on the links' three-column grid at lg, so the
 * address lines up with the second column); below lg the groups become accordions.
 */
export function Footer() {
  return (
    <footer
      data-site-footer
      className="overflow-hidden border-t border-ink-800 bg-ink-950 pt-24 pb-14 tone-dark md:pt-28 md:pb-16 lg:pt-35 lg:pb-20"
    >
      <Container>
        {/* Row 2 of the rail is 1fr so the tall nav never pushes the small print down. Every track is
            minmax(0, …), so enlarged text (text-only zoom) wraps inside the content box instead of widening it. */}
        <div className="grid grid-cols-1 gap-y-12 lg:gap-y-16 xl:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] xl:grid-rows-[auto_1fr] xl:gap-x-10 xl:gap-y-10">
          <div
            data-footer-contact
            className="grid grid-cols-1 items-start gap-y-8 md:grid-cols-2 md:gap-x-8 lg:grid-cols-3 xl:col-start-1 xl:row-start-1 xl:grid-cols-1"
          >
            <div className="flex flex-col items-start">
              {/* The shared Logo hides its name below 380px for the header; the footer has room for it. The name
                  may wrap here, so enlarged text never pushes it out of the rail. */}
              <Logo tone="dark" className="[&>span:last-child]:inline [&>span:last-child]:whitespace-normal" />
              <address className="mt-8 w-full not-italic">
                <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 text-base/6">
                  <dt className={`${ROW} text-on-dark-muted`}>Phone</dt>
                  <dd className={`${ROW} min-w-0`}>
                    <a href={contact.phoneMain.href} className={`${VALUE_LINK} tabular`}>
                      <span className="link-draw">{contact.phoneMain.label}</span>
                    </a>
                  </dd>
                  <dt className={`${ROW} text-on-dark-muted`}>Fax</dt>
                  <dd className={`${ROW} min-w-0`}>
                    <span className="text-on-dark tabular">{contact.fax}</span>
                  </dd>
                  {contact.emails.map((e) => (
                    <Fragment key={e}>
                      <dt className={`${ROW} text-on-dark-muted`}>Email</dt>
                      <dd className={`${ROW} min-w-0`}>
                        <a href={`mailto:${e}`} className={VALUE_LINK}>
                          <span className="link-draw [overflow-wrap:anywhere]">{e}</span>
                        </a>
                      </dd>
                    </Fragment>
                  ))}
                </dl>
              </address>
            </div>

            <div className="flex flex-col items-start lg:col-start-2 xl:col-start-1">
              {/* PRD §1: the business is headquartered in Orange, California, at this (its only) address. */}
              <p className="font-display text-base/6 font-bold tracking-[-0.005em] text-on-dark [font-stretch:112%] md:text-lg/[1.625rem]">
                Headquarters
              </p>
              <address className="mt-2 flex not-italic">
                <a
                  href={contact.address.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw-parent inline-flex min-h-12 items-start gap-1.5 text-base/6 text-on-dark"
                >
                  <span>
                    {contact.address.lines.map((l) => (
                      <span key={l} className="link-draw block w-fit">
                        {l}
                      </span>
                    ))}
                  </span>
                  <ArrowUpRight aria-hidden strokeWidth={1.75} className="mt-1 size-4 shrink-0" />
                  <span className="sr-only"> (opens map in a new tab)</span>
                </a>
              </address>
              <ul className="mt-8 -ml-2.5 flex flex-wrap">
                {social.map((s) => (
                  <li key={s.href} className="flex">
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.label} (opens in a new tab)`}
                      className="group/social inline-flex h-11 items-center gap-0.5 rounded-pill px-2.5 text-on-dark transition-colors duration-(--duration-fast) hover:bg-ink-800 [&>svg:first-child]:size-6"
                    >
                      <SocialIcon name={s.icon} />
                      {/* D-024 new-tab cue, kept visible but set small and high so the glyph leads. */}
                      <ArrowUpRight
                        aria-hidden
                        strokeWidth={2.25}
                        className="mb-3 size-3 text-on-dark-muted transition-colors duration-(--duration-fast) group-hover/social:text-on-dark"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <FooterNav className="xl:col-start-2 xl:row-span-2 xl:row-start-1" />

          {/* No focusable content, so placing it under the rail at xl never breaks the tab order. */}
          <div data-footer-smallprint className="max-w-[36rem] xl:col-start-1 xl:row-start-2">
            <p className="type-small text-on-dark-muted">{disclosures.copyright}</p>
            <DisclosuresBlock className="mt-4" />
          </div>
        </div>

        <FooterWordmark />
      </Container>
    </footer>
  );
}
