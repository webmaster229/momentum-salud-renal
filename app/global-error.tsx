"use client";

import { useParams } from "next/navigation";
import { localePath, localeTags } from "@/i18n/config";
import { errorTexts, toLocale } from "@/i18n/errorTexts";
import "./globals.css";

/** Solo aparece si falla el layout principal: reemplaza toda la página, por eso lleva su propio <html>. */
export default function GlobalError({ retry }: { error: unknown; retry: () => void }) {
  const locale = toLocale(useParams().lang);
  const t = errorTexts[locale];

  return (
    <html lang={localeTags[locale].html}>
      <body className="font-sans">
        <title>{t.title}</title>
        <main className="flex min-h-dvh flex-col items-center justify-center bg-white px-5 py-16 text-center">
          <h1 className="text-title font-bold text-balance text-ink">{t.title}</h1>
          <p className="mt-3 max-w-md text-lead text-pretty text-ink/75">{t.text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => retry()}
              className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-[5px] bg-brand px-4 text-[0.9375rem] font-bold text-white transition duration-150 ease-out hover:bg-brand-dark active:scale-[0.97]"
            >
              {t.retry}
            </button>
            {/* <a>: tras un fallo del layout conviene recargar todo, no navegar dentro de la aplicación. */}
            <a
              href={localePath(locale, "/")}
              className="inline-flex min-h-10 items-center justify-center rounded-[5px] bg-silver px-4 text-[0.9375rem] font-bold text-white transition duration-150 ease-out hover:bg-muted active:scale-[0.97]"
            >
              {t.home}
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
