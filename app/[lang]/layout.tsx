import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { NoImageDrag } from "@/components/layout/NoImageDrag";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { site } from "@/content/site";
import { localeTags, locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";
import "../globals.css";

// Respaldo si no carga Circe Rounded (ver globals.css).
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getDictionary();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} | ${t.meta.title}`,
      template: `%s | ${site.name}`,
    },
    description: t.meta.description,
    openGraph: {
      type: "website",
      locale: localeTags[locale].og,
      siteName: site.name,
      images: [{ url: "/images/og-momentum.jpg", width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: "#f57d00",
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  const t = await getDictionary();

  return (
    <html lang={localeTags[locale].html} className={nunito.variable} data-scroll-behavior="smooth">
      <body className="min-h-dvh font-sans">
        <NoImageDrag />
        <MotionProvider>
          <Header locale={locale} t={t.nav} />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
