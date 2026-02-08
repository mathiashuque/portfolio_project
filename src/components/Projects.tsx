import { useState } from "react";

type Category = "All" | "Web" | "UI" | "Apps" | "CMS";

type Project = {
  name: string;
  description: string;
  tech: string[];
  link: string;
  category: Exclude<Category, "All">;
  image: string;
};

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function ProjectTile({ project }: { project: Project }) {
  return (
    <a
      href={project.link}
      className={cn(
        "group relative block h-full w-full overflow-hidden rounded-2xl",
        "border border-border/10 bg-panel",
        "transition-transform duration-300 hover:-translate-y-1",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
      )}
    >
      <img
        src={project.image}
        alt={project.name}
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          "transition-transform duration-500 group-hover:scale-[1.03]",
        )}
        loading="lazy"
      />

      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(500px_circle_at_30%_-10%,rgba(56,189,248,0.18),transparent_55%)]" />
      </div>

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 p-4",
          "bg-linear-to-t from-black/70 via-black/30 to-transparent",
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {project.name}
            </p>
            <p className="mt-1 text-[11px] tracking-[0.18em] text-white/70">
              {project.category.toUpperCase()}
            </p>
          </div>

          <span
            className={cn(
              "shrink-0 rounded-full border border-white/15 bg-white/10 px-3 py-1",
              "text-[11px] font-medium text-white/85",
              "opacity-90 transition-opacity group-hover:opacity-100",
            )}
          >
            View →
          </span>
        </div>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300",
          "group-hover:opacity-100",
          "ring-1 ring-inset ring-accent/15",
        )}
      />
    </a>
  );
}

export default function Projects() {
  const projects: Project[] = [
    {
      name: "Portfolio Website",
      description:
        "Personal portfolio built with React and Tailwind to showcase my work and experience.",
      tech: ["React", "Tailwind", "TypeScript"],
      link: "#",
      category: "Web",
      image: "/projects/portfolio.png",
    },
    {
      name: "Finance Tracker System",
      description: "Track personal finances, budgets, and expenses.",
      tech: ["Node.js", "Express", "MongoDB"],
      link: "#",
      category: "CMS",
      image: "/projects/portfolio.png",
    },
    {
      name: "Algorithm Visualizer",
      description: "Visualization tool for sorting and pathfinding algorithms.",
      tech: ["React", "Canvas API"],
      link: "#",
      category: "Apps",
      image: "/projects/portfolio.png",
    },
  ];

  return (
    <section
      id="projects"
      className="px-6 max-w-7xl 2xl:max-w-360 mx-auto scroll-mt-32 mb-50"
    >
      {/* Header */}
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold tracking-[0.22em] text-faint/90">
          MY PROJECTS
        </p>

        <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-text">
          Selected Work
        </h2>

        <p className="mt-3 text-sm text-muted/80 max-w-2xl mx-auto leading-relaxed">
          A selection of projects I’ve built across web apps, UI systems, and
          experiments.
        </p>
      </div>

      {/* Square grid */}
      <div className={cn("grid gap-10", "grid-cols-1 sm:grid-cols-3")}>
        {projects.map((project) => (
          <div key={project.name} className="aspect-square w-full">
            <ProjectTile project={project} />
          </div>
        ))}
      </div>

      {/* See more */}
      <div className="mt-10 flex justify-center">
        <a
          href="#"
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold",
            "border border-border/10 bg-panel text-text/90",
            "transition-colors hover:border-border/20 hover:text-text",
          )}
        >
          See more
          <span className="text-accent">→</span>
        </a>
      </div>
    </section>
  );
}
