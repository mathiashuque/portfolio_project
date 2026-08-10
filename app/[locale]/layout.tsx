import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import ThemeInitScript from "@/components/ThemeInitScript";
import {
  absoluteUrl,
  isLocale,
  localePath,
  LOCALES,
  SEO,
  SITE,
} from "@/lib/site";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  const locale = localeParam;
  const seo = SEO[locale];
  const pathname = localePath(locale);
  const alternateLocale = locale === "en" ? SEO.es.ogLocale : SEO.en.ogLocale;

  return {
    metadataBase: new URL(SITE.url),
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: pathname,
      languages: {
        en: "/en",
        es: "/es",
        "x-default": "/en",
      },
    },
    authors: [{ name: SITE.owner, url: SITE.url }],
    creator: SITE.owner,
    publisher: SITE.owner,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "profile",
      url: pathname,
      title: seo.title,
      description: seo.description,
      siteName: SITE.name,
      locale: seo.ogLocale,
      alternateLocale: [alternateLocale],
      images: [
        {
          url: SITE.ogImagePath,
          width: 1200,
          height: 630,
          alt: `${SITE.owner} — Software Developer`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [SITE.ogImagePath],
    },
    icons: {
      icon: [
        { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      shortcut: "/favicon.ico",
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    manifest: "/site.webmanifest",
    appleWebApp: {
      title: "mathiashuque.dev",
    },
    category: "technology",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const nonce = (await headers()).get("x-nonce") ?? undefined;

  const messages = (await import(`../../messages/${locale}.json`)).default;
  const seo = SEO[locale];
  const pageUrl = absoluteUrl(localePath(locale));
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": absoluteUrl("/#person"),
        name: SITE.owner,
        url: SITE.url,
        jobTitle:
          locale === "es" ? "Desarrollador de Software" : "Software Developer",
        sameAs: [SITE.githubUrl, SITE.linkedInUrl],
        address: {
          "@type": "PostalAddress",
          addressCountry: "UY",
          addressLocality: "Montevideo",
        },
        knowsAbout: ["React", "Next.js", "TypeScript", ".NET", "Node.js"],
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: SITE.url,
        name: SITE.name,
        inLanguage: LOCALES,
        publisher: { "@id": absoluteUrl("/#person") },
      },
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#profile`,
        url: pageUrl,
        name: seo.title,
        description: seo.description,
        inLanguage: locale,
        isPartOf: { "@id": absoluteUrl("/#website") },
        mainEntity: { "@id": absoluteUrl("/#person") },
      },
    ],
  };

  return (
    <html
      lang={locale}
      className="snap-y snap-mandatory motion-reduce:snap-none"
      suppressHydrationWarning
    >
      <head>
        <ThemeInitScript nonce={nonce} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          id="structured-data"
          type="application/ld+json"
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
