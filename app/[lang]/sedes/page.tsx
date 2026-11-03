import type { Metadata } from "next";
import { EncuentraSede } from "@/components/sections/EncuentraSede";
import { PageHero } from "@/components/sections/PageHero";
import { Stats } from "@/components/sections/Stats";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { countryOrder } from "@/content/site";
import { alternatesFor, localeTags } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getDictionary();
  return {
    title: t.meta.sedesTitle,
    description: t.meta.sedesDescription,
    alternates: alternatesFor(locale, "/sedes"),
  };
}

export default async function SedesPage() {
  const locale = await getLocale();
  const t = await getDictionary();

  return (
    <main>
      <PageHero
        eyebrow={t.sedesHero.eyebrow}
        lines={[
          { text: t.sedesHero.title, tone: "ink" },
          { text: t.sedesHero.titleEnd, tone: "brand" },
        ]}
        description={t.sedesHero.description}
        image="/images/sedes/sedes-portada.jpg"
        imageAlt={t.sedesHero.imageAlt}
      />

      <Stats
        variant="row"
        items={[
          { id: "sedes", label: "sedesRegion" },
          { id: "pacientes", label: "pacientes" },
          { id: "paises", label: "paises" },
          { id: "anios", label: "anios" },
          { id: "red", label: "red" },
        ]}
      />

      <EncuentraSede
        t={t.encuentra}
        countryTexts={t.countries}
        mapLabel={t.presencia.mapLabel}
        locale={localeTags[locale].html}
        order={countryOrder(t.countries, localeTags[locale].html)}
        heading={<SectionHeading id="encuentra-title" tone="onBrand" title={t.encuentra.title} subtitle={t.encuentra.subtitle} />}
      />
    </main>
  );
}
