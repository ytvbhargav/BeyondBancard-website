import { ChipLink } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/types/content";

/** Compact band of related chip links (solutions or industries). */
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
      <Container className="flex flex-col gap-5 md:flex-row md:items-center md:gap-10">
        <h2 id="related-title" className="type-h4 shrink-0">
          {title}
        </h2>
        <ul className="flex flex-wrap gap-2">
          {links.map((l) => (
            <li key={l.href}>
              <ChipLink href={l.href}>{l.label}</ChipLink>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
