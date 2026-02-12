import type { AboutTab } from "./types";
import {
  LayoutGrid,
  Smartphone,
  Gauge,
  CreditCard,
  ShoppingCart,
  Database,
} from "lucide-react";

export const ABOUT_TABS: readonly AboutTab[] = [
  {
    kind: "bio",
    key: "bio",
    label: "About",
    title: "About Mathias Huque",
    paragraphs: [
      "I build clean, modern web applications with a strong focus on usability, maintainability, and performance.",
      "With a deep understanding of both technology and business needs, I bridge the gap between complex code and real outcomes—shipping reliable products that scale.",
    ],
  },
  {
    kind: "services",
    key: "services",
    label: "Services",
    title: "What I Can Build For You",
    subtitle: "End-to-end development services for modern businesses.",
    services: [
      {
        title: "Custom Web Applications",
        description: "Scalable React/Next.js apps tailored to business needs.",
        icon: <LayoutGrid className="h-5 w-5" />,
      },
      {
        title: "Mobile Apps",
        description: "Native iOS & Android apps using React Native & Expo.",
        icon: <Smartphone className="h-5 w-5" />,
      },
      {
        title: "Admin Dashboards",
        description: "Data visualization and management tools for internal use.",
        icon: <Gauge className="h-5 w-5" />,
      },
      {
        title: "Fintech Systems",
        description: "Secure payment integrations and financial workflows.",
        icon: <CreditCard className="h-5 w-5" />,
      },
      {
        title: "E-commerce Platforms",
        description: "High-performance online stores with modern UX.",
        icon: <ShoppingCart className="h-5 w-5" />,
      },
      {
        title: "API & Backend",
        description: "Robust Node.js/Express services and integrations.",
        icon: <Database className="h-5 w-5" />,
      },
    ] as const,
  },
  {
    kind: "impact",
    key: "impact",
    label: "Impact",
    title: "How I Help Businesses Grow",
    subtitle: "Technology is an investment, not an expense. Here is how I drive ROI.",
    items: [
      { left: "Manual processes wasting time", right: "I build systems that automate operations" },
      { left: "No online presence", right: "I design high-converting websites" },
      { left: "Idea but no product", right: "I turn ideas into live apps" },
      { left: "Low customer engagement", right: "I build apps users love to use" },
      { left: "Poor scalability", right: "I build with architecture ready for growth" },
    ] as const,
  },
];
