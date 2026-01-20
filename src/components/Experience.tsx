export default function Experience() {
  const experiences = [
    {
      title: "Software Developer Intern",
      place: "Cool Company",
      period: "2024 – Present",
      description:
        "Worked on full-stack features using React and Node.js, improving performance and developer experience.",
    },
    {
      title: "University Projects",
      place: "Personal & Academic",
      period: "2022 – Present",
      description:
        "Built multiple applications exploring algorithms, architecture, and modern web technologies.",
    },
  ];

  return (
    <section id="experience" className="px-6 py-16 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="bg-gray-900 p-5 rounded-lg border border-gray-800"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
              <h3 className="text-xl font-semibold">{exp.title}</h3>
              <span className="text-gray-400 text-sm">{exp.period}</span>
            </div>

            <p className="text-gray-400 mb-1">{exp.place}</p>
            <p className="text-gray-300">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
