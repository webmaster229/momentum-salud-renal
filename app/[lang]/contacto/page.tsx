import type { Metadata } from "next";
import { Contacto } from "@/components/sections/Contacto";
import { alternatesFor } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getDictionary();
  return {
    title: t.meta.contactoTitle,
    description: t.meta.contactoDescription,
    alternates: alternatesFor(locale, "/contacto"),
  };
}

export default function ContactoPage() {
  return (
    <main>
      <Contacto />
    </main>
  );
}
