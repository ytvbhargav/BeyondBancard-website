import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { ArticleReader } from "@/components/sections/ArticleReader";
import { ArticleBody } from "@/components/sections/ArticleBody";
import { CtaBand } from "@/components/sections/CtaBand";
import { articleBySlug, articleSlugs, categoryLabel, postBySlug, postImage, primaryCategory } from "@/content/blog";

/** Every article whose body has been brought over; the rest are still on the live site. */
export function generateStaticParams() {
  return articleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

/**
 * One article: the piece's own artwork and headline, then the reading layout the
 * legal pages use — a measured prose column with its "On this page" rail beside
 * it, so a long piece stays navigable.
 */
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  const post = postBySlug(slug);
  if (!article || !post) notFound();

  const category = primaryCategory(post);
  const contents = article.blocks.flatMap((block) =>
    block.type === "h2" ? [{ id: block.id, label: block.text }] : [],
  );

  return (
    <article>
      <header className="relative isolate -mt-(--header-h) overflow-hidden border-b border-line bg-paper">
        <Container className="pt-[calc(var(--header-h)+1rem)] pb-12 md:pb-16">
          <Breadcrumb items={[{ label: "News", href: "/news" }, { label: post.title }]} className="anim-rise" />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="anim-rise flex flex-wrap items-center gap-3 type-small text-muted">
                {category && <span className="font-semibold text-brand-700">{categoryLabel(category)}</span>}
                {category && <span aria-hidden className="size-1 rounded-pill bg-line-strong" />}
                <span className="tabular">{post.date}</span>
              </p>
              <h1
                className="anim-rise mt-5 max-w-[20ch] type-h1 text-balance"
                style={{ "--delay": "80ms" } as React.CSSProperties}
              >
                {article.title || post.title}
              </h1>
              <p
                className="anim-rise mt-6 max-w-[40rem] type-body-lg text-pretty text-muted"
                style={{ "--delay": "170ms" } as React.CSSProperties}
              >
                {post.excerpt}
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-16/10 overflow-hidden rounded-lg border border-line bg-surface shadow-float">
                <Image
                  src={postImage(post)}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 92vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </header>

      <section className="bg-surface pt-10 pb-16 md:pt-14 md:pb-24" aria-label={post.title}>
        <Container>
          <ArticleReader title="On this page" items={contents}>
            <ArticleBody blocks={article.blocks} path={`/news/${slug}`} />
          </ArticleReader>
        </Container>
      </section>

      <CtaBand />
    </article>
  );
}
