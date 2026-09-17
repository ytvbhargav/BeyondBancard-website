import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { PostTitle } from "@/components/sections/PostTitle";
import { cn } from "@/lib/utils";

export type ArticleMetaItem = {
  label: string;
  value: React.ReactNode;
  /** Keep the label for screen readers only, where the value reads on its own ("5 min read"). */
  hideLabel?: boolean;
};

/**
 * Article header (D-054): the light PageHero's paper band and entrance, with
 * the post's facts as a small label/value row under the H1 instead of a lead.
 */
export function ArticleHeader({
  breadcrumb,
  title,
  meta,
}: {
  breadcrumb: { label: string; href?: string }[];
  title: string;
  meta: ArticleMetaItem[];
}) {
  return (
    <header className="border-b border-line bg-paper">
      <Container className="pt-6 pb-12 md:pb-16">
        <Breadcrumb items={breadcrumb} className="anim-rise mb-6 md:mb-10" />
        <h1
          className="anim-rise max-w-[24ch] type-h2 text-ink-900 max-md:text-pretty md:type-h1"
          style={{ "--delay": "60ms" } as React.CSSProperties}
        >
          <PostTitle>{title}</PostTitle>
        </h1>
        <dl
          className="anim-rise mt-8 flex flex-wrap gap-x-8 gap-y-2 md:mt-10"
          style={{ "--delay": "160ms" } as React.CSSProperties}
        >
          {meta.map((m) => (
            <div key={m.label} className="flex items-baseline gap-2">
              <dt className={cn("type-small text-muted", m.hideLabel && "sr-only")}>{m.label}</dt>
              <dd className="font-medium text-ink-900">{m.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </header>
  );
}
