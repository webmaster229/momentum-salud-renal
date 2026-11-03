import Image from "next/image";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { countries } from "@/content/site";
import { getDictionary } from "@/i18n/server";
import { MapPoints } from "./MapPoints";

export async function Presencia() {
  const t = await getDictionary();
  const shortNames = Object.fromEntries(countries.map((c) => [c.id, t.countries[c.id].short])) as Record<
    (typeof countries)[number]["id"],
    string
  >;

  return (
    <section
      id="presencia"
      aria-labelledby="presencia-title"
      className="relative isolate overflow-hidden bg-brand lg:grid lg:grid-cols-[minmax(0,1fr)_min(48.5vw,931px)] lg:items-center"
    >
      {/* Sin imagen de fondo en pantallas angostas: se ampliaría demasiado. */}
      <Image src="/images/fondo-mapa.jpg" alt="" fill sizes="100vw" className="-z-10 hidden object-cover object-left-top lg:block" />

      {/* Margen negativo: el borde izquierdo del mapa está vacío. Relleno superior mínimo: el título no debe tocar los círculos blancos del fondo. */}
      <div className="relative z-10 px-5 pt-16 pb-10 sm:px-8 lg:-mr-[4vw] lg:pt-[clamp(8rem,5.5rem+4.2vw,12rem)] lg:pr-0 lg:pb-[clamp(4rem,7.8vw,9.5rem)] lg:pl-[max(3rem,calc((100vw-1596px)/2))]">
        <SectionHeading id="presencia-title" tone="onBrand" title={t.presencia.title} subtitle={t.presencia.subtitle} />

        <Stagger as="ul" className="mt-10 space-y-[clamp(1.25rem,1.5vw,1.8rem)] lg:mt-[clamp(2.5rem,3.3vw,4rem)] lg:pl-[clamp(2rem,8vw,9.7rem)]">
          {countries.map((c) => (
            <StaggerItem as="li" key={c.id} className="flex gap-3 text-stat">
              <Image src="/images/punto-ondas.png" alt="" width={183} height={198} className="mt-[0.1em] size-[1.1em] shrink-0 object-contain" />
              <p>
                <span className="block text-white">{t.countries[c.id].name}</span>
                <span className="block text-ink">{t.countries[c.id].tagline}</span>
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <MapPoints labels={shortNames} ariaLabel={t.presencia.mapLabel} className="mx-auto max-w-xl lg:max-w-none" />
    </section>
  );
}
