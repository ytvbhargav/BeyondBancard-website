import { ArrowRight } from "lucide-react";
import { ChipLink } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/types/content";

/**
 * Compact band of related chip links (solutions or industries). From lg the
 * title and pills sit on the same 4/8 grid as the static chip bands (ChipBand,
 * the industry business-models band), so stacked bands share one left edge.
 * Each pill carries a blue trailing arrow (D-002) so it reads as a link at rest,
 * not only on hover, and stays distinct from the static `Chip` labels.
 */
export function RelatedLinks({
  title,
  links,
  tone = "surface",
}: {
  title: string;
  links: NavLink[];
  tone?: "paper" | "surface";
}) {
  return (
    <section
      aria-labelledby="related-title"
      className={cn(tone === "paper" ? "bg-paper" : "bg-surface", "border-y border-line py-12 md:py-14")}
    >
      <Container className="flex flex-col gap-5 md:flex-row md:items-center md:gap-10 lg:grid lg:grid-cols-12 lg:gap-8">
        <h2 id="related-title" className="type-h4 shrink-0 lg:col-span-4">
          {title}
        </h2>
        {/* phone pass (D-063): below sm the links stack as full-width rows with the arrow at the
            right edge, so no pill is left alone on a wrapped row; from sm the auto-width pills wrap. */}
        <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:col-span-8">
          {links.map((l) => (
            <li key={l.href}>
              <ChipLink href={l.href} className="group/related w-full justify-between sm:w-auto sm:justify-start">
                {l.label}
                <ArrowRight
                  aria-hidden
                  strokeWidth={1.75}
                  className="size-4 shrink-0 text-brand-600 transition-[color,transform] duration-(--duration-fast) ease-out group-hover/related:translate-x-[3px] group-hover/related:text-brand-700"
                />
              </ChipLink>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
