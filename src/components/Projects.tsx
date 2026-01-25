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
    <section id="projects" className="px-6 py-16 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group relative rounded-xl p-[1px] transition-all duration-300 hover:-translate-y-1"
          >
            {/* Gradient border */}
            <div className="absolute inset-0 rounded-xl bg-linear-to-br from-indigo-500/20 via-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Card body */}
            <div className="relative flex h-full flex-col rounded-xl border border-gray-800 bg-gray-900/70 p-5 backdrop-blur-sm transition-all duration-300 group-hover:border-gray-700 group-hover:shadow-[0_12px_40px_-12px_rgba(56,189,248,0.25)]">
              {/* Spotlight */}
              <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-[radial-gradient(350px_circle_at_50%_-20%,rgba(56,189,248,0.08),transparent_60%)]" />
              </div>

              <div className="relative flex h-full flex-col">
                <h3 className="text-xl font-semibold mb-2 text-gray-100">
                  {project.name}
                </h3>

                <p className="text-gray-400 mb-4 flex-1 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-gray-800 bg-gray-950/40 px-3 py-1 text-xs text-gray-300 transition-colors duration-300 group-hover:border-gray-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  className="mt-auto inline-flex items-center gap-1 text-sm text-sky-400 transition-colors duration-200 hover:text-sky-300"
                >
                  View project
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </a>

                {/* Accent line */}
                <div className="mt-5 h-px w-full bg-linear-to-r from-transparent via-gray-800 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
