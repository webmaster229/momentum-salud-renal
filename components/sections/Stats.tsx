import Image from "next/image";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { container } from "@/components/ui/container";
import { stats, type StatId } from "@/content/site";
import { localeTags } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";

type StatsProps = {
  items: { id: StatId; label: "pacientes" | "sedes" | "sedesRegion" | "paises" | "anios" | "red" }[];
  variant?: "home" | "row";
};

export async function Stats({ items, variant = "home" }: StatsProps) {
  const locale = await getLocale();
  const t = await getDictionary();
  const row = variant === "row";

  const list = (
    <Stagger
      as="ul"
      className={
        row
          ? "grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:flex xl:items-start xl:justify-between xl:gap-6"
          : "grid grid-cols-2 gap-x-6 gap-y-10 lg:flex lg:items-center lg:justify-between lg:gap-x-0 2xl:flex-1 2xl:justify-end"
      }
    >
      {items.map((item, i) => {
        const stat = stats[item.id];
        // Ícono encima de la cifra en pantallas angostas: si no, etiquetas largas no caben.
        return (
          <StaggerItem
            as="li"
            key={item.label}
            className={`flex flex-col items-start gap-[clamp(0.75rem,1vw,1.25rem)] ${row ? "md:flex-row" : "sm:flex-row sm:items-center"} ${
              !row && i > 0 ? "lg:border-l-2 lg:border-line lg:pl-[clamp(1rem,1.7vw,2rem)]" : ""
            } ${!row && i < items.length - 1 ? "lg:pr-[clamp(1rem,1.7vw,2rem)]" : ""}`}
          >
            {/* max-w-none: con max-width:100% el navegador mide el ícono como 0 px y las cifras se enciman. */}
            <Image
              src={stat.icon}
              alt=""
              width={215}
              height={280}
              className={`w-auto max-w-none shrink-0 ${row ? "h-[clamp(3.5rem,4.4vw,5.25rem)]" : "h-[clamp(3.25rem,3.8vw,4.6rem)]"}`}
            />
            <p className="leading-[1.15]">
              <span className={`block text-brand ${row ? "text-title" : "text-stat"}`}>
                <CountUp value={stat.value} prefix={stat.prefix} locale={localeTags[locale].html} />
              </span>
              <span className="block max-w-[9em] text-stat text-ink max-[22.5rem]:text-[1.125rem]">{t.stats[item.label]}</span>
            </p>
          </StaggerItem>
        );
      })}
    </Stagger>
  );

  if (row) {
    return (
      <section aria-label={t.stats.titleHighlight} className="bg-white py-16 lg:py-[clamp(4rem,6.5vw,7.5rem)]">
        <div className={`${container} 2xl:px-[clamp(3rem,6vw,7rem)]`}>{list}</div>
      </section>
    );
  }

  return (
    <section aria-labelledby="cifras-title" className="bg-white py-16 lg:py-[clamp(4rem,6.5vw,7.5rem)]">
      <div className={`${container} flex flex-col gap-10 2xl:flex-row 2xl:items-center 2xl:gap-12`}>
        <Reveal className="2xl:shrink-0">
          <h2 id="cifras-title" className="text-title font-bold">
            <span className="block text-brand">{t.stats.titleHighlight}</span>
            <span className="block text-ink">{t.stats.title}</span>
          </h2>
        </Reveal>
        {list}
      </div>
    </section>
  );
}
