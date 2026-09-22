import Image from "next/image";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Parallax } from "@/components/motion/Parallax";
import { cta } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Industry opening: the headline holds the left of the page grid and a mosaic of
 * the industry's own photographs holds the right. The frames drift at different
 * rates as the page moves, which is what reads as depth; below lg they settle
 * into a simple row, and with reduced motion they do not move at all.
 *
 * The type animates in CSS so the headline paints before hydration (it is the
 * LCP element), and the lead photograph is marked priority for the same reason.
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
  /** Up to three photographs: the first leads the mosaic. */
  images?: { src: string; alt: string }[];
  /** Business models this industry covers, with the eligibility line. */
  models?: { title: string; chips: string[]; disclaimer: string };
}) {
  const [lead1, lead2, lead3] = images;

  return (
    <section className="tone-dark relative isolate overflow-hidden bg-ink-950">
      <div aria-hidden className="page-hero-dark absolute inset-0 -z-20 opacity-80" />
      {/* A faint grid for depth, faded out well before it reaches the copy */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.05] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(80%_60%_at_70%_0%,black,transparent)]"
      />

      <Container className="pt-6 pb-16 md:pb-20 lg:pb-24">
        <Breadcrumb items={breadcrumb} tone="dark" className="anim-rise" />

        <div className={cn("grid items-center gap-12 pt-12 md:pt-16 lg:gap-10", lead1 && "lg:grid-cols-12")}>
          <div className={cn("min-w-0", lead1 ? "lg:col-span-6" : "max-w-[46rem]")}>
            <p
              className="anim-rise type-small font-semibold tracking-[0.16em] text-brand-300 uppercase"
              style={{ "--delay": "0ms" } as React.CSSProperties}
            >
              {eyebrow}
            </p>
            <h1
              className="anim-rise type-h1 mt-5 max-w-[16ch] text-balance text-on-dark"
              style={{ "--delay": "80ms" } as React.CSSProperties}
            >
              {title}
            </h1>
            <p
              className="anim-rise type-body-lg mt-6 max-w-[34rem] text-pretty text-on-dark-muted"
              style={{ "--delay": "170ms" } as React.CSSProperties}
            >
              {lead}
            </p>
            <div
              className="anim-rise mt-9 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              style={{ "--delay": "250ms" } as React.CSSProperties}
            >
              <Button href={cta.expert.href} arrow className="h-auto min-h-12 py-3 text-center text-balance whitespace-normal">
                {expertCta ?? cta.expert.label}
              </Button>
              <Button href={cta.apply.href} variant="secondary-dark">
                {cta.apply.label}
              </Button>
            </div>
          </div>

          {lead1 && (
            <div className="lg:col-span-6 lg:col-start-7">
              {/* Three frames on one grid: the lead photograph tall on the left,
                  the other two stacked beside it. Two frames drop to a pair, one fills the width. */}
              <div className="grid grid-cols-6 gap-3 sm:gap-4">
                <Frame
                  image={lead1}
                  priority
                  distance={36}
                  className={cn(
                    lead2 ? "col-span-4 row-span-2 aspect-4/5" : "col-span-6 aspect-3/2",
                  )}
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
                  <Frame image={lead3} distance={20} className="col-span-2 aspect-square" sizes="(min-width: 1024px) 15vw, 30vw" />
                )}
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* The models this industry covers: one quiet rail closing the section */}
      {models && models.chips.length > 0 && (
        <div className="border-t border-ink-800 bg-ink-950/80">
          <Container className="flex flex-col gap-4 py-6 lg:flex-row lg:items-baseline lg:gap-10">
            <p className="type-small shrink-0 font-semibold tracking-[0.14em] text-brand-300 uppercase">
              {models.title}
            </p>
            <ul className="-m-1 flex flex-wrap lg:flex-1">
              {models.chips.map((chip) => (
                <li key={chip} className="type-small m-1 rounded-pill border border-ink-800 px-3 py-1.5 text-on-dark">
                  {chip}
                </li>
              ))}
            </ul>
            <p className="type-small shrink-0 text-on-dark-muted">{models.disclaimer}</p>
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
    <Parallax distance={distance} className={cn("overflow-hidden rounded-md border border-ink-800 shadow-float", className)}>
      <Image src={image.src} alt={image.alt} fill priority={priority} sizes={sizes} className="object-cover" />
    </Parallax>
  );
}
