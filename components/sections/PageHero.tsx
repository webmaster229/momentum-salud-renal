import Image from "next/image";
import { containerWide } from "@/components/ui/container";

type PageHeroProps = {
  id?: string;
  eyebrow?: string;
  lines: [{ text: string; tone: "brand" | "ink" }, { text: string; tone: "brand" | "ink" }];
  description: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  children?: React.ReactNode;
};

// Animación con CSS (no Motion) para que arranque sin esperar la hidratación.
// La foto (LCP) nunca parte de opacity 0.
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function PageHero({ id, eyebrow, lines, description, image, imageAlt, imagePosition = "xl:object-right", children }: PageHeroProps) {
  return (
    <section
      id={id}
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-white pt-16 lg:pt-20 xl:flex xl:min-h-[max(43.6vw,620px)] xl:items-center 2xl:pt-[100px]"
    >
      <div className={`${containerWide} pt-10 pb-8 sm:pt-14 xl:pt-0 xl:pb-[4vw]`}>
        <div className="relative z-10 max-w-3xl xl:max-w-[70rem]">
          {eyebrow ? (
            <p className="mb-3 animate-fade-up text-lead text-ink xl:mb-5" style={delay(0)}>
              {eyebrow}
            </p>
          ) : null}
          {/* En xl el título se achica (text-display) para no tapar la foto. */}
          <h1
            id="hero-title"
            className="animate-fade-up text-[clamp(2.25rem,1.2rem+3.2vw,3.5rem)] leading-[0.95] font-bold text-balance xl:text-display"
            style={delay(eyebrow ? 60 : 0)}
          >
            {lines.map((line) => (
              <span key={line.text} className={`block ${line.tone === "brand" ? "text-brand" : "text-ink"}`}>
                {line.text}
              </span>
            ))}
          </h1>

          <p className="mt-5 max-w-[43rem] animate-fade-up text-lead text-pretty text-ink xl:mt-7 xl:max-w-[min(43rem,38vw)]" style={delay(120)}>
            {description}
          </p>

          {children ? (
            <div className="mt-6 flex animate-fade-up flex-wrap gap-2 xl:mt-7" style={delay(200)}>
              {children}
            </div>
          ) : null}
        </div>

        <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-3xl bg-cream sm:aspect-[16/9] xl:absolute xl:inset-0 xl:top-20 xl:mt-0 xl:aspect-auto xl:rounded-none xl:bg-transparent 2xl:top-[100px]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className={`animate-hero-zoom object-cover object-[75%_center] ${imagePosition}`}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-white via-white/80 via-30% to-white/0 to-60% xl:block"
          />
        </div>
      </div>
    </section>
  );
}
