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
    "Personal portfolio of Mathias Huque, Software Developer and student. I design and build modern, scalable web applications from backend systems to intuitive frontends.",

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
      "I build modern, scalable digital products from architecture to polished user experiences.",
    siteName: "Mathias Huque Portfolio",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png", // create this (1200x630 recommended)
        width: 1200,
        height: 630,
        alt: "Mathias Huque Portfolio Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Mathias Huque | Software Developer",
    description: "Modern, scalable web applications built end-to-end.",
    images: ["/og-image.png"],
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
