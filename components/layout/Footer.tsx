import Image from "next/image";
import Link from "next/link";
import { containerWide } from "@/components/ui/container";
import { logos } from "@/content/logos";
import { social } from "@/content/site";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";

export async function Footer() {
  const locale = await getLocale();
  const t = await getDictionary();

  return (
    <footer className="bg-white">
      <div className={`${containerWide} grid gap-x-10 gap-y-12 py-14 sm:grid-cols-2 sm:items-center lg:py-[7.5rem] 2xl:px-[6.5rem]`}>
        <Link href={localePath(locale, "/")} className="w-fit" aria-label={t.nav.home}>
          <Image
            src={logos[locale].src}
            alt={logos[locale].alt}
            width={logos[locale].width}
            height={logos[locale].height}
            className="h-auto w-[clamp(220px,27vw,520px)]"
          />
        </Link>

        <ul aria-label={t.footer.social} className="flex gap-1.5 sm:justify-end">
          {social.map((s) => (
            <li key={s.id}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="block rounded-full transition-[translate,opacity] duration-150 ease-out hover:-translate-y-0.5 hover:opacity-90"
              >
                <Image src={s.icon} alt="" width={134} height={134} className="size-12 lg:size-16" />
              </a>
            </li>
          ))}
        </ul>

        <Image
          src="/images/logos/vigilado-supersalud.png"
          alt="Vigilado Supersalud"
          width={482}
          height={132}
          className="h-auto w-[clamp(200px,18vw,347px)]"
        />

        <p className="text-[clamp(0.95rem,0.75rem+0.45vw,1.5625rem)] text-ink sm:self-end sm:text-right">{t.footer.copyright}</p>
      </div>
    </footer>
  );
}
