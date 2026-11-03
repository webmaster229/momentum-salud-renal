import Link from "next/link";

type Variant = "brand" | "silver" | "white";

const variants: Record<Variant, string> = {
  brand: "bg-brand text-white hover:bg-brand-dark",
  silver: "bg-silver text-white hover:bg-muted",
  white: "bg-white text-ink hover:bg-cream",
};

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
};

export function Button({ href, children, variant = "brand", className = "", external }: ButtonProps) {
  const classes = `inline-flex min-h-10 items-center justify-center rounded-[5px] px-4 text-[0.9375rem] font-bold transition duration-150 ease-out active:scale-[0.97] ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
