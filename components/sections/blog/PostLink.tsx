import Link from "next/link";
import { hasArticle, postUrl, type BlogPost } from "@/content/blog";

/**
 * The link around a card. The articles are being brought over a batch at a
 * time: a post that can be read here is an ordinary internal link, and one
 * whose body has not arrived yet opens the published piece on the live site in
 * a new tab, and says so for anyone who cannot see that it is leaving.
 */
export function PostLink({
  post,
  className,
  children,
}: {
  post: BlogPost;
  className?: string;
  children: React.ReactNode;
}) {
  const href = postUrl(post);

  if (hasArticle(post)) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
      <span className="sr-only"> (opens the published article on beyondbancard.com)</span>
    </a>
  );
}
