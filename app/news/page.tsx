import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/sections/PageHero";
import { BlogLead } from "@/components/sections/BlogLead";
import { BlogIndex } from "@/components/sections/BlogIndex";
import { CtaBand } from "@/components/sections/CtaBand";
import { blogIndex, blogPosts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: blogIndex.hero.lead,
};

export default function BlogPage() {
  // Newest first: the latest post leads, the rest make the list.
  const [latest, ...rest] = blogPosts;

  return (
    <>
      <PageHero
        breadcrumb={blogIndex.breadcrumb}
        title={blogIndex.hero.title}
        lead={blogIndex.hero.lead}
      />

      <Section tone="surface">
        {/* Continues the hero entrance (CSS, paints before hydration) */}
        <div className="anim-rise" style={{ "--delay": "360ms" } as React.CSSProperties}>
          <BlogLead post={latest} />
        </div>
        <div className="mt-16 md:mt-24">
          <BlogIndex posts={rest} />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
