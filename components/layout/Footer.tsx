import Image from "next/image";
import Link from "next/link";
import { containerWide } from "@/components/ui/container";
import { site, social } from "@/content/site";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";

export async function Footer() {
  const locale = await getLocale();
  const t = await getDictionary();

  return (
    <footer className="bg-white">
      <div className={`${containerWide} grid gap-x-10 gap-y-8 py-10 sm:grid-cols-2 sm:items-center lg:py-[clamp(3rem,4.5vw,5rem)] 2xl:px-[6.5rem]`}>
        <Link href={localePath(locale, "/")} className="w-fit" aria-label={t.nav.home}>
          <Image
            src="/images/logos/momentum-salud-renal.png"
            alt={site.name}
            width={1337}
            height={249}
            className="h-auto w-[clamp(180px,18vw,340px)]"
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
                <Image src={s.icon} alt="" width={134} height={134} className="size-10 lg:size-12" />
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

        <p className="text-[clamp(0.875rem,0.7rem+0.3vw,1.125rem)] text-ink sm:self-end sm:text-right">{t.footer.copyright}</p>
      </div>
    </footer>
  );
}
