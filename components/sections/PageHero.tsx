import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

/**
 * Interior page hero. Light (paper) by default; `dark` for partner pages.
 * Entrance is CSS so the H1 paints before hydration.
 */
export function PageHero({
  title,
  lead,
  breadcrumb,
  actions,
  visual,
  tone = "light",
}: {
  title: string;
  lead: React.ReactNode;
  breadcrumb?: { label: string; href?: string }[];
  actions?: React.ReactNode;
  visual?: React.ReactNode;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        dark ? "tone-dark bg-ink-900" : "border-b border-line bg-paper",
      )}
    >
      {dark && <div aria-hidden className="page-hero-dark absolute inset-0 -z-10" />}
      <Container
        className={cn(
          "grid items-center gap-12 pt-6 pb-16 md:pb-24 lg:gap-8",
          visual ? "lg:grid-cols-12" : "",
          dark && "pb-20 md:pb-28",
        )}
      >
        <div className={cn(visual ? "lg:col-span-7" : "max-w-[52rem]")}>
          {breadcrumb && <Breadcrumb items={breadcrumb} tone={tone} className="anim-rise mb-6 md:mb-10" />}
          {!breadcrumb && <div className="h-10 md:h-16" />}
          <h1
            className={cn("anim-rise type-h1", visual ? "max-w-[18ch]" : "max-w-[22ch]", dark ? "text-on-dark" : "text-ink-900")}
            style={{ "--delay": "60ms" } as React.CSSProperties}
          >
            {title}
          </h1>
          <p
            className={cn("anim-rise type-body-lg mt-6 max-w-[36rem]", dark ? "text-on-dark-muted" : "text-muted")}
            style={{ "--delay": "160ms" } as React.CSSProperties}
          >
            {lead}
          </p>
          {actions && (
            <div className="anim-rise mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center" style={{ "--delay": "240ms" } as React.CSSProperties}>
              {actions}
            </div>
          )}
        </div>
        {visual && (
          <div
            className="anim-rise-card mx-auto w-full max-w-[28rem] lg:col-span-5 lg:mr-0 lg:pt-16"
            style={{ "--delay": "200ms" } as React.CSSProperties}
          >
            {visual}
          </div>
        )}
      </Container>
    </section>
  );
}
