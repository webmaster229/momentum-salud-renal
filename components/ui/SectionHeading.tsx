import { Reveal } from "@/components/motion/Reveal";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  tone?: "default" | "onBrand";
  id?: string;
  className?: string;
};

export function SectionHeading({ title, subtitle, tone = "default", id, className = "" }: SectionHeadingProps) {
  const onBrand = tone === "onBrand";
  return (
    <Reveal className={className}>
      <h2 id={id} className="text-pretty">
        <span className={`block text-title font-bold ${onBrand ? "text-white" : "text-brand"}`}>{title}</span>
        {subtitle ? (
          <span className={`mt-1 block font-bold text-ink ${onBrand ? "text-stat" : "text-title"}`}>{subtitle}</span>
        ) : null}
      </h2>
    </Reveal>
  );
}
