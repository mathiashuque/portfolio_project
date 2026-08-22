import type { FeaturedProject, Project } from "./types";

export const FEATURED_PROJECT: FeaturedProject = {
  name: "SILO",
  descriptionKey: "silo",
  descriptionSecondaryKey: "siloDescriptionSecondary",
  tech: ["TypeScript", "Next.js", "NestJS", "PostgreSQL"],
  secondaryTitleKey: "siloSecondaryTitle",
  statusKey: "siloStatus",
  altKey: "siloImageAlt",
  image: "/projects/silo.webp",
  partnershipKey: "siloPartnership",
  partnerLogo: "/projects/sonda-logo.svg",
  partnerName: "SONDA Uruguay",
  partnerUrl: "https://www.sonda.com/",
  highlightsKey: "siloHighlights",
};

export const PROJECTS: Project[] = [
  {
    name: "Algorithm Visualizer",
    descriptionKey: "algorithmVisualizer",
    tech: ["React", "Tailwind", "TypeScript"],
    link: "https://algoviz.mathiashuque.dev/",
    image: "/projects/algorithm-visualizer.webp",
  },
  {
    name: "MyPDF",
    descriptionKey: "myPdf",
    tech: ["Next.js", "Tailwind", "TypeScript"],
    link: "https://my-pdf.mathiashuque.dev/en",
    image: "/projects/mypdf.webp",
  },
  {
    name: "Interview Forge",
    descriptionKey: "interviewForge",
    tech: ["React", "Tailwind", "TypeScript"],
    link: "https://interview-forge.mathiashuque.dev/",
    image: "/projects/interview-forge.webp",
  },
  {
    name: "ML Playground",
    descriptionKey: "mlPlayground",
    tech: ["Next.js", "Tailwind", "TypeScript"],
    link: "https://ml-playground.mathiashuque.dev/en",
    image: "/projects/ml-playground.png",
  },
  {
    name: "FavForge",
    descriptionKey: "favForge",
    tech: ["Next.js", "Tailwind", "TypeScript"],
    link: "https://favforge.mathiashuque.dev/",
    image: "/projects/favforge.webp",
  },
  {
    name: "Portfolio Website",
    descriptionKey: "portfolioWebsite",
    tech: ["React", "Tailwind", "TypeScript"],
    link: "https://github.com/mathiashuque/portfolio_project",
    image: "/projects/portfolio.webp",
  },
];
