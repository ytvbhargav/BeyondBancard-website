import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/motion/Reveal";
import { ChannelLink, fileLabel, fileList, fileRow, fileValue } from "@/components/sections/ContactChannels";
import { MessageUsButton } from "@/components/sections/ContactTopic";
import { cn } from "@/lib/utils";
import type { ContactNeed } from "@/content/contact";

/**
 * Need directory on /contact-us (D-054), the page's one bold object: a white file
 * panel split into four needs by inner hairlines. Each need has at most one
 * button (its CTA, under the title); every other channel is a label/value file
 * row, and the quiet "Message us about this" line closes the quadrant.
 *
 * Layout: stacked below md; from md each need is a row with the title on the left
 * and its channels on the right; from lg the needs form a 2×2 grid whose quadrants
 * share row tracks (subgrid), so the file rows line up across each pair.
 * Each quadrant reveals on its own (not the whole list), so a quadrant needs only a
 * short slice on screen: the first pair shows on load instead of an empty panel.
 * Server-rendered; only the message buttons are client islands.
 */
export function NeedDirectory({
  title,
  needs,
  messageLabel,
}: {
  title: string;
  needs: ContactNeed[];
  messageLabel: string;
}) {
  return (
    <Section tone="paper" aria-labelledby="needs-title">
      <SectionHeader id="needs-title" title={title} />
      <ul className="grid overflow-hidden rounded-md border border-line bg-surface lg:grid-cols-2">
        {needs.map((need, i) => (
          <Reveal
            as="li"
            key={need.id}
            // The second of each pair follows by one stagger step (stagger.base).
            delay={i % 2 === 1 ? 0.08 : 0}
            className={cn(
              "grid content-start border-line px-5 py-7 sm:px-7",
              // md: the title across the row, then the need and its button on the left and its channels
              // on the right; the last track takes any spare height so the right column stays packed.
              "md:grid-cols-2 md:grid-rows-[auto_auto_auto_1fr] md:gap-x-8 md:px-8 md:py-9",
              // lg: 2×2, quadrants share row tracks so each pair's file rows start on the same line.
              "lg:row-span-4 lg:grid-cols-1 lg:grid-rows-subgrid lg:gap-x-0 lg:p-9",
              i > 0 && "border-t",
              i === 1 && "lg:border-t-0",
              i % 2 === 1 && "lg:border-l",
            )}
          >
            <div className="md:col-span-2 lg:col-span-1">
              <Icon name={need.icon} className="mb-5 hidden size-6 text-brand-600 md:block" />
              <h3 id={need.id} className="type-h3 text-balance">
                {need.title}
              </h3>
            </div>

            <div className="mt-2 md:row-span-3 lg:row-span-1">
              <p className="max-w-[32rem] text-pretty text-muted">{need.body}</p>
              {need.action && (
                <div className="mt-6">
                  <Button href={need.action.href} size="sm" arrow className="w-full sm:w-auto">
                    {need.action.label}
                  </Button>
                </div>
              )}
            </div>

            <div className="@container mt-6 md:col-start-2 md:mt-2 lg:col-start-1 lg:mt-7">
              <dl className={cn(fileList, "border-b border-line")}>
                {need.channels.map((c) => (
                  <div key={c.href} className={fileRow}>
                    <dt className={fileLabel}>{c.label}</dt>
                    <dd className={fileValue}>
                      <ChannelLink href={c.href}>{c.value}</ChannelLink>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <MessageUsButton topic={need.topic} needTitle={need.title} className="mt-2 md:col-start-2 lg:col-start-1">
              {messageLabel}
            </MessageUsButton>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
