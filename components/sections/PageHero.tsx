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
        {/* min-w-0: a long label must not widen the single phone track (and the visual with it). */}
        <div className={cn("min-w-0", visual ? "lg:col-span-7" : "max-w-[52rem]")}>
          {breadcrumb && <Breadcrumb items={breadcrumb} tone={tone} className="anim-rise mb-6 md:mb-10" />}
          {!breadcrumb && <div className="h-10 md:h-16" />}
          {/* phone pass (D-063): one type step down below sm, like ArticleHeader, so long titles
              set in 3-4 lines and both hero buttons reach the first screen. sm:type-h1 restores it. */}
          <h1
            className={cn(
              "anim-rise type-h2 sm:type-h1",
              visual ? "max-w-[18ch]" : "max-w-[22ch]",
              dark ? "text-on-dark" : "text-ink-900",
            )}
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
            // Below sm, pill buttons may wrap to two balanced lines in a taller pill instead of running
            // past the column ("Talk to an international payments expert"). One line stays 48px
            // (py-3 + 24px line), like size md. Ghost links (rounded-none) keep their own sizing.
            <div
              className={cn(
                "anim-rise mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center",
                "[&>a.rounded-pill]:max-sm:h-auto [&>a.rounded-pill]:max-sm:min-h-12 [&>a.rounded-pill]:max-sm:py-3",
                "[&>a.rounded-pill]:max-sm:whitespace-normal [&>a.rounded-pill]:max-sm:text-center [&>a.rounded-pill]:max-sm:text-balance",
              )}
              style={{ "--delay": "240ms" } as React.CSSProperties}
            >
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
