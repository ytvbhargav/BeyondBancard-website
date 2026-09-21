import { Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Confirm, DEMO_MODE } from "@/components/ui/confirm";
import { cta } from "@/content/site";
import type { Faq } from "@/types/content";

/**
 * FAQ (PRD §8.8). Single-open accordion; question/answer markup maps directly
 * to FAQPage structured data later. Unconfirmed answers are flagged in demo
 * mode and omitted in production.
 */
export function FaqSection({ title, faqs, tone = "paper" }: { title: string; faqs: Faq[]; tone?: "surface" | "paper" }) {
  const visible = faqs.filter((f) => !f.confirm || DEMO_MODE);
  return (
    <section className={tone === "surface" ? "section-y bg-surface" : "section-y bg-paper"} aria-labelledby="faq-title">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-36">
            <h2 id="faq-title" className="type-h2">
              {title}
            </h2>
            <p className="type-body-lg mt-5 text-muted">
              Something else?{" "}
              <a href={cta.phone.href} className="link-draw-parent inline-flex items-center gap-1.5 font-semibold whitespace-nowrap text-brand-700">
                <Phone aria-hidden strokeWidth={1.75} className="size-4" />
                <span className="link-draw tabular">Call {cta.phone.label}.</span>
              </a>
            </p>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <Accordion type="single" collapsible className="border-t border-line">
            {visible.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`}>
                <AccordionTrigger className="type-h4 text-pretty text-ink-900">{f.q}</AccordionTrigger>
                <AccordionContent>
                  <p className="max-w-[40rem] text-muted">
                    {f.confirm ? <Confirm note={f.note ?? "FAQ answer"}>{f.a}</Confirm> : f.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}
