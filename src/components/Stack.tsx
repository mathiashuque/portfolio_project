export default function Stack() {
  const stack = [
    {
      category: "Languages",
      items: ["TypeScript", "JavaScript", "C#", "Python", "Java"],
    },
    {
      category: "Frontend",
      items: ["React", "Tailwind", "HTML", "CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", ".NET", "Express", "REST APIs"],
    },
    {
      category: "Tools",
      items: ["Git", "Docker", "Linux", "Postman", "VS Code"],
    },
  ];

  return (
    <section className="px-6 py-16 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Developer Stack</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {stack.map((group) => (
          <div
            key={group.category}
            className="bg-gray-900 border border-gray-800 rounded-lg p-5"
          >
            <h3 className="text-xl font-semibold mb-3">{group.category}</h3>

            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="bg-gray-800 px-3 py-1 rounded text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
