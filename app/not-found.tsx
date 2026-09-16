import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cta } from "@/content/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

/** Branded 404. */
export default function NotFound() {
  return (
    <section className="section-y bg-paper">
      <Container>
        <p className="type-small tabular font-medium text-muted">Error 404</p>
        <h1 className="type-h1 mt-4 max-w-[16ch]">We couldn&apos;t find that page.</h1>
        <p className="type-body-lg mt-5 max-w-[34rem] text-muted">
          The address may be mistyped, or the page may have moved. Go to the homepage, or call us if you were looking for something specific.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/" arrow>
            Go to homepage
          </Button>
          <Button href={cta.phone.href} variant="secondary">
            Call {cta.phone.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
