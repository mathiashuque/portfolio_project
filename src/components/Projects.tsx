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
            className="bg-gray-900 border border-gray-800 rounded-lg p-5 flex flex-col"
          >
            <h3 className="text-xl font-semibold mb-2">{project.name}</h3>

            <p className="text-gray-400 mb-4 flex-1">{project.description}</p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((t) => (
                <span key={t} className="bg-gray-800 text-sm px-2 py-1 rounded">
                  {t}
                </span>
              ))}
            </div>

            <a href={project.link} className="text-blue-400 hover:underline">
              View project →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
