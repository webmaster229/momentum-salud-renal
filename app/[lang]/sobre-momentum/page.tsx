import type { Metadata } from "next";
import { Holding } from "@/components/sections/Holding";
import { HoldingBand } from "@/components/sections/HoldingBand";
import { SobreHero } from "@/components/sections/SobreHero";
import { holdingUrl } from "@/content/site";
import { alternatesFor } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getDictionary();
  return {
    title: t.meta.sobreTitle,
    description: t.meta.sobreDescription,
    alternates: alternatesFor(locale, "/sobre-momentum"),
  };
}

export default async function SobrePage() {
  const t = await getDictionary();

  return (
    <main>
      <SobreHero
        eyebrow={t.sobreHero.eyebrow}
        title={t.sobreHero.title}
        titleEnd={t.sobreHero.titleEnd}
        description={t.sobreHero.description}
        cta={{ label: t.sobreHero.cta, href: holdingUrl }}
      />
      <Holding />
      <HoldingBand />
    </main>
  );
}
