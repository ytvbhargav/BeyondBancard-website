import Link from "next/link";
import { Chip } from "@/components/ui/chip";
import { PostTitle } from "@/components/sections/PostTitle";
import { excerptText, formatPostDate, postLabels, postPath, type BlogPost } from "@/content/blog";
import { href } from "@/lib/links";
import { cn } from "@/lib/utils";

/**
 * One post in the editorial list (blog index, "More from the blog"). The title
 * link stretches over the row, so the whole row is one target. Below lg every
 * row has the same shape: title, date, excerpt, categories. From lg the date
 * takes its own column on the left and the categories sit on the right.
 */
export function PostRow({
  post,
  headingLevel: Heading = "h3",
  className,
}: {
  post: BlogPost;
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  return (
    <article
      className={cn(
        "link-draw-parent relative grid gap-x-8 border-b border-line py-7 md:py-9 lg:grid-cols-12",
        className,
      )}
    >
      <Heading className="type-h3 text-ink-900 lg:col-span-7 lg:col-start-3 lg:row-start-1">
        <Link
          href={href(postPath(post.slug))}
          className={cn(
            "link-draw-parent after:absolute after:inset-0 after:rounded-sm",
            "focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-(--color-focus)",
          )}
        >
          <span className="link-draw">
            <PostTitle>{post.title}</PostTitle>
          </span>
        </Link>
      </Heading>
      <time
        dateTime={post.date}
        className="mt-2 type-small text-muted tabular lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:pt-1"
      >
        {formatPostDate(post.date)}
      </time>
      <p className="mt-2.5 line-clamp-2 max-w-[40rem] text-muted lg:col-span-7 lg:col-start-3 lg:row-start-2">
        {excerptText(post)}
      </p>
      {post.categories.length > 0 && (
        <ul
          aria-label={postLabels.categories}
          className="mt-4 flex flex-wrap gap-2 lg:col-span-3 lg:col-start-10 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:content-start lg:justify-end"
        >
          {post.categories.map((c) => (
            <li key={c}>
              <Chip className="min-h-8 px-3 text-[0.8125rem] text-muted">{c}</Chip>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
