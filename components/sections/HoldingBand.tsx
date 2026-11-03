import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { containerWide } from "@/components/ui/container";
import { getDictionary } from "@/i18n/server";

// #ff7e00: el naranja de barra.png. lg:min-h 17,5vw = proporción de la imagen, para verla completa.
export async function HoldingBand() {
  const t = await getDictionary();

  return (
    <section aria-labelledby="holding-band-title" className="relative isolate overflow-hidden bg-[#ff7e00]">
      <Image src="/images/sobre/barra.png" alt="" fill sizes="100vw" className="-z-10 object-cover object-center" />
      <div className={`${containerWide} flex min-h-56 items-center py-14 lg:min-h-[17.5vw] lg:py-10`}>
        <Reveal className="lg:pl-[clamp(0rem,6vw,7.5rem)]">
          <h2 id="holding-band-title" className="text-title font-bold text-white">
            {t.holdingBand.title}
          </h2>
          <p className="mt-2 max-w-[22em] text-[clamp(1.25rem,0.85rem+0.9vw,2rem)] leading-snug text-white">{t.holdingBand.text}</p>
        </Reveal>
      </div>
    </section>
  );
}
