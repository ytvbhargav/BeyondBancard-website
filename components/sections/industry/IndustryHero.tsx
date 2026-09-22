import Image from "next/image";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cta } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Industry opening. The photograph is the section rather than an object inside
 * it: it fills the frame edge to edge, and the type is set over its quiet side.
 * Two scrims carry it — one from the left, so the headline always has contrast
 * whatever the photograph does, and one from the foot, so the section resolves
 * into the models rail instead of stopping at a hard edge.
 *
 * Everything animates in CSS, so the headline paints before hydration (it is the
 * LCP element) and the section needs no JavaScript to be right.
 */
export function IndustryHero({
  eyebrow,
  title,
  lead,
  expertCta,
  breadcrumb,
  images = [],
  cutout,
  models,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  expertCta?: string;
  breadcrumb: { label: string; href?: string }[];
  /** The hero photograph; only the first is shown. */
  images?: { src: string; alt: string }[];
  /** The subject cut out of that photograph, which breaks the panel's edge. */
  cutout?: { src: string; alt: string };
  /** Business models this industry covers, with the eligibility line. */
  models?: { title: string; chips: string[]; disclaimer: string };
}) {
  const [photo] = images;

  return (
    <section className="tone-dark relative isolate overflow-hidden bg-ink-950">
      <div aria-hidden className="page-hero-dark absolute inset-0 -z-20 opacity-80" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.05] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(80%_60%_at_70%_0%,black,transparent)]"
      />

      <Container className="pt-6 pb-14 md:pb-16">
        <Breadcrumb items={breadcrumb} tone="dark" className="anim-rise" />

        <div className={cn("grid items-end gap-10 pt-10 md:pt-14", cutout && "lg:grid-cols-12 lg:gap-8")}>
          <div className={cn("min-w-0", cutout ? "lg:col-span-6 lg:pb-10" : "max-w-[46rem]")}>
            <p
              className="anim-rise type-small font-semibold tracking-[0.18em] text-brand-300 uppercase"
              style={{ "--delay": "0ms" } as React.CSSProperties}
            >
              {eyebrow}
            </p>
            <h1
              className="anim-rise type-h1 mt-5 max-w-[15ch] text-balance text-on-dark"
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

          {cutout && (
            <div className="lg:col-span-6 lg:col-start-7">
              {/* The panel holds the colour; the subject stands in front of it and
                  breaks its top edge, so the picture belongs to the section rather
                  than sitting in a box of its own. */}
              <div className="relative aspect-4/5 sm:aspect-3/2 lg:aspect-4/5">
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 top-[18%] rounded-lg bg-linear-to-b from-brand-600 to-brand-800 shadow-float"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-6 bottom-0 top-[26%] rounded-lg bg-[radial-gradient(60%_60%_at_50%_100%,rgba(255,255,255,0.18),transparent)]"
                />
                <Image
                  src={cutout.src}
                  alt={cutout.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* The models this industry covers: the rail the picture resolves into */}
      {models && models.chips.length > 0 && (
        <div className={cn("relative border-t border-ink-800", photo ? "bg-ink-950/80 backdrop-blur-sm" : "bg-ink-950/80")}>
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
