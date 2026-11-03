import Image from "next/image";
import Link from "next/link";
import type { Noticia } from "@/content/noticias";
import { ChevronIcon } from "./icons";

type NewsCardProps = {
  noticia: Noticia;
  href: string;
  dateLocale: string;
  readMoreLabel: string;
};

export function NewsCard({ noticia, href, dateLocale, readMoreLabel }: NewsCardProps) {
  const date = noticia.date
    ? new Intl.DateTimeFormat(dateLocale, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
        new Date(noticia.date),
      )
    : null;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[0.9rem] bg-white shadow-card transition-[translate,box-shadow] duration-300 ease-out-quint focus-within:ring-2 focus-within:ring-brand hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative aspect-[16/9] overflow-hidden bg-mist">
        <Image
          src={noticia.image}
          alt={noticia.imageAlt}
          fill
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 33vw, 92vw"
          className="object-cover transition-transform duration-500 ease-out-quint group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 items-end gap-3 p-[clamp(0.75rem,0.5rem+0.4vw,1rem)] pb-5">
        <div className="flex-1">
          <h3 className="font-sans text-card font-medium text-balance text-brand">
            <Link
              href={href}
              aria-label={`${readMoreLabel} ${noticia.title}`}
              className="after:absolute after:inset-0 focus-visible:outline-none"
            >
              {noticia.title}
            </Link>
          </h3>
          <p className="mt-1 text-[clamp(0.9rem,0.7rem+0.35vw,1.25rem)] text-ink">
            {date ? <time dateTime={noticia.date}>{date}</time> : noticia.category}
          </p>
        </div>
        <ChevronIcon className="mb-1 h-6 w-4 shrink-0 text-brand transition-transform duration-200 ease-out group-hover:translate-x-1" />
      </div>
    </article>
  );
}
