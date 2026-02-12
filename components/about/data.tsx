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
      "I am a Software Developer focused on building reliable, well-structured software systems that solve real problems. I work across different layers of the stack—designing, implementing, and refining applications and services with clean architecture, predictable behavior, and a strong emphasis on performance and user experience.",

      "Beyond writing code, I care about how software is structured, maintained, and evolved over time. I approach engineering with a pragmatic mindset—balancing technical depth with real-world constraints to deliver solutions that are efficient, scalable, and built to last.",
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
        description:
          "Data visualization and management tools for internal use.",
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
    subtitle:
      "Technology is an investment, not an expense. Here is how I drive ROI.",
    items: [
      {
        left: "Manual processes wasting time",
        right: "I build systems that automate operations",
      },
      {
        left: "No online presence",
        right: "I design high-converting websites",
      },
      { left: "Idea but no product", right: "I turn ideas into live apps" },
      {
        left: "Low customer engagement",
        right: "I build apps users love to use",
      },
      {
        left: "Poor scalability",
        right: "I build with architecture ready for growth",
      },
    ] as const,
  },
];
