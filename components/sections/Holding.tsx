import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { containerWide } from "@/components/ui/container";
import { holding } from "@/content/site";
import { getDictionary } from "@/i18n/server";

export async function Holding() {
  const t = await getDictionary();

  return (
    <section id="holding" aria-labelledby="holding-title" className="bg-white py-16 lg:py-[clamp(4rem,5.5vw,6.5rem)]">
      <div className={`${containerWide} grid gap-10 lg:gap-12 min-[1150px]:grid-cols-[minmax(0,1fr)_auto] min-[1150px]:items-center min-[1150px]:gap-12 2xl:gap-16`}>
        <Reveal className="max-w-[46rem]">
          <h2 id="holding-title" className="text-[clamp(1.5rem,1rem+1.1vw,2.25rem)] leading-tight font-bold text-balance text-brand">
            {t.holding.title}
          </h2>
          <p className="mt-3 text-[clamp(0.95rem,0.3rem+0.85vw,1.3rem)] leading-snug text-pretty text-ink">{t.holding.description}</p>
        </Reveal>

        <Stagger as="ul" className="grid gap-8 sm:grid-cols-3 sm:gap-6 min-[1150px]:flex min-[1150px]:gap-[clamp(1.25rem,2vw,2.5rem)]">
          {holding.map((b) => (
            <StaggerItem as="li" key={b.id}>
              <Image
                src={b.logo}
                alt={b.name}
                width={b.width}
                height={b.height}
                className="h-[clamp(1.4rem,1.75vw,2.15rem)] w-auto min-[1150px]:h-[clamp(1.2rem,1.55vw,2.15rem)]"
              />
              <p className="mt-1.5 text-[clamp(1.125rem,0.45rem+1vw,1.625rem)] leading-tight text-brand min-[1150px]:text-[clamp(1rem,0.2rem+1.15vw,1.625rem)] min-[1150px]:whitespace-nowrap">
                {t.holding[b.id]}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
