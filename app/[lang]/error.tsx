"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { localePath } from "@/i18n/config";
import { errorTexts, toLocale } from "@/i18n/errorTexts";

export default function Error({ retry }: { error: unknown; retry: () => void }) {
  const locale = toLocale(useParams().lang);
  const t = errorTexts[locale];

  return (
    <main className="flex min-h-[80dvh] flex-col items-center justify-center bg-white px-5 pt-24 pb-16 text-center">
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
        <Button href={localePath(locale, "/")} variant="silver">
          {t.home}
        </Button>
      </div>
    </main>
  );
}
