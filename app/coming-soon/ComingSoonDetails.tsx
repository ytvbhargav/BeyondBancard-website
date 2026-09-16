"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Reads ?from= on the client so the page itself stays static. */
export function ComingSoonDetails() {
  const params = useSearchParams();
  const router = useRouter();
  const from = params.get("from");

  return (
    <>
      <p className="type-body-lg mt-5 max-w-[34rem] text-muted">
        The demo covers six pages. This link will lead to its own page in the full build.
      </p>
      {from && (
        <p className="mt-8 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-pill border border-line bg-surface px-4 py-2 text-[0.9375rem]">
          <span className="text-muted">Requested page</span>
          <code className="tabular font-medium break-all text-ink-900">{from}</code>
        </p>
      )}
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button
          variant="secondary"
          onClick={() => (window.history.length > 1 ? router.back() : router.push("/"))}
        >
          <span className="inline-flex items-center gap-2">
            <ArrowLeft aria-hidden strokeWidth={1.75} className="size-4" />
            Back
          </span>
        </Button>
        <Button href="/">Go to homepage</Button>
      </div>
    </>
  );
}
