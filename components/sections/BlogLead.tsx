import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PostTitle } from "@/components/sections/PostTitle";
import { excerptText, formatPostDate, postLabels, postPath, type BlogPost } from "@/content/blog";
import { href } from "@/lib/links";
import { cn } from "@/lib/utils";

/**
 * The newest post as a large dark typographic panel (the blog's bold element,
 * D-054). No image: the title carries it, with the post's file (published,
 * category) set as label/value rows beside the excerpt. The title link
 * stretches over the panel, so the whole panel is one link target.
 */
export function BlogLead({ post, className }: { post: BlogPost; className?: string }) {
  const rows = [
    {
      label: postLabels.published,
      value: (
        <span className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1">
          <time dateTime={post.date} className="tabular">
            {formatPostDate(post.date, "long")}
          </time>
          {/* Read as "June 5, 2026, Latest", not as one run of text */}
          <span className="sr-only">, </span>
          <Badge icon={false} className="h-6 bg-ink-800 px-2.5 text-on-dark ring-1 ring-ink-700 ring-inset">
            {postLabels.latest}
          </Badge>
        </span>
      ),
    },
    ...(post.categories.length
      ? [
          {
            label: post.categories.length === 1 ? postLabels.category : postLabels.categories,
            value: post.categories.join(", "),
          },
        ]
      : []),
  ];

  return (
    <article
      className={cn(
        "group/lead link-draw-parent relative isolate overflow-hidden rounded-lg bg-ink-900 p-7 tone-dark sm:p-10 lg:p-14",
        className,
      )}
    >
      <div aria-hidden className="page-hero-dark absolute inset-0 -z-10" />
      {/* From lg both columns run top to bottom: title and "Read article" on the left, excerpt and file on the right */}
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col justify-between gap-10 lg:col-span-7">
          <h2 className="max-w-[18ch] type-h2 text-on-dark lg:max-w-[22ch] lg:type-h1">
            <Link
              href={href(postPath(post.slug))}
              className={cn(
                "link-draw-parent after:absolute after:inset-0 after:rounded-lg",
                "focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-4 focus-visible:after:outline-(--color-focus)",
              )}
            >
              <span className="link-draw">
                <PostTitle>{post.title}</PostTitle>
              </span>
            </Link>
          </h2>
          <ReadCue className="hidden lg:inline-flex" />
        </div>
        <div className="flex flex-col lg:col-span-5 lg:col-start-8">
          <p className="type-body-lg text-on-dark-muted lg:pb-8">{excerptText(post)}</p>
          <dl className="mt-8 border-t border-ink-800 lg:mt-auto">
            {rows.map((r) => (
              <div key={r.label} className="flex items-baseline justify-between gap-6 border-b border-ink-800 py-3.5">
                <dt className="shrink-0 type-small text-on-dark-muted">{r.label}</dt>
                <dd className="text-right text-[0.9375rem] font-medium text-on-dark">{r.value}</dd>
              </div>
            ))}
          </dl>
          <ReadCue className="mt-8 lg:hidden" />
        </div>
      </div>
    </article>
  );
}

/** Visual cue only: the title link already covers the panel. */
function ReadCue({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("inline-flex items-center gap-2 self-start font-semibold text-on-dark", className)}>
      {postLabels.read}
      <ArrowRight
        strokeWidth={1.75}
        className="size-[1.125em] transition-transform duration-(--duration-fast) ease-(--ease-out) group-hover/lead:translate-x-[3px]"
      />
    </span>
  );
}
