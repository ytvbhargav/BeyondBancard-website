import Image from "next/image";
import { PostLink } from "@/components/sections/blog/PostLink";
import { categoryLabel, postImage, primaryCategory, type BlogPost } from "@/content/blog";

/**
 * The newest article, to the GrowthByte journal's featured block: a 1.2fr / 1fr
 * split with a 16:11 image on the wide side, a 24px radius, and a body padded
 * 48px by 40-64px with everything centred in it.
 *
 * The measurements and the shapes are that design's; the colours and the type
 * are Beyond Bancard's.
 */
export function FeaturedPost({ post }: { post: BlogPost }) {
  const category = primaryCategory(post);
  return (
    <PostLink
      post={post}
      className="group grid overflow-hidden rounded-[24px] border border-line bg-surface transition-[box-shadow,border-color] duration-200 ease-out hover:border-line-strong hover:shadow-[0_6px_24px_-8px_rgb(7_16_42/0.12),0_2px_6px_rgb(7_16_42/0.04)] lg:grid-cols-[1.2fr_1fr]"
    >
      <span className="relative block aspect-16/11 overflow-hidden bg-paper">
        <Image
          src={postImage(post)}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover"
        />
      </span>

      <span className="flex flex-col justify-center gap-5 px-6 py-10 sm:px-10 lg:px-[clamp(40px,5vw,64px)] lg:py-12">
        <span className="inline-flex w-fit items-center rounded-[4px] border border-brand-300 bg-brand-50 px-2.5 py-1 font-mono text-[11px] font-medium tracking-[0.08em] text-brand-700 uppercase">
          Featured{category ? ` · ${categoryLabel(category)}` : ""}
        </span>

        <span className="block text-[clamp(28px,2.6vw,40px)] leading-[1.1] font-bold tracking-[-0.018em] text-balance text-ink-900">
          {post.title}
        </span>
        <span className="block max-w-[52ch] text-[16px] leading-[1.55] text-muted">{post.excerpt}</span>

        <span className="text-[13px] text-muted tabular">{post.date}</span>

        <span className="mt-1 inline-flex w-fit items-center gap-2 rounded-pill bg-ink-900 px-[22px] py-3 text-[14px] font-semibold text-on-dark transition-colors duration-150 group-hover:bg-ink-950">
          Read the article
          <span aria-hidden>&rarr;</span>
        </span>
      </span>
    </PostLink>
  );
}
