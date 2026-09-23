import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ColorField } from "@/components/motion/ColorField";
import { BlogListing } from "@/components/sections/blog/BlogListing";
import { CtaBand } from "@/components/sections/CtaBand";
import { blogIndex, blogPosts } from "@/content/blog";

export const metadata: Metadata = {
  title: "News",
  description: blogIndex.lead,
};

export default function NewsPage() {
  return (
    <>
      {/* The journal's page head, to the GrowthByte journal: a monospace
          eyebrow, the page heading at 40-64px, and a lede held to 56ch. The
          field behind it is this site's own, so the journal still belongs to
          it. */}
      <section className="relative isolate -mt-(--header-h) overflow-hidden border-b border-line bg-surface">
        <ColorField tone="light" className="-top-[30%] right-[-12%] bottom-[-34%] left-[-10%] -z-10" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-linear-to-r from-surface from-15% via-surface/80 via-50% to-surface/0 to-85%"
        />

        <Container className="pt-[calc(var(--header-h)+72px)] pb-10">
          <p
            className="anim-rise block font-mono text-[11px] font-medium tracking-[0.14em] text-muted uppercase"
            style={{ "--delay": "0ms" } as React.CSSProperties}
          >
            {blogIndex.eyebrow}
          </p>
          <h1
            className="anim-rise mt-4 text-[clamp(40px,4.5vw,64px)] leading-[1.05] font-bold tracking-[-0.022em] text-balance text-ink-900"
            style={{ "--delay": "80ms" } as React.CSSProperties}
          >
            {blogIndex.title}
          </h1>
          <p
            className="anim-rise mt-3.5 max-w-[56ch] text-[clamp(17px,1.4vw,20px)] leading-[1.55] text-pretty text-muted"
            style={{ "--delay": "170ms" } as React.CSSProperties}
          >
            {blogIndex.lead}
          </p>
        </Container>
      </section>

      <BlogListing posts={blogPosts} />

      <CtaBand />
    </>
  );
}
