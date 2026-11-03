import { Button } from "@/components/ui/Button";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getDictionary();

  return (
    <main className="flex min-h-[80dvh] flex-col items-center justify-center bg-white px-5 pt-24 pb-16 text-center">
      <p aria-hidden className="text-display font-bold text-brand">
        404
      </p>
      <h1 className="mt-3 text-title font-bold text-balance text-ink">{t.notFound.title}</h1>
      <p className="mt-3 max-w-md text-lead text-pretty text-ink/75">{t.notFound.text}</p>
      <div className="mt-8">
        <Button href={localePath(locale, "/")}>{t.notFound.home}</Button>
      </div>
    </main>
  );
}
