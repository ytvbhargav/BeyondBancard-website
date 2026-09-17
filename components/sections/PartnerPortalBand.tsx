import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/Reveal";
import type { NavLink } from "@/types/content";

/**
 * "Already a partner?" (spec §6.2): a compact band for existing partners, with the
 * portal login (external, new tab) and a route to the partner team.
 */
export function PartnerPortalBand({
  title,
  body,
  login,
  contact,
}: {
  title: string;
  body: string;
  login: NavLink;
  contact: NavLink;
}) {
  return (
    <Section tone="paper" space="compact" className="border-y border-line" aria-labelledby="portal-band-title">
      <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="max-w-[40rem]">
          <h2 id="portal-band-title" className="type-h3 text-ink-900">
            {title}
          </h2>
          <p className="mt-3 text-balance text-muted">{body}</p>
        </div>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
          <Button href={login.href} variant="secondary">
            {login.label}
          </Button>
          <Button href={contact.href} variant="ghost" arrow>
            {contact.label}
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
