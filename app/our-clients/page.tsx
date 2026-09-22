import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ClientStories } from "@/components/sections/ClientStory";
import { CtaBand } from "@/components/sections/CtaBand";
import { clientStories } from "@/content/client-stories";

export const metadata: Metadata = {
  title: "Client stories",
  description: clientStories.hero.lead,
};

export default function OurClientsPage() {
  const { breadcrumb, hero, storiesTitle, items, file, context } = clientStories;

  return (
    <>
      <PageHero
        breadcrumb={breadcrumb}
        title={hero.title}
        lead={
          // Block span so the short lead balances instead of leaving "Beyond Bancard." alone on a line.
          <span className="block text-balance">{hero.lead}</span>
        }
      />

      <ClientStories title={storiesTitle} stories={items} labels={file} context={context} />

      <CtaBand />
    </>
  );
}
