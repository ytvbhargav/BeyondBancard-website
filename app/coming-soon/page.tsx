import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { ComingSoonDetails } from "@/app/coming-soon/ComingSoonDetails";

export const metadata: Metadata = {
  title: "Coming soon",
  robots: { index: false, follow: false },
};

export default function ComingSoonPage() {
  return (
    <section className="section-y bg-paper">
      <Container className="flex flex-col items-center text-center">
        <p aria-hidden className="grid size-14 place-items-center rounded-md border border-line bg-surface font-display text-[1.5rem] font-extrabold text-brand-600 [font-stretch:112%]">
          B
        </p>
        <h1 className="type-h1 mt-8 max-w-[18ch]">This page is part of the full redesign.</h1>
        <Suspense fallback={<div className="h-40" />}>
          <ComingSoonDetails />
        </Suspense>
      </Container>
    </section>
  );
}
