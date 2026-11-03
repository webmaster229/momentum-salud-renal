"use client";

import { useState } from "react";
import { ChevronDownIcon, MailIcon } from "@/components/ui/icons";
import { contact, emailHref, type CountryId } from "@/content/site";
import type { Dictionary } from "@/i18n/dictionaries/es";

type Texts = Dictionary["contacto"];

type ContactFormProps = {
  t: Texts;
  countries: { id: CountryId; name: string }[];
};

const label = "mb-1 block text-sm font-bold text-ink";
// text-base: con menos de 16 px, iPhone hace zoom al tocar el campo.
const field =
  "w-full rounded-lg border border-line/60 bg-white px-3.5 text-base text-ink transition-colors outline-none placeholder:text-muted hover:border-line focus:border-brand";

/** Sin servidor: al enviarlo abre el correo de la persona con el mensaje armado para que lo envíe. */
export function ContactForm({ t, countries }: ContactFormProps) {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();
    const reason = t.reasons[get("reason") as keyof Texts["reasons"]] ?? "";
    const lines = [
      t.greeting,
      "",
      `${t.name}: ${get("name")}`,
      `${t.phone}: ${get("phone")}`,
      get("email") ? `${t.email}: ${get("email")}` : null,
      `${t.country}: ${countries.find((c) => c.id === get("country"))?.name ?? ""}`,
      `${t.reason}: ${reason}`,
      get("message") ? `${t.message}: ${get("message")}` : null,
    ].filter((line) => line !== null);
    const subject = encodeURIComponent(`${t.subject}: ${reason}`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${encodeURIComponent(lines.join("\r\n"))}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="grid content-start gap-4 bg-white px-5 py-7 sm:grid-cols-2 sm:px-8 lg:px-10 lg:py-10">
      <label className="sm:col-span-2">
        <span className={label}>{t.name}</span>
        <input name="name" required autoComplete="name" className={`${field} h-11`} />
      </label>

      <label>
        <span className={label}>{t.phone}</span>
        <input name="phone" type="tel" required minLength={7} autoComplete="tel" inputMode="tel" className={`${field} h-11`} />
      </label>

      <label>
        <span className={label}>
          {t.email} <span className="font-sans font-medium text-muted">({t.optional})</span>
        </span>
        <input name="email" type="email" autoComplete="email" className={`${field} h-11`} />
      </label>

      <label>
        <span className={label}>{t.country}</span>
        <span className="relative block">
          <select name="country" required defaultValue="" className={`${field} h-11 cursor-pointer appearance-none pr-10`}>
            <option value="" disabled>
              {t.selectCountry}
            </option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3.5 size-5 -translate-y-1/2 text-muted" />
        </span>
      </label>

      <label>
        <span className={label}>{t.reason}</span>
        <span className="relative block">
          <select name="reason" required defaultValue="cita" className={`${field} h-11 cursor-pointer appearance-none pr-10`}>
            {Object.entries(t.reasons).map(([value, text]) => (
              <option key={value} value={value}>
                {text}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3.5 size-5 -translate-y-1/2 text-muted" />
        </span>
      </label>

      <label className="sm:col-span-2">
        <span className={label}>
          {t.message} <span className="font-sans font-medium text-muted">({t.optional})</span>
        </span>
        {/* Con límite: algunos programas de correo no abren enlaces muy largos. */}
        <textarea name="message" rows={3} maxLength={800} placeholder={t.messagePlaceholder} className={`${field} resize-y py-3`} />
      </label>

      <label className="flex cursor-pointer items-start gap-3 text-sm text-ink/80 sm:col-span-2">
        <input type="checkbox" name="consent" required className="mt-0.5 size-5 shrink-0 cursor-pointer accent-brand" />
        {t.consent}
      </label>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:col-span-2">
        <button
          type="submit"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand px-5 font-bold text-white transition duration-150 ease-out hover:bg-brand-dark active:scale-[0.97]"
        >
          <MailIcon className="size-5" />
          {t.submit}
        </button>
        {sent ? (
          <p role="status" className="text-sm font-bold text-green-700">
            {t.sent}{" "}
            <a href={emailHref} className="break-words underline underline-offset-2">
              {contact.email}
            </a>
          </p>
        ) : null}
      </div>
    </form>
  );
}
