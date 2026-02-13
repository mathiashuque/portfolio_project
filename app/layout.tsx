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

export const metadata: Metadata = {
  metadataBase: new URL("https://mathiashuque.dev"),

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
    url: "https://mathiashuque.dev",
    title: "Mathias Huque | Software Developer",
    description:
      "I Build Software Apps That Turn Ideas Into Reality.",
    siteName: "Mathias Huque Portfolio",
    locale: "en_US",
    images: [
      {
        url: "https://mathiashuque.dev/og-image.png",
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
    images: ["https://mathiashuque.dev/og-image.png"],
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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
