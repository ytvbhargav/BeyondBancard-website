import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/Logo";
import { SocialIcon } from "@/components/layout/SocialIcon";
import { DisclosuresBlock } from "@/components/sections/DisclosuresBlock";
import { contact, disclosures, footerColumns, legalLinks, social } from "@/content/site";
import { href } from "@/lib/links";

const linkClass = "link-draw inline-flex min-h-11 items-center text-on-dark-muted hover:text-on-dark sm:min-h-9";

export function Footer() {
  return (
    <footer className="tone-dark overflow-hidden border-t border-ink-800 bg-ink-950 pt-20 pb-10 md:pb-12" data-site-footer>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.35fr_repeat(4,1fr)] lg:gap-8">
          <div>
            <Logo tone="dark" />
            <address className="mt-6 space-y-5 not-italic">
              <div>
                <a href={contact.phoneMain.href} className="type-h4 tabular link-draw inline-flex min-h-11 items-center text-on-dark">
                  {contact.phoneMain.label}
                </a>
                <p className="type-small tabular text-on-dark-muted">Fax {contact.fax}</p>
              </div>
              <ul className="type-small">
                {contact.emails.map((e) => (
                  <li key={e}>
                    <a href={`mailto:${e}`} className={linkClass}>
                      {e}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={contact.address.href}
                target="_blank"
                rel="noopener noreferrer"
                className="type-small group/addr inline-flex items-start gap-1.5 text-on-dark-muted hover:text-on-dark"
              >
                <span>
                  {contact.address.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </span>
                <ArrowUpRight aria-hidden strokeWidth={1.75} className="mt-0.5 size-4 shrink-0" />
                <span className="sr-only"> (opens map in a new tab)</span>
              </a>
            </address>
          </div>

          <nav aria-label="Footer" className="col-span-full grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-4">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h2 className="type-small mb-3 font-semibold text-on-dark">{col.title}</h2>
                <ul className="type-small">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={href(l.href)} className={linkClass}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 border-t border-ink-800 pt-10">
          <DisclosuresBlock />
        </div>

        <div className="mt-10 flex flex-col-reverse gap-6 border-t border-ink-800 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="type-small flex flex-col gap-2 text-on-dark-muted sm:flex-row sm:items-center sm:gap-6">
            <p>{disclosures.copyright}</p>
            <ul className="flex flex-wrap gap-x-5">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={href(l.href)} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="-ml-3 flex gap-1 md:ml-0">
            {social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (opens in a new tab)`}
                  className="grid size-11 place-items-center rounded-pill text-on-dark-muted transition-colors hover:bg-white/10 hover:text-on-dark"
                >
                  <SocialIcon name={s.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Brand sign-off: the wordmark set edge to edge across the container, fully visible, with the
            footer's bottom padding under it. The viewBox fits the ink: cap tops at y≈4 and the "y"
            descender at y≈132 below the 104 baseline (Archivo 800 at 138 units). It rises out of its own
            clip box once, when it scrolls into view (D-056). The sentinel is watched instead of the
            wordmark: a wordmark hidden below its clip never intersects, and the sentinel reaches 12lvh
            above it so it still fires at the page end, clear of RevealObserver's ignored bottom 8%. */}
        <div data-wordmark-rise className="relative mt-10 md:mt-12">
          <span
            aria-hidden
            data-stagger
            data-wordmark-sentinel
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[calc(100%+12lvh)]"
          />
          <div className="overflow-hidden">
            <svg aria-hidden viewBox="0 0 1000 136" className="block w-full select-none">
              <text
                x="0"
                y="104"
                textLength="1000"
                lengthAdjust="spacingAndGlyphs"
                fill="var(--color-on-dark)"
                className="font-display font-extrabold [font-stretch:112%]"
                style={{ fontSize: 138, letterSpacing: "-0.03em" }}
              >
                Beyond Bancard
              </text>
            </svg>
          </div>
        </div>
      </Container>
    </footer>
  );
}
