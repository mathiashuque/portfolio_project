import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://mathiashuque.dev";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD (Structured Data) for Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Mathias Huque Portfolio",
        description:
          "Portfolio of Mathias Huque, software developer building modern, scalable web applications from architecture to polished user experiences.",
        inLanguage: "en",
      },
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#person`,
        name: "Mathias Huque",
        url: BASE_URL,
        image: `${BASE_URL}/og-image.png`, // swap to a headshot URL if you have one
        sameAs: [
          "https://github.com/mathiashuque",
          "https://linkedin.com/in/mathias-huque",
        ],
        jobTitle: "Software Developer",
      },
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/#webpage`,
        url: BASE_URL,
        name: "Mathias Huque | Software Developer",
        isPartOf: { "@id": `${BASE_URL}/#website` },
        about: { "@id": `${BASE_URL}/#person` },
        inLanguage: "en",
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          // JSON-LD must be injected as a string
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
