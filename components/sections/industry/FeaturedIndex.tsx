import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/Reveal";
import { RevealWords } from "@/components/motion/RevealWords";

export type FeaturedEntry = {
  slug: string;
  name: string;
  teaser: string;
  /** The live site's fuller line for the industry, where it publishes one. */
  description?: string;
  href: string;
  image?: { src: string; alt: string };
};

/**
 * The six complex industries, as an index rather than a grid of cards: one
 * rule-separated row each, carrying the industry's own photograph at a size
 * that stays out of the way of the name beside it.
 *
 * Each row is watched on its own, so the list fills in as it is read rather
 * than arriving all at once. Nothing here needs the client: the rows are links,
 * the motion is the page's reveal observer, and the photograph sits in the row
 * it belongs to at every width.
 */
export function FeaturedIndex({
  title,
  lead,
  entries,
}: {
  title: string;
  lead?: string;
  entries: FeaturedEntry[];
}) {
  return (
    <section aria-labelledby="featured-industries-title" className="bg-ink-950 tone-dark">
      <Container className="section-y">
        <RevealWords
          as="h2"
          id="featured-industries-title"
          text={title}
          className="max-w-[16ch] type-h2 text-on-dark"
        />
        {lead && <p className="mt-5 max-w-[62ch] type-body-lg text-pretty text-on-dark-muted">{lead}</p>}

        <ol className="mt-12 border-t border-ink-800 md:mt-16">
          {entries.map((entry, i) => (
            <Reveal as="li" key={entry.slug} className="border-b border-ink-800">
              <Link href={entry.href} className="group flex items-center gap-5 py-6 md:gap-8 md:py-7">
                <span className="w-8 shrink-0 type-small text-on-dark-muted tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {entry.image && (
                  <span className="relative size-16 shrink-0 overflow-hidden rounded-sm ring-1 ring-ink-800 sm:size-20">
                    <Image
                      src={entry.image.src}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-(--duration-slow) group-hover:scale-105"
                    />
                  </span>
                )}

                <span className="min-w-0 flex-1">
                  <span className="block type-h3 text-on-dark transition-colors duration-(--duration-base) group-hover:text-brand-300">
                    {entry.name}
                  </span>
                  <span className="mt-1.5 block max-w-[44ch] type-small text-pretty text-on-dark">
                    {entry.teaser}
                  </span>
                  {entry.description && (
                    <span className="mt-2 hidden max-w-[62ch] type-small text-pretty text-on-dark-muted md:block">
                      {entry.description}
                    </span>
                  )}
                </span>

                <ArrowUpRight
                  aria-hidden
                  strokeWidth={1.5}
                  className="size-6 shrink-0 text-on-dark-muted transition-transform duration-(--duration-base) group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-300"
                />
              </Link>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
