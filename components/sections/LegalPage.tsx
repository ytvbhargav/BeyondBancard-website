import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/PageHero";
import { ArticleReader } from "@/components/sections/ArticleReader";
import { ArticleBody } from "@/components/sections/ArticleBody";
import type { LegalPageContent } from "@/content/legal";

export function legalMetadata(content: LegalPageContent): Metadata {
  return { title: content.meta.title, description: content.meta.description };
}

/**
 * Terms and Privacy (D-062). The interior hero, then the article reading layout
 * (D-054): a measured prose column with its "On this page" rail. Legal pages
 * close on the footer, not the CtaBand: a sales panel under the terms would read
 * as part of them. Flagged sections show only in demo mode, and the contents
 * list follows them.
 */
export function LegalPage({ content }: { content: LegalPageContent }) {
  const blocks = content.blocks;
  const toc = blocks.flatMap((b) =>
    b.type === "h2" ? [{ id: b.id, label: b.text, confirm: b.confirm, note: b.note }] : [],
  );

  return (
    <article>
      <PageHero breadcrumb={content.breadcrumb} title={content.title} lead={content.lead} />
      <section className="bg-surface pt-10 pb-16 md:pt-14 md:pb-24" aria-label={content.title}>
        <Container>
          <ArticleReader title="On this page" items={toc}>
            <p className="mb-8 max-w-[32em] text-[1.0625rem] leading-[1.7] text-ink-900 lg:text-lg">{content.intro}</p>
            <ArticleBody blocks={blocks} path="" />
          </ArticleReader>
        </Container>
      </section>
    </article>
  );
}
