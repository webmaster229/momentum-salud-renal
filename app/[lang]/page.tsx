import type { Metadata } from "next";
import { Actualidad } from "@/components/sections/Actualidad";
import { Historias } from "@/components/sections/Historias";
import { PageHero } from "@/components/sections/PageHero";
import { Presencia } from "@/components/sections/Presencia";
import { Stats } from "@/components/sections/Stats";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contact, site } from "@/content/site";
import { alternatesFor } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  return { alternates: alternatesFor(await getLocale(), "/") };
}

export default async function Home() {
  const t = await getDictionary();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/images/logos/momentum-salud-renal.png`,
    description: t.meta.description,
    medicalSpecialty: "Nephrology",
    telephone: contact.phone,
    email: contact.email,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <PageHero
          id="inicio"
          lines={[
            { text: t.hero.title, tone: "brand" },
            { text: t.hero.titleEnd, tone: "brand" },
          ]}
          description={t.hero.description}
          image="/images/hero-portada.jpg"
          imageAlt={t.hero.imageAlt}
        />

        <Stats
          items={[
            { id: "pacientes", label: "pacientes" },
            { id: "sedes", label: "sedes" },
            { id: "paises", label: "paises" },
            { id: "anios", label: "anios" },
          ]}
        />

        <Presencia />

        <Historias
          t={t.historias}
          heading={<SectionHeading id="historias-title" title={t.historias.title} subtitle={t.historias.subtitle} />}
        />

        <Actualidad />
      </main>
    </>
  );
}
