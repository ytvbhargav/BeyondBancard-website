import Image from "next/image";
import { PostLink } from "@/components/sections/blog/PostLink";
import { categoryLabel, postImage, primaryCategory, type BlogPost } from "@/content/blog";

/**
 * One article in the journal, built to the GrowthByte journal's card: a 16:10
 * thumbnail over a body of 22px padding, the category as a small monospace tag,
 * the headline at 22px, two lines of the opening, and the date on a rule at the
 * foot. The card lifts 2px on hover.
 *
 * The measurements and the shapes are that design's; the colours and the type
 * are Beyond Bancard's, since it is Beyond Bancard's journal.
 */
export function PostCard({ post, priority = false }: { post: BlogPost; priority?: boolean }) {
  const category = primaryCategory(post);
  return (
    <PostLink
      post={post}
      className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-line bg-surface transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_6px_24px_-8px_rgb(7_16_42/0.12),0_2px_6px_rgb(7_16_42/0.04)]"
    >
      <span className="relative block aspect-16/10 overflow-hidden bg-paper">
        <Image
          src={postImage(post)}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 92vw"
          className="object-cover"
        />
      </span>

      <span className="flex flex-1 flex-col gap-3 px-[22px] pt-[22px] pb-6">
        {category && (
          <span className="w-fit rounded-[4px] border border-line bg-paper px-2.5 py-1 font-mono text-[11px] font-medium tracking-[0.08em] text-brand-700 uppercase">
            {categoryLabel(category)}
          </span>
        )}
        <span className="block text-[22px] leading-[1.2] font-bold tracking-[-0.015em] text-pretty text-ink-900">
          {post.title}
        </span>
        <span className="line-clamp-2 block text-[14px] leading-[1.5] text-muted">{post.excerpt}</span>
        <span className="mt-auto flex items-center justify-between border-t border-line pt-3 text-[13px] text-muted">
          <span className="tabular">{post.date}</span>
        </span>
      </span>
    </PostLink>
  );
}
