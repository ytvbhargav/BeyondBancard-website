import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { ClientStories, shown } from "@/components/sections/ClientStory";
import { CtaBand } from "@/components/sections/CtaBand";
import { Confirm } from "@/components/ui/confirm";
import { clientStories } from "@/content/client-stories";

export const metadata: Metadata = {
  title: "Client stories",
  description: clientStories.hero.lead,
};

export default function OurClientsPage() {
  const { breadcrumb, hero, storiesTitle, items, file, context, permission } = clientStories;

  // The quotes are the whole page. Until display permission is confirmed, production sends visitors
  // where every page outside the demo goes, instead of a hero promising stories it cannot show.
  if (!shown(permission)) redirect(`/coming-soon?from=${encodeURIComponent("/our-clients")}`);

  return (
    <>
      <PageHero
        breadcrumb={breadcrumb}
        title={hero.title}
        lead={
          // Block span so the short lead balances instead of leaving "Beyond Bancard." alone on a line.
          // The permission marker flags the whole set of quotes once, at the top of the page.
          <span className="block text-balance">
            {hero.lead}
            {permission.confirm && (
              <Confirm note={permission.note} variant="marker">
                {null}
              </Confirm>
            )}
          </span>
        }
      />

      <ClientStories title={storiesTitle} stories={items} labels={file} context={context} />

      <CtaBand />
    </>
  );
}
