import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { DEMO_MODE } from "@/components/ui/confirm";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ArticleHeader } from "@/components/sections/ArticleHeader";
import { ArticleReader } from "@/components/sections/ArticleReader";
import { ArticleBody } from "@/components/sections/ArticleBody";
import { FaqSection } from "@/components/sections/FaqSection";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { PostRow } from "@/components/sections/PostRow";
import { CtaBand } from "@/components/sections/CtaBand";
import { blogPosts, formatPostDate, highRiskArticle as article, postLabels, postPath, readingMinutes } from "@/content/blog";

const post = blogPosts.find((p) => p.slug === article.slug)!;
const path = postPath(article.slug);

// Flagged blocks render only in demo mode (Confirm), so the contents list and the reading time follow the same rule
const shownBlocks = article.blocks.filter((b) => !b.confirm || DEMO_MODE);

export const metadata: Metadata = {
  title: post.title,
  description: article.description,
};

export default function HighRiskArticlePage() {
  const toc = shownBlocks.flatMap((b) =>
    b.type === "h2" ? [{ id: b.id, label: b.text, confirm: b.confirm, note: b.note }] : [],
  );
  // Three newest posts other than this one
  const more = blogPosts.filter((p) => p.slug !== article.slug).slice(0, 3);

  return (
    <>
      <article>
        <ArticleHeader
          breadcrumb={article.breadcrumb}
          title={post.title}
          meta={[
            {
              label: postLabels.published,
              value: (
                <time dateTime={post.date} className="tabular">
                  {formatPostDate(post.date)}
                </time>
              ),
            },
            // Reading time before the author: on phones the row breaks into two even lines
            {
              label: postLabels.readingTime,
              value: postLabels.minutes(readingMinutes(shownBlocks, article.faq.items)),
              hideLabel: true,
            },
            { label: postLabels.by, value: article.author },
          ]}
        />

        <div className="bg-surface section-y">
          <Container>
            <ArticleReader title={article.toc.title} items={toc}>
              <ArticleBody blocks={article.blocks} path={path} callout={article.callout} />
            </ArticleReader>
          </Container>
        </div>

        <FaqSection title={article.faq.title} faqs={article.faq.items} />
      </article>

      <RelatedLinks title={article.related.title} links={article.related.links} />

      <Section tone="paper" aria-labelledby="more-title">
        <SectionHeader
          id="more-title"
          title={article.more.title}
          className="md:mb-10"
          action={
            <Button href={article.more.all.href} variant="secondary" arrow>
              {article.more.all.label}
            </Button>
          }
        />
        <Stagger as="ul" className="border-t border-line-strong">
          {more.map((p) => (
            <StaggerItem as="li" key={p.slug}>
              <PostRow post={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <CtaBand />
    </>
  );
}
