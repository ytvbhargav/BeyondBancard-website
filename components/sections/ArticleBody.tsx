import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Confirm } from "@/components/ui/confirm";
import type { ArticleBlock, ArticleText } from "@/types/content";
import { cta } from "@/content/site";
import { href, isExternal } from "@/lib/links";
import { cn } from "@/lib/utils";

type Callout = { title: string; link: { label: string; href: string } };

/**
 * Article prose from structured blocks (D-054). A measured column (32em, about
 * 68 characters a line in the body face; ch would measure the "0" glyph and let
 * lines run to 90; 17-18px, line-height 1.7) with room above each section heading. Flagged
 * blocks that follow one another share one <Confirm>. The callout goes after
 * the first section, before the second heading.
 */
export function ArticleBody({
  blocks,
  path,
  callout,
}: {
  blocks: ArticleBlock[];
  /** The article's own path: body links back to it render as plain text. */
  path: string;
  callout?: Callout;
}) {
  const nodes: React.ReactNode[] = [];
  let headings = 0;
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    if (block.type === "h2" && ++headings === 2 && callout) {
      nodes.push(<ArticleCallout key="callout" {...callout} />);
    }

    if (block.confirm) {
      const group: ArticleBlock[] = [];
      while (i < blocks.length && blocks[i].confirm && blocks[i].note === block.note) group.push(blocks[i++]);
      nodes.push(
        <Confirm key={`confirm-${i}`} as="div" note={block.note ?? "Unverified content"} className={spacing(group[0])}>
          {group.map((b, j) => (
            <Block key={j} block={b} path={path} first={j === 0} />
          ))}
        </Confirm>,
      );
      continue;
    }

    nodes.push(<Block key={i} block={block} path={path} />);
    i++;
  }

  return (
    <div className="max-w-[32em] text-[1.0625rem] leading-[1.7] text-ink-800 lg:text-lg lg:leading-[1.7] [&>:first-child]:mt-0">
      {nodes}
    </div>
  );
}

/** Space above a block; headings get more so each section reads as a unit. */
function spacing(block: ArticleBlock) {
  if (block.type === "h2") return "mt-14 md:mt-16";
  if (block.type === "h3") return "mt-10";
  return "mt-6";
}

function Block({ block, path, first }: { block: ArticleBlock; path: string; first?: boolean }) {
  // The first block in a group sits on the group wrapper, which carries its spacing
  const space = first ? undefined : spacing(block);
  switch (block.type) {
    case "h2":
      // outline-none: the contents list moves focus here (tabindex -1) after a smooth jump
      return (
        <h2 id={block.id} className={cn("type-h3 text-ink-900 outline-none", space)}>
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 id={block.id} className={cn("type-h4 text-ink-900", space)}>
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p className={space}>
          <Runs runs={block.text} path={path} />
        </p>
      );
    case "ul":
    case "ol": {
      const List = block.type;
      return (
        <List
          className={cn(
            "space-y-2 pl-6 marker:text-brand-600",
            block.type === "ul" ? "list-disc" : "list-decimal marker:tabular",
            space,
          )}
        >
          {block.items.map((item, j) => (
            <li key={j} className="pl-1.5">
              <Runs runs={item} path={path} />
            </li>
          ))}
        </List>
      );
    }
  }
}

/**
 * Text runs with inline links. Links keep an underline at rest (colour alone is
 * not enough against body text; brand-500 keeps it at 3:1 on the surface) and
 * draw a full one on hover.
 */
function Runs({ runs, path }: { runs: ArticleText[]; path: string }) {
  return runs.map((run, i) => {
    if (typeof run === "string") return run;
    if (run.href === path) return run.text;

    const classes =
      "link-draw-parent font-medium text-brand-700 underline decoration-brand-500 decoration-1 underline-offset-[0.2em] transition-[text-decoration-color] duration-(--duration-fast) hover:decoration-transparent focus-visible:decoration-transparent";

    if (isExternal(run.href)) {
      const web = run.href.startsWith("http");
      return (
        <a
          key={i}
          href={run.href}
          // A phone number never breaks across lines
          className={cn(classes, !web && "whitespace-nowrap")}
          {...(web ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <span className="link-draw">{run.text}</span>
          {web && (
            <>
              <ArrowUpRight aria-hidden strokeWidth={1.75} className="ml-0.5 inline size-[0.9em] align-[-0.1em]" />
              <span className="sr-only"> (opens in a new tab)</span>
            </>
          )}
        </a>
      );
    }

    return (
      <Link key={i} href={href(run.href)} className={classes}>
        <span className="link-draw">{run.text}</span>
      </Link>
    );
  });
}

/** Quiet bordered panel pointing readers at the solution page (UI copy, not article copy). */
function ArticleCallout({ title, link }: Callout) {
  return (
    <aside
      aria-labelledby="article-callout-title"
      className="mt-12 rounded-md border border-line bg-paper p-6 leading-normal md:p-8"
    >
      <p id="article-callout-title" className="type-h4 text-ink-900">
        {title}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3">
        <Button href={cta.apply.href} size="sm" arrow>
          {cta.apply.label}
        </Button>
        <Button href={link.href} variant="ghost" size="sm" arrow>
          {link.label}
        </Button>
      </div>
    </aside>
  );
}
