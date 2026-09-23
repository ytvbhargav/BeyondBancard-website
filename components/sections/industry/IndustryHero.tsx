import Image from "next/image";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ColorField } from "@/components/motion/ColorField";
import { Parallax } from "@/components/motion/Parallax";
import { cta } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Industry opening. A lake of colour in the brand blues runs behind the whole
 * section and off its edges, and the photograph floats over it: the picture and
 * the light are one thing, not a panel dropped onto a background.
 *
 * The field answers the reader — it leans with the pointer and drifts with the
 * scroll, and the photograph leans the other way, which is what gives the
 * section its depth.
 *
 * The section holds still at the top of the page while the business models rise
 * over it, which is the whole of that effect: `position: sticky` here and a
 * lifted edge there, with nothing scripted and nothing to go wrong.
 *
 * The type keeps the dark, quiet side, held by a scrim that guarantees its
 * contrast whatever the colour does. The type animates in CSS, so the headline
 * paints before hydration (it is the LCP element) and the section is right with
 * no JavaScript at all.
 */
export function IndustryHero({
  eyebrow,
  title,
  lead,
  expertCta,
  breadcrumb,
  images = [],
  marks,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  expertCta?: string;
  breadcrumb: { label: string; href?: string }[];
  /** Up to three photographs, which float over the field; the first leads. */
  images?: { src: string; alt: string }[];
  /** Drawn marks in place of photographs, for an industry no photograph names. */
  marks?: React.ReactNode[];
}) {
  // A frame carries a mark where the industry has them, and a photograph
  // otherwise; the mosaic is the same either way.
  const frames: React.ReactNode[] = marks ?? [];
  const [lead1, lead2, lead3] = images;
  const hasFrames = frames.length > 0 || Boolean(lead1);
  return (
    <section className="sticky top-0 isolate z-0 -mt-(--header-h) overflow-hidden bg-ink-950 tone-dark">
      <div aria-hidden className="page-hero-dark absolute inset-0 -z-20 opacity-80" />
      {/* Below lg the type runs the full width, so the lake sits low in the
          section and the headline keeps the dark to itself. */}
      <ColorField className="top-[22%] right-[-16%] bottom-[-30%] left-[8%] -z-10 lg:-top-[22%] lg:bottom-[-34%] lg:left-[30%]" />
      {/* Holds the headline's contrast whatever the colour does behind it */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-ink-950 from-20% via-ink-950/75 via-55% to-ink-950/0 to-85% lg:via-ink-950/60 lg:via-45% lg:to-70%"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-ink-950 from-25% to-ink-950/0 to-70% lg:hidden"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [mask-image:radial-gradient(80%_60%_at_70%_0%,black,transparent)] [background-size:72px_72px] opacity-[0.05]"
      />

      <Container className="pt-[calc(var(--header-h)+0.75rem)] pb-14 md:pb-20">
        <Breadcrumb items={breadcrumb} tone="dark" className="anim-rise" />

        {/* The type starts under the breadcrumb rather than being centred against
            the photographs, which is what was opening a gap above the eyebrow;
            the mosaic centres itself against the type instead. */}
        <div className={cn("grid items-start gap-10 pt-4 md:pt-5", hasFrames && "lg:grid-cols-12 lg:gap-10 lg:pt-6")}>
          <div className={cn("min-w-0", hasFrames ? "lg:col-span-6" : "max-w-[46rem]")}>
            <p
              className="anim-rise type-small font-semibold tracking-[0.18em] text-brand-300 uppercase"
              style={{ "--delay": "0ms" } as React.CSSProperties}
            >
              {eyebrow}
            </p>
            <h1
              className="anim-rise mt-5 max-w-[15ch] type-h1 text-balance text-on-dark"
              style={{ "--delay": "80ms" } as React.CSSProperties}
            >
              {title}
            </h1>
            <p
              className="anim-rise mt-6 max-w-[34rem] type-body-lg text-pretty text-on-dark-muted"
              style={{ "--delay": "170ms" } as React.CSSProperties}
            >
              {lead}
            </p>
            <div
              className="anim-rise mt-9 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              style={{ "--delay": "250ms" } as React.CSSProperties}
            >
              <Button
                href={cta.expert.href}
                arrow
                className="h-auto min-h-12 py-3 text-center text-balance whitespace-normal"
              >
                {expertCta ?? cta.expert.label}
              </Button>
              <Button href={cta.apply.href} variant="secondary-dark">
                {cta.apply.label}
              </Button>
            </div>
          </div>

          {hasFrames && (
            /* Three frames on one grid: the lead tall on the left, the other
               two stacked beside it. They lean with the pointer as a set and
               drift against the scroll at their own rates, so they read as
               floating in the field rather than pinned to it. */
            <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
              <div className="aurora-float grid grid-cols-6 gap-3 sm:gap-4">
                <Frame
                  image={lead1}
                  mark={frames[0]}
                  priority
                  distance={36}
                  className={cn(lead2 || frames[1] ? "col-span-4 row-span-2 aspect-4/5" : "col-span-6 aspect-3/2")}
                  sizes="(min-width: 1024px) 30vw, 60vw"
                />
                {(lead2 || frames[1]) && (
                  <Frame
                    image={lead2}
                    mark={frames[1]}
                    distance={64}
                    className={cn("col-span-2 aspect-3/4", !lead3 && !frames[2] && "row-span-2 aspect-4/5")}
                    sizes="(min-width: 1024px) 15vw, 30vw"
                  />
                )}
                {(lead3 || frames[2]) && (
                  <Frame
                    image={lead3}
                    mark={frames[2]}
                    distance={20}
                    className="col-span-2 aspect-square"
                    sizes="(min-width: 1024px) 15vw, 30vw"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

/** One frame of the mosaic: a drawn mark, or a photograph. `distance` is how
 *  far it drifts against the scroll. */
function Frame({
  image,
  mark,
  className,
  sizes,
  distance,
  priority = false,
}: {
  image?: { src: string; alt: string };
  mark?: React.ReactNode;
  className?: string;
  sizes: string;
  distance: number;
  priority?: boolean;
}) {
  return (
    <Parallax
      distance={distance}
      className={cn("overflow-hidden rounded-md shadow-float ring-1 ring-white/15", className)}
    >
      {mark ??
        (image && (
          <Image src={image.src} alt={image.alt} fill priority={priority} sizes={sizes} className="object-cover" />
        ))}
    </Parallax>
  );
}
