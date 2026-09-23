import articles from "@/content/blog-articles.json";
import posts from "@/content/blog-posts.json";
import type { ArticleBlock } from "@/types/content";

/**
 * The journal: every post published on beyondbancard.com/news, captured from
 * the live listing (89 posts across eight pages) with its own title, date,
 * categories, excerpt and artwork.
 *
 * The data sits in blog-posts.json rather than in this file so it can be
 * replaced wholesale by a CMS export later without touching any code. Nothing
 * here is written by us: titles and excerpts are the live site's own words, cut
 * where the live listing cuts them.
 *
 * Each post still lives on the live site, and the article pages are being
 * rebuilt here one at a time, so `postUrl` points at the published article
 * until a local page exists for it.
 */

export type BlogPost = {
  slug: string;
  title: string;
  /** As the live listing prints it, e.g. "June 5, 2026". */
  date: string;
  /** Category slugs; a post may have none. */
  categories: string[];
  excerpt: string;
  /** Path within the live media library, e.g. "2026/06/name.webp". */
  image: string;
};

export const blogPosts: BlogPost[] = posts;

/** The live media library, which still serves the journal's artwork. */
const MEDIA = "https://beyondbancard.com/wp-content/uploads";

/**
 * Artwork for a post. The path is stored rather than derived from the post's
 * date: the library mostly files uploads by month of publication, but not
 * always, and the older posts do not follow it at all.
 */
export const postImage = (post: BlogPost) => `${MEDIA}/${post.image}`;

/** An article brought over from the live site, as blocks this site can render. */
export type Article = { slug: string; title: string; blocks: ArticleBlock[] };

export const blogArticles = articles as Article[];

export const articleBySlug = (slug: string) => blogArticles.find((a) => a.slug === slug);
export const articleSlugs = () => blogArticles.map((a) => a.slug);
export const postBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);

/** Whether the piece can be read here rather than on the live site. */
export const hasArticle = (post: BlogPost) => blogArticles.some((a) => a.slug === post.slug);

/**
 * Where a card goes. The articles are being brought over a batch at a time, so
 * a post reads here once its body has arrived and stays on the live site until
 * then — rather than pointing at a page that does not exist.
 */
export const postUrl = (post: BlogPost) =>
  hasArticle(post) ? `/news/${post.slug}` : `https://beyondbancard.com/${post.slug}/`;

/** The categories the live site files posts under, in its own order. */
export const categoryLabels: Record<string, string> = {
  "contactless-payments": "Contactless payments",
  "credit-card-fees": "Credit card fees",
  "e-commerce": "eCommerce",
  "interchange-rates": "Interchange rates",
  "merchant-service-payment": "Merchant services",
  "peptide-payment": "Peptide payments",
  "pos-systems": "POS systems",
};

export const categoryLabel = (slug: string) => categoryLabels[slug] ?? slug;

/** The first category a post carries, which is the one the card shows. */
export const primaryCategory = (post: BlogPost) => post.categories[0];

/** Every category in use, with how many posts carry it. */
export function categoryCounts(list: BlogPost[]) {
  return Object.keys(categoryLabels)
    .map((slug) => ({
      slug,
      label: categoryLabel(slug),
      count: list.filter((p) => p.categories.includes(slug)).length,
    }))
    .filter((c) => c.count > 0);
}

export const blogIndex = {
  eyebrow: "Beyond Bancard news",
  title: "Stories by our team.",
  lead: "What we are seeing in payments: how processing actually works, what it costs, and what changes when the rules or the technology move.",
  latest: "Latest articles",
  searchLabel: "Search articles",
  searchPlaceholder: "Search articles…",
  empty: "No articles match that search.",
};
