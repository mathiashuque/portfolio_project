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

  type ExperienceType = {
    role: string;
    focus: string;
    place: string;
    period: string;
    description: string;
    highlights: string[];
    tags: string[];
  };

  const Card = ({ exp }: { exp: ExperienceType }) => (
    <div
      className="
        relative rounded-xl border p-6
        border-border/10 bg-panel
        backdrop-blur-sm

        transform translate-y-0 scale-100
        transition-[transform,box-shadow,border-color,background-color] duration-500 ease-in-out
        hover:-translate-y-1 hover:scale-[1.02]

        shadow-[0_10px_30px_-22px_rgba(2,132,199,0.10)]
        hover:shadow-[0_22px_70px_-28px_rgba(2,132,199,0.25)]
        dark:shadow-[0_12px_40px_-26px_rgba(56,189,248,0.12)]
        dark:hover:shadow-[0_22px_80px_-32px_rgba(56,189,248,0.30)]
      "
    >
      {/* spotlight */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-35 hover:opacity-60 transition-opacity duration-500 ease-in-out">
        <div className="absolute inset-0 bg-[radial-gradient(420px_circle_at_50%_-20%,rgba(56,189,248,0.10),transparent_60%)]" />
      </div>

      <div className="relative">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold leading-tight">
              <span className="text-text">{exp.role}</span>
              <span className="text-faint/80"> — </span>
              <span className="text-text/85">{exp.focus}</span>
            </h3>
            <p className="text-muted/90 mt-1">{exp.place}</p>
          </div>

          <div className="text-faint/90 text-sm sm:text-right sm:pt-1">
            {exp.period}
          </div>
        </div>

        <p className="text-muted/95 mt-4 leading-relaxed">{exp.description}</p>

        <ul className="mt-4 space-y-2 text-muted/95">
          {exp.highlights.map((h, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-[0.55rem] h-1.5 w-1.5 rounded-full bg-border/35 shrink-0" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          {exp.tags.map((t: string) => (
            <span
              key={t}
              className="
                rounded-full border px-3 py-1 text-xs
                border-border/10 bg-input text-text/80
                transition-colors duration-300
                hover:border-accent/35
              "
            >
              {t}
            </span>
          ))}
        </div>

        <div
          className="
            mt-6 h-px w-full opacity-70 transition-opacity
            bg-gradient-to-r from-transparent via-border/15 to-transparent
          "
        />
      </div>
    </div>
  );

  return (
    <section id="experience" className="px-6 py-16 max-w-7xl 2xl:max-w-360 mx-auto scroll-mt-32">
      <h2 className="text-3xl font-bold mb-10 text-center text-text">
        Experience
      </h2>

      <div className="relative">
        {/* Timeline rail */}
        <div className="absolute left-3 top-0 bottom-0 w-px bg-border/10" />

        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <article key={index} className="relative pl-10">
              {/* Timeline dot */}
              <div
                className="
                  absolute left-1.5 top-7 h-3 w-3 rounded-full
                  bg-bg-elev border border-border/20
                  ring-4 ring-bg
                "
              />
              <Card exp={exp} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
