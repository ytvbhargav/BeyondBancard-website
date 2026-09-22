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
 * The section holds still at the top of the page while the one after it rises
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
  models,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  expertCta?: string;
  breadcrumb: { label: string; href?: string }[];
  /** Up to three photographs, which float over the field; the first leads. */
  images?: { src: string; alt: string }[];
  /** Business models this industry covers, with the eligibility line. */
  models?: { title: string; chips: string[]; disclaimer: string };
}) {
  const [lead1, lead2, lead3] = images;
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

      <Container className="pt-[calc(var(--header-h)+1.5rem)] pb-16 md:pb-24">
        <Breadcrumb items={breadcrumb} tone="dark" className="anim-rise" />

        <div className={cn("grid items-center gap-12 pt-12 md:pt-16", lead1 && "lg:grid-cols-12 lg:gap-10 lg:pt-20")}>
          <div className={cn("min-w-0", lead1 ? "lg:col-span-6" : "max-w-[46rem]")}>
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

          {lead1 && (
            /* Three frames on one grid: the lead photograph tall on the left,
               the other two stacked beside it. They lean with the pointer as a
               set and drift against the scroll at their own rates, so they read
               as floating in the field rather than pinned to it. */
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="aurora-float grid grid-cols-6 gap-3 sm:gap-4">
                <Frame
                  image={lead1}
                  priority
                  distance={36}
                  className={cn(lead2 ? "col-span-4 row-span-2 aspect-4/5" : "col-span-6 aspect-3/2")}
                  sizes="(min-width: 1024px) 30vw, 60vw"
                />
                {lead2 && (
                  <Frame
                    image={lead2}
                    distance={64}
                    className={cn("col-span-2 aspect-3/4", !lead3 && "row-span-2 aspect-4/5")}
                    sizes="(min-width: 1024px) 15vw, 30vw"
                  />
                )}
                {lead3 && (
                  <Frame
                    image={lead3}
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

      {/* The models this industry covers: the rail the colour resolves into */}
      {models && models.chips.length > 0 && (
        <div className="relative border-t border-ink-800 bg-ink-950">
          <Container className="flex flex-col gap-4 py-6 lg:flex-row lg:items-baseline lg:gap-10">
            <p className="shrink-0 type-small font-semibold tracking-[0.14em] text-brand-300 uppercase">
              {models.title}
            </p>
            <ul className="-m-1 flex flex-wrap lg:flex-1">
              {models.chips.map((chip) => (
                <li key={chip} className="m-1 rounded-pill border border-ink-800 px-3 py-1.5 type-small text-on-dark">
                  {chip}
                </li>
              ))}
            </ul>
            <p className="shrink-0 type-small text-on-dark-muted">{models.disclaimer}</p>
          </Container>
        </div>
      )}
    </section>
  );
}

/** One frame of the mosaic. `distance` is how far it drifts against the scroll. */
function Frame({
  image,
  className,
  sizes,
  distance,
  priority = false,
}: {
  image: { src: string; alt: string };
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
      <Image src={image.src} alt={image.alt} fill priority={priority} sizes={sizes} className="object-cover" />
    </Parallax>
  );
}
