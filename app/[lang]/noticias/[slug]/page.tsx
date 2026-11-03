import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { NewsCard } from "@/components/ui/NewsCard";
import { getNoticia, getNoticias } from "@/content/noticias";
import { site } from "@/content/site";
import { alternatesFor, localePath, localeTags } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { getDictionary, getLocale } from "@/i18n/server";

type Params = PageProps<"/[lang]/noticias/[slug]">["params"];

export async function generateStaticParams() {
  return getNoticias(await getLocale()).map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/noticias/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const noticia = getNoticia(locale, slug);
  if (!noticia) return {};
  return {
    title: noticia.title,
    description: noticia.excerpt,
    alternates: alternatesFor(locale, `/noticias/${noticia.slug}`),
    openGraph: { type: "article", locale: localeTags[locale].og, siteName: site.name, title: noticia.title, description: noticia.excerpt, images: [noticia.image] },
  };
}

// El artículo lee `params` dentro de <Suspense> para que la navegación sea instantánea (Cache Components).
export default async function NoticiaPage({ params }: PageProps<"/[lang]/noticias/[slug]">) {
  const t = await getDictionary();
  return (
    <main className="pt-16 lg:pt-20 2xl:pt-[100px]">
      <Suspense fallback={<ArticleSkeleton t={t.noticia} />}>
        <NoticiaContent params={params} />
      </Suspense>
    </main>
  );
}

async function NoticiaContent({ params }: { params: Params }) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getDictionary();
  const noticia = getNoticia(locale, slug);
  if (!noticia) notFound();

  const otras = getNoticias(locale).filter((n) => n.slug !== noticia.slug);

  return (
    <>
      <article className="mx-auto max-w-3xl px-5 pt-10 pb-16 sm:px-6 sm:pt-14 lg:pb-24">
        <BackLink href={localePath(locale, "/#noticias")} label={t.noticia.back} />

        <p className="mt-8 w-fit animate-fade-up rounded-[5px] bg-brand px-3 py-1 text-sm font-bold text-white">{noticia.category}</p>
        <h1 className="mt-4 animate-fade-up text-title font-bold text-balance text-brand" style={{ animationDelay: "80ms" }}>
          {noticia.title}
        </h1>

        <div className="relative mt-10 aspect-[4/3] animate-fade-up overflow-hidden rounded-[1.25rem] sm:aspect-[16/10]" style={{ animationDelay: "160ms" }}>
          <Image src={noticia.image} alt={noticia.imageAlt} fill preload sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
        </div>

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink/85">
          {noticia.body.map((block, i) =>
            block.type === "p" ? (
              <p key={i} className="text-pretty">
                {block.text}
              </p>
            ) : (
              <ul key={i} className="space-y-4">
                {block.items.map((item) => (
                  <li key={item.text} className="flex gap-3">
                    <span aria-hidden className="mt-3 size-2 shrink-0 rounded-full bg-brand" />
                    <span>
                      {item.lead ? <strong className="font-bold text-ink">{item.lead}: </strong> : null}
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            ),
          )}
        </div>
      </article>

      <section aria-labelledby="otras-title" className="bg-mist py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <h2 id="otras-title" className="text-title font-bold text-brand">
              {t.noticia.others}
            </h2>
          </Reveal>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {otras.map((n, i) => (
              <Reveal as="li" key={n.slug} delay={i * 0.08}>
                <NewsCard
                  noticia={n}
                  href={localePath(locale, `/noticias/${n.slug}`)}
                  dateLocale={localeTags[locale].html}
                  readMoreLabel={t.actualidad.readMore}
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="group inline-flex min-h-11 items-center gap-2 font-bold text-brand-dark">
      <svg aria-hidden viewBox="0 0 20 20" className="size-5 transition-transform duration-150 ease-out group-hover:-translate-x-1" fill="none">
        <path d="M16 10H5m0 0 4.5-4.5M5 10l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </Link>
  );
}

function ArticleSkeleton({ t }: { t: Dictionary["noticia"] }) {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-10 pb-16 sm:px-6 sm:pt-14" aria-busy="true" aria-label={t.loading}>
      <div className="h-11 w-40 animate-pulse rounded-full bg-mist" />
      <div className="mt-8 h-7 w-28 animate-pulse rounded-[5px] bg-mist" />
      <div className="mt-4 h-12 w-4/5 animate-pulse rounded-2xl bg-mist" />
      <div className="mt-10 aspect-[4/3] animate-pulse rounded-[1.25rem] bg-mist sm:aspect-[16/10]" />
    </div>
  );
}
