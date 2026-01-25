export default function Experience() {
  const experiences = [
    {
      role: "Adjunct Professor",
      focus: "Fundamentals of Computing",
      place: "Universidad ORT Uruguay",
      period: "2026 – Present",
      description:
        "Designing and delivering course content and assignments, guiding students through core concepts in programming, problem solving, and computational thinking.",
      highlights: [
        "Designed assignments and learning activities",
        "Delivered lectures and guided in-class problem solving",
        "Mentored students through core programming concepts",
      ],
      tags: ["Teaching", "Programming", "Computational Thinking"],
    },
    {
      role: "Teaching Assistant",
      focus: "Data Structures and Algorithms I",
      place: "Universidad ORT Uruguay",
      period: "2025 – 2026",
      description:
        "Supported delivery through lab assistance, collaboration with faculty and assistants, and improving course materials for future semesters.",
      highlights: [
        "Assisted students during labs and office hours",
        "Collaborated with professors and assistant team",
        "Refined course materials for future iterations",
      ],
      tags: ["Data Structures", "Algorithms", "Collaboration"],
    },
    {
      role: "University Projects",
      focus: "Personal & Academic",
      place: "Selected work",
      period: "2022 – Present",
      description:
        "Built multiple projects exploring algorithms, software architecture, and modern web technologies.",
      highlights: [
        "Worked across front-end and back-end projects",
        "Practiced architecture and clean code principles",
        "Explored performance and testing strategies",
      ],
      tags: ["Architecture", "Web", "Problem Solving"],
    },
  ];

  return (
    <section id="experience" className="px-6 py-16 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center">Experience</h2>

      <div className="relative">
        {/* Timeline rail */}
        <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-800" />

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <article key={index} className="relative pl-10">
              {/* Timeline dot */}
              <div className="absolute left-1.75 top-6 h-3 w-3 rounded-full bg-gray-700 ring-4 ring-gray-950 border border-gray-600 transition-all duration-300 group-hover:bg-sky-400 group-hover:ring-sky-400/20" />

              {/* Hover card wrapper (gradient border + spotlight) */}
              <div className="group relative rounded-xl p-[1px] transition-all duration-300 hover:-translate-y-1">
                {/* Gradient border */}
                <div className="absolute inset-0 rounded-xl bg-linear-to-br from-indigo-500/20 via-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Card body */}
                <div className="relative rounded-xl border border-gray-800 bg-gray-900/70 p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-gray-700 group-hover:shadow-[0_12px_40px_-12px_rgba(56,189,248,0.25)]">
                  {/* Spotlight */}
                  <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-[radial-gradient(400px_circle_at_50%_-20%,rgba(56,189,248,0.08),transparent_60%)]" />
                  </div>

                  <div className="relative">
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold leading-tight">
                          <span className="text-gray-100">{exp.role}</span>
                          <span className="text-gray-500"> — </span>
                          <span className="text-gray-200">{exp.focus}</span>
                        </h3>

                        <p className="text-gray-400 mt-1">{exp.place}</p>
                      </div>

                      <div className="text-gray-400 text-sm md:text-right md:pt-1">
                        {exp.period}
                      </div>
                    </div>

                    <p className="text-gray-300 mt-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Highlights */}
                    <ul className="mt-4 space-y-2 text-gray-300">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="mt-2.25 h-1.5 w-1.5 rounded-full bg-gray-500 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {exp.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-gray-800 bg-gray-950/40 px-3 py-1 text-xs text-gray-300 transition-colors duration-300 group-hover:border-gray-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Subtle accent line on hover */}
                    <div className="mt-6 h-px w-full bg-linear-to-r from-transparent via-gray-800 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
