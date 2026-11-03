import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { container } from "@/components/ui/container";
import { CheckIcon } from "@/components/ui/icons";
import { contact, countryOrder, emailHref } from "@/content/site";
import { localeTags } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";
import { ContactForm } from "./ContactForm";

// El relleno superior deja espacio al encabezado fijo (64 / 80 / 100 px).
export async function Contacto() {
  const locale = await getLocale();
  const t = await getDictionary();
  const countries = countryOrder(t.countries, localeTags[locale].html).map((id) => ({ id, name: t.countries[id].name }));

  return (
    <section
      id="contacto"
      aria-labelledby="contacto-title"
      className="bg-mist pt-28 pb-16 lg:pt-36 lg:pb-[clamp(4rem,6vw,7rem)] 2xl:pt-[calc(100px+4rem)]"
    >
      <div className={container}>
        <Reveal>
          <div className="mx-auto grid max-w-[72rem] overflow-hidden rounded-[1.75rem] bg-white shadow-card lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="relative isolate overflow-hidden bg-brand px-6 py-9 text-white sm:px-8 lg:px-10 lg:py-10">
              <h1 id="contacto-title" className="text-title font-bold">
                {t.contacto.title}
              </h1>
              <p className="mt-4 max-w-md text-lead text-pretty">{t.contacto.subtitle}</p>

              <ul className="mt-6 space-y-3">
                {t.contacto.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-[1.0625rem] font-bold">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/20">
                      <CheckIcon className="size-4" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button href={emailHref} variant="white">
                  {t.contacto.emailDirect}
                </Button>
                <p className="mt-2 text-sm font-bold break-words">{contact.email}</p>
              </div>

              <Image
                src="/images/corazon.png"
                alt=""
                width={348}
                height={316}
                loading="eager"
                className="pointer-events-none absolute -right-8 -bottom-10 -z-10 w-48 opacity-20 lg:w-60"
              />
            </div>

            <ContactForm t={t.contacto} countries={countries} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
