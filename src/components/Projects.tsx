export default function Projects() {
  const projects = [
    {
      name: "Portfolio Website",
      description:
        "Personal portfolio built with React and Tailwind to showcase my work and experience.",
      tech: ["React", "Tailwind", "TypeScript"],
      link: "#",
    },
    {
      name: "Task Manager",
      description:
        "A simple productivity app for managing daily tasks and priorities.",
      tech: ["Node.js", "Express", "MongoDB"],
      link: "#",
    },
    {
      name: "Algorithm Visualizer",
      description:
        "Visualization tool for understanding sorting and pathfinding algorithms.",
      tech: ["React", "Canvas API"],
      link: "#",
    },
  ];

  return (
    <section id="projects" className="px-6 py-16 max-w-7xl 2xl:max-w-360 mx-auto scroll-mt-32 h-[min(calc(100svh-80px),900px)]">
      <h2 className="text-3xl font-bold mb-8 text-center text-text">
        Projects
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group relative rounded-xl p-px transition-all duration-300 hover:-translate-y-1"
          >
            {/* Hover glow border */}
            <div
              className="
                absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
                transition-opacity duration-300
                bg-linear-to-br
                from-accent/20 via-sky-500/10 to-transparent
              "
            />

            {/* Card */}
            <div
              className="
                relative flex h-full flex-col rounded-xl border
                border-border/10 bg-panel p-5
                transition-all duration-300
                group-hover:border-border/20
                group-hover:shadow-[0_12px_40px_-12px_rgba(56,189,248,0.18)]
                
              "
            >
              {/* Spotlight */}
              <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-[radial-gradient(350px_circle_at_50%_-20%,rgba(56,189,248,0.08),transparent_60%)]" />
              </div>

              <div className="relative flex h-full flex-col">
                <h3 className="text-xl font-semibold mb-2 text-text">
                  {project.name}
                </h3>

                <p className="text-muted/90 mb-4 flex-1 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="
                        rounded-full border px-3 py-1 text-xs
                        border-border/10 bg-input text-text/80
                        transition-colors duration-300
                        group-hover:border-border/20
                      "
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  className="
                    mt-auto inline-flex items-center gap-1 text-sm
                    text-accent transition-colors duration-200
                    hover:text-accent/80
                  "
                >
                  View project
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </a>

                {/* Accent line */}
                <div
                  className="
                    mt-5 h-px w-full opacity-60 group-hover:opacity-100 transition-opacity
                    bg-linear-to-r from-transparent via-border/15 to-transparent
                  "
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
