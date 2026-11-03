import Image from "next/image";
import { containerWide } from "@/components/ui/container";

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

type SobreHeroProps = {
  eyebrow: string;
  title: string;
  titleEnd: string;
  description: string;
  cta: { label: string; href: string };
};

export function SobreHero({ eyebrow, title, titleEnd, description, cta }: SobreHeroProps) {
  return (
    // #ff7f00: el naranja de portada.jpg (no el de la marca), para que no se note el borde.
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-[#ff7f00] pt-16 lg:pt-20 2xl:pt-[100px]">
      {/* 44vw = proporción de portada.jpg (1915×844), para verla completa. */}
      <div className={`${containerWide} relative z-10 pt-12 pb-10 sm:pt-16 lg:flex lg:min-h-[44vw] lg:items-center lg:py-[4vw]`}>
        <div className="max-w-[40rem] text-white lg:max-w-[46%]">
          <p className="mb-3 animate-fade-up text-lead lg:mb-4" style={delay(0)}>
            {eyebrow}
          </p>
          <h1 id="hero-title" className="animate-fade-up text-[clamp(2.25rem,1.2rem+3.2vw,3.5rem)] leading-[0.95] font-bold lg:text-display" style={delay(60)}>
            <span className="block">{title}</span>
            <span className="block">{titleEnd}</span>
          </h1>
          <p className="mt-5 max-w-[44rem] animate-fade-up text-lead text-pretty" style={delay(120)}>
            {description}
          </p>
          <div className="mt-8 animate-fade-up" style={delay(200)}>
            <a
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center rounded-xl bg-white px-7 text-[clamp(1.0625rem,0.8rem+0.5vw,1.375rem)] text-ink/70 shadow-[0_8px_24px_rgb(150_50_0/0.25)] transition duration-150 ease-out hover:text-brand active:scale-[0.97]"
            >
              {cta.label}
            </a>
          </div>
        </div>
      </div>

      <div className="relative h-[62vw] sm:h-[48vw] lg:absolute lg:inset-x-0 lg:top-20 lg:bottom-0 lg:-z-10 lg:h-auto 2xl:top-[100px]">
        <Image
          src="/images/sobre/portada.jpg"
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="animate-hero-zoom object-cover object-[88%_center] lg:object-right"
        />
      </div>
    </section>
  );
}
