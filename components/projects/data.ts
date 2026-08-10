import type { Project } from "./types";

export const PROJECTS: Project[] = [
  {
    name: "Portfolio Website",
    descriptionKey: "portfolioWebsite",
    tech: ["React", "Tailwind", "TypeScript"],
    link: "#",
    image: "/projects/portfolio.webp",
  },
  {
    name: "Algorithm Visualizer",
    descriptionKey: "algorithmVisualizer",
    tech: ["React", "Tailwind", "TypeScript"],
    link: "https://algoviz.mathiashuque.dev/",
    image: "/projects/algorithm-visualizer.webp",
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
];
