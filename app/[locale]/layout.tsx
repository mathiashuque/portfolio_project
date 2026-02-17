import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import "../globals.css";
import { getMessages } from "next-intl/server";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://mathiashuque.dev";
const locales = ["en", "es"] as const;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Keep metadata for now in English, we’ll localize it later via generateMetadata.
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Mathias Huque | Software Developer",
    template: "%s | Mathias Huque",
  },
  description:
    "Portfolio of Mathias Huque, software developer building modern, scalable web applications from architecture to polished user experiences.",
  keywords: [
    "Mathias Huque",
    "Software Developer",
    "Full Stack Developer",
    "Web Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Mathias Huque" }],
  creator: "Mathias Huque",
  publisher: "Mathias Huque",
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
    type: "website",
    url: BASE_URL,
    title: "Mathias Huque | Software Developer",
    description: "I Build Software Apps That Turn Ideas Into Reality.",
    siteName: "Mathias Huque Portfolio",
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Mathias Huque Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mathias Huque | Software Developer",
    description: "I Build Software Apps That Turn Ideas Into Reality.",
    images: [`${BASE_URL}/og-image.png`],
  },
  icons: {
    icon: "/mh.logo.svg",
    shortcut: "/mh.logo.svg",
    apple: "/mh.logo.svg",
  },
  category: "technology",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as typeof locales[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
