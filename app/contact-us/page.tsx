import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/sections/PageHero";
import { NeedDirectory } from "@/components/sections/NeedDirectory";
import { ContactChannels } from "@/components/sections/ContactChannels";
import { ContactTopicProvider } from "@/components/sections/ContactTopic";
import { ContactForm } from "@/components/forms/ContactForm";
import { contactPage } from "@/content/contact";
import { cta } from "@/content/site";

export const metadata: Metadata = {
  // The menu label; the layout template adds "| Beyond Bancard".
  title: "Contact",
  description: contactPage.hero.lead,
};

/**
 * Contact (D-054). The need directory routes each visitor to the right channel;
 * anyone else can leave a message in the white band below. The page is the call
 * to action, so there is no CtaBand and no sticky mobile CTA.
 */
export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb={contactPage.breadcrumb}
        title={contactPage.hero.title}
        lead={
          <>
            {contactPage.hero.lead}{" "}
            {/* Same call link as the FAQ sections (FaqSection). */}
            <a
              href={cta.phone.href}
              className="link-draw-parent inline-flex items-center gap-1.5 font-semibold whitespace-nowrap text-brand-700"
            >
              <Phone aria-hidden strokeWidth={1.75} className="size-4" />
              <span className="link-draw tabular">{contactPage.hero.call}</span>
            </a>
          </>
        }
      />

      {/* Directory buttons set the form's topic, so both live under one provider. */}
      <ContactTopicProvider>
        <NeedDirectory
          title={contactPage.directory.title}
          needs={contactPage.directory.needs}
          messageLabel={contactPage.directory.messageLabel}
        />

        {/* A white band after the paper directory: the form is the page's second chapter, not a rival object. */}
        <Section tone="surface">
          {/* Columns stretch to the row height, so the sidebar's panel can stay sticky beside a long form. */}
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="min-w-0 lg:col-span-7">
              <ContactForm />
            </div>
            <ContactChannels channels={contactPage.channels} className="lg:col-span-5" />
          </div>
        </Section>
      </ContactTopicProvider>
    </>
  );
}
