import { DrawnHeart } from "@/components/motion/DrawnHeart";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { container } from "@/components/ui/container";
import { NewsCard } from "@/components/ui/NewsCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getNoticias } from "@/content/noticias";
import { localePath, localeTags } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";

export async function Actualidad() {
  const locale = await getLocale();
  const t = await getDictionary();
  const noticias = getNoticias(locale);

  return (
    <section id="noticias" aria-labelledby="noticias-title" className="bg-mist py-16 lg:py-[clamp(4rem,4.8vw,5.75rem)]">
      <div className={container}>
        <SectionHeading id="noticias-title" title={t.actualidad.title} subtitle={t.actualidad.subtitle} />

        <div className="mt-10 grid items-stretch gap-8 lg:mt-[clamp(3rem,8.5vw,10rem)] lg:px-[clamp(0rem,1.2vw,1.4rem)] xl:grid-cols-[minmax(0,863fr)_minmax(0,550fr)] xl:gap-[clamp(2rem,8.4vw,10rem)]">
          <Stagger as="ul" className="grid gap-[clamp(1rem,1.3vw,1.6rem)] sm:grid-cols-3">
            {noticias.map((n) => (
              <StaggerItem as="li" key={n.slug}>
                <NewsCard
                  noticia={n}
                  href={localePath(locale, `/noticias/${n.slug}`)}
                  dateLocale={localeTags[locale].html}
                  readMoreLabel={t.actualidad.readMore}
                />
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="h-full">
            <div
              className="relative isolate flex h-full min-h-64 flex-col justify-center overflow-hidden rounded-[1.9rem] bg-brand px-[clamp(1.75rem,3vw,3.6rem)] py-10 pr-[min(36%,190px)]"
            >
              <h2 className="font-sans text-stat font-medium text-white">{t.actualidad.ctaTitle}</h2>
              <p className="text-card text-white">{t.actualidad.ctaText}</p>
              <div className="mt-4">
                <Button href={localePath(locale, "/contacto")} variant="white" className="min-h-9 px-3 text-[0.875rem]">
                  {t.actualidad.ctaButton}
                </Button>
              </div>
              <DrawnHeart className="pointer-events-none absolute right-0 bottom-0 -z-10 h-auto w-[34%] max-w-[174px]" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
