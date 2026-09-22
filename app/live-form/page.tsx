import type { Metadata } from "next";
import { Check, Lock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Confirm } from "@/components/ui/confirm";
import { TextLink } from "@/components/ui/text-link";
import { ApplyForm } from "@/components/forms/ApplyForm";
import { DisclosuresBlock } from "@/components/sections/DisclosuresBlock";
import { apply } from "@/content/apply";
import { cta } from "@/content/site";

export const metadata: Metadata = {
  title: "Apply for a merchant account",
  description: "Start your Beyond Bancard merchant account application.",
};

export default function ApplyPage() {
  // phone pass (D-063): pb-14 (56px, section-y's phone value) below sm; sm:pb-24 restores today's value, md:pb-32 unchanged.
  return (
    <section className="bg-paper pt-10 pb-14 sm:pb-24 md:pt-16 md:pb-32">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <h1 className="anim-rise type-h1 max-w-[16ch]">{apply.title}</h1>
          <p className="anim-rise type-body-lg mt-5 max-w-[36rem] text-muted" style={{ "--delay": "100ms" } as React.CSSProperties}>
            {apply.lead.before}
            <Confirm note={apply.lead.note}>{apply.lead.confirmable}</Confirm>
            {apply.lead.after}
          </p>
          <div className="anim-rise mt-10" style={{ "--delay": "180ms" } as React.CSSProperties}>
            <ApplyForm />
          </div>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9" aria-label="About applying">
          <div className="space-y-6 lg:sticky lg:top-28 lg:pt-44">
            <div className="rounded-md border border-line bg-surface p-6">
              <h2 className="type-h4">{apply.sidebar.whyTitle}</h2>
              <ul className="mt-4 space-y-3">
                {apply.sidebar.why.map((w) => (
                  <li key={w} className="flex items-center gap-3">
                    <span aria-hidden className="grid size-5 shrink-0 place-items-center rounded-pill bg-success-600 text-white">
                      <Check strokeWidth={3} className="size-3" />
                    </span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            <div className="tone-dark rounded-md bg-ink-900 p-6">
              <h2 className="type-h4 text-on-dark">{apply.sidebar.talkTitle}</h2>
              <a href={cta.phone.href} className="type-h3 tabular link-draw mt-3 inline-flex min-h-11 items-center gap-2 text-on-dark">
                <Phone aria-hidden strokeWidth={1.75} className="size-5" />
                {cta.phone.label}
              </a>
              <Button href={cta.expert.href} variant="secondary-dark" size="sm" className="mt-4 w-full">
                {cta.expert.label}
              </Button>
            </div>

            <div className="space-y-3 px-1">
              <p className="type-small flex items-start gap-2 text-muted">
                <Lock aria-hidden strokeWidth={1.75} className="mt-0.5 size-4 shrink-0" />
                <span>
                  Your information is handled under our <TextLink href="/privacy-policy" className="text-brand-700">Privacy Policy</TextLink>.
                </span>
              </p>
              <DisclosuresBlock compact />
            </div>
          </div>
        </aside>
      </Container>
    </section>
  );
}
